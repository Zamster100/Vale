"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, Loader2, Mail } from "lucide-react";

const DM      = "var(--font-dm-sans), -apple-system, sans-serif";
const DARK    = "#100B20";
const MED     = "#4A415E";
const LITE    = "#9E96B2";
const LAV     = "#E3DFFF";
const LAV_BTN = "#4F34C4";
const BDR     = "#D5D0E4";
const EASE    = [0.16, 1, 0.3, 1] as const;

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Please enter a valid email address.";
  if (!form.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

const inputBase: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #D5D0E4",
  borderRadius: "12px",
  color: "#4A415E",
  width: "100%",
  padding: "10px 16px",
  fontSize: "14px",
  minHeight: "44px",
  outline: "none",
};

export default function ContactPage() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function fadeUp(delay: number) {
    return {
      initial: { opacity: 0, y: reduce ? 0 : 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
    };
  }

  const fieldStyle = (field: string, hasError = false): React.CSSProperties => ({
    ...inputBase,
    border: hasError ? "1.5px solid #E26B5E" : focused === field ? "1.5px solid rgba(79,52,196,0.5)" : "1px solid #D5D0E4",
    boxShadow: focused === field && !hasError ? "0 0 0 3px rgba(79,52,196,0.12)" : "none",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setServerError(null);
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setServerError(data.error ?? "Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
  }

  return (
    <div style={{ fontFamily: DM, background: "#FFFFFF", color: DARK }}>

      {/* ── Hero ── */}
      <section style={{ background: DARK }}>
        <div className="max-w-[1366px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wide"
            style={{ background: "rgba(210,211,252,0.15)", color: LAV }}
            {...fadeUp(0)}
          >
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            Get in touch
          </motion.div>

          <motion.h1
            className="mb-4"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
            }}
            {...fadeUp(0.1)}
          >
            We&apos;d love to hear from you
          </motion.h1>

          <motion.p
            className="max-w-xl"
            style={{ fontSize: "17px", lineHeight: 1.65, color: "rgba(255,255,255,0.6)" }}
            {...fadeUp(0.2)}
          >
            Questions, feedback, or just want to say hello — send us a message and
            our team will get back to you within one business day.
          </motion.p>
        </div>
      </section>

      {/* ── Form ── */}
      <div className="max-w-[1366px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="max-w-xl mx-auto">
          {submitted ? (
            <motion.div className="py-12 text-center" {...fadeUp(0)}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: LAV }}>
                <CheckCircle className="w-8 h-8" aria-hidden="true" style={{ color: LAV_BTN }} />
              </div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: DARK }}>
                Message sent
              </h2>
              <p className="text-sm leading-relaxed max-w-sm mx-auto" style={{ color: MED }}>
                Thanks for reaching out — we&apos;ll be in touch within one business day.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="rounded-2xl p-6 md:p-8"
              style={{ border: `1px solid ${BDR}` }}
              {...fadeUp(0)}
            >
              <div className="mb-5">
                <label htmlFor="name" className="block text-sm font-semibold mb-1.5" style={{ color: DARK }}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  style={fieldStyle("name", !!errors.name)}
                />
                {errors.name && <p className="text-xs mt-1.5" style={{ color: "#E26B5E" }}>{errors.name}</p>}
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-semibold mb-1.5" style={{ color: DARK }}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  style={fieldStyle("email", !!errors.email)}
                />
                {errors.email && <p className="text-xs mt-1.5" style={{ color: "#E26B5E" }}>{errors.email}</p>}
              </div>

              <div className="mb-5">
                <label htmlFor="subject" className="block text-sm font-semibold mb-1.5" style={{ color: DARK }}>
                  Subject <span style={{ color: LITE, fontWeight: 400 }}>(optional)</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  style={fieldStyle("subject")}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold mb-1.5" style={{ color: DARK }}>
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  style={{ ...fieldStyle("message", !!errors.message), minHeight: "120px", resize: "vertical" }}
                />
                {errors.message && <p className="text-xs mt-1.5" style={{ color: "#E26B5E" }}>{errors.message}</p>}
              </div>

              {serverError && (
                <p className="text-sm mb-4" style={{ color: "#E26B5E" }}>{serverError}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-60"
                style={{ background: LAV_BTN, color: "#FFFFFF" }}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : null}
                {loading ? "Sending..." : "Send message"}
              </button>
            </motion.form>
          )}
        </div>
      </div>

    </div>
  );
}
