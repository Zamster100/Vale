import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  let body: { name: string; email: string; subject?: string; message: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("contact_messages").insert({
    name: body.name,
    email: body.email,
    subject: body.subject ?? "",
    message: body.message,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  console.log("\n── [VALE CONTACT] New message ──────────────────────────────");
  console.log(`  From:    ${body.name} <${body.email}>`);
  if (body.subject) console.log(`  Subject: ${body.subject}`);
  console.log(`  Message: "${body.message}"`);
  console.log("─────────────────────────────────────────────────────────────\n");

  return NextResponse.json({ ok: true }, { status: 201 });
}
