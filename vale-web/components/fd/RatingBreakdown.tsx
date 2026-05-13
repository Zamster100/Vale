import { Star } from "lucide-react";

type WithFactors = {
  communicationRating?: number;
  dignityRating?: number;
  valueRating?: number;
  facilitiesRating?: number;
};

const FACTORS: { key: keyof WithFactors; label: string }[] = [
  { key: "communicationRating", label: "Communication" },
  { key: "dignityRating", label: "Dignity & Care" },
  { key: "valueRating", label: "Value for Money" },
  { key: "facilitiesRating", label: "Facilities" },
];

function MiniStars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className="w-3 h-3"
          style={{
            color: s <= Math.round(rating) ? "#C4975A" : "#EAF2EE",
            fill: s <= Math.round(rating) ? "#C4975A" : "#EAF2EE",
          }}
        />
      ))}
    </span>
  );
}

export default function RatingBreakdown({ reviews }: { reviews: WithFactors[] }) {
  const data = FACTORS.map(({ key, label }) => {
    const rated = reviews.filter((r) => r[key] != null);
    if (rated.length === 0) return null;
    const avg = rated.reduce((s, r) => s + (r[key] as number), 0) / rated.length;
    return { label, avg: Math.round(avg * 10) / 10 };
  }).filter((d): d is { label: string; avg: number } => d !== null);

  if (data.length === 0) return null;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#1C1F2A" }}>
        Rating breakdown
      </p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {data.map(({ label, avg }) => (
          <div key={label}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs" style={{ color: "#5F7080" }}>{label}</span>
              <span className="text-xs font-semibold" style={{ color: "#1C1F2A" }}>{avg}</span>
            </div>
            <MiniStars rating={avg} />
          </div>
        ))}
      </div>
    </div>
  );
}
