import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Stack', href: '#integrations' },
  { label: 'Languages', href: '#languages' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '/docs' },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 pb-2 md:px-8">
      <nav
        className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 rounded-full px-5 py-3 transition-all duration-300"
        style={{
          border: '1px solid var(--landing-border)',
          background: scrolled
            ? 'color-mix(in srgb, var(--landing-bg) 92%, transparent)'
            : 'color-mix(in srgb, var(--landing-bg-raised) 85%, transparent)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: scrolled ? 'var(--landing-card-shadow)' : 'none',
        }}
      >
        <Logo size="lg" linkTo="/" />

        <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex lg:gap-2">
            {links.map(({ label, href }) => {
              const cls = "rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] no-underline transition-all duration-200";
              const style = {
                fontFamily: 'var(--font-mono-brand)',
                color: 'var(--landing-faint)',
              };
              return href.startsWith('#') ? (
                <a key={label} href={href} className={cls} style={style}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--landing-text)'; e.currentTarget.style.background = 'var(--landing-hover-bg)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--landing-faint)'; e.currentTarget.style.background = 'transparent'; }}
                >{label}</a>
              ) : (
                <Link key={label} to={href} className={cls} style={style}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--landing-text)'; e.currentTarget.style.background = 'var(--landing-hover-bg)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--landing-faint)'; e.currentTarget.style.background = 'transparent'; }}
                >{label}</Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle variant="navbar" />
            <Link
              to="/auth"
              className="hidden items-center justify-center rounded-full px-6 py-2.5 text-[13px] font-bold text-white no-underline transition-all duration-200 hover:-translate-y-0.5 sm:inline-flex"
              style={{
                fontFamily: 'var(--font-body-brand)',
                background: 'var(--landing-ember)',
                boxShadow: 'var(--landing-ember-shadow)',
              }}
            >
              Get started
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors md:hidden"
              style={{ color: 'var(--landing-faint)' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="mx-auto mt-2 max-w-[1200px] overflow-hidden rounded-2xl backdrop-blur-xl md:hidden"
          style={{
            border: '1px solid var(--landing-border)',
            background: 'color-mix(in srgb, var(--landing-bg-raised) 95%, transparent)',
          }}
        >
          <div className="flex flex-col gap-1 p-4">
            {links.map(({ label, href }) => {
              const cls = "rounded-xl px-4 py-3 text-[12px] font-medium uppercase tracking-[0.12em] no-underline transition-colors";
              const style = { fontFamily: 'var(--font-mono-brand)', color: 'var(--landing-faint)' };
              return href.startsWith('#') ? (
                <a key={label} href={href} onClick={() => setMobileOpen(false)} className={cls} style={style}>{label}</a>
              ) : (
                <Link key={label} to={href} onClick={() => setMobileOpen(false)} className={cls} style={style}>{label}</Link>
              );
            })}
            <Link
              to="/auth"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-full px-6 py-3 text-center text-[14px] font-bold text-white no-underline"
              style={{
                fontFamily: 'var(--font-body-brand)',
                background: 'var(--landing-ember)',
                boxShadow: 'var(--landing-ember-shadow)',
              }}
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
