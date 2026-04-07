-- Add source column to meetings table to track how a meeting was created
-- 'auto-join' = triggered automatically from calendar, NULL = manually sent via dashboard
ALTER TABLE meetings ADD COLUMN IF NOT EXISTS source TEXT;

CREATE INDEX IF NOT EXISTS idx_meetings_source ON meetings(source);
CREATE INDEX IF NOT EXISTS idx_meetings_calendar_source ON meetings(user_id, calendar_event_id, source);
