import React from 'react';
import { 
  Clock, 
  MapPin, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Thermometer, 
  Eye, 
  XCircle,
  Truck,
  Building2
} from 'lucide-react';
import Button from '../common/Button.jsx';
import Badge from '../common/Badge.jsx';
import Card from '../common/Card.jsx';

export default function DonationCard({ donation, onInspect, onCancel }) {
  const now = new Date();
  const deadline = new Date(donation.safeDeadline);
  const diffMinutes = Math.round((deadline.getTime() - now.getTime()) / 60000);
  const isExpired = diffMinutes <= 0;

  // Format category name
  const categoryLabels = {
    cooked_meals: 'Cooked Meals',
    bakery_pastry: 'Bakery & Pastry',
    hostel_mess: 'Hostel Mess Bulk',
    catered_buffet: 'Catered Buffet',
    packaged_dairy: 'Chilled Dairy',
  };

  const getStatusBadge = () => {
    switch (donation.status) {
      case 'eligible':
        return (
          <Badge variant="optimal" dot>
            Corridor Eligible
          </Badge>
        );
      case 'clustered':
        return (
          <Badge variant="default" icon={Truck}>
            In Cluster Corridor
          </Badge>
        );
      case 'delivered':
        return (
          <Badge variant="optimal" icon={CheckCircle2}>
            Delivered to Shelter
          </Badge>
        );
      case 'excluded':
        return (
          <Badge variant="critical" icon={AlertTriangle}>
            Excluded from Dispatch
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="warning" icon={XCircle}>
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="default">{donation.status}</Badge>;
    }
  };

  // Safe window timer rendering
  const getDeadlineIndicator = () => {
    if (donation.status === 'delivered') {
      return (
        <span className="text-xs text-[#2D6A4F] font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Completed Safe Delivery
        </span>
      );
    }
    if (isExpired) {
      return (
        <span className="text-xs text-[#BA1A1A] font-bold flex items-center gap-1">
          <ShieldAlert className="w-3.5 h-3.5" />
          Safe Window Expired ({Math.abs(diffMinutes)}m ago)
        </span>
      );
    }
    if (diffMinutes <= 45) {
      return (
        <span className="text-xs text-[#9A5800] font-bold flex items-center gap-1 animate-pulse">
          <Clock className="w-3.5 h-3.5" />
          Urgent: {diffMinutes}m remaining
        </span>
      );
    }
    const hours = Math.floor(diffMinutes / 60);
    const mins = diffMinutes % 60;
    return (
      <span className="text-xs text-charcoal/70 flex items-center gap-1 font-medium">
        <Clock className="w-3.5 h-3.5 text-forest" />
        Safe for next {hours > 0 ? `${hours}h ${mins}m` : `${mins}m`}
      </span>
    );
  };

  const canCancel = donation.status === 'eligible' || donation.status === 'pending';

  return (
    <Card className="p-5 flex flex-col justify-between hover:border-forest/40 transition-all hover:shadow-lifted group">
      <div className="space-y-3.5">
        {/* Top Badges */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-forest-50 text-forest border border-forest/20">
              {categoryLabels[donation.foodCategory] || donation.foodCategory}
            </span>
            <span className="text-[11px] font-semibold text-charcoal/50">
              ID: {donation.id}
            </span>
          </div>
          {getStatusBadge()}
        </div>

        {/* Title and Donor Info */}
        <div className="space-y-1">
          <h3 className="font-extrabold text-base text-forest group-hover:text-forest-700 transition-colors line-clamp-1">
            {donation.foodName}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-charcoal/75">
            <Building2 className="w-3.5 h-3.5 text-forest shrink-0" />
            <span className="font-semibold text-charcoal">{donation.donorName}</span>
          </div>
        </div>

        {/* Quantity & Storage Metrics */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#FFF8ED] border border-[#E8DFD1]/80 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-charcoal/50 block">Volume</span>
            <span className="font-extrabold text-forest text-sm tabular-nums">
              {donation.quantityMeals} Meals
            </span>
            <span className="text-[11px] text-charcoal/60 block">~{donation.weightKg} kg</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-charcoal/50 block">Storage</span>
            <span className="font-semibold text-charcoal block truncate text-xs" title={donation.storageCondition}>
              {donation.storageCondition}
            </span>
            <span className="text-[10px] text-charcoal/60 block">HACCP monitored</span>
          </div>
        </div>

        {/* Location snippet */}
        <div className="flex items-start gap-1.5 text-xs text-charcoal/70">
          <MapPin className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
          <span className="line-clamp-1">{donation.location.address}</span>
        </div>

        {/* Exclusion Reason Callout (if excluded) */}
        {donation.status === 'excluded' && donation.exclusionReason && (
          <div className="p-2.5 rounded-lg bg-[#FEE2E2] border border-[#FCA5A5] text-[11px] text-[#991B1B] space-y-0.5">
            <span className="font-bold flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" />
              Safety Exclusion Reason:
            </span>
            <p className="line-clamp-2">{donation.exclusionReason}</p>
          </div>
        )}
      </div>

      {/* Footer Details & Action Bar */}
      <div className="pt-4 mt-3 border-t border-[#E8DFD1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>{getDeadlineIndicator()}</div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {canCancel && onCancel && (
            <Button
              variant="outline"
              size="sm"
              className="text-[#BA1A1A] hover:bg-[#FEE2E2] hover:text-[#BA1A1A] border-transparent"
              onClick={() => onCancel(donation)}
            >
              Cancel
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            icon={Eye}
            onClick={() => onInspect(donation)}
          >
            Safety Dossier
          </Button>
        </div>
      </div>
    </Card>
  );
}
