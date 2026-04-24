"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, BookOpen, Building2 } from "lucide-react";

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
          background: "#F5F1E8",
          borderBottom: "0.5px solid rgba(143,160,176,0.3)",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA] focus-visible:ring-offset-2 rounded"
            aria-label="VALE — go to homepage"
          >
            <span
              className="text-3xl tracking-tight"
              style={{ fontFamily: "var(--font-instrument-serif)", color: "#5D3A7A" }}
            >
              VALE
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label, match }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-2 rounded text-sm transition-colors min-h-[44px] inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA] focus-visible:ring-offset-1"
                style={{
                  color: isActive(match) ? "#5D3A7A" : "#8FA0B0",
                  background: isActive(match) ? "rgba(93,58,122,0.08)" : "transparent",
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
            className="md:hidden w-11 h-11 flex items-center justify-center rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA]"
            style={{ color: "#5D3A7A" }}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          style={{ background: "rgba(63,94,44,0.2)" }}
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
        style={{ background: "#F5F1E8", borderLeft: "0.5px solid rgba(143,160,176,0.3)" }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-6 py-6 shrink-0"
          style={{ borderBottom: "0.5px solid rgba(143,160,176,0.3)" }}
        >
          <Link
            href="/"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA] rounded"
            aria-label="VALE — go to homepage"
          >
            <span
              className="text-2xl tracking-tight"
              style={{ fontFamily: "var(--font-instrument-serif)", color: "#5D3A7A" }}
            >
              VALE
            </span>
          </Link>
          <button
            type="button"
            onClick={() => { setMenuOpen(false); openBtnRef.current?.focus(); }}
            aria-label="Close navigation menu"
            className="w-11 h-11 flex items-center justify-center rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA]"
            style={{ color: "#8FA0B0" }}
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
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA]"
              style={{
                color: isActive(match) ? "#5D3A7A" : "#8FA0B0",
                background: isActive(match) ? "rgba(93,58,122,0.08)" : "transparent",
              }}
            >
              <Icon className="w-4 h-4 shrink-0" style={{ color: "#8FA0B0" }} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="px-4 pb-6 pt-4 shrink-0" style={{ borderTop: "0.5px solid rgba(143,160,176,0.3)" }}>
          <Link
            href="/search"
            className="flex items-center justify-center w-full py-3 rounded-full font-medium text-sm text-white min-h-[48px] hover:scale-[1.03] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA] focus-visible:ring-offset-2"
            style={{ background: "#5AAE55" }}
          >
            Begin Journey
          </Link>
        </div>
      </div>
    </>
  );
}
