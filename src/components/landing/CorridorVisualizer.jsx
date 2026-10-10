import React, { useState } from 'react';
import { Route, Clock, CheckCircle2, ShieldCheck, ArrowRight, Zap, TrendingDown, Layers, MapPin } from 'lucide-react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';

export default function CorridorVisualizer() {
  const [activeMode, setActiveMode] = useState('clustered'); // 'clustered' | 'standalone'

  return (
    <Card elevated className="p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8DFD1]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-forest animate-pulse" />
            <h3 className="font-bold text-lg text-forest tracking-tight">
              Smart Corridor Matching Engine
            </h3>
            <Badge variant="optimal">Sub-1.5 km Detour</Badge>
          </div>
          <p className="text-xs text-charcoal/70 mt-0.5">
            Combining multiple proximate surplus donations into a single daily commuter journey
          </p>
        </div>

        {/* Comparison Toggle */}
        <div className="inline-flex items-center bg-[#F7F0E3] p-1 rounded-full border border-[#E8DFD1] self-start sm:self-auto">
          <button
            onClick={() => setActiveMode('clustered')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeMode === 'clustered'
                ? 'bg-forest text-cream shadow-soft'
                : 'text-charcoal/70 hover:text-charcoal'
            }`}
          >
            ClusterFeed Journey
          </button>
          <button
            onClick={() => setActiveMode('standalone')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeMode === 'standalone'
                ? 'bg-[#BA1A1A] text-white shadow-soft'
                : 'text-charcoal/70 hover:text-charcoal'
            }`}
          >
            3 Separate Dispatches
          </button>
        </div>
      </div>

      {/* SVG Transit Schematic */}
      <div className="bg-[#FFF8ED] rounded-2xl p-4 sm:p-6 border border-[#E8DFD1] relative overflow-hidden">
        <svg
          viewBox="0 0 760 240"
          className="w-full h-auto text-forest select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Grid Lines */}
          <line x1="40" y1="40" x2="720" y2="40" stroke="#E8DFD1" strokeDasharray="4 4" strokeWidth="1" />
          <line x1="40" y1="100" x2="720" y2="100" stroke="#E8DFD1" strokeDasharray="4 4" strokeWidth="1" />
          <line x1="40" y1="160" x2="720" y2="160" stroke="#E8DFD1" strokeDasharray="4 4" strokeWidth="1" />
          <line x1="40" y1="200" x2="720" y2="200" stroke="#E8DFD1" strokeDasharray="4 4" strokeWidth="1" />

          {/* Commuter Primary Highway Route */}
          <path
            d="M 60 180 C 200 180, 280 80, 440 90 C 540 100, 600 50, 700 50"
            stroke="#B8DCCB"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {activeMode === 'clustered' ? (
            <>
              {/* Clustered Corridor Path with Micro-detour */}
              <path
                d="M 60 180 Q 160 170, 210 135 T 390 105 T 550 70 L 700 50"
                stroke="#245747"
                strokeWidth="5"
                strokeDasharray="8 4"
                strokeLinecap="round"
                className="animate-pulse"
              />

              {/* Waypoint 1: Commuter Origin */}
              <circle cx="60" cy="180" r="10" fill="#245747" />
              <circle cx="60" cy="180" r="4" fill="#FFF8ED" />
              <text x="60" y="215" fill="#26332E" fontSize="11" fontWeight="700" textAnchor="middle">
                Commute Origin
              </text>
              <text x="60" y="230" fill="#26332E" opacity="0.6" fontSize="10" textAnchor="middle">
                07:30 AM
              </text>

              {/* Waypoint 2: Stop A - Artisan Bakery */}
              <circle cx="210" cy="135" r="9" fill="#F5B49D" stroke="#245747" strokeWidth="2" />
              <text x="210" y="115" fill="#245747" fontSize="11" fontWeight="700" textAnchor="middle">
                Stop 1: Artisan Bakery
              </text>
              <text x="210" y="158" fill="#26332E" opacity="0.75" fontSize="10" textAnchor="middle">
                +14.5 kg (Detour +3 min)
              </text>

              {/* Waypoint 3: Stop B - Campus Mess Surplus */}
              <circle cx="390" cy="105" r="9" fill="#B8DCCB" stroke="#245747" strokeWidth="2" />
              <text x="390" y="85" fill="#245747" fontSize="11" fontWeight="700" textAnchor="middle">
                Stop 2: Campus Mess
              </text>
              <text x="390" y="128" fill="#26332E" opacity="0.75" fontSize="10" textAnchor="middle">
                +10.0 kg (Detour +2 min)
              </text>

              {/* Waypoint 4: Clustered Shelter Dropoff */}
              <circle cx="700" cy="50" r="11" fill="#245747" />
              <circle cx="700" cy="50" r="5" fill="#B8DCCB" />
              <text x="680" y="32" fill="#245747" fontSize="11" fontWeight="700" textAnchor="middle">
                Final Drop: St. Jude Shelter
              </text>
              <text x="680" y="80" fill="#2D6A4F" fontSize="10" fontWeight="600" textAnchor="middle">
                24.5 kg Delivered (08:14 AM)
              </text>
            </>
          ) : (
            <>
              {/* Standalone Vans traversing back and forth */}
              <path d="M 60 40 L 210 135" stroke="#BA1A1A" strokeWidth="3" strokeDasharray="4 4" />
              <path d="M 60 40 L 390 105" stroke="#BA1A1A" strokeWidth="3" strokeDasharray="4 4" />
              <path d="M 210 135 L 700 50" stroke="#BA1A1A" strokeWidth="3" strokeDasharray="4 4" />
              <path d="M 390 105 L 700 50" stroke="#BA1A1A" strokeWidth="3" strokeDasharray="4 4" />

              <circle cx="210" cy="135" r="8" fill="#BA1A1A" />
              <text x="210" y="160" fill="#BA1A1A" fontSize="11" fontWeight="700" textAnchor="middle">
                Van 1: Dedicated 18 km Trip
              </text>

              <circle cx="390" cy="105" r="8" fill="#BA1A1A" />
              <text x="390" y="130" fill="#BA1A1A" fontSize="11" fontWeight="700" textAnchor="middle">
                Van 2: Dedicated 22 km Trip
              </text>
            </>
          )}
        </svg>

        {/* Overlay Key Stats */}
        <div className="mt-4 pt-4 border-t border-[#E8DFD1] grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-white rounded-xl border border-[#E8DFD1]">
            <span className="block text-[11px] font-semibold text-charcoal/60 uppercase">Total Extra Detour</span>
            <span className={`text-base font-bold tabular-nums ${activeMode === 'clustered' ? 'text-forest' : 'text-[#BA1A1A]'}`}>
              {activeMode === 'clustered' ? '+5 mins (+1.2 km)' : '+44 mins (40 km)'}
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#E8DFD1]">
            <span className="block text-[11px] font-semibold text-charcoal/60 uppercase">Rescued Payload</span>
            <span className="text-base font-bold text-forest tabular-nums">
              24.5 kg (58 Meals)
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#E8DFD1]">
            <span className="block text-[11px] font-semibold text-charcoal/60 uppercase">Emissions Impact</span>
            <span className={`text-base font-bold tabular-nums ${activeMode === 'clustered' ? 'text-[#2D6A4F]' : 'text-[#BA1A1A]'}`}>
              {activeMode === 'clustered' ? '-94% CO2 Delta' : 'Baseline Fleet CO2'}
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#E8DFD1]">
            <span className="block text-[11px] font-semibold text-charcoal/60 uppercase">Safety Compliance</span>
            <span className="text-base font-bold text-forest tabular-nums">
              1h 48m Window (Safe)
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
