// src/layouts/PublicLayout.tsx
import React from 'react';
import { useToast } from '../hooks/useToast';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="public-layout">
      {/* Your layout content */}
      {children}
      
      {/* Toast container */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`toast toast-${toast.type}`}
            onClick={() => removeToast(toast.id)}
          >
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicLayout;