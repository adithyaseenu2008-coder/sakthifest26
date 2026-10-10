import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  RefreshCw, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  Package, 
  SlidersHorizontal,
  Info
} from 'lucide-react';
import Button from '../common/Button.jsx';
import Badge from '../common/Badge.jsx';
import Card from '../common/Card.jsx';
import DonationCard from './DonationCard.jsx';
import DonationDetailModal from './DonationDetailModal.jsx';
import { donationService } from '../../services/donationService.js';
import { FOOD_CATEGORIES } from '../../data/mockDonations.js';

export default function DonationList({ onOpenCreateForm, selectedDonorId }) {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState('urgency'); // 'urgency' | 'meals' | 'newest'

  // Modal State
  const [activeDonation, setActiveDonation] = useState(null);

  const fetchDonations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await donationService.getDonations({
        donorId: selectedDonorId,
        category,
        status,
        search,
        sortBy: sortBy === 'urgency' ? 'deadline' : sortBy,
      });
      setDonations(data);
    } catch (err) {
      setError(err.message || 'Failed to load donations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [category, status, sortBy, selectedDonorId]);

  // Debounced or on-submit search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDonations();
  };

  const handleCancelDonation = async (donationId, reason) => {
    try {
      await donationService.cancelDonation(donationId, reason);
      await fetchDonations();
      if (activeDonation && activeDonation.id === donationId) {
        setActiveDonation(null);
      }
    } catch (err) {
      alert(err.message || 'Could not cancel donation.');
    }
  };

  const handleResetData = async () => {
    if (confirm('Reset demo donations back to initial seed state?')) {
      await donationService.resetDemoData();
      fetchDonations();
    }
  };

  // Compute live summary telemetry
  const totalMeals = donations.reduce((sum, d) => sum + (d.status !== 'cancelled' ? d.quantityMeals : 0), 0);
  const eligibleMeals = donations
    .filter((d) => d.status === 'eligible')
    .reduce((sum, d) => sum + d.quantityMeals, 0);
  const excludedCount = donations.filter((d) => d.status === 'excluded').length;

  return (
    <div className="space-y-6">
      {/* Telemetry & Quick Action Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-white border border-[#E8DFD1] space-y-1">
          <span className="text-[11px] font-bold text-charcoal/60 uppercase">Surplus Portions</span>
          <span className="text-2xl font-black text-forest tabular-nums block">
            {totalMeals}
          </span>
          <span className="text-[11px] text-charcoal/70">Across listed batches</span>
        </Card>

        <Card className="p-4 bg-[#D8F3DC] border border-[#B7E4C7] space-y-1">
          <span className="text-[11px] font-bold text-[#2D6A4F] uppercase">Corridor Eligible</span>
          <span className="text-2xl font-black text-[#2D6A4F] tabular-nums block">
            {eligibleMeals} meals
          </span>
          <span className="text-[11px] text-[#2D6A4F]/80">Ready for 20-meal cluster</span>
        </Card>

        <Card className="p-4 bg-white border border-[#E8DFD1] space-y-1">
          <span className="text-[11px] font-bold text-charcoal/60 uppercase">Active Batches</span>
          <span className="text-2xl font-black text-forest tabular-nums block">
            {donations.filter((d) => d.status === 'eligible' || d.status === 'clustered').length}
          </span>
          <span className="text-[11px] text-charcoal/70">Live in corridor pool</span>
        </Card>

        <Card className="p-4 bg-white border border-[#E8DFD1] space-y-1">
          <span className="text-[11px] font-bold text-charcoal/60 uppercase">Safety Excluded</span>
          <span className="text-2xl font-black text-[#991B1B] tabular-nums block">
            {excludedCount}
          </span>
          <span className="text-[11px] text-charcoal/70">Filtered before dispatch</span>
        </Card>
      </div>

      {/* Filter and Search Toolbar */}
      <Card elevated className="p-4 sm:p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search by food name, donor, or area..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-24 py-2 rounded-xl border border-[#E8DFD1] text-xs bg-white focus:outline-none focus:ring-2 focus:ring-forest"
            />
            <Search className="w-4 h-4 text-charcoal/40 absolute left-3 top-2.5" />
            <button
              type="submit"
              className="absolute right-1.5 top-1 px-3 py-1 rounded-lg bg-forest text-cream text-[11px] font-semibold hover:bg-forest-700"
            >
              Search
            </button>
          </form>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              icon={RefreshCw}
              onClick={handleResetData}
              title="Reset mock donations back to seed state"
            >
              Reset Demo
            </Button>

            {onOpenCreateForm && (
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={onOpenCreateForm}
              >
                Post New Surplus
              </Button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="pt-3 border-t border-[#E8DFD1] flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-bold text-charcoal/60 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Category:
            </span>
            <button
              onClick={() => setCategory('all')}
              className={`px-3 py-1 rounded-full font-semibold transition-all ${
                category === 'all'
                  ? 'bg-forest text-cream'
                  : 'bg-white text-charcoal/70 hover:bg-forest-50 border border-[#E8DFD1]'
              }`}
            >
              All
            </button>
            {FOOD_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  category === cat.id
                    ? 'bg-forest text-cream'
                    : 'bg-white text-charcoal/70 hover:bg-forest-50 border border-[#E8DFD1]'
                }`}
              >
                {cat.label.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Sort & Status Selectors */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="font-bold text-charcoal/60">Status:</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-2 py-1 rounded-lg border border-[#E8DFD1] bg-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-forest"
              >
                <option value="all">All Statuses</option>
                <option value="eligible">Eligible Only</option>
                <option value="clustered">In Cluster</option>
                <option value="delivered">Delivered</option>
                <option value="excluded">Safety Excluded</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
              <span className="font-bold text-charcoal/60 flex items-center gap-0.5">
                <ArrowUpDown className="w-3 h-3" />
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 py-1 rounded-lg border border-[#E8DFD1] bg-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-forest"
              >
                <option value="urgency">Safe Window (Urgent First)</option>
                <option value="meals">Meal Quantity (High to Low)</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-5 space-y-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-16 bg-gray-100 rounded" />
              <div className="h-8 bg-gray-200 rounded w-full" />
            </Card>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <Card className="p-8 text-center space-y-3 bg-[#FFF8ED] border-2 border-[#BA1A1A]/30">
          <AlertCircle className="w-10 h-10 text-[#BA1A1A] mx-auto" />
          <h3 className="font-bold text-base text-[#BA1A1A]">Unable to Load Donations</h3>
          <p className="text-xs text-charcoal/70 max-w-md mx-auto">{error}</p>
          <Button variant="primary" size="sm" onClick={fetchDonations}>
            Retry Loading
          </Button>
        </Card>
      )}

      {/* Empty State */}
      {!loading && !error && donations.length === 0 && (
        <Card className="p-10 text-center space-y-4 bg-white border border-[#E8DFD1]">
          <Package className="w-12 h-12 text-forest/40 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-extrabold text-lg text-forest">No Surplus Listings Found</h3>
            <p className="text-xs text-charcoal/60 max-w-sm mx-auto">
              No food surplus batches match your current search or category filter.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearch('');
                setCategory('all');
                setStatus('all');
              }}
            >
              Clear Filters
            </Button>
            {onOpenCreateForm && (
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={onOpenCreateForm}
              >
                Post New Surplus
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Card Grid */}
      {!loading && !error && donations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {donations.map((donation) => (
            <DonationCard
              key={donation.id}
              donation={donation}
              onInspect={(d) => setActiveDonation(d)}
              onCancel={(d) => setActiveDonation(d)}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {activeDonation && (
        <DonationDetailModal
          donation={activeDonation}
          onClose={() => setActiveDonation(null)}
          onCancelConfirm={handleCancelDonation}
        />
      )}
    </div>
  );
}
