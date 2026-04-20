"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Menu, X, Search, BookOpen, Building2 } from "lucide-react";

const NAV_LINKS = [
  { href: "/search", label: "Find a funeral director", icon: Search, match: ["/search", "/funeral-directors"] },
  { href: "/vault/login", label: "Plan ahead", icon: BookOpen, match: ["/vault"] },
  { href: "/admin/signup", label: "For funeral directors", icon: Building2, match: ["/admin"] },
] as const;

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);

  const isActive = (match: readonly string[]) =>
    match.some((m) => pathname?.startsWith(m));

  // Close on ESC
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

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-[#e5e7eb] shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2 rounded"
            aria-label="VALE — go to homepage"
          >
            <div className="w-8 h-8 bg-[#1a3a52] rounded flex items-center justify-center" aria-hidden="true">
              <MapPin className="w-4 h-4 text-[#d4a574]" />
            </div>
            <span className="text-xl font-bold text-[#1a3a52] tracking-tight">VALE</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label, match }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors min-h-[44px] inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-1 ${
                  isActive(match)
                    ? "text-[#1a3a52] bg-[#f3f4f6]"
                    : "text-[#6b7280] hover:text-[#1a3a52] hover:bg-[#f9fafb]"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/search"
              className="ml-3 bg-[#1a3a52] text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-[#0f2438] transition-colors min-h-[44px] inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
            >
              Search now
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            ref={openBtnRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden w-11 h-11 flex items-center justify-center rounded hover:bg-[#f3f4f6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574]"
          >
            <Menu className="w-5 h-5 text-[#1a3a52]" />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 md:hidden"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={`fixed top-0 right-0 z-[70] h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-200 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#e5e7eb] shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded"
            aria-label="VALE — go to homepage"
          >
            <div className="w-7 h-7 bg-[#1a3a52] rounded flex items-center justify-center" aria-hidden="true">
              <MapPin className="w-3.5 h-3.5 text-[#d4a574]" />
            </div>
            <span className="text-lg font-bold text-[#1a3a52] tracking-tight">VALE</span>
          </Link>
          <button
            type="button"
            onClick={() => { setMenuOpen(false); openBtnRef.current?.focus(); }}
            aria-label="Close navigation menu"
            className="w-11 h-11 flex items-center justify-center rounded hover:bg-[#f3f4f6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574]"
          >
            <X className="w-5 h-5 text-[#6b7280]" />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label, icon: Icon, match }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] ${
                isActive(match)
                  ? "bg-[#f3f4f6] text-[#1a3a52]"
                  : "text-[#374151] hover:bg-[#f9fafb] hover:text-[#1a3a52]"
              }`}
            >
              <Icon className="w-4 h-4 text-[#6b7280] shrink-0" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="px-4 pb-6 pt-4 border-t border-[#e5e7eb] shrink-0">
          <Link
            href="/search"
            className="flex items-center justify-center gap-2 w-full bg-[#1a3a52] text-white py-3 rounded font-semibold text-sm hover:bg-[#0f2438] transition-colors min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            Search now
          </Link>
        </div>
      </div>
    </>
  );
}
