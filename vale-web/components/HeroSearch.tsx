"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Loader2, X } from "lucide-react";
import { funeralDirectors } from "@/lib/data";

interface Suggestion {
  label: string;
  sublabel: string;
  query: string;
}

const UNIQUE_LOCATIONS: Suggestion[] = Array.from(
  new Map(
    funeralDirectors.flatMap((fd) => [
      [`${fd.city}`, { label: fd.city, sublabel: "City", query: fd.city }],
      [`${fd.postcode}`, { label: fd.postcode, sublabel: fd.city, query: fd.postcode }],
    ])
  ).values()
);

function getSuggestions(query: string): Suggestion[] {
  if (!query.trim() || query.length < 2) return [];
  const q = query.toLowerCase();
  return UNIQUE_LOCATIONS.filter(
    (s) => s.label.toLowerCase().startsWith(q) || s.sublabel.toLowerCase().startsWith(q)
  ).slice(0, 6);
}

export default function HeroSearch() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [locating, setLocating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const open = focused && (suggestions.length > 0 || value.length >= 2);

  useEffect(() => {
    setSuggestions(getSuggestions(value));
    setActiveIndex(-1);
  }, [value]);

  const navigate = useCallback(
    (query: string) => {
      if (!query.trim()) return;
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    },
    [router]
  );

  const handleSelect = (s: Suggestion) => {
    setValue(s.label);
    setSuggestions([]);
    setFocused(false);
    navigate(s.query);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      handleSelect(suggestions[activeIndex]);
    } else {
      navigate(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, -1)); }
    if (e.key === "Escape") { setSuggestions([]); setFocused(false); inputRef.current?.blur(); }
  };

  const handleLocate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocating(false);
        router.push("/search?q=near+me");
      },
      () => setLocating(false),
      { timeout: 8000 }
    );
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} role="search" aria-label="Search for funeral directors">
        <div
          className="flex items-center gap-0 transition-all duration-200"
          style={{
            background: "white",
            borderRadius: open ? "20px 20px 0 0" : "9999px",
            border: focused ? "1.5px solid rgba(138,95,170,0.5)" : "1.5px solid rgba(143,160,176,0.25)",
            boxShadow: focused
              ? "0 4px 32px rgba(93,58,122,0.12)"
              : "0 2px 16px rgba(93,58,122,0.07)",
          }}
        >
          {/* Search icon */}
          <div className="pl-5 pr-3 shrink-0" aria-hidden="true">
            <Search className="w-5 h-5" style={{ color: "#8A5FAA" }} />
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            autoComplete="off"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search for funeral homes — address, postcode…"
            className="flex-1 py-5 text-base bg-transparent outline-none min-w-0"
            style={{ color: "#3F5E2C" }}
            aria-label="Search for funeral directors by address or postcode"
            aria-expanded={open}
            aria-autocomplete="list"
            aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
            role="combobox"
          />

          {/* Clear button */}
          {value && (
            <button
              type="button"
              onClick={() => { setValue(""); inputRef.current?.focus(); }}
              className="p-2 mr-1 rounded-full hover:opacity-60 transition-opacity focus:outline-none shrink-0"
              aria-label="Clear search"
              style={{ color: "#8FA0B0" }}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Divider */}
          <div className="w-px h-6 shrink-0 mx-1" style={{ background: "rgba(143,160,176,0.3)" }} aria-hidden="true" />

          {/* Use my location */}
          <button
            type="button"
            onClick={handleLocate}
            disabled={locating}
            className="flex items-center gap-1.5 px-4 py-5 text-sm font-medium shrink-0 hover:opacity-75 transition-opacity focus:outline-none disabled:opacity-50"
            style={{ color: "#8A5FAA" }}
            aria-label="Use my current location"
          >
            {locating
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <MapPin className="w-4 h-4" />}
            <span className="hidden sm:inline">Near me</span>
          </button>

          {/* Divider */}
          <div className="w-px h-6 shrink-0 mx-1" style={{ background: "rgba(143,160,176,0.3)" }} aria-hidden="true" />

          {/* Search button */}
          <button
            type="submit"
            className="m-2 px-6 py-3 rounded-full font-semibold text-sm text-white hover:scale-[1.03] active:scale-[0.97] transition-transform focus:outline-none shrink-0 min-h-[44px]"
            style={{ background: "#5AAE55" }}
            aria-label="Search"
          >
            Search
          </button>
        </div>
      </form>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          aria-label="Location suggestions"
          className="absolute left-0 right-0 z-50 overflow-hidden"
          style={{
            background: "white",
            borderRadius: "0 0 20px 20px",
            border: "1.5px solid rgba(138,95,170,0.5)",
            borderTop: "none",
            boxShadow: "0 8px 32px rgba(93,58,122,0.12)",
          }}
        >
          {suggestions.map((s, i) => (
            <li
              key={s.query}
              id={`suggestion-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={(e) => { e.preventDefault(); handleSelect(s); }}
              onMouseEnter={() => setActiveIndex(i)}
              className="flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors"
              style={{
                background: i === activeIndex ? "rgba(138,95,170,0.06)" : "transparent",
                borderTop: i > 0 ? "0.5px solid rgba(197,210,220,0.4)" : "none",
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(197,210,220,0.4)" }}
                aria-hidden="true"
              >
                <MapPin className="w-3.5 h-3.5" style={{ color: "#8A5FAA" }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "#3F5E2C" }}>{s.label}</p>
                <p className="text-xs" style={{ color: "#8FA0B0" }}>{s.sublabel}</p>
              </div>
            </li>
          ))}
          {value.trim().length >= 2 && (
            <li
              role="option"
              aria-selected={false}
              onMouseDown={(e) => { e.preventDefault(); navigate(value); }}
              className="flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors"
              style={{
                background: "transparent",
                borderTop: "0.5px solid rgba(197,210,220,0.4)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(138,95,170,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(226,107,94,0.1)" }}
                aria-hidden="true"
              >
                <Search className="w-3.5 h-3.5" style={{ color: "#E26B5E" }} />
              </div>
              <p className="text-sm font-medium" style={{ color: "#3F5E2C" }}>
                Search for &ldquo;<span style={{ color: "#5D3A7A" }}>{value}</span>&rdquo;
              </p>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
