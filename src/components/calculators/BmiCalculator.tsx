import React, { useState } from 'react';
import { CalculatorActions } from '../CalculatorActions';
import { Activity, AlertCircle } from 'lucide-react';

export const BmiCalculator: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Metric: kg & cm
  const [weightKg, setWeightKg] = useState<string>('70');
  const [heightCm, setHeightCm] = useState<string>('172');

  // Imperial: lbs & ft + in
  const [weightLbs, setWeightLbs] = useState<string>('154');
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('8');

  let bmi: number | null = null;
  let category = '';
  let categoryColor = '';
  let idealWeightRange = '';
  let error: string | null = null;

  if (unitSystem === 'metric') {
    const w = parseFloat(weightKg);
    const h = parseFloat(heightCm);
    if (!weightKg || !heightCm) {
      // blank
    } else if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      error = 'Please enter positive values for height and weight.';
    } else {
      const heightM = h / 100;
      bmi = w / (heightM * heightM);
      const minIdeal = 18.5 * (heightM * heightM);
      const maxIdeal = 24.9 * (heightM * heightM);
      idealWeightRange = `${minIdeal.toFixed(1)} kg - ${maxIdeal.toFixed(1)} kg`;
    }
  } else {
    const w = parseFloat(weightLbs);
    const ft = parseFloat(heightFt || '0');
    const inch = parseFloat(heightIn || '0');
    const totalInches = ft * 12 + inch;

    if (!weightLbs || (!heightFt && !heightIn)) {
      // blank
    } else if (isNaN(w) || isNaN(totalInches) || w <= 0 || totalInches <= 0) {
      error = 'Please enter valid positive numbers.';
    } else {
      bmi = (703 * w) / (totalInches * totalInches);
      const minIdealLbs = (18.5 * totalInches * totalInches) / 703;
      const maxIdealLbs = (24.9 * totalInches * totalInches) / 703;
      idealWeightRange = `${minIdealLbs.toFixed(1)} lbs - ${maxIdealLbs.toFixed(1)} lbs`;
    }
  }

  if (bmi !== null) {
    if (bmi < 18.5) {
      category = 'Underweight';
      categoryColor = 'text-blue-600 bg-blue-50 border-blue-200';
    } else if (bmi < 25) {
      category = 'Normal Weight';
      categoryColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    } else if (bmi < 30) {
      category = 'Overweight';
      categoryColor = 'text-amber-700 bg-amber-50 border-amber-200';
    } else {
      category = 'Obesity';
      categoryColor = 'text-rose-700 bg-rose-50 border-rose-200';
    }
  }

  const handleReset = () => {
    setWeightKg('');
    setHeightCm('');
    setWeightLbs('');
    setHeightFt('');
    setHeightIn('');
  };

  const resultSummary = bmi !== null
    ? `BMI: ${bmi.toFixed(1)} (${category}). Ideal Healthy Weight: ${idealWeightRange}`
    : '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 md:p-8">
      {/* Unit switch */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setUnitSystem('metric')}
            className={`px-5 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              unitSystem === 'metric'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Metric (kg, cm)
          </button>
          <button
            type="button"
            onClick={() => setUnitSystem('imperial')}
            className={`px-5 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              unitSystem === 'imperial'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Imperial (lbs, ft/in)
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
        {/* Input fields */}
        <div className="space-y-4">
          {unitSystem === 'metric' ? (
            <>
              <div>
                <label htmlFor="height-cm-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Height (Centimeters)
                </label>
                <div className="relative">
                  <input
                    id="height-cm-input"
                    type="number"
                    step="any"
                    value={heightCm}
                    onChange={e => setHeightCm(e.target.value)}
                    placeholder="e.g. 172"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-12"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400 text-xs font-semibold">cm</span>
                </div>
              </div>
              <div>
                <label htmlFor="weight-kg-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Weight (Kilograms)
                </label>
                <div className="relative">
                  <input
                    id="weight-kg-input"
                    type="number"
                    step="any"
                    value={weightKg}
                    onChange={e => setWeightKg(e.target.value)}
                    placeholder="e.g. 70"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-12"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400 text-xs font-semibold">kg</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="height-ft-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Height (Feet & Inches)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <input
                      id="height-ft-input"
                      type="number"
                      value={heightFt}
                      onChange={e => setHeightFt(e.target.value)}
                      placeholder="Feet"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                    />
                    <span className="absolute right-3 top-2.5 text-slate-400 text-xs font-semibold">ft</span>
                  </div>
                  <div className="relative">
                    <input
                      id="height-in-input"
                      type="number"
                      value={heightIn}
                      onChange={e => setHeightIn(e.target.value)}
                      placeholder="Inches"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
                    />
                    <span className="absolute right-3 top-2.5 text-slate-400 text-xs font-semibold">in</span>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="weight-lbs-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Weight (Pounds)
                </label>
                <div className="relative">
                  <input
                    id="weight-lbs-input"
                    type="number"
                    step="any"
                    value={weightLbs}
                    onChange={e => setWeightLbs(e.target.value)}
                    placeholder="e.g. 154"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-12"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400 text-xs font-semibold">lbs</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Results Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center flex flex-col justify-center">
          {bmi !== null ? (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Your Calculated BMI
                </span>
                <div className="text-4xl font-extrabold text-slate-900">
                  {bmi.toFixed(1)}
                </div>
                <div className="mt-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${categoryColor}`}>
                    {category}
                  </span>
                </div>
              </div>

              {/* Progress bar visual */}
              <div className="space-y-1 pt-2">
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                  <div className="h-full bg-blue-400 w-[18.5%]" title="Underweight (&lt; 18.5)"></div>
                  <div className="h-full bg-emerald-500 w-[25%]" title="Normal (18.5 - 24.9)"></div>
                  <div className="h-full bg-amber-400 w-[20%]" title="Overweight (25 - 29.9)"></div>
                  <div className="h-full bg-rose-500 w-[36.5%]" title="Obese (≥ 30)"></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 px-0.5">
                  <span>16</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Healthy Weight Range for your height:</span>
                <div className="text-emerald-700 font-bold mt-0.5">{idealWeightRange}</div>
              </div>
            </div>
          ) : (
            <p className="text-slate-400 italic py-6">Enter your height and weight to calculate BMI</p>
          )}
        </div>
      </div>

      <CalculatorActions
        onReset={handleReset}
        resultText={resultSummary}
        calculatorTitle="BMI Calculator"
      />
    </div>
  );
};
