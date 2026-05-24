import Link from "next/link";
import {
  CheckCircle,
  Star,
  MapPin,
  ArrowRight,
  Shield,
  BookOpen,
  Clock,
  Phone,
  ChevronRight,
  Heart,
  Lock,
  TrendingUp,
  Users,
} from "lucide-react";
import HomeSearchBar from "@/components/HomeSearchBar";
import VersionToggle from "@/components/VersionToggle";

/* ─────────────────────── DESIGN TOKENS ─────────────────────── */
const OS = "var(--font-open-sans), -apple-system, sans-serif";

// Palette
const LAV   = "#D2D3FC";  // lavender
const PINK  = "#FBD2FC";  // pink
const YEL   = "#FCFBD2";  // yellow
const MINT  = "#D3FCD2";  // mint

// Buttons (darker)
const LAV_BTN  = "#6B6DE8";
const PINK_BTN = "#C45EC4";
const MINT_BTN = "#3AA838";

// Text
const DARK = "#1A1A2E";
const MED  = "#5C5C7A";
const LITE = "#9090A8";
const BDR  = "#E8E8F4";

/* ─────────────────────── MOCK DATA ─────────────────────────── */

const FEATURED_FDS = [
  {
    name: "Grace & Sons Funeral Directors",
    location: "Kensington, London",
    rating: 4.9,
    reviews: 127,
    from: 1895,
    tags: ["Direct Cremation", "Traditional"],
    img: "https://picsum.photos/seed/vale-fd-grace/600/380",
    assured: true,
  },
  {
    name: "Thomas & Partners",
    location: "Shoreditch, London",
    rating: 4.8,
    reviews: 89,
    from: 2450,
    tags: ["Traditional", "Natural Burial"],
    img: "https://picsum.photos/seed/vale-fd-thomas/600/380",
    assured: true,
  },
  {
    name: "Eden Funeral Services",
    location: "Richmond, London",
    rating: 4.7,
    reviews: 64,
    from: 1750,
    tags: ["Direct Cremation", "Celebration of Life"],
    img: "https://picsum.photos/seed/vale-fd-eden/600/380",
    assured: false,
  },
];

const SERVICE_CATS = [
  { label: "Direct Cremation",   color: LAV,  btnColor: LAV_BTN,  count: 340, href: "/search?type=direct-cremation" },
  { label: "Traditional Burial", color: PINK, btnColor: PINK_BTN, count: 287, href: "/search?type=burial" },
  { label: "Natural Burial",     color: MINT, btnColor: MINT_BTN, count: 118, href: "/search?type=natural" },
  { label: "Celebration of Life",color: YEL,  btnColor: "#A09020", count: 203, href: "/search?type=celebration" },
];

const WHY_VALE = [
  {
    icon: TrendingUp,
    title: "Real prices upfront",
    body: "Every provider publishes their full itemised price list. No hidden extras, no surprises — exactly what the CMA requires.",
    color: LAV,
  },
  {
    icon: Shield,
    title: "6-point verified providers",
    body: "Every funeral director on Vale is verified against our six-point standard before their first listing goes live.",
    color: PINK,
  },
  {
    icon: Star,
    title: "Verified family reviews",
    body: "Reviews linked to confirmed arrangements only. Real families, real experiences — no anonymous posts.",
    color: YEL,
  },
  {
    icon: Phone,
    title: "Free expert support",
    body: "Our family advisors are trained bereavement professionals. Call, chat, or email — no obligation, ever.",
    color: MINT,
  },
];

const COSTS = [
  {
    label: "Direct cremation",
    price: "£1,995",
    tag: "Most affordable",
    desc: "Cremation only, no service, ashes returned to family",
    color: LAV,
  },
  {
    label: "Standard funeral",
    price: "£4,285",
    tag: "UK average",
    desc: "Funeral service, cremation or burial, basic coffin",
    color: PINK,
  },
  {
    label: "Total cost of dying",
    price: "£9,797",
    tag: "Full picture",
    desc: "Includes probate, admin, wake, memorials, obituary",
    color: YEL,
  },
];

const TESTIMONIALS = [
  {
    quote: "I was in the worst week of my life. Vale let me look at real prices at 2 am without calling anyone. I found a funeral director we could afford, close to home. I can't describe how much that mattered.",
    name: "Rachel T.",
    location: "Leeds",
    date: "March 2026",
    avatar: "R",
  },
  {
    quote: "We've used three funeral directors for family members in five years. Vale was the only time we actually understood what we were paying for — and why. The prices were exactly what we were quoted.",
    name: "David & Anne K.",
    location: "Bristol",
    date: "January 2026",
    avatar: "D",
  },
  {
    quote: "My father had written down exactly what he wanted. Vale's vault meant we had everything in one place when it mattered most. The advisor who called us was extraordinary.",
    name: "Marcus J.",
    location: "Edinburgh",
    date: "February 2026",
    avatar: "M",
  },
];

const VAULT_FEATURES = [
  { icon: Heart,    label: "Your wishes",         desc: "Service, music, readings, people to notify" },
  { icon: BookOpen, label: "Important documents",  desc: "Will, insurance, funeral plan, bank details" },
  { icon: Users,    label: "Messages to loved ones", desc: "Letters, photos, recordings, keepsakes" },
  { icon: Lock,     label: "Sharing controls",    desc: "Choose who sees what. Revoke access any time." },
];

const RESOURCES = [
  { title: "What to do in the first 24 hours",     tag: "Guide",     href: "/resources" },
  { title: "How to choose a funeral director",      tag: "Checklist", href: "/resources" },
  { title: "Understanding direct cremation",        tag: "Explainer", href: "/resources" },
  { title: "Talking to children about death",       tag: "Support",   href: "/resources" },
  { title: "The UK Funeral Price Index 2026",       tag: "Report",    href: "/resources" },
  { title: "Pre-planning: a step-by-step guide",   tag: "Guide",     href: "/resources" },
];

const RES_COLORS = [LAV, PINK, MINT, YEL, LAV, MINT];

const STATS = [
  { value: "1,200+", label: "Verified providers" },
  { value: "4.9 / 5", label: "Average family rating" },
  { value: "£1,895", label: "Average saving found" },
  { value: "0", label: "Hidden charges, ever" },
];

/* ─────────────────────── PAGE ───────────────────────────────── */

export default function Home() {
  return (
    <div style={{ fontFamily: OS, background: "#FFFFFF", color: DARK }}>
      <VersionToggle />

      {/* ══════════════════════════════════════════════════════
          HERO — lavender bg, big search card
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: LAV }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24 text-center">

          {/* Pill tag */}
          <div className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wide"
            style={{ background: "rgba(255,255,255,0.55)", color: LAV_BTN }}>
            <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
            UK&apos;s verified funeral marketplace
          </div>

          {/* Headline */}
          <h1
            className="mb-4 mx-auto max-w-3xl"
            style={{
              fontFamily: OS,
              fontSize: "clamp(32px, 5.5vw, 64px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: DARK,
            }}
          >
            Find a verified funeral director{" "}
            <span style={{ color: LAV_BTN }}>near you</span>
          </h1>

          <p
            className="mb-8 mx-auto max-w-xl"
            style={{ fontSize: "17px", lineHeight: 1.65, color: MED, fontWeight: 400 }}
          >
            Compare real prices from 1,200+ verified providers across the UK.
            No account needed. No pressure. No hidden fees.
          </p>

          {/* Search card */}
          <div
            className="rounded-2xl mx-auto max-w-2xl"
            style={{
              background: "#FFFFFF",
              boxShadow: "0 8px 40px rgba(100,100,200,0.16)",
              padding: "16px",
            }}
          >
            <HomeSearchBar />
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              "Prices shown upfront",
              "1,200+ verified providers",
              "Free family advisor",
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold"
                style={{ background: "rgba(255,255,255,0.6)", color: DARK }}
              >
                <CheckCircle className="w-3.5 h-3.5" style={{ color: MINT_BTN }} aria-hidden="true" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TRUST BAR — press logos
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-5 px-6"
        style={{ background: "#FFFFFF", borderBottom: `1px solid ${BDR}` }}
      >
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: LITE }}>
            As featured in
          </span>
          {["Financial Times", "The Guardian", "BBC News", "The Telegraph", "Which?"].map((p) => (
            <span
              key={p}
              style={{
                fontFamily: OS,
                fontSize: "15px",
                fontWeight: 700,
                color: DARK,
                opacity: 0.28,
                letterSpacing: "-0.01em",
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SERVICE CATEGORIES + FEATURED FD CARDS
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">

          {/* Section heading */}
          <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
            <div>
              <h2
                style={{ fontFamily: OS, fontWeight: 700, fontSize: "clamp(22px,3vw,32px)", color: DARK, lineHeight: 1.2, marginBottom: "8px" }}
              >
                Browse by service type
              </h2>
              <p style={{ fontSize: "15px", color: MED }}>
                Find the right kind of funeral for your family.
              </p>
            </div>
            <Link
              href="/search"
              className="inline-flex items-center gap-1.5 text-sm font-semibold self-end hover:opacity-75 transition-opacity"
              style={{ fontFamily: OS, color: LAV_BTN }}
            >
              See all providers <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-3 mb-12">
            {SERVICE_CATS.map(({ label, color, btnColor, count, href }) => (
              <Link
                key={label}
                href={href}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold hover:opacity-85 transition-opacity"
                style={{ background: color, color: DARK }}
              >
                {label}
                <span
                  className="rounded-full px-2 py-0.5 text-xs font-bold"
                  style={{ background: "rgba(255,255,255,0.6)", color: btnColor }}
                >
                  {count}
                </span>
              </Link>
            ))}
          </div>

          {/* FD cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_FDS.map(({ name, location, rating, reviews, from, tags, img, assured }) => (
              <Link
                key={name}
                href="/search"
                className="group flex flex-col rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-200"
                style={{ background: "#FFFFFF", border: `1px solid ${BDR}`, boxShadow: "0 2px 12px rgba(100,100,200,0.07)" }}
              >
                {/* Photo */}
                <div className="relative overflow-hidden" style={{ height: "180px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  {assured && (
                    <div
                      className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold"
                      style={{ background: LAV, color: LAV_BTN }}
                    >
                      <Shield className="w-3 h-3" aria-hidden="true" />
                      Vale Assured
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-5">
                  <h3
                    className="mb-1"
                    style={{ fontFamily: OS, fontWeight: 700, fontSize: "16px", color: DARK, lineHeight: 1.3 }}
                  >
                    {name}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-3">
                    <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: LITE }} aria-hidden="true" />
                    <span style={{ fontSize: "13px", color: MED }}>{location}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "fill-current" : ""}`}
                          style={{ color: "#E8A020" }}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: DARK }}>{rating}</span>
                    <span style={{ fontSize: "13px", color: LITE }}>({reviews} reviews)</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                        style={{ background: LAV, color: LAV_BTN }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: `1px solid ${BDR}` }}>
                    <div>
                      <div style={{ fontSize: "11px", color: LITE, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        From
                      </div>
                      <div style={{ fontSize: "22px", fontWeight: 700, color: DARK, lineHeight: 1 }}>
                        £{from.toLocaleString()}
                      </div>
                    </div>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold"
                      style={{ background: LAV_BTN, color: "#FFFFFF" }}
                    >
                      View profile
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: DARK }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div
                  style={{
                    fontFamily: OS,
                    fontSize: "clamp(28px, 4vw, 42px)",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {value}
                </div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY VALE — mint bg, 4 feature cards
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-10" style={{ background: MINT }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              style={{ fontFamily: OS, fontWeight: 700, fontSize: "clamp(24px,3.5vw,36px)", color: DARK, marginBottom: "12px" }}
            >
              Why families choose Vale
            </h2>
            <p style={{ fontSize: "16px", color: MED, maxWidth: "480px", margin: "0 auto" }}>
              We built Vale because arranging a funeral should never feel like navigating a maze.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_VALE.map(({ icon: Icon, title, body, color }) => (
              <div
                key={title}
                className="flex flex-col rounded-2xl p-6"
                style={{ background: "#FFFFFF", boxShadow: "0 2px 16px rgba(50,180,50,0.08)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 shrink-0"
                  style={{ background: color }}
                >
                  <Icon className="w-5 h-5" style={{ color: DARK }} aria-hidden="true" />
                </div>
                <h3
                  className="mb-2"
                  style={{ fontFamily: OS, fontWeight: 700, fontSize: "16px", color: DARK, lineHeight: 1.3 }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: "14px", color: MED, lineHeight: 1.6 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          COST GUIDE PREVIEW
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-10">
            <div>
              <h2
                style={{ fontFamily: OS, fontWeight: 700, fontSize: "clamp(22px,3vw,34px)", color: DARK, marginBottom: "8px" }}
              >
                What does a funeral actually cost?
              </h2>
              <p style={{ fontSize: "15px", color: MED }}>
                UK averages updated quarterly — Vale Funeral Price Index 2026.
              </p>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-sm font-semibold self-end hover:opacity-75 transition-opacity"
              style={{ fontFamily: OS, color: LAV_BTN }}
            >
              Full cost guide <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {COSTS.map(({ label, price, tag, desc, color }) => (
              <div
                key={label}
                className="rounded-2xl p-6"
                style={{ background: color, border: "none" }}
              >
                <span
                  className="inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide mb-4"
                  style={{ background: "rgba(255,255,255,0.6)", color: DARK }}
                >
                  {tag}
                </span>
                <div
                  style={{
                    fontFamily: OS,
                    fontSize: "clamp(32px,4vw,48px)",
                    fontWeight: 700,
                    color: DARK,
                    lineHeight: 1,
                    marginBottom: "8px",
                  }}
                >
                  {price}
                </div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: DARK, marginBottom: "6px" }}>
                  {label}
                </div>
                <p style={{ fontSize: "13px", color: MED, lineHeight: 1.55 }}>{desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs" style={{ color: LITE }}>
            * UK averages, Vale Funeral Price Index Q1 2026. Regional prices vary significantly.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS — pink bg
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-10" style={{ background: PINK }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              style={{ fontFamily: OS, fontWeight: 700, fontSize: "clamp(24px,3.5vw,36px)", color: DARK, marginBottom: "12px" }}
            >
              Trusted at life&apos;s hardest moments
            </h2>
            <p style={{ fontSize: "16px", color: MED }}>
              Real families, real experiences — every review linked to a confirmed arrangement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ quote, name, location, date, avatar }) => (
              <figure
                key={name}
                className="flex flex-col rounded-2xl p-6"
                style={{ background: "#FFFFFF", boxShadow: "0 2px 16px rgba(180,50,180,0.07)" }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: "#E8A020" }} aria-hidden="true" />
                  ))}
                </div>

                <blockquote
                  className="flex-1 mb-5"
                  style={{ fontSize: "14px", color: MED, lineHeight: 1.65 }}
                >
                  &ldquo;{quote}&rdquo;
                </blockquote>

                <figcaption className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ background: PINK, color: DARK }}
                    aria-hidden="true"
                  >
                    {avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: DARK }}>{name}</div>
                    <div style={{ fontSize: "12px", color: LITE }}>{location} · {date}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VALE VAULT — yellow bg
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-10" style={{ background: YEL }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Copy */}
            <div>
              <span
                className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide mb-5"
                style={{ background: "rgba(255,255,255,0.65)", color: "#806000" }}
              >
                Vale Vault
              </span>
              <h2
                className="mb-4"
                style={{ fontFamily: OS, fontWeight: 700, fontSize: "clamp(26px,3.5vw,40px)", color: DARK, lineHeight: 1.15 }}
              >
                A gift to the people{" "}
                <span style={{ color: "#806000" }}>you love.</span>
              </h2>
              <p
                className="mb-8"
                style={{ fontSize: "16px", color: MED, lineHeight: 1.65, maxWidth: "400px" }}
              >
                Store your wishes, important documents, and personal messages in a secure vault.
                Share access with the people who&apos;ll need it most. Free, forever.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/vault/start"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold hover:opacity-90 transition-opacity"
                  style={{ background: "#806000", color: "#FFFFFF" }}
                >
                  Start your vault — free
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs" style={{ color: "#806000", opacity: 0.7 }}>
                <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>End-to-end encrypted · No credit card · Cancel any time</span>
              </div>
            </div>

            {/* Feature tiles */}
            <div className="grid grid-cols-2 gap-4">
              {VAULT_FEATURES.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.9)" }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: "#FFFFFF" }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color: "#806000" }} aria-hidden="true" />
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "4px" }}>{label}</div>
                  <div style={{ fontSize: "12px", color: MED, lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ADVISOR SECTION — white bg
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-16 md:py-20 px-6 md:px-10"
        style={{ background: "#FFFFFF", borderTop: `1px solid ${BDR}`, borderBottom: `1px solid ${BDR}` }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Photo placeholder */}
            <div
              className="rounded-2xl overflow-hidden relative order-last md:order-first"
              style={{ aspectRatio: "4/3", background: LAV }}
              aria-hidden="true"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <Users className="w-14 h-14" style={{ color: LAV_BTN, opacity: 0.4 }} />
                <span style={{ fontSize: "14px", color: LAV_BTN, opacity: 0.5 }}>Team photo coming soon</span>
              </div>
            </div>

            {/* Copy */}
            <div>
              <span
                className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide mb-5"
                style={{ background: LAV, color: LAV_BTN }}
              >
                Free family advisor service
              </span>
              <h2
                className="mb-4"
                style={{ fontFamily: OS, fontWeight: 700, fontSize: "clamp(24px,3vw,36px)", color: DARK, lineHeight: 1.2 }}
              >
                A real person.{" "}
                <span style={{ color: LAV_BTN }}>No pressure. Free.</span>
              </h2>
              <p className="mb-8" style={{ fontSize: "15px", color: MED, lineHeight: 1.65 }}>
                Our family advisors are trained bereavement professionals — not salespeople.
                They&apos;ll help you understand your options, compare providers, and navigate
                next steps. No obligation, ever.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                {[
                  { icon: Phone, label: "Call us", detail: "0800 XXX XXXX · Mon–Fri 8am–10pm, Sat–Sun 9am–6pm" },
                  { icon: Clock, label: "Live chat", detail: "Available during phone hours · Avg. response under 2 min" },
                  { icon: BookOpen, label: "Email", detail: "hello@vale.co.uk · We reply within 2 hours" },
                ].map(({ icon: Icon, label, detail }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: LAV }}
                    >
                      <Icon className="w-4 h-4" style={{ color: LAV_BTN }} aria-hidden="true" />
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: DARK }}>{label}</div>
                      <div style={{ fontSize: "13px", color: MED, lineHeight: 1.5 }}>{detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold hover:opacity-90 transition-opacity"
                style={{ background: LAV_BTN, color: "#FFFFFF" }}
              >
                Talk to an advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOR FUNERAL DIRECTORS — lavender bg
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-10" style={{ background: LAV }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Heading + CTA */}
            <div>
              <span
                className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide mb-5"
                style={{ background: "rgba(255,255,255,0.55)", color: LAV_BTN }}
              >
                For funeral directors
              </span>
              <h2
                className="mb-4"
                style={{ fontFamily: OS, fontWeight: 700, fontSize: "clamp(24px,3.5vw,40px)", color: DARK, lineHeight: 1.15 }}
              >
                Grow your business with{" "}
                <span style={{ color: LAV_BTN }}>verified families.</span>
              </h2>
              <p className="mb-8" style={{ fontSize: "15px", color: MED, lineHeight: 1.65, maxWidth: "380px" }}>
                Join 1,200+ funeral directors on Vale. Families arrive informed, prices agreed,
                ready to enquire — not just browsing.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/for-funeral-directors"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold hover:opacity-90 transition-opacity"
                  style={{ background: LAV_BTN, color: "#FFFFFF" }}
                >
                  List your business
                </Link>
                <Link
                  href="/for-funeral-directors"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold"
                  style={{ background: "rgba(255,255,255,0.55)", color: LAV_BTN }}
                >
                  Book a demo
                </Link>
              </div>
            </div>

            {/* Stat tiles */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "Free", label: "to list", desc: "No setup fee. Pay per verified enquiry." },
                { stat: "4.2×", label: "more enquiries", desc: "For Vale Assured providers vs standard." },
                { stat: "£0", label: "CMA tools", desc: "Free itemised price display and compliance." },
                { stat: "Live", label: "dashboard", desc: "Track views, enquiries, and reviews." },
              ].map(({ stat, label, desc }) => (
                <div
                  key={label}
                  className="rounded-2xl p-5"
                  style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.8)" }}
                >
                  <div style={{ fontFamily: OS, fontSize: "30px", fontWeight: 700, color: LAV_BTN, lineHeight: 1 }}>
                    {stat}
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: MED, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "2px", marginBottom: "6px" }}>
                    {label}
                  </div>
                  <div style={{ fontSize: "13px", color: MED, lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          RESOURCES HUB
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-10">
            <div>
              <h2
                style={{ fontFamily: OS, fontWeight: 700, fontSize: "clamp(22px,3vw,34px)", color: DARK, marginBottom: "8px" }}
              >
                Guides &amp; resources
              </h2>
              <p style={{ fontSize: "15px", color: MED }}>
                Practical, compassionate guides written by our family advisors.
              </p>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-sm font-semibold self-end hover:opacity-75 transition-opacity"
              style={{ fontFamily: OS, color: LAV_BTN }}
            >
              View all guides <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESOURCES.map(({ title, tag, href }, i) => (
              <Link
                key={title}
                href={href}
                className="group flex flex-col rounded-2xl p-5 hover:shadow-lg transition-shadow duration-200"
                style={{ background: RES_COLORS[i], border: "none" }}
              >
                <span
                  className="inline-block rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide mb-3 w-fit"
                  style={{ background: "rgba(255,255,255,0.6)", color: DARK }}
                >
                  {tag}
                </span>
                <span
                  className="flex-1 text-sm font-bold leading-snug mb-4"
                  style={{ color: DARK, lineHeight: 1.4 }}
                >
                  {title}
                </span>
                <ChevronRight
                  className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
                  style={{ color: MED }}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA BAND — mint bg, split layout
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: MINT }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">

            {/* Left — need help now */}
            <div
              className="rounded-2xl p-8 flex flex-col"
              style={{ background: "#FFFFFF", boxShadow: "0 4px 24px rgba(50,180,50,0.1)" }}
            >
              <span
                className="inline-block rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wide mb-5 w-fit"
                style={{ background: MINT, color: MINT_BTN }}
              >
                Need help now
              </span>
              <h2
                className="mb-3"
                style={{ fontFamily: OS, fontWeight: 700, fontSize: "clamp(22px,3vw,30px)", color: DARK, lineHeight: 1.2 }}
              >
                Find a funeral director today
              </h2>
              <p className="flex-1 mb-6" style={{ fontSize: "15px", color: MED, lineHeight: 1.65 }}>
                Search verified providers near you. See real prices. Compare and connect — no
                account needed, no pressure, ever.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold hover:opacity-90 transition-opacity"
                style={{ background: MINT_BTN, color: "#FFFFFF" }}
              >
                Search funeral directors
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Right — planning ahead */}
            <div
              className="rounded-2xl p-8 flex flex-col"
              style={{ background: "#FFFFFF", boxShadow: "0 4px 24px rgba(50,180,50,0.1)" }}
            >
              <span
                className="inline-block rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wide mb-5 w-fit"
                style={{ background: YEL, color: "#806000" }}
              >
                Planning ahead
              </span>
              <h2
                className="mb-3"
                style={{ fontFamily: OS, fontWeight: 700, fontSize: "clamp(22px,3vw,30px)", color: DARK, lineHeight: 1.2 }}
              >
                Give your family certainty
              </h2>
              <p className="flex-1 mb-6" style={{ fontSize: "15px", color: MED, lineHeight: 1.65 }}>
                Start your Vale Vault — store your wishes, documents, and messages. Share with
                loved ones. Free, private, and yours forever.
              </p>
              <Link
                href="/vault/start"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold hover:opacity-90 transition-opacity"
                style={{ background: "#806000", color: "#FFFFFF" }}
              >
                Start your vault — free
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
