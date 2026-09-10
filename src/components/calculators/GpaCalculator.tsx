import React, { useState } from 'react';
import { CalculatorActions } from '../CalculatorActions';
import { Plus, Trash2, GraduationCap, AlertCircle } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.67,
  'B+': 3.33,
  'B': 3.0,
  'B-': 2.67,
  'C+': 2.33,
  'C': 2.0,
  'C-': 1.67,
  'D+': 1.33,
  'D': 1.0,
  'F': 0.0
};

export const GpaCalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Programming Fundamentals', credits: 3, grade: 'A' },
    { id: '2', name: 'Calculus & Analytical Geometry', credits: 3, grade: 'B+' },
    { id: '3', name: 'Applied Physics', credits: 4, grade: 'A-' },
    { id: '4', name: 'English Composition', credits: 3, grade: 'A' }
  ]);

  const [includePrior, setIncludePrior] = useState<boolean>(false);
  const [priorCgpa, setPriorCgpa] = useState<string>('3.50');
  const [priorCredits, setPriorCredits] = useState<string>('32');

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now().toString(), name: `Subject ${courses.length + 1}`, credits: 3, grade: 'A' }
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, val: string | number) => {
    setCourses(courses.map(c => (c.id === id ? { ...c, [field]: val } : c)));
  };

  // Calculations
  let semesterCredits = 0;
  let semesterPoints = 0;

  courses.forEach(c => {
    const pts = GRADE_POINTS[c.grade] ?? 0;
    semesterCredits += c.credits;
    semesterPoints += c.credits * pts;
  });

  const semesterGpa = semesterCredits > 0 ? semesterPoints / semesterCredits : 0;

  let cumulativeCgpa = semesterGpa;
  let totalCumulativeCredits = semesterCredits;

  if (includePrior) {
    const priorG = parseFloat(priorCgpa);
    const priorC = parseFloat(priorCredits);
    if (!isNaN(priorG) && !isNaN(priorC) && priorC > 0) {
      const priorTotalPoints = priorG * priorC;
      totalCumulativeCredits = priorC + semesterCredits;
      cumulativeCgpa = (priorTotalPoints + semesterPoints) / totalCumulativeCredits;
    }
  }

  const handleReset = () => {
    setCourses([
      { id: '1', name: 'Subject 1', credits: 3, grade: 'A' },
      { id: '2', name: 'Subject 2', credits: 3, grade: 'B' }
    ]);
    setIncludePrior(false);
    setPriorCgpa('3.50');
    setPriorCredits('30');
  };

  const resultSummary = `Semester GPA: ${semesterGpa.toFixed(2)} (${semesterCredits} Credits)${
    includePrior ? ` | Cumulative CGPA: ${cumulativeCgpa.toFixed(2)} (${totalCumulativeCredits} Total Credits)` : ''
  }`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Course Rows Form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              Semester Courses ({courses.length})
            </h3>
            <button
              type="button"
              id="btn-add-subject"
              onClick={addCourse}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Subject</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <div className="flex-1">
                  <input
                    type="text"
                    value={course.name}
                    onChange={e => updateCourse(course.id, 'name', e.target.value)}
                    placeholder={`Course ${index + 1}`}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  />
                </div>

                <div className="w-24">
                  <select
                    value={course.credits}
                    onChange={e => updateCourse(course.id, 'credits', parseInt(e.target.value, 10))}
                    className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  >
                    <option value={1}>1 Credit</option>
                    <option value={2}>2 Credits</option>
                    <option value={3}>3 Credits</option>
                    <option value={4}>4 Credits</option>
                  </select>
                </div>

                <div className="w-24">
                  <select
                    value={course.grade}
                    onChange={e => updateCourse(course.id, 'grade', e.target.value)}
                    className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-bold"
                  >
                    {Object.keys(GRADE_POINTS).map(g => (
                      <option key={g} value={g}>
                        {g} ({GRADE_POINTS[g].toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length <= 1}
                  className="p-1.5 text-slate-400 hover:text-rose-600 disabled:opacity-30 transition-colors cursor-pointer"
                  title="Delete Course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Optional Prior CGPA */}
          <div className="pt-4 border-t border-slate-200">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={includePrior}
                onChange={e => setIncludePrior(e.target.checked)}
                className="accent-emerald-600 rounded"
              />
              <span>Include Previous Semesters to Calculate Cumulative CGPA</span>
            </label>

            {includePrior && (
              <div className="grid grid-cols-2 gap-3 mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Previous CGPA (e.g. 3.45)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4.0"
                    value={priorCgpa}
                    onChange={e => setPriorCgpa(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Previous Earned Credits
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={priorCredits}
                    onChange={e => setPriorCredits(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="bg-emerald-600 text-white rounded-lg p-4 text-center">
            <span className="text-xs uppercase font-medium text-emerald-100 tracking-wider block">
              Semester GPA
            </span>
            <span className="text-4xl font-extrabold mt-0.5 block">
              {semesterGpa.toFixed(2)}
            </span>
            <span className="text-xs text-emerald-100 mt-1 block">out of 4.00 Max</span>
          </div>

          {includePrior && (
            <div className="bg-white border border-emerald-300 rounded-lg p-3 text-center">
              <span className="text-xs uppercase font-semibold text-slate-500 block">
                Overall Cumulative CGPA
              </span>
              <span className="text-2xl font-extrabold text-emerald-800 mt-0.5 block">
                {cumulativeCgpa.toFixed(2)}
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Total Credits: {totalCumulativeCredits}
              </span>
            </div>
          )}

          <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-600">
              <span>Semester Credits:</span>
              <span className="font-bold text-slate-900">{semesterCredits}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Grade Points Earned:</span>
              <span className="font-bold text-slate-900">{semesterPoints.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <CalculatorActions
        onReset={handleReset}
        resultText={resultSummary}
        calculatorTitle="GPA Calculator"
      />
    </div>
  );
};
