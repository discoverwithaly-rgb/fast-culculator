import React, { useState } from 'react';
import { CalculatorCategory } from '../types';
import { CATEGORIES } from '../data/calculatorsData';
import { Calculator, Menu, X, Search, ChevronDown, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onSearchClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const handleNav = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setCategoryDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            aria-label="Asan Calculator Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                  Asan Calculator
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  PK
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Fast & Free Online Calculators</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentRoute === 'home'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All Calculators
            </button>

            {/* Popular quick links */}
            <button
              type="button"
              onClick={() => handleNav('gst-calculator')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentRoute === 'gst-calculator'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              GST Pakistan
            </button>

            <button
              type="button"
              onClick={() => handleNav('unit-converter')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentRoute === 'unit-converter'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Land & Marla
            </button>

            <button
              type="button"
              onClick={() => handleNav('gpa-calculator')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                currentRoute === 'gpa-calculator'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              GPA / CGPA
            </button>

            {/* Categories dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleNav(`cat-${cat.toLowerCase().replace(/\s+/g, '-')}`)}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Search and Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-nav-search"
              onClick={onSearchClick}
              className="flex items-center gap-2 px-3 py-2 text-xs md:text-sm text-slate-500 bg-slate-100 hover:bg-slate-200 hover:text-slate-800 rounded-xl transition-colors cursor-pointer"
              aria-label="Search Calculators"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Search Calculators...</span>
              <kbd className="hidden sm:inline-block bg-white border border-slate-300 rounded px-1.5 py-0.5 text-[10px] text-slate-500 font-mono">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className="text-left px-3 py-2 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-800"
            >
              All 15 Calculators
            </button>
            <button
              type="button"
              onClick={() => handleNav('gst-calculator')}
              className="text-left px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700"
            >
              GST Tax Pakistan
            </button>
            <button
              type="button"
              onClick={() => handleNav('unit-converter')}
              className="text-left px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700"
            >
              Land (Marla/Kanal)
            </button>
            <button
              type="button"
              onClick={() => handleNav('gpa-calculator')}
              className="text-left px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700"
            >
              University GPA
            </button>
          </div>

          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
            Categories
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => handleNav(`cat-${cat.toLowerCase().replace(/\s+/g, '-')}`)}
                className="text-left px-3 py-2 text-xs font-medium rounded text-slate-600 hover:bg-slate-50"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-2">
            <button type="button" onClick={() => handleNav('about')} className="hover:text-emerald-700">About</button>
            <button type="button" onClick={() => handleNav('privacy-policy')} className="hover:text-emerald-700">Privacy</button>
            <button type="button" onClick={() => handleNav('disclaimer')} className="hover:text-emerald-700">Disclaimer</button>
            <button type="button" onClick={() => handleNav('contact')} className="hover:text-emerald-700">Contact</button>
          </div>
        </div>
      )}
    </header>
  );
};
