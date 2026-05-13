import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({ rating, size = "md" }: StarRatingProps) {
  const cls = size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-3.5 h-3.5";
  const filled = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          aria-hidden="true"
          className={cls}
          style={{
            color: s <= filled ? "#E26B5E" : "#EAF2EE",
            fill: s <= filled ? "#E26B5E" : "#EAF2EE",
          }}
        />
      ))}
    </span>
  );
}
