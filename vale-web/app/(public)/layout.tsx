import Link from "next/link";
import { MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";

const FOOTER_LINKS = {
  Families: [
    { label: "Find a funeral director", href: "/search" },
    { label: "Pre-plan with Vault", href: "/vault/login" },
    { label: "Read reviews", href: "/search" },
    { label: "Submit a review", href: "/submit-review" },
  ],
  "Funeral directors": [
    { label: "List your business", href: "/admin/signup" },
    { label: "Sign in to dashboard", href: "/admin/signup" },
    { label: "About Assured status", href: "#" },
  ],
  Company: [
    { label: "About VALE", href: "#" },
    { label: "How it works", href: "#" },
    { label: "Privacy policy", href: "#" },
    { label: "Contact us", href: "mailto:hello@vale.co.uk" },
  ],
} as const;

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="flex-1">{children}</main>

      <footer className="bg-[#1a3a52] text-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link
                href="/"
                className="flex items-center gap-2 mb-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded w-fit"
                aria-label="VALE homepage"
              >
                <div className="w-7 h-7 bg-white/10 rounded flex items-center justify-center" aria-hidden="true">
                  <MapPin className="w-3.5 h-3.5 text-[#d4a574]" />
                </div>
                <span className="text-lg font-bold tracking-tight">VALE</span>
              </Link>
              <p className="text-sm text-[#b8cdd9] leading-relaxed max-w-[200px]">
                Transparent prices. Genuine choice. Dignity for every family.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <p className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
                  {section}
                </p>
                <ul className="space-y-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm text-[#b8cdd9] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-[#6b7280]">
              © 2026 VALE. All rights reserved. Registered in England &amp; Wales.
            </p>
            <p className="text-xs text-[#6b7280]">
              Helping families navigate one of life&apos;s hardest moments.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
