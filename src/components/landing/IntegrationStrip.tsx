import { motion } from 'framer-motion';
import { Calendar, Mail, MessageCircle, MonitorPlay, Slack, Video } from 'lucide-react';

const items = [
  { Icon: Video, label: 'Google Meet', hint: 'Browser & Workspace' },
  { Icon: MonitorPlay, label: 'Zoom', hint: 'Web client' },
  { Icon: MonitorPlay, label: 'Microsoft Teams', hint: 'Web & desktop' },
  { Icon: Calendar, label: 'Google Calendar', hint: 'Auto-join rules' },
  { Icon: Slack, label: 'Slack', hint: 'Channel delivery' },
  { Icon: MessageCircle, label: 'WhatsApp', hint: 'Brief to chat' },
  { Icon: Mail, label: 'Email', hint: 'Digests & alerts' },
];

export function IntegrationStrip() {
  return (
    <section
      id="integrations"
      className="relative scroll-mt-24 py-12"
      style={{ borderTop: '1px solid var(--landing-border-subtle)', borderBottom: '1px solid var(--landing-border-subtle)' }}
    >
      <div className="relative mx-auto max-w-[1200px] px-6">
        <p
          className="mb-8 text-center text-[10px] font-medium uppercase tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-mono-brand)', color: 'var(--landing-faint)' }}
        >
          Works with your stack
        </p>
        <div className="flex flex-wrap items-stretch justify-center gap-3 md:gap-4">
          {items.map(({ Icon, label, hint }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex min-w-[140px] flex-1 flex-col items-center rounded-2xl px-4 py-4 text-center transition-all duration-200 sm:min-w-[160px] md:flex-initial"
              style={{
                border: '1px solid var(--landing-border)',
                background: 'var(--landing-bg-card)',
                boxShadow: 'var(--landing-card-shadow)',
              }}
            >
              <div
                className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                style={{
                  background: 'color-mix(in srgb, var(--landing-ember) 10%, transparent)',
                  color: 'var(--landing-ember)',
                }}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <span
                className="text-[13px] font-semibold"
                style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-text)' }}
              >
                {label}
              </span>
              <span
                className="mt-0.5 text-[10px]"
                style={{ fontFamily: 'var(--font-mono-brand)', color: 'var(--landing-faint)' }}
              >
                {hint}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
