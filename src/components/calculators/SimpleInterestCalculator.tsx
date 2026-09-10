import React, { useState } from 'react';
import { CalculatorActions } from '../CalculatorActions';
import { AlertCircle } from 'lucide-react';

export const SimpleInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<string>('200000');
  const [rate, setRate] = useState<string>('12');
  const [time, setTime] = useState<string>('2.5');
  const [timeUnit, setTimeUnit] = useState<'years' | 'months'>('years');

  const p = parseFloat(principal);
  const r = parseFloat(rate);
  const t = parseFloat(time);

  let interest = 0;
  let totalAmount = 0;
  let error: string | null = null;

  if (!principal || !rate || !time) {
    // incomplete
  } else if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) {
    error = 'Please provide valid positive numbers for principal, rate, and time.';
  } else {
    const timeInYears = timeUnit === 'months' ? t / 12 : t;
    interest = (p * r * timeInYears) / 100;
    totalAmount = p + interest;
  }

  const handleReset = () => {
    setPrincipal('');
    setRate('');
    setTime('');
  };

  const resultSummary = interest > 0
    ? `Principal: Rs. ${p.toLocaleString()} | Simple Interest: Rs. ${Math.round(interest).toLocaleString()} | Total Maturity Amount: Rs. ${Math.round(totalAmount).toLocaleString()}`
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
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label htmlFor="si-principal-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Principal Amount (PKR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">Rs.</span>
              <input
                id="si-principal-input"
                type="number"
                step="any"
                value={principal}
                onChange={e => setPrincipal(e.target.value)}
                placeholder="e.g. 200000"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label htmlFor="si-rate-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Annual Interest Rate (%)
            </label>
            <div className="relative">
              <input
                id="si-rate-input"
                type="number"
                step="any"
                value={rate}
                onChange={e => setRate(e.target.value)}
                placeholder="e.g. 12"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-9 font-medium"
              />
              <span className="absolute right-3 top-2.5 text-slate-400 font-bold text-sm">%</span>
            </div>
          </div>

          <div>
            <label htmlFor="si-time-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Time Period
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                id="si-time-input"
                type="number"
                step="any"
                value={time}
                onChange={e => setTime(e.target.value)}
                placeholder="e.g. 2.5"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
              <select
                value={timeUnit}
                onChange={e => setTimeUnit(e.target.value as 'years' | 'months')}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          {interest > 0 ? (
            <div className="space-y-4">
              <div className="bg-emerald-600 text-white rounded-lg p-4 text-center">
                <span className="text-xs uppercase font-medium text-emerald-100 tracking-wider block">
                  Total Maturity Amount
                </span>
                <span className="text-3xl font-extrabold mt-0.5 block">
                  Rs. {Math.round(totalAmount).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Principal</span>
                  <span className="font-bold text-slate-800 text-sm md:text-base">
                    Rs. {p.toLocaleString()}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Total Interest Earned</span>
                  <span className="font-bold text-emerald-700 text-sm md:text-base">
                    Rs. {Math.round(interest).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                Effective Profit Yield: {((interest / p) * 100).toFixed(2)}% over the entire period.
              </div>
            </div>
          ) : (
            <p className="text-slate-400 italic text-center py-8">
              Enter principal, rate, and time to calculate simple interest
            </p>
          )}
        </div>
      </div>

      <CalculatorActions
        onReset={handleReset}
        resultText={resultSummary}
        calculatorTitle="Simple Interest Calculator"
      />
    </div>
  );
};
