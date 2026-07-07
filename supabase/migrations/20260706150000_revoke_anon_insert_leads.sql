begin;

-- A role anon tinha INSERT direto em public.leads, permitindo criar leads via
-- PostgREST com a chave anon (pública, exposta no frontend), furando o RPC
-- create_diagnostic_lead: sem validação de servidor, honeypot, dedup nem
-- recomputo da recomendação. Nenhum fluxo legítimo do frontend depende desse
-- INSERT direto — toda criação pública passa por funções SECURITY DEFINER
-- (create_lead, create_diagnostic_lead), que rodam como owner e não dependem
-- desta grant. O cadastro administrativo usa service_role, também intacto.
--
-- Revogamos de public (caso a grant tenha sido herdada), de anon e de
-- authenticated. REVOKE é idempotente: revogar privilégio inexistente é no-op.
-- Não mexemos em service_role, em EXECUTE das RPCs, em RLS nem em policies.

revoke insert on table public.leads from public;
revoke insert on table public.leads from anon;
revoke insert on table public.leads from authenticated;

commit;
