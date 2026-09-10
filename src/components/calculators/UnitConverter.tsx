import React, { useState } from 'react';
import { CalculatorActions } from '../CalculatorActions';
import { ArrowRightLeft, AlertCircle } from 'lucide-react';

type ConverterCategory = 'land' | 'length' | 'weight' | 'temperature' | 'volume';

export const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<ConverterCategory>('land');
  const [inputValue, setInputValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('kanal');
  const [toUnit, setToUnit] = useState<string>('marla');
  const [marlaStandard, setMarlaStandard] = useState<'225' | '272.25'>('225');

  const val = parseFloat(inputValue);
  let convertedValue: number | null = null;
  let formulaText = '';
  let error: string | null = null;

  // Conversion logic
  if (!inputValue) {
    // blank
  } else if (isNaN(val)) {
    error = 'Please enter a valid number';
  } else {
    if (category === 'land') {
      const sqFtPerMarla = parseFloat(marlaStandard);
      // Normalized to square feet
      const toSqFt: Record<string, number> = {
        marla: sqFtPerMarla,
        kanal: 20 * sqFtPerMarla,
        acre: 160 * sqFtPerMarla,
        hectare: 107639.104,
        sqft: 1
      };

      if (toSqFt[fromUnit] && toSqFt[toUnit]) {
        const sqft = val * toSqFt[fromUnit];
        convertedValue = sqft / toSqFt[toUnit];
        formulaText = `1 ${fromUnit} = ${(toSqFt[fromUnit] / toSqFt[toUnit]).toLocaleString()} ${toUnit}`;
      }
    } else if (category === 'length') {
      // Base: meters
      const toMeters: Record<string, number> = {
        km: 1000,
        miles: 1609.344,
        meter: 1,
        feet: 0.3048,
        inches: 0.0254
      };
      if (toMeters[fromUnit] && toMeters[toUnit]) {
        const meters = val * toMeters[fromUnit];
        convertedValue = meters / toMeters[toUnit];
        formulaText = `1 ${fromUnit} = ${(toMeters[fromUnit] / toMeters[toUnit]).toFixed(6)} ${toUnit}`;
      }
    } else if (category === 'weight') {
      // Base: kg
      const toKg: Record<string, number> = {
        kg: 1,
        lbs: 0.45359237,
        grams: 0.001,
        maund: 40 // traditional Pakistani maund (40 kg)
      };
      if (toKg[fromUnit] && toKg[toUnit]) {
        const kg = val * toKg[fromUnit];
        convertedValue = kg / toKg[toUnit];
        formulaText = `1 ${fromUnit} = ${(toKg[fromUnit] / toKg[toUnit]).toFixed(4)} ${toUnit}`;
      }
    } else if (category === 'temperature') {
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        convertedValue = (val * 9) / 5 + 32;
        formulaText = `(°C × 9/5) + 32 = °F`;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        convertedValue = ((val - 32) * 5) / 9;
        formulaText = `(°F - 32) × 5/9 = °C`;
      } else if (fromUnit === toUnit) {
        convertedValue = val;
      }
    } else if (category === 'volume') {
      // Base: Liter
      const toLiter: Record<string, number> = {
        liter: 1,
        gallon: 3.78541, // US Gallon
        milliliter: 0.001
      };
      if (toLiter[fromUnit] && toLiter[toUnit]) {
        const liters = val * toLiter[fromUnit];
        convertedValue = liters / toLiter[toUnit];
        formulaText = `1 ${fromUnit} = ${(toLiter[fromUnit] / toLiter[toUnit]).toFixed(5)} ${toUnit}`;
      }
    }
  }

  const handleCategoryChange = (newCat: ConverterCategory) => {
    setCategory(newCat);
    if (newCat === 'land') {
      setFromUnit('kanal');
      setToUnit('marla');
    } else if (newCat === 'length') {
      setFromUnit('km');
      setToUnit('miles');
    } else if (newCat === 'weight') {
      setFromUnit('kg');
      setToUnit('lbs');
    } else if (newCat === 'temperature') {
      setFromUnit('celsius');
      setToUnit('fahrenheit');
    } else if (newCat === 'volume') {
      setFromUnit('liter');
      setToUnit('gallon');
    }
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleReset = () => {
    setInputValue('1');
  };

  const resultSummary = convertedValue !== null && !isNaN(val)
    ? `${val} ${fromUnit} = ${Number(convertedValue.toFixed(4)).toLocaleString()} ${toUnit}`
    : '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 md:p-8">
      {/* Category switcher */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-100 pb-3">
        {[
          { id: 'land', label: '🏡 Pakistani Land Units (Marla, Kanal, Acre)' },
          { id: 'length', label: '📏 Distance & Length' },
          { id: 'weight', label: '⚖️ Weight & Mass' },
          { id: 'temperature', label: '🌡️ Temperature' },
          { id: 'volume', label: '🥛 Volume & Liquid' }
        ].map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategoryChange(cat.id as ConverterCategory)}
            className={`px-3.5 py-2 text-xs md:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              category === cat.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {category === 'land' && (
        <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>Standard Marla size:</span>
          <div className="flex gap-2">
            <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
              <input
                type="radio"
                name="marla-std"
                checked={marlaStandard === '225'}
                onChange={() => setMarlaStandard('225')}
                className="accent-emerald-600"
              />
              <span>225 Sq Ft (Modern: DHA, Bahria, LDA)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
              <input
                type="radio"
                name="marla-std"
                checked={marlaStandard === '272.25'}
                onChange={() => setMarlaStandard('272.25')}
                className="accent-emerald-600"
              />
              <span>272.25 Sq Ft (Traditional Patwari)</span>
            </label>
          </div>
        </div>
      )}

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
            <label htmlFor="unit-input-val" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Enter Value to Convert
            </label>
            <input
              id="unit-input-val"
              type="number"
              step="any"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="e.g. 1"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          <div className="grid grid-cols-5 gap-2 items-center">
            <div className="col-span-2">
              <label htmlFor="from-unit-select" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                From
              </label>
              <select
                id="from-unit-select"
                value={fromUnit}
                onChange={e => setFromUnit(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs md:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 capitalize font-medium"
              >
                {category === 'land' && (
                  <>
                    <option value="kanal">Kanal</option>
                    <option value="marla">Marla</option>
                    <option value="acre">Acre</option>
                    <option value="hectare">Hectare</option>
                    <option value="sqft">Square Feet (Sq Ft)</option>
                  </>
                )}
                {category === 'length' && (
                  <>
                    <option value="km">Kilometer (km)</option>
                    <option value="miles">Miles (mi)</option>
                    <option value="meter">Meter (m)</option>
                    <option value="feet">Feet (ft)</option>
                    <option value="inches">Inches (in)</option>
                  </>
                )}
                {category === 'weight' && (
                  <>
                    <option value="kg">Kilogram (kg)</option>
                    <option value="lbs">Pounds (lbs)</option>
                    <option value="grams">Grams (g)</option>
                    <option value="maund">Maund (Pakistani Mann - 40kg)</option>
                  </>
                )}
                {category === 'temperature' && (
                  <>
                    <option value="celsius">Celsius (°C)</option>
                    <option value="fahrenheit">Fahrenheit (°F)</option>
                  </>
                )}
                {category === 'volume' && (
                  <>
                    <option value="liter">Liter (L)</option>
                    <option value="gallon">Gallon (US gal)</option>
                    <option value="milliliter">Milliliter (ml)</option>
                  </>
                )}
              </select>
            </div>

            <div className="col-span-1 flex justify-center pt-5">
              <button
                type="button"
                onClick={handleSwap}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                title="Swap Units"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="col-span-2">
              <label htmlFor="to-unit-select" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                To
              </label>
              <select
                id="to-unit-select"
                value={toUnit}
                onChange={e => setToUnit(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs md:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 capitalize font-medium"
              >
                {category === 'land' && (
                  <>
                    <option value="marla">Marla</option>
                    <option value="kanal">Kanal</option>
                    <option value="acre">Acre</option>
                    <option value="hectare">Hectare</option>
                    <option value="sqft">Square Feet (Sq Ft)</option>
                  </>
                )}
                {category === 'length' && (
                  <>
                    <option value="miles">Miles (mi)</option>
                    <option value="km">Kilometer (km)</option>
                    <option value="meter">Meter (m)</option>
                    <option value="feet">Feet (ft)</option>
                    <option value="inches">Inches (in)</option>
                  </>
                )}
                {category === 'weight' && (
                  <>
                    <option value="lbs">Pounds (lbs)</option>
                    <option value="kg">Kilogram (kg)</option>
                    <option value="grams">Grams (g)</option>
                    <option value="maund">Maund (Pakistani Mann - 40kg)</option>
                  </>
                )}
                {category === 'temperature' && (
                  <>
                    <option value="fahrenheit">Fahrenheit (°F)</option>
                    <option value="celsius">Celsius (°C)</option>
                  </>
                )}
                {category === 'volume' && (
                  <>
                    <option value="gallon">Gallon (US gal)</option>
                    <option value="liter">Liter (L)</option>
                    <option value="milliliter">Milliliter (ml)</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-6 text-center flex flex-col justify-center min-h-[160px]">
          {convertedValue !== null && !isNaN(val) ? (
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Converted Output
              </span>
              <div className="text-3xl md:text-4xl font-extrabold text-emerald-800">
                {Number(convertedValue.toFixed(4)).toLocaleString()}
                <span className="text-sm font-semibold text-slate-600 ml-2 capitalize">{toUnit}</span>
              </div>
              <div className="text-xs text-slate-500 mt-2">
                {val.toLocaleString()} {fromUnit} = {Number(convertedValue.toFixed(4)).toLocaleString()} {toUnit}
              </div>
              {formulaText && (
                <div className="text-[11px] text-emerald-700 bg-white inline-block px-2.5 py-1 rounded border border-emerald-200 mt-3 font-mono">
                  {formulaText}
                </div>
              )}
            </div>
          ) : (
            <p className="text-slate-400 italic">Enter a number to convert units</p>
          )}
        </div>
      </div>

      <CalculatorActions
        onReset={handleReset}
        resultText={resultSummary}
        calculatorTitle="Unit Converter"
      />
    </div>
  );
};
