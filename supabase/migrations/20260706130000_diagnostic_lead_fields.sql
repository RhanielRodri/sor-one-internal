begin;

alter table public.leads
  add column if not exists cidade_uf text,
  add column if not exists objetivo_principal text,
  add column if not exists tipo_negocio text,
  add column if not exists canais_atuais jsonb,
  add column if not exists gargalo text,
  add column if not exists volume_contatos text,
  add column if not exists resultado_desejado text,
  add column if not exists solucao_recomendada text,
  add column if not exists modulos_recomendados jsonb,
  add column if not exists maturidade text,
  add column if not exists consentimento_em timestamptz,
  add column if not exists versao_politica text,
  add column if not exists respostas jsonb;

create index if not exists leads_solucao_recomendada_idx
  on public.leads (solucao_recomendada);

create or replace function public.create_diagnostic_lead(p_payload jsonb)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_existing uuid;
  v_nome text := btrim(coalesce(p_payload->>'name', ''));
  v_empresa text := btrim(coalesce(p_payload->>'businessName', ''));
  v_whatsapp text := regexp_replace(coalesce(p_payload->>'phone', ''), '\D', '', 'g');
  v_solucao text := btrim(coalesce(p_payload->>'solutionName', ''));
begin
  if v_nome = '' then
    raise exception 'nome é obrigatório';
  end if;
  if v_empresa = '' then
    raise exception 'nome do negócio é obrigatório';
  end if;
  if v_whatsapp = '' then
    raise exception 'whatsapp é obrigatório';
  end if;
  if coalesce((p_payload->>'consent')::boolean, false) is not true then
    raise exception 'consentimento é obrigatório';
  end if;

  select id into v_existing
  from public.leads
  where whatsapp = v_whatsapp
    and origem = 'diagnostico'
    and criado_em > now() - interval '60 seconds'
  order by criado_em desc
  limit 1;

  if v_existing is not null then
    return v_existing;
  end if;

  insert into public.leads (
    nome, empresa, whatsapp, email, cidade_uf, segmento,
    objetivo_principal, tipo_negocio, canais_atuais, gargalo,
    volume_contatos, resultado_desejado, solucao_recomendada,
    modulos_recomendados, maturidade, respostas,
    consentimento_em, versao_politica, origem, status, problema
  )
  values (
    v_nome,
    v_empresa,
    v_whatsapp,
    nullif(btrim(coalesce(p_payload->>'email', '')), ''),
    nullif(btrim(coalesce(p_payload->>'cityState', '')), ''),
    nullif(v_solucao, ''),
    nullif(btrim(coalesce(p_payload->>'primaryGoal', '')), ''),
    nullif(btrim(coalesce(p_payload->>'businessType', '')), ''),
    coalesce(p_payload->'currentChannels', '[]'::jsonb),
    nullif(btrim(coalesce(p_payload->>'bottleneck', '')), ''),
    nullif(btrim(coalesce(p_payload->>'leadVolume', '')), ''),
    nullif(btrim(coalesce(p_payload->>'desiredOutcome', '')), ''),
    nullif(v_solucao, ''),
    coalesce(p_payload->'modules', '[]'::jsonb),
    nullif(btrim(coalesce(p_payload->>'maturity', '')), ''),
    coalesce(p_payload->'answers', '{}'::jsonb),
    now(),
    nullif(btrim(coalesce(p_payload->>'privacyPolicyVersion', '')), ''),
    'diagnostico',
    'diagnostico_solicitado',
    coalesce(nullif(v_solucao, ''), 'Diagnóstico comercial')
  )
  returning id into v_id;

  insert into public.lead_historico (
    lead_id, status_anterior, novo_status, acao, motivo_perda
  )
  values (
    v_id,
    'novo_diagnostico',
    'diagnostico_solicitado',
    'Diagnóstico recebido pelo site',
    null
  );

  return v_id;
end;
$$;

revoke all on function public.create_diagnostic_lead(jsonb) from public;
grant execute on function public.create_diagnostic_lead(jsonb) to anon;

commit;
