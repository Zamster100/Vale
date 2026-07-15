// Seeds Supabase from the existing dummy data (lib/data.ts + data/quote-requests.json).
// Run with: npm run seed
//
// Idempotent: funeral_directors and quote_requests are upserted by id; the
// per-FD child rows (prices/reviews/gallery/team) have no stable natural id
// in the source data, so they're cleared and re-inserted on every run.

import { config } from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";
import { createAdminClient } from "../lib/supabase/admin";
import { funeralDirectors } from "../lib/data";
import type { QuoteRequest } from "../lib/adminData";

config({ path: join(__dirname, "..", ".env.local") });

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

async function main() {
  const supabase = createAdminClient();

  for (const fd of funeralDirectors) {
    console.log(`Seeding ${fd.id} (${fd.name})...`);

    const { error: fdError } = await supabase.from("funeral_directors").upsert({
      id: fd.id,
      name: fd.name,
      address: fd.address,
      postcode: fd.postcode,
      city: fd.city,
      phone: fd.phone,
      website: fd.website,
      latitude: fd.latitude,
      longitude: fd.longitude,
      rating: fd.rating,
      review_count: fd.reviewCount,
      verified: fd.verified,
      assured: fd.assured,
      description: fd.description,
      nafd_verified: fd.nafdVerified ?? false,
      saif_verified: fd.saifVerified ?? false,
      bifd_verified: fd.bifdVerified ?? false,
      iccm_verified: fd.iccmVerified ?? false,
      verified_at: fd.verifiedAt ?? null,
      hours: fd.hours ?? null,
      hero_image: fd.heroImage ?? null,
    });
    if (fdError) throw new Error(`${fd.id} funeral_directors upsert failed: ${fdError.message}`);

    await supabase.from("prices").delete().eq("fd_id", fd.id);
    if (fd.prices.length) {
      const { error } = await supabase.from("prices").insert(
        fd.prices.map((p) => ({
          fd_id: fd.id,
          service: p.service,
          type: p.type,
          price: p.price,
          includes: p.includes,
        }))
      );
      if (error) throw new Error(`${fd.id} prices insert failed: ${error.message}`);
    }

    await supabase.from("reviews").delete().eq("fd_id", fd.id);
    if (fd.reviews.length) {
      const { error } = await supabase.from("reviews").insert(
        fd.reviews.map((r) => ({
          fd_id: fd.id,
          family_name: r.name,
          rating: r.rating,
          text: r.text,
          created_at: parseLegacyDate(r.date),
          verified: r.verified,
          quote_request_id: r.quoteRequestId ?? null,
          status: r.status ?? null,
          communication_rating: r.communicationRating ?? null,
          dignity_rating: r.dignityRating ?? null,
          value_rating: r.valueRating ?? null,
          facilities_rating: r.facilitiesRating ?? null,
        }))
      );
      if (error) throw new Error(`${fd.id} reviews insert failed: ${error.message}`);
    }

    await supabase.from("gallery_photos").delete().eq("fd_id", fd.id);
    if (fd.gallery?.length) {
      const { error } = await supabase.from("gallery_photos").insert(
        fd.gallery.map((g) => ({
          fd_id: fd.id,
          url: g.url,
          category: g.category,
          caption: g.caption ?? null,
          sort_order: g.order,
        }))
      );
      if (error) throw new Error(`${fd.id} gallery_photos insert failed: ${error.message}`);
    }

    await supabase.from("team_members").delete().eq("fd_id", fd.id);
    if (fd.team?.length) {
      const { error } = await supabase.from("team_members").insert(
        fd.team.map((t) => ({
          fd_id: fd.id,
          name: t.name,
          title: t.title,
          bio: t.bio,
          photo_url: t.photoUrl,
          years_exp: t.yearsExp ?? null,
          sort_order: t.order,
        }))
      );
      if (error) throw new Error(`${fd.id} team_members insert failed: ${error.message}`);
    }
  }

  console.log("Seeding quote requests...");
  const quoteRequestsPath = join(process.cwd(), "data", "quote-requests.json");
  const quoteRequests: QuoteRequest[] = JSON.parse(readFileSync(quoteRequestsPath, "utf-8"));
  if (quoteRequests.length) {
    const { error } = await supabase.from("quote_requests").upsert(
      quoteRequests.map((q) => ({
        id: q.id,
        fd_id: q.fdId,
        fd_name: q.fdName,
        family_name: q.familyName,
        email: q.email,
        phone: q.phone,
        service_type: q.serviceType,
        message: q.message,
        status: q.status,
        created_at: q.createdAt,
      }))
    );
    if (error) throw new Error(`quote_requests upsert failed: ${error.message}`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
