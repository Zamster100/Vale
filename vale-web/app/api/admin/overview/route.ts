import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireStaff } from "@/lib/staffAuth";

export async function GET() {
  const staff = await requireStaff();
  if (!staff) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const supabase = createAdminClient();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [
    totalFds,
    verifiedFds,
    assuredFds,
    unclaimedFds,
    totalQuoteRequests,
    recentQuoteRequests,
    totalReviews,
    hiddenReviews,
    ratings,
  ] = await Promise.all([
    supabase.from("funeral_directors").select("*", { count: "exact", head: true }),
    supabase.from("funeral_directors").select("*", { count: "exact", head: true }).eq("verified", true),
    supabase.from("funeral_directors").select("*", { count: "exact", head: true }).eq("assured", true),
    supabase.from("funeral_directors").select("*", { count: "exact", head: true }).is("owner_user_id", null),
    supabase.from("quote_requests").select("*", { count: "exact", head: true }),
    supabase.from("quote_requests").select("*", { count: "exact", head: true }).gte("created_at", sevenDaysAgo),
    supabase.from("reviews").select("*", { count: "exact", head: true }),
    supabase.from("reviews").select("*", { count: "exact", head: true }).eq("hidden", true),
    supabase.from("reviews").select("rating"),
  ]);

  const ratingValues = (ratings.data ?? []).map((r) => r.rating as number);
  const averageRating = ratingValues.length
    ? ratingValues.reduce((sum, r) => sum + r, 0) / ratingValues.length
    : 0;

  return NextResponse.json({
    totalFds: totalFds.count ?? 0,
    verifiedFds: verifiedFds.count ?? 0,
    assuredFds: assuredFds.count ?? 0,
    unclaimedFds: unclaimedFds.count ?? 0,
    totalQuoteRequests: totalQuoteRequests.count ?? 0,
    recentQuoteRequests: recentQuoteRequests.count ?? 0,
    totalReviews: totalReviews.count ?? 0,
    hiddenReviews: hiddenReviews.count ?? 0,
    averageRating: Math.round(averageRating * 10) / 10,
  });
}
