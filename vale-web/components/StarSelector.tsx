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
      <div
        className="flex items-center gap-1"
        role="radiogroup"
        aria-label="Star rating"
      >
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
            className="p-1.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-1 min-h-[44px] min-w-[44px] flex items-center justify-center transition-transform hover:scale-110"
          >
            <Star
              aria-hidden="true"
              className={`w-7 h-7 transition-colors ${
                s <= active
                  ? "text-[#d4a574] fill-[#d4a574]"
                  : "text-[#d1d5db] fill-[#d1d5db]"
              }`}
            />
          </button>
        ))}
      </div>
      <p
        className="text-sm text-[#6b7280] mt-1.5 min-h-[20px] transition-all"
        aria-live="polite"
      >
        {active > 0 ? LABELS[active] : ""}
      </p>
    </div>
  );
}
