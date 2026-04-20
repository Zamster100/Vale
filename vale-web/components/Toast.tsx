"use client";

import { useState, useCallback } from "react";
import { CheckCircle, Bell, AlertCircle, X } from "lucide-react";

export type ToastVariant = "success" | "info" | "error";

interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

const ICONS: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle className="w-4 h-4 text-[#059669] shrink-0" aria-hidden="true" />,
  info: <Bell className="w-4 h-4 text-[#1a3a52] shrink-0" aria-hidden="true" />,
  error: <AlertCircle className="w-4 h-4 text-[#dc2626] shrink-0" aria-hidden="true" />,
};

const STYLES: Record<ToastVariant, string> = {
  success: "border-[#059669]/20 bg-[#f0fdf4]",
  info: "border-[#d4a574] bg-white",
  error: "border-[#dc2626]/20 bg-[#fff5f5]",
};

const TEXT: Record<ToastVariant, string> = {
  success: "text-[#065f46]",
  info: "text-[#1a3a52]",
  error: "text-[#991b1b]",
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, variant: ToastVariant = "info", duration = 5000) => {
      const id = `toast_${Date.now()}`;
      setToasts((prev) => [...prev, { id, message, variant }]);
      setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  return { toasts, addToast, dismiss };
}

export function ToastList({
  toasts,
  dismiss,
}: {
  toasts: ToastItem[];
  dismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-lg border shadow-lg transition-all animate-in slide-in-from-bottom-2 ${STYLES[t.variant]}`}
        >
          {ICONS[t.variant]}
          <p className={`text-sm font-medium flex-1 leading-snug ${TEXT[t.variant]}`}>
            {t.message}
          </p>
          <button
            type="button"
            onClick={() => dismiss(t.id)}
            aria-label="Dismiss notification"
            className="shrink-0 text-[#6b7280] hover:text-[#374151] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
