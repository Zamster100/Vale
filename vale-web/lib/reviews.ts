import { funeralDirectors } from "@/lib/data";

export interface StoredReview {
  id: string;
  fdId: string;
  fdName: string;
  rating: number;
  text: string;
  familyName: string;
  createdAt: string; // ISO
  verified: boolean;
}

export interface ReviewStats {
  avg: number;
  count: number;
  distribution: Record<number, number>; // star → count
}

const STORAGE_KEY = "vale_reviews";

const MONTH_MAP: Record<string, string> = {
  January: "01", February: "02", March: "03", April: "04",
  May: "05", June: "06", July: "07", August: "08",
  September: "09", October: "10", November: "11", December: "12",
};

function parseLegacyDate(dateStr: string): string {
  const [month, year] = dateStr.split(" ");
  if (year && MONTH_MAP[month]) {
    return `${year}-${MONTH_MAP[month]}-15T12:00:00.000Z`;
  }
  return new Date().toISOString();
}

export function getSeedReviews(): StoredReview[] {
  const out: StoredReview[] = [];
  let idx = 0;
  for (const fd of funeralDirectors) {
    for (const r of fd.reviews) {
      out.push({
        id: `seed_${fd.id}_${idx++}`,
        fdId: fd.id,
        fdName: fd.name,
        rating: r.rating,
        text: r.text,
        familyName: r.name,
        createdAt: parseLegacyDate(r.date),
        verified: r.verified,
      });
    }
  }
  return out;
}

export function getSubmittedReviews(): StoredReview[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as StoredReview[];
  } catch {
    return [];
  }
}

export function getAllReviewsForFD(fdId: string): StoredReview[] {
  const seed = getSeedReviews().filter((r) => r.fdId === fdId);
  const submitted = getSubmittedReviews().filter((r) => r.fdId === fdId);
  return [...submitted, ...seed].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function submitReview(data: {
  fdId: string;
  fdName: string;
  rating: number;
  text: string;
  familyName: string;
}): void {
  const existing = getSubmittedReviews();
  const review: StoredReview = {
    id: `user_${Date.now()}`,
    ...data,
    createdAt: new Date().toISOString(),
    verified: false,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([review, ...existing]));
}

export function getReviewStats(reviews: StoredReview[]): ReviewStats {
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  if (reviews.length === 0) return { avg: 0, count: 0, distribution };
  let total = 0;
  for (const r of reviews) {
    distribution[r.rating] = (distribution[r.rating] ?? 0) + 1;
    total += r.rating;
  }
  return {
    avg: Math.round((total / reviews.length) * 10) / 10,
    count: reviews.length,
    distribution,
  };
}

export function formatReviewDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}
