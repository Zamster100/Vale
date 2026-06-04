'use client';

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Star,
  Shield,
  BookOpen,
  Clock,
  Phone,
  ChevronRight,
  TrendingUp,
  Users,
  X,
  Info,
  Play,
  Search,
} from "lucide-react";
import HomeSearchBar from "@/components/HomeSearchBar";

/* ─────────────────────── DESIGN TOKENS ─────────────────────── */
const OS = "var(--font-open-sans), -apple-system, sans-serif";

const LAV   = "#D2D3FC";
const PINK  = "#FBD2FC";
const YEL   = "#FCFBD2";
const MINT  = "#D3FCD2";

const LAV_BTN  = "#6B6DE8";
const PINK_BTN = "#C45EC4";
const MINT_BTN = "#3AA838";

const DARK = "#1A1A2E";
const MED  = "#5C5C7A";
const LITE = "#9090A8";
const BDR  = "#E8E8F4";

/* ─────────────────────── MOCK DATA ─────────────────────────── */

const WHY_VALE = [
  {
    icon: TrendingUp,
    title: "Real prices upfront",
    body: "Every provider publishes their full itemised price list. No hidden extras, no surprises — exactly what the CMA requires.",
    color: LAV,
  },
  {
    icon: Shield,
    title: "Independently verified providers",
    body: "Not every funeral director makes it onto Vale. They have to pass our checks before they can list.",
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
    title: "Powerful Search Filters",
    body: "On a budget? Specific faith? Vale's search filters allow families to quickly filter funeral services to meet their unique circumstances or requirements.",
    color: MINT,
  },
];

const STATS = [
  { value: "1,200+", label: "Verified providers" },
  { value: "4.9 / 5", label: "Average family rating" },
  { value: "£1,895", label: "Average saving found" },
  { value: "0", label: "Hidden charges, ever" },
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

const SEARCH_CATS = [
  {
    label: "Direct Cremation",
    color: LAV,
    btnColor: LAV_BTN,
    href: "/search?type=direct-cremation",
    desc: "Simple, dignified cremation without a formal service. The most affordable option.",
  },
  {
    label: "Direct Burial",
    color: PINK,
    btnColor: PINK_BTN,
    href: "/search?type=direct-burial",
    desc: "Burial without a ceremony or viewing. A private, straightforward choice.",
  },
  {
    label: "Traditional Cremation",
    color: MINT,
    btnColor: MINT_BTN,
    href: "/search?type=traditional-cremation",
    desc: "A full funeral service and farewell, followed by cremation.",
  },
  {
    label: "Traditional Burial",
    color: YEL,
    btnColor: "#8A7A00",
    href: "/search?type=traditional-burial",
    desc: "Full funeral service with burial in a cemetery or churchyard.",
  },
];

type ModalData = {
  title: string;
  paragraphs: string[];
  suits: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaLinkText: string;
  ctaHref: string;
  color: string;
  btnColor: string;
};

const MODAL_CONTENT: Record<string, ModalData> = {
  "Direct Cremation": {
    title: "What is a direct cremation?",
    paragraphs: [
      "Direct cremation is the simplest and most affordable type of funeral. Your loved one is collected, cared for, and cremated — without a formal funeral service beforehand. The ashes are then returned to you, usually within a few days to a couple of weeks.",
      "There's no coffin parade, no chapel booking, no set time you have to be somewhere. Just a quiet, dignified process — and then the ashes, which you can do anything with. Scatter them somewhere meaningful, keep them at home, have them made into something lasting. That part is entirely yours.",
    ],
    suits: "want to keep things simple, are managing costs carefully, or plan to hold a separate gathering when the time feels right.",
    ctaTitle: "Think direct cremation is right for you?",
    ctaSubtitle: "Compare thousands of the UK's best direct cremation providers",
    ctaLinkText: "Search for direct cremation near you",
    ctaHref: "/search?type=direct-cremation",
    color: LAV,
    btnColor: LAV_BTN,
  },
  "Direct Burial": {
    title: "What is a direct burial?",
    paragraphs: [
      "Direct burial follows the same idea as direct cremation — your loved one is buried without a formal funeral service taking place first. The burial itself is carried out quietly, without a ceremony at the graveside or chapel.",
      "It's less common than direct cremation and not offered by every provider, but for families with strong cultural or religious reasons to bury rather than cremate — or those who simply want a resting place — it offers a simpler, lower-cost route than a traditional burial.",
    ],
    suits: "have faith or cultural reasons to bury, want a permanent place to visit, but don't want or need a formal ceremony.",
    ctaTitle: "Think direct burial is right for you?",
    ctaSubtitle: "Compare thousands of the UK's best direct funeral providers",
    ctaLinkText: "Search for direct funeral near you",
    ctaHref: "/search?type=direct-burial",
    color: PINK,
    btnColor: PINK_BTN,
  },
  "Traditional Cremation": {
    title: "What is a traditional cremation?",
    paragraphs: [
      "A traditional cremation is what most people picture when they think of a funeral. There's a service — usually held at a crematorium chapel, a church, or another venue — where family and friends gather to say goodbye. The cremation takes place after the service, and the ashes are returned to the family.",
      "It follows a familiar shape: a hearse, a coffin, a gathering, words spoken, music played. That structure exists for a reason — it gives people somewhere to be and something to do at a moment when everything feels unmoored.",
    ],
    suits: "want a proper gathering, a moment to mark the death together, and the flexibility to personalise how it feels.",
    ctaTitle: "Think traditional cremation is right for you?",
    ctaSubtitle: "Compare thousands of the UK's best traditional cremation providers",
    ctaLinkText: "Search for traditional cremation near you",
    ctaHref: "/search?type=traditional-cremation",
    color: MINT,
    btnColor: MINT_BTN,
  },
  "Traditional Burial": {
    title: "What is a traditional burial?",
    paragraphs: [
      "A traditional burial is the oldest and most recognisable form of funeral. There's a service — at a church, crematorium chapel, or other venue — followed by burial in a cemetery or churchyard. The coffin is lowered into the ground, often with family present.",
      "For many families it's what feels right without needing to explain why. The permanence of a burial, a place to return to, a headstone to visit — these things matter in ways that are hard to put into words.",
    ],
    suits: "want a permanent resting place, find meaning in ritual and ceremony, or have faith or cultural traditions that centre on burial.",
    ctaTitle: "Think traditional burial is right for you?",
    ctaSubtitle: "Compare thousands of the UK's best traditional burial providers",
    ctaLinkText: "Search for traditional burial options near you",
    ctaHref: "/search?type=traditional-burial",
    color: YEL,
    btnColor: "#8A7A00",
  },
};

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

const RESOURCES = [
  { title: "What To Do When Someone Dies",                         tag: "Guide",     href: "/guides/what-to-do-when-someone-dies",      color: MINT },
  { title: "What to Do If You Cannot Afford a Funeral",           tag: "Guide",     href: "/guides/cannot-afford-a-funeral",            color: LAV  },
  { title: "Understanding Funeral Costs",                         tag: "Guide",     href: "/guides/understanding-funeral-costs",        color: PINK },
  { title: "Understanding 'Next of Kin'",                         tag: "Explainer", href: "/guides/understanding-next-of-kin",          color: YEL  },
  { title: "Lasting Power of Attorney",                           tag: "Guide",     href: "/guides/lasting-power-of-attorney",          color: LAV  },
  { title: "A Complete Guide to Planning a Meaningful Funeral",   tag: "Guide",     href: "/guides/planning-a-meaningful-funeral",      color: MINT },
];

/* ─────────────────────── PAGE ───────────────────────────────── */

export default function Home() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const modal = openModal ? MODAL_CONTENT[openModal] : null;

  return (
    <div style={{ fontFamily: OS, background: "#FFFFFF", color: DARK }}>

      {/* ══════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: LAV }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24 text-center">

          <div className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-wide"
            style={{ background: "rgba(255,255,255,0.55)", color: LAV_BTN }}>
            <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
            UK&apos;s verified funeral marketplace
          </div>

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

          <div
            className="rounded-2xl mx-auto w-full"
            style={{
              maxWidth: "840px",
              background: "#FFFFFF",
              boxShadow: "0 8px 40px rgba(100,100,200,0.16)",
              padding: "10px 12px",
            }}
          >
            <HomeSearchBar />
          </div>

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
          2. TRUST BAR
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
          3. WHY VALE
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-10" style={{ background: MINT }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              style={{ fontFamily: OS, fontWeight: 700, fontSize: "clamp(24px,3.5vw,36px)", color: DARK, marginBottom: "12px" }}
            >
              Why families choose Vale
            </h2>
            <p style={{ fontSize: "16px", color: MED, maxWidth: "520px", margin: "0 auto" }}>
              Planning a funeral is one of the hardest things you&apos;ll do. We think finding the right person to help shouldn&apos;t be.
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
          4. COST GUIDE PREVIEW
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
                style={{ background: color }}
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
          5. STATS STRIP
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
          6. SEARCH BY CATEGORY
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-10" style={{ background: "#FAFAFA", borderTop: `1px solid ${BDR}`, borderBottom: `1px solid ${BDR}` }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              style={{ fontFamily: OS, fontWeight: 700, fontSize: "clamp(24px,3.5vw,36px)", color: DARK, marginBottom: "12px" }}
            >
              Search by category
            </h2>
            <p style={{ fontSize: "16px", color: MED, maxWidth: "440px", margin: "0 auto" }}>
              Not sure where to start? Choose the type of funeral that best fits your needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SEARCH_CATS.map(({ label, color, btnColor, desc }) => (
              <button
                key={label}
                onClick={() => setOpenModal(label)}
                className="group flex flex-col rounded-2xl text-left cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
                style={{ background: color, border: "none", padding: 0 }}
              >
                {/* Main content */}
                <div className="flex flex-col flex-1 p-7 pb-5">
                  <h3
                    className="mb-3"
                    style={{ fontFamily: OS, fontWeight: 700, fontSize: "18px", color: DARK, lineHeight: 1.25 }}
                  >
                    {label}
                  </h3>
                  <p
                    style={{ fontSize: "13px", color: MED, lineHeight: 1.6 }}
                  >
                    {desc}
                  </p>
                </div>

                {/* Info strip */}
                <div
                  className="flex items-center gap-1.5 px-7 py-3"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.08)", background: "rgba(255,255,255,0.35)" }}
                >
                  <Info className="w-3.5 h-3.5 shrink-0" style={{ color: btnColor }} aria-hidden="true" />
                  <span className="text-xs font-semibold" style={{ color: btnColor }}>
                    What is {label.toLowerCase()}?
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. TESTIMONIALS
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
          8. ADVISOR SECTION
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-16 md:py-20 px-6 md:px-10"
        style={{ background: "#FFFFFF", borderTop: `1px solid ${BDR}`, borderBottom: `1px solid ${BDR}` }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
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
                Our advisors are trained bereavement professionals. They&apos;re here to help
                you understand your options, compare providers and navigate next steps —
                not to push you toward a decision.
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
          9. RESOURCES HUB
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
              href="/guides"
              className="inline-flex items-center gap-1.5 text-sm font-semibold self-end hover:opacity-75 transition-opacity"
              style={{ fontFamily: OS, color: LAV_BTN }}
            >
              View all guides <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESOURCES.map(({ title, tag, href, color }) => (
              <Link
                key={title}
                href={href}
                className="group flex flex-col rounded-2xl p-5 hover:shadow-lg transition-shadow duration-200"
                style={{ background: color }}
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
          10. FOR FUNERAL DIRECTORS
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-10" style={{ background: LAV }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
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
          CATEGORY MODAL
      ══════════════════════════════════════════════════════ */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(26,26,46,0.55)", backdropFilter: "blur(2px)" }}
          onClick={() => setOpenModal(null)}
        >
          <div
            className="relative w-full overflow-y-auto rounded-2xl"
            style={{
              maxWidth: "540px",
              maxHeight: "90vh",
              background: "#FFFFFF",
              boxShadow: "0 24px 80px rgba(26,26,46,0.28)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4" style={{ borderBottom: `1px solid ${BDR}` }}>
              <div className="flex items-center gap-2.5">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "#3B82F6" }}
                >
                  <Info className="w-3.5 h-3.5" style={{ color: "#FFFFFF" }} aria-hidden="true" />
                </div>
                <span style={{ fontFamily: OS, fontWeight: 700, fontSize: "15px", color: DARK }}>
                  {modal.title}
                </span>
              </div>
              <button
                onClick={() => setOpenModal(null)}
                className="rounded-full p-1.5 hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" style={{ color: LITE }} />
              </button>
            </div>

            {/* Video placeholder */}
            <div className="mx-5 mt-5 rounded-xl overflow-hidden" style={{ background: DARK, aspectRatio: "16/9", position: "relative" }}>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "#FF0000", boxShadow: "0 4px 20px rgba(255,0,0,0.4)" }}
                >
                  <Play className="w-6 h-6 fill-current" style={{ color: "#FFFFFF", marginLeft: "3px" }} aria-hidden="true" />
                </div>
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>Video coming soon</span>
              </div>
              <div
                className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded px-2 py-1"
                style={{ background: "rgba(0,0,0,0.6)" }}
              >
                <span style={{ fontSize: "11px", color: "#FFFFFF", fontWeight: 600 }}>Watch on</span>
                <span style={{ fontSize: "11px", color: "#FF0000", fontWeight: 700 }}>YouTube</span>
              </div>
            </div>

            {/* Body copy */}
            <div className="px-6 pt-5 space-y-3">
              {modal.paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: "14px", color: MED, lineHeight: 1.7 }}>{p}</p>
              ))}
              <p style={{ fontSize: "14px", color: MED, lineHeight: 1.7 }}>
                <span style={{ fontWeight: 700, color: DARK }}>It suits families who... </span>
                {modal.suits}
              </p>
            </div>

            {/* CTA box */}
            <div className="px-5 pb-5 pt-4">
              <div
                className="rounded-xl p-4"
                style={{ background: modal.color }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(255,255,255,0.7)" }}
                  >
                    <Search className="w-4 h-4" style={{ color: modal.btnColor }} aria-hidden="true" />
                  </div>
                  <div>
                    <div style={{ fontFamily: OS, fontWeight: 700, fontSize: "14px", color: DARK, marginBottom: "3px" }}>
                      {modal.ctaTitle}
                    </div>
                    <div style={{ fontSize: "12px", color: MED, marginBottom: "8px" }}>
                      {modal.ctaSubtitle}
                    </div>
                    <Link
                      href={modal.ctaHref}
                      className="inline-flex items-center gap-1 text-sm font-bold hover:opacity-75 transition-opacity"
                      style={{ color: modal.btnColor }}
                      onClick={() => setOpenModal(null)}
                    >
                      {modal.ctaLinkText}
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
