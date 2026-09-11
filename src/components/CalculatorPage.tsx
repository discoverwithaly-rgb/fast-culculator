import React, { Suspense, lazy } from 'react';
import { CalculatorSEOData } from '../types';
import { AdSensePlaceholder } from './AdSensePlaceholder';
import { SEOSection } from './SEOSection';
import { ChevronRight, Home, Sparkles } from 'lucide-react';

// Lazy-load all 15 calculator components on demand for ultra-fast initial page load
const PercentageCalculator = lazy(() => import('./calculators/PercentageCalculator').then(m => ({ default: m.PercentageCalculator })));
const AgeCalculator = lazy(() => import('./calculators/AgeCalculator').then(m => ({ default: m.AgeCalculator })));
const BmiCalculator = lazy(() => import('./calculators/BmiCalculator').then(m => ({ default: m.BmiCalculator })));
const LoanCalculator = lazy(() => import('./calculators/LoanCalculator').then(m => ({ default: m.LoanCalculator })));
const SimpleInterestCalculator = lazy(() => import('./calculators/SimpleInterestCalculator').then(m => ({ default: m.SimpleInterestCalculator })));
const CompoundInterestCalculator = lazy(() => import('./calculators/CompoundInterestCalculator').then(m => ({ default: m.CompoundInterestCalculator })));
const EmiCalculator = lazy(() => import('./calculators/EmiCalculator').then(m => ({ default: m.EmiCalculator })));
const GstCalculator = lazy(() => import('./calculators/GstCalculator').then(m => ({ default: m.GstCalculator })));
const DiscountCalculator = lazy(() => import('./calculators/DiscountCalculator').then(m => ({ default: m.DiscountCalculator })));
const ProfitLossCalculator = lazy(() => import('./calculators/ProfitLossCalculator').then(m => ({ default: m.ProfitLossCalculator })));
const UnitConverter = lazy(() => import('./calculators/UnitConverter').then(m => ({ default: m.UnitConverter })));
const TimeDateCalculator = lazy(() => import('./calculators/TimeDateCalculator').then(m => ({ default: m.TimeDateCalculator })));
const SalaryCalculator = lazy(() => import('./calculators/SalaryCalculator').then(m => ({ default: m.SalaryCalculator })));
const GpaCalculator = lazy(() => import('./calculators/GpaCalculator').then(m => ({ default: m.GpaCalculator })));
const PercentageMarksCalculator = lazy(() => import('./calculators/PercentageMarksCalculator').then(m => ({ default: m.PercentageMarksCalculator })));

interface CalculatorPageProps {
  data: CalculatorSEOData;
  onNavigate: (slug: string) => void;
}

const CalculatorSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs animate-pulse space-y-6">
    <div className="h-6 w-1/3 bg-slate-200 rounded-md"></div>
    <div className="space-y-3">
      <div className="h-4 w-full bg-slate-100 rounded-md"></div>
      <div className="h-4 w-2/3 bg-slate-100 rounded-md"></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
      <div className="h-12 bg-slate-100 rounded-xl"></div>
      <div className="h-12 bg-slate-100 rounded-xl"></div>
    </div>
  </div>
);

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ data, onNavigate }) => {
  const renderCalculatorComponent = () => {
    switch (data.slug) {
      case 'percentage-calculator':
        return <PercentageCalculator />;
      case 'age-calculator':
        return <AgeCalculator />;
      case 'bmi-calculator':
        return <BmiCalculator />;
      case 'loan-calculator':
        return <LoanCalculator />;
      case 'simple-interest-calculator':
        return <SimpleInterestCalculator />;
      case 'compound-interest-calculator':
        return <CompoundInterestCalculator />;
      case 'emi-calculator':
        return <EmiCalculator />;
      case 'gst-calculator':
        return <GstCalculator />;
      case 'discount-calculator':
        return <DiscountCalculator />;
      case 'profit-loss-calculator':
        return <ProfitLossCalculator />;
      case 'unit-converter':
        return <UnitConverter />;
      case 'time-date-calculator':
        return <TimeDateCalculator />;
      case 'salary-calculator':
        return <SalaryCalculator />;
      case 'gpa-calculator':
        return <GpaCalculator />;
      case 'percentage-marks-calculator':
        return <PercentageMarksCalculator />;
      default:
        return <div className="p-8 text-center text-slate-500">Calculator under maintenance.</div>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1 hover:text-emerald-700 transition-colors cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <button
          type="button"
          onClick={() => onNavigate(`cat-${data.category.toLowerCase().replace(/\s+/g, '-')}`)}
          className="hover:text-emerald-700 transition-colors cursor-pointer"
        >
          {data.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="font-semibold text-slate-800 truncate">{data.name}</span>
      </nav>

      {/* Page Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{data.category} Tool</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          {data.name}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          {data.shortDescription}
        </p>
      </header>

      {/* Top Ad Unit */}
      <AdSensePlaceholder slotId={`${data.slug}-top`} format="horizontal" />

      {/* Interactive Tool Area */}
      <section aria-label="Interactive Calculator Tool">
        <Suspense fallback={<CalculatorSkeleton />}>
          {renderCalculatorComponent()}
        </Suspense>
      </section>

      {/* Mid-Page Ad Unit */}
      <AdSensePlaceholder slotId={`${data.slug}-mid`} format="in-article" />

      {/* Comprehensive SEO Content Section (H2, What is it, How to use, Formulas, Examples, FAQs, Related) */}
      <SEOSection data={data} onNavigate={onNavigate} />

      {/* Bottom Ad Unit */}
      <AdSensePlaceholder slotId={`${data.slug}-bottom`} format="horizontal" />
    </div>
  );
};
