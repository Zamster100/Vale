"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DECK_PASSWORD, DECK_AUTH_COOKIE, DECK_AUTH_VALUE } from "@/lib/deck-auth";

export async function authenticateDeck(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/deck");

  if (password !== DECK_PASSWORD) {
    redirect(`/deck/login?error=1&next=${encodeURIComponent(next)}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(DECK_AUTH_COOKIE, DECK_AUTH_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/deck",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect(next);
}
