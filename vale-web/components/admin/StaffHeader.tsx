"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, ShieldCheck, Building2, MessageSquareWarning } from "lucide-react";
import { signOutStaff } from "@/lib/staffAuthClient";

const NAV_ITEMS = [
  { href: "/admin/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/verification", label: "Verification", icon: ShieldCheck },
  { href: "/admin/directors", label: "Directors", icon: Building2 },
  { href: "/admin/reviews", label: "Reviews", icon: MessageSquareWarning },
] as const;

export default function StaffHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOutStaff();
    router.push("/admin/login");
  };

  return (
    <header className="sticky top-0 z-50" style={{ background: "#100B20", borderBottom: "1px solid rgba(28,31,42,0.3)" }}>
      <div className="max-w-[1366px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/overview" aria-label="Vale staff panel" className="flex items-center gap-2 focus:outline-none rounded">
            <span
              className="text-xl tracking-tight"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600, color: "white" }}
            >Vale<span style={{ color: "#F5C541" }}>.</span></span>
          </Link>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-1 rounded-full"
            style={{ background: "rgba(226,107,94,0.18)", color: "#F0968A" }}
          >
            Staff
          </span>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-1.5 text-sm px-3 py-2 rounded min-h-[44px] hover:opacity-75 transition-opacity focus:outline-none"
          style={{ background: "rgba(255,255,255,0.12)", color: "white" }}
        >
          <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
          Sign out
        </button>
      </div>

      <nav
        className="max-w-[1366px] mx-auto px-6 flex items-center gap-1 overflow-x-auto"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        aria-label="Staff panel sections"
      >
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-1.5 text-sm px-4 py-3 font-medium transition-colors focus:outline-none whitespace-nowrap"
              style={{
                color: active ? "white" : "rgba(255,255,255,0.6)",
                borderBottom: active ? "2px solid #F5C541" : "2px solid transparent",
              }}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
