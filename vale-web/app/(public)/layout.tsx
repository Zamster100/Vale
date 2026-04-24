import Link from "next/link";
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

      <footer style={{ background: "#C5D2DC", borderTop: "0.5px solid rgba(143,160,176,0.3)" }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Top row */}
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10"
            style={{ borderBottom: "0.5px solid rgba(143,160,176,0.3)" }}
          >
            {/* Brand */}
            <div className="md:col-span-1">
              <Link
                href="/"
                className="inline-block mb-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA] rounded"
                aria-label="VALE homepage"
              >
                <span
                  className="text-2xl tracking-tight"
                  style={{ fontFamily: "var(--font-instrument-serif)", color: "#5D3A7A" }}
                >
                  VALE
                </span>
              </Link>
              <p className="text-sm leading-relaxed max-w-[200px]" style={{ color: "#8FA0B0" }}>
                Transparent prices. Genuine choice. Dignity for every family.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <p
                  className="text-xs font-medium uppercase tracking-wider mb-4"
                  style={{ color: "#5D3A7A" }}
                >
                  {section}
                </p>
                <ul className="space-y-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm transition-colors hover:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA] rounded"
                        style={{ color: "#8A5FAA" }}
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
            <p className="text-xs" style={{ color: "#8FA0B0" }}>
              © 2026 VALE. All rights reserved. Registered in England &amp; Wales.
            </p>
            <p className="text-xs" style={{ color: "#8FA0B0" }}>
              Helping families navigate one of life&apos;s hardest moments.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
