import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'Do I need to install anything in the meeting?', a: 'No. EchoBrief uses a cloud bot that joins from your calendar. You can still use the Chrome extension for local capture if you prefer. The dashboard flow is bot-only.' },
  { q: 'Which languages are supported?', a: '22 Indian languages plus English (Indian), with strong code-mixing (e.g. Hinglish, Tanglish). Summaries can be delivered in the language your team prefers.' },
  { q: 'Where do summaries go?', a: 'Slack channels, WhatsApp, or email. You choose per workspace or per user in settings.' },
  { q: 'Is my audio stored?', a: 'Audio is processed for transcription and insights; retention follows your workspace policy. Processing is designed with India-first data paths where applicable.' },
];

export function LandingFAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="faq" ref={ref} className="scroll-mt-24 py-24 md:py-28" style={{ borderTop: '1px solid var(--landing-border-subtle)' }}>
      <div className="mx-auto max-w-[720px] px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-12 text-center">
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono-brand)', color: 'var(--landing-ember)' }}>FAQ</p>
          <h2 className="leading-[1.1] tracking-[-0.02em]" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,44px)', color: 'var(--landing-text)' }}>
            Questions, answered
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.15, duration: 0.5 }}>
          <Accordion
            type="single"
            collapsible
            className="rounded-[20px] px-2 shadow-sm backdrop-blur-sm"
            style={{ border: '1px solid var(--landing-border)', background: 'var(--landing-bg-card)', boxShadow: 'var(--landing-card-shadow)' }}
          >
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="px-4" style={{ borderColor: 'var(--landing-border-subtle)' }}>
                <AccordionTrigger
                  className="text-left text-[16px] hover:no-underline"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--landing-text)' }}
                >
                  {item.q}
                </AccordionTrigger>
                <AccordionContent
                  className="pb-4 text-[14px] leading-relaxed"
                  style={{ fontFamily: 'var(--font-body-brand)', color: 'var(--landing-muted)' }}
                >
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
