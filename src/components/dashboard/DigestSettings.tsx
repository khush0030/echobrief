import { useState, useEffect } from 'react';
import { Mail, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface DigestSettingsProps {
  user_id?: string;
  onSave?: () => void;
}

export function DigestSettings({ user_id, onSave }: DigestSettingsProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [frequency, setFrequency] = useState<'weekly' | 'monthly' | 'disabled'>('weekly');
  const [dayOfWeek, setDayOfWeek] = useState(1); // Monday
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(0);
  const [emails, setEmails] = useState('');

  useEffect(() => {
    if (!user_id) return;

    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('digest_schedules')
          .select('*')
          .eq('user_id', user_id)
          .single();

        if (data) {
          setFrequency(data.frequency);
          setDayOfWeek(data.day_of_week);
          setDayOfMonth(data.day_of_month);
          setHour(data.hour_of_day);
          setMinute(data.minute_of_hour);
        }
      } catch (err) {
        console.log('No existing settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [user_id]);

  const handleSave = async () => {
    if (!user_id || !emails.trim()) {
      toast({ title: 'Error', description: 'Please enter at least one email', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const emailList = emails.split(',').map(e => e.trim()).filter(e => e);

      const { error } = await supabase
        .from('digest_schedules')
        .upsert({
          user_id,
          frequency,
          day_of_week: dayOfWeek,
          day_of_month: dayOfMonth,
          hour_of_day: hour,
          minute_of_hour: minute,
          enabled: frequency !== 'disabled',
        }, {
          onConflict: 'user_id',
        });

      if (error) throw error;

      toast({ title: 'Saved', description: 'Digest settings updated' });
      onSave?.();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ color: '#A8A29E' }}>Loading settings...</div>;
  }

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 15, 30, 45];

  return (
    <div style={{ background: '#1C1917', border: '1px solid #292524', borderRadius: 16, padding: 20 }}>
      <h3 className="text-[15px] font-semibold text-foreground mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
        <Mail size={16} style={{ display: 'inline-block', marginRight: 8, color: '#FB923C' }} />
        Digest Report Settings
      </h3>

      <div className="space-y-4">
        {/* Frequency */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#FAFAF9' }}>
            Frequency
          </label>
          <div className="flex gap-2">
            {(['weekly', 'monthly', 'disabled'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFrequency(f)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: `1px solid ${frequency === f ? '#F97316' : '#292524'}`,
                  background: frequency === f ? 'rgba(249,115,22,0.1)' : 'transparent',
                  color: frequency === f ? '#FB923C' : '#A8A29E',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: 'inherit',
                }}
              >
                {f === 'disabled' ? 'Disabled' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {frequency !== 'disabled' && (
          <>
            {/* Day Selection */}
            {frequency === 'weekly' ? (
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#FAFAF9' }}>
                  Send on
                </label>
                <select
                  value={dayOfWeek}
                  onChange={(e) => setDayOfWeek(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #292524',
                    background: '#1C1917',
                    color: '#FAFAF9',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  {days.map((d, i) => (
                    <option key={i} value={i}>{d}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#FAFAF9' }}>
                  Day of month
                </label>
                <select
                  value={dayOfMonth}
                  onChange={(e) => setDayOfMonth(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #292524',
                    background: '#1C1917',
                    color: '#FAFAF9',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#FAFAF9' }}>
                Time
              </label>
              <div className="flex gap-2">
                <select
                  value={hour}
                  onChange={(e) => setHour(parseInt(e.target.value))}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #292524',
                    background: '#1C1917',
                    color: '#FAFAF9',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  {hours.map(h => (
                    <option key={h} value={h}>
                      {String(h).padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <span style={{ color: '#78716C', alignSelf: 'center' }}>:</span>
                <select
                  value={minute}
                  onChange={(e) => setMinute(parseInt(e.target.value))}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #292524',
                    background: '#1C1917',
                    color: '#FAFAF9',
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  {minutes.map(m => (
                    <option key={m} value={m}>
                      {String(m).padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        {/* Recipient Emails */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#FAFAF9' }}>
            Recipient emails (comma-separated)
          </label>
          <textarea
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            placeholder="your@email.com, team@example.com"
            rows={3}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 8,
              border: '1px solid #292524',
              background: '#1C1917',
              color: '#FAFAF9',
              fontFamily: 'inherit',
              fontSize: 13,
              resize: 'vertical',
            }}
          />
          <p className="text-xs mt-1" style={{ color: '#78716C' }}>
            Leave empty to disable digest reports
          </p>
        </div>

        {/* Save Button */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={handleSave}
            disabled={saving}
            style={{
              background: '#FB923C',
              color: '#fff',
              flex: 1,
            }}
          >
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save size={14} className="mr-2" />}
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
