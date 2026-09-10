import React, { useState } from 'react';
import { CALCULATORS_DATA, CATEGORIES } from '../../data/calculatorsData';
import { CalculatorCategory, CalculatorSEOData } from '../../types';
import { AdSensePlaceholder } from '../AdSensePlaceholder';
import {
  Search,
  Percent,
  Calendar,
  Activity,
  Landmark,
  Coins,
  TrendingUp,
  CreditCard,
  Receipt,
  Tag,
  ArrowUpDown,
  ArrowRightLeft,
  Clock,
  Briefcase,
  GraduationCap,
  Award,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe2
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (slug: string) => void;
  initialCategory?: CalculatorCategory | 'All';
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Percent: <Percent className="w-5 h-5 text-emerald-600" />,
  Calendar: <Calendar className="w-5 h-5 text-emerald-600" />,
  Activity: <Activity className="w-5 h-5 text-emerald-600" />,
  Landmark: <Landmark className="w-5 h-5 text-emerald-600" />,
  Coins: <Coins className="w-5 h-5 text-emerald-600" />,
  TrendingUp: <TrendingUp className="w-5 h-5 text-emerald-600" />,
  CreditCard: <CreditCard className="w-5 h-5 text-emerald-600" />,
  Receipt: <Receipt className="w-5 h-5 text-emerald-600" />,
  Tag: <Tag className="w-5 h-5 text-emerald-600" />,
  ArrowUpDown: <ArrowUpDown className="w-5 h-5 text-emerald-600" />,
  ArrowRightLeft: <ArrowRightLeft className="w-5 h-5 text-emerald-600" />,
  Clock: <Clock className="w-5 h-5 text-emerald-600" />,
  Briefcase: <Briefcase className="w-5 h-5 text-emerald-600" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-emerald-600" />,
  Award: <Award className="w-5 h-5 text-emerald-600" />
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, initialCategory = 'All' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CalculatorCategory | 'All'>(initialCategory);

  const filteredCalculators = CALCULATORS_DATA.filter(calc => {
    const matchesCategory = selectedCategory === 'All' || calc.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      calc.name.toLowerCase().includes(q) ||
      calc.shortDescription.toLowerCase().includes(q) ||
      calc.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 pt-12 pb-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pakistan's Modern Online Calculation Suite</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Free Online Calculators
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Fast, accurate and easy-to-use calculators for everyday needs.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto relative pt-2">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                id="search-input-home"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by calculator name (e.g. GST, Loan, Marla, Age, GPA)..."
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-300 rounded-2xl shadow-sm text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Categories Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              All (15)
            </button>
            {CATEGORIES.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Top Banner AdSense Space */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSensePlaceholder slotId="home-leaderboard" format="horizontal" />
      </div>

      {/* Calculator Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {selectedCategory === 'All' ? 'All Available Calculators' : `${selectedCategory} Calculators`}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {filteredCalculators.length} calculators
            </p>
          </div>
        </div>

        {filteredCalculators.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">No calculators found</h3>
            <p className="text-xs text-slate-500">
              No calculator matched "{searchQuery}". Try searching for terms like "loan", "tax", "land", or "marks".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCalculators.map(calc => (
              <div
                key={calc.id}
                id={`card-${calc.slug}`}
                onClick={() => onNavigate(calc.slug)}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/80 p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-600 transition-colors group-hover:text-white">
                      {ICON_MAP[calc.icon] || <Percent className="w-5 h-5 text-emerald-600" />}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                      {calc.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors mb-2">
                    {calc.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {calc.shortDescription}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>Open Calculator</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Middle In-Article AdSense Space */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdSensePlaceholder slotId="home-mid-article" format="in-article" />
      </div>

      {/* Why Choose Asan Calculator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
              Trusted by Thousands
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight">
              Why Pakistani Users Rely on Asan Calculator
            </h2>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Designed specifically to resolve everyday mathematical and financial queries without slow page loads, subscription walls, or complex spreadsheets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Ultra Fast &amp; Mobile First</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Loads instantaneously even on 3G/4G cellular connections across Pakistan. Optimized for one-handed smartphone usage.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Local Pakistani Context</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Calculates FBR sales tax rates (18%), Land measures (Kanal, Marla, Acre), Matric/FSc board percentages, and local PKR currency.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">100% Client-Side Privacy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your loan figures, salary data, and grades remain completely private inside your device. No cloud storage of your inputs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
