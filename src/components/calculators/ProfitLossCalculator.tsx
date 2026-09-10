import React, { useState } from 'react';
import { CalculatorActions } from '../CalculatorActions';
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

export const ProfitLossCalculator: React.FC = () => {
  const [costPrice, setCostPrice] = useState<string>('120000');
  const [sellingPrice, setSellingPrice] = useState<string>('156000');

  const cp = parseFloat(costPrice);
  const sp = parseFloat(sellingPrice);

  let difference = 0;
  let isProfit = true;
  let isBreakEven = false;
  let percentage = 0;
  let margin = 0;
  let error: string | null = null;

  if (!costPrice || !sellingPrice) {
    // blank
  } else if (isNaN(cp) || isNaN(sp) || cp < 0 || sp < 0) {
    error = 'Please enter valid non-negative numbers for cost and selling price.';
  } else if (cp === 0) {
    error = 'Cost price cannot be zero when calculating percentages.';
  } else {
    difference = sp - cp;
    if (difference > 0) {
      isProfit = true;
      isBreakEven = false;
      percentage = (difference / cp) * 100;
      margin = (difference / sp) * 100;
    } else if (difference < 0) {
      isProfit = false;
      isBreakEven = false;
      percentage = (Math.abs(difference) / cp) * 100;
      margin = (Math.abs(difference) / sp) * 100;
    } else {
      isBreakEven = true;
    }
  }

  const handleReset = () => {
    setCostPrice('');
    setSellingPrice('');
  };

  const resultSummary = !isNaN(cp) && !isNaN(sp) && cp > 0
    ? isBreakEven
      ? 'Break-even: No profit and no loss.'
      : `${isProfit ? 'Profit' : 'Loss'} of Rs. ${Math.abs(difference).toLocaleString()} (${percentage.toFixed(2)}%)`
    : '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 md:p-8">
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Form inputs */}
        <div className="space-y-4">
          <div>
            <label htmlFor="pl-cost-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Cost Price (CP)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">Rs.</span>
              <input
                id="pl-cost-input"
                type="number"
                step="any"
                value={costPrice}
                onChange={e => setCostPrice(e.target.value)}
                placeholder="e.g. 120000"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label htmlFor="pl-sell-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Selling Price (SP)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">Rs.</span>
              <input
                id="pl-sell-input"
                type="number"
                step="any"
                value={sellingPrice}
                onChange={e => setSellingPrice(e.target.value)}
                placeholder="e.g. 156000"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          {!isNaN(cp) && !isNaN(sp) && cp > 0 && !error ? (
            <div className="space-y-4">
              {isBreakEven ? (
                <div className="bg-slate-700 text-white rounded-lg p-4 text-center">
                  <span className="text-xs uppercase font-medium tracking-wider block text-slate-200">
                    Financial Outcome
                  </span>
                  <span className="text-2xl font-bold mt-1 block">Break-Even (0.00%)</span>
                </div>
              ) : (
                <div className={`${isProfit ? 'bg-emerald-600' : 'bg-rose-600'} text-white rounded-lg p-4 text-center`}>
                  <div className="flex items-center justify-center gap-1.5 text-xs uppercase font-medium tracking-wider">
                    {isProfit ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>Net {isProfit ? 'Profit' : 'Loss'}</span>
                  </div>
                  <span className="text-3xl font-extrabold mt-1 block">
                    Rs. {Math.abs(difference).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}

              {!isBreakEven && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                    <span className="text-[11px] text-slate-500 block">
                      {isProfit ? 'Markup / Profit %' : 'Loss % on Cost'}
                    </span>
                    <span className={`font-bold text-sm md:text-base ${isProfit ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {percentage.toFixed(2)}%
                    </span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                    <span className="text-[11px] text-slate-500 block">Profit Margin (on Sales)</span>
                    <span className={`font-bold text-sm md:text-base ${isProfit ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {margin.toFixed(2)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-slate-400 italic text-center py-8">
              Enter Cost Price and Selling Price to evaluate profit or loss
            </p>
          )}
        </div>
      </div>

      <CalculatorActions
        onReset={handleReset}
        resultText={resultSummary}
        calculatorTitle="Profit & Loss Calculator"
      />
    </div>
  );
};
