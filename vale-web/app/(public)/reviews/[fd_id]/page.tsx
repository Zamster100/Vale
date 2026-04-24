"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, PenLine, Star } from "lucide-react";
import { funeralDirectors } from "@/lib/data";
import {
  getSeedReviews,
  getAllReviewsForFD,
  getReviewStats,
  formatReviewDate,
  type StoredReview,
} from "@/lib/reviews";

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const sz = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={sz} style={{ color: s <= Math.round(rating) ? "#E26B5E" : "#C5D2DC", fill: s <= Math.round(rating) ? "#E26B5E" : "#C5D2DC" }} />
      ))}
    </span>
  );
}

function RatingBar({ star, count, total }: { star: number; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs w-6 shrink-0 text-right" style={{ color: "#8FA0B0" }}>{star}</span>
      <StarRating rating={star} size="sm" />
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(197,210,220,0.4)" }}
        role="img" aria-label={`${star} star: ${count} review${count !== 1 ? "s" : ""}`}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "#5AAE55" }} />
      </div>
      <span className="text-xs w-6 shrink-0" style={{ color: "#8FA0B0" }}>{count}</span>
    </div>
  );
}

function ReviewCard({ review }: { review: StoredReview }) {
  return (
    <article className="p-5 rounded-xl" style={{ background: "white", border: "0.5px solid rgba(143,160,176,0.3)" }}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm" style={{ color: "#3F5E2C" }}>{review.familyName}</span>
            {review.verified ? (
              <span className="flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(123,168,74,0.15)", color: "#5A8A30" }}>
                <CheckCircle className="w-3 h-3" aria-hidden="true" />
                Verified
              </span>
            ) : (
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(226,107,94,0.1)", color: "#C95548" }}>
                Pending verification
              </span>
            )}
          </div>
          <time dateTime={review.createdAt} className="text-xs mt-0.5 block" style={{ color: "#8FA0B0" }}>
            {formatReviewDate(review.createdAt)}
          </time>
        </div>
        <div className="shrink-0"><StarRating rating={review.rating} size="sm" /></div>
      </div>
      {review.text && (
        <blockquote className="text-sm leading-relaxed" style={{ color: "#3F5E2C" }}>
          &ldquo;{review.text}&rdquo;
        </blockquote>
      )}
    </article>
  );
}

export default function ReviewsPage({ params }: { params: Promise<{ fd_id: string }> }) {
  const { fd_id } = use(params);
  const fd = funeralDirectors.find((f) => f.id === fd_id);
  if (!fd) notFound();

  const seedReviews = getSeedReviews().filter((r) => r.fdId === fd_id);
  const [reviews, setReviews] = useState<StoredReview[]>(seedReviews);
  const [filterRating, setFilterRating] = useState<number | null>(null);

  useEffect(() => { setReviews(getAllReviewsForFD(fd_id)); }, [fd_id]);

  const stats = getReviewStats(reviews);
  const displayed = filterRating === null ? reviews : reviews.filter((r) => r.rating === filterRating);

  return (
    <div className="min-h-screen" style={{ background: "#F5F1E8" }}>
      <div style={{ background: "white", borderBottom: "0.5px solid rgba(143,160,176,0.3)" }}>
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-sm" style={{ color: "#8FA0B0" }}>
          <Link href={`/funeral-directors/${fd_id}`} className="flex items-center gap-1 transition-colors focus:outline-none rounded hover:opacity-80" style={{ color: "#8A5FAA" }}>
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            {fd!.name}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium" style={{ color: "#3F5E2C" }}>All reviews</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <section aria-label="Rating summary" className="rounded-2xl p-6 mb-6" style={{ background: "white", border: "0.5px solid rgba(143,160,176,0.3)" }}>
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="text-center sm:pr-6 shrink-0" style={{ borderRight: "0.5px solid rgba(143,160,176,0.3)" }}>
              <p className="text-5xl font-bold leading-none mb-2" style={{ color: "#5D3A7A" }}>
                {stats.avg > 0 ? stats.avg : "—"}
              </p>
              <StarRating rating={stats.avg} />
              <p className="text-xs mt-2" style={{ color: "#8FA0B0" }}>{stats.count} review{stats.count !== 1 ? "s" : ""}</p>
            </div>
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <RatingBar key={star} star={star} count={stats.distribution[star] ?? 0} total={stats.count} />
              ))}
            </div>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium" style={{ color: "#8FA0B0" }}>Filter:</span>
            <button
              type="button"
              onClick={() => setFilterRating(null)}
              className="text-xs px-3 py-1.5 rounded-full font-semibold transition-colors min-h-[44px] focus:outline-none"
              style={filterRating === null
                ? { background: "#5D3A7A", color: "white", border: "none" }
                : { background: "white", color: "#3F5E2C", border: "0.5px solid rgba(143,160,176,0.3)" }
              }
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
                  onClick={() => setFilterRating(filterRating === star ? null : star)}
                  className="text-xs px-3 py-1.5 rounded-full font-semibold transition-colors min-h-[44px] focus:outline-none"
                  style={filterRating === star
                    ? { background: "#5D3A7A", color: "white", border: "none" }
                    : { background: "white", color: "#3F5E2C", border: "0.5px solid rgba(143,160,176,0.3)" }
                  }
                >
                  {star}★ ({count})
                </button>
              );
            })}
          </div>
          <Link
            href={`/submit-review?fd=${fd_id}`}
            className="flex items-center gap-1.5 text-sm font-semibold hover:underline focus:outline-none rounded min-h-[44px]"
            style={{ color: "#8A5FAA" }}
          >
            <PenLine className="w-3.5 h-3.5" aria-hidden="true" />
            Leave a review
          </Link>
        </div>

        {displayed.length === 0 ? (
          <div className="p-8 text-center rounded-2xl" style={{ background: "white", border: "0.5px solid rgba(143,160,176,0.3)" }}>
            <p className="text-sm" style={{ color: "#8FA0B0" }}>No reviews at this rating yet.</p>
          </div>
        ) : (
          <div className="space-y-4" aria-label={`Reviews for ${fd!.name}`} aria-live="polite">
            {displayed.map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
        )}
      </div>
    </div>
  );
}
