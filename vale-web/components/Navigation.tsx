"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Building2 } from "lucide-react";

const NAV_LINKS = [
  { href: "/search",                 label: "Find a director",       icon: Search,    match: ["/search", "/funeral-directors"] },
  { href: "/resources",              label: "Guides",                icon: Search,    match: ["/resources"] },
  { href: "/for-funeral-directors",  label: "For funeral directors", icon: Building2, match: ["/for-funeral-directors", "/admin"] },
  { href: "/about",                  label: "About",                 icon: Building2, match: ["/about"] },
] as const;

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);

  const isActive = (match: readonly string[]) =>
    match.some((m) => pathname?.startsWith(m));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const dark = scrolled;

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-colors duration-300"
        style={{
          background: dark ? "#1C1F2A" : "#F7F3EE",
          borderBottom: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E8E2D8",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] focus-visible:ring-offset-2 rounded"
            style={{ ["--tw-ring-offset-color" as string]: dark ? "#1C1F2A" : "#F7F3EE" }}
            aria-label="Vale — go to homepage"
          >
            <span
              className="text-2xl tracking-wide transition-colors duration-300"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: dark ? "#FFFFFF" : "#1C1F2A" }}
            >
              Vale<span style={{ color: "#5E8B73" }}>.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label, match }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-2 rounded text-sm min-h-[44px] inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] focus-visible:ring-offset-1 transition-colors duration-300"
                style={{
                  color: dark
                    ? (isActive(match) ? "#FFFFFF" : "rgba(234,242,238,0.6)")
                    : (isActive(match) ? "#1C1F2A" : "#7A6E64"),
                  background: isActive(match)
                    ? (dark ? "rgba(255,255,255,0.08)" : "rgba(28,31,42,0.08)")
                    : "transparent",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            ref={openBtnRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden w-11 h-11 flex items-center justify-center rounded transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73]"
            style={{ color: dark ? "rgba(234,242,238,0.8)" : "#1C1F2A" }}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          style={{ background: "rgba(28,31,42,0.2)" }}
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile drawer — always dark for consistency */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={`fixed top-0 right-0 z-[70] h-full w-72 flex flex-col transition-transform duration-200 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "#1C1F2A", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-6 py-6 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Link
            href="/"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] rounded"
            aria-label="Vale — go to homepage"
          >
            <span
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#FFFFFF" }}
              className="text-2xl tracking-wide"
            >
              Vale<span style={{ color: "#5E8B73" }}>.</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => { setMenuOpen(false); openBtnRef.current?.focus(); }}
            aria-label="Close navigation menu"
            className="w-11 h-11 flex items-center justify-center rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73]"
            style={{ color: "rgba(234,242,238,0.5)" }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label, icon: Icon, match }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73]"
              style={{
                color: isActive(match) ? "#FFFFFF" : "rgba(234,242,238,0.6)",
                background: isActive(match) ? "rgba(255,255,255,0.08)" : "transparent",
              }}
            >
              <Icon className="w-4 h-4 shrink-0" style={{ color: "rgba(94,139,115,0.8)" }} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="px-4 pb-6 pt-4 shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link
            href="/search"
            className="flex items-center justify-center w-full py-3 rounded-md font-medium text-sm min-h-[48px] hover:scale-[1.03] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] focus-visible:ring-offset-2"
            style={{ background: "#5E8B73", color: "#FFFFFF" }}
          >
            Begin Journey
          </Link>
        </div>
      </div>
    </>
  );
}
