import React from 'react';
import { Route, Heart, Compass, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="w-full bg-[#F7F0E3] border-t border-[#E8DFD1] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-forest flex items-center justify-center text-mint">
                <Route className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-forest tracking-tight">ClusterFeed</span>
            </div>
            <p className="text-sm font-semibold text-charcoal/90">
              Rescue Food Along the Way.
            </p>
            <p className="text-xs text-charcoal/70 max-w-sm leading-relaxed">
              Decentralized surplus food recovery embedded into everyday commuter corridors. 
              Zero dedicated diesel dispatch fleets. Real-time food safety compliance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-forest uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5 text-xs text-charcoal/80">
              <li>
                <button
                  onClick={() => onNavigate?.('landing')}
                  className="hover:text-forest transition-colors"
                >
                  Landing Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('signup', 'donor')}
                  className="hover:text-forest transition-colors"
                >
                  Join as Food Donor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('signup', 'volunteer')}
                  className="hover:text-forest transition-colors"
                >
                  Commuter Volunteers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('signup', 'ngo')}
                  className="hover:text-forest transition-colors"
                >
                  Shelters & NGOs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('signup', 'buyer')}
                  className="hover:text-forest transition-colors"
                >
                  Surplus Discount Buyers
                </button>
              </li>
            </ul>
          </div>

          {/* Security & System Architecture Notice */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-forest uppercase tracking-wider">System Architecture</h4>
            <div className="p-3 rounded-xl bg-white/70 border border-[#E8DFD1] text-[11px] text-charcoal/75 space-y-1.5">
              <div className="flex items-center gap-1 font-semibold text-forest">
                <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                <span>Phase 2 Prototype Sandbox</span>
              </div>
              <p>
                Frontend UI calibrated to Google Stitch AI specifications. MongoDB and live auth microservices scheduled for later phases.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#E8DFD1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal/60">
          <p>© {new Date().getFullYear()} ClusterFeed Food Rescue Platform. Hackathon Edition.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-forest" />
              Sub-1.5 km Commuter Detours
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-pink-pastel" />
              Zero-Waste Community Loop
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
