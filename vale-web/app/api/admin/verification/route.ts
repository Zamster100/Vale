import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Cross-tenant admin tool (verifies/accredits *any* FD, not just the caller's
// own) -- intentionally uses the service-role client and has no auth check
// of its own yet. This mirrors today's access model (any signed-up FD can
// reach /admin/verification); a real staff-only gate is a follow-up.

export async function GET() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("funeral_directors")
    .select("id, name, nafd_verified, saif_verified, bifd_verified, iccm_verified, assured, verified_at")
    .order("name");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  let body: {
    id: string;
    nafdVerified?: boolean;
    saifVerified?: boolean;
    bifdVerified?: boolean;
    iccmVerified?: boolean;
    assured?: boolean;
    verifiedAt?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const patch: Record<string, unknown> = {};
  if (body.nafdVerified !== undefined) patch.nafd_verified = body.nafdVerified;
  if (body.saifVerified !== undefined) patch.saif_verified = body.saifVerified;
  if (body.bifdVerified !== undefined) patch.bifd_verified = body.bifdVerified;
  if (body.iccmVerified !== undefined) patch.iccm_verified = body.iccmVerified;
  if (body.assured !== undefined) patch.assured = body.assured;
  if (body.verifiedAt !== undefined) patch.verified_at = body.verifiedAt || null;

  const supabase = createAdminClient();
  const { error } = await supabase.from("funeral_directors").update(patch).eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
