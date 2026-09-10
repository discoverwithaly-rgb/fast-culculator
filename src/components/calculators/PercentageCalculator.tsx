import React, { useState } from 'react';
import { CalculatorActions } from '../CalculatorActions';
import { Percent, ArrowRight, AlertCircle } from 'lucide-react';

export const PercentageCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'basic' | 'change' | 'part'>('basic');

  // Mode 1: X% of Y
  const [percent1, setPercent1] = useState<string>('15');
  const [number1, setNumber1] = useState<string>('4500');

  // Mode 2: % Increase/Decrease from A to B
  const [initialVal, setInitialVal] = useState<string>('2000');
  const [finalVal, setFinalVal] = useState<string>('2600');

  // Mode 3: What % is X of Y?
  const [partVal, setPartVal] = useState<string>('350');
  const [totalVal, setTotalVal] = useState<string>('1400');

  const [error, setError] = useState<string | null>(null);

  // Results calculation
  let resultSummary = '';
  let calculatedOutput: React.ReactNode = null;

  if (activeTab === 'basic') {
    const p = parseFloat(percent1);
    const num = parseFloat(number1);
    if (isNaN(p) || isNaN(num)) {
      calculatedOutput = <p className="text-slate-400 italic">Please enter valid numbers</p>;
    } else {
      const res = (p / 100) * num;
      resultSummary = `${p}% of ${num.toLocaleString()} = ${Number(res.toFixed(4)).toLocaleString()}`;
      calculatedOutput = (
        <div>
          <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
            Calculated Result
          </div>
          <div className="text-3xl font-bold text-emerald-700">
            {Number(res.toFixed(4)).toLocaleString()}
          </div>
          <div className="text-xs text-slate-600 mt-1">
            {p}% of {num.toLocaleString()}
          </div>
        </div>
      );
    }
  } else if (activeTab === 'change') {
    const init = parseFloat(initialVal);
    const fin = parseFloat(finalVal);
    if (isNaN(init) || isNaN(fin)) {
      calculatedOutput = <p className="text-slate-400 italic">Please enter valid numbers</p>;
    } else if (init === 0) {
      calculatedOutput = (
        <p className="text-rose-600 text-sm flex items-center gap-1">
          <AlertCircle className="w-4 h-4" /> Initial value cannot be zero
        </p>
      );
    } else {
      const diff = fin - init;
      const changePct = (diff / Math.abs(init)) * 100;
      const isIncrease = diff >= 0;
      resultSummary = `${isIncrease ? 'Increase' : 'Decrease'} of ${Math.abs(changePct).toFixed(2)}% (from ${init} to ${fin})`;
      calculatedOutput = (
        <div>
          <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
            Percentage Change
          </div>
          <div className={`text-3xl font-bold ${isIncrease ? 'text-emerald-700' : 'text-rose-700'}`}>
            {isIncrease ? '+' : ''}{changePct.toFixed(2)}%
          </div>
          <div className="text-xs text-slate-600 mt-1">
            {isIncrease ? 'Increase' : 'Decrease'} of {Math.abs(diff).toLocaleString()}
          </div>
        </div>
      );
    }
  } else if (activeTab === 'part') {
    const part = parseFloat(partVal);
    const tot = parseFloat(totalVal);
    if (isNaN(part) || isNaN(tot)) {
      calculatedOutput = <p className="text-slate-400 italic">Please enter valid numbers</p>;
    } else if (tot === 0) {
      calculatedOutput = (
        <p className="text-rose-600 text-sm flex items-center gap-1">
          <AlertCircle className="w-4 h-4" /> Total value cannot be zero
        </p>
      );
    } else {
      const pct = (part / tot) * 100;
      resultSummary = `${part} is ${pct.toFixed(2)}% of ${tot}`;
      calculatedOutput = (
        <div>
          <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
            Percentage Share
          </div>
          <div className="text-3xl font-bold text-emerald-700">
            {pct.toFixed(2)}%
          </div>
          <div className="text-xs text-slate-600 mt-1">
            {part.toLocaleString()} out of {tot.toLocaleString()}
          </div>
        </div>
      );
    }
  }

  const handleReset = () => {
    setPercent1('');
    setNumber1('');
    setInitialVal('');
    setFinalVal('');
    setPartVal('');
    setTotalVal('');
    setError(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 md:p-8">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-100 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'basic'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Percentage of a Number
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('change')}
          className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'change'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Percentage Increase / Decrease
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('part')}
          className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'part'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          What % is A of B?
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Form controls */}
        <div className="space-y-4">
          {activeTab === 'basic' && (
            <>
              <div>
                <label htmlFor="percent1-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  What is
                </label>
                <div className="relative">
                  <input
                    id="percent1-input"
                    type="number"
                    step="any"
                    value={percent1}
                    onChange={e => setPercent1(e.target.value)}
                    placeholder="e.g. 15"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-9"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400 font-bold text-sm">%</span>
                </div>
              </div>
              <div>
                <label htmlFor="number1-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Of Number
                </label>
                <input
                  id="number1-input"
                  type="number"
                  step="any"
                  value={number1}
                  onChange={e => setNumber1(e.target.value)}
                  placeholder="e.g. 4500"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </>
          )}

          {activeTab === 'change' && (
            <>
              <div>
                <label htmlFor="init-val-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Original / Initial Value
                </label>
                <input
                  id="init-val-input"
                  type="number"
                  step="any"
                  value={initialVal}
                  onChange={e => setInitialVal(e.target.value)}
                  placeholder="e.g. 2000"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="final-val-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  New / Final Value
                </label>
                <input
                  id="final-val-input"
                  type="number"
                  step="any"
                  value={finalVal}
                  onChange={e => setFinalVal(e.target.value)}
                  placeholder="e.g. 2600"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </>
          )}

          {activeTab === 'part' && (
            <>
              <div>
                <label htmlFor="part-val-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Value A (Part)
                </label>
                <input
                  id="part-val-input"
                  type="number"
                  step="any"
                  value={partVal}
                  onChange={e => setPartVal(e.target.value)}
                  placeholder="e.g. 350"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="total-val-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Value B (Total / Whole)
                </label>
                <input
                  id="total-val-input"
                  type="number"
                  step="any"
                  value={totalVal}
                  onChange={e => setTotalVal(e.target.value)}
                  placeholder="e.g. 1400"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </>
          )}
        </div>

        {/* Display Output Card */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-6 text-center flex flex-col justify-center min-h-[160px]">
          {calculatedOutput}
        </div>
      </div>

      <CalculatorActions
        onReset={handleReset}
        resultText={resultSummary}
        calculatorTitle="Percentage Calculator"
      />
    </div>
  );
};
