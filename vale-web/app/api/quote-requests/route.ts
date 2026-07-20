import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { mapQuoteRequestRow, type QuoteRequestRow } from "@/lib/queries/quoteRequests";
import { logEmails } from "@/lib/email";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fdId = searchParams.get("fdId");

  const supabase = createAdminClient();
  let query = supabase.from("quote_requests").select("*");
  if (fdId) query = query.eq("fd_id", fdId);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const requests = (data as QuoteRequestRow[]).map(mapQuoteRequestRow);
  requests.sort((a, b) => {
    if (a.status === "pending" && b.status !== "pending") return -1;
    if (a.status !== "pending" && b.status === "pending") return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return NextResponse.json(requests);
}

export async function POST(req: NextRequest) {
  let body: {
    fdId: string;
    fdName: string;
    familyName: string;
    email: string;
    phone?: string;
    serviceType: string;
    message?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.fdId || !body.familyName || !body.email || !body.serviceType) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("quote_requests")
    .insert({
      fd_id: body.fdId,
      fd_name: body.fdName,
      family_name: body.familyName,
      email: body.email,
      phone: body.phone ?? "",
      service_type: body.serviceType,
      message: body.message ?? "",
      status: "pending",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const newRequest = mapQuoteRequestRow(data as QuoteRequestRow);

  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/directors/dashboard`;

  logEmails(
    {
      fdName: body.fdName,
      familyName: body.familyName,
      email: body.email,
      phone: body.phone,
      serviceType: body.serviceType,
      message: body.message,
      dashboardUrl,
    },
    {
      familyName: body.familyName,
      fdName: body.fdName,
      serviceType: body.serviceType,
    }
  );

  return NextResponse.json(newRequest, { status: 201 });
}
