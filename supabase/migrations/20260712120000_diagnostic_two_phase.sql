begin;

alter table public.leads
  add column if not exists diagnostic_session_id uuid,
  add column if not exists diagnostic_status text,
  add column if not exists diagnostic_completed_at timestamptz;

create unique index if not exists leads_diagnostic_session_id_key
  on public.leads (diagnostic_session_id)
  where diagnostic_session_id is not null;

create or replace function public.capture_diagnostic_lead(p_payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog
as $$
declare
  v_id uuid;
  v_status text;
  v_session uuid;
  v_nome text;
  v_whatsapp text;
  v_policy_version text;
  v_existing_whatsapp text;
  v_existing_consent_at timestamptz;
  v_existing_policy_version text;
  v_existing_origin text;
begin
  if p_payload is null or jsonb_typeof(p_payload) is distinct from 'object' then
    raise exception 'payload inválido';
  end if;

  if octet_length(p_payload::text) > 2000 then
    raise exception 'payload excede o limite permitido';
  end if;

  v_nome := btrim(coalesce(p_payload->>'name', ''));
  v_whatsapp := regexp_replace(coalesce(p_payload->>'phone', ''), '\D', '', 'g');
  v_policy_version := btrim(coalesce(p_payload->>'privacyPolicyVersion', ''));

  begin
    v_session := (p_payload->>'sessionId')::uuid;
  exception when invalid_text_representation then
    raise exception 'sessão de diagnóstico inválida';
  end;

  if v_session is null then
    raise exception 'sessão de diagnóstico inválida';
  end if;
  if v_nome = '' then
    raise exception 'nome é obrigatório';
  end if;
  if char_length(v_nome) > 80 then
    raise exception 'nome excede o limite permitido';
  end if;
  if v_whatsapp !~ '^[0-9]{12,13}$' then
    raise exception 'whatsapp inválido';
  end if;
  if jsonb_typeof(p_payload->'consent') is distinct from 'boolean'
    or p_payload->'consent' <> 'true'::jsonb then
    raise exception 'consentimento é obrigatório';
  end if;
  if v_policy_version = '' then
    raise exception 'versão da política é obrigatória';
  end if;
  if char_length(v_policy_version) > 80 then
    raise exception 'versão da política excede o limite permitido';
  end if;

  select
    id,
    diagnostic_status,
    whatsapp,
    consentimento_em,
    versao_politica,
    origem
  into
    v_id,
    v_status,
    v_existing_whatsapp,
    v_existing_consent_at,
    v_existing_policy_version,
    v_existing_origin
  from public.leads
  where diagnostic_session_id = v_session
  limit 1;

  if v_id is not null then
    if v_existing_origin is distinct from 'diagnostico'
      or v_existing_whatsapp is distinct from v_whatsapp
      or v_existing_consent_at is null
      or v_existing_policy_version is distinct from v_policy_version then
      raise exception using
        errcode = 'P4091',
        message = 'diagnostic_capture_conflict';
    end if;

    return jsonb_build_object(
      'id', v_id,
      'diagnosticStatus', coalesce(v_status, 'capturado')
    );
  end if;

  begin
    insert into public.leads (
      nome, whatsapp, problema, origem, status,
      consentimento_em, versao_politica,
      diagnostic_session_id, diagnostic_status
    )
    values (
      v_nome,
      v_whatsapp,
      'Diagnóstico em andamento',
      'diagnostico',
      'diagnostico_solicitado',
      now(),
      v_policy_version,
      v_session,
      'capturado'
    )
    returning id into v_id;
  exception when unique_violation then
    select
      id,
      diagnostic_status,
      whatsapp,
      consentimento_em,
      versao_politica,
      origem
    into
      v_id,
      v_status,
      v_existing_whatsapp,
      v_existing_consent_at,
      v_existing_policy_version,
      v_existing_origin
    from public.leads
    where diagnostic_session_id = v_session
    limit 1;

    if v_id is null then
      raise;
    end if;
    if v_existing_origin is distinct from 'diagnostico'
      or v_existing_whatsapp is distinct from v_whatsapp
      or v_existing_consent_at is null
      or v_existing_policy_version is distinct from v_policy_version then
      raise exception using
        errcode = 'P4091',
        message = 'diagnostic_capture_conflict';
    end if;

    return jsonb_build_object(
      'id', v_id,
      'diagnosticStatus', coalesce(v_status, 'capturado')
    );
  end;

  insert into public.lead_historico (
    lead_id, status_anterior, novo_status, acao, motivo_perda
  )
  values (
    v_id,
    'novo_diagnostico',
    'diagnostico_solicitado',
    'Contato capturado no diagnóstico',
    null
  );

  return jsonb_build_object('id', v_id, 'diagnosticStatus', 'capturado');
end;
$$;

revoke all on function public.capture_diagnostic_lead(jsonb) from public;
revoke all on function public.capture_diagnostic_lead(jsonb) from anon;
grant execute on function public.capture_diagnostic_lead(jsonb) to service_role;

create or replace function public.complete_diagnostic_lead(p_payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog
as $$
declare
  v_id uuid;
  v_session uuid;
  v_status text;
  v_nome text;
  v_empresa text;
  v_email text;
  v_cidade_uf text;
  v_objetivo text;
  v_tipo_negocio text;
  v_gargalo text;
  v_volume text;
  v_resultado text;
  v_solucao text;
  v_maturidade text;
  v_canais jsonb;
  v_modulos jsonb;
  v_respostas jsonb;
begin
  if p_payload is null or jsonb_typeof(p_payload) is distinct from 'object' then
    raise exception 'payload inválido';
  end if;

  if octet_length(p_payload::text) > 20000 then
    raise exception 'payload excede o limite permitido';
  end if;

  v_nome := btrim(coalesce(p_payload->>'name', ''));
  v_empresa := btrim(coalesce(p_payload->>'businessName', ''));
  v_email := lower(btrim(coalesce(p_payload->>'email', '')));
  v_cidade_uf := btrim(coalesce(p_payload->>'cityState', ''));
  v_objetivo := btrim(coalesce(p_payload->>'primaryGoal', ''));
  v_tipo_negocio := btrim(coalesce(p_payload->>'businessType', ''));
  v_gargalo := btrim(coalesce(p_payload->>'bottleneck', ''));
  v_volume := btrim(coalesce(p_payload->>'leadVolume', ''));
  v_resultado := btrim(coalesce(p_payload->>'desiredOutcome', ''));
  v_solucao := btrim(coalesce(p_payload->>'solutionName', ''));
  v_maturidade := btrim(coalesce(p_payload->>'maturity', ''));
  v_canais := p_payload->'currentChannels';
  v_modulos := p_payload->'modules';
  v_respostas := p_payload->'answers';

  begin
    v_session := (p_payload->>'sessionId')::uuid;
  exception when invalid_text_representation then
    raise exception 'sessão de diagnóstico inválida';
  end;

  if v_session is null then
    raise exception 'sessão de diagnóstico inválida';
  end if;
  if v_nome = '' or v_empresa = '' or v_cidade_uf = ''
    or v_objetivo = '' or v_tipo_negocio = '' or v_gargalo = ''
    or v_volume = '' or v_resultado = '' or v_solucao = ''
    or v_maturidade = '' then
    raise exception 'campos obrigatórios não podem estar vazios';
  end if;
  if char_length(v_nome) > 80 or char_length(v_empresa) > 80
    or char_length(v_cidade_uf) > 80 then
    raise exception 'campo de identificação excede o limite permitido';
  end if;
  if char_length(v_objetivo) > 160 or char_length(v_tipo_negocio) > 160
    or char_length(v_gargalo) > 160 or char_length(v_volume) > 160
    or char_length(v_resultado) > 160 or char_length(v_solucao) > 160
    or char_length(v_maturidade) > 40 then
    raise exception 'campo de diagnóstico excede o limite permitido';
  end if;
  if char_length(v_email) > 160 then
    raise exception 'e-mail excede o limite permitido';
  end if;
  if v_email <> ''
    and v_email !~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then
    raise exception 'e-mail inválido';
  end if;
  if jsonb_typeof(v_canais) is distinct from 'array' then
    raise exception 'canais atuais devem ser um array';
  end if;
  if jsonb_array_length(v_canais) = 0 or jsonb_array_length(v_canais) > 20 then
    raise exception 'canais atuais fora do limite permitido';
  end if;
  if exists (
    select 1
    from jsonb_array_elements(v_canais) as item(value)
    where jsonb_typeof(item.value) is distinct from 'string'
      or btrim(item.value #>> '{}') = ''
      or char_length(item.value #>> '{}') > 160
  ) then
    raise exception 'canal atual inválido';
  end if;
  if jsonb_typeof(v_modulos) is distinct from 'array' then
    raise exception 'módulos devem ser um array';
  end if;
  if jsonb_array_length(v_modulos) > 30 then
    raise exception 'módulos excedem o limite permitido';
  end if;
  if exists (
    select 1
    from jsonb_array_elements(v_modulos) as item(value)
    where jsonb_typeof(item.value) is distinct from 'string'
      or btrim(item.value #>> '{}') = ''
      or char_length(item.value #>> '{}') > 160
  ) then
    raise exception 'módulo inválido';
  end if;
  if jsonb_typeof(v_respostas) is distinct from 'object'
    or v_respostas = '{}'::jsonb then
    raise exception 'respostas devem ser um objeto preenchido';
  end if;
  if octet_length(v_respostas::text) > 12000 then
    raise exception 'respostas excedem o limite permitido';
  end if;

  select coalesce(jsonb_agg(channel order by channel), '[]'::jsonb)
  into v_canais
  from (
    select distinct value as channel
    from jsonb_array_elements_text(v_canais) as item(value)
  ) as normalized_channels;

  v_respostas := jsonb_build_object(
    'primaryGoal', v_objetivo,
    'businessType', v_tipo_negocio,
    'currentChannels', v_canais,
    'bottleneck', v_gargalo,
    'leadVolume', v_volume,
    'desiredOutcome', v_resultado
  );

  select id, diagnostic_status
  into v_id, v_status
  from public.leads
  where diagnostic_session_id = v_session
    and origem = 'diagnostico'
  for update;

  if v_id is null then
    raise exception using
      errcode = 'P4040',
      message = 'diagnostic_session_not_found';
  end if;
  if v_status not in ('capturado', 'qualificado') or v_status is null then
    raise exception using
      errcode = 'P4093',
      message = 'diagnostic_state_conflict';
  end if;
  if v_status = 'qualificado' then
    if exists (
      select 1
      from public.leads
      where id = v_id
        and (
          empresa is distinct from v_empresa
          or email is distinct from nullif(v_email, '')
          or cidade_uf is distinct from v_cidade_uf
          or objetivo_principal is distinct from v_objetivo
          or tipo_negocio is distinct from v_tipo_negocio
          or canais_atuais is distinct from v_canais
          or gargalo is distinct from v_gargalo
          or volume_contatos is distinct from v_volume
          or resultado_desejado is distinct from v_resultado
          or solucao_recomendada is distinct from v_solucao
          or modulos_recomendados is distinct from v_modulos
          or maturidade is distinct from v_maturidade
          or respostas is distinct from v_respostas
        )
    ) then
      raise exception using
        errcode = 'P4092',
        message = 'diagnostic_completion_conflict';
    end if;

    return jsonb_build_object('id', v_id, 'diagnosticStatus', 'qualificado');
  end if;

  update public.leads
  set
    nome = v_nome,
    empresa = v_empresa,
    email = nullif(v_email, ''),
    cidade_uf = v_cidade_uf,
    segmento = v_solucao,
    objetivo_principal = v_objetivo,
    tipo_negocio = v_tipo_negocio,
    canais_atuais = v_canais,
    gargalo = v_gargalo,
    volume_contatos = v_volume,
    resultado_desejado = v_resultado,
    solucao_recomendada = v_solucao,
    modulos_recomendados = v_modulos,
    maturidade = v_maturidade,
    respostas = v_respostas,
    problema = v_solucao,
    diagnostic_status = 'qualificado',
    diagnostic_completed_at = now(),
    atualizado_em = now()
  where id = v_id;

  insert into public.lead_historico (
    lead_id, status_anterior, novo_status, acao, motivo_perda
  )
  values (
    v_id,
    'diagnostico_solicitado',
    'diagnostico_solicitado',
    'Diagnóstico qualificado no site',
    null
  );

  return jsonb_build_object('id', v_id, 'diagnosticStatus', 'qualificado');
end;
$$;

revoke all on function public.complete_diagnostic_lead(jsonb) from public;
revoke all on function public.complete_diagnostic_lead(jsonb) from anon;
grant execute on function public.complete_diagnostic_lead(jsonb) to service_role;

commit;
