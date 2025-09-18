import toast from 'react-hot-toast';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export const useToast = (): { 
  showToast: (message: string, type?: ToastType) => string; 
  removeToast: (toastId?: string) => void; 
  toasts: { id: string; type: ToastType; message: string }[] 
} => {
  const showToast = (message: string, type: ToastType = 'info'): string => {
    switch (type) {
      case 'success':
        return toast.success(message);
      case 'error':
        return toast.error(message);
      case 'warning':
        return toast(message, { icon: '⚠️' });
      case 'info':
      default:
        return toast(message);
    }
  };

  const removeToast = (toastId?: string): void => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  };

  // Retourner un tableau vide car nous n'avons pas besoin de suivre les toasts dans ce hook
  return { 
    showToast, 
    removeToast, 
    toasts: [] 
  };
};