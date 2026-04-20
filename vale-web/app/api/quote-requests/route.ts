import { NextRequest, NextResponse } from "next/server";
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import type { QuoteRequest } from "@/lib/adminData";
import { logEmails } from "@/lib/email";

const DATA_DIR = join(process.cwd(), "data");
const DATA_FILE = join(DATA_DIR, "quote-requests.json");

function readRequests(): QuoteRequest[] {
  if (!existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(readFileSync(DATA_FILE, "utf-8")) as QuoteRequest[];
  } catch {
    return [];
  }
}

function writeRequests(requests: QuoteRequest[]): void {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(requests, null, 2), "utf-8");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fdId = searchParams.get("fdId");

  const all = readRequests();
  const filtered = fdId ? all.filter((r) => r.fdId === fdId) : all;

  filtered.sort((a, b) => {
    if (a.status === "pending" && b.status !== "pending") return -1;
    if (a.status !== "pending" && b.status === "pending") return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return NextResponse.json(filtered);
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

  const newRequest: QuoteRequest = {
    id: `qr_${Date.now()}`,
    fdId: body.fdId,
    fdName: body.fdName,
    familyName: body.familyName,
    email: body.email,
    phone: body.phone ?? "",
    serviceType: body.serviceType,
    message: body.message ?? "",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const requests = readRequests();
  requests.unshift(newRequest);
  writeRequests(requests);

  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/admin/dashboard`;

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
