import React, { useState } from 'react';
import { CalculatorSEOData } from '../types';
import { CALCULATORS_DATA } from '../data/calculatorsData';
import { ChevronDown, ChevronUp, BookOpen, Calculator, HelpCircle, CheckCircle2 } from 'lucide-react';

interface SEOSectionProps {
  data: CalculatorSEOData;
  onNavigate: (slug: string) => void;
}

export const SEOSection: React.FC<SEOSectionProps> = ({ data, onNavigate }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const relatedCalculators = data.relatedSlugs
    .map(slug => CALCULATORS_DATA.find(c => c.slug === slug))
    .filter(Boolean) as CalculatorSEOData[];

  return (
    <div className="mt-12 space-y-10 text-slate-800 border-t border-slate-200 pt-10">
      {/* Introduction */}
      <section aria-labelledby="intro-heading" className="bg-white rounded-xl p-6 md:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-700 text-sm font-semibold mb-2 uppercase tracking-wide">
          <BookOpen className="w-4 h-4" />
          <span>Overview</span>
        </div>
        <h2 id="intro-heading" className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
          About the {data.name}
        </h2>
        <p className="text-slate-600 leading-relaxed text-base">
          {data.intro}
        </p>
      </section>

      {/* How to Use */}
      <section aria-labelledby="how-to-use-heading" className="bg-white rounded-xl p-6 md:p-8 border border-slate-200/80 shadow-xs">
        <h2 id="how-to-use-heading" className="text-xl md:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>How to Use the {data.name}</span>
        </h2>
        <div className="space-y-3">
          {data.howToUse.map((step, index) => (
            <div key={index} className="flex items-start gap-3.5">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold shrink-0 mt-0.5">
                {index + 1}
              </span>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Formulas */}
      <section aria-labelledby="formula-heading" className="bg-white rounded-xl p-6 md:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-700 text-sm font-semibold mb-2 uppercase tracking-wide">
          <Calculator className="w-4 h-4" />
          <span>Mathematical Formulation</span>
        </div>
        <h2 id="formula-heading" className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
          Formula & Methodology
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.formulas.map((f, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 text-sm mb-2">{f.title}</h3>
              <div className="bg-white border border-slate-300/80 rounded p-3 font-mono text-xs md:text-sm text-emerald-800 whitespace-pre-line overflow-x-auto shadow-2xs">
                {f.expression}
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-normal">
                {f.explanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Realistic Worked Example */}
      <section aria-labelledby="example-heading" className="bg-emerald-50/40 rounded-xl p-6 md:p-8 border border-emerald-100 shadow-xs">
        <h2 id="example-heading" className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
          {data.example.title}
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          <strong className="text-slate-800">Scenario:</strong> {data.example.scenario}
        </p>
        <div className="bg-white rounded-lg border border-emerald-200 p-4 space-y-2 mb-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Step-by-Step Calculation:</h3>
          <ul className="space-y-1.5">
            {data.example.steps.map((step, idx) => (
              <li key={idx} className="text-sm text-slate-700 font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-emerald-600 text-white rounded-lg p-3 px-4 text-sm font-medium flex items-center justify-between">
          <span>Final Computed Result:</span>
          <span className="font-bold">{data.example.result}</span>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      {data.faqs.length > 0 && (
        <section aria-labelledby="faq-heading" className="bg-white rounded-xl p-6 md:p-8 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700 text-sm font-semibold mb-2 uppercase tracking-wide">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 id="faq-heading" className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions (FAQs)
          </h2>
          <div className="space-y-3">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-lg overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-slate-800 hover:bg-slate-50 transition-colors text-sm md:text-base cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Related Calculators */}
      {relatedCalculators.length > 0 && (
        <section aria-labelledby="related-heading" className="pt-2">
          <h2 id="related-heading" className="text-lg md:text-xl font-bold text-slate-900 mb-4">
            Useful Related Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedCalculators.map(calc => (
              <button
                key={calc.id}
                type="button"
                onClick={() => onNavigate(calc.slug)}
                className="text-left bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                    {calc.category}
                  </span>
                  <span className="text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold">
                    Open →
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors">
                  {calc.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {calc.shortDescription}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
