import React from 'react';
import { AdSensePlaceholder } from '../AdSensePlaceholder';
import { AlertTriangle } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-10 space-y-6 text-slate-700 text-sm leading-relaxed">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Terms &amp; Disclaimers</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Website Disclaimer
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Last Updated: September 2026
          </p>
        </div>

        <AdSensePlaceholder slotId="disclaimer-top" format="horizontal" />

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-900 text-xs">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <p>
            The information and computational results provided by Asan Calculator are for general educational, illustrative, and informational purposes only. They do not constitute formal financial, taxation, legal, medical, or real estate advice.
          </p>
        </div>

        <h2 className="text-lg font-bold text-slate-900 pt-2">1. Financial, Loan &amp; Tax Disclaimer</h2>
        <p>
          Calculations produced by our Loan Calculator, EMI Calculator, Simple/Compound Interest Calculators, and GST Calculator are estimates based on user-supplied numbers and standard mathematical formulas. Actual bank rates, amortizations, processing fees, insurance surcharges, and tax withholdings may vary depending on the State Bank of Pakistan (SBP) policy rate, KIBOR changes, provincial revenue authority regulations (FBR, PRA, SRB, KPRA), and specific lender terms. Users should verify official terms directly with their banking or certified tax accounting professional before executing financial agreements.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">2. Medical &amp; Health Disclaimer (BMI Calculator)</h2>
        <p>
          The Body Mass Index (BMI) calculator serves as a general anthropometric screening reference in accordance with World Health Organization guidelines. BMI does not directly evaluate body fat percentage, muscle mass distribution, bone density, or individual clinical health conditions. Consult a licensed medical practitioner or registered dietitian for diagnosis, nutritional guidance, or medical weight management programs.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">3. Land Measurement Disclaimer (Kanal &amp; Marla)</h2>
        <p>
          Land conversions (such as Marla to Square Feet and Acre to Kanal) provide standard options for both modern urban housing developments (225 sq ft/Marla) and traditional Punjab/Revenue Patwari registers (272.25 sq ft/Marla). Official land transfers in Pakistan are governed by verified Patwari demarcation and municipal authority layout approvals. Always confirm official fard/registry deeds before buying or selling property.
        </p>

        <h2 className="text-lg font-bold text-slate-900 pt-2">4. Limitation of Liability</h2>
        <p>
          Under no circumstances shall Asan Calculator, its authors, or operators be held liable for any direct, indirect, incidental, or consequential damages resulting from reliance on the computational outputs, inaccuracies, or downtime of this website.
        </p>
      </div>
    </div>
  );
};
