import React from "react";

interface GhostButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const GhostButton: React.FC<GhostButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`bg-transparent text-foreground border-none rounded px-3 py-2 text-sm cursor-pointer hover:bg-timer-button-hover transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default GhostButton;
