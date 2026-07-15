import { createClient } from "@/lib/supabase/client";
import type { FuneralDirector, OpeningHours, ServiceType, PhotoCategory } from "@/lib/data";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatMonthYear(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return `${MONTH_NAMES[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

const SELECT = "*, prices(*), reviews(*), gallery_photos(*), team_members(*)";

// Matches the shape Supabase returns for the nested select above.
interface FDRow {
  id: string;
  name: string;
  address: string;
  postcode: string;
  city: string;
  phone: string;
  website: string;
  latitude: number;
  longitude: number;
  rating: number;
  review_count: number;
  verified: boolean;
  assured: boolean;
  description: string;
  nafd_verified: boolean;
  saif_verified: boolean;
  bifd_verified: boolean;
  iccm_verified: boolean;
  verified_at: string | null;
  hours: OpeningHours | null;
  hero_image: string | null;
  prices: { service: string; type: string; price: number; includes: string[] }[];
  reviews: {
    family_name: string; rating: number; text: string; created_at: string;
    verified: boolean; quote_request_id: string | null; status: string | null;
    communication_rating: number | null; dignity_rating: number | null;
    value_rating: number | null; facilities_rating: number | null;
  }[];
  gallery_photos: { id: string; url: string; category: string; caption: string | null; sort_order: number }[];
  team_members: { id: string; name: string; title: string; bio: string; photo_url: string; years_exp: number | null; sort_order: number }[];
}

function mapRow(row: FDRow): FuneralDirector {
  return {
    id: row.id,
    name: row.name,
    address: row.address,
    postcode: row.postcode,
    city: row.city,
    phone: row.phone,
    website: row.website,
    latitude: row.latitude,
    longitude: row.longitude,
    rating: row.rating,
    reviewCount: row.review_count,
    verified: row.verified,
    assured: row.assured,
    description: row.description,
    nafdVerified: row.nafd_verified,
    saifVerified: row.saif_verified,
    bifdVerified: row.bifd_verified,
    iccmVerified: row.iccm_verified,
    verifiedAt: row.verified_at ?? undefined,
    hours: row.hours ?? undefined,
    heroImage: row.hero_image ?? undefined,
    prices: row.prices.map((p) => ({
      service: p.service,
      type: p.type as ServiceType,
      price: p.price,
      includes: p.includes,
    })),
    reviews: row.reviews.map((r) => ({
      name: r.family_name,
      rating: r.rating,
      text: r.text,
      date: formatMonthYear(r.created_at),
      verified: r.verified,
      quoteRequestId: r.quote_request_id,
      status: r.status as "booked" | "pending" | undefined,
      communicationRating: r.communication_rating ?? undefined,
      dignityRating: r.dignity_rating ?? undefined,
      valueRating: r.value_rating ?? undefined,
      facilitiesRating: r.facilities_rating ?? undefined,
    })),
    gallery: row.gallery_photos
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((g) => ({ id: g.id, url: g.url, category: g.category as PhotoCategory, caption: g.caption ?? undefined, order: g.sort_order })),
    team: row.team_members
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((t) => ({ id: t.id, name: t.name, title: t.title, bio: t.bio, photoUrl: t.photo_url, yearsExp: t.years_exp ?? undefined, order: t.sort_order })),
  };
}

export async function getFuneralDirectors(): Promise<FuneralDirector[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("funeral_directors").select(SELECT);
  if (error) throw error;
  return (data as unknown as FDRow[]).map(mapRow);
}

export async function getFuneralDirectorById(id: string): Promise<FuneralDirector | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from("funeral_directors").select(SELECT).eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? mapRow(data as unknown as FDRow) : null;
}
