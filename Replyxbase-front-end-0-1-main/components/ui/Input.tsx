import React, { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ElementType;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, icon: Icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={ref}
          className={`
            flex h-10 w-full rounded-xl border bg-gray-50 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200
            ${error ? "border-red-500 focus-visible:ring-red-500" : "border-transparent focus:bg-white focus:border-gray-200"}
            ${Icon ? "pl-10" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
