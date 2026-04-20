"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MapPin, List, Map, Star, CheckCircle, ArrowUpDown, Search } from "lucide-react";
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
    <div className="w-full h-full bg-[#f3f4f6] flex items-center justify-center rounded-lg">
      <p className="text-[#6b7280] text-sm">Loading map…</p>
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

// FIX W3: star rating gets aria-label so screen readers skip the decorative SVGs
function StarRating({ rating }: { rating: number }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-hidden="true"
    >
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${
            s <= Math.round(rating) ? "text-[#d4a574] fill-[#d4a574]" : "text-[#e5e7eb]"
          }`}
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
      className="block bg-white border border-[#e5e7eb] rounded-lg p-6 shadow-sm hover:border-[#d4a574] hover:shadow-md transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {/* FIX W1: h3 without text-base override — uses global 18px h3 style */}
            <h3 className="text-[#1a3a52] font-semibold text-base group-hover:underline truncate">
              {fd.name}
            </h3>
            {fd.assured && (
              /* FIX W1: 10px → 12px minimum */
              <span className="inline-block bg-[#d4a574] text-[#1a3a52] text-[12px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0">
                Assured
              </span>
            )}
            {fd.verified && (
              /* FIX W4: aria-label on icon */
              <CheckCircle className="w-4 h-4 text-[#059669] shrink-0" aria-label="Verified" />
            )}
          </div>
          <p className="text-[#6b7280] text-sm flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {fd.address}, {fd.city}
          </p>
          <div className="flex items-center gap-2">
            <StarRating rating={fd.rating} />
            <span className="text-sm text-[#111827]" aria-label={`${fd.rating} out of 5 stars from ${fd.reviewCount} reviews`}>
              {fd.rating} ({fd.reviewCount} reviews)
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          {/* FIX W1: "FROM" label 10px → 12px */}
          <div className="text-[12px] text-[#6b7280] uppercase tracking-wider mb-0.5">From</div>
          <div className="text-xl font-bold text-[#1a3a52]">£{lowestPrice.toLocaleString()}</div>
          <div className="text-xs text-[#4b5563] mt-0.5">
            Avg. £{getAveragePrice(fd).toLocaleString()}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function SearchPage() {
  const [postcode, setPostcode] = useState("");
  const [postcodeInput, setPostcodeInput] = useState("");
  const [serviceFilter, setServiceFilter] = useState<ServiceType | "all">("all");
  const [priceRange, setPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState<"price" | "rating" | "name">("rating");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
    <div className="min-h-screen bg-[#f9fafb]">
      {/* FIX C2: visually hidden H1 for screen readers */}
      <h1 className="sr-only">Find funeral directors near you</h1>

      {/* Search bar */}
      <div className="bg-white border-b border-[#e5e7eb] sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3"
            role="search"
            aria-label="Search for funeral directors"
          >
            {/* FIX C2: proper label for postcode input */}
            <div className="relative flex-1">
              <label htmlFor="postcode-search" className="sr-only">
                Enter postcode or city
              </label>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" aria-hidden="true" />
              <input
                id="postcode-search"
                type="text"
                placeholder="Enter postcode or city (e.g. SW1A or London)"
                value={postcodeInput}
                onChange={(e) => setPostcodeInput(e.target.value)}
                /* FIX C1: full-opacity visible focus ring */
                className="w-full pl-9 pr-4 py-3 border border-[#d1d5db] rounded text-sm focus:outline-none focus:border-[#d4a574] focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-1 bg-white min-h-[44px]"
              />
            </div>

            {/* FIX C2: label for service type select */}
            <div>
              <label htmlFor="service-type" className="sr-only">
                Service type
              </label>
              <select
                id="service-type"
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value as ServiceType | "all")}
                /* FIX C1 + C3: visible focus + 44px height */
                className="h-[44px] px-3 border border-[#d1d5db] rounded text-sm focus:outline-none focus:border-[#d4a574] focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-1 bg-white text-[#111827]"
              >
                {Object.entries(SERVICE_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>

            {/* FIX C3: 44px minimum touch target */}
            <button
              type="submit"
              className="bg-[#1a3a52] text-white px-6 py-3 rounded text-sm font-semibold hover:bg-[#0f2438] transition-colors whitespace-nowrap min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2 focus:outline-none"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* FIX W5: mobile filter toggle button */}
        <button
          onClick={() => setMobileFiltersOpen((o) => !o)}
          aria-expanded={mobileFiltersOpen}
          aria-controls="filter-sidebar"
          className="md:hidden w-full mb-4 flex items-center justify-center gap-2 bg-white border border-[#e5e7eb] rounded-lg py-3 text-sm font-semibold text-[#1a3a52] shadow-sm hover:border-[#d4a574] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2 min-h-[44px]"
        >
          <Search className="w-4 h-4" aria-hidden="true" />
          {mobileFiltersOpen ? "Hide filters" : "Show filters & sort"}
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar — hidden on mobile unless toggled */}
          <aside
            id="filter-sidebar"
            className={`w-full md:w-64 shrink-0 space-y-4 ${mobileFiltersOpen ? "block" : "hidden md:block"}`}
            aria-label="Filter and sort results"
          >
            {/* FIX W2: sidebar headers use proper spacing (16px/24px on 8pt grid) */}
            <div className="bg-white border border-[#e5e7eb] rounded-lg p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-[#111827] mb-4 uppercase tracking-wider">
                Sort by
              </h2>
              <div className="space-y-3">
                {([
                  ["price", "Price (lowest first)"],
                  ["rating", "Rating (highest first)"],
                  ["name", "Name (A–Z)"],
                ] as const).map(([val, label]) => (
                  <label
                    key={val}
                    className="flex items-center gap-3 cursor-pointer min-h-[44px] py-1"
                  >
                    <input
                      type="radio"
                      name="sort"
                      value={val}
                      checked={sortBy === val}
                      onChange={() => setSortBy(val)}
                      className="accent-[#1a3a52] w-4 h-4 shrink-0"
                    />
                    <span className="text-sm text-[#111827]">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#e5e7eb] rounded-lg p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-[#111827] mb-4 uppercase tracking-wider">
                Price range
              </h2>
              <div className="space-y-3">
                {PRICE_RANGES.map((range, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-3 cursor-pointer min-h-[44px] py-1"
                  >
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === i}
                      onChange={() => setPriceRange(i)}
                      className="accent-[#1a3a52] w-4 h-4 shrink-0"
                    />
                    <span className="text-sm text-[#111827]">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Results header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-[#6b7280]" aria-live="polite" aria-atomic="true">
                <span className="font-semibold text-[#111827]">{filteredAndSorted.length}</span>{" "}
                funeral director{filteredAndSorted.length !== 1 ? "s" : ""}
                {postcode ? ` matching "${postcode}"` : ""}
              </p>

              {/* FIX C3: toggle buttons with 44px touch targets + visible focus */}
              <div
                className="flex items-center gap-1 bg-white border border-[#e5e7eb] rounded p-1"
                role="group"
                aria-label="View mode"
              >
                <button
                  onClick={() => setViewMode("list")}
                  aria-pressed={viewMode === "list"}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded text-xs font-medium transition-colors min-h-[36px] min-w-[64px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-1 ${
                    viewMode === "list"
                      ? "bg-[#1a3a52] text-white"
                      : "text-[#6b7280] hover:text-[#1a3a52]"
                  }`}
                >
                  <List className="w-3.5 h-3.5" aria-hidden="true" />
                  List
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  aria-pressed={viewMode === "map"}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded text-xs font-medium transition-colors min-h-[36px] min-w-[64px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-1 ${
                    viewMode === "map"
                      ? "bg-[#1a3a52] text-white"
                      : "text-[#6b7280] hover:text-[#1a3a52]"
                  }`}
                >
                  <Map className="w-3.5 h-3.5" aria-hidden="true" />
                  Map
                </button>
              </div>
            </div>

            {viewMode === "list" ? (
              <div className="space-y-3" role="list" aria-label="Funeral directors">
                {filteredAndSorted.length === 0 ? (
                  <div className="bg-white border border-[#e5e7eb] rounded-lg p-12 text-center">
                    <ArrowUpDown className="w-8 h-8 text-[#d1d5db] mx-auto mb-3" aria-hidden="true" />
                    <p className="font-semibold text-[#111827] mb-1">No results found</p>
                    <p className="text-sm text-[#6b7280]">Try adjusting your filters or search term.</p>
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
                className="bg-white border border-[#e5e7eb] rounded-lg overflow-hidden shadow-sm"
                style={{ height: 560 }}
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
