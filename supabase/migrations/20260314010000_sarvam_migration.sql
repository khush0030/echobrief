-- Sarvam STT migration: add columns for async batch job tracking

ALTER TABLE public.meetings
  ADD COLUMN IF NOT EXISTS sarvam_job_id TEXT,
  ADD COLUMN IF NOT EXISTS processing_config JSONB;

ALTER TABLE public.transcripts
  ADD COLUMN IF NOT EXISTS language_detected TEXT,
  ADD COLUMN IF NOT EXISTS stt_provider TEXT DEFAULT 'whisper';

CREATE INDEX IF NOT EXISTS idx_meetings_sarvam_job_id
  ON public.meetings (sarvam_job_id)
  WHERE sarvam_job_id IS NOT NULL;
