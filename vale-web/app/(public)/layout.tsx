import Link from "next/link";
import Navigation from "@/components/Navigation";

const FOOTER_LINKS = {
  Families: [
    { label: "Find a director",   href: "/search" },
    { label: "Guides & advice",   href: "/resources" },
    { label: "Submit a review",   href: "/submit-review" },
  ],
  "Funeral directors": [
    { label: "List your business",     href: "/for-funeral-directors" },
    { label: "Sign in",                href: "/admin/signup" },
    { label: "About Vale Assured",     href: "/for-funeral-directors" },
  ],
  Company: [
    { label: "About Vale",  href: "/about" },
    { label: "Contact",     href: "mailto:hello@vale.co.uk" },
    { label: "Press",       href: "mailto:press@vale.co.uk" },
  ],
} as const;

const LEGAL_LINKS = [
  { label: "Privacy", href: "/" },
  { label: "Cookies", href: "/" },
  { label: "Terms",   href: "/" },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="flex-1">{children}</main>

      <footer style={{ background: "#1C1F2A" }}>
        <div className="max-w-6xl mx-auto px-6 py-14">

          {/* Top grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Brand column */}
            <div className="md:col-span-1">
              <Link
                href="/"
                className="inline-block mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] rounded"
                aria-label="Vale homepage"
              >
                <span
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#FFFFFF" }}
                  className="text-2xl tracking-wide"
                >
                  Vale<span style={{ color: "#C4975A" }}>.</span>
                </span>
              </Link>
              <p
                className="text-sm leading-relaxed max-w-[200px]"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Transparent prices. Genuine choice. Dignity for every family.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-4"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {section}
                </p>
                <ul className="space-y-2.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] rounded"
                        style={{ color: "rgba(255,255,255,0.6)" }}
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
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              © Vale 2026
            </p>
            <div className="flex items-center gap-5">
              {LEGAL_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-xs transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] rounded"
                  style={{ color: "rgba(255,255,255,0.3)" }}
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
