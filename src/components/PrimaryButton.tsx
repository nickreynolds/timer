import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children, 
  icon = false, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'bg-background text-foreground border-none rounded cursor-pointer hover:bg-timer-button-hover transition-colors';
  const sizeClasses = icon ? 'w-9 h-9 flex items-center justify-center' : 'px-3 py-2 text-sm';

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton; 