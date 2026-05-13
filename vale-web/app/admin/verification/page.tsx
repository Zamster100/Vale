"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { getUser } from "@/lib/auth";
import VerificationPanel from "@/components/admin/VerificationPanel";

export default function VerificationPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user) { router.replace("/admin/signup"); return; }
    setChecked(true);
  }, [router]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F7F3EE" }}>
        <div
          className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: "#1C1F2A", borderTopColor: "transparent" }}
          aria-label="Loading"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F7F3EE" }}>
      <header
        className="sticky top-0 z-50"
        style={{ background: "#1C1F2A", borderBottom: "1px solid rgba(28,31,42,0.3)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xl tracking-tight focus:outline-none rounded"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600, color: "white" }}
              aria-label="Vale home"
            >
              Vale<span style={{ color: "#5E8B73" }}>.</span>
            </Link>
            <span style={{ color: "rgba(255,255,255,0.3)" }} aria-hidden="true">|</span>
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              Verification Panel
            </span>
          </div>
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-1.5 text-sm px-3 py-2 rounded hover:opacity-75 transition-opacity focus:outline-none min-h-[44px]"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: "rgba(212,165,116,0.15)",
              border: "1.5px solid rgba(212,165,116,0.4)",
            }}
          >
            <ShieldCheck className="w-5 h-5" style={{ color: "#C4975A" }} aria-hidden="true" />
          </div>
          <div>
            <h1
              className="text-xl font-semibold"
              style={{ color: "#1C1F2A", fontFamily: "var(--font-cormorant)" }}
            >
              Vale Verification Panel
            </h1>
            <p className="text-sm" style={{ color: "#5F7080" }}>
              Accreditation and Assured status management · Vale admin only
            </p>
          </div>
        </div>

        <div
          className="p-6 rounded-xl"
          style={{ background: "white", border: "1px solid #E8E2D8" }}
        >
          <VerificationPanel />
        </div>
      </main>
    </div>
  );
}
