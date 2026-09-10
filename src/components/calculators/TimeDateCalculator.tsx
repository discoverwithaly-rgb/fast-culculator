import React, { useState } from 'react';
import { CalculatorActions } from '../CalculatorActions';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

export const TimeDateCalculator: React.FC = () => {
  const [tab, setTab] = useState<'diff' | 'addsub' | 'units'>('diff');

  // Tab 1: Days between two dates
  const todayStr = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState<string>(todayStr);
  const [endDate, setEndDate] = useState<string>('2026-12-25');
  const [includeEndDate, setIncludeEndDate] = useState<boolean>(false);

  // Tab 2: Add or subtract days
  const [baseDate, setBaseDate] = useState<string>(todayStr);
  const [daysDelta, setDaysDelta] = useState<string>('30');
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');

  // Tab 3: Time unit conversions (hours <-> mins <-> secs)
  const [timeValue, setTimeValue] = useState<string>('5');
  const [timeFromUnit, setTimeFromUnit] = useState<'hours' | 'minutes' | 'seconds'>('hours');

  let resultSummary = '';
  let calculatedView: React.ReactNode = null;
  let error: string | null = null;

  if (tab === 'diff') {
    if (!startDate || !endDate) {
      calculatedView = <p className="text-slate-400 italic">Select start and end dates</p>;
    } else {
      const d1 = new Date(startDate);
      const d2 = new Date(endDate);
      if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
        error = 'Invalid date input';
      } else {
        const diffMs = Math.abs(d2.getTime() - d1.getTime());
        let days = Math.round(diffMs / (1000 * 60 * 60 * 24));
        if (includeEndDate) days += 1;
        const weeks = Math.floor(days / 7);
        const remDays = days % 7;
        resultSummary = `Duration: ${days} days (${weeks} weeks and ${remDays} days)`;
        calculatedView = (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Calculated Duration
            </span>
            <div className="text-3xl md:text-4xl font-extrabold text-emerald-800">
              {days} <span className="text-sm font-semibold text-slate-600">Days</span>
            </div>
            <div className="text-xs text-slate-600">
              Equivalent to: <strong className="text-slate-800">{weeks} weeks and {remDays} days</strong>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              ({(days * 24).toLocaleString()} hours | {(days * 24 * 60).toLocaleString()} minutes)
            </div>
          </div>
        );
      }
    }
  } else if (tab === 'addsub') {
    const d = new Date(baseDate);
    const delta = parseInt(daysDelta, 10);
    if (!baseDate || !daysDelta) {
      calculatedView = <p className="text-slate-400 italic">Enter date and number of days</p>;
    } else if (isNaN(d.getTime()) || isNaN(delta)) {
      error = 'Please enter valid inputs';
    } else {
      const resultDate = new Date(d);
      if (operation === 'add') {
        resultDate.setDate(resultDate.getDate() + delta);
      } else {
        resultDate.setDate(resultDate.getDate() - delta);
      }
      const formatted = resultDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      resultSummary = `Result Date: ${formatted} (${operation === 'add' ? '+' : '-'}${delta} days from ${baseDate})`;
      calculatedView = (
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Target Date
          </span>
          <div className="text-2xl md:text-3xl font-extrabold text-emerald-800">
            {formatted}
          </div>
          <div className="text-xs text-slate-600">
            {delta} days {operation === 'add' ? 'after' : 'before'} {baseDate}
          </div>
        </div>
      );
    }
  } else if (tab === 'units') {
    const val = parseFloat(timeValue);
    if (!timeValue || isNaN(val)) {
      calculatedView = <p className="text-slate-400 italic">Enter a time duration</p>;
    } else {
      let hours = 0;
      let minutes = 0;
      let seconds = 0;

      if (timeFromUnit === 'hours') {
        hours = val;
        minutes = val * 60;
        seconds = val * 3600;
      } else if (timeFromUnit === 'minutes') {
        hours = val / 60;
        minutes = val;
        seconds = val * 60;
      } else {
        hours = val / 3600;
        minutes = val / 60;
        seconds = val;
      }

      resultSummary = `${val} ${timeFromUnit} = ${minutes.toLocaleString()} minutes / ${seconds.toLocaleString()} seconds`;
      calculatedView = (
        <div className="space-y-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Converted Time
          </span>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Hours</span>
              <span className="font-bold text-slate-900 text-sm md:text-base">{hours.toFixed(2)}</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Minutes</span>
              <span className="font-bold text-emerald-700 text-sm md:text-base">{minutes.toLocaleString()}</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">Seconds</span>
              <span className="font-bold text-slate-900 text-sm md:text-base">{seconds.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
  }

  const handleReset = () => {
    setStartDate(todayStr);
    setEndDate(todayStr);
    setDaysDelta('30');
    setTimeValue('1');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 md:p-8">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-100 pb-3">
        <button
          type="button"
          onClick={() => setTab('diff')}
          className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            tab === 'diff'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Days Between Two Dates
        </button>
        <button
          type="button"
          onClick={() => setTab('addsub')}
          className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            tab === 'addsub'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Add / Subtract Days from Date
        </button>
        <button
          type="button"
          onClick={() => setTab('units')}
          className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            tab === 'units'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Hours & Minutes Converter
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
          {tab === 'diff' && (
            <>
              <div>
                <label htmlFor="start-date-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Start Date
                </label>
                <input
                  id="start-date-input"
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
              <div>
                <label htmlFor="end-date-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  End Date
                </label>
                <input
                  id="end-date-input"
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
              <label className="flex items-center gap-2 text-xs text-slate-700 font-medium cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={includeEndDate}
                  onChange={e => setIncludeEndDate(e.target.checked)}
                  className="accent-emerald-600 rounded"
                />
                <span>Include End Date in calculation (adds 1 day)</span>
              </label>
            </>
          )}

          {tab === 'addsub' && (
            <>
              <div>
                <label htmlFor="base-date-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Starting Date
                </label>
                <input
                  id="base-date-input"
                  type="date"
                  value={baseDate}
                  onChange={e => setBaseDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="op-select" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Action
                  </label>
                  <select
                    id="op-select"
                    value={operation}
                    onChange={e => setOperation(e.target.value as 'add' | 'subtract')}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    <option value="add">Add (+)</option>
                    <option value="subtract">Subtract (-)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="delta-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Days
                  </label>
                  <input
                    id="delta-input"
                    type="number"
                    value={daysDelta}
                    onChange={e => setDaysDelta(e.target.value)}
                    placeholder="e.g. 30"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>
            </>
          )}

          {tab === 'units' && (
            <>
              <div>
                <label htmlFor="time-val-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Time Duration Value
                </label>
                <input
                  id="time-val-input"
                  type="number"
                  step="any"
                  value={timeValue}
                  onChange={e => setTimeValue(e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
              <div>
                <label htmlFor="time-unit-select" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Unit
                </label>
                <select
                  id="time-unit-select"
                  value={timeFromUnit}
                  onChange={e => setTimeFromUnit(e.target.value as 'hours' | 'minutes' | 'seconds')}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="hours">Hours</option>
                  <option value="minutes">Minutes</option>
                  <option value="seconds">Seconds</option>
                </select>
              </div>
            </>
          )}
        </div>

        {/* Results Card */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-6 text-center flex flex-col justify-center min-h-[160px]">
          {calculatedView}
        </div>
      </div>

      <CalculatorActions
        onReset={handleReset}
        resultText={resultSummary}
        calculatorTitle="Time & Date Calculator"
      />
    </div>
  );
};
