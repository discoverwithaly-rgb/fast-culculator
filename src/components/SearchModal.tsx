import React, { useState, useEffect, useRef } from 'react';
import { CALCULATORS_DATA } from '../data/calculatorsData';
import { Search, X, ChevronRight, Calculator } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open
          const btn = document.getElementById('btn-nav-search');
          btn?.click();
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();
  const results = CALCULATORS_DATA.filter(
    c =>
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.shortDescription.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search all 15 calculators (e.g. GST, BMI, Age, Kanal)..."
            className="w-full px-3 py-4 text-sm text-slate-800 focus:outline-none placeholder-slate-400 font-medium"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100">
          {results.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No calculators matched "{query}".
            </div>
          ) : (
            results.map(calc => (
              <button
                key={calc.id}
                type="button"
                onClick={() => {
                  onSelect(calc.slug);
                  onClose();
                }}
                className="w-full text-left p-3 hover:bg-emerald-50/80 rounded-xl transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="space-y-0.5 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                      {calc.name}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-slate-100 text-slate-500 rounded">
                      {calc.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{calc.shortDescription}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>{results.length} calculator{results.length !== 1 ? 's' : ''}</span>
          <span>Press <kbd className="bg-white border border-slate-300 rounded px-1 text-slate-600">ESC</kbd> to exit</span>
        </div>
      </div>
    </div>
  );
};
