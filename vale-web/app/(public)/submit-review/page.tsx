"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowLeft, Loader2 } from "lucide-react";
import { funeralDirectors } from "@/lib/data";
import { submitReview } from "@/lib/reviews";
import StarSelector from "@/components/StarSelector";

interface FormState {
  fdId: string;
  rating: number;
  text: string;
  familyName: string;
  anonymous: boolean;
}

interface FieldErrors {
  fdId?: string;
  rating?: string;
}

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.fdId) errors.fdId = "Please select a funeral director.";
  if (form.rating === 0) errors.rating = "Please select a star rating.";
  return errors;
}

const inputBase: React.CSSProperties = {
  background: "#F5F1E8",
  border: "0.5px solid rgba(143,160,176,0.5)",
  borderRadius: "12px",
  color: "#3F5E2C",
  width: "100%",
  padding: "10px 16px",
  fontSize: "14px",
  minHeight: "44px",
  outline: "none",
};

function SubmitReviewForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("fd") ?? "";

  const [form, setForm] = useState<FormState>({ fdId: preselected, rating: 0, text: "", familyName: "", anonymous: false });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    if (preselected) setForm((f) => ({ ...f, fdId: preselected }));
  }, [preselected]);

  const selectedFD = funeralDirectors.find((f) => f.id === form.fdId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    const fd = funeralDirectors.find((f) => f.id === form.fdId)!;
    submitReview({
      fdId: form.fdId, fdName: fd.name, rating: form.rating,
      text: form.text.trim(),
      familyName: form.anonymous ? "Anonymous" : form.familyName.trim() || "Anonymous",
    });
    setLoading(false);
    setSubmitted(true);
  };

  const fieldStyle = (field: string, hasError = false): React.CSSProperties => ({
    ...inputBase,
    border: hasError ? "1.5px solid #E26B5E" : focused === field ? "1.5px solid #8A5FAA" : "0.5px solid rgba(143,160,176,0.5)",
    boxShadow: focused === field && !hasError ? "0 0 0 3px rgba(138,95,170,0.12)" : "none",
  });

  if (submitted) {
    return (
      <div className="py-16 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgba(123,168,74,0.12)" }}>
          <CheckCircle className="w-8 h-8" aria-hidden="true" style={{ color: "#7BA84A" }} />
        </div>
        <h2 className="text-xl font-semibold mb-2" style={{ color: "#5D3A7A", fontFamily: "var(--font-instrument-serif)" }}>
          Thank you for sharing
        </h2>
        <p className="text-sm leading-relaxed max-w-sm mx-auto mb-2" style={{ color: "#8FA0B0" }}>
          Your review for{" "}
          <strong style={{ color: "#3F5E2C" }}>{selectedFD?.name}</strong> has been submitted. It will appear after a brief verification check.
        </p>
        <p className="text-xs mb-8" style={{ color: "#8FA0B0" }}>
          Reviews help other families make informed, confident decisions at a difficult time.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {selectedFD && (
            <Link
              href={`/reviews/${selectedFD.id}`}
              className="text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:scale-[1.03] transition-transform min-h-[44px] inline-flex items-center justify-center focus:outline-none"
              style={{ background: "#5AAE55" }}
            >
              View all reviews
            </Link>
          )}
          <Link
            href="/search"
            className="px-6 py-2.5 rounded-full font-semibold text-sm hover:opacity-80 transition-opacity min-h-[44px] inline-flex items-center justify-center focus:outline-none"
            style={{ border: "0.5px solid rgba(143,160,176,0.5)", color: "#5D3A7A" }}
          >
            Find another funeral director
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="sr-fd" className="block text-sm font-medium mb-1.5" style={{ color: "#5D3A7A" }}>
          Funeral director <span aria-hidden="true" style={{ color: "#E26B5E" }}>*</span>
        </label>
        <select
          id="sr-fd"
          value={form.fdId}
          onChange={(e) => { setForm((f) => ({ ...f, fdId: e.target.value })); setErrors((er) => ({ ...er, fdId: undefined })); }}
          onFocus={() => setFocused("fd")}
          onBlur={() => setFocused(null)}
          aria-invalid={!!errors.fdId}
          style={fieldStyle("fd", !!errors.fdId)}
        >
          <option value="">Select a funeral director…</option>
          {funeralDirectors.map((fd) => (
            <option key={fd.id} value={fd.id}>{fd.name} — {fd.city}</option>
          ))}
        </select>
        {errors.fdId && <p role="alert" className="text-xs mt-1.5 font-medium" style={{ color: "#E26B5E" }}>{errors.fdId}</p>}
      </div>

      <div>
        <p className="text-sm font-medium mb-2" style={{ color: "#5D3A7A" }}>
          Your rating <span aria-hidden="true" style={{ color: "#E26B5E" }}>*</span>
        </p>
        <StarSelector value={form.rating} onChange={(v) => { setForm((f) => ({ ...f, rating: v })); setErrors((er) => ({ ...er, rating: undefined })); }} />
        {errors.rating && <p role="alert" className="text-xs mt-1 font-medium" style={{ color: "#E26B5E" }}>{errors.rating}</p>}
      </div>

      <div>
        <label htmlFor="sr-text" className="block text-sm font-medium mb-1.5" style={{ color: "#5D3A7A" }}>
          Your review <span className="font-normal" style={{ color: "#8FA0B0" }}>(optional)</span>
        </label>
        <textarea
          id="sr-text"
          rows={4}
          value={form.text}
          onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
          onFocus={() => setFocused("text")}
          onBlur={() => setFocused(null)}
          placeholder="Tell other families what your experience was like — the care, the communication, the value…"
          style={{ ...fieldStyle("text"), resize: "none", minHeight: "auto" }}
        />
        <p className="text-xs mt-1" style={{ color: "#8FA0B0" }}>Be honest and specific. Other families rely on reviews like yours.</p>
      </div>

      <div>
        <label htmlFor="sr-name" className="block text-sm font-medium mb-1.5" style={{ color: "#5D3A7A" }}>
          Your name <span className="font-normal" style={{ color: "#8FA0B0" }}>(optional)</span>
        </label>
        <input
          id="sr-name"
          type="text"
          autoComplete="name"
          value={form.familyName}
          disabled={form.anonymous}
          onChange={(e) => setForm((f) => ({ ...f, familyName: e.target.value }))}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
          placeholder="e.g. The Johnson family"
          style={{ ...fieldStyle("name"), opacity: form.anonymous ? 0.5 : 1, cursor: form.anonymous ? "not-allowed" : "text" }}
        />
        <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={form.anonymous}
            onChange={(e) => setForm((f) => ({ ...f, anonymous: e.target.checked }))}
            className="w-4 h-4 rounded"
            style={{ accentColor: "#5D3A7A" }}
          />
          <span className="text-sm" style={{ color: "#3F5E2C" }}>Submit anonymously</span>
        </label>
      </div>

      <div className="p-4 rounded-xl" style={{ background: "rgba(197,210,220,0.2)", border: "0.5px solid rgba(143,160,176,0.3)" }}>
        <p className="text-xs leading-relaxed" style={{ color: "#8FA0B0" }}>
          <strong style={{ color: "#5D3A7A" }}>How we verify reviews:</strong> We ask that reviews come from families who have used the funeral director&apos;s services. Your review will be checked before appearing publicly — this usually takes 1–2 working days.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full text-white py-3 rounded-full font-semibold text-sm hover:scale-[1.03] active:scale-[0.98] transition-transform disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px] flex items-center justify-center gap-2 focus:outline-none"
        style={{ background: "#5AAE55" }}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
        {loading ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}

export default function SubmitReviewPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F5F1E8" }}>
      <div className="max-w-xl mx-auto px-6 py-8">
        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 text-sm mb-6 hover:opacity-80 transition-opacity focus:outline-none rounded"
          style={{ color: "#8A5FAA" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          Back to search
        </Link>

        <div className="rounded-2xl p-6 sm:p-8" style={{ background: "white", border: "0.5px solid rgba(143,160,176,0.3)" }}>
          <div className="mb-6">
            <h1 className="text-xl font-semibold mb-1" style={{ color: "#5D3A7A", fontFamily: "var(--font-instrument-serif)" }}>
              Leave a review
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "#8FA0B0" }}>
              Your experience helps other families find the right funeral director at the most difficult time.
            </p>
          </div>
          <Suspense fallback={
            <div className="h-64 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#8A5FAA", borderTopColor: "transparent" }} />
            </div>
          }>
            <SubmitReviewForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
