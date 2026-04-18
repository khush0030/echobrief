import { motion } from 'framer-motion';

type Line = {
  time: string;
  initials: string;
  name: string;
  text: string;
  accent?: 'ember' | 'gold' | 'neutral';
};

const lines: Line[] = [
  {
    time: '00:01:24',
    initials: 'PK',
    name: 'Priya K.',
    text: 'हम इस quarter में तीन priorities पर focus करेंगे — Sarvam pipeline पहले, फिर Slack rollout.',
    accent: 'ember',
  },
  {
    time: '00:01:52',
    initials: 'RS',
    name: 'Rahul S.',
    text: "Agreed. I'll own the integration checklist by Friday.",
    accent: 'gold',
  },
  {
    time: '00:02:08',
    initials: 'AM',
    name: 'Aman M.',
    text: 'Should we loop in the Chennai team for localisation?',
    accent: 'neutral',
  },
];

const miniStats = [
  { label: 'Duration', value: '34:12', highlight: false },
  { label: 'Speakers', value: '6', highlight: false },
  { label: 'Actions', value: '3', highlight: true },
];

const accentStyles = {
  ember: {
    av: { background: 'var(--landing-ember-tint-12)', color: 'var(--landing-ember)' },
    name: 'var(--landing-ember)',
  },
  gold: {
    av: { background: 'var(--landing-gold-tint)', color: 'var(--gold)' },
    name: 'var(--gold)',
  },
  neutral: {
    av: { background: 'var(--landing-hover-bg)', color: 'var(--landing-text-mid)' },
    name: 'var(--landing-text-mid)',
  },
} as const;

export function HeroShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="relative mx-auto w-full max-w-[460px] lg:mx-0"
    >
      {/* Warm glow orbs around the mockup */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-12 h-48 w-48 rounded-full blur-3xl"
        style={{ background: 'var(--landing-orb-ember)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full blur-3xl"
        style={{ background: 'var(--landing-orb-gold)' }}
      />

      <div
        className="landing-float-slow relative overflow-hidden rounded-[22px]"
        style={{
          background: 'var(--landing-bg-card)',
          border: '1px solid var(--landing-border)',
          boxShadow: 'var(--landing-card-shadow)',
        }}
      >
        {/* Ember-to-gold brand signature stripe — m-card::before from brand kit */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px]"
          style={{ background: 'linear-gradient(90deg, var(--landing-ember), var(--gold))' }}
        />

        {/* Topbar */}
        <div
          className="flex items-center justify-between gap-3 px-5 py-4"
          style={{ borderBottom: '1px solid var(--landing-border-subtle)' }}
        >
          <div>
            <p
              className="text-[9px] font-medium uppercase"
              style={{
                fontFamily: 'var(--font-mono-brand)',
                color: 'var(--landing-faint)',
                letterSpacing: '0.22em',
              }}
            >
              Sales Team · Q3 Sync
            </p>
            <p
              className="mt-1 text-[16px] leading-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--landing-text)', letterSpacing: '-0.01em' }}
            >
              Q3 Strategy Review
            </p>
          </div>
          {/* Recording pill with brand-kit blinking dot */}
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              fontFamily: 'var(--font-mono-brand)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: 'var(--landing-ember)',
              border: '1px solid var(--landing-ember-tint-25)',
              background: 'var(--landing-ember-tint-7)',
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: 'var(--landing-ember)',
                boxShadow: '0 0 7px var(--landing-ember)',
                animation: 'landing-rec-blink 1.2s infinite',
              }}
            />
            LIVE
          </span>
        </div>

        {/* Language tags row */}
        <div className="flex flex-wrap gap-1.5 px-5 pt-4">
          {['हिंदी', 'English', 'தமிழ்'].map((l) => (
            <span
              key={l}
              className="inline-flex items-center rounded-[7px] px-2.5 py-1"
              style={{
                fontFamily: 'var(--font-body-brand)',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--landing-ember)',
                background: 'var(--landing-ember-tint-7)',
                border: '1px solid var(--landing-ember-tint-25)',
              }}
            >
              {l}
            </span>
          ))}
          <span
            className="inline-flex items-center rounded-[7px] px-2.5 py-1"
            style={{
              fontFamily: 'var(--font-mono-brand)',
              fontSize: '10px',
              color: 'var(--landing-faint)',
              background: 'var(--landing-hover-bg)',
              border: '1px solid var(--landing-border)',
              letterSpacing: '0.1em',
            }}
          >
            +7 more
          </span>
        </div>

        {/* Transcript lines — brand kit t-line pattern */}
        <div className="landing-shimmer space-y-0 px-5 pb-2 pt-3">
          {lines.map((line, i) => {
            const a = accentStyles[line.accent ?? 'neutral'];
            return (
              <div
                key={i}
                className="flex gap-3 py-3"
                style={{
                  borderBottom: i === lines.length - 1 ? 'none' : '1px solid var(--landing-border-subtle)',
                }}
              >
                <span
                  className="shrink-0 pt-0.5 text-[9px]"
                  style={{ fontFamily: 'var(--font-mono-brand)', color: 'var(--landing-faint)', letterSpacing: '0.06em' }}
                >
                  {line.time}
                </span>
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                  style={a.av}
                >
                  {line.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className="text-[10px] font-bold uppercase"
                    style={{ fontFamily: 'var(--font-mono-brand)', color: a.name, letterSpacing: '0.14em' }}
                  >
                    {line.name}
                  </p>
                  <p
                    className="mt-1 text-[13px] leading-[1.55]"
                    style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-text-mid)' }}
                  >
                    {line.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mini stat cells — brand kit stat-c pattern */}
        <div className="grid grid-cols-3 gap-2 border-t px-5 py-4" style={{ borderColor: 'var(--landing-border-subtle)' }}>
          {miniStats.map((s) => (
            <div
              key={s.label}
              className="rounded-[12px] px-3 py-2.5 text-center"
              style={{
                background: s.highlight ? 'var(--landing-ember-tint-7)' : 'var(--landing-bg-input)',
                border: `1px solid ${s.highlight ? 'var(--landing-ember-tint-25)' : 'var(--landing-border-subtle)'}`,
              }}
            >
              <div
                className="text-[8px] font-semibold uppercase"
                style={{
                  fontFamily: 'var(--font-mono-brand)',
                  color: s.highlight ? 'var(--landing-ember)' : 'var(--landing-faint)',
                  letterSpacing: '0.22em',
                }}
              >
                {s.label}
              </div>
              <div
                className="mt-1 leading-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  color: s.highlight ? 'var(--landing-ember)' : 'var(--landing-text)',
                  letterSpacing: '-0.01em',
                }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Waveform footer — ember→gold gradient bars */}
        <div
          className="px-5 py-4"
          style={{ borderTop: '1px solid var(--landing-border-subtle)', background: 'var(--landing-bg-raised)' }}
        >
          <div className="flex h-8 items-end justify-between gap-[3px]">
            {Array.from({ length: 32 }).map((_, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${20 + ((i * 31) % 70)}%`,
                  background: 'linear-gradient(to top, var(--landing-ember), var(--gold))',
                  opacity: 0.55,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <p
        className="mt-4 text-center text-[10px] lg:text-left"
        style={{
          fontFamily: 'var(--font-mono-brand)',
          color: 'var(--landing-faint)',
          letterSpacing: '0.18em',
        }}
      >
        ILLUSTRATIVE · Your dashboard shows real transcripts
      </p>
    </motion.div>
  );
}
