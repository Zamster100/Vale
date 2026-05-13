"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const LABELS = ["", "Poor", "Below average", "Average", "Good", "Excellent"];

interface StarSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export default function StarSelector({ value, onChange }: StarSelectorProps) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div>
      <div className="flex items-center gap-1" role="radiogroup" aria-label="Star rating">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={value === s}
            aria-label={`${s} star${s !== 1 ? "s" : ""} — ${LABELS[s]}`}
            onClick={() => onChange(s)}
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(0)}
            onFocus={() => setHover(s)}
            onBlur={() => setHover(0)}
            className="p-1.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 min-h-[44px] min-w-[44px] flex items-center justify-center transition-transform hover:scale-110"
            style={{ ["--tw-ring-color" as string]: "#5E8B73" }}
          >
            <Star
              aria-hidden="true"
              className="w-7 h-7 transition-colors"
              style={{
                color: s <= active ? "#E26B5E" : "rgba(234,242,238,0.8)",
                fill: s <= active ? "#E26B5E" : "rgba(234,242,238,0.8)",
              }}
            />
          </button>
        ))}
      </div>
      <p className="text-sm mt-1.5 min-h-[20px] transition-all" style={{ color: "#7A6E64" }} aria-live="polite">
        {active > 0 ? LABELS[active] : ""}
      </p>
    </div>
  );
}
