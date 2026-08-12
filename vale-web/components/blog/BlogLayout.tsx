"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Clock, ArrowLeft, Star, Search } from "lucide-react";

const DM      = "var(--font-dm-sans), -apple-system, sans-serif";
const DARK    = "#100B20";
const MED     = "#4A415E";
const LITE    = "#9E96B2";
const LAV     = "#E3DFFF";
const LAV_BTN = "#4F34C4";
const GOLD    = "#F5C541";
const BDR     = "#D5D0E4";
const EASE    = [0.16, 1, 0.3, 1] as const;

export interface TocLink {
  href: string;
  label: string;
}

export interface BlogLayoutProps {
  title: string;
  category: string;
  categoryBg: string;
  categoryText: string;
  author: string;
  date: string;
  readTime: string;
  heroColor: string;
  heroImage?: string;
  tocLinks: TocLink[];
  children: React.ReactNode;
}

export default function BlogLayout({
  title, category, categoryBg, categoryText,
  author, date, readTime, heroColor, heroImage, tocLinks, children,
}: BlogLayoutProps) {
  const reduce = useReducedMotion();

  function fadeUp(delay: number) {
    return {
      initial: { opacity: 0, y: reduce ? 0 : 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
    };
  }

  return (
    <div style={{ fontFamily: DM, background: "#FFFFFF", color: DARK }}>

      {/* ── Hero ── */}
      <section style={{ background: DARK }}>
        <div className="max-w-[1366px] mx-auto px-6 md:px-10 pt-10 pb-12">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-6 flex-wrap">
            <Link href="/" className="text-xs hover:opacity-75 transition-opacity"
              style={{ color: "rgba(255,255,255,0.4)" }}>Home</Link>
            <ChevronRight className="w-3 h-3" style={{ color: "rgba(255,255,255,0.2)" }} aria-hidden="true" />
            <Link href="/guides" className="text-xs hover:opacity-75 transition-opacity"
              style={{ color: "rgba(255,255,255,0.4)" }}>Guides</Link>
            <ChevronRight className="w-3 h-3" style={{ color: "rgba(255,255,255,0.2)" }} aria-hidden="true" />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{category}</span>
          </nav>

          {/* Category badge */}
          <motion.span
            className="inline-block rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide mb-4"
            style={{ background: categoryBg, color: categoryText }}
            {...fadeUp(0)}
          >
            {category}
          </motion.span>

          {/* Title */}
          <motion.h1
            className="mb-5 max-w-3xl"
            style={{
              fontFamily: DM,
              fontSize: "clamp(24px, 4vw, 44px)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
            }}
            {...fadeUp(0.1)}
          >
            {title}
          </motion.h1>

          {/* Meta row */}
          <motion.div className="flex items-center gap-5 flex-wrap" {...fadeUp(0.2)}>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: LAV, color: LAV_BTN }}
                aria-hidden="true"
              >
                {author.charAt(0)}
              </div>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>{author}</span>
            </div>
            <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{date}</span>
            <span className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {readTime} read
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Hero image ── */}
      {heroImage ? (
        <div style={{ position: "relative", height: "260px" }} aria-hidden="true">
          <Image src={heroImage} alt="" fill className="object-cover" priority />
        </div>
      ) : (
        <div style={{ background: heroColor, height: "260px" }} aria-hidden="true" />
      )}

      {/* ── Main content ── */}
      <div className="max-w-[1366px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid lg:grid-cols-[1fr_268px] gap-12 items-start">

          {/* Article */}
          <article>
            {/* "In this article" TOC */}
            <motion.div
              className="rounded-xl p-5 mb-10"
              style={{ background: "#FDFCFE", border: `1px solid ${BDR}` }}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <p className="text-sm font-bold mb-3" style={{ color: DARK }}>In this article:</p>
              <nav aria-label="Article sections">
                <ul className="space-y-1.5">
                  {tocLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="flex items-start gap-2 text-sm hover:opacity-80 transition-opacity py-0.5"
                        style={{ color: LAV_BTN }}
                      >
                        <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>

            {/* Article body */}
            {children}
          </article>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24">

            {/* Search CTA */}
            <motion.div
              className="rounded-xl overflow-hidden"
              style={{ border: `1px solid ${BDR}` }}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1, ease: EASE } }}
              viewport={{ once: true, margin: "-40px" }}
            >
              <div className="p-5" style={{ background: LAV }}>
                <p className="font-bold text-sm mb-1" style={{ fontFamily: DM, color: DARK }}>
                  Ready to search?
                </p>
                <p className="text-sm mb-4" style={{ color: MED }}>
                  Compare verified funeral directors near you — prices shown upfront, no hidden fees.
                </p>
                <Link
                  href="/search"
                  className="flex items-center justify-center gap-2 w-full rounded-lg py-2.5 text-sm font-bold hover:opacity-90 transition-opacity"
                  style={{ background: LAV_BTN, color: "#FFFFFF" }}
                >
                  <Search className="w-4 h-4" aria-hidden="true" />
                  Find a funeral director
                </Link>
              </div>
              <div
                className="px-4 py-3 flex items-center gap-2"
                style={{ background: "#FFFFFF", borderTop: `1px solid ${BDR}` }}
              >
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: GOLD }} aria-hidden="true" />
                  ))}
                </div>
                <span className="text-xs font-bold" style={{ color: DARK }}>Excellent</span>
                <span className="text-xs" style={{ color: LITE }}>1,200+ providers</span>
              </div>
            </motion.div>

            {/* TOC (desktop only — secondary navigation) */}
            <div
              className="hidden lg:block rounded-xl p-5"
              style={{ background: "#FDFCFE", border: `1px solid ${BDR}` }}
            >
              <p
                className="text-[11px] font-bold uppercase tracking-wider mb-3"
                style={{ color: LITE }}
              >
                In this article
              </p>
              <nav aria-hidden="true">
                <ul className="space-y-2">
                  {tocLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-xs block py-0.5 hover:opacity-75 transition-opacity leading-snug"
                        style={{ color: MED }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

          </aside>
        </div>

        {/* Back link */}
        <div
          className="mt-16 pt-8 flex items-center justify-between flex-wrap gap-4"
          style={{ borderTop: `1px solid ${BDR}` }}
        >
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-75 transition-opacity"
            style={{ color: LAV_BTN }}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to all guides
          </Link>
          <span className="text-xs" style={{ color: LITE }}>
            Vale Family Advisors · vale.co.uk
          </span>
        </div>
      </div>

    </div>
  );
}
