import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar.jsx';
import Footer from './components/common/Footer.jsx';
import LandingPage from './pages/LandingPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import { ROLES } from './constants/theme.js';
import { Layers, Compass, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'signin' | 'signup'
  const [activeRole, setActiveRole] = useState('volunteer');

  // Smooth scroll to top when changing views
  const handleNavigate = (view, role) => {
    if (role) {
      setActiveRole(role);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8ED] text-[#26332E] font-sans selection:bg-mint selection:text-charcoal antialiased">
      {/* Dynamic Header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        activeRole={activeRole}
        onSelectRole={setActiveRole}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {currentView === 'landing' && (
          <LandingPage onNavigate={handleNavigate} />
        )}

        {currentView === 'signin' && (
          <SignInPage
            onNavigate={handleNavigate}
            activeRole={activeRole}
            onSelectRole={setActiveRole}
          />
        )}

        {currentView === 'signup' && (
          <SignUpPage
            onNavigate={handleNavigate}
            initialRole={activeRole}
            onSelectRole={setActiveRole}
          />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Phase 2 Floating Developer & Judge Navigation Bar */}
      <aside aria-label="Hackathon Quick View Selector" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#26332E]/90 text-cream backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-elevated flex items-center gap-2 text-xs">
        <span className="font-bold text-mint hidden sm:inline-flex items-center gap-1">
          <Layers className="w-3.5 h-3.5" />
          Phase 2 Screens:
        </span>
        <button
          onClick={() => handleNavigate('landing')}
          className={`px-3 py-1 rounded-full font-semibold transition-all ${
            currentView === 'landing'
              ? 'bg-mint text-charcoal'
              : 'text-cream/80 hover:text-cream hover:bg-white/10'
          }`}
        >
          Landing (Screen A)
        </button>
        <button
          onClick={() => handleNavigate('signin')}
          className={`px-3 py-1 rounded-full font-semibold transition-all ${
            currentView === 'signin'
              ? 'bg-mint text-charcoal'
              : 'text-cream/80 hover:text-cream hover:bg-white/10'
          }`}
        >
          Sign In (Screen B)
        </button>
        <button
          onClick={() => handleNavigate('signup')}
          className={`px-3 py-1 rounded-full font-semibold transition-all ${
            currentView === 'signup'
              ? 'bg-mint text-charcoal'
              : 'text-cream/80 hover:text-cream hover:bg-white/10'
          }`}
        >
          Sign Up (Screen C)
        </button>
      </aside>
    </div>
  );
}
