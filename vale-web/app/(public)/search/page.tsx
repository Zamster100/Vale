"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
  MapPin,
  Star,
  CheckCircle,
  Search,
  Phone,
  ChevronDown,
  Map,
  List,
  ShieldCheck,
  SlidersHorizontal,
  Bookmark,
  X,
  Share2,
} from "lucide-react";
import ValeAssuredBadge from "@/components/ValeAssuredBadge";
import {
  funeralDirectors,
  filterByServiceType,
  sortDirectors,
  getLowestPrice,
  type ServiceType,
  type FuneralDirector,
} from "@/lib/data";

/* ─── Map (client-only) ─────────────────────────────────────────── */
const MapView = dynamic(() => import("@/components/search/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center" style={{ background: "#EEF0FF" }}>
      <div
        className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: "#6B6DE8", borderTopColor: "transparent" }}
      />
    </div>
  ),
});

/* ─── Constants ─────────────────────────────────────────────────── */
const SERVICE_CHIP_LABELS: Record<ServiceType, string> = {
  cremation:        "Cremation",
  burial:           "Burial",
  direct_cremation: "Direct Cremation",
};

const SERVICE_FILTERS: { value: ServiceType | "all"; label: string }[] = [
  { value: "all",              label: "All services"    },
  { value: "cremation",        label: "Cremation"       },
  { value: "burial",           label: "Burial"          },
  { value: "direct_cremation", label: "Direct Cremation" },
];

const PRICE_RANGES = [
  { label: "Any price",        min: 0,    max: Infinity },
  { label: "Under £1,000",     min: 0,    max: 1000     },
  { label: "£1,000 – £2,500",  min: 1000, max: 2500     },
  { label: "£2,500 – £4,000",  min: 2500, max: 4000     },
  { label: "Over £4,000",      min: 4000, max: Infinity  },
];

/* ─── StarRating ────────────────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className="w-3.5 h-3.5"
          style={{
            color: s <= Math.round(rating) ? "#E26B5E" : "#D2D3FC",
            fill:  s <= Math.round(rating) ? "#E26B5E" : "#D2D3FC",
          }}
        />
      ))}
    </span>
  );
}

/* ─── FDCard ────────────────────────────────────────────────────── */
function FDCard({
  fd,
  serviceFilter,
}: {
  fd: FuneralDirector;
  serviceFilter: ServiceType | "all";
}) {
  const lowestPrice =
    serviceFilter === "all"
      ? getLowestPrice(fd)
      : (fd.prices.find((p) => p.type === serviceFilter)?.price ??
         getLowestPrice(fd));

  const heroImg =
    fd.heroImage ??
    fd.gallery?.find((g) => g.category === "exterior")?.url ??
    `https://picsum.photos/seed/${fd.id}-marketplace/800/520`;

  const services = [...new Set(fd.prices.map((p) => p.type))];

  return (
    <article
      className="group rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background:   "white",
        border:       "1px solid #E8E8F4",
        boxShadow:    "0 2px 8px rgba(26,26,46,0.05)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(107,109,232,0.4)";
        el.style.boxShadow   = "0 8px 32px rgba(107,109,232,0.14)";
        el.style.transform   = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "#E8E8F4";
        el.style.boxShadow   = "0 2px 8px rgba(26,26,46,0.05)";
        el.style.transform   = "translateY(0)";
      }}
    >
      <div className="flex flex-col sm:flex-row">

        {/* ── Image panel — wider + taller ── */}
        <Link
          href={`/funeral-directors/${fd.id}`}
          className="relative w-full sm:w-1/2 h-64 sm:h-auto shrink-0 block overflow-hidden"
          style={{ background: "#D2D3FC", minHeight: "260px" }}
          tabIndex={-1}
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImg}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(26,26,46,0.28) 0%, transparent 45%)",
            }}
          />

          {/* Save / bookmark */}
          <button
            type="button"
            aria-label="Save to favourites"
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:scale-110 transition-transform focus:outline-none"
            style={{
              background:    "rgba(255,255,255,0.92)",
              backdropFilter: "blur(4px)",
            }}
            onClick={(e) => e.preventDefault()}
          >
            <Bookmark className="w-4 h-4" style={{ color: "#5C5C7A" }} />
          </button>

          {/* Assured / Verified badge */}
          {fd.assured ? (
            <div className="absolute top-3 left-3 z-10">
              <ValeAssuredBadge size="sm" />
            </div>
          ) : fd.verified ? (
            <div
              className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{
                background:    "rgba(255,255,255,0.92)",
                backdropFilter: "blur(4px)",
                color:          "#6B6DE8",
              }}
            >
              <CheckCircle className="w-3 h-3" aria-hidden="true" />
              Verified
            </div>
          ) : null}

          {/* Accreditation strip */}
          {(fd.nafdVerified || fd.saifVerified || fd.bifdVerified || fd.iccmVerified) && (
            <div
              className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center gap-1.5"
              style={{
                background:    "rgba(26,26,46,0.65)",
                backdropFilter: "blur(4px)",
              }}
            >
              <ShieldCheck
                className="w-3 h-3 shrink-0"
                style={{ color: "rgba(255,255,255,0.8)" }}
                aria-hidden="true"
              />
              <span
                className="text-[10px] font-medium truncate"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {[
                  fd.nafdVerified && "NAFD",
                  fd.saifVerified && "SAIF",
                  fd.bifdVerified && "BIFD",
                  fd.iccmVerified && "ICCM",
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </div>
          )}
        </Link>

        {/* ── Info panel ── */}
        <div className="flex-1 min-w-0 p-6 flex flex-col">
          <div className="flex-1">
            <div className="mb-1.5">
              <Link href={`/funeral-directors/${fd.id}`} className="group/title">
                <h3
                  className="font-bold text-[17px] leading-snug group-hover/title:underline"
                  style={{ color: "#1A1A2E" }}
                >
                  {fd.name}
                </h3>
              </Link>
            </div>

            <p className="flex items-center gap-1.5 text-sm mb-3" style={{ color: "#5C5C7A" }}>
              <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {fd.address}, {fd.city}
              <span style={{ color: "#C8C4DC" }} aria-hidden="true">·</span>
              {fd.postcode}
            </p>

            <div
              className="flex items-center gap-2 mb-4"
              aria-label={`${fd.rating} out of 5, ${fd.reviewCount} reviews`}
            >
              <StarRating rating={fd.rating} />
              <span className="text-sm font-bold" style={{ color: "#1A1A2E" }}>
                {fd.rating}
              </span>
              <span className="text-sm" style={{ color: "#9090A8" }}>
                ({fd.reviewCount} reviews)
              </span>
            </div>

            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.1em] mb-2"
                style={{ color: "#9090A8" }}
              >
                Services available
              </p>
              <div className="flex flex-wrap gap-1.5">
                {services.map((svc) => (
                  <span
                    key={svc}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "#D2D3FC", color: "#6B6DE8" }}
                  >
                    {SERVICE_CHIP_LABELS[svc]}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between pt-4 mt-4 gap-3"
            style={{ borderTop: "1px solid #E8E8F4" }}
          >
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.1em] mb-0.5"
                style={{ color: "#9090A8" }}
              >
                From
              </p>
              <p
                className="text-2xl font-bold leading-none"
                style={{ color: "#1A1A2E" }}
              >
                £{lowestPrice.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={`tel:${fd.phone}`}
                onClick={(e) => e.stopPropagation()}
                aria-label={`Call ${fd.name}`}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all min-h-[42px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B6DE8]"
                style={{ border: "1px solid #E8E8F4", color: "#1A1A2E" }}
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                View number
              </a>
              <Link
                href={`/funeral-directors/${fd.id}`}
                className="flex items-center whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-bold text-white min-h-[42px] hover:opacity-90 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6B6DE8]"
                style={{ background: "#6B6DE8" }}
              >
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─── Main page ─────────────────────────────────────────────────── */
function SearchPageInner() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";

  /* Live-search state — no separate submit step */
  const [postcode,      setPostcode]      = useState(initialQ);
  const [serviceFilter, setServiceFilter] = useState<ServiceType | "all">("all");
  const [priceRange,    setPriceRange]    = useState(0);
  const [sortBy,        setSortBy]        = useState<"price" | "rating" | "name">("rating");
  const [mobileView,    setMobileView]    = useState<"list" | "map">("list");

  useEffect(() => {
    setPostcode(searchParams.get("q") ?? "");
  }, [searchParams]);

  const filteredAndSorted = useMemo(() => {
    let results = filterByServiceType(funeralDirectors, serviceFilter);
    const { min, max } = PRICE_RANGES[priceRange];
    results = results.filter((fd) => {
      const price =
        serviceFilter === "all"
          ? getLowestPrice(fd)
          : (fd.prices.find((p) => p.type === serviceFilter)?.price ??
             getLowestPrice(fd));
      return price >= min && price <= max;
    });
    if (postcode) {
      const q = postcode.toLowerCase();
      results = results.filter(
        (fd) =>
          fd.city.toLowerCase().includes(q) ||
          fd.postcode.toLowerCase().replace(/\s/g, "").includes(q.replace(/\s/g, "")) ||
          fd.address.toLowerCase().includes(q)
      );
    }
    return sortDirectors(results, sortBy, serviceFilter);
  }, [serviceFilter, priceRange, postcode, sortBy]);

  /* Map top offset: nav (64px) */
  const MAP_STICKY_TOP = 64;

  return (
    <div className="min-h-screen" style={{ background: "#FAFAFA" }}>

      {/* ══════════════════════════════════════════════
          HERO — large lavender gradient, matching
          the Lottie reference layout exactly
      ══════════════════════════════════════════════ */}
      <section
        style={{
          background:
            "linear-gradient(to bottom, #9698EC 0%, #B8BAF8 18%, #D2D3FC 38%, #E6E7FF 58%, #F3F4FF 75%, #FAFAFA 100%)",
          paddingTop:    "56px",
          paddingBottom: "52px",
        }}
      >
        <div
          className="mx-auto px-6 md:px-10"
          style={{ maxWidth: "1152px" }}
        >
          {/* ── Header row: headline left · Share right ── */}
          <div className="flex items-start justify-between gap-8 mb-10">
            <div style={{ maxWidth: "540px" }}>
              <h1
                style={{
                  fontFamily:    "var(--font-open-sans), sans-serif",
                  fontSize:      "clamp(30px, 4vw, 50px)",
                  fontWeight:    800,
                  lineHeight:    1.08,
                  letterSpacing: "-0.02em",
                  color:         "#1A1A2E",
                  marginBottom:  "12px",
                }}
              >
                Find a funeral director near you
              </h1>
              <p
                style={{
                  fontSize:   "16px",
                  lineHeight: "1.6",
                  color:      "#5C5C7A",
                  maxWidth:   "440px",
                }}
              >
                Search by postcode or city, compare verified prices, add
                directors to your favourites, get pricing and call them
                directly.
              </p>
            </div>

            {/* Share button — top-right, exactly like Lottie */}
            <button
              type="button"
              className="shrink-0 flex items-center gap-2 text-sm font-semibold rounded-xl px-4 py-2.5 transition-colors hover:bg-[#F0F1FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B6DE8]"
              style={{
                background: "white",
                border:     "1px solid #E8E8F4",
                color:      "#1A1A2E",
              }}
            >
              <Share2 className="w-4 h-4" aria-hidden="true" />
              Share
            </button>
          </div>

          {/* ── Filter bar — single row, exactly like Lottie ── */}
          {/*
              Layout (left → right):
              [🔍 postcode input ×] | [Service ↓] | [Price ↓] | [Relevance ↓] | [⚙ All filters]
          */}
          <div
            className="flex items-center rounded-xl overflow-hidden"
            style={{
              background: "white",
              border:     "1.5px solid #E8E8F4",
              boxShadow:  "0 4px 24px rgba(107,109,232,0.12)",
            }}
          >
            {/* Postcode / location input */}
            <label htmlFor="fd-search" className="sr-only">
              Search by postcode or city
            </label>
            <div
              className="flex flex-1 items-center gap-2.5 min-w-0"
              style={{
                padding:     "0 16px",
                borderRight: "1.5px solid #E8E8F4",
              }}
            >
              <Search
                className="w-4 h-4 shrink-0"
                aria-hidden="true"
                style={{ color: "#6B6DE8" }}
              />
              <input
                id="fd-search"
                type="text"
                placeholder="Postcode or city — e.g. SW1A or London"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="flex-1 min-w-0 text-sm outline-none bg-transparent"
                style={{ color: "#1A1A2E", padding: "14px 0" }}
              />
              {postcode && (
                <button
                  type="button"
                  onClick={() => setPostcode("")}
                  aria-label="Clear search"
                  className="shrink-0 hover:opacity-70 transition-opacity focus:outline-none"
                >
                  <X className="w-4 h-4" style={{ color: "#9090A8" }} />
                </button>
              )}
            </div>

            {/* Service type */}
            <div
              className="relative shrink-0 hidden sm:flex items-center"
              style={{ borderRight: "1.5px solid #E8E8F4" }}
            >
              <label htmlFor="filter-service" className="sr-only">Service type</label>
              <select
                id="filter-service"
                value={serviceFilter}
                onChange={(e) =>
                  setServiceFilter(e.target.value as ServiceType | "all")
                }
                className="appearance-none text-sm font-semibold cursor-pointer outline-none bg-transparent"
                style={{
                  color:   "#1A1A2E",
                  padding: "14px 36px 14px 16px",
                }}
              >
                {SERVICE_FILTERS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.value === "all" ? "Any service" : o.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                style={{ color: "#5C5C7A" }}
                aria-hidden="true"
              />
            </div>

            {/* Price range */}
            <div
              className="relative shrink-0 hidden md:flex items-center"
              style={{ borderRight: "1.5px solid #E8E8F4" }}
            >
              <label htmlFor="filter-price" className="sr-only">Price range</label>
              <select
                id="filter-price"
                value={String(priceRange)}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="appearance-none text-sm font-semibold cursor-pointer outline-none bg-transparent"
                style={{
                  color:   "#1A1A2E",
                  padding: "14px 36px 14px 16px",
                }}
              >
                {PRICE_RANGES.map((r, i) => (
                  <option key={i} value={String(i)}>
                    {i === 0 ? "Price" : r.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                style={{ color: "#5C5C7A" }}
                aria-hidden="true"
              />
            </div>

            {/* Sort / Relevance */}
            <div
              className="relative shrink-0 hidden lg:flex items-center"
              style={{ borderRight: "1.5px solid #E8E8F4" }}
            >
              <label htmlFor="filter-sort" className="sr-only">Sort results</label>
              <select
                id="filter-sort"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "price" | "rating" | "name")
                }
                className="appearance-none text-sm font-semibold cursor-pointer outline-none bg-transparent"
                style={{
                  color:   "#1A1A2E",
                  padding: "14px 36px 14px 16px",
                }}
              >
                <option value="rating">Relevance</option>
                <option value="price">Lowest price</option>
                <option value="name">A – Z</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                style={{ color: "#5C5C7A" }}
                aria-hidden="true"
              />
            </div>

            {/* All filters */}
            <button
              type="button"
              className="shrink-0 flex items-center gap-2 text-sm font-bold whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B6DE8] hover:bg-[#F4F5FF] transition-colors"
              style={{
                padding: "14px 20px",
                color:   "#1A1A2E",
              }}
            >
              <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
              All filters
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════ Result count + location heading ══════════════ */}
      <div
        className="mx-auto px-6 md:px-10 py-5"
        style={{ maxWidth: "1152px" }}
      >
        <p className="text-sm" style={{ color: "#5C5C7A" }} aria-live="polite" aria-atomic="true">
          Showing{" "}
          <span className="font-bold" style={{ color: "#1A1A2E" }}>
            {filteredAndSorted.length}
          </span>{" "}
          {filteredAndSorted.length === 1 ? "match" : "matches"}
          {postcode ? (
            <span className="hidden sm:inline"> near &ldquo;{postcode}&rdquo;</span>
          ) : null}
        </p>
        {postcode && (
          <h2
            className="mt-1"
            style={{
              fontFamily:    "var(--font-open-sans), sans-serif",
              fontSize:      "22px",
              fontWeight:    700,
              color:         "#1A1A2E",
              letterSpacing: "-0.01em",
            }}
          >
            {postcode}
          </h2>
        )}
      </div>

      {/* ══════════════ Mobile view toggle ══════════════ */}
      <div className="lg:hidden px-6 pb-3">
        <div
          className="inline-flex items-center gap-1 p-1 rounded-full"
          role="group"
          aria-label="View mode"
          style={{ background: "white", border: "1px solid #E8E8F4" }}
        >
          {(["list", "map"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setMobileView(mode)}
              aria-pressed={mobileView === mode}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors min-h-[36px] focus:outline-none"
              style={
                mobileView === mode
                  ? { background: "#6B6DE8", color: "white" }
                  : { color: "#5C5C7A" }
              }
            >
              {mode === "list" ? (
                <List className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <Map className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              {mode === "list" ? "List" : "Map"}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════ TWO-COLUMN LAYOUT ══════════════ */}
      <div
        className="mx-auto flex items-start"
        style={{ maxWidth: "1152px" }}
      >
        {/* ── Results column ── */}
        <div
          className={`flex-1 min-w-0 px-6 md:px-10 pb-12 ${
            mobileView === "map" ? "hidden lg:block" : "block"
          }`}
        >
          {filteredAndSorted.length === 0 ? (
            <div
              className="rounded-2xl p-16 text-center"
              style={{ background: "white", border: "1px solid #E8E8F4" }}
            >
              <Search
                className="w-10 h-10 mx-auto mb-4"
                aria-hidden="true"
                style={{ color: "#D2D3FC" }}
              />
              <p
                className="font-bold text-base mb-1"
                style={{ color: "#1A1A2E" }}
              >
                No funeral directors found
              </p>
              <p className="text-sm" style={{ color: "#5C5C7A" }}>
                Try a different location or adjust your filters.
              </p>
            </div>
          ) : (
            <div
              className="space-y-5"
              role="list"
              aria-label="Funeral directors"
            >
              {filteredAndSorted.map((fd) => (
                <div key={fd.id} role="listitem">
                  <FDCard fd={fd} serviceFilter={serviceFilter} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Map column — narrower, sticky ── */}
        <div
          className={`${
            mobileView === "map" ? "block" : "hidden lg:block"
          } lg:w-[300px] xl:w-[340px] shrink-0 lg:sticky lg:overflow-hidden`}
          style={{
            borderLeft: "1px solid #E8E8F4",
            top:        `${MAP_STICKY_TOP}px`,
          }}
        >
          <div
            className="w-full h-[60vh]"
            style={{ height: `calc(100vh - ${MAP_STICKY_TOP}px)` }}
          >
            <MapView directors={filteredAndSorted} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Suspense wrapper ──────────────────────────────────────────── */
export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "#FAFAFA" }}
        >
          <div
            className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
            style={{
              borderColor:    "#6B6DE8",
              borderTopColor: "transparent",
            }}
          />
        </div>
      }
    >
      <SearchPageInner />
    </Suspense>
  );
}
