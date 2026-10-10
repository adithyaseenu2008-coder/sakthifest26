import React, { useState } from 'react';
import { Store, Car, HeartHandshake, ShoppingBag, CheckCircle2, ArrowRight, ShieldCheck, Clock, Percent } from 'lucide-react';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';
import Badge from '../common/Badge.jsx';

export default function RoleEcosystem({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('donor');

  const roleCards = [
    {
      id: 'donor',
      title: 'Food Donors',
      subtitle: 'Bakeries, Restaurants, Messes & Cafes',
      badge: 'Zero Food Waste',
      badgeClass: 'bg-peach/30 text-charcoal border border-peach',
      icon: Store,
      iconBg: 'bg-peach/30 text-charcoal',
      desc: 'Post daily surplus inventory in under 60 seconds before closing time. Automated certificates and doorstep handovers.',
      benefits: [
        'Automatic 60s SKU surplus listing',
        'Digital tax offset verification receipt',
        'Curbside pickup without dispatch coordination',
        'Preserves brand reputation via verified handlers',
      ],
      buttonText: 'Join as Food Donor',
      simulatorTitle: 'Post excess trays in 60s without leaving the counter',
      simulatorDesc: 'Commercial kitchens flag surplus portions before kitchen clean-down. Nearby commuters passing on routine journeys are instantly matched for collection.',
      simulatorStat: '0% Landfill Target',
      simulatorStatDesc: 'Tax write-off calculated automatically per kilogram rescued.',
    },
    {
      id: 'volunteer',
      title: 'Commuter Volunteers',
      subtitle: 'Everyday Drivers, Bikers & Walkers',
      badge: 'Zero Emission Detours',
      badgeClass: 'bg-mint/40 text-forest border border-mint',
      icon: Car,
      iconBg: 'bg-mint text-forest',
      desc: 'Turn your routine commute into active climate action. Only accept pickups that fall right along your corridor with zero detours.',
      benefits: [
        'Guaranteed sub-1.5 km commute detour (< 5 mins)',
        'Offset personal travel emissions with verified carbon stats',
        'Contactless 4-digit OTP exchange',
        'Flexible schedule: rescue only when traveling',
      ],
      buttonText: 'Sign Up to Deliver',
      simulatorTitle: 'Drive your daily route, rescue dinners along the way',
      simulatorDesc: 'No dedicated fleet shifts or long cross-town runs. The algorithm matches pickups that take you less than 4 minutes off your highway off-ramp.',
      simulatorStat: 'Sub-1.5 km Guarantee',
      simulatorStatDesc: 'Trips exceeding your detour threshold are filtered out automatically.',
    },
    {
      id: 'ngo',
      title: 'Shelters & NGOs',
      subtitle: 'Community Kitchens & Care Centers',
      badge: 'Verified Intake',
      badgeClass: 'bg-pink-50 text-[#653A47] border border-pink-pastel',
      icon: HeartHandshake,
      iconBg: 'bg-pink-pastel text-[#532B37]',
      desc: 'Scheduled batch deliveries directly to your intake door with HACCP hygiene certification, storage temp, and allergen logs.',
      benefits: [
        'Automated intake kitchen inventory forecasts',
        'Audited temperature and freshness countdown logs',
        'Zero platform, delivery, or logistics fees',
        'Verified donors compliant with safety standards',
      ],
      buttonText: 'Verify Shelter Hub',
      simulatorTitle: 'Scheduled batch arrivals with cold-chain logs',
      simulatorDesc: 'Receive nutritious pre-sorted catering trays directly at your loading door with clear allergen tags and expiration timestamps.',
      simulatorStat: '100% Free Kitchen Supplies',
      simulatorStatDesc: 'Priority morning and evening allocations for registered non-profits.',
    },
    {
      id: 'buyer',
      title: 'Surplus Buyers',
      subtitle: 'Students & Budget-Conscious Neighbors',
      badge: 'Save up to 70%',
      badgeClass: 'bg-[#D8F3DC] text-[#2D6A4F] border border-[#B7E4C7]',
      icon: ShoppingBag,
      iconBg: 'bg-[#C6EBD9] text-forest',
      desc: 'Access restaurant-quality bakery boxes, hostel bulk entrees, and gourmet pantry goods at deep discounts before daily cutoffs.',
      benefits: [
        'Up to 70% off retail prices on fresh culinary boxes',
        'Real-time radar alerts for surplus within walking distance',
        'Contactless tap-and-go pickup',
        'Directly prevents quality food from landfill disposal',
      ],
      buttonText: 'Explore Discount Surplus',
      simulatorTitle: 'Rescue gourmet cafe bites at up to 70% off',
      simulatorDesc: 'Support local neighborhood businesses while dining sustainably. Grab surprise bakery bags and chef meals on your walk home.',
      simulatorStat: 'Save up to $240 Monthly',
      simulatorStatDesc: 'Instant reservation with flexible evening collection windows.',
    },
  ];

  const activeRoleData = roleCards.find((r) => r.id === activeTab) || roleCards[0];

  return (
    <section id="ecosystem-roles" className="py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-forest/70">
            A Symbiotic Food Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest tracking-tight mt-1">
            Who ClusterFeed Connects
          </h2>
          <p className="text-sm text-charcoal/70 max-w-xl">
            A frictionless platform uniting food creators, everyday drivers, non-profits, and budget-conscious neighbors into one seamless recovery loop.
          </p>
        </div>
        <Badge variant="pink" icon={ShieldCheck}>
          Zero-Commission Non-Profit Tier
        </Badge>
      </div>

      {/* 4 Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {roleCards.map((role) => {
          const Icon = role.icon;
          return (
            <div
              key={role.id}
              className="bg-white rounded-2xl p-6 border border-[#E8DFD1] shadow-soft hover:shadow-lifted hover:border-forest/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${role.iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${role.badgeClass}`}>
                    {role.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-forest">{role.title}</h3>
                  <span className="text-xs text-charcoal/60 block font-medium mb-2">{role.subtitle}</span>
                  <p className="text-xs text-charcoal/75 leading-relaxed">
                    {role.desc}
                  </p>
                </div>

                {/* Benefits List */}
                <ul className="space-y-2 pt-2 border-t border-[#E8DFD1]/60">
                  {role.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-charcoal/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center group hover:bg-forest hover:text-cream hover:border-forest"
                  onClick={() => onNavigate?.('signup', role.id)}
                >
                  <span>{role.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Role Simulator Box */}
      <Card elevated className="p-6 sm:p-8 bg-[#F7F0E3]/70 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h3 className="text-lg font-bold text-forest">Interactive Role Corridor Preview</h3>
          <p className="text-xs text-charcoal/70">
            See how the platform dynamically adapts its routing tools to your operational perspective:
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto p-1.5 bg-white rounded-full border border-[#E8DFD1] shadow-soft">
          {roleCards.map((r) => {
            const isSelected = activeTab === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveTab(r.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-forest text-cream shadow-soft'
                    : 'text-charcoal/75 hover:text-charcoal hover:bg-forest-50'
                }`}
              >
                {r.title}
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Panel */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFD1] grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-3">
            <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${activeRoleData.badgeClass}`}>
              {activeRoleData.title} Perspective
            </span>
            <h4 className="text-xl font-bold text-forest tracking-tight">
              {activeRoleData.simulatorTitle}
            </h4>
            <p className="text-xs text-charcoal/75 leading-relaxed">
              {activeRoleData.simulatorDesc}
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                size="sm"
                icon={ArrowRight}
                onClick={() => onNavigate?.('signup', activeRoleData.id)}
              >
                Register as {activeRoleData.title}
              </Button>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#FFF8ED] border border-[#E8DFD1] space-y-2 text-center md:text-left">
            <span className="block text-xs font-semibold text-charcoal/60 uppercase">Ecosystem Metric</span>
            <span className="text-lg font-black text-forest block">
              {activeRoleData.simulatorStat}
            </span>
            <p className="text-xs text-charcoal/70">
              {activeRoleData.simulatorStatDesc}
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}
