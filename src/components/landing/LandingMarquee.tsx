const phrases = [
  'Every word',
  '22 Indian languages',
  'Speaker diarization',
  'Calendar-aware bot',
  'Action items with owners',
  'Risk & decisions',
  'WhatsApp delivery',
  'Slack threads',
  'DPDP-aligned flow',
  'Every language',
  'Every insight',
];

export function LandingMarquee() {
  const doubled = [...phrases, ...phrases];
  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        borderTop: '1px solid var(--landing-border-subtle)',
        borderBottom: '1px solid var(--landing-border-subtle)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
        maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <div className="landing-marquee-track flex w-max gap-12 pr-12">
        {doubled.map((text, i) => (
          <span
            key={`${text}-${i}`}
            className="flex shrink-0 items-center gap-12"
          >
            <span
              className="whitespace-nowrap text-[11px] font-semibold uppercase"
              style={{
                fontFamily: 'var(--font-mono-brand)',
                color: 'var(--landing-faint)',
                letterSpacing: '0.22em',
              }}
            >
              {text}
            </span>
            <span
              className="h-[5px] w-[5px] shrink-0 rounded-full"
              aria-hidden
              style={{ background: 'var(--landing-ember)', opacity: 0.55 }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
