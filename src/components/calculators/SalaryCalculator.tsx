import React, { useState } from 'react';
import { CalculatorActions } from '../CalculatorActions';
import { AlertCircle, Briefcase } from 'lucide-react';

export const SalaryCalculator: React.FC = () => {
  const [inputType, setInputType] = useState<'monthly' | 'annual'>('monthly');
  const [salaryAmount, setSalaryAmount] = useState<string>('150000');
  const [workingDaysPerMonth, setWorkingDaysPerMonth] = useState<string>('22');
  const [hoursPerDay, setHoursPerDay] = useState<string>('8');

  const salary = parseFloat(salaryAmount);
  const days = parseFloat(workingDaysPerMonth);
  const hours = parseFloat(hoursPerDay);

  let annualSalary = 0;
  let monthlySalary = 0;
  let weeklySalary = 0;
  let dailySalary = 0;
  let hourlySalary = 0;
  let error: string | null = null;

  if (!salaryAmount || !workingDaysPerMonth || !hoursPerDay) {
    // blank
  } else if (isNaN(salary) || isNaN(days) || isNaN(hours) || salary <= 0 || days <= 0 || hours <= 0) {
    error = 'Please enter valid positive numbers.';
  } else if (days > 31 || hours > 24) {
    error = 'Working days cannot exceed 31 and daily hours cannot exceed 24.';
  } else {
    if (inputType === 'monthly') {
      monthlySalary = salary;
      annualSalary = salary * 12;
    } else {
      annualSalary = salary;
      monthlySalary = salary / 12;
    }

    weeklySalary = annualSalary / 52;
    dailySalary = monthlySalary / days;
    hourlySalary = dailySalary / hours;
  }

  const handleReset = () => {
    setSalaryAmount('');
    setWorkingDaysPerMonth('22');
    setHoursPerDay('8');
  };

  const resultSummary = monthlySalary > 0
    ? `Monthly: Rs. ${Math.round(monthlySalary).toLocaleString()} | Daily: Rs. ${dailySalary.toFixed(2)} | Hourly: Rs. ${hourlySalary.toFixed(2)} | Annual: Rs. ${Math.round(annualSalary).toLocaleString()}`
    : '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 md:p-8">
      {/* Switch monthly vs annual input */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setInputType('monthly')}
            className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              inputType === 'monthly'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Enter Monthly Salary
          </button>
          <button
            type="button"
            onClick={() => setInputType('annual')}
            className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              inputType === 'annual'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Enter Annual Package
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label htmlFor="salary-amount-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              {inputType === 'monthly' ? 'Base Monthly Salary (PKR)' : 'Total Annual Salary / Package (PKR)'}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">Rs.</span>
              <input
                id="salary-amount-input"
                type="number"
                step="any"
                value={salaryAmount}
                onChange={e => setSalaryAmount(e.target.value)}
                placeholder="e.g. 150000"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="working-days-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Working Days / Month
              </label>
              <input
                id="working-days-input"
                type="number"
                value={workingDaysPerMonth}
                onChange={e => setWorkingDaysPerMonth(e.target.value)}
                placeholder="e.g. 22"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">Standard: 22 (5-day) or 26 (6-day)</span>
            </div>

            <div>
              <label htmlFor="hours-per-day-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Work Hours / Day
              </label>
              <input
                id="hours-per-day-input"
                type="number"
                value={hoursPerDay}
                onChange={e => setHoursPerDay(e.target.value)}
                placeholder="e.g. 8"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">Standard: 8 hours</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          {monthlySalary > 0 && !error ? (
            <div className="space-y-4">
              <div className="bg-emerald-600 text-white rounded-lg p-4 text-center">
                <span className="text-xs uppercase font-medium text-emerald-100 tracking-wider block">
                  Hourly Rate
                </span>
                <span className="text-3xl font-extrabold mt-0.5 block">
                  Rs. {hourlySalary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs text-emerald-100 mt-1 block">Based on {hours} hours/day</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">Daily Wage</span>
                  <span className="font-bold text-slate-900 text-sm">
                    Rs. {dailySalary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">Weekly Pay</span>
                  <span className="font-bold text-slate-900 text-sm">
                    Rs. {Math.round(weeklySalary).toLocaleString()}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">Monthly Salary</span>
                  <span className="font-bold text-emerald-700 text-sm">
                    Rs. {Math.round(monthlySalary).toLocaleString()}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] uppercase text-slate-400 block font-semibold">Annual Package</span>
                  <span className="font-bold text-slate-900 text-sm">
                    Rs. {Math.round(annualSalary).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-slate-400 italic text-center py-8">
              Enter salary to compute hourly, daily, and annual breakdown
            </p>
          )}
        </div>
      </div>

      <CalculatorActions
        onReset={handleReset}
        resultText={resultSummary}
        calculatorTitle="Salary Calculator"
      />
    </div>
  );
};
