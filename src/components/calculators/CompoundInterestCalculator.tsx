import React, { useState } from 'react';
import { CalculatorActions } from '../CalculatorActions';
import { AlertCircle } from 'lucide-react';

export const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<string>('500000');
  const [rate, setRate] = useState<string>('14');
  const [frequency, setFrequency] = useState<number>(4); // default quarterly
  const [timeYears, setTimeYears] = useState<string>('5');

  const p = parseFloat(principal);
  const r = parseFloat(rate);
  const t = parseFloat(timeYears);

  let finalAmount = 0;
  let totalInterest = 0;
  let error: string | null = null;

  if (!principal || !rate || !timeYears) {
    // incomplete
  } else if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) {
    error = 'Please enter valid positive values for all fields.';
  } else {
    const rateDec = r / 100;
    finalAmount = p * Math.pow(1 + rateDec / frequency, frequency * t);
    totalInterest = finalAmount - p;
  }

  const handleReset = () => {
    setPrincipal('');
    setRate('');
    setTimeYears('');
  };

  const resultSummary = finalAmount > 0
    ? `Final Maturity Amount: Rs. ${Math.round(finalAmount).toLocaleString()} | Total Interest Earned: Rs. ${Math.round(totalInterest).toLocaleString()}`
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
        {/* Form controls */}
        <div className="space-y-4">
          <div>
            <label htmlFor="ci-principal-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Initial Principal Investment (PKR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">Rs.</span>
              <input
                id="ci-principal-input"
                type="number"
                step="any"
                value={principal}
                onChange={e => setPrincipal(e.target.value)}
                placeholder="e.g. 500000"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label htmlFor="ci-rate-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Annual Interest Rate (%)
            </label>
            <div className="relative">
              <input
                id="ci-rate-input"
                type="number"
                step="any"
                value={rate}
                onChange={e => setRate(e.target.value)}
                placeholder="e.g. 14"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-9 font-medium"
              />
              <span className="absolute right-3 top-2.5 text-slate-400 font-bold text-sm">%</span>
            </div>
          </div>

          <div>
            <label htmlFor="ci-freq-select" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Compounding Frequency
            </label>
            <select
              id="ci-freq-select"
              value={frequency}
              onChange={e => setFrequency(parseInt(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              <option value={1}>Annually (1 time/year)</option>
              <option value={2}>Semi-Annually (2 times/year)</option>
              <option value={4}>Quarterly (4 times/year - National Savings standard)</option>
              <option value={12}>Monthly (12 times/year)</option>
              <option value={365}>Daily (365 times/year)</option>
            </select>
          </div>

          <div>
            <label htmlFor="ci-time-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Investment Horizon (Years)
            </label>
            <input
              id="ci-time-input"
              type="number"
              step="any"
              value={timeYears}
              onChange={e => setTimeYears(e.target.value)}
              placeholder="e.g. 5"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          {finalAmount > 0 ? (
            <div className="space-y-4">
              <div className="bg-emerald-600 text-white rounded-lg p-4 text-center">
                <span className="text-xs uppercase font-medium text-emerald-100 tracking-wider block">
                  Future Maturity Value
                </span>
                <span className="text-2xl md:text-3xl font-extrabold mt-0.5 block">
                  Rs. {Math.round(finalAmount).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Initial Principal</span>
                  <span className="font-bold text-slate-800 text-sm md:text-base">
                    Rs. {p.toLocaleString()}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Compound Profit</span>
                  <span className="font-bold text-emerald-700 text-sm md:text-base">
                    Rs. {Math.round(totalInterest).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress proportion */}
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Initial: {((p / finalAmount) * 100).toFixed(1)}%</span>
                  <span>Profit: {((totalInterest / finalAmount) * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-emerald-600"
                    style={{ width: `${(p / finalAmount) * 100}%` }}
                  ></div>
                  <div
                    className="h-full bg-amber-500"
                    style={{ width: `${(totalInterest / finalAmount) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-xs text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                Total Wealth Multiplier: {(finalAmount / p).toFixed(2)}x in {t} years
              </div>
            </div>
          ) : (
            <p className="text-slate-400 italic text-center py-8">
              Enter investment details to calculate compound interest growth
            </p>
          )}
        </div>
      </div>

      <CalculatorActions
        onReset={handleReset}
        resultText={resultSummary}
        calculatorTitle="Compound Interest Calculator"
      />
    </div>
  );
};
