"use client";

import { useState, useRef } from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  MapPin, Phone, Globe, CheckCircle, ArrowLeft, ChevronRight,
  PenLine, Star, Clock, LayoutGrid, CalendarDays,
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

/* ─────────────────────── Design tokens ─────────────────────── */
const DM = "var(--font-dm-sans), -apple-system, sans-serif";
const LAV = "#E3DFFF";
const LAV_BTN = "#4F34C4";
const STAR_C = "#F5C541";
const DARK = "#100B20";
const MED = "#4A415E";
const BDR = "#D5D0E4";

/* ─────────────────────── Helpers ─────────────────────── */

const REVIEW_MONTHS: Record<string, string> = {
  January: "01", February: "02", March: "03", April: "04",
  May: "05", June: "06", July: "07", August: "08",
  September: "09", October: "10", November: "11", December: "12",
};
function reviewDatetime(dateStr: string): string {
  const [m, y] = dateStr.split(" ");
  return REVIEW_MONTHS[m] && y ? `${y}-${REVIEW_MONTHS[m]}` : "";
}

const SERVICE_TYPE_LABELS: Record<string, string> = {
  cremation: "Cremation",
  burial: "Burial",
  direct_cremation: "Direct cremation",
};

const JS_DAY_TO_KEY = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

function getOpenStatus(fd: FuneralDirector): { open: boolean; label: string } {
  if (!fd.hours) return { open: false, label: "Hours not listed" };
  if (fd.hours.availability24hr) return { open: true, label: "24/7 — always available" };
  const now = new Date();
  const todayKey = JS_DAY_TO_KEY[now.getDay()];
  const day = fd.hours.schedule[todayKey];
  if (!day.open || !day.from || !day.to) return { open: false, label: "Closed today" };
  const [fh, fm] = day.from.split(":").map(Number);
  const [th, tm] = day.to.split(":").map(Number);
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const isOpen = nowMins >= fh * 60 + fm && nowMins < th * 60 + tm;
  const fmt = (h: number, m: number) => {
    const suffix = h < 12 ? "am" : "pm";
    const hr = h % 12 || 12;
    return m === 0 ? `${hr}${suffix}` : `${hr}:${String(m).padStart(2, "0")}${suffix}`;
  };
  return isOpen
    ? { open: true, label: `Open · closes ${fmt(th, tm)}` }
    : { open: false, label: `Closed · opens ${fmt(fh, fm)}` };
}

/* ─────────────────────── Sub-components ─────────────────────── */

const MapView = dynamic(() => import("@/components/search/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center" style={{ background: LAV }}>
      <div
        className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: LAV_BTN, borderTopColor: "transparent" }}
      />
    </div>
  ),
});

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const sz = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={sz}
          style={{
            color: s <= Math.round(rating) ? STAR_C : LAV,
            fill: s <= Math.round(rating) ? STAR_C : LAV,
          }}
        />
      ))}
    </span>
  );
}

const section = {
  background: "white",
  border: `1px solid ${BDR}`,
  borderRadius: "16px",
};

/* ─────────────────────── Page ─────────────────────── */

export default function FDProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const fd: FuneralDirector | undefined = funeralDirectors.find((f) => f.id === id);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  if (!fd) return notFound();

  const lowestPrice = getLowestPrice(fd);
  const gallery = [...(fd.gallery ?? [])].sort((a, b) => a.order - b.order);
  const uniqueServices = [...new Set(fd.prices.map((p) => p.type))];
  const openStatus = getOpenStatus(fd);

  const heroImages = gallery.length > 0
    ? gallery
    : [{ url: `https://picsum.photos/seed/${fd.id}-profile-hero/1200/520`, category: "exterior" as const, caption: fd.name, id: "fallback", order: 0 }];

  const scrollToGallery = () =>
    galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const replyHours = fd.hours?.oohResponseHours ?? 24;

  return (
    <div className="min-h-screen" style={{ background: "#FAFAFA", fontFamily: DM }}>

      {/* ════════════ Breadcrumb ════════════ */}
      <nav aria-label="Breadcrumb" style={{ background: "white", borderBottom: `1px solid ${BDR}` }}>
        <ol className="max-w-[1366px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm" style={{ color: MED }}>
          <li>
            <Link
              href="/search"
              className="flex items-center gap-1 hover:underline focus:outline-none focus-visible:ring-2 rounded"
              style={{ color: LAV_BTN }}
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              Search results
            </Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
          <li><span style={{ color: MED }}>{fd.city}</span></li>
          <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
          <li aria-current="page" className="font-medium truncate" style={{ color: DARK }}>{fd.name}</li>
        </ol>
      </nav>

      {/* ════════════ Two-column layout (starts right after breadcrumb, Lottie-style) ════════════ */}
      <div className="max-w-[1366px] mx-auto px-4 sm:px-6 pt-6 pb-10">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 flex flex-col gap-6">

          {/* ──────────── MAIN CONTENT (left 2/3) ──────────── */}
          <div className="lg:col-span-2 space-y-5">

            {/* ── Name / Badges / Rating ── */}
            <div>
              {/* Badge row */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                {fd.assured && <ValeAssuredBadge />}
                {fd.verified && (
                  <span
                    className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: LAV, color: LAV_BTN }}
                  >
                    <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    Verified
                  </span>
                )}
                {fd.hours && (
                  <span
                    className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                    style={openStatus.open
                      ? { background: "rgba(79,52,196,0.1)", color: LAV_BTN }
                      : { background: "rgba(226,107,94,0.1)", color: "#7A1F1A" }
                    }
                  >
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {openStatus.label}
                  </span>
                )}
              </div>

              {/* Name */}
              <h1
                className="text-3xl sm:text-4xl mb-3"
                style={{ color: DARK, fontFamily: DM, fontWeight: 700 }}
              >
                {fd.name}
              </h1>

              {/* Rating + location */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <div
                  className="flex items-center gap-2"
                  aria-label={`${fd.rating} out of 5 stars from ${fd.reviewCount} reviews`}
                >
                  <StarRating rating={fd.rating} />
                  <span className="text-sm font-semibold" style={{ color: DARK }}>{fd.rating}</span>
                  <span className="text-sm" style={{ color: MED }}>({fd.reviewCount} verified reviews)</span>
                </div>
                <span aria-hidden="true" style={{ color: LAV }}>·</span>
                <p className="text-sm flex items-center gap-1" style={{ color: MED }}>
                  <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  {fd.address}, {fd.city}, {fd.postcode}
                </p>
              </div>
            </div>

            {/* ── Hero Photo Grid ── */}
            {heroImages.length >= 2 ? (
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gridTemplateRows: "repeat(2, 1fr)",
                  gap: "6px",
                  height: "400px",
                }}
              >
                {/* Main image — spans both rows */}
                <div className="relative overflow-hidden" style={{ gridRow: "1 / span 2" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroImages[0].url}
                    alt={heroImages[0].caption ?? fd.name}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  {gallery.length > 0 && (
                    <button
                      onClick={scrollToGallery}
                      className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold shadow-md hover:opacity-95 transition-opacity"
                      style={{ background: "rgba(255,255,255,0.92)", color: DARK, backdropFilter: "blur(4px)" }}
                    >
                      <LayoutGrid className="w-4 h-4" aria-hidden="true" />
                      Show all {gallery.length} photos
                    </button>
                  )}
                </div>

                {/* Top-right thumbnail */}
                <div className="relative overflow-hidden rounded-tr-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroImages[1]?.url ?? heroImages[0].url}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Bottom-right thumbnail */}
                <div className="relative overflow-hidden rounded-br-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroImages[2]?.url ?? heroImages[0].url}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {gallery.length > 3 && (
                    <button
                      onClick={scrollToGallery}
                      className="absolute inset-0 flex items-center justify-center font-semibold text-base text-white hover:bg-black/50 transition-colors"
                      style={{ background: "rgba(0,0,0,0.38)" }}
                    >
                      +{gallery.length - 3} photos
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden" style={{ height: "400px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroImages[0].url}
                  alt={heroImages[0].caption ?? fd.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            )}

            {/* ── Overview ── */}
            <section style={section} className="p-6" aria-labelledby="overview-heading">
              <h2 id="overview-heading" className="text-xl font-bold mb-3" style={{ color: DARK }}>
                Overview
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: MED }}>
                {fd.description}
              </p>

              {/* Key stats grid */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5"
                style={{ borderTop: `1px solid ${BDR}` }}
              >
                {[
                  { value: fd.rating, label: "Overall rating" },
                  { value: fd.reviewCount, label: "Verified reviews" },
                  { value: uniqueServices.length, label: "Services offered" },
                  {
                    value: fd.hours?.availability24hr ? "24/7" : fd.hours?.oohResponseHours ? `${fd.hours.oohResponseHours}h` : "—",
                    label: fd.hours?.availability24hr ? "Availability" : "Response time",
                  },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <p className="text-2xl font-bold mb-0.5" style={{ color: DARK }}>{value}</p>
                    <p className="text-xs" style={{ color: MED }}>{label}</p>
                  </div>
                ))}
              </div>

              {/* Service chips */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {uniqueServices.map((svc) => (
                  <span
                    key={svc}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: LAV, color: LAV_BTN }}
                  >
                    {SERVICE_TYPE_LABELS[svc] ?? svc}
                  </span>
                ))}
              </div>

              {/* Contact at a glance */}
              <div className="flex flex-wrap gap-4 text-sm pt-4" style={{ borderTop: `1px solid ${BDR}` }}>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0" aria-hidden="true" style={{ color: MED }} />
                  <a href={`tel:${fd.phone}`} className="hover:underline" style={{ color: LAV_BTN }}>
                    {fd.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 shrink-0" aria-hidden="true" style={{ color: MED }} />
                  <a
                    href={`https://${fd.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline truncate"
                    style={{ color: LAV_BTN }}
                  >
                    {fd.website}
                  </a>
                </div>
              </div>

              {/* Accreditations */}
              {(fd.nafdVerified || fd.saifVerified || fd.bifdVerified || fd.iccmVerified) && (
                <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${BDR}` }}>
                  <AccreditationBadges fd={fd} />
                </div>
              )}
            </section>

            {/* ── Services & Pricing ── */}
            <section
              style={{ ...section, overflow: "hidden" }}
              aria-labelledby="pricing-heading"
            >
              {/* Header bar */}
              <div className="px-6 py-5" style={{ background: LAV_BTN }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 id="pricing-heading" className="text-white text-lg font-bold">
                      Services &amp; Pricing
                    </h2>
                    <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>
                      All prices include VAT · No hidden fees · CMA compliant
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap mt-0.5"
                    style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
                  >
                    From £{lowestPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "#FAFAFA", borderBottom: `1px solid ${BDR}` }}>
                      {["Service", "Type", "Price", "What's included"].map((h, i) => (
                        <th
                          key={h}
                          className={`px-6 py-3 font-semibold text-xs uppercase tracking-wider ${i === 2 ? "text-right" : "text-left"}`}
                          style={{ color: MED }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fd.prices.map((item, i) => {
                      const isBest = item.price === lowestPrice;
                      return (
                        <tr
                          key={i}
                          style={{
                            background: isBest
                              ? "rgba(79,52,196,0.06)"
                              : i % 2 === 0 ? "white" : "#FAFAFA",
                            borderBottom: `1px solid ${BDR}`,
                          }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium" style={{ color: MED }}>
                                {item.service}
                              </span>
                              {isBest && (
                                <span
                                  className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                                  style={{ background: LAV, color: LAV_BTN }}
                                >
                                  Best value
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4" style={{ color: MED }}>
                            {SERVICE_TYPE_LABELS[item.type] ?? item.type}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span
                              className="inline-block font-bold px-3 py-1 rounded-full"
                              style={isBest
                                ? { background: LAV, color: LAV_BTN }
                                : { background: "#F4F2F8", color: DARK }
                              }
                            >
                              £{item.price.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs leading-relaxed" style={{ color: MED }}>
                            {item.includes.join(" · ")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile price cards */}
              <div className="md:hidden" style={{ borderTop: `1px solid ${BDR}` }}>
                {fd.prices.map((item, i) => {
                  const isBest = item.price === lowestPrice;
                  return (
                    <div
                      key={i}
                      className="px-5 py-4"
                      style={{
                        background: isBest ? "rgba(79,52,196,0.06)" : "white",
                        borderBottom: `1px solid ${BDR}`,
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm" style={{ color: MED }}>
                              {item.service}
                            </span>
                            {isBest && (
                              <span
                                className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                                style={{ background: LAV, color: LAV_BTN }}
                              >
                                Best value
                              </span>
                            )}
                          </div>
                          <span className="text-xs mt-0.5 block" style={{ color: MED }}>
                            {SERVICE_TYPE_LABELS[item.type] ?? item.type}
                          </span>
                        </div>
                        <span
                          className="font-bold px-3 py-1 rounded-full shrink-0"
                          style={isBest
                            ? { background: LAV, color: LAV_BTN }
                            : { background: "#F4F2F8", color: DARK }
                          }
                        >
                          £{item.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: MED }}>
                        Includes: {item.includes.join(", ")}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="px-6 py-3" style={{ borderTop: `1px solid ${BDR}`, background: "#FAFAFA" }}>
                <p className="text-xs" style={{ color: MED }}>
                  Prices are CMA compliant. All costs shown include VAT. Last verified by Vale.
                </p>
              </div>
            </section>

            {/* ── Opening Hours ── */}
            {fd.hours && <OpeningHoursSection hours={fd.hours} />}

            {/* ── Reviews ── */}
            <section style={section} className="p-6" aria-labelledby="reviews-heading">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h2 id="reviews-heading" className="text-xl font-bold mb-1" style={{ color: DARK }}>
                    Reviews
                  </h2>
                  <div className="flex items-center gap-2" aria-label={`${fd.rating} out of 5 stars`}>
                    <StarRating rating={fd.rating} />
                    <span className="text-sm font-semibold" style={{ color: DARK }}>{fd.rating}</span>
                    <span className="text-sm" style={{ color: MED }}>({fd.reviewCount} verified reviews)</span>
                  </div>
                </div>
                <Link
                  href={`/submit-review?fd=${fd.id}`}
                  className="hidden sm:flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-80 transition-opacity shrink-0 min-h-[44px] focus:outline-none"
                  style={{ border: `1px solid ${BDR}`, color: DARK }}
                >
                  <PenLine className="w-3.5 h-3.5" aria-hidden="true" />
                  Leave a review
                </Link>
              </div>

              {/* Star distribution */}
              <div className="space-y-1.5 mb-6 pb-6" style={{ borderBottom: `1px solid ${BDR}` }}>
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = fd.reviews.filter((r) => r.rating === star).length;
                  const pct = fd.reviews.length > 0
                    ? Math.round((count / fd.reviews.length) * 100)
                    : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-xs w-4 shrink-0 text-right" style={{ color: MED }}>{star}</span>
                      <StarRating rating={star} size="sm" />
                      <div
                        className="flex-1 h-2 rounded-full overflow-hidden"
                        style={{ background: "rgba(227,223,255,0.35)" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, background: LAV_BTN }}
                          aria-hidden="true"
                        />
                      </div>
                      <span className="text-xs w-4 shrink-0" style={{ color: MED }}>{count}</span>
                    </div>
                  );
                })}
              </div>

              {/* Rating breakdown */}
              {fd.reviews.some(
                (r) => r.communicationRating || r.dignityRating || r.valueRating || r.facilitiesRating
              ) && (
                <div className="mb-6">
                  <RatingBreakdown reviews={fd.reviews} />
                </div>
              )}

              {/* Review cards */}
              <div className="space-y-4">
                {fd.reviews.slice(0, 3).map((review, i) => (
                  <article
                    key={i}
                    className="p-4 rounded-xl"
                    style={{ border: `1px solid ${BDR}` }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        {review.quoteRequestId && review.status === "booked" && (
                          <VerifiedFamilyLabel />
                        )}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm" style={{ color: MED }}>{review.name}</span>
                          {review.verified && (
                            <span
                              className="flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded-full"
                              style={{ background: LAV, color: LAV_BTN }}
                            >
                              <CheckCircle className="w-3 h-3" aria-hidden="true" />
                              Verified
                            </span>
                          )}
                        </div>
                        <time
                          dateTime={reviewDatetime(review.date)}
                          className="text-xs mt-0.5 block"
                          style={{ color: MED }}
                        >
                          {review.date}
                        </time>
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <blockquote className="text-sm leading-relaxed" style={{ color: MED }}>
                      &ldquo;{review.text}&rdquo;
                    </blockquote>
                    {(review.communicationRating ||
                      review.dignityRating ||
                      review.valueRating ||
                      review.facilitiesRating) && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {[
                          { label: "Communication", value: review.communicationRating },
                          { label: "Dignity", value: review.dignityRating },
                          { label: "Value", value: review.valueRating },
                          { label: "Facilities", value: review.facilitiesRating },
                        ]
                          .filter(({ value }) => value != null)
                          .map(({ label, value }) => (
                            <span
                              key={label}
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                background: "rgba(210,211,252,0.25)",
                                color: DARK,
                                border: "1px solid rgba(79,52,196,0.25)",
                              }}
                            >
                              {label}{" "}
                              <span style={{ color: LAV_BTN, fontWeight: 600 }}>
                                {value}/5
                              </span>
                            </span>
                          ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>

              <div
                className="mt-5 pt-5 flex items-center justify-between"
                style={{ borderTop: `1px solid ${BDR}` }}
              >
                <Link
                  href={`/reviews/${fd.id}`}
                  className="text-sm font-semibold hover:underline flex items-center gap-1 focus:outline-none rounded min-h-[44px]"
                  style={{ color: LAV_BTN }}
                >
                  View all {fd.reviewCount} reviews
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href={`/submit-review?fd=${fd.id}`}
                  className="sm:hidden flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-80 transition-opacity min-h-[44px] focus:outline-none"
                  style={{ border: `1px solid ${BDR}`, color: DARK }}
                >
                  <PenLine className="w-3.5 h-3.5" aria-hidden="true" />
                  Leave a review
                </Link>
              </div>
            </section>

            {/* ── Team ── */}
            {fd.team && fd.team.length > 0 && <TeamGrid team={fd.team} />}

            {/* ── Gallery ── */}
            {gallery.length > 0 && (
              <div ref={galleryRef}>
                <PhotoGallery photos={gallery} />
              </div>
            )}

            {/* ── Location & Map ── */}
            <section
              style={{ ...section, overflow: "hidden" }}
              aria-labelledby="location-heading"
            >
              <div className="px-6 py-5" style={{ borderBottom: `1px solid ${BDR}` }}>
                <h2 id="location-heading" className="text-xl font-bold mb-0.5" style={{ color: DARK }}>
                  Location
                </h2>
                <p className="text-sm" style={{ color: MED }}>
                  {fd.address}, {fd.city}, {fd.postcode}
                </p>
              </div>
              <div style={{ height: 280 }}>
                <MapView directors={[fd]} />
              </div>
              <div className="px-6 py-4 flex flex-wrap gap-4">
                <a href={`tel:${fd.phone}`} className="flex items-center gap-2 text-sm hover:underline" style={{ color: LAV_BTN }}>
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  {fd.phone}
                </a>
                <a
                  href={`https://${fd.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:underline"
                  style={{ color: LAV_BTN }}
                >
                  <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                  {fd.website}
                </a>
              </div>
            </section>
          </div>

          {/* ──────────── SIDEBAR (right 1/3) — sticky from the top, Lottie-style ──────────── */}
          <div className="space-y-4 lg:sticky lg:top-[80px] lg:self-start">

            {/* ── Contact CTA card ── */}
            <div style={{ ...section, overflow: "hidden" }}>
              {/* Header */}
              <div className="px-6 pt-6 pb-3">
                <h3 className="text-lg font-bold mb-0.5" style={{ color: DARK, fontFamily: DM }}>
                  Contact {fd.name}
                </h3>
                <p className="text-sm" style={{ color: MED }}>Choose how you&apos;d like to get in touch</p>
              </div>

              {/* Response time chip */}
              <div
                className="mx-5 mb-4 px-4 py-3 rounded-xl flex items-center gap-2.5"
                style={{ background: LAV }}
              >
                <Clock className="w-4 h-4 shrink-0" aria-hidden="true" style={{ color: LAV_BTN }} />
                <span className="text-sm font-medium" style={{ color: MED }}>
                  Usually replies within {replyHours === 1 ? "1 hour" : `${replyHours} hours`}
                </span>
              </div>

              <div className="px-5 pb-6 space-y-3">
                {/* Primary CTA */}
                <button
                  onClick={() => setQuoteOpen(true)}
                  className="w-full py-3.5 rounded-xl text-white font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ background: LAV_BTN, fontFamily: DM }}
                >
                  ✦ &nbsp;Request a quote
                </button>

                {/* Divider */}
                <p className="text-center text-xs py-0.5" style={{ color: "#AAAABC" }}>or</p>

                {/* Phone CTA */}
                <a
                  href={`tel:${fd.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors min-h-[44px] focus:outline-none hover:bg-[#E3DFFF]"
                  style={{ border: `1.5px solid ${LAV_BTN}`, color: LAV_BTN, fontFamily: DM }}
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Call {fd.phone}
                </a>

                {/* Review link */}
                <Link
                  href={`/submit-review?fd=${fd.id}`}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 text-sm hover:underline transition-opacity min-h-[44px] focus:outline-none"
                  style={{ color: LAV_BTN, fontFamily: DM }}
                >
                  <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
                  Submit a review
                </Link>
              </div>
            </div>

            {/* ── Availability quick view ── */}
            {fd.hours && (
              <div style={section} className="p-5">
                <h3
                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                  style={{ color: DARK }}
                >
                  Availability
                </h3>
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: openStatus.open ? "#3AA838" : "#E26B5E" }}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium" style={{ color: DARK }}>
                    {openStatus.label}
                  </span>
                </div>
                {fd.hours.availability24hr && (
                  <p className="text-xs" style={{ color: MED }}>
                    24/7 service — available at any hour, day or night.
                  </p>
                )}
                {fd.hours.oohPhone && !fd.hours.availability24hr && (
                  <p className="text-xs" style={{ color: MED }}>
                    Out-of-hours:{" "}
                    <a href={`tel:${fd.hours.oohPhone}`} className="hover:underline" style={{ color: LAV_BTN }}>
                      {fd.hours.oohPhone}
                    </a>
                  </p>
                )}
              </div>
            )}

            {/* ── Trust signals ── */}
            <div
              className="p-5 space-y-3 rounded-2xl"
              style={{ background: "rgba(227,223,255,0.15)", border: `1px solid ${BDR}` }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: DARK }}>
                Why trust this listing
              </p>
              <div className="space-y-2.5 text-sm">
                {[
                  "Prices verified by Vale team",
                  `${fd.reviewCount} reviews from real families`,
                  "CMA compliant transparent pricing",
                  ...(fd.assured ? ["Vale Assured — enhanced checks"] : []),
                  ...(fd.nafdVerified || fd.saifVerified
                    ? ["Member of a professional trade body"]
                    : []),
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2.5" style={{ color: MED }}>
                    <CheckCircle
                      className="w-4 h-4 shrink-0"
                      aria-hidden="true"
                      style={{ color: LAV_BTN }}
                    />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Price summary ── */}
            <div style={section} className="p-5">
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: DARK }}
              >
                Price summary
              </p>
              {fd.prices.map((item, i) => {
                const isBest = item.price === lowestPrice;
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2.5 text-sm"
                    style={{ borderBottom: `1px solid ${BDR}` }}
                  >
                    <span
                      className="truncate pr-3"
                      style={{ color: isBest ? DARK : MED, fontWeight: isBest ? 600 : 400 }}
                    >
                      {item.service}
                    </span>
                    <span className="font-bold shrink-0" style={{ color: isBest ? LAV_BTN : DARK }}>
                      £{item.price.toLocaleString()}
                    </span>
                  </div>
                );
              })}
              <p className="text-xs mt-3" style={{ color: MED }}>
                From{" "}
                <span className="font-semibold" style={{ color: DARK }}>
                  £{lowestPrice.toLocaleString()}
                </span>{" "}
                — all prices include VAT
              </p>
              <button
                onClick={() => setQuoteOpen(true)}
                className="w-full mt-4 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all focus:outline-none text-white"
                style={{ background: LAV_BTN, fontFamily: DM }}
              >
                Get a free quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky bottom bar ── */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center gap-3 px-4 py-3"
        style={{
          background: "white",
          borderTop: `1px solid ${BDR}`,
          boxShadow: "0 -4px 20px rgba(16,11,32,0.08)",
        }}
      >
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-wider" style={{ color: MED }}>From</p>
          <p className="font-bold text-lg leading-none" style={{ color: DARK }}>
            £{lowestPrice.toLocaleString()}
          </p>
        </div>
        <a
          href={`tel:${fd.phone}`}
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold min-h-[48px] focus:outline-none"
          style={{ border: `1.5px solid ${LAV_BTN}`, color: LAV_BTN }}
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          Call
        </a>
        <button
          onClick={() => setQuoteOpen(true)}
          className="flex-1 py-3 rounded-xl text-white text-sm font-bold min-h-[48px] hover:opacity-90 active:scale-[0.98] transition-all focus:outline-none"
          style={{ background: LAV_BTN, fontFamily: DM }}
        >
          Request a quote
        </button>
      </div>

      {/* Spacer for mobile sticky bar */}
      <div className="lg:hidden h-20" aria-hidden="true" />

      {/* Quote modal */}
      {quoteOpen && (
        <QuoteModal fdName={fd.name} fdId={fd.id} onClose={() => setQuoteOpen(false)} />
      )}
    </div>
  );
}
