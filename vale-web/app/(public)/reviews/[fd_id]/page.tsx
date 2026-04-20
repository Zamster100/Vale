"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, PenLine } from "lucide-react";
import { funeralDirectors } from "@/lib/data";
import {
  getSeedReviews,
  getAllReviewsForFD,
  getReviewStats,
  formatReviewDate,
  type StoredReview,
} from "@/lib/reviews";
import StarRating from "@/components/StarRating";

function RatingBar({
  star,
  count,
  total,
}: {
  star: number;
  count: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[#6b7280] w-6 shrink-0 text-right">{star}</span>
      <StarRating rating={star} size="sm" />
      <div
        className="flex-1 h-2 bg-[#f3f4f6] rounded-full overflow-hidden"
        role="img"
        aria-label={`${star} star: ${count} review${count !== 1 ? "s" : ""}`}
      >
        <div
          className="h-full bg-[#d4a574] rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-[#6b7280] w-6 shrink-0">{count}</span>
    </div>
  );
}

function ReviewCard({ review }: { review: StoredReview }) {
  return (
    <article className="border border-[#e5e7eb] rounded-lg p-5 bg-white">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-[#111827]">
              {review.familyName}
            </span>
            {review.verified ? (
              <span className="flex items-center gap-1 text-xs font-semibold text-[#065f46] bg-[#d1fae5] px-1.5 py-0.5 rounded">
                <CheckCircle className="w-3 h-3" aria-hidden="true" />
                Verified
              </span>
            ) : (
              <span className="text-xs font-semibold text-[#92400e] bg-[#fef3c7] px-1.5 py-0.5 rounded">
                Pending verification
              </span>
            )}
          </div>
          <time
            dateTime={review.createdAt}
            className="text-xs text-[#6b7280] mt-0.5 block"
          >
            {formatReviewDate(review.createdAt)}
          </time>
        </div>
        <div className="shrink-0">
          <StarRating rating={review.rating} size="sm" />
        </div>
      </div>
      {review.text && (
        <blockquote className="text-sm text-[#374151] leading-relaxed">
          &ldquo;{review.text}&rdquo;
        </blockquote>
      )}
    </article>
  );
}

export default function ReviewsPage({
  params,
}: {
  params: Promise<{ fd_id: string }>;
}) {
  const { fd_id } = use(params);
  const fd = funeralDirectors.find((f) => f.id === fd_id);
  if (!fd) notFound();

  const seedReviews = getSeedReviews().filter((r) => r.fdId === fd_id);
  const [reviews, setReviews] = useState<StoredReview[]>(seedReviews);
  const [filterRating, setFilterRating] = useState<number | null>(null);

  useEffect(() => {
    setReviews(getAllReviewsForFD(fd_id));
  }, [fd_id]);

  const stats = getReviewStats(reviews);
  const displayed =
    filterRating === null
      ? reviews
      : reviews.filter((r) => r.rating === filterRating);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-[#6b7280]">
          <Link
            href={`/funeral-directors/${fd_id}`}
            className="hover:text-[#1a3a52] flex items-center gap-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            {fd!.name}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#111827] font-medium">All reviews</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Aggregate summary */}
        <section
          aria-label="Rating summary"
          className="bg-white border border-[#e5e7eb] rounded-lg p-6 shadow-sm mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            {/* Score */}
            <div className="text-center sm:border-r sm:border-[#e5e7eb] sm:pr-6 shrink-0">
              <p className="text-5xl font-bold text-[#1a3a52] leading-none mb-2">
                {stats.avg > 0 ? stats.avg : "—"}
              </p>
              <StarRating rating={stats.avg} size="lg" />
              <p className="text-xs text-[#6b7280] mt-2">
                {stats.count} review{stats.count !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Distribution bars */}
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <RatingBar
                  key={star}
                  star={star}
                  count={stats.distribution[star] ?? 0}
                  total={stats.count}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Actions row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          {/* Star filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-[#6b7280] font-medium">Filter:</span>
            <button
              type="button"
              onClick={() => setFilterRating(null)}
              className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] ${
                filterRating === null
                  ? "bg-[#1a3a52] text-white border-[#1a3a52]"
                  : "bg-white text-[#374151] border-[#e5e7eb] hover:border-[#1a3a52]"
              }`}
            >
              All ({stats.count})
            </button>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = stats.distribution[star] ?? 0;
              if (count === 0) return null;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setFilterRating(filterRating === star ? null : star)
                  }
                  className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] ${
                    filterRating === star
                      ? "bg-[#1a3a52] text-white border-[#1a3a52]"
                      : "bg-white text-[#374151] border-[#e5e7eb] hover:border-[#1a3a52]"
                  }`}
                >
                  {star}★ ({count})
                </button>
              );
            })}
          </div>

          <Link
            href={`/submit-review?fd=${fd_id}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-[#1a3a52] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded min-h-[44px]"
          >
            <PenLine className="w-3.5 h-3.5" aria-hidden="true" />
            Leave a review
          </Link>
        </div>

        {/* Review list */}
        {displayed.length === 0 ? (
          <div className="bg-white border border-[#e5e7eb] rounded-lg p-8 text-center">
            <p className="text-sm text-[#6b7280]">No reviews at this rating yet.</p>
          </div>
        ) : (
          <div
            className="space-y-4"
            aria-label={`Reviews for ${fd!.name}`}
            aria-live="polite"
          >
            {displayed.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
