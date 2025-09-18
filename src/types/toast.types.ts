export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

// Type for the react-hot-toast's toast function
export type ToastFunction = (message: string, options?: { icon?: string }) => string;

export interface ToastObject {
  (message: string, options?: { icon?: string }): string;
  success: ToastFunction;
  error: ToastFunction;
  dismiss: (toastId?: string) => void;
  // Add other toast methods if needed
}
