import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Truck, 
  Scale, 
  Phone, 
  Info,
  Calendar,
  AlertCircle
} from 'lucide-react';
import Button from '../common/Button.jsx';
import Badge from '../common/Badge.jsx';

export default function DonationDetailModal({ donation, onClose, onCancelConfirm }) {
  const [cancelPromptOpen, setCancelPromptOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);

  if (!donation) return null;

  const now = new Date();
  const prepDate = new Date(donation.preparedAt);
  const readyDate = new Date(donation.readyAt);
  const deadlineDate = new Date(donation.safeDeadline);

  const windowMinutes = Math.round((deadlineDate.getTime() - readyDate.getTime()) / 60000);
  const remainingMinutes = Math.round((deadlineDate.getTime() - now.getTime()) / 60000);
  const isExpired = remainingMinutes <= 0;

  const formatTimestamp = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (' + date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ')';
  };

  const handleCancelSubmit = async () => {
    setIsCancelling(true);
    try {
      await onCancelConfirm(donation.id, cancelReason);
      setCancelPromptOpen(false);
      onClose();
    } catch (err) {
      alert(err.message || 'Failed to cancel donation.');
    } finally {
      setIsCancelling(false);
    }
  };

  const canCancel = donation.status === 'eligible' || donation.status === 'pending';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E8DFD1] shadow-elevated flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#E8DFD1] flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-forest animate-pulse" />
            <span className="font-extrabold text-forest text-sm tracking-tight uppercase">
              Donation Safety Dossier • ID #{donation.id}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-forest-50 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Main Title & Status */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal/60 block">
                Food Surplus Listing
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-forest">
                {donation.foodName}
              </h2>
              <div className="flex items-center gap-2 text-xs text-charcoal/70 mt-1">
                <Building2 className="w-3.5 h-3.5 text-forest" />
                <span className="font-semibold text-charcoal">{donation.donorName}</span>
                <span className="text-charcoal/40">•</span>
                <span className="capitalize">{donation.donorType.replace('_', ' ')}</span>
              </div>
            </div>

            <div>
              {donation.status === 'eligible' && (
                <Badge variant="optimal" dot>
                  Corridor Eligible
                </Badge>
              )}
              {donation.status === 'clustered' && (
                <Badge variant="default" icon={Truck}>
                  Assigned to Cluster
                </Badge>
              )}
              {donation.status === 'delivered' && (
                <Badge variant="optimal" icon={CheckCircle2}>
                  Delivered
                </Badge>
              )}
              {donation.status === 'excluded' && (
                <Badge variant="critical" icon={AlertTriangle}>
                  Excluded from Dispatch
                </Badge>
              )}
              {donation.status === 'cancelled' && (
                <Badge variant="warning">
                  Cancelled
                </Badge>
              )}
            </div>
          </div>

          {/* Exclusion Notice if Excluded */}
          {donation.status === 'excluded' && (
            <div className="p-4 rounded-2xl bg-[#FEE2E2] border border-[#FCA5A5] space-y-2">
              <div className="flex items-center gap-2 text-[#991B1B] font-bold text-xs">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                Dispatch Infeasibility Audit
              </div>
              <p className="text-xs text-[#991B1B] leading-relaxed">
                {donation.exclusionReason || 'Excluded due to food-safety window or route constraints.'}
              </p>
              <div className="text-[11px] text-[#991B1B]/80 pt-1 border-t border-[#FCA5A5]/60">
                Rule: ClusterFeed never forces an infeasible donation into a trip. Excluded items do not count toward the 20-meal viable cluster threshold.
              </div>
            </div>
          )}

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#FFF8ED] border border-[#E8DFD1]">
              <span className="text-[10px] font-bold uppercase text-charcoal/50 block">Meal Count</span>
              <span className="text-lg font-black text-forest tabular-nums block">
                {donation.quantityMeals}
              </span>
              <span className="text-[10px] text-charcoal/60">Portions</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFF8ED] border border-[#E8DFD1]">
              <span className="text-[10px] font-bold uppercase text-charcoal/50 block">Cargo Weight</span>
              <span className="text-lg font-black text-forest tabular-nums block">
                {donation.weightKg} kg
              </span>
              <span className="text-[10px] text-charcoal/60">Estimated</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFF8ED] border border-[#E8DFD1]">
              <span className="text-[10px] font-bold uppercase text-charcoal/50 block">Storage</span>
              <span className="text-xs font-bold text-charcoal block truncate mt-1" title={donation.storageCondition}>
                {donation.storageCondition}
              </span>
              <span className="text-[10px] text-charcoal/60">HACCP verified</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FFF8ED] border border-[#E8DFD1]">
              <span className="text-[10px] font-bold uppercase text-charcoal/50 block">Remaining</span>
              <span className={`text-base font-black tabular-nums block mt-0.5 ${isExpired ? 'text-[#BA1A1A]' : 'text-forest'}`}>
                {isExpired ? 'Expired' : `${remainingMinutes}m`}
              </span>
              <span className="text-[10px] text-charcoal/60">Before deadline</span>
            </div>
          </div>

          {/* Food Safety Timeline */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8DFD1] space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-forest flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-forest" />
              Food Safety & Service Timeline
            </span>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8DFD1]">
              {/* Prepared */}
              <div className="relative">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-forest/40" />
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-charcoal">Batch Prepared:</span>
                  <span className="text-charcoal/70">{formatTimestamp(prepDate)}</span>
                </div>
              </div>

              {/* Ready */}
              <div className="relative">
                <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-mint-500" />
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-charcoal">Ready for Pickup:</span>
                  <span className="text-forest font-semibold">{formatTimestamp(readyDate)}</span>
                </div>
              </div>

              {/* Safe Deadline */}
              <div className="relative">
                <span className={`absolute -left-6 top-1 w-2.5 h-2.5 rounded-full ${isExpired ? 'bg-[#BA1A1A]' : 'bg-forest'}`} />
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#BA1A1A]">Safe Consumption Deadline:</span>
                  <span className="text-[#BA1A1A] font-bold">{formatTimestamp(deadlineDate)}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E8DFD1] flex items-center justify-between text-xs text-charcoal/70">
              <span>Allowable Safe Distribution Window:</span>
              <span className="font-bold text-forest">
                {Math.floor(windowMinutes / 60)}h {windowMinutes % 60}m
              </span>
            </div>
          </div>

          {/* Description & Special Notes */}
          {donation.description && (
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60">
                Menu & Packaging Description
              </span>
              <p className="text-xs text-charcoal/80 leading-relaxed bg-[#FFF8ED] p-3 rounded-xl border border-[#E8DFD1]">
                {donation.description}
              </p>
            </div>
          )}

          {/* Location & Handover Coordinates */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8DFD1] space-y-2 text-xs">
            <span className="font-bold uppercase tracking-wider text-forest flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-forest" />
              Pickup Location & Access
            </span>
            <p className="font-semibold text-charcoal">{donation.location.address}</p>
            {donation.location.accessNotes && (
              <p className="text-charcoal/70 text-[11px]">
                <strong className="text-forest">Dock Notes:</strong> {donation.location.accessNotes}
              </p>
            )}
            <div className="flex items-center gap-4 text-charcoal/60 text-[11px] pt-1">
              <span>Lat: {donation.location.lat}</span>
              <span>Lng: {donation.location.lng}</span>
              <span>Est. Service Stop: {donation.serviceDurationMinutes || 8} mins</span>
            </div>
          </div>

          {/* Cancel Section if Pending Cancellation */}
          {cancelPromptOpen && (
            <div className="p-4 rounded-2xl bg-[#FFF8ED] border border-[#E8DFD1] space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-[#BA1A1A]">
                <AlertCircle className="w-4 h-4" />
                Confirm Listing Cancellation
              </div>
              <p className="text-xs text-charcoal/70">
                Are you sure you want to cancel this donation? This will immediately remove it from corridor clustering.
              </p>
              <input
                type="text"
                placeholder="Reason for cancellation (optional)"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DFD1] text-xs bg-white focus:outline-none focus:ring-2 focus:ring-forest"
              />
              <div className="flex items-center justify-end gap-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCancelPromptOpen(false)}
                  disabled={isCancelling}
                >
                  Keep Active
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleCancelSubmit}
                  disabled={isCancelling}
                >
                  {isCancelling ? 'Cancelling...' : 'Confirm Cancellation'}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-[#E8DFD1] flex items-center justify-between gap-3">
          {canCancel && !cancelPromptOpen ? (
            <Button
              variant="outline"
              size="sm"
              className="text-[#BA1A1A] hover:bg-[#FEE2E2] hover:text-[#BA1A1A] border-[#FCA5A5]"
              onClick={() => setCancelPromptOpen(true)}
            >
              Cancel Donation
            </Button>
          ) : (
            <span className="text-xs text-charcoal/50">
              Status: <strong className="capitalize">{donation.status}</strong>
            </span>
          )}

          <Button variant="primary" size="sm" onClick={onClose}>
            Close Dossier
          </Button>
        </div>
      </div>
    </div>
  );
}
