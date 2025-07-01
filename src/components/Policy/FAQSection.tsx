import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
          <HelpCircle className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
        </div>
        <h2 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
          Frequently Asked Questions
        </h2>
      </div>

      {faqs.map((faq) => (
        <div 
          key={faq.id} 
          className="border rounded-xl overflow-hidden"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <button
            className="w-full p-4 text-left flex items-center justify-between hover:opacity-80 transition-opacity"
            style={{ backgroundColor: 'var(--color-card)' }}
            onClick={() => toggleFAQ(faq.id)}
            aria-expanded={openFAQ === faq.id}
            aria-controls={`faq-answer-${faq.id}`}
          >
            <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
              {faq.question}
            </span>
            {openFAQ === faq.id ? (
              <ChevronUp className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
            ) : (
              <ChevronDown className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
            )}
          </button>
          
          {openFAQ === faq.id && (
            <div 
              id={`faq-answer-${faq.id}`}
              className="p-4 border-t"
              style={{ 
                backgroundColor: 'var(--color-background)', 
                borderColor: 'var(--color-border)' 
              }}
            >
              <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQSection;