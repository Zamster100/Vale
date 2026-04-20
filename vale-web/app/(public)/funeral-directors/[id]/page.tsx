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
} from "lucide-react";
import { funeralDirectors, getLowestPrice, type FuneralDirector } from "@/lib/data";
import QuoteModal from "@/components/QuoteModal";
import StarRating from "@/components/StarRating";
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
    <div className="w-full h-full bg-[#f3f4f6] flex items-center justify-center">
      <p className="text-[#6b7280] text-sm">Loading map…</p>
    </div>
  ),
});

const SERVICE_TYPE_LABELS: Record<string, string> = {
  cremation: "Cremation",
  burial: "Burial",
  direct_cremation: "Direct cremation",
};

export default function FDProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const fd: FuneralDirector | undefined = funeralDirectors.find((f) => f.id === id);
  const [quoteOpen, setQuoteOpen] = useState(false);

  if (!fd) return notFound();

  const lowestPrice = getLowestPrice(fd);
  const lowestPriceValue = Math.min(...fd.prices.map((p) => p.price));

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-[#e5e7eb]">
        <ol className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-[#6b7280]">
          <li>
            <Link
              href="/search"
              className="hover:text-[#1a3a52] flex items-center gap-1 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              Search results
            </Link>
          </li>
          <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
          <li aria-current="page" className="text-[#111827] font-medium truncate">{fd.name}</li>
        </ol>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile header */}
            <div className="bg-white border border-[#e5e7eb] rounded-lg p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  {/* Badges row */}
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    {fd.assured && (
                      <span className="flex items-center gap-1 bg-[#d4a574] text-[#1a3a52] text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                        <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                        Assured
                      </span>
                    )}
                    {fd.verified && (
                      <span className="flex items-center gap-1 bg-[#f0fdf4] text-[#065f46] text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                        <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        Verified
                      </span>
                    )}
                    {fd.assured && (
                      <span className="text-xs text-[#6b7280] bg-[#f3f4f6] px-2.5 py-1 rounded font-medium">
                        NAFD Member
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-[#6b7280] bg-[#f3f4f6] px-2.5 py-1 rounded font-medium">
                      <Users className="w-3 h-3" aria-hidden="true" />
                      Verified by {fd.reviewCount} families
                    </span>
                  </div>

                  <h1 className="mb-2 text-2xl">{fd.name}</h1>
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={fd.rating} />
                    <span className="text-sm font-semibold text-[#1a3a52]">{fd.rating}</span>
                    <span className="text-sm text-[#6b7280]">({fd.reviewCount} verified reviews)</span>
                  </div>
                  <p className="text-[#6b7280] text-sm leading-relaxed">{fd.description}</p>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-[#e5e7eb] grid sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#6b7280] mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-[#111827]">{fd.address}<br />{fd.postcode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#6b7280] shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${fd.phone}`}
                    className="text-[#1a3a52] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded"
                  >
                    {fd.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#6b7280] shrink-0" aria-hidden="true" />
                  <a
                    href={`https://${fd.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1a3a52] hover:underline truncate focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded"
                  >
                    {fd.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Price table */}
            <div className="bg-white border border-[#e5e7eb] rounded-lg shadow-sm overflow-hidden">
              <div className="bg-[#1a3a52] px-6 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-white text-base font-semibold">Price list</h2>
                    <p className="text-[#b8cdd9] text-sm mt-0.5">All prices include VAT. No hidden fees.</p>
                  </div>
                  <span className="text-xs bg-white/10 text-[#b8cdd9] px-2.5 py-1 rounded font-medium whitespace-nowrap mt-0.5">
                    CMA compliant
                  </span>
                </div>
              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                      <th className="text-left px-6 py-3 text-[#6b7280] font-semibold">Service</th>
                      <th className="text-left px-6 py-3 text-[#6b7280] font-semibold">Type</th>
                      <th className="text-right px-6 py-3 text-[#6b7280] font-semibold">Price</th>
                      <th className="text-left px-6 py-3 text-[#6b7280] font-semibold">What&apos;s included</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fd.prices.map((item, i) => {
                      const isBest = item.price === lowestPriceValue;
                      return (
                        <tr
                          key={i}
                          className={`border-b border-[#e5e7eb] last:border-0 transition-colors ${
                            isBest ? "bg-[#fdf8f2]" : i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-[#111827]">{item.service}</span>
                              {isBest && (
                                <span className="text-xs font-semibold text-[#92400e] bg-[#fef3c7] px-1.5 py-0.5 rounded">
                                  Best value
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[#6b7280]">
                            {SERVICE_TYPE_LABELS[item.type] ?? item.type}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className={`inline-block font-bold px-3 py-1 rounded ${isBest ? "bg-[#d4a574]/20 text-[#1a3a52]" : "bg-[#faf6f1] text-[#1a3a52]"}`}>
                              £{item.price.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[#6b7280] text-xs leading-relaxed">
                            {item.includes.join(" · ")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile price cards */}
              <div className="md:hidden divide-y divide-[#e5e7eb]">
                {fd.prices.map((item, i) => {
                  const isBest = item.price === lowestPriceValue;
                  return (
                    <div key={i} className={`px-5 py-4 ${isBest ? "bg-[#fdf8f2]" : ""}`}>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-[#111827] text-sm">{item.service}</span>
                            {isBest && (
                              <span className="text-xs font-semibold text-[#92400e] bg-[#fef3c7] px-1.5 py-0.5 rounded">
                                Best value
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#6b7280] mt-0.5 block">
                            {SERVICE_TYPE_LABELS[item.type] ?? item.type}
                          </span>
                        </div>
                        <span className={`font-bold text-[#1a3a52] px-3 py-1 rounded shrink-0 ${isBest ? "bg-[#d4a574]/20" : "bg-[#faf6f1]"}`}>
                          £{item.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-[#6b7280] leading-relaxed">
                        Includes: {item.includes.join(", ")}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="px-6 py-3 border-t border-[#e5e7eb] bg-[#f9fafb]">
                <p className="text-xs text-[#6b7280]">
                  Prices are compliant with the Competition and Markets Authority (CMA) transparency requirements. All costs shown include VAT.
                </p>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white border border-[#e5e7eb] rounded-lg p-6 shadow-sm">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-lg mb-1">Reviews</h2>
                  <div className="flex items-center gap-2">
                    <StarRating rating={fd.rating} />
                    <span className="text-sm font-semibold text-[#1a3a52]">
                      {fd.rating}
                    </span>
                    <span className="text-sm text-[#6b7280]">
                      ({fd.reviewCount} verified reviews)
                    </span>
                  </div>
                </div>
                <Link
                  href={`/submit-review?fd=${fd.id}`}
                  className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#1a3a52] border border-[#d1d5db] px-3 py-2 rounded hover:bg-[#f3f4f6] active:bg-[#e5e7eb] transition-colors duration-200 shrink-0 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574]"
                >
                  <PenLine className="w-3.5 h-3.5" aria-hidden="true" />
                  Leave a review
                </Link>
              </div>

              {/* Rating distribution */}
              <div className="space-y-1.5 mb-6 pb-6 border-b border-[#e5e7eb]">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = fd.reviews.filter((r) => r.rating === star).length;
                  const pct =
                    fd.reviews.length > 0
                      ? Math.round((count / fd.reviews.length) * 100)
                      : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-xs text-[#6b7280] w-4 shrink-0 text-right">
                        {star}
                      </span>
                      <StarRating rating={star} size="sm" />
                      <div className="flex-1 h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#d4a574] rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                          aria-hidden="true"
                        />
                      </div>
                      <span className="text-xs text-[#6b7280] w-4 shrink-0">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Recent reviews (top 3) */}
              <div className="space-y-4">
                {fd.reviews.slice(0, 3).map((review, i) => (
                  <article key={i} className="border border-[#e5e7eb] rounded-lg p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-[#111827]">
                            {review.name}
                          </span>
                          {review.verified && (
                            <span className="flex items-center gap-1 text-xs font-semibold text-[#065f46] bg-[#d1fae5] px-1.5 py-0.5 rounded">
                              <CheckCircle className="w-3 h-3" aria-hidden="true" />
                              Verified
                            </span>
                          )}
                        </div>
                        <time
                          dateTime={reviewDatetime(review.date)}
                          className="text-xs text-[#6b7280] mt-0.5 block"
                        >
                          {review.date}
                        </time>
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <blockquote className="text-sm text-[#374151] leading-relaxed">
                      &ldquo;{review.text}&rdquo;
                    </blockquote>
                  </article>
                ))}
              </div>

              {/* View all link */}
              <div className="mt-5 pt-5 border-t border-[#e5e7eb] flex items-center justify-between">
                <Link
                  href={`/reviews/${fd.id}`}
                  className="text-sm font-semibold text-[#1a3a52] hover:underline flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded min-h-[44px]"
                >
                  View all {fd.reviewCount} reviews
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href={`/submit-review?fd=${fd.id}`}
                  className="sm:hidden flex items-center gap-1.5 text-sm font-semibold text-[#1a3a52] border border-[#d1d5db] px-3 py-2 rounded hover:bg-[#f3f4f6] active:bg-[#e5e7eb] transition-colors duration-200 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574]"
                >
                  <PenLine className="w-3.5 h-3.5" aria-hidden="true" />
                  Leave a review
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            {/* CTA card */}
            <div className="bg-white border border-[#e5e7eb] rounded-lg p-6 shadow-sm">
              <h3 className="mb-1">Interested in {fd.name}?</h3>
              <p className="text-sm text-[#6b7280] mb-4 leading-relaxed">
                Request a free, no-obligation quote. They&apos;ll be in touch within 24 hours.
              </p>
              <button
                onClick={() => setQuoteOpen(true)}
                className="w-full bg-[#1a3a52] text-white py-3 rounded font-semibold text-sm hover:bg-[#0f2438] active:bg-[#081929] transition-colors duration-200 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
              >
                Request a quote
              </button>
              <a
                href={`tel:${fd.phone}`}
                className="mt-3 w-full flex items-center justify-center gap-2 border border-[#d1d5db] text-[#111827] py-2.5 rounded text-sm font-semibold hover:bg-[#f9fafb] active:bg-[#f3f4f6] transition-colors duration-200 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
              >
                <Phone className="w-4 h-4 text-[#6b7280]" aria-hidden="true" />
                Call {fd.phone}
              </a>
            </div>

            {/* Trust signals */}
            <div className="bg-[#faf6f1] border border-[#e5e7eb] rounded-lg p-5 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
                Why trust this listing
              </p>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center gap-2.5 text-[#374151]">
                  <CheckCircle className="w-4 h-4 text-[#059669] shrink-0" aria-hidden="true" />
                  Prices verified by VALE team
                </div>
                <div className="flex items-center gap-2.5 text-[#374151]">
                  <CheckCircle className="w-4 h-4 text-[#059669] shrink-0" aria-hidden="true" />
                  {fd.reviewCount} reviews from real families
                </div>
                <div className="flex items-center gap-2.5 text-[#374151]">
                  <CheckCircle className="w-4 h-4 text-[#059669] shrink-0" aria-hidden="true" />
                  CMA compliant transparent pricing
                </div>
                {fd.assured && (
                  <div className="flex items-center gap-2.5 text-[#374151]">
                    <ShieldCheck className="w-4 h-4 text-[#d4a574] shrink-0" aria-hidden="true" />
                    VALE Assured — enhanced checks
                  </div>
                )}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white border border-[#e5e7eb] rounded-lg overflow-hidden shadow-sm">
              <div className="p-4 border-b border-[#e5e7eb]">
                <p className="text-sm font-semibold text-[#111827]">{fd.address}</p>
                <p className="text-xs text-[#6b7280] mt-0.5">{fd.postcode}, {fd.city}</p>
              </div>
              <div style={{ height: 220 }}>
                <MapView directors={[fd]} />
              </div>
            </div>

            {/* Price summary */}
            <div className="bg-white border border-[#e5e7eb] rounded-lg p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6b7280] mb-3">Price summary</p>
              {fd.prices.map((item, i) => {
                const isBest = item.price === lowestPriceValue;
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between py-2 text-sm border-b border-[#f3f4f6] last:border-0 ${isBest ? "text-[#92400e]" : ""}`}
                  >
                    <span className={`truncate pr-4 ${isBest ? "font-semibold" : "text-[#111827]"}`}>
                      {item.service}
                    </span>
                    <span className={`font-bold shrink-0 ${isBest ? "text-[#92400e]" : "text-[#1a3a52]"}`}>
                      £{item.price.toLocaleString()}
                    </span>
                  </div>
                );
              })}
              <p className="text-xs text-[#6b7280] mt-3">
                From <span className="font-semibold text-[#1a3a52]">£{lowestPrice.toLocaleString()}</span> — all prices include VAT
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
