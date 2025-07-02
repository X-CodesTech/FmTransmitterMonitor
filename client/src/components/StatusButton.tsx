import { ReactNode } from "react";

interface StatusButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "yellow" | "green" | "orange" | "gray";
}

export function StatusButton({ children, className = "", onClick, variant = "default" }: StatusButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "yellow":
        return "toolbar-btn-yellow";
      case "green":
        return "on-air-green";
      case "orange":
        return "bg-orange-600 text-white";
      case "gray":
        return "bg-gray-600 text-white";
      default:
        return "toolbar-btn";
    }
  };

  return (
    <button 
      className={`status-btn ${getVariantClasses()} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
