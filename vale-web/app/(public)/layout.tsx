import Link from "next/link";
import Navigation from "@/components/Navigation";

const FOOTER_LINKS = {
  Families: [
    { label: "Find a director",   href: "/search" },
    { label: "Guides & advice",   href: "/guides" },
    { label: "Submit a review",   href: "/submit-review" },
  ],
  "Funeral directors": [
    { label: "List your business",     href: "/for-funeral-directors" },
    { label: "Sign in",                href: "/directors/signup" },
    { label: "Partner deck",           href: "/deck" },
  ],
  Company: [
    { label: "About Vale",  href: "/about" },
    { label: "Contact",     href: "/contact" },
  ],
} as const;

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/privacy#cookies" },
  { label: "Terms",   href: "/terms" },
];

const DM = "var(--font-dm-sans), -apple-system, sans-serif";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="flex-1">{children}</main>

      <footer style={{ background: "#100B20" }}>
        <div className="max-w-[1366px] mx-auto px-4 sm:px-7 py-14">

          {/* Top grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Brand column */}
            <div className="md:col-span-1">
              <Link
                href="/"
                className="inline-block mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F34C4] rounded"
                aria-label="Vale homepage"
              >
                <span
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600, color: "#FFFFFF" }}
                  className="text-2xl tracking-wide"
                >
                  Vale<span style={{ color: "#F5C541" }}>.</span>
                </span>
              </Link>
              <p
                className="text-sm leading-relaxed max-w-[200px]"
                style={{ fontFamily: DM, color: "rgba(255,255,255,0.45)" }}
              >
                Transparent prices. Genuine choice. Dignity for every family.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-4"
                  style={{ fontFamily: DM, color: "rgba(255,255,255,0.35)" }}
                >
                  {section}
                </p>
                <ul className="space-y-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F34C4] rounded"
                        style={{ fontFamily: DM, color: "rgba(255,255,255,0.6)" }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom strip */}
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs" style={{ fontFamily: DM, color: "rgba(255,255,255,0.3)" }}>
              © Vale 2026
            </p>
            <div className="flex items-center gap-5">
              {LEGAL_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-xs transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F34C4] rounded"
                  style={{ fontFamily: DM, color: "rgba(255,255,255,0.3)" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
