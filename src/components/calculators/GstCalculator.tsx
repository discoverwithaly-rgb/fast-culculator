import React, { useState } from 'react';
import { CalculatorActions } from '../CalculatorActions';
import { AlertCircle, Receipt } from 'lucide-react';

export const GstCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('50000');
  const [gstRate, setGstRate] = useState<string>('18');
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive');

  const amt = parseFloat(amount);
  const rate = parseFloat(gstRate);

  let basePrice = 0;
  let gstAmount = 0;
  let totalPrice = 0;
  let error: string | null = null;

  if (!amount || !gstRate) {
    // blank
  } else if (isNaN(amt) || isNaN(rate) || amt < 0 || rate < 0) {
    error = 'Please enter valid non-negative numbers.';
  } else {
    if (mode === 'exclusive') {
      // Adding GST
      basePrice = amt;
      gstAmount = (amt * rate) / 100;
      totalPrice = amt + gstAmount;
    } else {
      // Removing GST (Amount already includes GST)
      basePrice = amt / (1 + rate / 100);
      gstAmount = amt - basePrice;
      totalPrice = amt;
    }
  }

  const presets = [
    { label: '18% FBR Standard', val: '18' },
    { label: '16% Punjab (PRA)', val: '16' },
    { label: '15% KP / ICT', val: '15' },
    { label: '13% Sindh (SRB)', val: '13' },
    { label: '5% Reduced', val: '5' }
  ];

  const handleReset = () => {
    setAmount('');
    setGstRate('18');
  };

  const resultSummary = totalPrice > 0
    ? `Net Price: Rs. ${basePrice.toFixed(2)} | GST (${rate}%): Rs. ${gstAmount.toFixed(2)} | Total Gross: Rs. ${totalPrice.toFixed(2)}`
    : '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 md:p-8">
      {/* Mode toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setMode('exclusive')}
            className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              mode === 'exclusive'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Add GST (Exclusive to Inclusive)
          </button>
          <button
            type="button"
            onClick={() => setMode('inclusive')}
            className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              mode === 'inclusive'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Remove GST (Inclusive to Exclusive)
          </button>
        </div>
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
          <div>
            <label htmlFor="gst-amount-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              {mode === 'exclusive' ? 'Net Base Price (before GST)' : 'Gross Final Amount (including GST)'}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">Rs.</span>
              <input
                id="gst-amount-input"
                type="number"
                step="any"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="e.g. 50000"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label htmlFor="gst-rate-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              GST / Sales Tax Rate (%)
            </label>
            <div className="relative mb-2">
              <input
                id="gst-rate-input"
                type="number"
                step="any"
                value={gstRate}
                onChange={e => setGstRate(e.target.value)}
                placeholder="e.g. 18"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-9 font-medium"
              />
              <span className="absolute right-3 top-2.5 text-slate-400 font-bold text-sm">%</span>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-1.5">
              {presets.map(p => (
                <button
                  key={p.val}
                  type="button"
                  onClick={() => setGstRate(p.val)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded border transition-colors cursor-pointer ${
                    gstRate === p.val
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Receipt Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          {totalPrice > 0 ? (
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider pb-2 border-b border-slate-200">
                <Receipt className="w-4 h-4 text-emerald-600" />
                <span>Tax Breakdown Receipt</span>
              </div>

              <div className="flex justify-between items-center text-sm py-1">
                <span className="text-slate-600">Net Price (Excl. GST):</span>
                <span className="font-semibold text-slate-900">
                  Rs. {basePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm py-1 border-t border-dashed border-slate-200">
                <span className="text-slate-600">GST ({rate}%):</span>
                <span className="font-bold text-emerald-700">
                  + Rs. {gstAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex justify-between items-center text-base py-3 border-t-2 border-slate-300">
                <span className="font-bold text-slate-900">Total Invoice Amount:</span>
                <span className="text-xl font-extrabold text-emerald-800">
                  Rs. {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-slate-400 italic text-center py-8">
              Enter amount to calculate GST addition or deduction
            </p>
          )}
        </div>
      </div>

      <CalculatorActions
        onReset={handleReset}
        resultText={resultSummary}
        calculatorTitle="GST Calculator"
      />
    </div>
  );
};
