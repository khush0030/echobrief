import { useEffect, useState } from 'react';
import { X, Clock, Link2, Users, Copy, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, formatDistance } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface CalendarEvent {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  is_all_day: boolean;
  meetingUrl?: string;
  hasMeetingLink?: boolean;
}

interface MeetingDetailModalProps {
  event: CalendarEvent | null;
  onClose: () => void;
  onRecordWithBot: (event: CalendarEvent) => Promise<void>;
}

export function MeetingDetailModal({ event, onClose, onRecordWithBot }: MeetingDetailModalProps) {
  const { toast } = useToast();
  const [botStatus, setBotStatus] = useState<'idle' | 'loading' | 'joined' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!event) return null;

  const startDate = new Date(event.start_time);
  const endDate = new Date(event.end_time);
  const now = new Date();
  const durationMin = Math.round((endDate.getTime() - startDate.getTime()) / 60000);

  // Timing indicator
  const timingStatus = (() => {
    if (startDate <= now && endDate >= now) return { label: 'Happening now', color: '#22c55e', icon: '●' };
    if (startDate > now && startDate.getTime() - now.getTime() < 30 * 60 * 1000) return { label: 'Starting soon', color: '#F59E0B', icon: '⚡' };
    if (startDate > now) return { label: `In ${formatDistance(now, startDate)}`, color: '#78716C', icon: '⏱' };
    return { label: 'Ended', color: '#78716C', icon: '✓' };
  })();

  // Platform detection
  const getPlatform = () => {
    if (!event.meetingUrl) return null;
    if (event.meetingUrl.includes('meet.google.com')) return 'Google Meet';
    if (event.meetingUrl.includes('zoom.us')) return 'Zoom';
    if (event.meetingUrl.includes('teams.microsoft.com')) return 'Teams';
    if (event.meetingUrl.includes('webex.com')) return 'WebEx';
    return 'Meeting';
  };

  const handleCopyUrl = () => {
    if (event.meetingUrl) {
      navigator.clipboard.writeText(event.meetingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSendBot = async () => {
    if (!event.hasMeetingLink || !event.meetingUrl) return;
    setBotStatus('loading');
    try {
      await onRecordWithBot(event);
      setBotStatus('joined');
    } catch (err: any) {
      setBotStatus('error');
      toast({
        title: 'Error',
        description: err?.message || 'Failed to send bot',
        variant: 'destructive',
      });
    }
  };

  const handleOpenMeeting = () => {
    if (event.meetingUrl) window.open(event.meetingUrl, '_blank');
  };

  const truncateUrl = (url: string, max: number = 45) => {
    return url.length > max ? url.substring(0, max) + '...' : url;
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 480,
          background: '#1C1917',
          border: '1px solid #292524',
          borderRadius: 20,
          padding: 28,
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5)',
          animation: 'modalEntrance 150ms ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: 'linear-gradient(135deg, #F97316, #F59E0B)',
            borderRadius: '20px 20px 0 0',
          }}
        />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#FAFAF9', margin: '0 0 8px 0', fontFamily: 'Outfit, sans-serif' }}>
              {event.title}
            </h2>
            {getPlatform() && (
              <span
                style={{
                  display: 'inline-block',
                  background: '#44403C',
                  color: '#D4D4D4',
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: 6,
                }}
              >
                {getPlatform()}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#78716C',
              padding: 0,
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Time & Duration */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#78716C', marginBottom: 12 }}>
            Time
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <Clock size={15} style={{ color: '#78716C', marginTop: 2, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 14, color: '#A8A29E', margin: 0, fontFamily: 'DM Sans, sans-serif' }}>
                {format(startDate, 'EEEE, MMMM d · h:mm a')} – {format(endDate, 'h:mm a')} ({durationMin} min)
              </p>
              <p style={{ fontSize: 12, color: timingStatus.color, margin: '8px 0 0 0', fontFamily: 'DM Sans, sans-serif' }}>
                {timingStatus.icon} {timingStatus.label}
              </p>
            </div>
          </div>
        </div>

        {/* Meeting Link */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#78716C', marginBottom: 12 }}>
            Meeting Link
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link2 size={15} style={{ color: '#78716C', flexShrink: 0 }} />
            {event.hasMeetingLink && event.meetingUrl ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                <a
                  href={event.meetingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13, color: '#FB923C', textDecoration: 'none', cursor: 'pointer' }}
                >
                  {truncateUrl(event.meetingUrl)}
                </a>
                <button
                  onClick={handleCopyUrl}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#78716C', padding: 0 }}
                >
                  {copied ? <CheckCircle2 size={14} style={{ color: '#22c55e' }} /> : <Copy size={14} />}
                </button>
              </div>
            ) : (
              <p style={{ fontSize: 13, color: '#78716C', margin: 0, fontStyle: 'italic' }}>No meeting link found</p>
            )}
          </div>
        </div>

        {/* Attendees */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#78716C', marginBottom: 12 }}>
            Attendees
          </div>
          <p style={{ fontSize: 13, color: '#78716C', margin: 0 }}>No attendee info available</p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: '#292524', marginBottom: 24 }} />

        {/* Recording Options */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#78716C', marginBottom: 16 }}>
            Record This Meeting
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Extension Option */}
            <div
              style={{
                border: '1px solid #292524',
                borderRadius: 12,
                padding: 16,
                background: 'transparent',
                cursor: event.hasMeetingLink ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                opacity: event.hasMeetingLink ? 1 : 0.4,
              }}
              onMouseEnter={(e) => {
                if (event.hasMeetingLink) {
                  e.currentTarget.style.background = 'rgba(249,115,22,0.04)';
                  e.currentTarget.style.borderColor = '#44403C';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = '#292524';
              }}
              title={!event.hasMeetingLink ? 'No meeting link to join' : ''}
            >
              <p style={{ fontSize: 13, fontWeight: 600, color: '#FAFAF9', margin: '0 0 6px 0' }}>📋 Record with Extension</p>
              <p style={{ fontSize: 12, color: '#78716C', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                Open the meeting and your Chrome extension will capture the audio automatically.
              </p>
              <Button
                onClick={handleOpenMeeting}
                disabled={!event.hasMeetingLink}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(249,115,22,0.2)',
                  color: '#FB923C',
                  fontSize: 12,
                  padding: '8px 12px',
                  cursor: event.hasMeetingLink ? 'pointer' : 'not-allowed',
                  opacity: event.hasMeetingLink ? 1 : 0.5,
                }}
              >
                Open Meeting →
              </Button>
            </div>

            {/* Bot Option */}
            <div
              style={{
                border: '1px solid rgba(249,115,22,0.25)',
                borderRadius: 12,
                padding: 16,
                background: 'rgba(249,115,22,0.04)',
                cursor: event.hasMeetingLink ? 'pointer' : 'not-allowed',
                opacity: event.hasMeetingLink ? 1 : 0.4,
              }}
            >
              <p style={{ fontSize: 13, fontWeight: 600, color: '#FAFAF9', margin: '0 0 6px 0' }}>🤖 Send Bot to Join</p>
              <p style={{ fontSize: 12, color: '#78716C', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                EchoBrief's bot will join the meeting automatically and record it for you.
              </p>

              {botStatus === 'idle' && (
                <Button
                  onClick={handleSendBot}
                  disabled={!event.hasMeetingLink}
                  style={{
                    background: event.hasMeetingLink ? 'linear-gradient(135deg, #F97316, #F59E0B)' : '#44403C',
                    color: 'white',
                    fontSize: 12,
                    padding: '8px 12px',
                    border: 'none',
                    cursor: event.hasMeetingLink ? 'pointer' : 'not-allowed',
                  }}
                >
                  Send Bot →
                </Button>
              )}

              {botStatus === 'loading' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#FB923C', fontSize: 12 }}>
                  <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                  Sending...
                </div>
              )}

              {botStatus === 'joined' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#22c55e', fontSize: 12 }}>
                  <CheckCircle2 size={14} />
                  <span>Bot is joining...</span>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#22c55e',
                      animation: 'pulse 2s infinite',
                    }}
                  />
                </div>
              )}

              {botStatus === 'error' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#EF4444', fontSize: 12 }}>
                  <AlertCircle size={14} />
                  Failed to send bot
                </div>
              )}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes modalEntrance {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
