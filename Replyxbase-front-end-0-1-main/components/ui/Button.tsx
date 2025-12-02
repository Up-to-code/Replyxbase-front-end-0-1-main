import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  icon?: React.ElementType;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", loading = false, icon: Icon, children, disabled, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
    
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary shadow-sm border border-transparent",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-ring border border-input shadow-sm",
      outline: "bg-transparent text-foreground border border-input hover:bg-accent hover:text-accent-foreground focus:ring-ring",
      ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-accent focus:ring-ring",
      danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive shadow-sm border border-transparent",
      success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-600 shadow-sm border border-transparent",
      white: "bg-white text-gray-900 hover:bg-gray-50 focus:ring-gray-200 shadow-sm border border-gray-200"
    };

    const sizes = {
      sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
      md: "h-10 px-4 text-sm rounded-lg gap-2",
      lg: "h-12 px-6 text-base rounded-lg gap-2.5",
      icon: "h-10 w-10 p-0 rounded-lg"
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && Icon && <Icon className="w-4 h-4" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
