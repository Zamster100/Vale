"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const LABELS = ["", "Poor", "Below average", "Average", "Good", "Excellent"];

const FACTORS = [
  { key: "communicationRating" as const, label: "Communication", hint: "How well they communicated with your family" },
  { key: "dignityRating" as const, label: "Dignity & Care", hint: "How respectfully your loved one was treated" },
  { key: "valueRating" as const, label: "Value for Money", hint: "Fair, transparent pricing with no surprises" },
  { key: "facilitiesRating" as const, label: "Facilities", hint: "Quality of the premises and environment" },
];

export type FactorRatings = {
  communicationRating: number;
  dignityRating: number;
  valueRating: number;
  facilitiesRating: number;
};

function FactorRow({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-4">
      <div className="min-w-0 sm:flex-1">
        <p className="text-sm font-medium" style={{ color: "#5D3A7A" }}>{label}</p>
        <p className="text-xs leading-tight mt-0.5" style={{ color: "#5F7080" }}>{hint}</p>
      </div>
      <div className="flex flex-col items-start sm:items-end shrink-0 gap-0.5">
        <div className="flex items-center gap-0.5" role="radiogroup" aria-label={`${label} rating`}>
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={value === s}
              aria-label={`${s} star — ${LABELS[s]}`}
              onClick={() => onChange(s)}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
              onFocus={() => setHover(s)}
              onBlur={() => setHover(0)}
              className="p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 min-h-[44px] min-w-[44px] flex items-center justify-center transition-transform hover:scale-110"
              style={{ ["--tw-ring-color" as string]: "#8A5FAA" }}
            >
              <Star
                aria-hidden="true"
                className="w-6 h-6 transition-colors"
                style={{
                  color: s <= active ? "#d4a574" : "rgba(197,210,220,0.8)",
                  fill: s <= active ? "#d4a574" : "rgba(197,210,220,0.8)",
                }}
              />
            </button>
          ))}
        </div>
        <p className="text-xs min-h-[16px]" style={{ color: "#8A5FAA" }} aria-live="polite">
          {active > 0 ? LABELS[active] : ""}
        </p>
      </div>
    </div>
  );
}

interface Props {
  values: FactorRatings;
  onChange: (values: FactorRatings) => void;
}

export default function FourFactorSelector({ values, onChange }: Props) {
  return (
    <div className="space-y-4">
      {FACTORS.map(({ key, label, hint }) => (
        <FactorRow
          key={key}
          label={label}
          hint={hint}
          value={values[key]}
          onChange={(v) => onChange({ ...values, [key]: v })}
        />
      ))}
    </div>
  );
}
