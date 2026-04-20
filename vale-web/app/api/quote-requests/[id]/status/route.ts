import { NextRequest, NextResponse } from "next/server";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { QuoteRequest, QuoteStatus } from "@/lib/adminData";

const DATA_FILE = join(process.cwd(), "data", "quote-requests.json");

const VALID_STATUSES: QuoteStatus[] = ["pending", "contacted", "booked", "declined"];

function readRequests(): QuoteRequest[] {
  if (!existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(readFileSync(DATA_FILE, "utf-8")) as QuoteRequest[];
  } catch {
    return [];
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body: { status: QuoteStatus };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const requests = readRequests();
  const idx = requests.findIndex((r) => r.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  requests[idx] = { ...requests[idx], status: body.status };
  writeFileSync(DATA_FILE, JSON.stringify(requests, null, 2), "utf-8");

  return NextResponse.json(requests[idx]);
}
