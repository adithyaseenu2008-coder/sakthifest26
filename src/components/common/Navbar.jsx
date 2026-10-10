import React, { useState } from 'react';
import { Route, Menu, X, ArrowLeft, LogIn, UserPlus, Sparkles } from 'lucide-react';
import Button from './Button.jsx';
import Badge from './Badge.jsx';

export default function Navbar({ currentView = 'landing', onNavigate, activeRole, onSelectRole }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roles = [
    { id: 'donor', label: 'Donor' },
    { id: 'volunteer', label: 'Volunteer' },
    { id: 'ngo', label: 'NGO / Shelter' },
    { id: 'buyer', label: 'Buyer' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFF8ED]/95 backdrop-blur-md border-b border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <button
          onClick={() => onNavigate?.('landing')}
          className="flex items-center gap-3 text-left group focus:outline-none focus:ring-2 focus:ring-forest/40 rounded-xl p-1"
        >
          <div className="w-11 h-11 rounded-2xl bg-forest flex items-center justify-center text-mint shadow-soft group-hover:scale-105 transition-transform">
            <Route className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-forest tracking-tight">ClusterFeed</span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-mint/50 text-[#1B4F40] text-[10px] font-bold uppercase tracking-wider">
                Pilot
              </span>
            </div>
            <span className="text-xs text-charcoal/70 tracking-wide font-medium hidden md:block">
              Rescue Food Along the Way
            </span>
          </div>
        </button>

        {/* View-specific Header Elements */}
        {currentView === 'landing' ? (
          <>
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/80 px-2 py-1.5 rounded-full border border-[#E8DFD1] shadow-soft">
              <a
                href="#how-it-works"
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-charcoal/80 hover:text-charcoal hover:bg-forest-50 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#corridor-tech"
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-charcoal/80 hover:text-charcoal hover:bg-forest-50 transition-colors"
              >
                Smart Corridors
              </a>
              <a
                href="#ecosystem-roles"
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-charcoal/80 hover:text-charcoal hover:bg-forest-50 transition-colors"
              >
                Roles & Benefits
              </a>
              <a
                href="#impact-stats"
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-charcoal/80 hover:text-charcoal hover:bg-forest-50 transition-colors"
              >
                Impact Telemetry
              </a>
            </nav>

            {/* Desktop Auth CTAs */}
            <div className="hidden sm:flex items-center gap-2.5">
              <Button
                variant="outline"
                size="sm"
                icon={LogIn}
                onClick={() => onNavigate?.('signin')}
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={UserPlus}
                onClick={() => onNavigate?.('signup')}
              >
                Get Started
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={ArrowLeft}
              onClick={() => onNavigate?.('landing')}
            >
              Back to Home
            </Button>
            {currentView === 'signin' ? (
              <Button
                variant="primary"
                size="sm"
                icon={UserPlus}
                onClick={() => onNavigate?.('signup')}
                className="hidden sm:inline-flex"
              >
                Create Account
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                icon={LogIn}
                onClick={() => onNavigate?.('signin')}
                className="hidden sm:inline-flex"
              >
                Sign In
              </Button>
            )}
          </div>
        )}

        {/* Mobile Menu Button for Landing */}
        {currentView === 'landing' && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-xl text-forest hover:bg-forest-50 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* Mobile Drawer */}
      {currentView === 'landing' && mobileMenuOpen && (
        <div className="sm:hidden bg-[#FFF8ED] border-b border-[#E8DFD1] px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-1">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-charcoal hover:bg-white"
            >
              How It Works
            </a>
            <a
              href="#corridor-tech"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-charcoal hover:bg-white"
            >
              Smart Corridors
            </a>
            <a
              href="#ecosystem-roles"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-charcoal hover:bg-white"
            >
              Roles & Benefits
            </a>
            <a
              href="#impact-stats"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-charcoal hover:bg-white"
            >
              Impact Telemetry
            </a>
          </nav>
          <div className="pt-2 border-t border-[#E8DFD1] flex flex-col gap-2">
            <Button
              variant="outline"
              size="md"
              className="w-full justify-center"
              icon={LogIn}
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate?.('signin');
              }}
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              size="md"
              className="w-full justify-center"
              icon={UserPlus}
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate?.('signup');
              }}
            >
              Get Started — Choose Role
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
