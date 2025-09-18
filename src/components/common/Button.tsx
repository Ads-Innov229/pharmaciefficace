// ===== BUTTON.TSX - Version Optimisée =====
import React from 'react';
import { Button as UIButton, ButtonProps as UIButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary' | 'success' | 'warning';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'xl' | 'icon';

export interface ButtonProps extends Omit<UIButtonProps, 'variant' | 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  pulse?: boolean; // Effet de pulsation pour attirer l'attention
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    className = '',
    variant = 'default',
    size = 'default',
    isLoading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    pulse = false,
    ...props
  }, ref) => {
    // Mapping optimisé avec variantes supportées
    const uiVariantMap: Record<ButtonVariant, UIButtonProps['variant']> = {
      'default': 'default',
      'primary': 'default',      // Map primary to default
      'destructive': 'destructive',
      'outline': 'outline',
      'secondary': 'secondary',
      'ghost': 'ghost',
      'link': 'link',
      'success': 'default',      // Map success to default
      'warning': 'default'       // Map warning to default
    };

    const uiSizeMap: Record<ButtonSize, UIButtonProps['size']> = {
      'sm': 'sm',
      'default': 'default',
      'lg': 'lg',
      'xl': 'xl',
      'icon': 'icon'
    };

    const pulseClass = pulse ? 'animate-pulse' : '';
    const fullWidthClass = fullWidth ? 'w-full' : '';

    return (
      <UIButton
        ref={ref}
        variant={uiVariantMap[variant] || 'default'}
        size={uiSizeMap[size] || 'default'}
        disabled={disabled || isLoading}
        className={`${fullWidthClass} ${pulseClass} ${className}`.trim()}
        {...props}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {!isLoading && leftIcon && (
          <span className="mr-2 flex items-center">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="ml-2 flex items-center">{rightIcon}</span>
        )}
      </UIButton>
    );
  }
);

Button.displayName = 'Button';