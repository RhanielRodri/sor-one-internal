begin;

-- O cliente administrativo do backend (SUPABASE_SERVICE_ROLE_KEY, chave sb_secret)
-- autentica como a role service_role. Nesta base a service_role só tinha SELECT em
-- public.leads, o que quebrava alteração de status, histórico e cadastro manual no
-- console. Concedemos aqui apenas os privilégios mínimos usados pelo backend.
-- Nenhum acesso a anon/authenticated, nenhuma policy de RLS, sem GRANT ALL.
--
-- DELETE em public.leads é necessário: o cadastro manual usa DELETE como rollback
-- compensatório quando o INSERT do histórico falha (por constraint, trigger, erro
-- transitório etc.), evitando lead parcial persistido. Não existe endpoint
-- administrativo de exclusão. Sem DELETE em lead_historico.

grant select, insert, update, delete on public.leads to service_role;

grant select, insert on public.lead_historico to service_role;

commit;
