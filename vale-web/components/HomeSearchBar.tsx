"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Building2 } from "lucide-react";
import { funeralDirectors } from "@/lib/data";

const OS = "var(--font-open-sans), -apple-system, sans-serif";

/* ── Suggestion types ───────────────────────────────────────── */
type SuggestionKind = "city" | "postcode" | "director";

interface Suggestion {
  label: string;
  sublabel?: string;
  kind: SuggestionKind;
  searchValue: string; // passed as ?q= for city/postcode
  fdId?: string;       // navigates directly to profile for directors
}

/* ── Build suggestions from data ────────────────────────────── */
function getSuggestions(query: string): Suggestion[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];

  const results: Suggestion[] = [];
  const seenCities = new Set<string>();
  const seenAreas = new Set<string>();

  for (const fd of funeralDirectors) {
    // City: starts-with match
    if (fd.city.toLowerCase().startsWith(q) && !seenCities.has(fd.city)) {
      seenCities.add(fd.city);
      const count = funeralDirectors.filter((f) => f.city === fd.city).length;
      results.push({
        label: fd.city,
        sublabel: `${count} director${count !== 1 ? "s" : ""}`,
        kind: "city",
        searchValue: fd.city,
      });
    }

    // Postcode area (e.g. "SW1"): starts-with match
    const area = fd.postcode.split(" ")[0];
    const areaLower = area.toLowerCase();
    if (areaLower.startsWith(q) && !seenAreas.has(area)) {
      seenAreas.add(area);
      results.push({
        label: area,
        sublabel: fd.city,
        kind: "postcode",
        searchValue: area,
      });
    }

    // Full postcode: starts-with match (ignore spaces)
    const fullPc = fd.postcode.toLowerCase().replace(/\s/g, "");
    const qNoSp = q.replace(/\s/g, "");
    if (fullPc.startsWith(qNoSp) && !seenAreas.has(fd.postcode)) {
      seenAreas.add(fd.postcode);
      results.push({
        label: fd.postcode,
        sublabel: fd.city,
        kind: "postcode",
        searchValue: fd.postcode,
      });
    }

    // Director name: contains match → links directly to profile
    if (fd.name.toLowerCase().includes(q)) {
      const from = Math.min(...fd.prices.map((p) => p.price));
      results.push({
        label: fd.name,
        sublabel: `${fd.city} · from £${from.toLocaleString()}`,
        kind: "director",
        searchValue: fd.name,
        fdId: fd.id,
      });
    }
  }

  return results.slice(0, 7);
}

/* ── Component ───────────────────────────────────────────────── */
export default function HomeSearchBar() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const hasText = value.trim().length > 0;
  const suggestions = useMemo(() => getSuggestions(value), [value]);
  const showDropdown = open && suggestions.length > 0;

  /* Close when clicking outside */
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIdx(-1);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  /* Navigate to search or profile */
  function navigate(q: string) {
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    router.push(`/search${p.toString() ? `?${p}` : ""}`);
    setOpen(false);
    setActiveIdx(-1);
  }

  function selectSuggestion(s: Suggestion) {
    if (s.kind === "director" && s.fdId) {
      router.push(`/funeral-directors/${s.fdId}`);
      setOpen(false);
    } else {
      setValue(s.searchValue);
      navigate(s.searchValue);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (activeIdx >= 0 && suggestions[activeIdx]) {
      selectSuggestion(suggestions[activeIdx]);
    } else {
      navigate(value);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIdx(-1);
    }
  }

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <form onSubmit={handleSubmit} role="search" aria-label="Search funeral directors">
        <div className="flex flex-row gap-2 items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setOpen(true);
              setActiveIdx(-1);
            }}
            onFocus={() => { if (value.trim().length >= 2) setOpen(true); }}
            onKeyDown={handleKeyDown}
            placeholder="Search by town or postal code"
            aria-label="Town or postal code"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-expanded={showDropdown}
            autoComplete="off"
            style={{
              fontFamily: OS,
              fontSize: "15px",
              color: "#100B20",
              background: "transparent",
              border: "none",
              borderRadius: "8px",
              padding: "10px 8px",
              outline: "none",
              width: "100%",
              flex: 1,
            }}
          />
          <button
            type="submit"
            aria-label="Search"
            style={{
              fontFamily: OS,
              fontSize: "14px",
              fontWeight: 700,
              background: "#4F34C4",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              padding: "10px 22px",
              cursor: hasText ? "pointer" : "default",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap",
              flexShrink: 0,
              opacity: hasText ? 1 : 0.38,
              transition: "opacity 0.18s ease",
            }}
          >
            <Search size={15} aria-hidden="true" />
            Search
          </button>
        </div>
      </form>

      {/* ── Autocomplete dropdown ── */}
      {showDropdown && (
        <ul
          role="listbox"
          aria-label="Suggestions"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid #E8E8F4",
            borderRadius: "16px",
            boxShadow: "0 12px 40px rgba(26,26,46,0.13)",
            zIndex: 100,
            overflow: "hidden",
            listStyle: "none",
            margin: 0,
            padding: "4px",
          }}
        >
          {suggestions.map((s, i) => {
            const isActive = i === activeIdx;
            const isDirector = s.kind === "director";
            return (
              <li
                key={i}
                role="option"
                aria-selected={isActive}
                onMouseDown={(e) => { e.preventDefault(); selectSuggestion(s); }}
                onMouseEnter={() => setActiveIdx(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "9px 12px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  background: isActive ? "#E3DFFF" : "transparent",
                  transition: "background 0.1s",
                }}
              >
                {/* Icon */}
                <span
                  style={{
                    flexShrink: 0,
                    color: isDirector ? "#AC7E08" : "#4F34C4",
                    display: "flex",
                  }}
                >
                  {isDirector
                    ? <Building2 size={14} aria-hidden="true" />
                    : <MapPin size={14} aria-hidden="true" />
                  }
                </span>

                {/* Label + sublabel */}
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: OS,
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#1A1A2E",
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.label}
                  </span>
                  {s.sublabel && (
                    <span
                      style={{
                        fontFamily: OS,
                        fontSize: "11px",
                        color: "#9090A8",
                        display: "block",
                        lineHeight: 1.3,
                      }}
                    >
                      {s.sublabel}
                    </span>
                  )}
                </span>

                {/* Kind pill */}
                <span
                  style={{
                    flexShrink: 0,
                    fontSize: "10px",
                    fontWeight: 700,
                    fontFamily: OS,
                    padding: "2px 8px",
                    borderRadius: "99px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    background: isDirector ? "#FEF1C6" : "#E3DFFF",
                    color: isDirector ? "#AC7E08" : "#4F34C4",
                  }}
                >
                  {s.kind === "city" ? "Town" : s.kind === "postcode" ? "Postcode" : "Director"}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
