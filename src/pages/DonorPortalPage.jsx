import React, { useState } from 'react';
import { 
  Store, 
  Plus, 
  ListOrdered, 
  Building2, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Route, 
  Layers,
  ArrowRight
} from 'lucide-react';
import Button from '../components/common/Button.jsx';
import Badge from '../components/common/Badge.jsx';
import Card from '../components/common/Card.jsx';
import DonationList from '../components/donation/DonationList.jsx';
import DonationForm from '../components/donation/DonationForm.jsx';
import { DEMO_DONORS } from '../data/mockDonations.js';
import { donationService } from '../services/donationService.js';

export default function DonorPortalPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'create'
  const [selectedDonorId, setSelectedDonorId] = useState(DEMO_DONORS[0].id);
  const [successToast, setSuccessToast] = useState(null);

  const currentDonor = DEMO_DONORS.find((d) => d.id === selectedDonorId) || DEMO_DONORS[0];

  const handleFormSubmit = async (formData) => {
    const created = await donationService.createDonation(formData);
    setSuccessToast({
      title: 'Surplus Batch Published Successfully!',
      message: `${created.foodName} (${created.quantityMeals} meals) has been published to the corridor pool.`,
      status: created.status,
    });
    setActiveTab('list');

    // Auto-dismiss toast
    setTimeout(() => {
      setSuccessToast(null);
    }, 6000);
  };

  return (
    <div className="space-y-8 py-6">
      {/* 1. Header & Donor Facility Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-4 border-b border-[#E8DFD1]">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peach/30 text-charcoal border border-peach font-bold text-xs uppercase tracking-wider">
              <Store className="w-3.5 h-3.5" />
              Donor Management Console • Laptop 2
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-forest text-cream text-xs font-semibold">
              Phase 1 Live
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-forest tracking-tight">
            Commercial Surplus & Kitchen Intake
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/75 max-w-2xl leading-relaxed">
            Bakeries, messes, and commercial kitchens list verified surplus portions for zero-deadhead corridor clustering.
          </p>
        </div>

        {/* Facility Profile Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-2xl bg-white border border-[#E8DFD1] shadow-soft">
          <div className="flex items-center gap-2 text-xs font-bold text-charcoal/70">
            <Building2 className="w-4 h-4 text-forest" />
            <span>Active Donor Facility:</span>
          </div>
          <select
            value={selectedDonorId}
            onChange={(e) => setSelectedDonorId(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-[#E8DFD1] bg-[#FFF8ED] text-xs font-bold text-forest focus:outline-none focus:ring-2 focus:ring-forest"
          >
            {DEMO_DONORS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.type.replace('_', ' ')})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Hackathon Prototype & Safety Gating Banner */}
      <div className="bg-[#FFF8ED] rounded-2xl p-4 border border-[#E8DFD1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-forest/10 flex items-center justify-center shrink-0 text-forest mt-0.5">
            <ShieldCheck className="w-5 h-5 text-forest" />
          </div>
          <div className="space-y-0.5 text-xs text-charcoal/80">
            <p className="font-bold text-forest">
              Mandatory Dispatch Rule: 20 Eligible Meals Minimum
            </p>
            <p className="text-[11px] text-charcoal/70 leading-relaxed">
              Clusters are formed only when proximate eligible batches total 20+ meals. Infeasible donations with elapsed safe windows or broken cold chains are automatically excluded and do not count toward this threshold.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-[#E8DFD1] text-charcoal/70 font-semibold">
            Storage: Local Browser Sandbox
          </span>
        </div>
      </div>

      {/* 3. Success Notification Toast */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-[#D8F3DC] border border-[#B7E4C7] flex items-start justify-between gap-3 text-xs animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] shrink-0" />
            <div>
              <p className="font-bold text-[#2D6A4F]">{successToast.title}</p>
              <p className="text-[#2D6A4F]/80">{successToast.message}</p>
            </div>
          </div>
          <button
            onClick={() => setSuccessToast(null)}
            className="text-[#2D6A4F] font-bold text-xs hover:opacity-75"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* 4. Tab Navigation Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-[#E8DFD1]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-5 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'list'
                ? 'border-forest text-forest bg-white shadow-soft'
                : 'border-transparent text-charcoal/60 hover:text-charcoal hover:bg-white/50'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            Surplus Inventory & Live Batches
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`px-5 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'create'
                ? 'border-forest text-forest bg-white shadow-soft'
                : 'border-transparent text-charcoal/60 hover:text-charcoal hover:bg-white/50'
            }`}
          >
            <Plus className="w-4 h-4" />
            Post New Surplus (60s Form)
          </button>
        </div>
      </div>

      {/* 5. Main Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'list' ? (
          <DonationList
            onOpenCreateForm={() => setActiveTab('create')}
            selectedDonorId={selectedDonorId}
          />
        ) : (
          <DonationForm
            currentDonor={currentDonor}
            onSubmitSuccess={handleFormSubmit}
            onCancel={() => setActiveTab('list')}
          />
        )}
      </div>
    </div>
  );
}
