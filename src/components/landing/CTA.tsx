import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="pricing" ref={ref} className="scroll-mt-24 py-24 md:py-28">
      <div className="mx-auto max-w-[1100px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="landing-cta-glow relative overflow-hidden rounded-[30px] px-8 py-16 text-center md:px-14 md:py-20"
          style={{
            border: '1px solid var(--landing-ember-tint-25)',
            background: 'var(--landing-bg-card)',
            boxShadow: 'var(--landing-card-shadow)',
          }}
        >
          <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl" style={{ background: 'var(--landing-orb-ember)' }} />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl" style={{ background: 'var(--landing-orb-gold)' }} />

          {/* Brand signature stripe */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
            style={{ background: 'linear-gradient(90deg, var(--landing-ember), var(--gold))' }}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              fontFamily: 'var(--font-mono-brand)',
              fontSize: '10px',
              letterSpacing: '0.24em',
              color: 'var(--landing-ember)',
              border: '1px solid var(--landing-ember-tint-25)',
              background: 'var(--landing-ember-tint-7)',
            }}
          >
            <Sparkles className="h-3 w-3" />
            FREE TO START
          </motion.div>

          <h2
            className="relative mb-5 leading-[1.05]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px,4.5vw,52px)',
              color: 'var(--landing-text)',
              letterSpacing: '-0.03em',
            }}
          >
            Stop taking notes.{' '}
            <em style={{ color: 'var(--landing-ember)', fontStyle: 'italic' }}>Start deciding.</em>
          </h2>

          <p
            className="relative mx-auto mb-10 max-w-md text-[16px] leading-[1.75]"
            style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-muted)' }}
          >
            Connect your calendar in 30 seconds. EchoBrief handles every meeting that follows — in the language your team actually speaks.
          </p>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/auth"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-10 py-4 text-[16px] font-bold text-white no-underline transition-all duration-200"
              style={{
                fontFamily: 'var(--font-body-brand)',
                background: 'var(--landing-ember)',
                boxShadow: 'var(--landing-ember-shadow-lg)',
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative">Start free — no card</span>
              <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </motion.div>

          <p
            className="relative mt-5 text-[12px]"
            style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-faint)' }}
          >
            Free for your first 3 meetings · Cancel anytime · Data stays in India
          </p>
        </motion.div>
      </div>
    </section>
  );
}
