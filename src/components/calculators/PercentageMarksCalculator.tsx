import React, { useState } from 'react';
import { CalculatorActions } from '../CalculatorActions';
import { AlertCircle, Award } from 'lucide-react';

export const PercentageMarksCalculator: React.FC = () => {
  const [totalMarks, setTotalMarks] = useState<string>('1100');
  const [obtainedMarks, setObtainedMarks] = useState<string>('946');

  const tot = parseFloat(totalMarks);
  const obt = parseFloat(obtainedMarks);

  let percentage = 0;
  let grade = '';
  let gradeRemark = '';
  let gradeBadgeColor = '';
  let error: string | null = null;

  if (!totalMarks || !obtainedMarks) {
    // blank
  } else if (isNaN(tot) || isNaN(obt) || tot <= 0 || obt < 0) {
    error = 'Please enter valid non-negative numbers.';
  } else if (obt > tot) {
    error = 'Obtained marks cannot be greater than Total Maximum Marks.';
  } else {
    percentage = (obt / tot) * 100;

    if (percentage >= 80) {
      grade = 'A+';
      gradeRemark = 'Outstanding';
      gradeBadgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    } else if (percentage >= 70) {
      grade = 'A';
      gradeRemark = 'Excellent';
      gradeBadgeColor = 'bg-teal-100 text-teal-800 border-teal-300';
    } else if (percentage >= 60) {
      grade = 'B';
      gradeRemark = 'Very Good';
      gradeBadgeColor = 'bg-blue-100 text-blue-800 border-blue-300';
    } else if (percentage >= 50) {
      grade = 'C';
      gradeRemark = 'Good';
      gradeBadgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
    } else if (percentage >= 40) {
      grade = 'D';
      gradeRemark = 'Fair';
      gradeBadgeColor = 'bg-orange-100 text-orange-800 border-orange-300';
    } else if (percentage >= 33) {
      grade = 'E';
      gradeRemark = 'Satisfactory / Pass';
      gradeBadgeColor = 'bg-purple-100 text-purple-800 border-purple-300';
    } else {
      grade = 'F';
      gradeRemark = 'Fail';
      gradeBadgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
    }
  }

  const handleReset = () => {
    setTotalMarks('');
    setObtainedMarks('');
  };

  const resultSummary = !error && tot > 0
    ? `Score: ${obt}/${tot} | Percentage: ${percentage.toFixed(2)}% | Grade: ${grade} (${gradeRemark})`
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
            <label htmlFor="tot-marks-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Total Maximum Marks
            </label>
            <input
              id="tot-marks-input"
              type="number"
              step="any"
              value={totalMarks}
              onChange={e => setTotalMarks(e.target.value)}
              placeholder="e.g. 1100 (Matric/FSc) or 500"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
            {/* Quick buttons */}
            <div className="flex gap-2 mt-2">
              {['1100', '1050', '850', '500', '100'].map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setTotalMarks(m)}
                  className={`px-2 py-0.5 text-[11px] rounded border transition-colors cursor-pointer ${
                    totalMarks === m
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {m} marks
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="obt-marks-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Obtained Marks
            </label>
            <input
              id="obt-marks-input"
              type="number"
              step="any"
              value={obtainedMarks}
              onChange={e => setObtainedMarks(e.target.value)}
              placeholder="e.g. 946"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
          {!error && tot > 0 ? (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Computed Percentage
                </span>
                <div className="text-4xl font-extrabold text-emerald-800">
                  {percentage.toFixed(2)}%
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {obt.toLocaleString()} marks out of {tot.toLocaleString()}
                </div>
              </div>

              <div className="pt-2">
                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold border ${gradeBadgeColor}`}>
                  Grade: {grade} ({gradeRemark})
                </span>
              </div>

              {/* Progress visual */}
              <div className="space-y-1 pt-1">
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-slate-400 italic py-8">
              Enter total and obtained marks to calculate percentage and grade
            </p>
          )}
        </div>
      </div>

      <CalculatorActions
        onReset={handleReset}
        resultText={resultSummary}
        calculatorTitle="Percentage to Marks Calculator"
      />
    </div>
  );
};
