import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  { num: '01', title: 'Connect calendar', description: 'Link Google Calendar or Outlook. About thirty seconds.' },
  { num: '02', title: 'Bot auto-joins', description: 'EchoBrief joins before start time. No click, no extension in the room.' },
  { num: '03', title: 'Transcribe & understand', description: 'Sarvam STT, diarization, and insight extraction tuned for Indian speech.' },
  { num: '04', title: 'Deliver the brief', description: 'Summary, actions, risks — via Slack, WhatsApp, or email in your language.' },
];

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-32"
      style={{
        borderTop: '1px solid var(--landing-border-subtle)',
        borderBottom: '1px solid var(--landing-border-subtle)',
        background: 'var(--landing-bg-raised)',
      }}
    >
      {/* Soft ember wash, brand kit style */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full blur-3xl"
        style={{ background: 'var(--landing-orb-ember)' }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-2xl md:mb-20"
        >
          <span
            className="mb-4 inline-block text-[11px] font-semibold uppercase"
            style={{ fontFamily: 'var(--font-mono-brand)', color: 'var(--landing-ember)', letterSpacing: '0.18em' }}
          >
            How it works
          </span>
          <h2
            className="leading-[1.05]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(34px,5vw,54px)',
              color: 'var(--landing-text)',
              letterSpacing: '-0.03em',
            }}
          >
            Connect once.{' '}
            <em style={{ color: 'var(--landing-ember)', fontStyle: 'italic' }}>EchoBrief does the rest.</em>
          </h2>
          <p
            className="mt-5 max-w-lg text-[16px] leading-[1.75]"
            style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-muted)' }}
          >
            Four steps, one setup, every meeting that follows — no clicks in the room.
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated ember→gold connector rail */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[8%] right-[8%] top-[42px] hidden h-[2px] overflow-hidden rounded-full lg:block"
            style={{ background: 'var(--landing-border)' }}
          >
            <motion.div
              className="h-full"
              style={{
                background: 'linear-gradient(90deg, var(--landing-ember), var(--gold), var(--landing-ember))',
                transformOrigin: 'left',
              }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {steps.map((step, idx) => (
              <motion.article
                key={step.num}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.12 + idx * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col rounded-[22px] p-7 transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: '1px solid var(--landing-border)',
                  background: 'var(--landing-bg-card)',
                  boxShadow: 'var(--landing-card-shadow)',
                }}
              >
                {/* Brand-kit square ember tile with DM Serif number */}
                <div
                  className="mb-6 flex h-[84px] w-[84px] items-center justify-center rounded-[20px]"
                  style={{
                    background: 'var(--landing-ember)',
                    boxShadow: 'var(--landing-ember-shadow)',
                    color: 'white',
                  }}
                >
                  <span
                    className="leading-none"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '36px',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3
                  className="mb-2 text-[20px] leading-tight"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--landing-text)', letterSpacing: '-0.01em' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[14.5px] leading-[1.65]"
                  style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-muted)' }}
                >
                  {step.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
