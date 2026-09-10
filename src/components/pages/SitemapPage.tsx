import React from 'react';
import { CALCULATORS_DATA, CATEGORIES } from '../../data/calculatorsData';
import { CalculatorCategory } from '../../types';
import { Map, ExternalLink } from 'lucide-react';

interface SitemapPageProps {
  onNavigate: (route: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  const handleNav = (route: string) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Map className="w-4 h-4" />
            <span>Index Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Asan Calculator HTML Sitemap
          </h1>
          <p className="text-slate-600 mt-2 text-sm leading-relaxed">
            Complete index of all 15 calculators and informational resources hosted on Asan Calculator.
          </p>
        </div>

        {/* Categorized Calculators */}
        <div className="space-y-6">
          {CATEGORIES.map(category => {
            const list = CALCULATORS_DATA.filter(c => c.category === category);
            if (list.length === 0) return null;

            return (
              <div key={category} className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center justify-between">
                  <span>{category} Calculators</span>
                  <span className="text-xs font-medium text-slate-500">{list.length} Tools</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {list.map(calc => (
                    <button
                      key={calc.id}
                      type="button"
                      onClick={() => handleNav(calc.slug)}
                      className="text-left p-3 bg-white rounded-lg border border-slate-200 hover:border-emerald-500 hover:shadow-xs transition-all group cursor-pointer"
                    >
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 flex items-center justify-between">
                        <span>{calc.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-600" />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                        /{calc.slug}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Institutional & Legal Pages */}
        <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
          <h2 className="text-base font-bold text-slate-900 mb-3">Company &amp; Legal Documents</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'About Us', route: 'about' },
              { label: 'Contact Us', route: 'contact' },
              { label: 'Privacy Policy', route: 'privacy-policy' },
              { label: 'Disclaimer', route: 'disclaimer' }
            ].map(item => (
              <button
                key={item.route}
                type="button"
                onClick={() => handleNav(item.route)}
                className="text-left p-3 bg-white rounded-lg border border-slate-200 hover:border-emerald-500 text-xs font-semibold text-slate-800 hover:text-emerald-700 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
