import React, { useState } from 'react';
import { RotateCcw, Copy, Check, Share2 } from 'lucide-react';

interface CalculatorActionsProps {
  onReset: () => void;
  resultText?: string;
  calculatorTitle: string;
}

export const CalculatorActions: React.FC<CalculatorActionsProps> = ({
  onReset,
  resultText,
  calculatorTitle
}) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopy = async () => {
    if (!resultText) return;
    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = resultText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${calculatorTitle} - Asan Calculator`,
      text: resultText
        ? `Result from ${calculatorTitle}: ${resultText}`
        : `Check out the free ${calculatorTitle} on Asan Calculator:`,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          // fallback to copy url
          copyUrlToClipboard();
        }
      }
    } else {
      copyUrlToClipboard();
    }
  };

  const copyUrlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
      <button
        type="button"
        id="btn-reset-calc"
        onClick={onReset}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-800 rounded-lg transition-colors cursor-pointer"
        title="Reset all inputs"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset</span>
      </button>

      {resultText && (
        <button
          type="button"
          id="btn-copy-result"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
          title="Copy result to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Result</span>
            </>
          )}
        </button>
      )}

      <button
        type="button"
        id="btn-share-calc"
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer ml-auto"
        title="Share calculator with friends or colleagues"
      >
        {shared ? (
          <>
            <Check className="w-3.5 h-3.5 text-blue-600" />
            <span>Link Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </>
        )}
      </button>
    </div>
  );
};
