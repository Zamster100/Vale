"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const PURPLE = "#4F34C4";
const BODY   = "#4A415E";
const DARK   = "#100B20";
const BORDER = "#D5D0E4";

const CENTER_LINKS = [
  { href: "/how-it-works", label: "How it works", match: ["/how-it-works"] },
  { href: "/resources",    label: "Cost guide",   match: ["/resources", "/guides"] },
  { href: "/about",        label: "About",        match: ["/about"] },
] as const;

const MOBILE_LINKS = [
  { href: "/how-it-works",        label: "How it works",        match: ["/how-it-works"] },
  { href: "/resources",           label: "Cost guide",          match: ["/resources", "/guides"] },
  { href: "/about",               label: "About",               match: ["/about"] },
  { href: "/for-funeral-directors", label: "For funeral directors", match: ["/for-funeral-directors", "/admin"] },
] as const;

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef    = useRef<HTMLDivElement>(null);
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
        className="sticky top-0 w-full bg-white/95 backdrop-blur-sm border-b"
        style={{ borderColor: BORDER, zIndex: "var(--z-header, 50)" }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-[1.7rem]">
          <div className="relative flex h-[68px] items-center justify-between">

            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-baseline flex-shrink-0 focus:outline-none focus-visible:ring-2 rounded"
              style={{ ["--tw-ring-color" as string]: PURPLE }}
              aria-label="Vale home"
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontWeight: 600,
                  fontSize: "26px",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  color: "#000000",
                }}
              >
                Vale<span style={{ color: PURPLE }}>.</span>
              </span>
            </Link>

            {/* Desktop nav — absolutely centred */}
            <nav
              className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2"
              aria-label="Main navigation"
            >
              {CENTER_LINKS.map(({ href, label, match }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[14px] font-[600] transition-colors duration-200 ease-out whitespace-nowrap hover:opacity-70"
                  style={{ color: isActive(match) ? PURPLE : BODY }}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Desktop right */}
            <div className="flex items-center gap-6">
              <Link
                href="/for-funeral-directors"
                className="hidden lg:inline-flex text-[14px] font-[600] transition-colors duration-200 ease-out whitespace-nowrap hover:opacity-70"
                style={{ color: BODY }}
              >
                For funeral directors
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-lg font-[700] transition-colors duration-200 ease-out"
                style={{
                  minHeight: "36px",
                  padding: "6px 16px",
                  fontSize: "13px",
                  background: PURPLE,
                  color: "#ffffff",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#3B229D"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = PURPLE; }}
              >
                Find a director
              </Link>

              {/* Hamburger */}
              <button
                ref={openBtnRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md transition-colors duration-150"
                style={{ color: BODY }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = DARK;
                  (e.currentTarget as HTMLButtonElement).style.background = "#F4F2F8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = BODY;
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                <Menu className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          style={{ background: "rgba(16,11,32,0.25)" }}
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
        className={`fixed top-0 right-0 z-[70] h-full w-72 flex flex-col transition-transform duration-200 ease-out lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "#ffffff", borderLeft: `1px solid ${BORDER}` }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ borderBottom: `1px solid ${BORDER}` }}
        >
          <Link href="/" aria-label="Vale home">
            <span
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontWeight: 600,
                fontSize: "24px",
                letterSpacing: "-0.02em",
                color: "#000000",
              }}
            >
              Vale<span style={{ color: PURPLE }}>.</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => { setMenuOpen(false); openBtnRef.current?.focus(); }}
            aria-label="Close navigation menu"
            className="w-10 h-10 flex items-center justify-center rounded-lg"
            style={{ color: BODY }}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" aria-label="Mobile navigation">
          {MOBILE_LINKS.map(({ href, label, match }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center px-4 py-3 rounded-xl text-[14px] min-h-[48px] transition-colors"
              style={{
                fontWeight: isActive(match) ? 600 : 400,
                color: isActive(match) ? PURPLE : BODY,
                background: isActive(match) ? "#EDE9FF" : "transparent",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="px-4 pb-6 pt-3 shrink-0" style={{ borderTop: `1px solid ${BORDER}` }}>
          <Link
            href="/search"
            className="flex items-center justify-center w-full py-3 rounded-lg font-[700] text-[14px] min-h-[48px] transition-colors"
            style={{ background: PURPLE, color: "#ffffff" }}
          >
            Find a director
          </Link>
        </div>
      </div>
    </>
  );
}
