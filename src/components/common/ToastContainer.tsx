// ===== TOASTCONTAINER.TSX - Version Optimisée =====
import type React from 'react';
import { Toast } from './Toast';

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning' | 'medical';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onClose: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center';
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ 
  toasts, 
  onClose,
  position = 'top-right'
}) => {
  if (toasts.length === 0) return null;

  const positionClasses = {
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-center': 'top-6 left-1/2 transform -translate-x-1/2',
  };

  return (
    <div 
      className={`fixed z-50 space-y-3 ${positionClasses[position]}`}
      style={{
        maxWidth: '24rem',
        width: '90vw',
      }}
      role="region"
      aria-live="polite"
      aria-atomic="false"
      aria-label="Notifications"
    >
      {toasts.map((toast, index) => (
        <div 
          key={toast.id}
          className="w-full"
          style={{
            animationDelay: `${index * 0.1}s`
          }}
        >
          <Toast
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => onClose(toast.id)}
            action={toast.action ? {
              label: toast.action.label,
              onClick: toast.action.onClick
            } : null}
          />
        </div>
      ))}
    </div>
  );
};