"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const OS = "var(--font-open-sans), -apple-system, sans-serif";

const NAV_LINKS = [
  { href: "/search",                label: "Find a director",       match: ["/search", "/funeral-directors"] },
  { href: "/resources",             label: "Guides",                match: ["/resources"] },
  { href: "/for-funeral-directors", label: "For funeral directors", match: ["/for-funeral-directors", "/admin"] },
  { href: "/about",                 label: "About",                 match: ["/about"] },
] as const;

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);

  const isActive = (match: readonly string[]) =>
    match.some((m) => pathname?.startsWith(m));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        openBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header
        className="sticky top-0 z-50"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #EBEBF5",
          boxShadow: "0 1px 0 #EBEBF5",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-0 flex items-center justify-between" style={{ height: "64px" }}>

          {/* Logo */}
          <Link
            href="/"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8486E8] rounded"
            aria-label="Vale — go to homepage"
          >
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 600,
                fontSize: "26px",
                color: "#1A1A2E",
                letterSpacing: "0.01em",
              }}
            >
              Vale<span style={{ color: "#8486E8" }}>.</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {NAV_LINKS.slice(0, 3).map(({ href, label, match }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded-lg text-sm min-h-[40px] inline-flex items-center transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8486E8]"
                style={{
                  fontFamily: OS,
                  fontWeight: isActive(match) ? 600 : 400,
                  color: isActive(match) ? "#1A1A2E" : "#5C5C7A",
                  background: isActive(match) ? "#EEF0FF" : "transparent",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop right: About + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/about"
              className="px-4 py-2 rounded-lg text-sm inline-flex items-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8486E8]"
              style={{
                fontFamily: OS,
                fontWeight: isActive(["/about"]) ? 600 : 400,
                color: isActive(["/about"]) ? "#1A1A2E" : "#5C5C7A",
              }}
            >
              About
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full text-sm font-semibold px-5 py-2.5 hover:opacity-90 active:scale-[0.97] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8486E8]"
              style={{
                fontFamily: OS,
                background: "#6B6DE8",
                color: "#FFFFFF",
                fontWeight: 700,
              }}
            >
              Find a director
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={openBtnRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8486E8]"
            style={{ color: "#1A1A2E" }}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          style={{ background: "rgba(26,26,46,0.25)" }}
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={`fixed top-0 right-0 z-[70] h-full w-72 flex flex-col transition-transform duration-200 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "#FFFFFF", borderLeft: "1px solid #EBEBF5" }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ borderBottom: "1px solid #EBEBF5" }}
        >
          <Link href="/" aria-label="Vale — go to homepage">
            <span
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, fontSize: "24px", color: "#1A1A2E" }}
            >
              Vale<span style={{ color: "#8486E8" }}>.</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => { setMenuOpen(false); openBtnRef.current?.focus(); }}
            aria-label="Close navigation menu"
            className="w-10 h-10 flex items-center justify-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8486E8]"
            style={{ color: "#5C5C7A" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label, match }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center px-4 py-3 rounded-xl text-sm min-h-[48px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8486E8]"
              style={{
                fontFamily: OS,
                fontWeight: isActive(match) ? 600 : 400,
                color: isActive(match) ? "#1A1A2E" : "#5C5C7A",
                background: isActive(match) ? "#EEF0FF" : "transparent",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="px-4 pb-6 pt-3 shrink-0" style={{ borderTop: "1px solid #EBEBF5" }}>
          <Link
            href="/search"
            className="flex items-center justify-center w-full py-3 rounded-full font-bold text-sm min-h-[48px] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8486E8]"
            style={{ fontFamily: OS, background: "#6B6DE8", color: "#FFFFFF" }}
          >
            Find a director
          </Link>
        </div>
      </div>
    </>
  );
}
