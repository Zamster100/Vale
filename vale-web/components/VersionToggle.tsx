"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function VersionToggle() {
  const pathname = usePathname();
  const isV2 = pathname === "/landing-v2";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href={isV2 ? "/" : "/landing-v2"}
        className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
        style={{
          background: "#1C1F2A",
          color: "#F7F3EE",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          letterSpacing: "0.02em",
        }}
      >
        {isV2 ? (
          <>← Original design</>
        ) : (
          <>New design →</>
        )}
      </Link>
    </div>
  );
}
