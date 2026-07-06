begin;

create or replace function public.create_lead(
  p_nome text,
  p_whatsapp text,
  p_problema text,
  p_origem text default 'site'
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  if p_nome is null or btrim(p_nome) = '' then
    raise exception 'nome é obrigatório';
  end if;

  if p_whatsapp is null or btrim(p_whatsapp) = '' then
    raise exception 'whatsapp é obrigatório';
  end if;

  if p_problema is null or btrim(p_problema) = '' then
    raise exception 'problema é obrigatório';
  end if;

  insert into public.leads (nome, whatsapp, problema, origem, status)
  values (
    btrim(p_nome),
    btrim(p_whatsapp),
    btrim(p_problema),
    coalesce(nullif(btrim(p_origem), ''), 'site'),
    'diagnostico_solicitado'
  )
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.create_lead(text, text, text, text) from public;
grant execute on function public.create_lead(text, text, text, text) to anon;

create or replace function public.update_lead_qualification(
  p_id uuid,
  p_nome text default null,
  p_whatsapp text default null,
  p_segmento text default null,
  p_problema text default null,
  p_urgencia text default null,
  p_orcamento text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.leads
  set
    nome = coalesce(nullif(btrim(p_nome), ''), nome),
    whatsapp = coalesce(nullif(btrim(p_whatsapp), ''), whatsapp),
    segmento = coalesce(nullif(btrim(p_segmento), ''), segmento),
    problema = coalesce(nullif(btrim(p_problema), ''), problema),
    urgencia = coalesce(nullif(btrim(p_urgencia), ''), urgencia),
    orcamento = coalesce(nullif(btrim(p_orcamento), ''), orcamento),
    atualizado_em = now()
  where id = p_id;

  if not found then
    raise exception 'lead não encontrado';
  end if;
end;
$$;

revoke all on function public.update_lead_qualification(uuid, text, text, text, text, text, text) from public;
grant execute on function public.update_lead_qualification(uuid, text, text, text, text, text, text) to anon;

commit;
