-- Add missing error_message column on meetings. Edge functions
-- (recall-webhook, check-recall-status, sarvam-webhook, process-meeting) have
-- been writing to this column in all failure paths, but it didn't exist — the
-- entire UPDATE was silently rejected by PostgREST, so bot-kicked / audio-failed
-- meetings stayed stuck in "processing" instead of transitioning to "failed".
-- The frontend (MeetingDetail.tsx) and TS types already expect this column.

ALTER TABLE public.meetings
  ADD COLUMN IF NOT EXISTS error_message TEXT;
