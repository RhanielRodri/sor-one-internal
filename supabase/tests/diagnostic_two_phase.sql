begin;

create or replace function pg_temp.assert_true(p_condition boolean, p_message text)
returns void
language plpgsql
as $$
begin
  if p_condition is not true then
    raise exception '%', p_message;
  end if;
end;
$$;

create or replace function pg_temp.capture_payload(
  p_session uuid,
  p_phone text,
  p_policy text default '2026-07-06'
)
returns jsonb
language sql
as $$
  select jsonb_build_object(
    'sessionId', p_session,
    'name', 'Teste Diagnóstico',
    'phone', p_phone,
    'consent', true,
    'privacyPolicyVersion', p_policy
  );
$$;

create or replace function pg_temp.complete_payload(
  p_session uuid,
  p_company text default 'Empresa Teste',
  p_volume text default 'De 11 a 30',
  p_channels jsonb default '["Usamos agenda, planilha ou caderno", "Principalmente pelo WhatsApp"]'::jsonb
)
returns jsonb
language sql
as $$
  select jsonb_build_object(
    'sessionId', p_session,
    'name', 'Teste Diagnóstico',
    'businessName', p_company,
    'cityState', 'Vila Velha/ES',
    'email', 'TESTE@EXEMPLO.COM',
    'primaryGoal', 'Reduzir faltas e organizar agendamentos',
    'businessType', 'Barbearia, salão ou estética',
    'currentChannels', p_channels,
    'bottleneck', 'Clientes não confirmam horário',
    'leadVolume', p_volume,
    'desiredOutcome', 'Mais agendamentos confirmados',
    'solutionName', 'Agendamento e relacionamento',
    'modules', jsonb_build_array(
      'Página de conversão',
      'Catálogo de serviços',
      'Agendamento online',
      'Seleção de profissional',
      'Confirmação de horário',
      'Lembrete configurável',
      'Painel administrativo'
    ),
    'maturity', 'organizacao',
    'answers', jsonb_build_object(
      'primaryGoal', 'Reduzir faltas e organizar agendamentos',
      'businessType', 'Barbearia, salão ou estética',
      'currentChannels', p_channels,
      'bottleneck', 'Clientes não confirmam horário',
      'leadVolume', p_volume,
      'desiredOutcome', 'Mais agendamentos confirmados'
    )
  );
$$;

create function public.diagnostic_two_phase_test_fail_history()
returns trigger
language plpgsql
as $$
begin
  if new.lead_id::text = current_setting('sor_test.fail_history_lead_id', true) then
    raise exception using errcode = 'PT001', message = 'forced_history_failure';
  end if;

  return new;
end;
$$;

create trigger diagnostic_two_phase_test_fail_history
before insert on public.lead_historico
for each row
execute function public.diagnostic_two_phase_test_fail_history();

do $$
declare
  v_main_session constant uuid := '00000000-0000-4000-8000-000000000101';
  v_origin_session constant uuid := '00000000-0000-4000-8000-000000000102';
  v_state_session constant uuid := '00000000-0000-4000-8000-000000000103';
  v_rollback_session constant uuid := '00000000-0000-4000-8000-000000000104';
  v_id uuid;
  v_retry_id uuid;
  v_completed_at timestamptz;
  v_retry_completed_at timestamptz;
  v_status text;
  v_text text;
  v_count bigint;
begin
  perform pg_temp.assert_true(
    not has_function_privilege('anon', 'public.capture_diagnostic_lead(jsonb)', 'execute'),
    'anon não pode executar capture_diagnostic_lead'
  );
  perform pg_temp.assert_true(
    not has_function_privilege('anon', 'public.complete_diagnostic_lead(jsonb)', 'execute'),
    'anon não pode executar complete_diagnostic_lead'
  );
  perform pg_temp.assert_true(
    has_function_privilege('service_role', 'public.capture_diagnostic_lead(jsonb)', 'execute'),
    'service_role deve executar capture_diagnostic_lead'
  );
  perform pg_temp.assert_true(
    has_function_privilege('service_role', 'public.complete_diagnostic_lead(jsonb)', 'execute'),
    'service_role deve executar complete_diagnostic_lead'
  );

  delete from public.leads
  where diagnostic_session_id in (
    v_main_session,
    v_origin_session,
    v_state_session,
    v_rollback_session
  );

  v_id := (public.capture_diagnostic_lead(
    pg_temp.capture_payload(v_main_session, '5527999999999')
  )->>'id')::uuid;

  v_retry_id := (public.capture_diagnostic_lead(
    pg_temp.capture_payload(v_main_session, '55 (27) 99999-9999')
  )->>'id')::uuid;

  perform pg_temp.assert_true(v_retry_id = v_id, 'retry de captura deve retornar o mesmo lead');

  select count(*) into v_count
  from public.leads
  where diagnostic_session_id = v_main_session;

  perform pg_temp.assert_true(v_count = 1, 'captura idempotente deve manter um lead');

  begin
    perform public.capture_diagnostic_lead(
      pg_temp.capture_payload(v_main_session, '5527888888888')
    );
    raise exception 'retry divergente de captura deveria falhar';
  exception when sqlstate 'P4091' then
    null;
  end;

  select whatsapp into v_text
  from public.leads
  where id = v_id;

  perform pg_temp.assert_true(
    v_text = '5527999999999',
    'retry divergente não pode alterar o telefone'
  );

  begin
    perform public.capture_diagnostic_lead(
      pg_temp.capture_payload(v_main_session, '5527999999999', '2026-07-07')
    );
    raise exception 'política divergente deveria falhar';
  exception when sqlstate 'P4091' then
    null;
  end;

  perform public.complete_diagnostic_lead(
    pg_temp.complete_payload(v_main_session)
  );

  select diagnostic_completed_at into v_completed_at
  from public.leads
  where id = v_id;

  perform public.complete_diagnostic_lead(
    pg_temp.complete_payload(
      v_main_session,
      'Empresa Teste',
      'De 11 a 30',
      '["Principalmente pelo WhatsApp", "Usamos agenda, planilha ou caderno"]'::jsonb
    )
  );

  select diagnostic_completed_at into v_retry_completed_at
  from public.leads
  where id = v_id;

  perform pg_temp.assert_true(
    v_retry_completed_at = v_completed_at,
    'retry deve preservar diagnostic_completed_at'
  );

  select count(*) into v_count
  from public.lead_historico
  where lead_id = v_id
    and acao = 'Diagnóstico qualificado no site';

  perform pg_temp.assert_true(v_count = 1, 'conclusão deve criar um único histórico');

  begin
    perform public.complete_diagnostic_lead(
      pg_temp.complete_payload(v_main_session, 'Empresa Divergente')
    );
    raise exception 'empresa divergente deveria falhar';
  exception when sqlstate 'P4092' then
    null;
  end;

  begin
    perform public.complete_diagnostic_lead(
      pg_temp.complete_payload(v_main_session, 'Empresa Teste', 'Mais de 80')
    );
    raise exception 'respostas divergentes deveriam falhar';
  exception when sqlstate 'P4092' then
    null;
  end;

  select empresa, diagnostic_completed_at
  into v_text, v_retry_completed_at
  from public.leads
  where id = v_id;

  perform pg_temp.assert_true(
    v_text = 'Empresa Teste' and v_retry_completed_at = v_completed_at,
    'retry divergente não pode modificar o diagnóstico'
  );

  select count(*) into v_count
  from public.lead_historico
  where lead_id = v_id
    and acao = 'Diagnóstico qualificado no site';

  perform pg_temp.assert_true(
    v_count = 1,
    'retry divergente não pode criar histórico'
  );

  begin
    perform public.complete_diagnostic_lead(
      pg_temp.complete_payload('00000000-0000-4000-8000-000000000199')
    );
    raise exception 'sessão desconhecida deveria falhar';
  exception when sqlstate 'P4040' then
    null;
  end;

  v_id := (public.capture_diagnostic_lead(
    pg_temp.capture_payload(v_origin_session, '5527999999998')
  )->>'id')::uuid;

  update public.leads set origem = 'site' where id = v_id;

  begin
    perform public.complete_diagnostic_lead(
      pg_temp.complete_payload(v_origin_session)
    );
    raise exception 'origem inválida deveria falhar';
  exception when sqlstate 'P4040' then
    null;
  end;

  v_id := (public.capture_diagnostic_lead(
    pg_temp.capture_payload(v_state_session, '5527999999997')
  )->>'id')::uuid;

  update public.leads set diagnostic_status = 'invalido' where id = v_id;

  begin
    perform public.complete_diagnostic_lead(
      pg_temp.complete_payload(v_state_session)
    );
    raise exception 'estado inválido deveria falhar';
  exception when sqlstate 'P4093' then
    null;
  end;

  v_id := (public.capture_diagnostic_lead(
    pg_temp.capture_payload(v_rollback_session, '5527999999996')
  )->>'id')::uuid;

  perform set_config('sor_test.fail_history_lead_id', v_id::text, true);

  begin
    perform public.complete_diagnostic_lead(
      pg_temp.complete_payload(v_rollback_session)
    );
    raise exception 'falha forçada do histórico deveria abortar a conclusão';
  exception when sqlstate 'PT001' then
    null;
  end;

  select diagnostic_status, diagnostic_completed_at
  into v_status, v_retry_completed_at
  from public.leads
  where id = v_id;

  perform pg_temp.assert_true(
    v_status = 'capturado' and v_retry_completed_at is null,
    'falha do histórico deve reverter a conclusão'
  );

  select count(*) into v_count
  from public.lead_historico
  where lead_id = v_id
    and acao = 'Diagnóstico qualificado no site';

  perform pg_temp.assert_true(v_count = 0, 'rollback não deve manter histórico parcial');
end;
$$;

rollback;

-- CONCORRÊNCIA DE CAPTURA, PREPARAÇÃO EM BASE DE TESTE
-- delete from public.leads where diagnostic_session_id = '00000000-0000-4000-8000-000000000201';
-- SESSÃO A
-- begin;
-- select public.capture_diagnostic_lead('{"sessionId":"00000000-0000-4000-8000-000000000201","name":"Teste Concorrente","phone":"5527999999995","consent":true,"privacyPolicyVersion":"2026-07-06"}'::jsonb);
-- select pg_sleep(10);
-- commit;
-- SESSÃO B, EXECUTAR DURANTE O PG_SLEEP DA SESSÃO A
-- select public.capture_diagnostic_lead('{"sessionId":"00000000-0000-4000-8000-000000000201","name":"Teste Concorrente","phone":"5527999999995","consent":true,"privacyPolicyVersion":"2026-07-06"}'::jsonb);
-- VERIFICAÇÃO
-- select count(*) from public.leads where diagnostic_session_id = '00000000-0000-4000-8000-000000000201';
-- delete from public.leads where diagnostic_session_id = '00000000-0000-4000-8000-000000000201';

-- CONCORRÊNCIA DE CONCLUSÃO, PREPARAÇÃO EM BASE DE TESTE
-- select public.capture_diagnostic_lead('{"sessionId":"00000000-0000-4000-8000-000000000202","name":"Teste Concorrente","phone":"5527999999994","consent":true,"privacyPolicyVersion":"2026-07-06"}'::jsonb);
-- SESSÃO A
-- begin;
-- select public.complete_diagnostic_lead('{"sessionId":"00000000-0000-4000-8000-000000000202","name":"Teste Concorrente","businessName":"Empresa Teste","cityState":"Vila Velha/ES","email":"teste@exemplo.com","primaryGoal":"Reduzir faltas e organizar agendamentos","businessType":"Barbearia, salão ou estética","currentChannels":["Usamos agenda, planilha ou caderno","Principalmente pelo WhatsApp"],"bottleneck":"Clientes não confirmam horário","leadVolume":"De 11 a 30","desiredOutcome":"Mais agendamentos confirmados","solutionName":"Agendamento e relacionamento","modules":["Página de conversão","Catálogo de serviços","Agendamento online","Seleção de profissional","Confirmação de horário","Lembrete configurável","Painel administrativo"],"maturity":"organizacao","answers":{"primaryGoal":"Reduzir faltas e organizar agendamentos","businessType":"Barbearia, salão ou estética","currentChannels":["Usamos agenda, planilha ou caderno","Principalmente pelo WhatsApp"],"bottleneck":"Clientes não confirmam horário","leadVolume":"De 11 a 30","desiredOutcome":"Mais agendamentos confirmados"}}'::jsonb);
-- select pg_sleep(10);
-- commit;
-- SESSÃO B, EXECUTAR DURANTE O PG_SLEEP DA SESSÃO A
-- select public.complete_diagnostic_lead('{"sessionId":"00000000-0000-4000-8000-000000000202","name":"Teste Concorrente","businessName":"Empresa Teste","cityState":"Vila Velha/ES","email":"teste@exemplo.com","primaryGoal":"Reduzir faltas e organizar agendamentos","businessType":"Barbearia, salão ou estética","currentChannels":["Principalmente pelo WhatsApp","Usamos agenda, planilha ou caderno"],"bottleneck":"Clientes não confirmam horário","leadVolume":"De 11 a 30","desiredOutcome":"Mais agendamentos confirmados","solutionName":"Agendamento e relacionamento","modules":["Página de conversão","Catálogo de serviços","Agendamento online","Seleção de profissional","Confirmação de horário","Lembrete configurável","Painel administrativo"],"maturity":"organizacao","answers":{"primaryGoal":"Reduzir faltas e organizar agendamentos","businessType":"Barbearia, salão ou estética","currentChannels":["Principalmente pelo WhatsApp","Usamos agenda, planilha ou caderno"],"bottleneck":"Clientes não confirmam horário","leadVolume":"De 11 a 30","desiredOutcome":"Mais agendamentos confirmados"}}'::jsonb);
-- VERIFICAÇÃO
-- select diagnostic_status, diagnostic_completed_at from public.leads where diagnostic_session_id = '00000000-0000-4000-8000-000000000202';
-- select count(*) from public.lead_historico h join public.leads l on l.id = h.lead_id where l.diagnostic_session_id = '00000000-0000-4000-8000-000000000202' and h.acao = 'Diagnóstico qualificado no site';
-- delete from public.leads where diagnostic_session_id = '00000000-0000-4000-8000-000000000202';
