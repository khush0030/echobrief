-- Audit trail for the stuck-meeting monitor cron.
-- One row per (meeting, signature, hour) detection. The cron uses
-- ON CONFLICT DO NOTHING to dedupe within the hour bucket, so we
-- log the FIRST detection and skip repeats during the same hour.

CREATE TABLE IF NOT EXISTS public.monitor_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_id UUID REFERENCES public.meetings(id) ON DELETE CASCADE,
  error_signature TEXT NOT NULL,
  is_new_pattern BOOLEAN NOT NULL DEFAULT false,
  recovery_attempted TEXT,
  recovery_succeeded BOOLEAN,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- date_trunc on TIMESTAMPTZ is STABLE (depends on session TZ); convert to
  -- TIMESTAMP via AT TIME ZONE 'UTC' so the expression is IMMUTABLE and can
  -- be used in a generated column.
  hour_bucket TIMESTAMP GENERATED ALWAYS AS (date_trunc('hour', created_at AT TIME ZONE 'UTC')) STORED
);

CREATE UNIQUE INDEX IF NOT EXISTS monitor_events_dedup
  ON public.monitor_events (meeting_id, error_signature, hour_bucket);

CREATE INDEX IF NOT EXISTS monitor_events_recent
  ON public.monitor_events (created_at DESC);

CREATE INDEX IF NOT EXISTS monitor_events_unresolved
  ON public.monitor_events (created_at DESC)
  WHERE recovery_succeeded = false OR recovery_succeeded IS NULL;

-- RLS: only service role reads/writes this. No user-facing access needed.
ALTER TABLE public.monitor_events ENABLE ROW LEVEL SECURITY;
