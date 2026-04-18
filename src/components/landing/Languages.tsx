import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

type Lang = { native: string; latin: string };

const primary: Lang[] = [
  { native: 'हिंदी', latin: 'Hindi' },
  { native: 'English', latin: 'English (Indian)' },
  { native: 'தமிழ்', latin: 'Tamil' },
  { native: 'বাংলা', latin: 'Bengali' },
  { native: 'తెలుగు', latin: 'Telugu' },
  { native: 'ਪੰਜਾਬੀ', latin: 'Punjabi' },
  { native: 'मराठी', latin: 'Marathi' },
  { native: 'ಕನ್ನಡ', latin: 'Kannada' },
  { native: 'മലയാളം', latin: 'Malayalam' },
  { native: 'ગુજરાતી', latin: 'Gujarati' },
];

const also: Lang[] = [
  { native: 'ଓଡ଼ିଆ', latin: 'Odia' },
  { native: 'অসমীয়া', latin: 'Assamese' },
  { native: 'मैथिली', latin: 'Maithili' },
  { native: 'संस्कृत', latin: 'Sanskrit' },
  { native: 'اردو', latin: 'Urdu' },
  { native: 'कोंकणी', latin: 'Konkani' },
  { native: 'डोगरी', latin: 'Dogri' },
  { native: 'سنڌي', latin: 'Sindhi' },
  { native: 'ꯃꯤꯇꯩ', latin: 'Manipuri' },
  { native: 'बर\u200dो', latin: 'Bodo' },
  { native: 'ᱥᱟᱱᱛᱟᱲᱤ', latin: 'Santali' },
  { native: 'कॉशुर', latin: 'Kashmiri' },
];

const chipVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 6 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 0.02 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Languages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="languages"
      ref={ref}
      className="scroll-mt-24 py-24 md:py-32"
      style={{ borderTop: '1px solid var(--landing-border-subtle)' }}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-2xl"
        >
          <span
            className="mb-4 inline-block text-[11px] font-semibold uppercase"
            style={{ fontFamily: 'var(--font-mono-brand)', color: 'var(--landing-ember)', letterSpacing: '0.18em' }}
          >
            Languages
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
            Built for how{' '}
            <em style={{ color: 'var(--landing-ember)', fontStyle: 'italic' }}>India actually speaks.</em>
          </h2>
          <p
            className="mt-5 max-w-xl text-[16px] leading-[1.75]"
            style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-muted)' }}
          >
            Hinglish, Tanglish, and every code-mixed variant your standups already use — accurate on native scripts, not just romanized approximations.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* Left: Big 22 counter card — brand kit stat-c dialed to hero scale */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col overflow-hidden rounded-[22px] p-8"
            style={{
              border: '1px solid var(--landing-ember-tint-25)',
              background: 'var(--landing-ember-tint-7)',
              boxShadow: 'var(--landing-card-shadow)',
            }}
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{ background: 'linear-gradient(90deg, var(--landing-ember), var(--gold))' }}
            />
            <span
              className="text-[10px] font-semibold uppercase"
              style={{
                fontFamily: 'var(--font-mono-brand)',
                color: 'var(--landing-ember)',
                letterSpacing: '0.28em',
              }}
            >
              Coverage
            </span>
            <div
              className="mt-3 leading-none"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(96px,12vw,140px)',
                color: 'var(--landing-ember)',
                letterSpacing: '-0.06em',
              }}
            >
              22
            </div>
            <p
              className="mt-2 text-[17px]"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--landing-text)', letterSpacing: '-0.01em' }}
            >
              Indian languages, detected automatically.
            </p>
            <p
              className="mt-4 text-[13px] leading-[1.7]"
              style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-muted)' }}
            >
              Hinglish, Tanglish, and every messy code-mixed variant your standups already use.
            </p>

            {/* Hindi proof-line — brand kit transcript style */}
            <div
              className="mt-6 rounded-[14px] p-4"
              style={{ background: 'var(--landing-bg-card)', border: '1px solid var(--landing-border)' }}
            >
              <div
                className="mb-2 text-[9px] font-semibold uppercase"
                style={{ fontFamily: 'var(--font-mono-brand)', color: 'var(--landing-ember)', letterSpacing: '0.2em' }}
              >
                Live sample
              </div>
              <p
                className="text-[13.5px] leading-[1.55]"
                style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-text-mid)' }}
              >
                "हम Q3 scope lock करेंगे — Sarvam pipeline पहले, फिर Slack rollout."
              </p>
            </div>
          </motion.div>

          {/* Right: chip wall with native scripts */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative overflow-hidden rounded-[22px] p-8"
            style={{
              border: '1px solid var(--landing-border)',
              background: 'var(--landing-bg-card)',
              boxShadow: 'var(--landing-card-shadow)',
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
              style={{ background: 'var(--landing-orb-gold)' }}
            />

            <div
              className="mb-4 text-[10px] font-semibold uppercase"
              style={{ fontFamily: 'var(--font-mono-brand)', color: 'var(--landing-faint)', letterSpacing: '0.22em' }}
            >
              Primary · Native script first
            </div>
            <div className="flex flex-wrap gap-2">
              {primary.map((lang, i) => (
                <motion.span
                  key={lang.latin}
                  custom={i}
                  initial="hidden"
                  animate={inView ? 'show' : 'hidden'}
                  variants={chipVariants}
                  whileHover={{ y: -2 }}
                  className="inline-flex items-baseline gap-2 rounded-[9px] px-3.5 py-2"
                  style={{
                    fontFamily: 'var(--font-body-brand)',
                    background: 'var(--landing-ember-tint-7)',
                    border: '1px solid var(--landing-ember-tint-25)',
                  }}
                >
                  <span className="text-[15px] font-semibold" style={{ color: 'var(--landing-ember)' }}>
                    {lang.native}
                  </span>
                  <span
                    className="text-[10px]"
                    style={{
                      fontFamily: 'var(--font-mono-brand)',
                      color: 'var(--landing-muted)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {lang.latin}
                  </span>
                </motion.span>
              ))}
            </div>

            <div
              className="my-7 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, var(--landing-border), transparent)' }}
            />

            <div
              className="mb-4 text-[10px] font-semibold uppercase"
              style={{ fontFamily: 'var(--font-mono-brand)', color: 'var(--landing-faint)', letterSpacing: '0.22em' }}
            >
              Also supported
            </div>
            <div className="flex flex-wrap gap-1.5">
              {also.map((lang, i) => (
                <motion.span
                  key={lang.latin}
                  custom={i + primary.length}
                  initial="hidden"
                  animate={inView ? 'show' : 'hidden'}
                  variants={chipVariants}
                  whileHover={{ y: -1 }}
                  className="inline-flex items-baseline gap-1.5 rounded-[7px] px-2.5 py-1.5"
                  style={{
                    fontFamily: 'var(--font-body-brand)',
                    background: 'var(--landing-hover-bg)',
                    border: '1px solid var(--landing-border)',
                  }}
                >
                  <span className="text-[13px] font-medium" style={{ color: 'var(--landing-text-mid)' }}>
                    {lang.native}
                  </span>
                  <span
                    className="text-[9px]"
                    style={{ fontFamily: 'var(--font-mono-brand)', color: 'var(--landing-faint)', letterSpacing: '0.06em' }}
                  >
                    {lang.latin}
                  </span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
