"""Real webhook payload shapes captured from prod logs, templated on bot_id."""
from __future__ import annotations

from typing import Any


def recall_event(event: str, bot_id: str, *, code: str | None = None, sub_code: str | None = None, audio_id: str | None = None, recording_id: str | None = None) -> dict[str, Any]:
    """Build a Recall webhook event payload matching their real format.

    event: the event name, e.g. "bot.done", "bot.call_ended", "audio_mixed.done"
    """
    inferred_code = code or event.split(".")[-1]
    data_block: dict[str, Any] = {
        "bot": {"id": bot_id, "metadata": {}},
        "data": {
            "code": inferred_code,
            "sub_code": sub_code,
            "updated_at": "2026-04-24T16:20:34.579934+00:00",
        },
    }
    if event.startswith("audio_mixed"):
        data_block["audio_mixed"] = {"id": audio_id or "00000000-0000-0000-0000-000000000000", "metadata": {}}
        data_block["recording"] = {"id": recording_id or "00000000-0000-0000-0000-000000000000", "metadata": {}}
    return {"data": data_block, "event": event}


# Canned Sarvam transcript long enough to pass the 20-char `noUsableTranscript`
# guard so generateInsights actually calls GPT-4o-mini.
CANNED_SARVAM_TRANSCRIPT = (
    "This is a harness-generated test transcript. The team discussed the "
    "quarterly roadmap, decided to prioritize the new onboarding flow, and "
    "assigned follow-up tasks to engineering for a prototype next week."
)


def sarvam_webhook_success(job_id: str, *, transcript: str = CANNED_SARVAM_TRANSCRIPT) -> dict[str, Any]:
    """Sarvam webhook payload with inline results — bypasses the download step.

    sarvam-webhook checks `payload.results.transcripts[0]` before calling the
    download API, so supplying results inline means we don't need to create a
    real Sarvam job for the harness.
    """
    return {
        "job_id": job_id,
        "job_state": "COMPLETED",
        "results": {
            "transcripts": [
                {
                    "transcript": transcript,
                    "language_code": "en",
                    "diarized_transcript": {
                        "entries": [
                            {
                                "speaker_id": "0",
                                "transcript": transcript,
                                "start_time_seconds": 0.0,
                                "end_time_seconds": 30.0,
                            }
                        ]
                    },
                }
            ]
        },
    }


def sarvam_webhook_failed(job_id: str) -> dict[str, Any]:
    return {"job_id": job_id, "job_state": "FAILED"}
