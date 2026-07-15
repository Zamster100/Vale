import { createClient } from "@/lib/supabase/client";

export interface StoredReview {
  id: string;
  fdId: string;
  fdName: string;
  rating: number;
  text: string;
  familyName: string;
  createdAt: string; // ISO
  verified: boolean;
  quoteRequestId?: string | null;
  status?: "booked" | "pending";
  communicationRating?: number;
  dignityRating?: number;
  valueRating?: number;
  facilitiesRating?: number;
}

export interface ReviewStats {
  avg: number;
  count: number;
  distribution: Record<number, number>; // star → count
}

export async function getAllReviewsForFD(fdId: string, fdName: string): Promise<StoredReview[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("fd_id", fdId)
    .order("created_at", { ascending: false });
  if (error) throw error;

  return data.map((r) => ({
    id: r.id,
    fdId: r.fd_id,
    fdName,
    rating: r.rating,
    text: r.text,
    familyName: r.family_name,
    createdAt: r.created_at,
    verified: r.verified,
    quoteRequestId: r.quote_request_id,
    status: r.status ?? undefined,
    communicationRating: r.communication_rating ?? undefined,
    dignityRating: r.dignity_rating ?? undefined,
    valueRating: r.value_rating ?? undefined,
    facilitiesRating: r.facilities_rating ?? undefined,
  }));
}

export async function submitReview(data: {
  fdId: string;
  fdName: string;
  rating: number;
  communicationRating?: number;
  dignityRating?: number;
  valueRating?: number;
  facilitiesRating?: number;
  text: string;
  familyName: string;
}): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("reviews").insert({
    fd_id: data.fdId,
    family_name: data.familyName,
    rating: data.rating,
    text: data.text,
    verified: false,
    communication_rating: data.communicationRating ?? null,
    dignity_rating: data.dignityRating ?? null,
    value_rating: data.valueRating ?? null,
    facilities_rating: data.facilitiesRating ?? null,
  });
  if (error) throw error;
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
