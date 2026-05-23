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

/* ─────────────────────────── Map (client-only) ─────────────────────────── */

const MapView = dynamic(() => import("@/components/search/MapView"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: "#EAF2EE" }}
    >
      <div
        className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: "#5E8B73", borderTopColor: "transparent" }}
      />
    </div>
  ),
});

/* ─────────────────────────── Constants ─────────────────────────── */

const SERVICE_CHIP_LABELS: Record<ServiceType, string> = {
  cremation: "Cremation",
  burial: "Burial",
  direct_cremation: "Direct Cremation",
};

const SERVICE_FILTERS: { value: ServiceType | "all"; label: string }[] = [
  { value: "all", label: "All services" },
  { value: "cremation", label: "Cremation" },
  { value: "burial", label: "Burial" },
  { value: "direct_cremation", label: "Direct Cremation" },
];

const PRICE_RANGES = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under £1,000", min: 0, max: 1000 },
  { label: "£1,000 – £2,500", min: 1000, max: 2500 },
  { label: "£2,500 – £4,000", min: 2500, max: 4000 },
  { label: "Over £4,000", min: 4000, max: Infinity },
];

/* ─────────────────────────── Sub-components ─────────────────────────── */

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className="w-3.5 h-3.5"
          style={{
            color: s <= Math.round(rating) ? "#E26B5E" : "#D9D3CC",
            fill: s <= Math.round(rating) ? "#E26B5E" : "#D9D3CC",
          }}
        />
      ))}
    </span>
  );
}

/** Styled native <select> that looks like a filter pill */
function PillSelect({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  label: string;
}) {
  return (
    <div className="relative shrink-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="appearance-none pl-3.5 pr-8 py-2 rounded-full text-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] min-h-[36px]"
        style={{
          background: "white",
          border: "1px solid #E8E2D8",
          color: "#1C1F2A",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
        style={{ color: "#7A6E64" }}
        aria-hidden="true"
      />
    </div>
  );
}

/* ─────────────────────────── FD Card ─────────────────────────── */

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

  // Hero image: explicit field → gallery exterior → generated placeholder
  const heroImg =
    fd.heroImage ??
    fd.gallery?.find((g) => g.category === "exterior")?.url ??
    `https://picsum.photos/seed/${fd.id}-marketplace/800/520`;

  // Unique services this FD offers
  const services = [...new Set(fd.prices.map((p) => p.type))];

  return (
    <article
      className="group rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: "white",
        border: "1px solid #E8E2D8",
        boxShadow: "0 1px 4px rgba(28,31,42,0.04)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(94,139,115,0.45)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 8px 28px rgba(28,31,42,0.10)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#E8E2D8";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 1px 4px rgba(28,31,42,0.04)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      <div className="flex flex-col sm:flex-row">
        {/* ── Image panel ── */}
        <Link
          href={`/funeral-directors/${fd.id}`}
          className="relative sm:w-64 lg:w-72 h-52 sm:h-auto shrink-0 block overflow-hidden bg-[#EAF2EE]"
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

          {/* Gradient overlay for legibility of badges */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(28,31,42,0.28) 0%, transparent 40%)",
            }}
          />

          {/* Badge overlay */}
          {fd.assured ? (
            <div className="absolute top-3 left-3 z-10">
              <ValeAssuredBadge size="sm" />
            </div>
          ) : fd.verified ? (
            <div
              className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(255,255,255,0.90)",
                backdropFilter: "blur(4px)",
                color: "#3D6B52",
              }}
            >
              <CheckCircle className="w-3 h-3" aria-hidden="true" />
              Verified
            </div>
          ) : null}

          {/* Accreditation strip at bottom of image */}
          {(fd.nafdVerified || fd.saifVerified || fd.bifdVerified || fd.iccmVerified) && (
            <div
              className="absolute bottom-0 left-0 right-0 px-3 py-1.5 flex items-center gap-1.5"
              style={{ background: "rgba(28,31,42,0.60)", backdropFilter: "blur(4px)" }}
            >
              <ShieldCheck className="w-3 h-3 text-white/80 shrink-0" aria-hidden="true" />
              <span className="text-[10px] font-medium text-white/80 truncate">
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
        <div className="flex-1 min-w-0 p-5 flex flex-col">
          {/* Top section */}
          <div className="flex-1">
            {/* Name row */}
            <div className="flex items-start justify-between gap-2 mb-1">
              <Link
                href={`/funeral-directors/${fd.id}`}
                className="group/title min-w-0"
              >
                <h3
                  className="font-semibold text-[15px] leading-snug truncate group-hover/title:underline"
                  style={{ color: "#1C1F2A" }}
                >
                  {fd.name}
                </h3>
              </Link>
            </div>

            {/* Location */}
            <p
              className="text-sm flex items-center gap-1 mb-2.5 truncate"
              style={{ color: "#7A6E64" }}
            >
              <MapPin
                className="w-3.5 h-3.5 shrink-0"
                aria-hidden="true"
              />
              {fd.address}, {fd.city}
              <span className="text-[#B5ADA5] mx-1" aria-hidden="true">
                ·
              </span>
              {fd.postcode}
            </p>

            {/* Rating row */}
            <div
              className="flex items-center gap-2 mb-3"
              aria-label={`${fd.rating} out of 5 stars from ${fd.reviewCount} reviews`}
            >
              <StarRating rating={fd.rating} />
              <span
                className="text-sm font-semibold"
                style={{ color: "#5A4E44" }}
              >
                {fd.rating}
              </span>
              <span className="text-sm" style={{ color: "#9A8E84" }}>
                ({fd.reviewCount} reviews)
              </span>
            </div>

            {/* Service chips */}
            <div className="flex flex-wrap gap-1.5">
              {services.map((svc) => (
                <span
                  key={svc}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{ background: "#EAF2EE", color: "#3D6B52" }}
                >
                  {SERVICE_CHIP_LABELS[svc]}
                </span>
              ))}
            </div>
          </div>

          {/* ── Footer: price + CTAs ── */}
          <div
            className="flex items-center justify-between pt-4 mt-4 gap-3"
            style={{ borderTop: "1px solid #F0ECE6" }}
          >
            {/* Price */}
            <div>
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.1em] mb-0.5"
                style={{ color: "#A09488" }}
              >
                From
              </p>
              <p
                className="text-2xl font-bold leading-none"
                style={{ color: "#1C1F2A" }}
              >
                £{lowestPrice.toLocaleString()}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`tel:${fd.phone}`}
                onClick={(e) => e.stopPropagation()}
                aria-label={`Call ${fd.name} on ${fd.phone}`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all min-h-[40px] hover:bg-[#F7F3EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73]"
                style={{ border: "1px solid #E8E2D8", color: "#1C1F2A" }}
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Call</span>
              </a>
              <Link
                href={`/funeral-directors/${fd.id}`}
                className="flex items-center whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold text-white min-h-[40px] hover:opacity-90 active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ background: "#1C1F2A" }}
              >
                View profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────── Main page ─────────────────────────── */

function SearchPageInner() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";

  const [postcode, setPostcode] = useState(initialQ);
  const [postcodeInput, setPostcodeInput] = useState(initialQ);
  const [serviceFilter, setServiceFilter] = useState<ServiceType | "all">("all");
  const [priceRange, setPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState<"price" | "rating" | "name">("rating");
  const [mobileView, setMobileView] = useState<"list" | "map">("list");

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    setPostcode(q);
    setPostcodeInput(q);
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
          fd.postcode
            .toLowerCase()
            .replace(/\s/g, "")
            .includes(q.replace(/\s/g, "")) ||
          fd.address.toLowerCase().includes(q)
      );
    }
    return sortDirectors(results, sortBy, serviceFilter);
  }, [serviceFilter, priceRange, postcode, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPostcode(postcodeInput);
  };

  return (
    <div className="min-h-screen" style={{ background: "#F7F3EE" }}>
      <h1 className="sr-only">Find funeral directors near you</h1>

      {/* ════════════════ Sticky header ════════════════ */}
      <div
        className="sticky top-16 z-40"
        style={{ background: "white", borderBottom: "1px solid #E8E2D8" }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-3 pt-4 pb-3"
            role="search"
            aria-label="Search funeral directors"
          >
            <div className="relative flex-1 max-w-xl">
              <label htmlFor="postcode-search" className="sr-only">
                Enter postcode or city
              </label>
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
                aria-hidden="true"
                style={{ color: "#7A6E64" }}
              />
              <input
                id="postcode-search"
                type="text"
                placeholder="Postcode or city — e.g. SW1A or London"
                value={postcodeInput}
                onChange={(e) => setPostcodeInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none min-h-[44px]"
                style={{
                  background: "#F7F3EE",
                  border: "1px solid #E8E2D8",
                  color: "#5A4E44",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = "1.5px solid #5E8B73";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(94,139,115,0.12)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = "1px solid #E8E2D8";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
            <button
              type="submit"
              className="text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all whitespace-nowrap min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ background: "#1C1F2A" }}
            >
              Search
            </button>
          </form>

          {/* ── Filter pill bar ── */}
          <div className="flex items-center gap-2 pb-3 overflow-x-auto scrollbar-none">
            {/* Service type pills */}
            {SERVICE_FILTERS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setServiceFilter(value as ServiceType | "all")}
                aria-pressed={serviceFilter === value}
                className="shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all min-h-[36px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73]"
                style={
                  serviceFilter === value
                    ? { background: "#1C1F2A", color: "white" }
                    : {
                        background: "white",
                        color: "#5A4E44",
                        border: "1px solid #E8E2D8",
                      }
                }
              >
                {label}
              </button>
            ))}

            {/* Divider */}
            <div
              className="w-px h-5 shrink-0 mx-0.5"
              style={{ background: "#E8E2D8" }}
              aria-hidden="true"
            />

            {/* Price range pill */}
            <PillSelect
              label="Price range"
              value={String(priceRange)}
              onChange={(v) => setPriceRange(Number(v))}
              options={PRICE_RANGES.map((r, i) => ({
                value: String(i),
                label: r.label,
              }))}
            />

            {/* Sort pill */}
            <PillSelect
              label="Sort results"
              value={sortBy}
              onChange={(v) => setSortBy(v as "price" | "rating" | "name")}
              options={[
                { value: "rating", label: "Sort: Top rated" },
                { value: "price", label: "Sort: Lowest price" },
                { value: "name", label: "Sort: A – Z" },
              ]}
            />

            {/* Result count */}
            <p
              className="ml-auto shrink-0 text-sm whitespace-nowrap pl-2"
              aria-live="polite"
              aria-atomic="true"
              style={{ color: "#7A6E64" }}
            >
              <span className="font-semibold" style={{ color: "#5A4E44" }}>
                {filteredAndSorted.length}
              </span>{" "}
              {filteredAndSorted.length === 1 ? "result" : "results"}
              {postcode ? (
                <span className="hidden sm:inline"> near &ldquo;{postcode}&rdquo;</span>
              ) : null}
            </p>
          </div>
        </div>
      </div>

      {/* ════════════════ Mobile view toggle ════════════════ */}
      <div className="lg:hidden px-4 pt-4 pb-1">
        <div
          className="inline-flex items-center gap-1 p-1 rounded-full"
          role="group"
          aria-label="View mode"
          style={{ background: "white", border: "1px solid #E8E2D8" }}
        >
          {(["list", "map"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setMobileView(mode)}
              aria-pressed={mobileView === mode}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors min-h-[36px] focus:outline-none"
              style={
                mobileView === mode
                  ? { background: "#1C1F2A", color: "white" }
                  : { color: "#7A6E64" }
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

      {/* ════════════════ Two-column layout ════════════════ */}
      <div className="max-w-[1440px] mx-auto flex items-start">

        {/* ── Results column ── */}
        <div
          className={`flex-1 min-w-0 px-4 sm:px-6 py-5 ${
            mobileView === "map" ? "hidden lg:block" : "block"
          }`}
        >
          {filteredAndSorted.length === 0 ? (
            <div
              className="rounded-2xl p-16 text-center"
              style={{ background: "white", border: "1px solid #E8E2D8" }}
            >
              <Search
                className="w-10 h-10 mx-auto mb-4"
                aria-hidden="true"
                style={{ color: "#D9D3CC" }}
              />
              <p
                className="font-semibold text-base mb-1"
                style={{ color: "#5A4E44" }}
              >
                No funeral directors found
              </p>
              <p className="text-sm" style={{ color: "#7A6E64" }}>
                Try a different location or adjust your filters.
              </p>
            </div>
          ) : (
            <div
              className="space-y-4"
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

        {/* ── Map column ── */}
        {/* Desktop: sticky panel that follows the results scroll  */}
        {/* Mobile:  full-width block shown when map tab is active  */}
        <div
          className={`${
            mobileView === "map" ? "block" : "hidden lg:block"
          } lg:w-[400px] xl:w-[460px] shrink-0 lg:sticky lg:overflow-hidden`}
          style={{
            borderLeft: "1px solid #E8E2D8",
            /* top = nav (~80px) + search-bar (~120px) */
            top: "200px",
          }}
        >
          {/* Map fills remaining viewport height on desktop, 60vh on mobile */}
          <div className="w-full h-[60vh] lg:h-[calc(100vh-200px)]">
            <MapView directors={filteredAndSorted} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Suspense wrapper ─────────────────────────── */

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "#F7F3EE" }}
        >
          <div
            className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
            style={{
              borderColor: "#5E8B73",
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
