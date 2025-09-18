import type React from 'react';
import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning' | 'medical';
  duration?: number;
  onClose: (id: string) => void;
  action?: ToastAction | null;
}

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
  medical: CheckCircle, // Using CheckCircle as a fallback for medical
};

const colorMap = {
  success: 'bg-success-50 border-l-4 border-success-500 text-neutral-800',
  error: 'bg-error-50 border-l-4 border-error-500 text-neutral-800',
  info: 'bg-info-50 border-l-4 border-info-500 text-neutral-800',
  warning: 'bg-warning-50 border-l-4 border-warning-500 text-neutral-800',
  medical: 'bg-green-50 border-l-4 border-green-500 text-neutral-800',
};

const iconColorMap = {
  success: 'text-success-500',
  error: 'text-error-500',
  info: 'text-info-500',
  warning: 'text-warning-500',
  medical: 'text-green-500',
};


export const Toast: React.FC<ToastProps> = ({ id, message, type, duration = 5000, onClose }) => {
  const Icon = iconMap[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div className={`flex items-start p-4 mb-3 rounded-r-lg shadow-lg animate-slide-in ${colorMap[type]} max-w-md w-full`}>
      <div className={`flex-shrink-0 pt-0.5`}>
        <Icon className={`w-5 h-5 ${iconColorMap[type]}`} />
      </div>
      <div className="ml-3 flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="ml-4 flex-shrink-0 text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-300 rounded-lg p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};