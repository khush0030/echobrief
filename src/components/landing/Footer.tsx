import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/Logo';
import { BookOpen, Github, Mail } from 'lucide-react';

const CONTACT_EMAIL = 'admin@oltaflock.ai';

const linkGroups = [
  {
    title: 'Product',
    links: [
      { to: '/#features', label: 'Features' },
      { to: '/#integrations', label: 'Integrations' },
      { to: '/#languages', label: 'Languages' },
      { to: '/#pricing', label: 'Pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/docs', label: 'Docs' },
      { to: '/privacy', label: 'Privacy' },
      { to: '/terms', label: 'Terms' },
      { to: `mailto:${CONTACT_EMAIL}`, label: 'Email us' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative" style={{ borderTop: '1px solid var(--landing-border-subtle)', background: 'var(--landing-bg-raised)' }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--landing-ember) 30%, transparent), transparent)' }} />
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            <Logo size="lg" linkTo="/" />
            <p className="mt-5 max-w-xs text-[14px] leading-[1.7]" style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-muted)' }}>
              Meeting intelligence for teams in India: transcribe, attribute speakers, and ship briefs where you work.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {[
                { href: `mailto:${CONTACT_EMAIL}`, icon: <Mail className="h-4 w-4" strokeWidth={1.75} />, label: `Email ${CONTACT_EMAIL}` },
                { href: '/docs', icon: <BookOpen className="h-4 w-4" strokeWidth={1.75} />, label: 'Documentation', isLink: true },
              ].map((item) => {
                const style = {
                  border: '1px solid var(--landing-border)',
                  background: 'var(--landing-hover-bg)',
                  color: 'var(--landing-faint)',
                };
                return item.isLink ? (
                  <Link key={item.label} to={item.href} className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200" style={style} aria-label={item.label}>
                    {item.icon}
                  </Link>
                ) : (
                  <a key={item.label} href={item.href} className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200" style={style} aria-label={item.label}>
                    {item.icon}
                  </a>
                );
              })}
              <span className="flex h-10 w-10 items-center justify-center rounded-xl opacity-50" style={{ border: '1px solid var(--landing-border)', background: 'var(--landing-hover-bg)', color: 'var(--landing-faint)' }} title="GitHub coming soon">
                <Github className="h-4 w-4" strokeWidth={1.75} />
              </span>
            </div>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-4 inline-block text-[14px] font-medium no-underline transition-colors" style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-ember)' }}>
              {CONTACT_EMAIL}
            </a>
          </motion.div>

          {linkGroups.map((group) => (
            <motion.div key={group.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.05 }}>
              <h3 className="text-[10px] font-medium uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono-brand)', color: 'var(--landing-faint)' }}>
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.links.map((l) => (
                  <li key={l.to + l.label}>
                    {l.to.startsWith('mailto:') ? (
                      <a href={l.to} className="text-[14px] no-underline transition-colors" style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-text-mid)' }}>{l.label}</a>
                    ) : (
                      <Link to={l.to} className="text-[14px] no-underline transition-colors" style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-text-mid)' }}>{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Brand-kit palette bar — visual signature */}
        <div
          className="mt-16 flex h-2 w-full overflow-hidden rounded-full"
          aria-hidden
          style={{ border: '1px solid var(--landing-border-subtle)' }}
        >
          <span className="flex-[3]" style={{ background: 'var(--landing-ember)' }} />
          <span className="flex-[2]" style={{ background: 'var(--gold)' }} />
          <span className="flex-[1.4]" style={{ background: 'var(--landing-text-mid)' }} />
          <span className="flex-[1.2]" style={{ background: 'var(--landing-muted)' }} />
          <span className="flex-[1]" style={{ background: 'var(--landing-faint)' }} />
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 md:flex-row">
          <p
            className="m-0 text-[11px]"
            style={{ fontFamily: 'var(--font-mono-brand)', color: 'var(--landing-faint)', letterSpacing: '0.22em', textTransform: 'uppercase' }}
          >
            © {new Date().getFullYear()} · EchoBrief · OltaFlock AI
          </p>
          <p
            className="m-0 text-[11px]"
            style={{ fontFamily: 'var(--font-mono-brand)', color: 'var(--landing-faint)', letterSpacing: '0.22em', textTransform: 'uppercase' }}
          >
            Built with care · Made in India
          </p>
        </div>
      </div>
    </footer>
  );
}
