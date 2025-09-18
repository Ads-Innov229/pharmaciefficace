// ===== CARD.TSX - Version Optimisée =====
import React, { HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  elevated?: boolean;
  variant?: 'default' | 'medical' | 'success' | 'warning' | 'info';
  interactive?: boolean;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'medical' | 'success' | 'warning' | 'info';
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right' | 'between';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, elevated = false, variant = 'default', interactive = false, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-white border-gray-200',
      medical: 'bg-gradient-to-br from-green-50 to-white border-green-200',
      success: 'bg-gradient-to-br from-emerald-50 to-white border-emerald-200',
      warning: 'bg-gradient-to-br from-amber-50 to-white border-amber-200',
      info: 'bg-gradient-to-br from-blue-50 to-white border-blue-200',
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          'rounded-xl border-2 overflow-hidden transition-all duration-300',
          variantClasses[variant],
          hoverable && 'hover:shadow-lg hover:border-green-300 hover:-translate-y-1',
          elevated ? 'shadow-lg' : 'shadow-sm',
          interactive && 'cursor-pointer transform hover:scale-[1.02]',
          className
        )}
        {...props}
      />
    );
  }
);

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, action, variant = 'default', children, ...props }, ref) => {
    const variantClasses = {
      default: 'bg-gray-50 border-gray-200',
      medical: 'bg-gradient-to-r from-green-100 to-green-50 border-green-200',
      success: 'bg-gradient-to-r from-emerald-100 to-emerald-50 border-emerald-200',
      warning: 'bg-gradient-to-r from-amber-100 to-amber-50 border-amber-200',
      info: 'bg-gradient-to-r from-blue-100 to-blue-50 border-blue-200',
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          'px-6 py-4 border-b-2',
          'flex items-center justify-between',
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <div className="flex-1">
          {title && (
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600">{subtitle}</p>
          )}
          {children}
        </div>
        {action && <div className="flex-shrink-0 ml-4">{action}</div>}
      </div>
    );
  }
);

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge('p-6', className)}
        {...props}
      />
    );
  }
);

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, align = 'left', ...props }, ref) => {
    const alignment = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      between: 'justify-between',
    };

    return (
      <div
        ref={ref}
        className={twMerge(
          'px-6 py-4 border-t-2 border-gray-100 bg-gray-50/50',
          'flex items-center gap-3',
          alignment[align],
          className
        )}
        {...props}
      />
    );
  }
);