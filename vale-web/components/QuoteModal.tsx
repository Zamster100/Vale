"use client";

import { useState, useEffect, useRef } from "react";
import { X, CheckCircle, Loader2 } from "lucide-react";

interface QuoteModalProps {
  fdName: string;
  fdId: string;
  onClose: () => void;
  initialServiceType?: string;
}

const SERVICE_OPTIONS = [
  { value: "cremation", label: "Cremation" },
  { value: "burial", label: "Burial" },
  { value: "direct_cremation", label: "Direct cremation" },
  { value: "repatriation", label: "Repatriation" },
  { value: "other", label: "Not sure / other" },
];

export default function QuoteModal({ fdName, fdId, onClose, initialServiceType }: QuoteModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const validTypes = SERVICE_OPTIONS.map((o) => o.value);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: initialServiceType && validTypes.includes(initialServiceType) ? initialServiceType : "cremation",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.closest("[aria-hidden]"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", handleKey);
    // Move focus into modal on open
    const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
      'button, input, select, textarea, a[href]'
    );
    firstFocusable?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSubmitError("");
  };

  const handleBlur = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fieldErrors = {
    name: touched.name && !form.name.trim() ? "Please enter your name." : "",
    email:
      touched.email && !form.email.trim()
        ? "Please enter your email address."
        : touched.email && !EMAIL_RE.test(form.email)
        ? "Please enter a valid email address."
        : "",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (!form.name.trim() || !form.email.trim() || !EMAIL_RE.test(form.email)) return;

    setLoading(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fdId,
          fdName,
          familyName: form.name,
          email: form.email,
          phone: form.phone || undefined,
          serviceType: form.serviceType,
          message: form.message || undefined,
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-[#d1d5db] rounded text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-1 focus:border-[#d4a574] min-h-[44px]";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div ref={dialogRef} className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-[#e5e7eb]">
          <div>
            <h2
              id="quote-modal-title"
              className="font-bold text-[#1a3a52] text-base"
            >
              Request a quote
            </h2>
            <p className="text-sm text-[#6b7280] mt-0.5">from {fdName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-[#f3f4f6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574]"
          >
            <X className="w-4 h-4 text-[#6b7280]" aria-hidden="true" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-[#f0fdf4] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-[#059669]" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-[#111827] mb-2">Quote request sent</h3>
            <p className="text-sm text-[#6b7280] leading-relaxed">
              We&apos;ve sent your request to <strong>{fdName}</strong>. They&apos;ll
              typically be in touch within 24 hours.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 bg-[#1a3a52] text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-[#0f2438] transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
            {submitError && (
              <div role="alert" className="bg-[#fff5f5] border border-[#fca5a5] rounded px-4 py-3 text-sm text-[#dc2626]">
                {submitError}
              </div>
            )}

            <div>
              <label htmlFor="qm-name" className="block text-sm font-semibold text-[#111827] mb-1.5">
                Your name <span className="text-[#dc2626]" aria-hidden="true">*</span>
              </label>
              <input
                id="qm-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? "qm-name-err" : undefined}
                placeholder="e.g. Sarah Jones"
                className={`${inputClass} ${fieldErrors.name ? "border-[#dc2626] focus:border-[#dc2626]" : ""}`}
              />
              {fieldErrors.name && (
                <p id="qm-name-err" role="alert" className="text-xs text-[#dc2626] mt-1.5 font-medium">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="qm-email" className="block text-sm font-semibold text-[#111827] mb-1.5">
                Email address <span className="text-[#dc2626]" aria-hidden="true">*</span>
              </label>
              <input
                id="qm-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "qm-email-err" : undefined}
                placeholder="you@example.com"
                className={`${inputClass} ${fieldErrors.email ? "border-[#dc2626] focus:border-[#dc2626]" : ""}`}
              />
              {fieldErrors.email && (
                <p id="qm-email-err" role="alert" className="text-xs text-[#dc2626] mt-1.5 font-medium">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="qm-phone" className="block text-sm font-semibold text-[#111827] mb-1.5">
                Phone number{" "}
                <span className="text-[#6b7280] font-normal">(optional)</span>
              </label>
              <input
                id="qm-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="07700 000000"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="qm-serviceType" className="block text-sm font-semibold text-[#111827] mb-1.5">
                Service type
              </label>
              <select
                id="qm-serviceType"
                name="serviceType"
                value={form.serviceType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-[#d1d5db] rounded text-sm bg-white text-[#111827] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus:border-[#d4a574] min-h-[44px]"
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="qm-message" className="block text-sm font-semibold text-[#111827] mb-1.5">
                Message{" "}
                <span className="text-[#6b7280] font-normal">(optional)</span>
              </label>
              <textarea
                id="qm-message"
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell them about your needs, timeline, or any questions…"
                className="w-full px-4 py-2.5 border border-[#d1d5db] rounded text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus:border-[#d4a574] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a3a52] text-white py-3 rounded font-semibold text-sm hover:bg-[#0f2438] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
              {loading ? "Sending…" : "Send quote request"}
            </button>

            <p className="text-xs text-center text-[#6b7280]">
              They&apos;ll typically respond within 24 hours.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
