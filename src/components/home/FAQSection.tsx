import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '../../data';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../utils';
import SectionTitle from '../ui/SectionTitle';

export default function FAQSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-chm-gray">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Questions fréquentes"
          subtitle="Trouvez rapidement les réponses à vos interrogations"
        />

        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white rounded-xl border border-chm-border overflow-hidden divide-y divide-chm-border">
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-chm-gray/50 transition-colors"
                >
                  <span className="font-semibold text-chm-charcoal text-sm lg:text-base">
                    {faq.question}
                  </span>
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300',
                    openIndex === index ? 'bg-chm-red text-white' : 'bg-chm-gray text-chm-text-light'
                  )}>
                    {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    openIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <p className="px-5 pb-5 text-sm text-chm-text-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
