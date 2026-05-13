"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Globe,
  CheckCircle,
  ArrowLeft,
  ChevronRight,
  PenLine,
  ShieldCheck,
  Users,
  Star,
} from "lucide-react";
import { funeralDirectors, getLowestPrice, type FuneralDirector } from "@/lib/data";
import QuoteModal from "@/components/QuoteModal";
import PhotoGallery from "@/components/fd/PhotoGallery";
import TeamGrid from "@/components/fd/TeamGrid";
import AccreditationBadges from "@/components/fd/AccreditationBadges";
import OpeningHoursSection from "@/components/fd/OpeningHours";
import RatingBreakdown from "@/components/fd/RatingBreakdown";
import ValeAssuredBadge from "@/components/ValeAssuredBadge";
import VerifiedFamilyLabel from "@/components/reviews/VerifiedFamilyLabel";
import { use } from "react";

const REVIEW_MONTHS: Record<string, string> = {
  January: "01", February: "02", March: "03", April: "04",
  May: "05", June: "06", July: "07", August: "08",
  September: "09", October: "10", November: "11", December: "12",
};
function reviewDatetime(dateStr: string): string {
  const [m, y] = dateStr.split(" ");
  return REVIEW_MONTHS[m] && y ? `${y}-${REVIEW_MONTHS[m]}` : "";
}

const MapView = dynamic(() => import("@/components/search/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center" style={{ background: "#EAF2EE" }}>
      <p className="text-sm" style={{ color: "#5F7080" }}>Loading map…</p>
    </div>
  ),
});

const SERVICE_TYPE_LABELS: Record<string, string> = {
  cremation: "Cremation",
  burial: "Burial",
  direct_cremation: "Direct cremation",
};

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const sz = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={sz}
          style={{
            color: s <= Math.round(rating) ? "#E26B5E" : "#EAF2EE",
            fill: s <= Math.round(rating) ? "#E26B5E" : "#EAF2EE",
          }}
        />
      ))}
    </span>
  );
}

const card = {
  background: "white",
  border: "1px solid #E8E2D8",
  borderRadius: "12px",
};

export default function FDProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const fd: FuneralDirector | undefined = funeralDirectors.find((f) => f.id === id);
  const [quoteOpen, setQuoteOpen] = useState(false);

  if (!fd) return notFound();

  const lowestPrice = getLowestPrice(fd);
  const lowestPriceValue = Math.min(...fd.prices.map((p) => p.price));

  return (
    <div className="min-h-screen" style={{ background: "#F7F3EE" }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ background: "white", borderBottom: "1px solid #E8E2D8" }}>
        <ol className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-sm" style={{ color: "#5F7080" }}>
          <li>
            <Link
              href="/search"
              className="flex items-center gap-1 transition-colors focus:outline-none focus-visible:ring-2 rounded"
              style={{ color: "#5E8B73" }}
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              Search results
            </Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
          <li aria-current="page" className="font-medium truncate" style={{ color: "#5A4E44" }}>{fd.name}</li>
        </ol>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Profile header */}
            <div style={card} className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    {fd.assured && <ValeAssuredBadge />}
                    {fd.verified && (
                      <span
                        className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(123,168,74,0.12)", color: "#1F4A0E" }}
                      >
                        <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        Verified
                      </span>
                    )}
                    <span
                      className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: "rgba(234,242,238,0.4)", color: "#5F7080" }}
                    >
                      <Users className="w-3 h-3" aria-hidden="true" />
                      Verified by {fd.reviewCount} families
                    </span>
                  </div>

                  <h1 className="mb-2 text-2xl" style={{ color: "#1C1F2A" }}>{fd.name}</h1>
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={fd.rating} />
                    <span className="text-sm font-semibold" style={{ color: "#1C1F2A" }}>{fd.rating}</span>
                    <span className="text-sm" style={{ color: "#5F7080" }}>({fd.reviewCount} verified reviews)</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#5F7080" }}>{fd.description}</p>

                  {(fd.nafdVerified || fd.saifVerified || fd.bifdVerified || fd.iccmVerified) && (
                    <div className="mt-4">
                      <AccreditationBadges fd={fd} />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-5 grid sm:grid-cols-3 gap-4 text-sm" style={{ borderTop: "1px solid #E8E2D8" }}>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" style={{ color: "#5F7080" }} />
                  <span style={{ color: "#5A4E44" }}>{fd.address}<br />{fd.postcode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0" aria-hidden="true" style={{ color: "#5F7080" }} />
                  <a href={`tel:${fd.phone}`} className="hover:underline focus:outline-none rounded" style={{ color: "#5E8B73" }}>
                    {fd.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 shrink-0" aria-hidden="true" style={{ color: "#5F7080" }} />
                  <a
                    href={`https://${fd.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline truncate focus:outline-none rounded"
                    style={{ color: "#5E8B73" }}
                  >
                    {fd.website}
                  </a>
                </div>
              </div>

            </div>

            {/* Opening hours */}
            {fd.hours && <OpeningHoursSection hours={fd.hours} />}

            {/* Price table */}
            <div style={{ ...card, overflow: "hidden" }}>
              <div className="px-6 py-4" style={{ background: "#1C1F2A" }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-white text-base font-semibold">Price list</h2>
                    <p className="text-sm mt-0.5" style={{ color: "rgba(245,241,232,0.7)" }}>All prices include VAT. No hidden fees.</p>
                  </div>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap mt-0.5"
                    style={{ background: "rgba(255,255,255,0.12)", color: "rgba(245,241,232,0.8)" }}
                  >
                    CMA compliant
                  </span>
                </div>
              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "#F7F3EE", borderBottom: "1px solid #E8E2D8" }}>
                      <th className="text-left px-6 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: "#5F7080" }}>Service</th>
                      <th className="text-left px-6 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: "#5F7080" }}>Type</th>
                      <th className="text-right px-6 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: "#5F7080" }}>Price</th>
                      <th className="text-left px-6 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: "#5F7080" }}>What&apos;s included</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fd.prices.map((item, i) => {
                      const isBest = item.price === lowestPriceValue;
                      return (
                        <tr
                          key={i}
                          style={{
                            background: isBest ? "rgba(94,139,115,0.05)" : i % 2 === 0 ? "white" : "#F7F3EE",
                            borderBottom: "1px solid #E8E2D8",
                          }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium" style={{ color: "#5A4E44" }}>{item.service}</span>
                              {isBest && (
                                <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(123,168,74,0.15)", color: "#1F4A0E" }}>
                                  Best value
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4" style={{ color: "#5F7080" }}>
                            {SERVICE_TYPE_LABELS[item.type] ?? item.type}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span
                              className="inline-block font-bold px-3 py-1 rounded-full"
                              style={isBest
                                ? { background: "rgba(94,139,115,0.12)", color: "#1C1F2A" }
                                : { background: "rgba(234,242,238,0.3)", color: "#1C1F2A" }
                              }
                            >
                              £{item.price.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs leading-relaxed" style={{ color: "#5F7080" }}>
                            {item.includes.join(" · ")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile price cards */}
              <div className="md:hidden" style={{ borderTop: "1px solid #E8E2D8" }}>
                {fd.prices.map((item, i) => {
                  const isBest = item.price === lowestPriceValue;
                  return (
                    <div
                      key={i}
                      className="px-5 py-4"
                      style={{
                        background: isBest ? "rgba(94,139,115,0.05)" : "white",
                        borderBottom: "1px solid #E8E2D8",
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm" style={{ color: "#5A4E44" }}>{item.service}</span>
                            {isBest && (
                              <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(123,168,74,0.15)", color: "#1F4A0E" }}>
                                Best value
                              </span>
                            )}
                          </div>
                          <span className="text-xs mt-0.5 block" style={{ color: "#5F7080" }}>
                            {SERVICE_TYPE_LABELS[item.type] ?? item.type}
                          </span>
                        </div>
                        <span
                          className="font-bold px-3 py-1 rounded-full shrink-0"
                          style={isBest
                            ? { background: "rgba(94,139,115,0.12)", color: "#1C1F2A" }
                            : { background: "rgba(234,242,238,0.3)", color: "#1C1F2A" }
                          }
                        >
                          £{item.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "#5F7080" }}>
                        Includes: {item.includes.join(", ")}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="px-6 py-3" style={{ borderTop: "1px solid #E8E2D8", background: "#F7F3EE" }}>
                <p className="text-xs" style={{ color: "#5F7080" }}>
                  Prices are compliant with CMA transparency requirements. All costs shown include VAT.
                </p>
              </div>
            </div>

            {/* Gallery */}
            {fd.gallery && fd.gallery.length > 0 && (
              <PhotoGallery photos={fd.gallery} />
            )}

            {/* Reviews */}
            <div style={card} className="p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-lg mb-1" style={{ color: "#1C1F2A" }}>Reviews</h2>
                  <div className="flex items-center gap-2">
                    <StarRating rating={fd.rating} />
                    <span className="text-sm font-semibold" style={{ color: "#1C1F2A" }}>{fd.rating}</span>
                    <span className="text-sm" style={{ color: "#5F7080" }}>({fd.reviewCount} verified reviews)</span>
                  </div>
                </div>
                <Link
                  href={`/submit-review?fd=${fd.id}`}
                  className="hidden sm:flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full hover:opacity-80 transition-opacity shrink-0 min-h-[44px] focus:outline-none"
                  style={{ border: "1px solid #E8E2D8", color: "#1C1F2A" }}
                >
                  <PenLine className="w-3.5 h-3.5" aria-hidden="true" />
                  Leave a review
                </Link>
              </div>

              {/* Rating distribution */}
              <div className="space-y-1.5 mb-6 pb-6" style={{ borderBottom: "1px solid #E8E2D8" }}>
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = fd.reviews.filter((r) => r.rating === star).length;
                  const pct = fd.reviews.length > 0 ? Math.round((count / fd.reviews.length) * 100) : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-xs w-4 shrink-0 text-right" style={{ color: "#5F7080" }}>{star}</span>
                      <StarRating rating={star} size="sm" />
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(234,242,238,0.4)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, background: "#1C1F2A" }}
                          aria-hidden="true"
                        />
                      </div>
                      <span className="text-xs w-4 shrink-0" style={{ color: "#5F7080" }}>{count}</span>
                    </div>
                  );
                })}
              </div>

              {/* Rating breakdown */}
              {fd.reviews.some((r) => r.communicationRating || r.dignityRating || r.valueRating || r.facilitiesRating) && (
                <div className="mb-6">
                  <RatingBreakdown reviews={fd.reviews} />
                </div>
              )}

              {/* Recent reviews */}
              <div className="space-y-4">
                {fd.reviews.slice(0, 3).map((review, i) => (
                  <article
                    key={i}
                    className="p-4 rounded-xl"
                    style={{ border: "1px solid #E8E2D8" }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        {review.quoteRequestId && review.status === "booked" && (
                          <VerifiedFamilyLabel />
                        )}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm" style={{ color: "#5A4E44" }}>{review.name}</span>
                          {review.verified && (
                            <span
                              className="flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded-full"
                              style={{ background: "rgba(123,168,74,0.15)", color: "#1F4A0E" }}
                            >
                              <CheckCircle className="w-3 h-3" aria-hidden="true" />
                              Verified
                            </span>
                          )}
                        </div>
                        <time dateTime={reviewDatetime(review.date)} className="text-xs mt-0.5 block" style={{ color: "#5F7080" }}>
                          {review.date}
                        </time>
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <blockquote className="text-sm leading-relaxed" style={{ color: "#5A4E44" }}>
                      &ldquo;{review.text}&rdquo;
                    </blockquote>
                    {(review.communicationRating || review.dignityRating || review.valueRating || review.facilitiesRating) && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {[
                          { label: "Communication", value: review.communicationRating },
                          { label: "Dignity", value: review.dignityRating },
                          { label: "Value", value: review.valueRating },
                          { label: "Facilities", value: review.facilitiesRating },
                        ].filter(({ value }) => value != null).map(({ label, value }) => (
                          <span key={label} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(212,165,116,0.1)", color: "#1C1F2A", border: "1px solid rgba(212,165,116,0.3)" }}>
                            {label} <span style={{ color: "#C4975A", fontWeight: 600 }}>{value}/5</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>

              <div className="mt-5 pt-5 flex items-center justify-between" style={{ borderTop: "1px solid #E8E2D8" }}>
                <Link
                  href={`/reviews/${fd.id}`}
                  className="text-sm font-semibold hover:underline flex items-center gap-1 focus:outline-none rounded min-h-[44px]"
                  style={{ color: "#5E8B73" }}
                >
                  View all {fd.reviewCount} reviews
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href={`/submit-review?fd=${fd.id}`}
                  className="sm:hidden flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full hover:opacity-80 transition-opacity min-h-[44px] focus:outline-none"
                  style={{ border: "1px solid #E8E2D8", color: "#1C1F2A" }}
                >
                  <PenLine className="w-3.5 h-3.5" aria-hidden="true" />
                  Leave a review
                </Link>
              </div>
            </div>

            {/* Team */}
            {fd.team && fd.team.length > 0 && (
              <TeamGrid team={fd.team} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            {/* CTA card */}
            <div style={card} className="p-6">
              <h3 className="mb-1 text-base font-semibold" style={{ color: "#1C1F2A" }}>Interested in {fd.name}?</h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: "#5F7080" }}>
                Request a free, no-obligation quote. They&apos;ll be in touch within 24 hours.
              </p>
              <button
                onClick={() => setQuoteOpen(true)}
                className="w-full text-white py-3 rounded-md font-semibold text-sm hover:scale-[1.03] active:scale-[0.98] transition-transform min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ background: "#1C1F2A" }}
              >
                Request a quote
              </button>
              <a
                href={`tel:${fd.phone}`}
                className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold hover:opacity-80 transition-opacity min-h-[44px] focus:outline-none"
                style={{ border: "1px solid #E8E2D8", color: "#5A4E44" }}
              >
                <Phone className="w-4 h-4" aria-hidden="true" style={{ color: "#5F7080" }} />
                Call {fd.phone}
              </a>
            </div>

            {/* Trust signals */}
            <div
              className="p-5 space-y-3 rounded-xl"
              style={{ background: "rgba(234,242,238,0.25)", border: "1px solid #E8E2D8" }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#1C1F2A" }}>
                Why trust this listing
              </p>
              <div className="space-y-2.5 text-sm">
                {[
                  `Prices verified by Vale team`,
                  `${fd.reviewCount} reviews from real families`,
                  `CMA compliant transparent pricing`,
                  ...(fd.assured ? ["Vale Assured — enhanced checks"] : []),
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2.5" style={{ color: "#5A4E44" }}>
                    {i === 3 && fd.assured
                      ? <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" style={{ color: "#5E8B73" }} />
                      : <CheckCircle className="w-4 h-4 shrink-0" aria-hidden="true" style={{ color: "#7BA84A" }} />
                    }
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div style={{ ...card, overflow: "hidden" }}>
              <div className="p-4" style={{ borderBottom: "1px solid #E8E2D8" }}>
                <p className="text-sm font-semibold" style={{ color: "#5A4E44" }}>{fd.address}</p>
                <p className="text-xs mt-0.5" style={{ color: "#5F7080" }}>{fd.postcode}, {fd.city}</p>
              </div>
              <div style={{ height: 220 }}>
                <MapView directors={[fd]} />
              </div>
            </div>

            {/* Price summary */}
            <div style={card} className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#1C1F2A" }}>Price summary</p>
              {fd.prices.map((item, i) => {
                const isBest = item.price === lowestPriceValue;
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 text-sm"
                    style={{ borderBottom: "1px solid #E8E2D8" }}
                  >
                    <span className="truncate pr-4" style={{ color: isBest ? "#1C1F2A" : "#5A4E44", fontWeight: isBest ? 600 : 400 }}>
                      {item.service}
                    </span>
                    <span className="font-bold shrink-0" style={{ color: "#1C1F2A" }}>
                      £{item.price.toLocaleString()}
                    </span>
                  </div>
                );
              })}
              <p className="text-xs mt-3" style={{ color: "#5F7080" }}>
                From <span className="font-semibold" style={{ color: "#1C1F2A" }}>£{lowestPrice.toLocaleString()}</span> — all prices include VAT
              </p>
            </div>
          </div>
        </div>
      </div>

      {quoteOpen && (
        <QuoteModal fdName={fd.name} fdId={fd.id} onClose={() => setQuoteOpen(false)} />
      )}
    </div>
  );
}
