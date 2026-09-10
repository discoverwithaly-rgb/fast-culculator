import React, { useState } from 'react';
import { CalculatorActions } from '../CalculatorActions';
import { AlertCircle, ChevronRight } from 'lucide-react';

export const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<string>('1000000');
  const [interestRate, setInterestRate] = useState<string>('16');
  const [duration, setDuration] = useState<string>('3');
  const [durationUnit, setDurationUnit] = useState<'years' | 'months'>('years');
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  const amount = parseFloat(loanAmount);
  const rate = parseFloat(interestRate);
  const dur = parseFloat(duration);

  let monthlyPayment = 0;
  let totalPayment = 0;
  let totalInterest = 0;
  let error: string | null = null;
  const amortizationSchedule: {
    year: number;
    interestPaid: number;
    principalPaid: number;
    balance: number;
  }[] = [];

  if (!loanAmount || !interestRate || !duration) {
    // incomplete
  } else if (isNaN(amount) || isNaN(rate) || isNaN(dur) || amount <= 0 || rate <= 0 || dur <= 0) {
    error = 'Please enter valid positive numbers for all loan fields.';
  } else {
    const totalMonths = durationUnit === 'years' ? dur * 12 : dur;
    const monthlyRate = rate / 12 / 100;

    monthlyPayment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    totalPayment = monthlyPayment * totalMonths;
    totalInterest = totalPayment - amount;

    // Generate yearly schedule
    let remainingBalance = amount;
    const yearsCount = Math.ceil(totalMonths / 12);

    for (let y = 1; y <= yearsCount; y++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;
      const monthsInThisYear = Math.min(12, totalMonths - (y - 1) * 12);

      for (let m = 0; m < monthsInThisYear; m++) {
        const intPortion = remainingBalance * monthlyRate;
        const princPortion = monthlyPayment - intPortion;
        yearlyInterest += intPortion;
        yearlyPrincipal += princPortion;
        remainingBalance -= princPortion;
      }

      amortizationSchedule.push({
        year: y,
        interestPaid: yearlyInterest,
        principalPaid: yearlyPrincipal,
        balance: Math.max(0, remainingBalance)
      });
    }
  }

  const handleReset = () => {
    setLoanAmount('');
    setInterestRate('');
    setDuration('');
    setShowAmortization(false);
  };

  const resultSummary = monthlyPayment > 0
    ? `Monthly Payment: Rs. ${Math.round(monthlyPayment).toLocaleString()} | Total Interest: Rs. ${Math.round(totalInterest).toLocaleString()} | Total Payable: Rs. ${Math.round(totalPayment).toLocaleString()}`
    : '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 md:p-8">
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Input fields */}
        <div className="space-y-4">
          <div>
            <label htmlFor="loan-amount-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Loan Amount (PKR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">Rs.</span>
              <input
                id="loan-amount-input"
                type="number"
                step="any"
                value={loanAmount}
                onChange={e => setLoanAmount(e.target.value)}
                placeholder="e.g. 1000000"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label htmlFor="loan-rate-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Annual Interest Rate (%)
            </label>
            <div className="relative">
              <input
                id="loan-rate-input"
                type="number"
                step="any"
                value={interestRate}
                onChange={e => setInterestRate(e.target.value)}
                placeholder="e.g. 16.0"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-9 font-medium"
              />
              <span className="absolute right-3 top-2.5 text-slate-400 font-bold text-sm">%</span>
            </div>
          </div>

          <div>
            <label htmlFor="loan-dur-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Loan Duration
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                id="loan-dur-input"
                type="number"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder="Duration"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
              <select
                value={durationUnit}
                onChange={e => setDurationUnit(e.target.value as 'years' | 'months')}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Overview */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          {monthlyPayment > 0 ? (
            <div className="space-y-4">
              <div className="bg-emerald-600 text-white rounded-lg p-4 text-center">
                <span className="text-xs uppercase font-medium text-emerald-100 tracking-wider block">
                  Monthly Installment
                </span>
                <span className="text-2xl md:text-3xl font-extrabold mt-0.5 block">
                  Rs. {Math.round(monthlyPayment).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Total Interest</span>
                  <span className="font-bold text-slate-800 text-sm md:text-base">
                    Rs. {Math.round(totalInterest).toLocaleString()}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Total Repayment</span>
                  <span className="font-bold text-slate-800 text-sm md:text-base">
                    Rs. {Math.round(totalPayment).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress visual */}
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Principal: {((amount / totalPayment) * 100).toFixed(1)}%</span>
                  <span>Interest: {((totalInterest / totalPayment) * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-emerald-600"
                    style={{ width: `${(amount / totalPayment) * 100}%` }}
                  ></div>
                  <div
                    className="h-full bg-amber-500"
                    style={{ width: `${(totalInterest / totalPayment) * 100}%` }}
                  ></div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAmortization(!showAmortization)}
                className="w-full py-2 px-3 text-xs font-semibold text-emerald-700 bg-white hover:bg-emerald-50 border border-emerald-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <span>{showAmortization ? 'Hide' : 'View'} Amortization Summary</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showAmortization ? 'rotate-90' : ''}`} />
              </button>
            </div>
          ) : (
            <p className="text-slate-400 italic text-center py-8">
              Enter loan details to see installment and interest breakdown
            </p>
          )}
        </div>
      </div>

      {/* Amortization Table */}
      {showAmortization && amortizationSchedule.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Year-by-Year Amortization Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold">
                <tr>
                  <th className="p-2.5">Year</th>
                  <th className="p-2.5">Principal Paid</th>
                  <th className="p-2.5">Interest Paid</th>
                  <th className="p-2.5">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {amortizationSchedule.map(row => (
                  <tr key={row.year} className="hover:bg-slate-50">
                    <td className="p-2.5 font-semibold text-slate-800">Year {row.year}</td>
                    <td className="p-2.5 text-slate-700">Rs. {Math.round(row.principalPaid).toLocaleString()}</td>
                    <td className="p-2.5 text-amber-700">Rs. {Math.round(row.interestPaid).toLocaleString()}</td>
                    <td className="p-2.5 text-slate-900 font-medium">Rs. {Math.round(row.balance).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <CalculatorActions
        onReset={handleReset}
        resultText={resultSummary}
        calculatorTitle="Loan Calculator"
      />
    </div>
  );
};
