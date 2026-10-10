import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Info, 
  Plus, 
  Scale, 
  Thermometer, 
  Building2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import Button from '../common/Button.jsx';
import Badge from '../common/Badge.jsx';
import Card from '../common/Card.jsx';
import { FOOD_CATEGORIES } from '../../data/mockDonations.js';

export default function DonationForm({ currentDonor, onSubmitSuccess, onCancel }) {
  const [selectedCategory, setSelectedCategory] = useState(FOOD_CATEGORIES[0].id);
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [quantityMeals, setQuantityMeals] = useState(15);
  const [storageCondition, setStorageCondition] = useState(FOOD_CATEGORIES[0].storageOptions[0]);
  
  // Default pickup ready time: now; safe deadline: 3 hours from now
  const now = new Date();
  const defaultReady = new Date(now.getTime() + 10 * 60000).toISOString().slice(0, 16);
  const defaultDeadline = new Date(now.getTime() + 190 * 60000).toISOString().slice(0, 16);

  const [readyAt, setReadyAt] = useState(defaultReady);
  const [safeDeadline, setSafeDeadline] = useState(defaultDeadline);
  const [specialNotes, setSpecialNotes] = useState('');
  
  const [address, setAddress] = useState(currentDonor?.address || '142 Market Street, Downtown');
  const [accessNotes, setAccessNotes] = useState(currentDonor?.accessNotes || 'Loading bay in back');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeCategoryObj = FOOD_CATEGORIES.find((c) => c.id === selectedCategory) || FOOD_CATEGORIES[0];

  // Calculate estimated cargo weight based on category portion weight
  const estimatedWeightKg = ((quantityMeals * activeCategoryObj.typicalPortionWeightGrams) / 1000).toFixed(1);

  // Compute safe window duration in hours / minutes
  const readyDate = new Date(readyAt);
  const deadlineDate = new Date(safeDeadline);
  const windowMinutes = Math.round((deadlineDate.getTime() - readyDate.getTime()) / 60000);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    const cat = FOOD_CATEGORIES.find((c) => c.id === catId);
    if (cat && cat.storageOptions.length > 0) {
      setStorageCondition(cat.storageOptions[0]);
    }
  };

  const validate = () => {
    const errs = {};
    if (!foodName.trim()) {
      errs.foodName = 'Food description or title is required.';
    }
    if (!quantityMeals || Number(quantityMeals) <= 0) {
      errs.quantityMeals = 'Please enter a valid meal portion count (minimum 1).';
    }
    if (!readyAt) {
      errs.readyAt = 'Pickup ready time is required.';
    }
    if (!safeDeadline) {
      errs.safeDeadline = 'Safe consumption deadline is required.';
    } else if (deadlineDate.getTime() <= readyDate.getTime()) {
      errs.safeDeadline = 'Safe deadline must be strictly after the pickup ready time.';
    } else if (windowMinutes < 30) {
      errs.safeDeadline = `Safe window (${windowMinutes} min) is too short. Minimum 30 minutes required for pickup and delivery.`;
    }
    if (!address.trim()) {
      errs.address = 'Pickup address is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const newDonation = {
      donorId: currentDonor?.id || 'donor-demo',
      donorName: currentDonor?.name || 'Partner Food Facility',
      donorType: currentDonor?.type || 'restaurant',
      foodCategory: selectedCategory,
      foodName: foodName.trim(),
      description: description.trim(),
      quantityMeals: parseInt(quantityMeals, 10),
      weightKg: parseFloat(estimatedWeightKg),
      storageCondition,
      preparedAt: new Date(now.getTime() - 45 * 60000).toISOString(),
      readyAt: new Date(readyAt).toISOString(),
      safeDeadline: new Date(safeDeadline).toISOString(),
      location: {
        address: address.trim(),
        lat: currentDonor?.lat || 13.0827,
        lng: currentDonor?.lng || 80.2707,
        accessNotes: accessNotes.trim(),
      },
      serviceDurationMinutes: 8,
      specialNotes: specialNotes.trim(),
      sourceType: 'demo',
    };

    try {
      await onSubmitSuccess(newDonation);
    } catch (err) {
      setErrors({ submit: err.message || 'Submission failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card elevated className="p-6 sm:p-8 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E8DFD1]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-forest animate-pulse" />
            <h2 className="text-xl sm:text-2xl font-black text-forest tracking-tight">
              Post Surplus Food Listing
            </h2>
            <Badge variant="optimal">60s Quick Post</Badge>
          </div>
          <p className="text-xs text-charcoal/70 mt-1">
            Publish surplus batches for algorithmic corridor clustering. Food safety constraints are verified before volunteer assignment.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8ED] border border-[#E8DFD1] text-xs text-forest font-semibold self-start sm:self-auto">
          <Building2 className="w-3.5 h-3.5 text-forest" />
          {currentDonor?.name || 'Active Food Donor'}
        </div>
      </div>

      {/* Demo Notice */}
      <div className="bg-[#FFF8ED] border-l-4 border-forest p-4 rounded-xl flex items-start gap-3">
        <Info className="w-5 h-5 text-forest shrink-0 mt-0.5" />
        <div className="text-xs text-charcoal/80 space-y-0.5">
          <p className="font-bold text-forest">Hackfest Prototype Note</p>
          <p>
            Listings created here are stored in your local browser sandbox and will appear immediately in the donation list and clustering engine. Production builds will post to the Node.js / MongoDB API with authoritative server-side safety gating.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Selector */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
            1. Select Food Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {FOOD_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[90px] ${
                    isSelected
                      ? 'border-forest bg-forest text-cream shadow-soft ring-2 ring-forest/30'
                      : 'border-[#E8DFD1] bg-white text-charcoal hover:bg-forest-50'
                  }`}
                >
                  <span className="font-bold text-xs">{cat.label}</span>
                  <span className={`text-[10px] mt-1 ${isSelected ? 'text-mint' : 'text-charcoal/60'}`}>
                    Safe limit: ~{cat.defaultSafeHours}h
                  </span>
                </button>
              );
            })}
          </div>
          {/* Active Category Safety Rule Callout */}
          <div className="bg-white p-3 rounded-xl border border-[#E8DFD1] text-xs flex items-center gap-2 text-charcoal/80">
            <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
            <span>
              <strong className="text-forest">HACCP Guideline:</strong> {activeCategoryObj.safetyGuideline}
            </span>
          </div>
        </div>

        {/* Food Title & Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
              Food Title / Menu Item *
            </label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="e.g. Fresh Vegetable Biryani & Dal"
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest ${
                errors.foodName ? 'border-[#BA1A1A] ring-1 ring-[#BA1A1A]' : 'border-[#E8DFD1]'
              }`}
            />
            {errors.foodName && (
              <p className="text-[11px] text-[#BA1A1A] font-medium flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.foodName}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
              Storage Condition *
            </label>
            <select
              value={storageCondition}
              onChange={(e) => setStorageCondition(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest"
            >
              {activeCategoryObj.storageOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Portion Count & Cargo Weight Calculator */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-[#FFF8ED] border border-[#E8DFD1]">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
              Portions / Meals *
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="500"
                value={quantityMeals}
                onChange={(e) => setQuantityMeals(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm font-bold text-forest focus:outline-none focus:ring-2 focus:ring-forest ${
                  errors.quantityMeals ? 'border-[#BA1A1A]' : 'border-[#E8DFD1]'
                }`}
              />
              <span className="absolute right-3 top-2.5 text-xs text-charcoal/60 font-semibold pointer-events-none">
                meals
              </span>
            </div>
            {errors.quantityMeals && (
              <p className="text-[11px] text-[#BA1A1A]">{errors.quantityMeals}</p>
            )}
          </div>

          <div className="space-y-1">
            <span className="block text-xs font-bold uppercase tracking-wider text-charcoal/60">
              Estimated Weight
            </span>
            <div className="flex items-center gap-2 pt-1.5">
              <Scale className="w-5 h-5 text-forest" />
              <span className="text-xl font-black text-forest tabular-nums">
                ~{estimatedWeightKg} kg
              </span>
            </div>
            <span className="text-[10px] text-charcoal/60 block">
              Based on {activeCategoryObj.typicalPortionWeightGrams}g average serving
            </span>
          </div>

          <div className="space-y-1">
            <span className="block text-xs font-bold uppercase tracking-wider text-charcoal/60">
              Cluster Contribution
            </span>
            <div className="pt-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint/50 text-[#154336] text-xs font-bold">
                {quantityMeals >= 20 ? 'Eligible for Solo Corridor' : `${quantityMeals}/20 Towards Minimum`}
              </span>
            </div>
            <span className="text-[10px] text-charcoal/60 block mt-1">
              Minimum dispatch threshold: 20 meals
            </span>
          </div>
        </div>

        {/* Food Safety Timestamps & Safe Window Visualizer */}
        <div className="space-y-3 p-4 rounded-2xl bg-white border border-[#E8DFD1]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal/80 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-forest" />
              2. Food Safety Time Window
            </span>
            {windowMinutes > 0 && (
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  windowMinutes >= 60
                    ? 'bg-[#D8F3DC] text-[#2D6A4F]'
                    : windowMinutes >= 30
                    ? 'bg-[#FDE8CD] text-[#9A5800]'
                    : 'bg-[#FEE2E2] text-[#991B1B]'
                }`}
              >
                Safe Window: {Math.floor(windowMinutes / 60)}h {windowMinutes % 60}m
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-charcoal/70">
                Ready for Pickup Time *
              </label>
              <input
                type="datetime-local"
                value={readyAt}
                onChange={(e) => setReadyAt(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-[#E8DFD1] text-xs focus:outline-none focus:ring-2 focus:ring-forest bg-white"
              />
              <span className="text-[10px] text-charcoal/60">
                Earliest time volunteer can collect
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-charcoal/70">
                Safe Consumption Deadline (Hard Expiry) *
              </label>
              <input
                type="datetime-local"
                value={safeDeadline}
                onChange={(e) => setSafeDeadline(e.target.value)}
                className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-forest bg-white ${
                  errors.safeDeadline ? 'border-[#BA1A1A]' : 'border-[#E8DFD1]'
                }`}
              />
              <span className="text-[10px] text-charcoal/60">
                Food must reach receiver before this deadline
              </span>
              {errors.safeDeadline && (
                <p className="text-[11px] text-[#BA1A1A] font-medium">{errors.safeDeadline}</p>
              )}
            </div>
          </div>
        </div>

        {/* Location & Loading Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-forest" />
              Pickup Address *
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full address for driver navigation"
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest ${
                errors.address ? 'border-[#BA1A1A]' : 'border-[#E8DFD1]'
              }`}
            />
            {errors.address && (
              <p className="text-[11px] text-[#BA1A1A]">{errors.address}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
              Access & Handover Instructions
            </label>
            <input
              type="text"
              value={accessNotes}
              onChange={(e) => setAccessNotes(e.target.value)}
              placeholder="e.g. Back door loading dock, call 98401..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DFD1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-end gap-3 border-t border-[#E8DFD1]">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={Sparkles}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Validating & Publishing...' : 'Post Surplus Batch (Publish)'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
