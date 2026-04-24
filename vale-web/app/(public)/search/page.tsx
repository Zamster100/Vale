"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { MapPin, List, Map, Star, CheckCircle, ArrowUpDown, Search, SlidersHorizontal } from "lucide-react";
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
    <div className="w-full h-full flex items-center justify-center rounded-xl" style={{ background: "#C5D2DC" }}>
      <p className="text-sm" style={{ color: "#8FA0B0" }}>Loading map…</p>
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
            color: s <= Math.round(rating) ? "#E26B5E" : "#C5D2DC",
            fill: s <= Math.round(rating) ? "#E26B5E" : "#C5D2DC",
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
      className="block rounded-2xl p-6 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        background: "white",
        border: "0.5px solid rgba(143,160,176,0.3)",
        boxShadow: "0 1px 4px rgba(93,58,122,0.04)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.border = "0.5px solid rgba(138,95,170,0.4)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(93,58,122,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.border = "0.5px solid rgba(143,160,176,0.3)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(93,58,122,0.04)";
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-base group-hover:underline truncate" style={{ color: "#5D3A7A" }}>
              {fd.name}
            </h3>
            {fd.assured && (
              <span
                className="inline-block text-[12px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0"
                style={{ background: "rgba(226,107,94,0.12)", color: "#C95548" }}
              >
                Assured
              </span>
            )}
            {fd.verified && (
              <CheckCircle className="w-4 h-4 shrink-0" aria-label="Verified" style={{ color: "#7BA84A" }} />
            )}
          </div>
          <p className="text-sm flex items-center gap-1 mb-3" style={{ color: "#8FA0B0" }}>
            <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {fd.address}, {fd.city}
          </p>
          <div className="flex items-center gap-2">
            <StarRating rating={fd.rating} />
            <span className="text-sm" style={{ color: "#3F5E2C" }} aria-label={`${fd.rating} out of 5 stars from ${fd.reviewCount} reviews`}>
              {fd.rating} ({fd.reviewCount} reviews)
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[11px] uppercase tracking-wider mb-0.5" style={{ color: "#8FA0B0" }}>From</div>
          <div className="text-xl font-bold" style={{ color: "#5D3A7A" }}>£{lowestPrice.toLocaleString()}</div>
          <div className="text-xs mt-0.5" style={{ color: "#8FA0B0" }}>
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
    <div className="min-h-screen" style={{ background: "#F5F1E8" }}>
      <h1 className="sr-only">Find funeral directors near you</h1>

      {/* Search bar */}
      <div className="sticky top-16 z-40" style={{ background: "white", borderBottom: "0.5px solid rgba(143,160,176,0.3)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3" role="search" aria-label="Search for funeral directors">
            <div className="relative flex-1">
              <label htmlFor="postcode-search" className="sr-only">Enter postcode or city</label>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" aria-hidden="true" style={{ color: "#8FA0B0" }} />
              <input
                id="postcode-search"
                type="text"
                placeholder="Enter postcode or city (e.g. SW1A or London)"
                value={postcodeInput}
                onChange={(e) => setPostcodeInput(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none min-h-[44px]"
                style={{
                  background: "#F5F1E8",
                  border: "0.5px solid rgba(143,160,176,0.5)",
                  color: "#3F5E2C",
                }}
                onFocus={(e) => { e.currentTarget.style.border = "1.5px solid #8A5FAA"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(138,95,170,0.12)"; }}
                onBlur={(e) => { e.currentTarget.style.border = "0.5px solid rgba(143,160,176,0.5)"; e.currentTarget.style.boxShadow = "none"; }}
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
                  background: "#F5F1E8",
                  border: "0.5px solid rgba(143,160,176,0.5)",
                  color: "#3F5E2C",
                }}
              >
                {Object.entries(SERVICE_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="text-white px-6 py-3 rounded-full text-sm font-semibold hover:scale-[1.03] active:scale-[0.98] transition-transform whitespace-nowrap min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ background: "#5AAE55" }}
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
          style={{ background: "white", border: "0.5px solid rgba(143,160,176,0.3)", color: "#5D3A7A" }}
        >
          <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
          {mobileFiltersOpen ? "Hide filters" : "Show filters & sort"}
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <aside
            id="filter-sidebar"
            className={`w-full md:w-64 shrink-0 space-y-4 ${mobileFiltersOpen ? "block" : "hidden md:block"}`}
            aria-label="Filter and sort results"
          >
            <div className="rounded-2xl p-6" style={{ background: "white", border: "0.5px solid rgba(143,160,176,0.3)" }}>
              <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#5D3A7A" }}>
                Sort by
              </h2>
              <div className="space-y-1">
                {([
                  ["price", "Price (lowest first)"],
                  ["rating", "Rating (highest first)"],
                  ["name", "Name (A–Z)"],
                ] as const).map(([val, label]) => (
                  <label key={val} className="flex items-center gap-3 cursor-pointer min-h-[44px] py-1 rounded-lg px-2 hover:bg-[rgba(197,210,220,0.2)] transition-colors">
                    <input
                      type="radio"
                      name="sort"
                      value={val}
                      checked={sortBy === val}
                      onChange={() => setSortBy(val)}
                      className="w-4 h-4 shrink-0"
                      style={{ accentColor: "#5D3A7A" }}
                    />
                    <span className="text-sm" style={{ color: "#3F5E2C" }}>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-6" style={{ background: "white", border: "0.5px solid rgba(143,160,176,0.3)" }}>
              <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#5D3A7A" }}>
                Price range
              </h2>
              <div className="space-y-1">
                {PRICE_RANGES.map((range, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer min-h-[44px] py-1 rounded-lg px-2 hover:bg-[rgba(197,210,220,0.2)] transition-colors">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === i}
                      onChange={() => setPriceRange(i)}
                      className="w-4 h-4 shrink-0"
                      style={{ accentColor: "#5D3A7A" }}
                    />
                    <span className="text-sm" style={{ color: "#3F5E2C" }}>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm" aria-live="polite" aria-atomic="true" style={{ color: "#8FA0B0" }}>
                <span className="font-semibold" style={{ color: "#3F5E2C" }}>{filteredAndSorted.length}</span>{" "}
                funeral director{filteredAndSorted.length !== 1 ? "s" : ""}
                {postcode ? ` matching "${postcode}"` : ""}
              </p>

              <div
                className="flex items-center gap-1 rounded-full p-1"
                role="group"
                aria-label="View mode"
                style={{ background: "white", border: "0.5px solid rgba(143,160,176,0.3)" }}
              >
                {(["list", "map"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    aria-pressed={viewMode === mode}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-colors min-h-[36px] focus:outline-none"
                    style={
                      viewMode === mode
                        ? { background: "#5D3A7A", color: "white" }
                        : { color: "#8FA0B0" }
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
                  <div className="rounded-2xl p-12 text-center" style={{ background: "white", border: "0.5px solid rgba(143,160,176,0.3)" }}>
                    <ArrowUpDown className="w-8 h-8 mx-auto mb-3" aria-hidden="true" style={{ color: "#C5D2DC" }} />
                    <p className="font-semibold mb-1" style={{ color: "#3F5E2C" }}>No results found</p>
                    <p className="text-sm" style={{ color: "#8FA0B0" }}>Try adjusting your filters or search term.</p>
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
                className="rounded-2xl overflow-hidden"
                style={{ height: 560, border: "0.5px solid rgba(143,160,176,0.3)" }}
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F5F1E8" }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#8A5FAA", borderTopColor: "transparent" }} />
      </div>
    }>
      <SearchPageInner />
    </Suspense>
  );
}
