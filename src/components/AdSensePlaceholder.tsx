import React from 'react';

interface AdSensePlaceholderProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'in-article';
  className?: string;
}

export const AdSensePlaceholder: React.FC<AdSensePlaceholderProps> = ({
  slotId = '1234567890',
  format = 'horizontal',
  className = ''
}) => {
  const getFormatClasses = () => {
    switch (format) {
      case 'horizontal':
        return 'min-h-[90px] md:min-h-[100px] w-full max-w-4xl';
      case 'rectangle':
        return 'min-h-[250px] w-full max-w-[336px]';
      case 'in-article':
        return 'min-h-[120px] w-full max-w-3xl';
      default:
        return 'min-h-[90px] w-full';
    }
  };

  return (
    <div
      className={`my-6 mx-auto flex flex-col items-center justify-center ${className}`}
      aria-label="Advertisement Section"
    >
      {/* Clean policy compliant Ad Label */}
      <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 mb-1">
        Advertisement
      </span>

      {/* AdSense Unit Box */}
      <div
        className={`w-full bg-slate-100/70 border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center p-4 text-center transition-colors ${getFormatClasses()}`}
      >
        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500/60 animate-pulse"></span>
          <span>Google AdSense Space</span>
          <span className="bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded text-[10px]">
            Slot #{slotId}
          </span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 max-w-md">
          Responsive Ad Unit ({format}). Once approved, paste your{' '}
          <code className="bg-slate-200 text-slate-700 px-1 rounded text-[10px]">
            &lt;ins class="adsbygoogle"&gt;
          </code>{' '}
          snippet here.
        </p>
      </div>
    </div>
  );
};
