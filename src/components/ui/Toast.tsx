import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

let toastId = 0;

export function showToast(message: string, type: ToastType = 'success') {
  window.dispatchEvent(new CustomEvent('chm-toast', { detail: { message, type } }));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { message: string; type: ToastType };
      const id = ++toastId;
      setToasts(prev => [...prev, { id, ...detail }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 4000);
    };
    window.addEventListener('chm-toast', handler);
    return () => window.removeEventListener('chm-toast', handler);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg bg-white border border-chm-border animate-slide-in-right min-w-[280px] max-w-[360px]"
          role="status"
        >
          {toast.type === 'success' && <CheckCircle size={20} className="text-green-500 shrink-0" />}
          {toast.type === 'error' && <AlertCircle size={20} className="text-red-500 shrink-0" />}
          {toast.type === 'info' && <Info size={20} className="text-blue-500 shrink-0" />}
          <span className="text-sm text-chm-charcoal flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-chm-text-light hover:text-chm-charcoal shrink-0"
            aria-label="Fermer"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
