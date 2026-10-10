import React from 'react';
import { Store, Layers, Car, ShieldCheck, ArrowRight, Clock, QrCode } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Donate in 60 Seconds',
      role: 'Donors & Cafes',
      desc: 'Bakeries, eateries, and campus messes list trays with safety deadlines and storage temps (ambient or chilled).',
      icon: Store,
      badge: 'Rapid Listing',
      badgeColor: 'bg-peach/30 text-charcoal border border-peach',
    },
    {
      number: '02',
      title: 'Smart Clustering',
      role: 'ClusterFeed Engine',
      desc: 'Proximate donations within identical delivery radiuses are algorithmically grouped into dense collection batches.',
      icon: Layers,
      badge: 'Zero Deadheading',
      badgeColor: 'bg-mint/40 text-forest border border-mint',
    },
    {
      number: '03',
      title: 'Commute Collect',
      role: 'Volunteers on Route',
      desc: 'Everyday commuters heading past the donors receive a micro-detour alert (< 4 mins added) and accept the pickup.',
      icon: Car,
      badge: '< 1.5 km Detour',
      badgeColor: 'bg-[#D8F3DC] text-[#2D6A4F] border border-[#B7E4C7]',
    },
    {
      number: '04',
      title: 'Safe Verified Delivery',
      role: 'Shelters & Buyers',
      desc: 'Meals arrive fresh at verified community shelters or reserved by discount buyers, validated with a 4-digit OTP handshake.',
      icon: ShieldCheck,
      badge: 'OTP Verified',
      badgeColor: 'bg-pink-50 text-[#653A47] border border-pink-pastel',
    },
  ];

  return (
    <section id="how-it-works" className="py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-forest/70">
          Four-Stage Rescue Lifecycle
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-forest tracking-tight">
          How ClusterFeed Closes the Surplus Loop
        </h2>
        <p className="text-sm text-charcoal/70">
          From oven-fresh surplus to verified shelter tables without mobilizing costly delivery fleets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="bg-white rounded-2xl p-6 border border-[#E8DFD1] shadow-soft relative flex flex-col justify-between hover:shadow-lifted hover:border-forest/40 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-forest/10 text-forest flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#FFF8ED] text-forest border border-[#E8DFD1]">
                    {step.number}
                  </span>
                </div>

                <div>
                  <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-2 ${step.badgeColor}`}>
                    {step.badge}
                  </span>
                  <h3 className="text-lg font-bold text-forest">{step.title}</h3>
                  <span className="text-xs font-medium text-charcoal/60 block mb-2">{step.role}</span>
                  <p className="text-xs text-charcoal/75 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E8DFD1]/70 flex items-center justify-between text-[11px] text-forest font-semibold">
                <span>Phase Protocol Compliant</span>
                {idx < 3 && <ArrowRight className="w-3.5 h-3.5 text-forest/40 hidden lg:block" />}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
