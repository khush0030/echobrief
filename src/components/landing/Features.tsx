import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

type Tone = 'ember' | 'gold' | 'neutral';

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  kicker: string;
  tone: Tone;
};

const makeIcon = (paths: React.ReactNode) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {paths}
  </svg>
);

const features: Feature[] = [
  {
    kicker: 'Capture',
    title: 'Auto-join and record',
    description: "Connect your calendar. EchoBrief's bot joins Meet, Zoom, and Teams before start time. No extension. No manual start.",
    tone: 'ember',
    icon: makeIcon(
      <>
        <rect x="9" y="2" width="6" height="11" rx="3" />
        <path d="M5 10 Q5 16 12 16 Q19 16 19 10" />
        <line x1="12" y1="16" x2="12" y2="20" />
        <line x1="8" y1="20" x2="16" y2="20" />
      </>,
    ),
  },
  {
    kicker: 'Speech',
    title: '22 Indian languages',
    description: 'Sarvam Saaras v3: built for Hinglish, Tanglish, and native scripts. Summaries in the language your team prefers.',
    tone: 'gold',
    icon: makeIcon(
      <>
        <circle cx="12" cy="12" r="9" />
        <line x1="3.6" y1="9" x2="20.4" y2="9" />
        <line x1="3.6" y1="15" x2="20.4" y2="15" />
        <path d="M12 3 Q8 9 8 12 Q8 15 12 21" />
        <path d="M12 3 Q16 9 16 12 Q16 15 12 21" />
      </>,
    ),
  },
  {
    kicker: 'Intelligence',
    title: 'Decision-grade briefs',
    description: 'Executive summary, owners on action items, flagged risks, timeline. Not a raw transcript wall.',
    tone: 'neutral',
    icon: makeIcon(
      <>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="13" y2="17" />
      </>,
    ),
  },
  {
    kicker: 'People',
    title: 'Speaker attribution',
    description: 'Diarization matched to calendar names so "who said what" stays accurate in every brief.',
    tone: 'ember',
    icon: makeIcon(
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>,
    ),
  },
  {
    kicker: 'Reach',
    title: 'WhatsApp delivery',
    description: 'Briefs land where your team already works, with per-language routing when you need it.',
    tone: 'gold',
    icon: makeIcon(
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </>,
    ),
  },
  {
    kicker: 'Trust',
    title: 'Data stays in India',
    description: "Processing aligned with Sarvam's Indian cloud posture. DPDP-aware handling for your org.",
    tone: 'neutral',
    icon: makeIcon(
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </>,
    ),
  },
];

const toneStyles: Record<Tone, { iconBg: string; iconColor: string; kicker: string }> = {
  ember: {
    iconBg: 'var(--landing-ember-tint-12)',
    iconColor: 'var(--landing-ember)',
    kicker: 'var(--landing-ember)',
  },
  gold: {
    iconBg: 'var(--landing-gold-tint)',
    iconColor: 'var(--gold)',
    kicker: 'var(--gold)',
  },
  neutral: {
    iconBg: 'var(--landing-hover-bg)',
    iconColor: 'var(--landing-text-mid)',
    kicker: 'var(--landing-faint)',
  },
};

function Kicker({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span
      className="text-[10px] font-semibold uppercase"
      style={{
        fontFamily: 'var(--font-mono-brand)',
        color: toneStyles[tone].kicker,
        letterSpacing: '0.22em',
      }}
    >
      {children}
    </span>
  );
}

function IconTile({ tone, children, size = 44 }: { tone: Tone; children: React.ReactNode; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-[14px]"
      style={{
        width: size,
        height: size,
        background: toneStyles[tone].iconBg,
        color: toneStyles[tone].iconColor,
      }}
    >
      {children}
    </div>
  );
}

function FeatureCard({
  feature,
  variant = 'default',
}: {
  feature: Feature;
  variant?: 'default' | 'lead' | 'banner';
}) {
  const isLead = variant === 'lead';
  const isBanner = variant === 'banner';

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-[22px] transition-all duration-300 hover:-translate-y-1"
      style={{
        border: '1px solid var(--landing-border)',
        background: 'var(--landing-bg-card)',
        boxShadow: 'var(--landing-card-shadow)',
        padding: isLead ? '36px' : '28px',
      }}
    >
      {/* Ember→gold signature stripe on lead card only — brand kit m-card::before */}
      {isLead && (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px]"
          style={{ background: 'linear-gradient(90deg, var(--landing-ember), var(--gold))' }}
        />
      )}

      {/* Soft hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            feature.tone === 'gold'
              ? 'radial-gradient(ellipse 80% 60% at 100% 0%, var(--landing-gold-tint), transparent 55%)'
              : 'radial-gradient(ellipse 80% 60% at 100% 0%, var(--landing-ember-tint-7), transparent 55%)',
        }}
      />

      <div className={`relative z-[1] ${isBanner ? 'flex flex-wrap items-center gap-6 md:flex-nowrap' : 'flex h-full flex-col'}`}>
        {isBanner ? (
          <>
            <IconTile tone={feature.tone} size={56}>
              {feature.icon}
            </IconTile>
            <div className="min-w-0 flex-1">
              <Kicker tone={feature.tone}>{feature.kicker}</Kicker>
              <h3
                className="mt-1.5 text-[22px] leading-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--landing-text)', letterSpacing: '-0.01em' }}
              >
                {feature.title}
              </h3>
              <p
                className="mt-2 text-[14.5px] leading-[1.7]"
                style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-muted)' }}
              >
                {feature.description}
              </p>
            </div>
          </>
        ) : (
          <>
            <Kicker tone={feature.tone}>{feature.kicker}</Kicker>
            <div className={isLead ? 'mt-5' : 'mt-4'}>
              <IconTile tone={feature.tone} size={isLead ? 52 : 44}>
                {feature.icon}
              </IconTile>
            </div>
            <h3
              className={`leading-tight ${isLead ? 'mt-6 text-[28px]' : 'mt-4 text-[20px]'}`}
              style={{ fontFamily: 'var(--font-display)', color: 'var(--landing-text)', letterSpacing: '-0.01em' }}
            >
              {feature.title}
            </h3>
            <p
              className={`leading-[1.7] ${isLead ? 'mt-3 max-w-md text-[15.5px]' : 'mt-2 text-[14px]'}`}
              style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-muted)' }}
            >
              {feature.description}
            </p>
            {isLead && (
              <div
                aria-hidden
                className="mt-auto pt-8"
              >
                <div
                  className="h-px w-full"
                  style={{
                    background:
                      'linear-gradient(90deg, var(--landing-ember), var(--landing-gold-tint), transparent)',
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="features"
      ref={ref}
      className="scroll-mt-24 py-24 md:py-32"
      style={{ borderTop: '1px solid var(--landing-border-subtle)' }}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-2xl"
        >
          <span
            className="mb-4 inline-block text-[11px] font-semibold uppercase"
            style={{ fontFamily: 'var(--font-mono-brand)', color: 'var(--landing-ember)', letterSpacing: '0.18em' }}
          >
            What you get
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
            Everything after the meeting,{' '}
            <em style={{ color: 'var(--landing-ember)', fontStyle: 'italic' }}>without the homework.</em>
          </h2>
          <p
            className="mt-5 max-w-xl text-[16px] leading-[1.75]"
            style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-muted)' }}
          >
            Calendar-aware bot, multilingual transcripts, decision-grade briefs — delivered where your team already works.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="lg:col-span-2 lg:row-span-2"
          >
            <FeatureCard feature={features[0]} variant="lead" />
          </motion.div>

          {[1, 2].map((idx, k) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 * (k + 1), duration: 0.5 }}
              className={k === 0 ? 'lg:col-span-2 lg:col-start-3 lg:row-start-1' : 'lg:col-span-2 lg:col-start-3 lg:row-start-2'}
            >
              <FeatureCard feature={features[idx]} />
            </motion.div>
          ))}

          {[3, 4].map((idx, k) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + 0.05 * k, duration: 0.5 }}
              className="lg:col-span-2"
            >
              <FeatureCard feature={features[idx]} />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="lg:col-span-4"
          >
            <FeatureCard feature={features[5]} variant="banner" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
