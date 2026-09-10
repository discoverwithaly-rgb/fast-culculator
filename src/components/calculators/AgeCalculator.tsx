import React, { useState } from 'react';
import { CalculatorActions } from '../CalculatorActions';
import { Calendar, Cake, Clock, AlertCircle } from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [dob, setDob] = useState<string>('1998-03-15');
  const [targetDate, setTargetDate] = useState<string>(todayStr);

  const calculateAge = () => {
    if (!dob || !targetDate) return null;

    const birth = new Date(dob);
    const target = new Date(targetDate);

    if (isNaN(birth.getTime()) || isNaN(target.getTime())) {
      return { error: 'Invalid date format' };
    }

    if (birth > target) {
      return { error: 'Date of birth cannot be later than the target date' };
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      // borrow from previous month
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    // Total days lived
    const diffTime = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    // Next birthday calculation
    let nextBdayYear = target.getFullYear();
    let nextBday = new Date(nextBdayYear, birth.getMonth(), birth.getDate());

    if (nextBday < target) {
      nextBday = new Date(nextBdayYear + 1, birth.getMonth(), birth.getDate());
    }

    const diffToNextBday = nextBday.getTime() - target.getTime();
    const daysUntilNextBday = Math.ceil(diffToNextBday / (1000 * 60 * 60 * 24));
    const nextBdayDayOfWeek = nextBday.toLocaleDateString('en-US', { weekday: 'long' });

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      daysUntilNextBday,
      nextBdayDayOfWeek,
      nextBdayDate: nextBday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
  };

  const res = calculateAge();

  const handleReset = () => {
    setDob('');
    setTargetDate(todayStr);
  };

  const resultText = res && !res.error
    ? `Exact Age: ${res.years} Years, ${res.months} Months, ${res.days} Days. Next birthday in ${res.daysUntilNextBday} days.`
    : '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label htmlFor="dob-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Date of Birth
            </label>
            <input
              id="dob-input"
              type="date"
              value={dob}
              max={targetDate}
              onChange={e => setDob(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label htmlFor="target-date-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Age on Date (Default: Today)
            </label>
            <input
              id="target-date-input"
              type="date"
              value={targetDate}
              onChange={e => setTargetDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
            💡 Tip: Change the "Age on Date" field to find out your exact age for job or school application deadlines.
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          {res?.error ? (
            <div className="flex items-center gap-2 text-rose-600 text-sm font-medium">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{res.error}</span>
            </div>
          ) : res ? (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Exact Age
                </span>
                <div className="text-2xl md:text-3xl font-extrabold text-emerald-800">
                  {res.years} <span className="text-sm font-semibold text-slate-600">Years</span> {res.months} <span className="text-sm font-semibold text-slate-600">Months</span> {res.days} <span className="text-sm font-semibold text-slate-600">Days</span>
                </div>
              </div>

              {/* Next Birthday info */}
              <div className="bg-white rounded-lg p-3.5 border border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <Cake className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase">Next Birthday</div>
                  <div className="text-sm font-bold text-slate-800">
                    {res.daysUntilNextBday === 0
                      ? '🎉 Happy Birthday Today!'
                      : `${res.daysUntilNextBday} days left (${res.nextBdayDate}, ${res.nextBdayDayOfWeek})`}
                  </div>
                </div>
              </div>

              {/* Lifetime stats */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                  <span className="text-[11px] text-slate-500 block">Total Days Lived</span>
                  <span className="font-bold text-slate-800 text-base">{res.totalDays.toLocaleString()}</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
                  <span className="text-[11px] text-slate-500 block">Total Weeks Lived</span>
                  <span className="font-bold text-slate-800 text-base">{res.totalWeeks.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-slate-400 italic text-center py-6">Select your birth date to calculate</p>
          )}
        </div>
      </div>

      <CalculatorActions
        onReset={handleReset}
        resultText={resultText}
        calculatorTitle="Age Calculator"
      />
    </div>
  );
};
