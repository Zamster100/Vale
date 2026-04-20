"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowLeft } from "lucide-react";
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

function SubmitReviewForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("fd") ?? "";

  const [form, setForm] = useState<FormState>({
    fdId: preselected,
    rating: 0,
    text: "",
    familyName: "",
    anonymous: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (preselected) setForm((f) => ({ ...f, fdId: preselected }));
  }, [preselected]);

  const selectedFD = funeralDirectors.find((f) => f.id === form.fdId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    const fd = funeralDirectors.find((f) => f.id === form.fdId)!;
    submitReview({
      fdId: form.fdId,
      fdName: fd.name,
      rating: form.rating,
      text: form.text.trim(),
      familyName: form.anonymous ? "Anonymous" : form.familyName.trim() || "Anonymous",
    });
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-[#d1d5db] rounded text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus:border-[#d4a574] min-h-[44px] bg-white text-[#111827]";

  if (submitted) {
    return (
      <div className="py-16 text-center">
        <div className="w-16 h-16 bg-[#f0fdf4] rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-[#059669]" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-bold text-[#1a3a52] mb-2">
          Thank you for sharing
        </h2>
        <p className="text-sm text-[#6b7280] leading-relaxed max-w-sm mx-auto mb-2">
          Your review for{" "}
          <strong className="text-[#111827]">{selectedFD?.name}</strong> has
          been submitted. It will appear after a brief verification check.
        </p>
        <p className="text-xs text-[#6b7280] mb-8">
          Reviews help other families make informed, confident decisions at a
          difficult time.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {selectedFD && (
            <Link
              href={`/reviews/${selectedFD.id}`}
              className="bg-[#1a3a52] text-white px-6 py-2.5 rounded font-semibold text-sm hover:bg-[#0f2438] transition-colors min-h-[44px] inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
            >
              View all reviews
            </Link>
          )}
          <Link
            href="/search"
            className="border border-[#d1d5db] text-[#374151] px-6 py-2.5 rounded font-semibold text-sm hover:bg-[#f9fafb] transition-colors min-h-[44px] inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
          >
            Find another funeral director
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Funeral director */}
      <div>
        <label
          htmlFor="sr-fd"
          className="block text-sm font-semibold text-[#111827] mb-1.5"
        >
          Funeral director{" "}
          <span className="text-[#dc2626]" aria-hidden="true">*</span>
        </label>
        <select
          id="sr-fd"
          value={form.fdId}
          onChange={(e) => {
            setForm((f) => ({ ...f, fdId: e.target.value }));
            setErrors((er) => ({ ...er, fdId: undefined }));
          }}
          aria-invalid={!!errors.fdId}
          aria-describedby={errors.fdId ? "sr-fd-err" : undefined}
          className={inputClass}
        >
          <option value="">Select a funeral director…</option>
          {funeralDirectors.map((fd) => (
            <option key={fd.id} value={fd.id}>
              {fd.name} — {fd.city}
            </option>
          ))}
        </select>
        {errors.fdId && (
          <p
            id="sr-fd-err"
            role="alert"
            className="text-xs text-[#dc2626] mt-1.5 font-medium"
          >
            {errors.fdId}
          </p>
        )}
      </div>

      {/* Star rating */}
      <div>
        <p
          id="sr-rating-label"
          className="text-sm font-semibold text-[#111827] mb-2"
        >
          Your rating{" "}
          <span className="text-[#dc2626]" aria-hidden="true">*</span>
        </p>
        <StarSelector
          value={form.rating}
          onChange={(v) => {
            setForm((f) => ({ ...f, rating: v }));
            setErrors((er) => ({ ...er, rating: undefined }));
          }}
        />
        {errors.rating && (
          <p
            role="alert"
            className="text-xs text-[#dc2626] mt-1 font-medium"
          >
            {errors.rating}
          </p>
        )}
      </div>

      {/* Review text */}
      <div>
        <label
          htmlFor="sr-text"
          className="block text-sm font-semibold text-[#111827] mb-1.5"
        >
          Your review{" "}
          <span className="text-[#6b7280] font-normal">(optional)</span>
        </label>
        <textarea
          id="sr-text"
          rows={4}
          value={form.text}
          onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
          placeholder="Tell other families what your experience was like — the care, the communication, the value…"
          className="w-full px-4 py-2.5 border border-[#d1d5db] rounded text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus:border-[#d4a574] resize-none text-[#111827] placeholder:text-[#9ca3af]"
        />
        <p className="text-xs text-[#6b7280] mt-1">
          Be honest and specific. Other families rely on reviews like yours.
        </p>
      </div>

      {/* Family name */}
      <div>
        <label
          htmlFor="sr-name"
          className="block text-sm font-semibold text-[#111827] mb-1.5"
        >
          Your name{" "}
          <span className="text-[#6b7280] font-normal">(optional)</span>
        </label>
        <input
          id="sr-name"
          type="text"
          autoComplete="name"
          value={form.familyName}
          disabled={form.anonymous}
          onChange={(e) =>
            setForm((f) => ({ ...f, familyName: e.target.value }))
          }
          placeholder="e.g. The Johnson family"
          className={`${inputClass} disabled:bg-[#f3f4f6] disabled:text-[#9ca3af] disabled:cursor-not-allowed`}
        />
        <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={form.anonymous}
            onChange={(e) =>
              setForm((f) => ({ ...f, anonymous: e.target.checked }))
            }
            className="w-4 h-4 rounded border-[#d1d5db] text-[#1a3a52] accent-[#1a3a52] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574]"
          />
          <span className="text-sm text-[#374151]">Submit anonymously</span>
        </label>
      </div>

      {/* Trust note */}
      <div className="bg-[#faf6f1] border border-[#e5e7eb] rounded-lg p-4">
        <p className="text-xs text-[#92400e] leading-relaxed">
          <strong>How we verify reviews:</strong> We ask that reviews come from
          families who have used the funeral director's services. Your review
          will be checked before appearing publicly — this usually takes 1–2
          working days.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#1a3a52] text-white py-3 rounded font-semibold text-sm hover:bg-[#0f2438] transition-colors disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
      >
        {loading ? "Submitting…" : "Submit review"}
      </button>
    </form>
  );
}

export default function SubmitReviewPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="max-w-xl mx-auto px-6 py-8">
        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#1a3a52] transition-colors mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          Back to search
        </Link>

        <div className="bg-white border border-[#e5e7eb] rounded-lg shadow-sm p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-[#1a3a52] mb-1">
              Leave a review
            </h1>
            <p className="text-sm text-[#6b7280] leading-relaxed">
              Your experience helps other families find the right funeral
              director at the most difficult time. Every review is read and
              valued.
            </p>
          </div>

          <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="w-6 h-6 border-2 border-[#1a3a52] border-t-transparent rounded-full animate-spin" /></div>}>
            <SubmitReviewForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
