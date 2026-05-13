"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { MapPin, List, Map, Star, CheckCircle, ArrowUpDown, Search, SlidersHorizontal } from "lucide-react";
import ValeAssuredBadge from "@/components/ValeAssuredBadge";
import {
  funeralDirectors,
  filterByServiceType,
  sortDirectors,
  getLowestPrice,
  getAveragePrice,
  type ServiceType,
  type FuneralDirector,
} from "@/lib/data";

const MapView = dynamic(() => import("@/components/search/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center rounded-xl" style={{ background: "#EAF2EE" }}>
      <p className="text-sm" style={{ color: "#7A6E64" }}>Loading map…</p>
    </div>
  ),
});

const SERVICE_LABELS: Record<string, string> = {
  all: "All services",
  cremation: "Cremation",
  burial: "Burial",
  direct_cremation: "Direct cremation",
};

const PRICE_RANGES = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under £1,000", min: 0, max: 1000 },
  { label: "£1,000 – £2,500", min: 1000, max: 2500 },
  { label: "£2,500 – £4,000", min: 2500, max: 4000 },
  { label: "Over £4,000", min: 4000, max: Infinity },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className="w-3.5 h-3.5"
          style={{
            color: s <= Math.round(rating) ? "#E26B5E" : "#EAF2EE",
            fill: s <= Math.round(rating) ? "#E26B5E" : "#EAF2EE",
          }}
        />
      ))}
    </span>
  );
}

function FDCard({ fd, serviceFilter }: { fd: FuneralDirector; serviceFilter: ServiceType | "all" }) {
  const lowestPrice =
    serviceFilter === "all"
      ? getLowestPrice(fd)
      : (fd.prices.find((p) => p.type === serviceFilter)?.price ?? getLowestPrice(fd));

  return (
    <Link
      href={`/funeral-directors/${fd.id}`}
      aria-label={`${fd.name} — from £${lowestPrice.toLocaleString()}. ${fd.rating} stars from ${fd.reviewCount} reviews. View profile.`}
      className="block rounded-xl p-6 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        background: "white",
        border: "1px solid #E8E2D8",
        boxShadow: "0 1px 4px rgba(28,31,42,0.04)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.border = "1px solid rgba(94,139,115,0.4)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(28,31,42,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.border = "1px solid #E8E2D8";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(28,31,42,0.04)";
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-base group-hover:underline truncate" style={{ color: "#1C1F2A" }}>
              {fd.name}
            </h3>
            {fd.verified && (
              <CheckCircle className="w-4 h-4 shrink-0" aria-label="Verified" style={{ color: "#7BA84A" }} />
            )}
          </div>
          <p className="text-sm flex items-center gap-1 mb-3" style={{ color: "#7A6E64" }}>
            <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {fd.address}, {fd.city}
          </p>
          <div className="flex items-center gap-2">
            <StarRating rating={fd.rating} />
            <span className="text-sm" style={{ color: "#5A4E44" }} aria-label={`${fd.rating} out of 5 stars from ${fd.reviewCount} reviews`}>
              {fd.rating} ({fd.reviewCount} reviews)
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          {fd.assured && (
            <div className="flex justify-end mb-2.5">
              <ValeAssuredBadge size="sm" />
            </div>
          )}
          <div className="text-[11px] uppercase tracking-wider mb-0.5" style={{ color: "#5F7080" }}>From</div>
          <div className="text-xl font-bold" style={{ color: "#1C1F2A" }}>£{lowestPrice.toLocaleString()}</div>
          <div className="text-xs mt-0.5" style={{ color: "#5F7080" }}>
            Avg. £{getAveragePrice(fd).toLocaleString()}
          </div>
        </div>
      </div>
    </Link>
  );
}

function SearchPageInner() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";

  const [postcode, setPostcode] = useState(initialQ);
  const [postcodeInput, setPostcodeInput] = useState(initialQ);
  const [serviceFilter, setServiceFilter] = useState<ServiceType | "all">("all");
  const [priceRange, setPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState<"price" | "rating" | "name">("rating");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
          : (fd.prices.find((p) => p.type === serviceFilter)?.price ?? getLowestPrice(fd));
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPostcode(postcodeInput);
  };

  return (
    <div className="min-h-screen" style={{ background: "#F7F3EE" }}>
      <h1 className="sr-only">Find funeral directors near you</h1>

      {/* Search bar */}
      <div className="sticky top-16 z-40" style={{ background: "white", borderBottom: "1px solid #E8E2D8" }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3" role="search" aria-label="Search for funeral directors">
            <div className="relative flex-1">
              <label htmlFor="postcode-search" className="sr-only">Enter postcode or city</label>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" aria-hidden="true" style={{ color: "#7A6E64" }} />
              <input
                id="postcode-search"
                type="text"
                placeholder="Enter postcode or city (e.g. SW1A or London)"
                value={postcodeInput}
                onChange={(e) => setPostcodeInput(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none min-h-[44px]"
                style={{
                  background: "#F7F3EE",
                  border: "1px solid #E8E2D8",
                  color: "#5A4E44",
                }}
                onFocus={(e) => { e.currentTarget.style.border = "1.5px solid #5E8B73"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(94,139,115,0.12)"; }}
                onBlur={(e) => { e.currentTarget.style.border = "1px solid #E8E2D8"; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label htmlFor="service-type" className="sr-only">Service type</label>
              <select
                id="service-type"
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value as ServiceType | "all")}
                className="h-[44px] px-3 rounded-xl text-sm focus:outline-none"
                style={{
                  background: "#F7F3EE",
                  border: "1px solid #E8E2D8",
                  color: "#5A4E44",
                }}
              >
                {Object.entries(SERVICE_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="text-white px-6 py-3 rounded-md text-sm font-semibold hover:scale-[1.03] active:scale-[0.98] transition-transform whitespace-nowrap min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ background: "#1C1F2A" }}
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Mobile filter toggle */}
        <button
          onClick={() => setMobileFiltersOpen((o) => !o)}
          aria-expanded={mobileFiltersOpen}
          aria-controls="filter-sidebar"
          className="md:hidden w-full mb-4 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold hover:opacity-90 transition-opacity min-h-[44px] focus:outline-none"
          style={{ background: "#EAF2EE", border: "1px solid rgba(94,139,115,0.3)", color: "#1C1F2A" }}
        >
          <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
          {mobileFiltersOpen ? "Hide filters" : "Show filters & sort"}
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <aside
            id="filter-sidebar"
            className={`w-full md:w-60 shrink-0 ${mobileFiltersOpen ? "block" : "hidden md:block"}`}
            aria-label="Filter and sort results"
          >
            <div
              className="rounded-xl p-5 space-y-6 sticky top-36"
              style={{ background: "#EAF2EE" }}
            >
              {/* Sort by */}
              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-3"
                  style={{ color: "#5E8B73" }}
                >
                  Sort by
                </p>
                <div className="space-y-1.5" role="radiogroup" aria-label="Sort by">
                  {([
                    ["price",  "Price — lowest first"],
                    ["rating", "Rating — highest first"],
                    ["name",   "Name — A to Z"],
                  ] as const).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      role="radio"
                      aria-checked={sortBy === val}
                      onClick={() => setSortBy(val)}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all min-h-[40px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73]"
                      style={
                        sortBy === val
                          ? { background: "#5E8B73", color: "#FFFFFF", fontWeight: 500 }
                          : { background: "white", color: "#5A4E44", border: "1px solid #E8E2D8" }
                      }
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid rgba(94,139,115,0.2)" }} />

              {/* Price range */}
              <div>
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-3"
                  style={{ color: "#5E8B73" }}
                >
                  Price range
                </p>
                <div className="space-y-1.5" role="radiogroup" aria-label="Price range">
                  {PRICE_RANGES.map((range, i) => (
                    <button
                      key={i}
                      type="button"
                      role="radio"
                      aria-checked={priceRange === i}
                      onClick={() => setPriceRange(i)}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all min-h-[40px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73]"
                      style={
                        priceRange === i
                          ? { background: "#5E8B73", color: "#FFFFFF", fontWeight: 500 }
                          : { background: "white", color: "#5A4E44", border: "1px solid #E8E2D8" }
                      }
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm" aria-live="polite" aria-atomic="true" style={{ color: "#7A6E64" }}>
                <span className="font-semibold" style={{ color: "#5A4E44" }}>{filteredAndSorted.length}</span>{" "}
                funeral director{filteredAndSorted.length !== 1 ? "s" : ""}
                {postcode ? ` matching "${postcode}"` : ""}
              </p>

              <div
                className="flex items-center gap-1 rounded-full p-1"
                role="group"
                aria-label="View mode"
                style={{ background: "white", border: "1px solid #E8E2D8" }}
              >
                {(["list", "map"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    aria-pressed={viewMode === mode}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-colors min-h-[36px] focus:outline-none"
                    style={
                      viewMode === mode
                        ? { background: "#1C1F2A", color: "white" }
                        : { color: "#7A6E64" }
                    }
                  >
                    {mode === "list" ? <List className="w-3.5 h-3.5" aria-hidden="true" /> : <Map className="w-3.5 h-3.5" aria-hidden="true" />}
                    {mode === "list" ? "List" : "Map"}
                  </button>
                ))}
              </div>
            </div>

            {viewMode === "list" ? (
              <div className="space-y-3" role="list" aria-label="Funeral directors">
                {filteredAndSorted.length === 0 ? (
                  <div className="rounded-xl p-12 text-center" style={{ background: "white", border: "1px solid #E8E2D8" }}>
                    <ArrowUpDown className="w-8 h-8 mx-auto mb-3" aria-hidden="true" style={{ color: "#EAF2EE" }} />
                    <p className="font-semibold mb-1" style={{ color: "#5A4E44" }}>No results found</p>
                    <p className="text-sm" style={{ color: "#7A6E64" }}>Try adjusting your filters or search term.</p>
                  </div>
                ) : (
                  filteredAndSorted.map((fd) => (
                    <div key={fd.id} role="listitem">
                      <FDCard fd={fd} serviceFilter={serviceFilter} />
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div
                className="rounded-xl overflow-hidden"
                style={{ height: 560, border: "1px solid #E8E2D8" }}
                aria-label="Map of funeral directors"
              >
                <MapView directors={filteredAndSorted} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F7F3EE" }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#5E8B73", borderTopColor: "transparent" }} />
      </div>
    }>
      <SearchPageInner />
    </Suspense>
  );
}
