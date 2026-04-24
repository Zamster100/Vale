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
  success: <CheckCircle className="w-4 h-4 shrink-0" aria-hidden="true" style={{ color: "#7BA84A" }} />,
  info: <Bell className="w-4 h-4 shrink-0" aria-hidden="true" style={{ color: "#8A5FAA" }} />,
  error: <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" style={{ color: "#E26B5E" }} />,
};

const STYLES: Record<ToastVariant, React.CSSProperties> = {
  success: { background: "rgba(123,168,74,0.08)", border: "0.5px solid rgba(123,168,74,0.3)" },
  info: { background: "white", border: "0.5px solid rgba(138,95,170,0.3)" },
  error: { background: "rgba(226,107,94,0.08)", border: "0.5px solid rgba(226,107,94,0.3)" },
};

const TEXT_COLOR: Record<ToastVariant, string> = {
  success: "#5A8A30",
  info: "#5D3A7A",
  error: "#C95548",
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

export function ToastList({ toasts, dismiss }: { toasts: ToastItem[]; dismiss: (id: string) => void }) {
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
          className="pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-2xl shadow-lg transition-all"
          style={STYLES[t.variant]}
        >
          {ICONS[t.variant]}
          <p className="text-sm font-medium flex-1 leading-snug" style={{ color: TEXT_COLOR[t.variant] }}>
            {t.message}
          </p>
          <button
            type="button"
            onClick={() => dismiss(t.id)}
            aria-label="Dismiss notification"
            className="shrink-0 hover:opacity-70 transition-opacity focus:outline-none rounded"
            style={{ color: "#8FA0B0" }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
