"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, ChevronRight, Clock } from "lucide-react";

const DM = "var(--font-dm-sans), -apple-system, sans-serif";

const LAV      = "#E3DFFF";
const LAV_BTN  = "#4F34C4";
const DARK     = "#100B20";
const MED      = "#4A415E";
const LITE     = "#9E96B2";
const BDR      = "#D5D0E4";
const EASE     = [0.16, 1, 0.3, 1] as const;

type Category = "All" | "Guide" | "Checklist" | "Explainer" | "Support" | "Report";

type GuidePost = {
  slug: string;
  title: string;
  description: string;
  category: Exclude<Category, "All">;
  author: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
};

const CATEGORIES: Category[] = ["All", "Guide", "Checklist", "Explainer", "Support", "Report"];

const CAT_STYLE: Record<Exclude<Category, "All">, { bg: string; text: string }> = {
  Guide:     { bg: LAV, text: LAV_BTN },
  Checklist: { bg: LAV, text: LAV_BTN },
  Explainer: { bg: LAV, text: LAV_BTN },
  Support:   { bg: LAV, text: LAV_BTN },
  Report:    { bg: BDR, text: MED },
};

// ─── Add new guide posts here ────────────────────────────────────────────────
// To add a post: create a page at app/(public)/guides/[your-slug]/page.tsx
// using BlogLayout, then add an entry here. Posts display newest-first.
const GUIDES: GuidePost[] = [
  {
    slug: "cannot-afford-a-funeral",
    title: "What to Do If You Cannot Afford a Funeral",
    description:
      "If you're worried about funeral costs, you're not alone. Discover government grants, payment plans, and other support available to families in the UK.",
    category: "Guide",
    author: "Vale Family Advisors",
    date: "4 June 2026",
    readTime: "8 min",
    image: "/guides/cannot-afford-a-funeral.png",
    href: "/guides/cannot-afford-a-funeral",
  },
  {
    slug: "planning-a-meaningful-funeral",
    title: "A Complete Guide to Planning a Meaningful Funeral",
    description:
      "From initial decisions to the wake — everything you need to know to arrange a service that truly honours your loved one.",
    category: "Guide",
    author: "Vale Family Advisors",
    date: "3 June 2026",
    readTime: "10 min",
    image: "/guides/planning-a-meaningful-funeral.png",
    href: "/guides/planning-a-meaningful-funeral",
  },
  {
    slug: "crafting-funeral-invitations",
    title: "Crafting Funeral Invitations: Guidance and Wording Examples",
    description:
      "Practical guidance on how to share the news and invite others, with ready-to-use wording examples for formal notices and personal messages.",
    category: "Guide",
    author: "Vale Family Advisors",
    date: "2 June 2026",
    readTime: "6 min",
    image: "/guides/crafting-funeral-invitations.png",
    href: "/guides/crafting-funeral-invitations",
  },
  {
    slug: "understanding-funeral-costs",
    title: "Understanding Funeral Costs: A Guide to Budgeting and Planning",
    description:
      "Understand what you are paying for — from funeral director fees to third-party disbursements — so you can make informed decisions.",
    category: "Guide",
    author: "Vale Family Advisors",
    date: "1 June 2026",
    readTime: "7 min",
    image: "/guides/understanding-funeral-costs.png",
    href: "/guides/understanding-funeral-costs",
  },
  {
    slug: "what-to-do-when-someone-dies",
    title: "What To Do When Someone Dies",
    description:
      "A clear, step-by-step guide to the essential administrative tasks following a death — from confirming the cause to registering and arranging the funeral.",
    category: "Guide",
    author: "Vale Family Advisors",
    date: "28 May 2026",
    readTime: "6 min",
    image: "/guides/what-to-do-when-someone-dies.png",
    href: "/guides/what-to-do-when-someone-dies",
  },
  {
    slug: "what-to-do-when-a-child-dies",
    title: "What To Do When a Child Dies",
    description:
      "A compassionate guide to the practical steps following the loss of a child or baby — from registration to government notifications and finding support.",
    category: "Support",
    author: "Vale Family Advisors",
    date: "25 May 2026",
    readTime: "8 min",
    image: "/guides/what-to-do-when-a-child-dies.png",
    href: "/guides/what-to-do-when-a-child-dies",
  },
  {
    slug: "understanding-next-of-kin",
    title: "Understanding 'Next of Kin': Rights, Responsibilities, and Legal Realities",
    description:
      "What 'next of kin' actually means in the UK, what legal powers it does and doesn't carry, and how to protect your own wishes in advance.",
    category: "Explainer",
    author: "Vale Family Advisors",
    date: "22 May 2026",
    readTime: "7 min",
    image: "/guides/understanding-next-of-kin.png",
    href: "/guides/understanding-next-of-kin",
  },
  {
    slug: "managing-your-estate",
    title: "Managing an Estate: A Guide for Executors and Administrators",
    description:
      "How to gather assets, settle debts, notify authorities, and distribute an estate — whether you're acting as executor or administrator.",
    category: "Guide",
    author: "Vale Family Advisors",
    date: "19 May 2026",
    readTime: "9 min",
    image: "/guides/managing-your-estate.png",
    href: "/guides/managing-your-estate",
  },
  {
    slug: "understanding-inheritance-tax",
    title: "A Guide to Understanding Inheritance Tax",
    description:
      "The UK's IHT thresholds, rates, exemptions, and payment process explained clearly — essential reading when administering an estate.",
    category: "Explainer",
    author: "Vale Family Advisors",
    date: "16 May 2026",
    readTime: "8 min",
    image: "/guides/understanding-inheritance-tax.png",
    href: "/guides/understanding-inheritance-tax",
  },
  {
    slug: "lasting-power-of-attorney",
    title: "Lasting Power of Attorney: A Guide to Protecting Your Future",
    description:
      "What an LPA is, the two types available, how to register one, and why setting one up now is one of the most important things you can do.",
    category: "Guide",
    author: "Vale Family Advisors",
    date: "13 May 2026",
    readTime: "7 min",
    image: "/guides/lasting-power-of-attorney.png",
    href: "/guides/lasting-power-of-attorney",
  },
  {
    slug: "planning-for-your-pet",
    title: "Planning for Your Pet's Future: A Guide to Pet Care After Bereavement",
    description:
      "How to ensure your pet is cared for if you pass away — from conversations with guardians to charity schemes and will provisions.",
    category: "Guide",
    author: "Vale Family Advisors",
    date: "10 May 2026",
    readTime: "6 min",
    image: "/guides/planning-for-your-pet.png",
    href: "/guides/planning-for-your-pet",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const reduce = useReducedMotion();

  function fadeUp(delay: number) {
    return {
      initial: { opacity: 0, y: reduce ? 0 : 20 },
      whileInView: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
      viewport: { once: true, margin: "-60px" },
    };
  }

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const staggerItem = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  const filtered =
    activeCategory === "All"
      ? GUIDES
      : GUIDES.filter((g) => g.category === activeCategory);

  const featured = filtered[0] ?? null;
  const rest = filtered.slice(1);

  return (
    <div style={{ fontFamily: DM, background: "#FFFFFF", color: DARK }}>

      {/* ══════════════════ HERO ══════════════════ */}
      <section style={{ background: DARK }}>
        <div className="max-w-[1366px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wide"
            style={{ background: "rgba(210,211,252,0.15)", color: LAV }}
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }}
          >
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            Vale Guides &amp; Resources
          </motion.div>

          <motion.h1
            className="mb-4"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
            }}
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.1, ease: EASE } }}
          >
            Guides for every step
          </motion.h1>

          <motion.p
            className="mb-10 max-w-xl"
            style={{ fontSize: "17px", lineHeight: 1.65, color: "rgba(255,255,255,0.6)" }}
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.2, ease: EASE } }}
          >
            Practical, compassionate guidance — written by our family advisors
            for families facing one of life&apos;s hardest moments.
          </motion.p>

          <motion.div
            className="flex items-center gap-8 flex-wrap"
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.3, ease: EASE } }}
          >
            <div>
              <div
                style={{
                  fontSize: "clamp(26px, 3.5vw, 36px)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  lineHeight: 1,
                }}
              >
                {GUIDES.length}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginTop: "5px",
                }}
              >
                Guides available
              </div>
            </div>
            <div
              style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.1)" }}
              aria-hidden="true"
            />
            <div>
              <div
                style={{
                  fontSize: "clamp(26px, 3.5vw, 36px)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  lineHeight: 1,
                }}
              >
                {CATEGORIES.length - 1}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginTop: "5px",
                }}
              >
                Categories
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ CATEGORY FILTER ══════════════════ */}
      <div
        style={{
          background: "#FFFFFF",
          borderBottom: `1px solid ${BDR}`,
          position: "sticky",
          top: "68px",
          zIndex: 40,
        }}
      >
        <div className="max-w-[1366px] mx-auto px-6 md:px-10 py-3.5 overflow-x-auto">
          <div className="flex gap-2 min-w-max" role="tablist" aria-label="Filter guides by category">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count = cat === "All" ? null : GUIDES.filter((g) => g.category === cat).length;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className="rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-150"
                  style={{
                    background: isActive ? LAV_BTN : BDR,
                    color: isActive ? "#FFFFFF" : MED,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {cat}
                  {count !== null && (
                    <span
                      className="ml-1.5 text-xs"
                      style={{ opacity: 0.65 }}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════ POSTS ══════════════════ */}
      <div className="max-w-[1366px] mx-auto px-6 md:px-10 py-12 md:py-16">

        {filtered.length === 0 ? (
          /* ── Empty state ── */
          <div className="text-center py-24">
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
              style={{ background: BDR }}
              aria-hidden="true"
            >
              <BookOpen className="w-8 h-8" style={{ color: LITE }} />
            </div>
            <h2
              className="mb-2"
              style={{ fontWeight: 700, fontSize: "20px", color: DARK }}
            >
              No guides yet in this category
            </h2>
            <p style={{ color: MED, fontSize: "14px", lineHeight: 1.6 }}>
              We&apos;re working on it. Check back soon, or browse all guides.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold hover:opacity-75 transition-opacity"
              style={{ color: LAV_BTN, background: "none", border: "none", cursor: "pointer" }}
            >
              View all guides
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <>
            {/* ── Featured post (latest in filtered set) ── */}
            {featured && (
              <motion.div {...fadeUp(0)}>
              <Link
                href={featured.href}
                className="group block rounded-2xl overflow-hidden mb-8 hover:shadow-xl transition-all duration-200"
                style={{ border: `1px solid ${BDR}` }}
                aria-label={`Read: ${featured.title}`}
              >
                <div className="grid md:grid-cols-5">
                  {/* Image area */}
                  <div
                    className="md:col-span-2 relative"
                    style={{ minHeight: "220px" }}
                    aria-hidden="true"
                  >
                    <Image src={featured.image} alt="" fill className="object-cover" />
                  </div>

                  {/* Content */}
                  <div className="md:col-span-3 p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2.5 mb-4 flex-wrap">
                      <span
                        className="inline-block rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide"
                        style={{
                          background: CAT_STYLE[featured.category].bg,
                          color: CAT_STYLE[featured.category].text,
                        }}
                      >
                        {featured.category}
                      </span>
                      <span
                        className="text-[11px] font-semibold uppercase tracking-wide"
                        style={{ color: LITE }}
                      >
                        Latest
                      </span>
                    </div>

                    <h2
                      className="mb-3 group-hover:opacity-70 transition-opacity"
                      style={{
                        fontWeight: 700,
                        fontSize: "clamp(18px, 2.5vw, 24px)",
                        color: DARK,
                        lineHeight: 1.25,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {featured.title}
                    </h2>

                    <p
                      className="mb-6"
                      style={{ fontSize: "14px", color: MED, lineHeight: 1.65 }}
                    >
                      {featured.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center gap-1.5 text-xs"
                        style={{ color: LITE }}
                      >
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        {featured.readTime} read &middot; {featured.date}
                      </div>
                      <div
                        className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                        style={{ color: LAV_BTN }}
                      >
                        Read guide
                        <ChevronRight className="w-4 h-4" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              </motion.div>
            )}

            {/* ── Post grid ── */}
            {rest.length > 0 && (
              <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {rest.map((post) => (
                  <motion.div key={post.slug} variants={staggerItem}>
                  <Link
                    href={post.href}
                    className="group flex flex-col rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200"
                    style={{ border: `1px solid ${BDR}` }}
                    aria-label={`Read: ${post.title}`}
                  >
                    {/* Image area */}
                    <div
                      className="relative"
                      style={{ aspectRatio: "16 / 9" }}
                      aria-hidden="true"
                    >
                      <Image src={post.image} alt="" fill className="object-cover" />
                    </div>

                    {/* Card body */}
                    <div className="flex flex-col flex-1 p-5">
                      <span
                        className="inline-block rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide mb-3 w-fit"
                        style={{
                          background: CAT_STYLE[post.category].bg,
                          color: CAT_STYLE[post.category].text,
                        }}
                      >
                        {post.category}
                      </span>

                      <h3
                        className="mb-2 flex-1 group-hover:opacity-70 transition-opacity"
                        style={{
                          fontWeight: 700,
                          fontSize: "15px",
                          color: DARK,
                          lineHeight: 1.35,
                        }}
                      >
                        {post.title}
                      </h3>

                      <p
                        className="mb-4 text-xs"
                        style={{ color: MED, lineHeight: 1.6 }}
                      >
                        {post.description}
                      </p>

                      <div
                        className="flex items-center justify-between pt-3"
                        style={{ borderTop: `1px solid ${BDR}` }}
                      >
                        <span
                          className="flex items-center gap-1 text-xs"
                          style={{ color: LITE }}
                        >
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          {post.readTime} read
                        </span>
                        <span className="text-xs" style={{ color: LITE }}>
                          {post.date}
                        </span>
                      </div>
                    </div>
                  </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* ══════════════════ BOTTOM CTA ══════════════════ */}
      <section
        className="py-16 md:py-20 px-6 md:px-10"
        style={{ background: LAV, borderTop: `1px solid ${BDR}` }}
      >
        <motion.div className="max-w-[1366px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6" {...fadeUp(0)}>
          <div>
            <h2
              className="mb-2"
              style={{ fontWeight: 700, fontSize: "clamp(20px, 2.5vw, 28px)", color: DARK }}
            >
              Ready to find the right funeral director?
            </h2>
            <p style={{ fontSize: "15px", color: MED }}>
              Compare verified providers near you — prices shown upfront, no pressure.
            </p>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold hover:opacity-90 transition-opacity shrink-0"
            style={{ background: LAV_BTN, color: "#FFFFFF" }}
          >
            Find a funeral director
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </section>

    </div>
  );
}
