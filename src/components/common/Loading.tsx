// ===== LOADING.TSX - Version Optimisée =====
import type React from 'react';
import { Loader, Heart, Activity } from 'lucide-react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  fullScreen?: boolean;
  variant?: 'default' | 'medical' | 'dots' | 'pulse';
  className?: string;
  spinnerClassName?: string;
  textClassName?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text,
  fullScreen = false,
  variant = 'default',
  className = '',
  spinnerClassName = '',
  textClassName = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const containerClasses = [
    'flex flex-col items-center justify-center gap-4',
    fullScreen 
      ? 'fixed inset-0 bg-white/95 backdrop-blur-sm z-50' 
      : 'p-6',
    className,
  ].join(' ');

  const baseSpinnerClasses = [
    'text-green-600',
    sizeClasses[size],
    spinnerClassName,
  ].join(' ');

  const textClasses = [
    'text-sm font-medium text-gray-600 animate-pulse',
    textClassName,
  ].join(' ');

  // Différents types de loading
  const renderSpinner = () => {
    switch (variant) {
      case 'medical':
        return (
          <div className="relative">
            <Activity className={`${baseSpinnerClasses} text-green-600`} />
            <Heart className="absolute inset-0 w-3 h-3 m-auto text-orange-500 animate-ping" />
          </div>
        );
      
      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 bg-green-600 rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        );
      
      case 'pulse':
        return (
          <div className="relative">
            <div className={`${sizeClasses[size]} bg-green-600 rounded-full animate-ping opacity-75`} />
            <div className={`absolute inset-0 ${sizeClasses[size]} bg-green-600 rounded-full animate-pulse`} />
          </div>
        );
      
      default:
        return <Loader className={`${baseSpinnerClasses} animate-spin`} aria-hidden="true" />;
    }
  };

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      {renderSpinner()}
      {text && <p className={textClasses}>{text}</p>}
      <span className="sr-only">
        {text || 'Chargement en cours...'}
      </span>
    </div>
  );
};