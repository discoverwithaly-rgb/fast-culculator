import React from 'react';
import { CALCULATORS_DATA, CATEGORIES } from '../data/calculatorsData';
import { Calculator, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (route: string) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-12 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Asan Calculator</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Pakistan's trusted suite of fast, accurate, and free online calculators. Built with precision for students, freelancers, accountants, real estate professionals, and everyday Pakistani households.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Free &amp; Private — Client-Side Mathematical Engine</span>
            </div>
          </div>

          {/* Popular Calculators */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Popular Calculators
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button type="button" onClick={() => handleNav('gst-calculator')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  GST Calculator Pakistan
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('unit-converter')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Kanal &amp; Marla Converter
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('emi-calculator')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Loan EMI Calculator
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('age-calculator')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Exact Age Calculator
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('gpa-calculator')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  University GPA Calculator
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('salary-calculator')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Salary &amp; Wage Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => handleNav(`cat-${cat.toLowerCase().replace(/\s+/g, '-')}`)}
                    className="text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Information &amp; Trust
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button type="button" onClick={() => handleNav('about')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('contact')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('privacy-policy')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('disclaimer')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Disclaimer
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleNav('sitemap')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                  HTML Sitemap
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} Asan Calculator. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with accuracy and care for Pakistan 🇵🇰
          </p>
        </div>
      </div>
    </footer>
  );
};
