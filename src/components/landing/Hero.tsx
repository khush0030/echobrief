import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeroShowcase } from '@/components/landing/HeroShowcase';
import { ArrowRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease, delay: 0.08 * i },
  }),
};

const stats = [
  { label: 'Languages', value: '22', mono: false },
  { label: 'Platforms', value: '3', mono: false },
  { label: 'Delivery', value: 'Slack · WhatsApp · Email', mono: true },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-24 md:pb-32 lg:pt-16 lg:pb-36">
      {/* Warm Intelligence orbs — brand kit cover motif */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-32 h-[560px] w-[560px] rounded-full"
        style={{ background: 'radial-gradient(circle, var(--landing-orb-ember) 0%, transparent 65%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[380px] w-[380px] rounded-full"
        style={{ background: 'radial-gradient(circle, var(--landing-orb-gold) 0%, transparent 65%)' }}
      />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
        <div>
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fade}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full px-4 py-2"
            style={{
              border: '1px solid var(--landing-ember-tint-25)',
              background: 'var(--landing-ember-tint-7)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 motion-reduce:animate-none" style={{ background: 'var(--landing-ember)' }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--landing-ember)' }} />
            </span>
            <span
              className="text-[11px] font-semibold uppercase"
              style={{ fontFamily: 'var(--font-mono-brand)', color: 'var(--landing-ember)', letterSpacing: '0.18em' }}
            >
              Now supporting 22 Indian languages
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fade}
            className="max-w-[640px] text-[3rem] leading-[1.02] md:text-[4rem] lg:text-[4.6rem]"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--landing-text)',
              letterSpacing: '-0.035em',
            }}
          >
            Every meeting, summarized.
            <br />
            <em style={{ color: 'var(--landing-ember)', fontStyle: 'italic' }}>In any Indian language.</em>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fade}
            className="mt-7 max-w-[520px] text-[17px] leading-[1.7] md:text-[18px]"
            style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-muted)' }}
          >
            EchoBrief joins your Meet, Zoom, and Teams calls, transcribes Hindi,
            Tamil, Hinglish — the way your team actually talks — and ships briefs
            to Slack, WhatsApp, or email before you're back at your desk.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fade}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/auth"
              className="group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-[15px] font-bold text-white no-underline transition-all duration-200 hover:-translate-y-0.5"
              style={{
                fontFamily: 'var(--font-body-brand)',
                background: 'var(--landing-ember)',
                boxShadow: 'var(--landing-ember-shadow)',
              }}
            >
              Start free — no card
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center rounded-full px-7 py-4 text-[15px] font-semibold no-underline transition-all duration-200"
              style={{
                fontFamily: 'var(--font-body-brand)',
                color: 'var(--landing-text)',
                border: '1.5px solid var(--landing-border)',
                background: 'transparent',
              }}
            >
              See how it works
            </a>
          </motion.div>

          <motion.p
            custom={4}
            initial="hidden"
            animate="show"
            variants={fade}
            className="mt-5 text-[13px]"
            style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-faint)' }}
          >
            Free for your first 3 meetings · No Chrome extension · Connect your calendar in 30 seconds
          </motion.p>

          <motion.dl
            custom={5}
            initial="hidden"
            animate="show"
            variants={fade}
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[16px] px-5 py-4"
                style={{
                  border: '1px solid var(--landing-border)',
                  background: 'var(--landing-bg-card)',
                  boxShadow: 'var(--landing-card-shadow)',
                }}
              >
                <dt
                  className="text-[9px] font-semibold uppercase"
                  style={{
                    fontFamily: 'var(--font-mono-brand)',
                    color: 'var(--landing-faint)',
                    letterSpacing: '0.22em',
                  }}
                >
                  {stat.label}
                </dt>
                <dd
                  className={`mt-2 leading-none ${stat.mono ? 'text-[14px]' : 'text-[34px]'}`}
                  style={{
                    fontFamily: stat.mono ? 'var(--font-body-brand)' : 'var(--font-display)',
                    color: 'var(--landing-text)',
                    letterSpacing: stat.mono ? '0' : '-0.02em',
                    fontWeight: stat.mono ? 600 : 400,
                  }}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <HeroShowcase />
      </div>
    </section>
  );
}
