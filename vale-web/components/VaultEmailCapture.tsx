"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function VaultEmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div
        className="rounded-xl px-5 py-4 flex items-center gap-3"
        style={{
          background: "rgba(168,212,181,0.12)",
          border: "1px solid rgba(168,212,181,0.25)",
        }}
        role="status"
        aria-live="polite"
      >
        <span className="text-sm" style={{ color: "#A8D4B5" }}>
          ✓ You&apos;re on the list — we&apos;ll be in touch soon.
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setSubmitted(true);
      }}
      className="flex flex-col sm:flex-row gap-2"
      aria-label="Join the Vale Vault waitlist"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        aria-label="Your email address"
        className="flex-1 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#A8D4B5] placeholder-white/35"
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.14)",
          color: "#FFFFFF",
        }}
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium shrink-0 hover:opacity-90 active:scale-[0.98] transition-all"
        style={{ background: "#A8D4B5", color: "#1C1F2A" }}
      >
        Start your vault
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </form>
  );
}
