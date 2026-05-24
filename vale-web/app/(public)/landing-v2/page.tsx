import Link from "next/link";
import {
  CheckCircle,
  Shield,
  Star,
  Phone,
  BookOpen,
  Lock,
  Users,
  ChevronRight,
  ArrowRight,
  Clock,
  Heart,
  FileText,
  Music,
  Mail,
  MessageSquare,
} from "lucide-react";
import HowItWorks from "@/components/HowItWorks";
import HeroSearchV2 from "@/components/HeroSearchV2";
import VaultEmailCapture from "@/components/VaultEmailCapture";
import VersionToggle from "@/components/VersionToggle";

/* ─────────────────────────── DATA ─────────────────────────── */

const TESTIMONIALS = [
  {
    quote:
      "I was in the worst week of my life. Vale let me look at real prices at 2 am without calling anyone. I found a funeral director we could actually afford, close to home. I can't describe how much that mattered.",
    author: "Rachel T.",
    location: "Leeds",
    date: "March 2026",
    avatar: "R",
  },
  {
    quote:
      "We've used three different funeral directors for family members in five years. Vale was the only time we actually understood what we were paying for — and why. The prices were exactly what we were quoted.",
    author: "David & Anne K.",
    location: "Bristol",
    date: "January 2026",
    avatar: "D",
  },
  {
    quote:
      "My father had written down exactly what he wanted. Vale's vault meant we had everything in one place when it mattered. The advisor who called us — Sophie — was extraordinary.",
    author: "Marcus J.",
    location: "Edinburgh",
    date: "February 2026",
    avatar: "M",
  },
];

const COST_ITEMS = [
  {
    label: "Direct cremation",
    price: "£1,995",
    desc: "Cremation only, no service, ashes returned to family",
    tag: "Most affordable",
  },
  {
    label: "Standard funeral",
    price: "£4,285",
    desc: "Funeral service, cremation or burial, basic coffin",
    tag: "UK average",
  },
  {
    label: "Total cost of dying",
    price: "£9,797",
    desc: "Including probate, death admin, wake, obituary, memorials",
    tag: "Full picture",
  },
];

const VAULT_FEATURES = [
  {
    icon: Heart,
    label: "Your wishes",
    desc: "Service preferences, music, readings, who to notify",
  },
  {
    icon: FileText,
    label: "Important documents",
    desc: "Will, insurance policy, funeral plan, bank details",
  },
  {
    icon: Music,
    label: "Personal touches",
    desc: "Songs, photos, messages to leave for loved ones",
  },
  {
    icon: Users,
    label: "Sharing controls",
    desc: "Choose who sees what. Revoke access any time.",
  },
];

const RESOURCES = [
  { title: "What to do in the first 24 hours", tag: "Guide", href: "/resources" },
  { title: "How to choose a funeral director", tag: "Checklist", href: "/resources" },
  { title: "Understanding direct cremation", tag: "Explainer", href: "/resources" },
  { title: "Talking to children about death", tag: "Support", href: "/resources" },
  { title: "The UK Funeral Price Index 2026", tag: "Report", href: "/resources" },
  { title: "Pre-planning: a step-by-step guide", tag: "Guide", href: "/resources" },
];

const PRESS = ["Financial Times", "The Guardian", "BBC News", "The Telegraph", "Which?"];

const VALE_ASSURED_POINTS = [
  "Identity-verified reviewer",
  "Linked to a confirmed arrangement",
  "Date and provider cross-checked",
  "Right-to-reply for every provider",
  "Dispute resolution within 72 hours",
  "Family guarantee fund for complaints",
];

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function LandingV2() {
  return (
    <div style={{ background: "#FFFFFF" }}>
      {/* Floating version toggle */}
      <VersionToggle />

      {/* ══════════════════════════════════════════════════════════
          §2  HERO — transparency headline + functional search
      ══════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden flex flex-col justify-center"
        style={{ background: "#1A1A2E", minHeight: "88vh" }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />
        {/* Sage radial wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 85% 40%, rgba(107,109,232,0.1) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-6 md:px-10 py-28 md:py-36">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-8">
            <span aria-hidden className="inline-block w-6 h-px" style={{ background: "#6B6DE8" }} />
            <span
              className="text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: "#6B6DE8" }}
            >
              Verified UK funeral directors
            </span>
          </div>

          {/* Headline */}
          <h1
            className="mb-6 max-w-2xl"
            style={{
              fontFamily: "var(--font-open-sans)",
              fontSize: "clamp(40px, 6vw, 78px)",
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
            }}
          >
            Real prices.
            <br />
            Verified providers.
            <br />
            <em style={{ color: "#6B6DE8", fontStyle: "italic" }}>Genuine choice.</em>
          </h1>

          <p
            className="mb-10 max-w-md"
            style={{
              fontSize: "16px",
              lineHeight: 1.65,
              color: "rgba(247,243,238,0.62)",
            }}
          >
            Compare funeral directors across the UK. See exactly what you&apos;ll pay before
            you make a single call. No account needed.
          </p>

          {/* Search */}
          <div className="max-w-2xl">
            <HeroSearchV2 dark={true} />
          </div>

          {/* Secondary CTA */}
          <div className="mt-6">
            <Link
              href="/search"
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "rgba(247,243,238,0.4)" }}
            >
              Just need to talk to someone? Our family advisors are here →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §3  TRUST BAR — accreditations + press strip
      ══════════════════════════════════════════════════════════ */}
      <section
        className="px-6 md:px-10 py-4"
        style={{ background: "#FFFFFF", borderBottom: "1px solid #E8E8F4" }}
      >
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Accreditation badges */}
          <div className="flex flex-wrap items-center gap-5">
            {[
              { label: "NAFD", sub: "Member" },
              { label: "SAIF", sub: "Approved" },
            ].map(({ label, sub }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div
                  className="w-7 h-7 rounded flex items-center justify-center text-[9px] font-bold tracking-wide"
                  style={{ background: "#1A1A2E", color: "#FFFFFF" }}
                  aria-label={`${label} ${sub}`}
                >
                  {label}
                </div>
                <span className="text-[11px] font-medium" style={{ color: "#5C5C7A" }}>
                  {sub}
                </span>
              </div>
            ))}
            <span
              className="h-3.5 w-px hidden sm:block"
              style={{ background: "#E8E8F4" }}
              aria-hidden="true"
            />
            {["CMA-aligned pricing", "6-point verified providers"].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1 text-[11px] font-medium"
                style={{ color: "#6B6DE8" }}
              >
                <CheckCircle className="w-3 h-3" aria-hidden="true" />
                {badge}
              </span>
            ))}
          </div>

          {/* Press */}
          <div className="flex flex-wrap items-center gap-5">
            <span
              className="text-[10px] tracking-[0.18em] uppercase"
              style={{ color: "#B0A79E" }}
            >
              As seen in
            </span>
            {["FT", "Guardian", "BBC"].map((pub) => (
              <span
                key={pub}
                className="text-[11px] font-medium"
                style={{ color: "#1A1A2E", opacity: 0.38 }}
              >
                {pub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §4  HOW IT WORKS
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 px-6 md:px-10"
        style={{ background: "#FFFFFF", borderBottom: "1px solid #E8E8F4" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <div className="flex items-center gap-2.5 mb-6">
              <span
                aria-hidden
                className="inline-block w-6 h-px"
                style={{ background: "#6B6DE8" }}
              />
              <span
                className="text-[11px] tracking-[0.2em] uppercase font-medium"
                style={{ color: "#6B6DE8" }}
              >
                How Vale works
              </span>
            </div>
            <h2
              className="mb-4 max-w-lg"
              style={{
                fontFamily: "var(--font-open-sans), sans-serif",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 400,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "#1A1A2E",
              }}
            >
              Clarity when you need it most
            </h2>
            <p className="text-sm leading-relaxed max-w-md" style={{ color: "#5C5C7A" }}>
              Search, compare, and connect at your own pace — without anyone pushing you
              towards a decision you&apos;re not ready to make.
            </p>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §5  FIND A FUNERAL DIRECTOR
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 px-6 md:px-10"
        style={{ background: "#D2D3FC", borderBottom: "1px solid #D4E3DA" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2.5 mb-6">
            <span
              aria-hidden
              className="inline-block w-6 h-px"
              style={{ background: "#6B6DE8" }}
            />
            <span
              className="text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: "#6B6DE8" }}
            >
              Search by postcode
            </span>
            <span
              aria-hidden
              className="inline-block w-6 h-px"
              style={{ background: "#6B6DE8" }}
            />
          </div>

          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-open-sans), sans-serif",
              fontSize: "clamp(30px, 4vw, 52px)",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#1A1A2E",
            }}
          >
            Find a verified funeral director{" "}
            <em style={{ color: "#6B6DE8", fontStyle: "italic" }}>near you</em>
          </h2>

          <p
            className="mb-10 text-sm leading-relaxed max-w-md"
            style={{ color: "#5C5C7A" }}
          >
            1,200+ providers across the UK. Prices shown upfront. Every funeral director
            verified before listing. No account needed.
          </p>

          <div className="w-full max-w-xl">
            <HeroSearchV2 dark={false} />
          </div>

          <div
            className="mt-8 flex flex-wrap justify-center gap-3 text-xs"
            style={{ color: "#5C5C7A" }}
          >
            {[
              "London · Birmingham · Manchester",
              "Edinburgh · Glasgow",
              "Cardiff · Swansea",
            ].map((region) => (
              <span
                key={region}
                className="px-3 py-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.6)", border: "1px solid #D4E3DA" }}
              >
                {region}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §6  THE TRANSPARENCY PROBLEM
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 px-6 md:px-10"
        style={{ background: "#1A1A2E" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2.5 mb-12">
            <span
              aria-hidden
              className="inline-block w-6 h-px"
              style={{ background: "#C45EC4" }}
            />
            <span
              className="text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: "#C45EC4" }}
            >
              Why Vale exists
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-14 mb-14">
            {[
              {
                stat: "134%",
                copy: "The rise in UK funeral costs since 2004 — more than twice the rate of inflation. The CMA found that providers exploit the fact that most families don't shop around.",
              },
              {
                stat: "35%",
                copy: "of UK families compare prices before choosing a funeral director. Most decide within hours, under grief, without knowing whether they're being overcharged.",
              },
            ].map(({ stat, copy }) => (
              <div key={stat}>
                <div
                  style={{
                    fontFamily: "var(--font-open-sans), sans-serif",
                    fontSize: "clamp(72px, 10vw, 108px)",
                    fontWeight: 300,
                    lineHeight: 0.88,
                    color: "#C45EC4",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {stat}
                </div>
                <p
                  className="mt-5 leading-relaxed"
                  style={{
                    fontSize: "15px",
                    color: "rgba(247,243,238,0.68)",
                    maxWidth: "340px",
                  }}
                >
                  {copy}
                </p>
              </div>
            ))}
          </div>

          {/* Vale as the answer */}
          <div
            className="rounded-2xl px-8 py-8 md:py-10"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h2
              className="mb-4 max-w-2xl"
              style={{
                fontFamily: "var(--font-open-sans), sans-serif",
                fontSize: "clamp(24px, 3vw, 38px)",
                fontWeight: 400,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
              }}
            >
              Vale was built to fix this.{" "}
              <em style={{ color: "#6B6DE8" }}>Not to profit from it.</em>
            </h2>
            <p
              className="text-sm leading-relaxed max-w-2xl mb-6"
              style={{ color: "rgba(247,243,238,0.58)" }}
            >
              We publish real prices, verify every provider against a six-point standard, and
              give families the information they need before they make one of the most
              consequential decisions of their lives. The Competition and Markets Authority
              identified this market failure in 2021. We&apos;re the answer.
            </p>
            <Link
              href="/about"
              style={{
                fontSize: "14px",
                color: "#6B6DE8",
                fontFamily: "var(--font-open-sans), sans-serif",
                fontStyle: "italic",
              }}
            >
              Read our full story →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §7  COST GUIDE PREVIEW
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 px-6 md:px-10"
        style={{ background: "#FFFFFF", borderTop: "1px solid #E8E8F4" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-16 items-start">
            {/* Left — heading */}
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <span
                  aria-hidden
                  className="inline-block w-6 h-px"
                  style={{ background: "#6B6DE8" }}
                />
                <span
                  className="text-[11px] tracking-[0.2em] uppercase font-medium"
                  style={{ color: "#6B6DE8" }}
                >
                  Cost guide
                </span>
              </div>
              <h2
                className="mb-5"
                style={{
                  fontFamily: "var(--font-open-sans), sans-serif",
                  fontSize: "clamp(26px, 3.5vw, 40px)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "#1A1A2E",
                }}
              >
                What does a funeral actually cost?
              </h2>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "#5C5C7A", maxWidth: "280px" }}
              >
                UK average costs, updated quarterly from Vale&apos;s Funeral Price Index.
                Regional variation can be significant — search to see prices in your area.
              </p>
              <Link
                href="/resources"
                className="inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-75 transition-opacity"
                style={{ color: "#6B6DE8" }}
              >
                Read the full cost guide
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Right — cost cards */}
            <div className="flex flex-col gap-4">
              {COST_ITEMS.map(({ label, price, desc, tag }) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-4 rounded-xl px-6 py-5"
                  style={{ background: "white", border: "1px solid #E8E8F4" }}
                >
                  <div>
                    <span
                      className="text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full inline-block mb-2"
                      style={{ background: "#D2D3FC", color: "#6B6DE8" }}
                    >
                      {tag}
                    </span>
                    <div
                      className="text-sm font-medium mb-0.5"
                      style={{ color: "#1A1A2E" }}
                    >
                      {label}
                    </div>
                    <div className="text-xs leading-relaxed" style={{ color: "#5C5C7A" }}>
                      {desc}
                    </div>
                  </div>
                  <div
                    className="shrink-0"
                    style={{
                      fontFamily: "var(--font-open-sans), sans-serif",
                      fontSize: "30px",
                      fontWeight: 300,
                      color: "#1A1A2E",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {price}
                  </div>
                </div>
              ))}
              <p className="text-[11px] pl-1" style={{ color: "#B0A79E" }}>
                * UK averages, Vale Funeral Price Index Q1 2026. Regional prices vary
                significantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §8  PRE-PLANNING VAULT
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 px-6 md:px-10"
        style={{ background: "#2A3B31", borderTop: "1px solid rgba(0,0,0,0.1)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left — copy + email capture */}
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <span
                  aria-hidden
                  className="inline-block w-6 h-px"
                  style={{ background: "rgba(168,212,181,0.5)" }}
                />
                <span
                  className="text-[11px] tracking-[0.2em] uppercase font-medium"
                  style={{ color: "rgba(168,212,181,0.7)" }}
                >
                  Vale Vault
                </span>
              </div>
              <h2
                className="mb-5"
                style={{
                  fontFamily: "var(--font-open-sans), sans-serif",
                  fontSize: "clamp(30px, 4vw, 54px)",
                  fontWeight: 400,
                  lineHeight: 1.04,
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                }}
              >
                A gift to the people{" "}
                <em style={{ color: "#A8D4B5", fontStyle: "italic" }}>you love.</em>
              </h2>
              <p
                className="mb-8 leading-relaxed"
                style={{
                  fontSize: "15px",
                  color: "rgba(210,211,252,0.65)",
                  maxWidth: "380px",
                }}
              >
                Store your wishes, important documents, and personal messages in a secure
                vault. Share access with the people who&apos;ll need it. Free, for ever.
              </p>
              <VaultEmailCapture />
              <div
                className="mt-4 flex flex-wrap items-center gap-3 text-[11px]"
                style={{ color: "rgba(210,211,252,0.38)" }}
              >
                <span className="inline-flex items-center gap-1">
                  <Lock className="w-3 h-3" aria-hidden="true" />
                  End-to-end encrypted
                </span>
                <span aria-hidden>·</span>
                <span>No credit card</span>
                <span aria-hidden>·</span>
                <span>Cancel any time</span>
              </div>
            </div>

            {/* Right — feature tiles */}
            <div className="grid grid-cols-2 gap-4">
              {VAULT_FEATURES.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="rounded-xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: "rgba(168,212,181,0.14)" }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: "#A8D4B5" }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-sm font-medium mb-1" style={{ color: "#FFFFFF" }}>
                    {label}
                  </div>
                  <div
                    className="text-xs leading-relaxed"
                    style={{ color: "rgba(210,211,252,0.52)" }}
                  >
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §9  VERIFIED REVIEWS & VALE ASSURED
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 px-6 md:px-10"
        style={{ background: "#FFFFFF", borderTop: "1px solid #E8E8F4" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[2fr_3fr] gap-12 md:gap-16 items-start">
            {/* Left — explanation */}
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <span
                  aria-hidden
                  className="inline-block w-6 h-px"
                  style={{ background: "#6B6DE8" }}
                />
                <span
                  className="text-[11px] tracking-[0.2em] uppercase font-medium"
                  style={{ color: "#6B6DE8" }}
                >
                  Vale Assured
                </span>
              </div>
              <h2
                className="mb-5"
                style={{
                  fontFamily: "var(--font-open-sans), sans-serif",
                  fontSize: "clamp(26px, 3.5vw, 40px)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "#1A1A2E",
                }}
              >
                Not all reviews are{" "}
                <em style={{ color: "#6B6DE8" }}>equal.</em>
              </h2>
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: "#5C5C7A", maxWidth: "320px" }}
              >
                Every Vale review is linked to a confirmed arrangement. We verify the reviewer,
                the provider, and the dates. No anonymous posts. No incentivised reviews. No
                exceptions.
              </p>

              <div className="flex flex-col gap-3">
                {VALE_ASSURED_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <CheckCircle
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: "#6B6DE8" }}
                      aria-hidden="true"
                    />
                    <span className="text-sm" style={{ color: "#5C5C7A" }}>
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — review excerpts */}
            <div className="flex flex-col gap-4">
              {TESTIMONIALS.slice(0, 2).map(({ quote, author, location, date, avatar }) => (
                <figure
                  key={author}
                  className="rounded-xl px-6 py-5"
                  style={{ background: "#FFFFFF", border: "1px solid #E8E8F4" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium shrink-0"
                      style={{ background: "#D2D3FC", color: "#1A1A2E" }}
                      aria-hidden="true"
                    >
                      {avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium" style={{ color: "#1A1A2E" }}>
                        {author}
                      </div>
                      <div className="text-xs" style={{ color: "#5C5C7A" }}>
                        {location} · {date}
                      </div>
                    </div>
                    <div className="flex gap-0.5 ml-auto shrink-0" aria-label="5 stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-current"
                          style={{ color: "#C45EC4" }}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: "#5C5C7A" }}
                  >
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-1.5">
                    <Shield
                      className="w-3 h-3"
                      style={{ color: "#6B6DE8" }}
                      aria-hidden="true"
                    />
                    <span
                      className="text-[10px] tracking-wide uppercase font-medium"
                      style={{ color: "#6B6DE8" }}
                    >
                      Vale Verified Review
                    </span>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §10  FAMILY ADVISOR SERVICE
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 px-6 md:px-10"
        style={{
          background: "#FFFFFF",
          borderTop: "1px solid #E8E8F4",
          borderBottom: "1px solid #E8E8F4",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Photo placeholder */}
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{
                aspectRatio: "4/3",
                background: "#D2D3FC",
                border: "1px solid #D4E3DA",
              }}
              aria-hidden="true"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <Users className="w-12 h-12" style={{ color: "#6B6DE8", opacity: 0.3 }} />
                <span className="text-sm" style={{ color: "#6B6DE8", opacity: 0.4 }}>
                  Team photo coming soon
                </span>
              </div>
            </div>

            {/* Copy */}
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <span
                  aria-hidden
                  className="inline-block w-6 h-px"
                  style={{ background: "#6B6DE8" }}
                />
                <span
                  className="text-[11px] tracking-[0.2em] uppercase font-medium"
                  style={{ color: "#6B6DE8" }}
                >
                  Family advisor service
                </span>
              </div>
              <h2
                className="mb-5"
                style={{
                  fontFamily: "var(--font-open-sans), sans-serif",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "#1A1A2E",
                }}
              >
                A real person.{" "}
                <em style={{ color: "#6B6DE8" }}>No pressure. Free.</em>
              </h2>
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: "#5C5C7A", maxWidth: "360px" }}
              >
                Our family advisors are trained bereavement support professionals — not
                salespeople. They&apos;ll help you understand your options, compare providers,
                and navigate next steps. No obligation, ever.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                {[
                  {
                    icon: Phone,
                    label: "Call us",
                    detail: "0800 XXX XXXX · Mon–Fri 8am–10pm, Sat–Sun 9am–6pm",
                  },
                  {
                    icon: MessageSquare,
                    label: "Live chat",
                    detail: "Available during phone hours · Avg. response under 2 min",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    detail: "hello@vale.co.uk · We reply within 2 hours",
                  },
                ].map(({ icon: Icon, label, detail }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "#D2D3FC" }}
                    >
                      <Icon
                        className="w-4 h-4"
                        style={{ color: "#6B6DE8" }}
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: "#1A1A2E" }}>
                        {label}
                      </div>
                      <div
                        className="text-xs leading-relaxed mt-0.5"
                        style={{ color: "#5C5C7A" }}
                      >
                        {detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/search"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ background: "#1A1A2E", color: "#FFFFFF" }}
              >
                Talk to an advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §11  TESTIMONIALS
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 px-6 md:px-10"
        style={{ background: "#D2D3FC" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2.5 mb-6">
            <span
              aria-hidden
              className="inline-block w-6 h-px"
              style={{ background: "#6B6DE8" }}
            />
            <span
              className="text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: "#6B6DE8" }}
            >
              Family stories
            </span>
          </div>
          <h2
            className="mb-14 max-w-xl"
            style={{
              fontFamily: "var(--font-open-sans), sans-serif",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#1A1A2E",
            }}
          >
            Trusted at life&apos;s hardest moments
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ quote, author, location, date, avatar }) => (
              <figure
                key={author}
                className="flex flex-col rounded-xl px-6 py-6"
                style={{ background: "white", border: "1px solid #D4E3DA" }}
              >
                <div
                  className="select-none mb-4"
                  style={{
                    fontSize: "48px",
                    fontFamily: "Georgia, serif",
                    color: "#6B6DE8",
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>
                <blockquote
                  className="flex-1 text-sm leading-relaxed mb-6"
                  style={{ color: "#5C5C7A" }}
                >
                  {quote}
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0"
                    style={{ background: "#D2D3FC", color: "#1A1A2E" }}
                    aria-hidden="true"
                  >
                    {avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "#1A1A2E" }}>
                      {author}
                    </div>
                    <div className="text-xs" style={{ color: "#5C5C7A" }}>
                      {location} · {date}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §12  RESOURCES & GUIDES HUB
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 px-6 md:px-10"
        style={{ background: "#FFFFFF", borderTop: "1px solid #E8E8F4" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <span
                  aria-hidden
                  className="inline-block w-6 h-px"
                  style={{ background: "#6B6DE8" }}
                />
                <span
                  className="text-[11px] tracking-[0.2em] uppercase font-medium"
                  style={{ color: "#6B6DE8" }}
                >
                  Guides & resources
                </span>
              </div>
              <h2
                className="max-w-xs"
                style={{
                  fontFamily: "var(--font-open-sans), sans-serif",
                  fontSize: "clamp(26px, 3.5vw, 40px)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "#1A1A2E",
                }}
              >
                Knowledge when it matters
              </h2>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-sm font-medium self-end hover:opacity-75 transition-opacity"
              style={{ color: "#6B6DE8" }}
            >
              View all guides
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESOURCES.map(({ title, tag, href }) => (
              <Link
                key={title}
                href={href}
                className="group flex flex-col rounded-xl px-5 py-5 hover:shadow-md transition-shadow"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E8E8F4",
                }}
              >
                <span
                  className="text-[10px] font-medium uppercase tracking-widest mb-3 px-2 py-0.5 rounded-full w-fit"
                  style={{ background: "#D2D3FC", color: "#6B6DE8" }}
                >
                  {tag}
                </span>
                <span
                  className="text-sm font-medium leading-snug flex-1 mb-4"
                  style={{ color: "#1A1A2E" }}
                >
                  {title}
                </span>
                <ChevronRight
                  className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                  style={{ color: "#5C5C7A" }}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §13  FOR FUNERAL DIRECTORS
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 px-6 md:px-10"
        style={{ background: "#1A1A2E", borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left — heading + CTA */}
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <span
                aria-hidden
                className="inline-block w-6 h-px"
                style={{ background: "#C45EC4" }}
              />
              <span
                className="text-[11px] tracking-[0.2em] uppercase font-medium"
                style={{ color: "#C45EC4" }}
              >
                For funeral directors
              </span>
            </div>
            <h2
              className="mb-5"
              style={{
                fontFamily: "var(--font-open-sans), sans-serif",
                fontSize: "clamp(28px, 3.5vw, 46px)",
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "#FFFFFF",
              }}
            >
              Grow your business with{" "}
              <em style={{ color: "#C45EC4" }}>verified families.</em>
            </h2>
            <p
              className="mb-8 leading-relaxed"
              style={{
                fontSize: "15px",
                color: "rgba(247,243,238,0.62)",
                maxWidth: "360px",
              }}
            >
              Join 1,200+ funeral directors already on Vale. Families arrive informed,
              prices agreed, ready to enquire — not just browsing.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/for-funeral-directors"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ background: "#C45EC4", color: "#1A1A2E" }}
              >
                List your business
              </Link>
              <Link
                href="/for-funeral-directors"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium"
                style={{
                  background: "rgba(196,94,196,0.1)",
                  color: "#C45EC4",
                  border: "1px solid rgba(196,94,196,0.3)",
                }}
              >
                Book a demo
              </Link>
            </div>
          </div>

          {/* Right — stat tiles */}
          <div className="flex flex-col gap-4">
            {[
              {
                stat: "Free",
                label: "to list",
                desc: "No setup fee. No monthly retainer. Pay per verified enquiry, or upgrade for Assured status.",
              },
              {
                stat: "4.2×",
                label: "more enquiries",
                desc: "Assured providers receive 4.2× more family enquiries than standard listings on average.",
              },
              {
                stat: "£0",
                label: "CMA compliance cost",
                desc: "Itemised price display tools and compliance documentation — free, as standard.",
              },
              {
                stat: "Live",
                label: "dashboard",
                desc: "Track views, enquiries, and reviews in real time. Export your data any time.",
              },
            ].map(({ stat, label, desc }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-xl px-5 py-4"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="shrink-0 min-w-[56px]">
                  <div
                    style={{
                      fontFamily: "var(--font-open-sans), sans-serif",
                      fontSize: "30px",
                      fontWeight: 300,
                      color: "#C45EC4",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {stat}
                  </div>
                  <div
                    className="text-[9px] uppercase tracking-widest mt-0.5"
                    style={{ color: "rgba(247,243,238,0.35)" }}
                  >
                    {label}
                  </div>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(247,243,238,0.58)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §14  PRESS & RECOGNITION
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-12 px-6 md:px-10"
        style={{
          background: "#FFFFFF",
          borderTop: "1px solid #E8E8F4",
          borderBottom: "1px solid #E8E8F4",
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-8">
          <div>
            <div
              className="text-[10px] tracking-[0.2em] uppercase mb-5"
              style={{ color: "#B0A79E" }}
            >
              Press & recognition
            </div>
            <div className="flex flex-wrap items-center gap-8">
              {PRESS.map((pub) => (
                <span
                  key={pub}
                  style={{
                    fontFamily: "var(--font-open-sans), sans-serif",
                    fontSize: "20px",
                    fontWeight: 400,
                    color: "#1A1A2E",
                    opacity: 0.3,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {pub}
                </span>
              ))}
            </div>
          </div>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium hover:opacity-80 transition-opacity"
            style={{ background: "white", border: "1px solid #E8E8F4", color: "#1A1A2E" }}
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            Funeral Price Index 2026
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          §15  FINAL CTA BAND — need help now / planning ahead
      ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "#1A1A2E" }}>
        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.032) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto grid md:grid-cols-2">
          {/* ── Need help now ── */}
          <div
            className="px-8 md:px-14 py-24 md:py-32"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-2.5 mb-8">
              <span
                aria-hidden
                className="inline-block w-6 h-px"
                style={{ background: "#6B6DE8" }}
              />
              <span
                className="text-[11px] tracking-[0.2em] uppercase font-medium"
                style={{ color: "#6B6DE8" }}
              >
                Need help now
              </span>
            </div>
            <h2
              className="mb-5"
              style={{
                fontFamily: "var(--font-open-sans)",
                color: "#FFFFFF",
                fontSize: "clamp(28px, 3vw, 44px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              We&apos;re here with you,{" "}
              <em style={{ color: "#6B6DE8" }}>right now.</em>
            </h2>
            <p
              className="mb-10 leading-relaxed max-w-sm"
              style={{ fontSize: "15px", color: "rgba(210,211,252,0.6)" }}
            >
              Search verified funeral directors near you, or speak to a family advisor — no
              account needed, no pressure, ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
                style={{
                  background: "rgba(107,109,232,0.12)",
                  color: "#6B6DE8",
                  border: "1px solid rgba(107,109,232,0.32)",
                }}
              >
                Search funeral directors →
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium"
                style={{
                  color: "rgba(210,211,252,0.48)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                Talk to an advisor
              </Link>
            </div>
          </div>

          {/* Vertical divider — desktop only */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px"
            style={{ background: "rgba(255,255,255,0.07)" }}
            aria-hidden="true"
          />

          {/* ── Planning ahead ── */}
          <div className="px-8 md:px-14 py-24 md:py-32">
            <div className="flex items-center gap-2.5 mb-8">
              <span
                aria-hidden
                className="inline-block w-6 h-px"
                style={{ background: "#C45EC4" }}
              />
              <span
                className="text-[11px] tracking-[0.2em] uppercase font-medium"
                style={{ color: "#C45EC4" }}
              >
                Planning ahead
              </span>
            </div>
            <h2
              className="mb-5"
              style={{
                fontFamily: "var(--font-open-sans)",
                color: "#FFFFFF",
                fontSize: "clamp(28px, 3vw, 44px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              Give your family{" "}
              <em style={{ color: "#C45EC4" }}>certainty.</em>
            </h2>
            <p
              className="mb-10 leading-relaxed max-w-sm"
              style={{ fontSize: "15px", color: "rgba(210,211,252,0.6)" }}
            >
              Store your wishes, documents, and personal messages in your Vale Vault. Share
              with loved ones. Free, private, and yours for ever.
            </p>
            <Link
              href="/vault/start"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
              style={{
                background: "rgba(196,94,196,0.12)",
                color: "#C45EC4",
                border: "1px solid rgba(196,94,196,0.32)",
              }}
            >
              Start your vault — free →
            </Link>
            <p className="text-xs mt-6" style={{ color: "rgba(210,211,252,0.28)" }}>
              No credit card · Private by default · Cancel any time
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
