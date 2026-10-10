import React from 'react';

export default function Badge({
  children,
  variant = 'default',
  className = '',
  dot = false,
  icon: Icon,
}) {
  const variants = {
    default: 'bg-mint/30 text-charcoal border border-mint',
    optimal: 'bg-[#D8F3DC] text-[#2D6A4F] border border-[#B7E4C7]',
    warning: 'bg-[#FDE8CD] text-[#9A5800] border border-[#FCD49D]',
    critical: 'bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]',
    pink: 'bg-pink-50 text-[#653A47] border border-pink-pastel',
    peach: 'bg-peach/30 text-charcoal border border-peach',
    forest: 'bg-forest text-cream',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tabular-nums tracking-wide ${variants[variant] || variants.default} ${className}`}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 animate-pulse" />
      )}
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      {children}
    </span>
  );
}
