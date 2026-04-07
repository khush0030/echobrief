-- Fix auto-join-meetings cron URL with correct project reference
-- cron.schedule with the same name updates the existing job
SELECT cron.schedule(
  'auto-join-meetings',
  '* * * * *',
  $$
  SELECT net.http_post(
    url := 'https://lekkpfpojlspbuwrtmzt.supabase.co/functions/v1/auto-join-meetings',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);
