import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({ rating, size = "md" }: StarRatingProps) {
  const cls =
    size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4";
  const filled = Math.round(rating);
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          aria-hidden="true"
          className={`${cls} ${
            s <= filled
              ? "text-[#d4a574] fill-[#d4a574]"
              : "text-[#e5e7eb] fill-[#e5e7eb]"
          }`}
        />
      ))}
    </span>
  );
}
