import React, { useState } from 'react';
import { CalculatorActions } from '../CalculatorActions';
import { AlertCircle } from 'lucide-react';

export const EmiCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<string>('2500000');
  const [interestRate, setInterestRate] = useState<string>('18');
  const [tenureYears, setTenureYears] = useState<string>('5');

  const p = parseFloat(loanAmount);
  const r = parseFloat(interestRate);
  const t = parseFloat(tenureYears);

  let emi = 0;
  let totalPayment = 0;
  let totalInterest = 0;
  let error: string | null = null;

  if (!loanAmount || !interestRate || !tenureYears) {
    // incomplete
  } else if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) {
    error = 'Please enter valid positive values for all fields.';
  } else {
    const monthlyRate = r / 12 / 100;
    const totalMonths = t * 12;

    emi = (p * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    totalPayment = emi * totalMonths;
    totalInterest = totalPayment - p;
  }

  const handleReset = () => {
    setLoanAmount('');
    setInterestRate('');
    setTenureYears('');
  };

  const resultSummary = emi > 0
    ? `Monthly EMI: Rs. ${Math.round(emi).toLocaleString()} | Total Interest: Rs. ${Math.round(totalInterest).toLocaleString()} | Total Payable: Rs. ${Math.round(totalPayment).toLocaleString()}`
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
        {/* Input fields */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="emi-amount-input" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Loan Amount (PKR)
              </label>
              <span className="text-xs font-bold text-emerald-700">Rs. {p ? Math.round(p).toLocaleString() : 0}</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">Rs.</span>
              <input
                id="emi-amount-input"
                type="number"
                step="any"
                value={loanAmount}
                onChange={e => setLoanAmount(e.target.value)}
                placeholder="e.g. 2500000"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
            <input
              type="range"
              min="50000"
              max="20000000"
              step="50000"
              value={p || 50000}
              onChange={e => setLoanAmount(e.target.value)}
              className="w-full accent-emerald-600 mt-2 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="emi-rate-input" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Interest / Profit Rate (% p.a.)
              </label>
              <span className="text-xs font-bold text-emerald-700">{r || 0}%</span>
            </div>
            <div className="relative">
              <input
                id="emi-rate-input"
                type="number"
                step="any"
                value={interestRate}
                onChange={e => setInterestRate(e.target.value)}
                placeholder="e.g. 18"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-9 font-medium"
              />
              <span className="absolute right-3 top-2.5 text-slate-400 font-bold text-sm">%</span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              step="0.5"
              value={r || 5}
              onChange={e => setInterestRate(e.target.value)}
              className="w-full accent-emerald-600 mt-2 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="emi-tenure-input" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Loan Tenure (Years)
              </label>
              <span className="text-xs font-bold text-emerald-700">{t || 0} Years ({t ? t * 12 : 0} Months)</span>
            </div>
            <input
              id="emi-tenure-input"
              type="number"
              step="any"
              value={tenureYears}
              onChange={e => setTenureYears(e.target.value)}
              placeholder="e.g. 5"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
            <input
              type="range"
              min="1"
              max="25"
              step="1"
              value={t || 1}
              onChange={e => setTenureYears(e.target.value)}
              className="w-full accent-emerald-600 mt-2 cursor-pointer"
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          {emi > 0 ? (
            <div className="space-y-4">
              <div className="bg-emerald-600 text-white rounded-lg p-4 text-center">
                <span className="text-xs uppercase font-medium text-emerald-100 tracking-wider block">
                  Equated Monthly Installment (EMI)
                </span>
                <span className="text-3xl font-extrabold mt-0.5 block">
                  Rs. {Math.round(emi).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Total Interest Payable</span>
                  <span className="font-bold text-amber-700 text-sm md:text-base">
                    Rs. {Math.round(totalInterest).toLocaleString()}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Total Repayment Amount</span>
                  <span className="font-bold text-slate-800 text-sm md:text-base">
                    Rs. {Math.round(totalPayment).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress visual */}
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Principal: {((p / totalPayment) * 100).toFixed(1)}%</span>
                  <span>Interest: {((totalInterest / totalPayment) * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-emerald-600"
                    style={{ width: `${(p / totalPayment) * 100}%` }}
                  ></div>
                  <div
                    className="h-full bg-amber-500"
                    style={{ width: `${(totalInterest / totalPayment) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-slate-400 italic text-center py-8">
              Adjust sliders or enter numbers to calculate monthly EMI
            </p>
          )}
        </div>
      </div>

      <CalculatorActions
        onReset={handleReset}
        resultText={resultSummary}
        calculatorTitle="EMI Calculator"
      />
    </div>
  );
};
