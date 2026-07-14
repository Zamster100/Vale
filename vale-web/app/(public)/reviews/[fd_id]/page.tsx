"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, CheckCircle, PenLine, Star } from "lucide-react";
import { funeralDirectors } from "@/lib/data";
import VerifiedFamilyLabel from "@/components/reviews/VerifiedFamilyLabel";
import {
  getSeedReviews,
  getAllReviewsForFD,
  getReviewStats,
  formatReviewDate,
  type StoredReview,
} from "@/lib/reviews";

const EASE = [0.16, 1, 0.3, 1] as const;

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const sz = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={sz} style={{ color: s <= Math.round(rating) ? "#F5C541" : "#E3DFFF", fill: s <= Math.round(rating) ? "#F5C541" : "#E3DFFF" }} />
      ))}
    </span>
  );
}

function RatingBar({ star, count, total }: { star: number; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs w-6 shrink-0 text-right" style={{ color: "#4A415E" }}>{star}</span>
      <StarRating rating={star} size="sm" />
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(227,223,255,0.4)" }}
        role="img" aria-label={`${star} star: ${count} review${count !== 1 ? "s" : ""}`}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "#4F34C4" }} />
      </div>
      <span className="text-xs w-6 shrink-0" style={{ color: "#4A415E" }}>{count}</span>
    </div>
  );
}

function makeStaggerVariants(reduce: boolean | null) {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };
}

function ReviewCard({ review, variants }: { review: StoredReview; variants: ReturnType<typeof makeStaggerVariants> }) {
  return (
    <motion.article variants={variants} className="p-5 rounded-xl" style={{ background: "white", border: "1px solid #D5D0E4" }}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          {review.quoteRequestId && review.status === "booked" && <VerifiedFamilyLabel />}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm" style={{ color: "#4A415E" }}>{review.familyName}</span>
            {review.verified ? (
              <span className="flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "#E3DFFF", color: "#4F34C4" }}>
                <CheckCircle className="w-3 h-3" aria-hidden="true" />
                Verified
              </span>
            ) : (
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(226,107,94,0.1)", color: "#C95548" }}>
                Pending verification
              </span>
            )}
          </div>
          <time dateTime={review.createdAt} className="text-xs mt-0.5 block" style={{ color: "#4A415E" }}>
            {formatReviewDate(review.createdAt)}
          </time>
        </div>
        <div className="shrink-0"><StarRating rating={review.rating} size="sm" /></div>
      </div>
      {review.text && (
        <blockquote className="text-sm leading-relaxed" style={{ color: "#4A415E" }}>
          &ldquo;{review.text}&rdquo;
        </blockquote>
      )}
      {(review.communicationRating || review.dignityRating || review.valueRating || review.facilitiesRating) && (
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {[
            { label: "Communication", value: review.communicationRating },
            { label: "Dignity", value: review.dignityRating },
            { label: "Value", value: review.valueRating },
            { label: "Facilities", value: review.facilitiesRating },
          ].filter(({ value }) => value != null).map(({ label, value }) => (
            <span key={label} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(227,223,255,0.25)", color: "#100B20", border: "1px solid rgba(79,52,196,0.25)" }}>
              {label} <span style={{ color: "#F5C541", fontWeight: 600 }}>{value}/5</span>
            </span>
          ))}
        </div>
      )}
    </motion.article>
  );
}

export default function ReviewsPage({ params }: { params: Promise<{ fd_id: string }> }) {
  const { fd_id } = use(params);
  const fd = funeralDirectors.find((f) => f.id === fd_id);
  if (!fd) notFound();

  const seedReviews = getSeedReviews().filter((r) => r.fdId === fd_id);
  const [reviews, setReviews] = useState<StoredReview[]>(seedReviews);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => { setReviews(getAllReviewsForFD(fd_id)); }, [fd_id]);

  const stats = getReviewStats(reviews);
  const displayed = filterRating === null ? reviews : reviews.filter((r) => r.rating === filterRating);
  const cardVariants = makeStaggerVariants(reduce);
  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  };

  return (
    <div className="min-h-screen" style={{ background: "#FFFFFF" }}>
      <div style={{ background: "white", borderBottom: "1px solid #D5D0E4" }}>
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-sm" style={{ color: "#4A415E" }}>
          <Link href={`/funeral-directors/${fd_id}`} className="flex items-center gap-1 transition-colors focus:outline-none rounded hover:opacity-80" style={{ color: "#4F34C4" }}>
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            {fd!.name}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium" style={{ color: "#4A415E" }}>All reviews</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <motion.section
          aria-label="Rating summary"
          className="rounded-xl p-6 mb-6"
          style={{ background: "white", border: "1px solid #D5D0E4" }}
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="text-center sm:pr-6 shrink-0" style={{ borderRight: "1px solid #D5D0E4" }}>
              <p className="text-5xl font-light leading-none mb-2" style={{ color: "#100B20" }}>
                {stats.avg > 0 ? stats.avg : "—"}
              </p>
              <StarRating rating={stats.avg} />
              <p className="text-xs mt-2" style={{ color: "#4A415E" }}>{stats.count} review{stats.count !== 1 ? "s" : ""}</p>
            </div>
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <RatingBar key={star} star={star} count={stats.distribution[star] ?? 0} total={stats.count} />
              ))}
            </div>
          </div>
        </motion.section>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium" style={{ color: "#4A415E" }}>Filter:</span>
            <button
              type="button"
              onClick={() => setFilterRating(null)}
              className="text-xs px-3 py-1.5 rounded-full font-semibold transition-colors min-h-[44px] focus:outline-none"
              style={filterRating === null
                ? { background: "#4F34C4", color: "white", border: "none" }
                : { background: "white", color: "#4A415E", border: "1px solid #D5D0E4" }
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
                    ? { background: "#4F34C4", color: "white", border: "none" }
                    : { background: "white", color: "#4A415E", border: "1px solid #D5D0E4" }
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
            style={{ color: "#4F34C4" }}
          >
            <PenLine className="w-3.5 h-3.5" aria-hidden="true" />
            Leave a review
          </Link>
        </div>

        {displayed.length === 0 ? (
          <div className="p-8 text-center rounded-xl" style={{ background: "white", border: "1px solid #D5D0E4" }}>
            <p className="text-sm" style={{ color: "#4A415E" }}>No reviews at this rating yet.</p>
          </div>
        ) : (
          <motion.div
            className="space-y-4"
            aria-label={`Reviews for ${fd!.name}`}
            aria-live="polite"
            key={filterRating ?? "all"}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {displayed.map((r) => <ReviewCard key={r.id} review={r} variants={cardVariants} />)}
          </motion.div>
        )}
      </div>
    </div>
  );
}
