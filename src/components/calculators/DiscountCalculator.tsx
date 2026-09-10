import React, { useState } from 'react';
import { CalculatorActions } from '../CalculatorActions';
import { AlertCircle, Tag } from 'lucide-react';

export const DiscountCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState<string>('7990');
  const [discountPercent, setDiscountPercent] = useState<string>('30');
  const [extraDiscountPercent, setExtraDiscountPercent] = useState<string>('0');

  const price = parseFloat(originalPrice);
  const disc1 = parseFloat(discountPercent);
  const disc2 = parseFloat(extraDiscountPercent || '0');

  let discountAmount = 0;
  let finalPrice = 0;
  let totalSaved = 0;
  let error: string | null = null;

  if (!originalPrice || !discountPercent) {
    // blank
  } else if (isNaN(price) || isNaN(disc1) || price < 0 || disc1 < 0 || disc2 < 0) {
    error = 'Please enter valid non-negative numbers.';
  } else {
    // First discount
    const firstDiscountAmt = (price * disc1) / 100;
    const priceAfterFirst = price - firstDiscountAmt;

    // Extra discount applied on discounted price
    const secondDiscountAmt = (priceAfterFirst * disc2) / 100;
    finalPrice = Math.max(0, priceAfterFirst - secondDiscountAmt);
    totalSaved = price - finalPrice;
    discountAmount = totalSaved;
  }

  const handleReset = () => {
    setOriginalPrice('');
    setDiscountPercent('');
    setExtraDiscountPercent('0');
  };

  const resultSummary = finalPrice >= 0 && price > 0
    ? `Original Price: Rs. ${price.toLocaleString()} | You Save: Rs. ${totalSaved.toFixed(2)} | Final Price: Rs. ${finalPrice.toFixed(2)}`
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
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label htmlFor="orig-price-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Original Retail Price (PKR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-bold">Rs.</span>
              <input
                id="orig-price-input"
                type="number"
                step="any"
                value={originalPrice}
                onChange={e => setOriginalPrice(e.target.value)}
                placeholder="e.g. 7990"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label htmlFor="disc-pct-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Primary Discount (%)
            </label>
            <div className="relative mb-2">
              <input
                id="disc-pct-input"
                type="number"
                step="any"
                value={discountPercent}
                onChange={e => setDiscountPercent(e.target.value)}
                placeholder="e.g. 30"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-9 font-medium"
              />
              <span className="absolute right-3 top-2.5 text-slate-400 font-bold text-sm">%</span>
            </div>

            {/* Quick buttons */}
            <div className="flex flex-wrap gap-1.5">
              {['10', '15', '20', '30', '40', '50', '70'].map(pct => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDiscountPercent(pct)}
                  className={`px-2 py-0.5 text-xs rounded border transition-colors cursor-pointer ${
                    discountPercent === pct
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {pct}% off
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="extra-disc-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Additional Coupon / Card Discount (%) <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <input
                id="extra-disc-input"
                type="number"
                step="any"
                value={extraDiscountPercent}
                onChange={e => setExtraDiscountPercent(e.target.value)}
                placeholder="e.g. 10"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-9 font-medium"
              />
              <span className="absolute right-3 top-2.5 text-slate-400 font-bold text-sm">%</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          {price > 0 && !error ? (
            <div className="space-y-4">
              <div className="bg-emerald-600 text-white rounded-lg p-4 text-center">
                <span className="text-xs uppercase font-medium text-emerald-100 tracking-wider block">
                  Final Payable Price
                </span>
                <span className="text-3xl font-extrabold mt-0.5 block">
                  Rs. {finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Original Price</span>
                  <span className="font-semibold text-slate-500 line-through text-sm">
                    Rs. {price.toLocaleString()}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-200 bg-emerald-50/40">
                  <span className="text-[11px] text-emerald-800 block font-semibold">You Save</span>
                  <span className="font-extrabold text-emerald-700 text-sm md:text-base">
                    Rs. {totalSaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200 text-center font-medium">
                Effective Total Savings: {((totalSaved / price) * 100).toFixed(1)}% off original price!
              </div>
            </div>
          ) : (
            <p className="text-slate-400 italic text-center py-8">
              Enter price and discount rate to see your savings
            </p>
          )}
        </div>
      </div>

      <CalculatorActions
        onReset={handleReset}
        resultText={resultSummary}
        calculatorTitle="Discount Calculator"
      />
    </div>
  );
};
