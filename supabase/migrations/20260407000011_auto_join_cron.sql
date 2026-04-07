-- Enable pg_cron and pg_net extensions (already enabled on Supabase Pro/Team plans)
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule auto-join-meetings to run every minute
-- This calls the Edge Function which checks all users with auto_join_enabled = true
-- and sends a Recall bot to any calendar meetings starting within the next 2 minutes.
--
-- IMPORTANT: Replace <YOUR_SUPABASE_PROJECT_REF> with your actual project ref
-- (find it in Supabase Dashboard → Settings → General → Reference ID)
-- e.g. https://abcdefghijklmno.supabase.co
SELECT cron.schedule(
  'auto-join-meetings',
  '* * * * *',
  $$
  SELECT net.http_post(
    url := 'https://<YOUR_SUPABASE_PROJECT_REF>.supabase.co/functions/v1/auto-join-meetings',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);
