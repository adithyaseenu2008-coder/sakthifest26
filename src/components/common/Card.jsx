import React from 'react';

export default function Card({
  children,
  elevated = false,
  className = '',
  ...props
}) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 transition-all duration-200 ${
        elevated
          ? 'border border-[#DED4C3] shadow-lifted'
          : 'border border-[#E8DFD1] shadow-soft'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
