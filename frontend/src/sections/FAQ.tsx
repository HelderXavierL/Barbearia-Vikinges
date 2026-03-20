// =============================================
// Barbearia Vikings — FAQ Section
// =============================================

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { Section } from '../components/layout/Section';
import { Container } from '../components/layout/Container';
import { SectionTitle } from '../components/common/SectionTitle';
import { faqItems } from '../data/faq';

function FAQAccordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
      >
        <span className="text-base font-body font-medium text-white pr-4 group-hover:text-brand-400 transition-colors">
          {question}
        </span>
        <ChevronDown
          className={clsx(
            'w-5 h-5 text-[#5A5650] transition-transform duration-300 shrink-0',
            open && 'rotate-180 text-brand-400',
          )}
        />
      </button>
      <div
        className={clsx(
          'overflow-hidden transition-all duration-300',
          open ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6">
          <p className="text-sm text-[#8A8680] leading-relaxed font-body">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <Section id="faq" variant="panel">
      <Container size="md">
        <SectionTitle
          title="Perguntas Frequentes"
          subtitle="Tudo que você precisa saber antes de visitar a Barbearia Vikings."
        />

        <div className="space-y-3">
          {faqItems.map((item) => (
            <FAQAccordion key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
