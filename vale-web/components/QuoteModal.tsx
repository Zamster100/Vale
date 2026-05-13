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

const inputStyle: React.CSSProperties = {
  background: "#F7F3EE",
  border: "1px solid #E8E2D8",
  borderRadius: "12px",
  color: "#5A4E44",
  width: "100%",
  padding: "10px 16px",
  fontSize: "14px",
  minHeight: "44px",
  outline: "none",
};

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
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
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
    dialogRef.current?.querySelector<HTMLElement>("button, input, select, textarea, a[href]")?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSubmitError("");
  };

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fieldErrors = {
    name: touched.name && !form.name.trim() ? "Please enter your name." : "",
    email: touched.email && !form.email.trim() ? "Please enter your email address."
      : touched.email && !EMAIL_RE.test(form.email) ? "Please enter a valid email address." : "",
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
          fdId, fdName, familyName: form.name, email: form.email,
          phone: form.phone || undefined, serviceType: form.serviceType,
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

  const getFieldStyle = (field: string, hasError: boolean): React.CSSProperties => ({
    ...inputStyle,
    border: hasError ? "1.5px solid #E26B5E" : focused === field ? "1.5px solid rgba(94,139,115,0.5)" : "1px solid #E8E2D8",
    boxShadow: focused === field && !hasError ? "0 0 0 3px rgba(94,139,115,0.12)" : "none",
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(28,31,42,0.4)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div ref={dialogRef} className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl" style={{ background: "white", boxShadow: "0 20px 60px rgba(28,31,42,0.2)" }}>
        <div className="flex items-center justify-between p-6" style={{ borderBottom: "1px solid #E8E2D8" }}>
          <div>
            <h2 id="quote-modal-title" className="font-semibold text-base" style={{ color: "#1C1F2A" }}>Request a quote</h2>
            <p className="text-sm mt-0.5" style={{ color: "#7A6E64" }}>from {fdName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:opacity-70 transition-opacity focus:outline-none"
            style={{ background: "rgba(234,242,238,0.3)", color: "#7A6E64" }}
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(123,168,74,0.12)" }}>
              <CheckCircle className="w-7 h-7" aria-hidden="true" style={{ color: "#7BA84A" }} />
            </div>
            <h3 className="font-semibold mb-2" style={{ color: "#1C1F2A" }}>Quote request sent</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#7A6E64" }}>
              We&apos;ve sent your request to <strong style={{ color: "#5A4E44" }}>{fdName}</strong>. They&apos;ll typically be in touch within 24 hours.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:scale-[1.03] transition-transform min-h-[44px] focus:outline-none"
              style={{ background: "#1C1F2A" }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4">
            {submitError && (
              <div role="alert" className="px-4 py-3 text-sm rounded-xl" style={{ background: "rgba(226,107,94,0.08)", border: "1px solid rgba(226,107,94,0.3)", color: "#C95548" }}>
                {submitError}
              </div>
            )}

            {[
              { id: "qm-name", name: "name", label: "Your name", type: "text", required: true, autoComplete: "name", placeholder: "e.g. Sarah Jones", error: fieldErrors.name },
              { id: "qm-email", name: "email", label: "Email address", type: "email", required: true, autoComplete: "email", placeholder: "you@example.com", error: fieldErrors.email },
              { id: "qm-phone", name: "phone", label: "Phone number", type: "tel", required: false, autoComplete: "tel", placeholder: "07700 000000", error: "" },
            ].map(({ id, name, label, type, required, autoComplete, placeholder, error }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium mb-1.5" style={{ color: "#1C1F2A" }}>
                  {label}{required && <span className="ml-1" style={{ color: "#E26B5E" }} aria-hidden="true">*</span>}
                  {!required && <span className="ml-1 font-normal" style={{ color: "#7A6E64" }}>(optional)</span>}
                </label>
                <input
                  id={id}
                  name={name}
                  type={type}
                  required={required}
                  autoComplete={autoComplete}
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                  onBlur={() => setTouched(p => ({ ...p, [name]: true }))}
                  onFocus={() => setFocused(name)}
                  placeholder={placeholder}
                  aria-invalid={!!error}
                  style={getFieldStyle(name, !!error)}
                />
                {error && <p role="alert" className="text-xs mt-1.5 font-medium" style={{ color: "#E26B5E" }}>{error}</p>}
              </div>
            ))}

            <div>
              <label htmlFor="qm-serviceType" className="block text-sm font-medium mb-1.5" style={{ color: "#1C1F2A" }}>Service type</label>
              <select
                id="qm-serviceType"
                name="serviceType"
                value={form.serviceType}
                onChange={handleChange}
                onFocus={() => setFocused("serviceType")}
                onBlur={() => setFocused(null)}
                style={getFieldStyle("serviceType", false)}
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="qm-message" className="block text-sm font-medium mb-1.5" style={{ color: "#1C1F2A" }}>
                Message <span className="font-normal" style={{ color: "#7A6E64" }}>(optional)</span>
              </label>
              <textarea
                id="qm-message"
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                placeholder="Tell them about your needs, timeline, or any questions…"
                style={{ ...getFieldStyle("message", false), minHeight: "auto", resize: "none" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white py-3 rounded-md font-semibold text-sm hover:scale-[1.03] active:scale-[0.98] transition-transform disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px] focus:outline-none"
              style={{ background: "#1C1F2A" }}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
              {loading ? "Sending…" : "Send quote request"}
            </button>

            <p className="text-xs text-center" style={{ color: "#7A6E64" }}>
              They&apos;ll typically respond within 24 hours.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
