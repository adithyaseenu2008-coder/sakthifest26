import React from 'react';
import { Route, Navigation, ArrowRight, ShieldCheck, Sparkles, TrendingUp, Compass, Heart, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import Badge from '../components/common/Badge.jsx';
import Card from '../components/common/Card.jsx';
import CorridorVisualizer from '../components/landing/CorridorVisualizer.jsx';
import HowItWorks from '../components/landing/HowItWorks.jsx';
import RoleEcosystem from '../components/landing/RoleEcosystem.jsx';
import { SEED_METRICS } from '../data/seedData.js';

export default function LandingPage({ onNavigate }) {
  return (
    <div className="space-y-16 py-6">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-forest text-cream p-8 sm:p-14 shadow-elevated">
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint text-charcoal font-semibold text-xs uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
              Corridor Logistics Engine • Zero Deadheading
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-cream/15 text-cream text-xs font-semibold">
              Live Hackathon Demo
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
            Turning everyday commutes into zero-emissions food rescue routes.
          </h1>

          <p className="text-base sm:text-xl text-mint font-medium leading-relaxed">
            Tagline: &ldquo;Rescue Food Along the Way.&rdquo;
          </p>

          <p className="text-sm sm:text-base text-cream/85 max-w-2xl leading-relaxed">
            Connect bakeries, restaurants, and hostel messes with commuters already traveling along the corridor. 
            Combine multiple small surplus batches into practical collection trips while strictly respecting food-safety deadlines.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              size="lg"
              icon={ArrowRight}
              onClick={() => onNavigate?.('signup')}
            >
              Get Started — Choose Role
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-cream/30 text-cream hover:bg-white/10"
              icon={Navigation}
              onClick={() => onNavigate?.('signin')}
            >
              Sign In to Platform
            </Button>
          </div>

          {/* Quick Feature Micro-Pills */}
          <div className="pt-4 flex flex-wrap items-center gap-2 text-xs text-cream/80">
            <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-mint" />
              Sub-1.5 km Commuter Detours
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-mint" />
              Real-time HACCP Temperature Limits
            </span>
            <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-mint" />
              4-Digit Secure OTP Handovers
            </span>
          </div>
        </div>

        {/* Decorative background glows */}
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-mint/15 blur-3xl pointer-events-none" />
        <div className="absolute right-12 top-12 opacity-10 pointer-events-none hidden lg:block">
          <Route className="w-80 h-80 text-cream" />
        </div>
      </section>

      {/* 2. Corridor Matching & Multi-Donation Clustering */}
      <section id="corridor-tech" className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-forest/70">
            Algorithmic Route Aggregation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest tracking-tight">
            How ClusterFeed Detours Avoid the Emission Trap
          </h2>
          <p className="text-sm text-charcoal/70">
            Instead of dispatching empty diesel vans across town, ClusterFeed bundles nearby donations directly onto commuter travel corridors.
          </p>
        </div>

        <CorridorVisualizer />
      </section>

      {/* 3. Four-Stage Lifecycle */}
      <HowItWorks />

      {/* 4. Four Application Ecosystem Roles */}
      <RoleEcosystem onNavigate={onNavigate} />

      {/* 5. Hackathon Impact Telemetry (Explicitly labeled demo metrics) */}
      <section id="impact-stats" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-forest" />
              <h2 className="text-2xl font-extrabold text-forest tracking-tight">
                Hackathon Impact Telemetry
              </h2>
            </div>
            <p className="text-xs text-charcoal/70 mt-1">
              Live seed metrics comparing dedicated delivery trips against commuter-shared rescue journeys.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F7F0E3] text-charcoal/80 text-xs font-semibold border border-[#E8DFD1]">
            <AlertCircle className="w-3.5 h-3.5 text-forest" />
            Verified Hackathon Demo Data
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="p-5 bg-white border border-[#E8DFD1] space-y-1">
            <span className="text-xs font-semibold text-charcoal/60 block">Surplus Rescued</span>
            <span className="text-2xl sm:text-3xl font-black text-forest tabular-nums block">
              {SEED_METRICS.totalRescuedKg.toLocaleString()} kg
            </span>
            <span className="text-[11px] text-charcoal/70">Across artisan hubs</span>
          </Card>

          <Card className="p-5 bg-white border border-[#E8DFD1] space-y-1">
            <span className="text-xs font-semibold text-charcoal/60 block">Meals Preserved</span>
            <span className="text-2xl sm:text-3xl font-black text-forest tabular-nums block">
              {SEED_METRICS.mealsProvided.toLocaleString()}
            </span>
            <span className="text-[11px] text-charcoal/70">Delivered to shelters</span>
          </Card>

          <Card className="p-5 bg-white border border-[#E8DFD1] space-y-1">
            <span className="text-xs font-semibold text-charcoal/60 block">CO2 Diverted</span>
            <span className="text-2xl sm:text-3xl font-black text-[#2D6A4F] tabular-nums block">
              {SEED_METRICS.co2EmissionsSavedKg.toLocaleString()} kg
            </span>
            <span className="text-[11px] text-charcoal/70">From landfill diversion</span>
          </Card>

          <Card className="p-5 bg-white border border-[#E8DFD1] space-y-1">
            <span className="text-xs font-semibold text-charcoal/60 block">Commute Km Shared</span>
            <span className="text-2xl sm:text-3xl font-black text-forest tabular-nums block">
              {SEED_METRICS.volunteerCommuteKilometersShared.toLocaleString()} km
            </span>
            <span className="text-[11px] text-charcoal/70">Zero extra vehicles</span>
          </Card>

          <Card className="p-5 bg-[#D8F3DC] border border-[#B7E4C7] space-y-1">
            <span className="text-xs font-semibold text-[#2D6A4F]/80 block">Fleet Trips Avoided</span>
            <span className="text-2xl sm:text-3xl font-black text-[#2D6A4F] tabular-nums block">
              {SEED_METRICS.standaloneTripKilometersAvoided.toLocaleString()} km
            </span>
            <span className="text-[11px] text-[#2D6A4F]/90 font-medium">-94% transit footprint</span>
          </Card>
        </div>
      </section>

      {/* 6. Final Call to Action Section */}
      <section className="rounded-3xl bg-[#FFF8ED] border-2 border-forest/30 p-8 sm:p-12 text-center space-y-6 shadow-soft">
        <div className="max-w-2xl mx-auto space-y-3">
          <Badge variant="optimal">Ready for Corridor Matching</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-forest tracking-tight">
            Start Rescuing Food on Your Daily Route
          </h2>
          <p className="text-sm text-charcoal/80 leading-relaxed">
            Whether you are a bakery with evening surplus, a daily commuter with an empty passenger seat, or a shelter feeding community neighbors — join ClusterFeed today.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            onClick={() => onNavigate?.('signup')}
          >
            Create Your Account
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => onNavigate?.('signin')}
          >
            Already a Member? Sign In
          </Button>
        </div>
      </section>
    </div>
  );
}
