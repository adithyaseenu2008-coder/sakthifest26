import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-forest text-cream hover:bg-forest-700 active:scale-[0.99] shadow-soft',
    secondary: 'bg-mint text-charcoal hover:bg-mint-400 active:scale-[0.99]',
    outline: 'border border-[#E8DFD1] bg-transparent text-forest hover:bg-forest-50',
    ghost: 'bg-transparent text-forest hover:bg-[#F7F0E3]',
    danger: 'bg-[#BA1A1A] text-white hover:bg-[#93000A]',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
    lg: 'text-base px-6 py-3 rounded-xl gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
}
