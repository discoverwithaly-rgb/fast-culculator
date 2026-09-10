/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './components/pages/HomePage';
import { CalculatorPage } from './components/CalculatorPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { DisclaimerPage } from './components/pages/DisclaimerPage';
import { SitemapPage } from './components/pages/SitemapPage';
import { CALCULATORS_DATA } from './data/calculatorsData';
import { CalculatorCategory } from './types';

export default function App() {
  // Initialize route from window.location.hash if present (e.g. #gst-calculator)
  const getInitialRoute = () => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    return hash || 'home';
  };

  const [currentRoute, setCurrentRoute] = useState<string>(getInitialRoute);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Sync route changes with browser history and window.location.hash
  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    window.location.hash = `#${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      setCurrentRoute(hash || 'home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Dynamically update document title and meta description for SEO
  useEffect(() => {
    if (currentRoute === 'home') {
      document.title = 'Asan Calculator - Free Online Calculators for Pakistan';
    } else if (currentRoute === 'about') {
      document.title = 'About Us - Asan Calculator';
    } else if (currentRoute === 'contact') {
      document.title = 'Contact & Support - Asan Calculator';
    } else if (currentRoute === 'privacy-policy') {
      document.title = 'Privacy Policy - Asan Calculator';
    } else if (currentRoute === 'disclaimer') {
      document.title = 'Disclaimer & Terms - Asan Calculator';
    } else if (currentRoute === 'sitemap') {
      document.title = 'HTML Sitemap - Asan Calculator';
    } else if (currentRoute.startsWith('cat-')) {
      const catName = currentRoute.replace('cat-', '').replace(/-/g, ' ');
      document.title = `${catName.toUpperCase()} Calculators - Asan Calculator`;
    } else {
      const calc = CALCULATORS_DATA.find(c => c.slug === currentRoute);
      if (calc) {
        document.title = `${calc.name} - Free Online Tool | Asan Calculator`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.setAttribute('content', calc.shortDescription);
        }
      }
    }
  }, [currentRoute]);

  // Determine which page content to render
  const renderContent = () => {
    if (currentRoute === 'home') {
      return <HomePage onNavigate={handleNavigate} />;
    }

    if (currentRoute.startsWith('cat-')) {
      const rawCategory = currentRoute.replace('cat-', '').replace(/-/g, ' ');
      // Match category loosely
      const matchedCategory: CalculatorCategory | 'All' =
        rawCategory.includes('finance') ? 'Finance' :
        rawCategory.includes('health') ? 'Health' :
        rawCategory.includes('education') ? 'Education' :
        rawCategory.includes('math') ? 'Math' :
        rawCategory.includes('unit') ? 'Unit Conversion' :
        rawCategory.includes('date') || rawCategory.includes('time') ? 'Date & Time' : 'All';

      return <HomePage onNavigate={handleNavigate} initialCategory={matchedCategory} />;
    }

    if (currentRoute === 'about') {
      return <AboutPage />;
    }
    if (currentRoute === 'contact') {
      return <ContactPage />;
    }
    if (currentRoute === 'privacy-policy') {
      return <PrivacyPolicyPage />;
    }
    if (currentRoute === 'disclaimer') {
      return <DisclaimerPage />;
    }
    if (currentRoute === 'sitemap') {
      return <SitemapPage onNavigate={handleNavigate} />;
    }

    // Check if it's one of the 15 calculators
    const calcData = CALCULATORS_DATA.find(c => c.slug === currentRoute);
    if (calcData) {
      return <CalculatorPage data={calcData} onNavigate={handleNavigate} />;
    }

    // Fallback: not found, redirect to home
    return <HomePage onNavigate={handleNavigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Top Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderContent()}
      </main>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelect={slug => handleNavigate(slug)}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
