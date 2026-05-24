"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Users, BarChart2, Star, Shield, TrendingUp, ChevronDown,
  ChevronUp, CheckCircle, Award, MessageSquare, Eye, Zap,
  Search, Phone, MapPin,
} from "lucide-react";

/* ─── Design tokens ─────────────────────────────────────────────── */
const OS       = "var(--font-open-sans), sans-serif";
const DARK     = "#1A1A2E";
const MED      = "#5C5C7A";
const LITE     = "#9090A8";
const BDR      = "#E8E8F4";
const LAV      = "#D2D3FC";
const LAV_BTN  = "#6B6DE8";
const MINT     = "#D3FCD2";
const MINT_BTN = "#3AA838";
const YEL      = "#FCFBD2";
const PINK     = "#FBD2FC";
const PINK_BTN = "#C45EC4";

/* ─── Data ──────────────────────────────────────────────────────── */
const STATS = [
  { value: "24,000+", label: "Family searches every month" },
  { value: "Free",    label: "To list — no monthly fee" },
  { value: "4.9★",   label: "Average verified FD rating" },
  { value: "100%",   label: "CMA-compliant pricing" },
];

const MARKETING_BENEFITS = [
  {
    icon: Users,
    title: "Reach families actively searching",
    body: "Vale families have already decided they need a funeral director. They arrive on your profile informed and ready — no cold traffic, no tyre-kickers.",
  },
  {
    icon: Zap,
    title: "Free to list, forever",
    body: "Creating a profile, publishing your prices and collecting reviews costs nothing. We only earn when a family chooses you — fully aligned incentives.",
  },
  {
    icon: Star,
    title: "Verified family reviews",
    body: "Every review on Vale is tied to a real arrangement. Families trust your ratings because they know they can't be gamed. Your reputation becomes your strongest sales tool.",
  },
  {
    icon: TrendingUp,
    title: "Higher enquiry-to-booking rate",
    body: "Because families compare your prices and reviews before contacting you, the enquiries you receive are far more likely to convert. Less time quoting, more time serving.",
  },
];

const OTHER_BENEFITS = [
  {
    icon: Shield,
    title: "CMA-compliant by default",
    body: "Vale's price display meets CMA funeral market requirements out of the box. No compliance headaches — we handle the formatting so you don't have to.",
  },
  {
    icon: BarChart2,
    title: "Market benchmarking",
    body: "See how your pricing compares to local providers. Understand where you sit in the market and make informed decisions about your service offering.",
  },
  {
    icon: Eye,
    title: "Full profile control",
    body: "Update your prices, photos, team bios and opening hours at any time. Changes go live immediately — no waiting for an account manager to action them.",
  },
  {
    icon: MessageSquare,
    title: "Direct family contact",
    body: "Enquiries come straight to you — no middlemen, no call-centre routing. Families get your direct number and email on your profile.",
  },
];

const PRESS = [
  "The Guardian", "BBC", "The Times", "Daily Telegraph", "Forbes", "Cosmopolitan Standard",
];

const TESTIMONIALS = [
  {
    name: "James Hargreaves",
    role: "Director, Grace & Powell Funeral Directors",
    location: "London",
    body: "Since listing on Vale our enquiry volume has increased by over 40%. The families who contact us have already read our reviews and seen our pricing — they arrive ready to make a decision. It has transformed how we work.",
    rating: 5,
    color: LAV,
  },
  {
    name: "Sarah Mitchell",
    role: "Owner, Willowbrook Funeral Services",
    location: "Manchester",
    body: "Vale has levelled the playing field between independent directors like us and the national chains. Our reviews are front and centre, and that's what families genuinely care about. We've never had more meaningful enquiries.",
    rating: 5,
    color: MINT,
  },
  {
    name: "David Keane",
    role: "Principal, Ashbrook & Sons",
    location: "Birmingham",
    body: "The dashboard benchmarking is something I didn't know I needed. Seeing exactly how our pricing compares to the local area has helped us make much more confident decisions. The verified review system is also a genuine differentiator.",
    rating: 5,
    color: YEL,
  },
];

const FAQS = [
  {
    q: "Is it really free to list my funeral home on Vale?",
    a: "Yes — listing your business, publishing your full price list and collecting verified family reviews is completely free, with no monthly subscription. Vale earns a small commission only when a family arranges with you after contacting you through the platform. If you do not receive a booking, you pay nothing.",
  },
  {
    q: "How does Vale verify our pricing?",
    a: "When you set up your profile you enter your prices directly. Vale formats and displays them in a CMA-compliant layout. We carry out periodic spot-checks and use family feedback to flag any discrepancies. All prices are shown inclusive of VAT with no hidden extras.",
  },
  {
    q: "What is Vale Assured and how do I qualify?",
    a: "Vale Assured is our premium verification tier. To qualify, your business must pass a background and licensing check, maintain a verified average rating of 4.5 or above, display full CMA-compliant pricing, and complete Vale's quality audit. Assured businesses receive a gold badge, priority placement in search results and a reduced commission rate.",
  },
  {
    q: "How are family reviews collected and verified?",
    a: "Vale contacts families at a respectful interval after their arrangement completes. Only families who arranged a funeral through a Vale enquiry can leave a review for that director. This ensures every review is genuine and tied to a real bereavement — something families can trust absolutely.",
  },
  {
    q: "Can I update my profile, prices and availability at any time?",
    a: "Yes. You have full control over your profile at all times through your Vale dashboard. Price changes, new photos, team bios, opening hours and service updates all go live immediately without needing to contact us.",
  },
  {
    q: "How are listings ranked in search results?",
    a: "By default, search results are ranked by relevance — a combination of verified rating, number of reviews, profile completeness and geographic proximity. Families can sort by price, rating or proximity at any time. Vale Assured businesses receive a prominence boost in default search.",
  },
  {
    q: "What commission does Vale charge?",
    a: "Vale's standard commission is 3.5% of the total arrangement value, charged only when a booking is confirmed. Vale Assured members receive a reduced rate of 2%. There are no upfront fees, no monthly charges and no minimum spend.",
  },
];

/* ─── Sub-components ────────────────────────────────────────────── */
function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: MINT_BTN }} />
      <span className="text-sm" style={{ color: MED }}>{children}</span>
    </li>
  );
}

function StarRow({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="w-4 h-4" style={{ color: "#E26B5E", fill: "#E26B5E" }} />
      ))}
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${BDR}` }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left focus:outline-none"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold" style={{ fontFamily: OS, color: DARK }}>{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 shrink-0" style={{ color: LAV_BTN }} />
          : <ChevronDown className="w-4 h-4 shrink-0" style={{ color: LITE }} />}
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed" style={{ color: MED }}>{a}</p>
      )}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function ForFuneralDirectors() {
  const [tab, setTab] = useState<"business" | "families">("business");

  const activeFeatures = tab === "business" ? MARKETING_BENEFITS : OTHER_BENEFITS;

  return (
    <div style={{ background: "#FFFFFF" }}>

      {/* ══════════════════════════════════════════════════════
          1. HERO — lavender-left × mint-right diagonal gradient
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden px-6 md:px-10 pt-20 pb-28 md:pt-24 md:pb-36"
        style={{
          background: "#F8F9FF",
          backgroundImage: [
            "radial-gradient(ellipse at 10% 0%, rgba(180,182,246,0.85) 0%, transparent 55%)",
            "radial-gradient(ellipse at 90% 0%, rgba(196,245,196,0.75) 0%, transparent 55%)",
          ].join(", "),
        }}
      >
        {/* Dot texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(107,109,232,0.1) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Trust pill */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
            style={{ background: "white", border: `1px solid ${BDR}`, color: MINT_BTN, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
          >
            <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: MINT_BTN }} />
            2,400+ family enquiries last month — and growing
          </div>

          <h1
            className="mb-5 max-w-3xl mx-auto"
            style={{
              fontFamily:    OS,
              fontSize:      "clamp(32px, 5vw, 62px)",
              fontWeight:    800,
              lineHeight:    1.06,
              letterSpacing: "-0.025em",
              color:         DARK,
            }}
          >
            The UK&apos;s most trusted funeral director discovery platform
          </h1>

          <p
            className="text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: MED }}
          >
            Partner with Vale to reach thousands of families searching for a
            funeral director near them — with fully transparent pricing, verified
            family reviews, and no pressure sales tactics.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/admin/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white transition-all hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B6DE8]"
              style={{ background: LAV_BTN }}
            >
              List your business — it&apos;s free
            </Link>
            <Link
              href="mailto:hello@vale.co.uk"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B6DE8]"
              style={{ background: "white", border: `1.5px solid ${BDR}`, color: DARK }}
            >
              Book a call
            </Link>
          </div>

          <p className="mt-4 text-xs" style={{ color: LITE }}>
            No contract · No monthly fee · 3.5% commission on confirmed bookings only
          </p>

          {/* Dashboard preview mockup */}
          <div
            className="mt-16 rounded-2xl overflow-hidden mx-auto max-w-3xl"
            style={{
              border: `1px solid ${BDR}`,
              boxShadow: "0 20px 60px rgba(107,109,232,0.18)",
              background: "white",
            }}
          >
            {/* Mockup header bar */}
            <div
              className="flex items-center gap-2 px-5 py-3.5"
              style={{ background: DARK, borderBottom: `1px solid rgba(255,255,255,0.08)` }}
            >
              <div className="flex gap-1.5">
                {["#E26B5E","#F5C842","#3AA838"].map((c) => (
                  <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <div
                className="flex-1 mx-4 rounded-full px-3 py-1 text-xs text-center"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
              >
                dashboard.vale.co.uk
              </div>
            </div>
            {/* Mockup body */}
            <div className="p-6 grid grid-cols-3 gap-4">
              {[
                { label: "Profile views", value: "1,284", up: "+12%", color: LAV },
                { label: "Quote requests", value: "47",    up: "+8%",  color: MINT },
                { label: "Conversion rate", value: "34%",  up: "+5%",  color: YEL },
              ].map(({ label, value, up, color }) => (
                <div key={label} className="rounded-xl p-4" style={{ background: color }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide mb-1.5" style={{ color: MED }}>{label}</p>
                  <p className="text-2xl font-bold" style={{ color: DARK, fontFamily: OS }}>{value}</p>
                  <p className="text-[11px] font-semibold mt-0.5" style={{ color: MINT_BTN }}>{up} this week</p>
                </div>
              ))}
              {/* Fake chart */}
              <div className="col-span-3 rounded-xl p-4" style={{ background: "#F4F4FD", border: `1px solid ${BDR}` }}>
                <p className="text-xs font-bold mb-3" style={{ color: MED }}>Enquiry trend — last 8 weeks</p>
                <div className="flex items-end gap-1.5 h-14">
                  {[30,45,38,60,52,74,68,90].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm transition-all"
                      style={{ height: `${h}%`, background: i === 7 ? LAV_BTN : LAV }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. STATS STRIP — dark background
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: DARK }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div
                className="mb-1"
                style={{
                  fontFamily:    OS,
                  fontSize:      "clamp(28px, 3.5vw, 40px)",
                  fontWeight:    800,
                  color:         "#FFFFFF",
                  letterSpacing: "-0.02em",
                }}
              >
                {value}
              </div>
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. "VALE CAN HELP YOU..." — centred heading break
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 text-center" style={{ background: "#FFFFFF" }}>
        <h2
          style={{
            fontFamily:    OS,
            fontSize:      "clamp(28px, 4vw, 48px)",
            fontWeight:    800,
            color:         DARK,
            letterSpacing: "-0.02em",
          }}
        >
          Vale can help you…
        </h2>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. TRANSPARENCY EXPERTS — two-col with tabs
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 px-6 md:px-10"
        style={{ background: LAV }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Left — copy */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="inline-block w-5 h-px" style={{ background: LAV_BTN }} aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: LAV_BTN }}>
                Why Vale
              </span>
            </div>
            <h2
              className="mb-5"
              style={{
                fontFamily:    OS,
                fontSize:      "clamp(26px, 3.5vw, 42px)",
                fontWeight:    800,
                lineHeight:    1.1,
                letterSpacing: "-0.02em",
                color:         DARK,
              }}
            >
              We&apos;re transparency experts, so you don&apos;t have to be.
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: MED }}>
              With more families finding care online than ever before, Vale is uniquely
              positioned to help providers increase their online visibility and attract
              more informed, high-intent customers.
            </p>

            {/* Tab switcher */}
            <div
              className="inline-flex items-center gap-1 p-1 rounded-full mb-8"
              style={{ background: "rgba(107,109,232,0.12)" }}
            >
              {(["business", "families"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-5 py-2 rounded-full text-sm font-bold transition-all focus:outline-none"
                  style={
                    tab === t
                      ? { background: LAV_BTN, color: "white" }
                      : { color: MED }
                  }
                >
                  {t === "business" ? "For your business" : "For families"}
                </button>
              ))}
            </div>

            <ul className="space-y-3">
              {[
                "Reach 24,000+ families searching every month",
                "CMA-compliant pricing — zero extra work",
                "Verified reviews that families genuinely trust",
                "Direct enquiries — no call-centre intermediary",
                "Cancel any time — no lock-in contract",
              ].map((item) => <Check key={item}>{item}</Check>)}
            </ul>
          </div>

          {/* Right — feature cards */}
          <div className="grid grid-cols-1 gap-4">
            {activeFeatures.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-2xl px-6 py-5"
                style={{ background: "white", border: `1px solid ${BDR}` }}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                  style={{ background: LAV }}
                >
                  <Icon className="w-5 h-5" style={{ color: LAV_BTN }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1.5" style={{ fontFamily: OS, color: DARK }}>
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: MED }}>{body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. "YOU'LL BE IN GOOD COMPANY" — accreditation logos
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2
            className="mb-3"
            style={{ fontFamily: OS, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: DARK }}
          >
            You&apos;ll be in good company
          </h2>
          <p className="text-sm mb-10" style={{ color: MED }}>
            Vale works with directors accredited by the UK&apos;s leading funeral industry bodies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { name: "NAFD",  full: "National Association of Funeral Directors", color: LAV },
              { name: "SAIF",  full: "Society of Allied and Independent Funeral Directors", color: MINT },
              { name: "BIFD",  full: "British Institute of Funeral Directors", color: YEL },
              { name: "ICCM",  full: "Institute of Cemetery & Crematorium Management", color: PINK },
            ].map(({ name, color }) => (
              <div
                key={name}
                className="px-6 py-4 rounded-2xl flex items-center justify-center font-bold text-sm"
                style={{ background: color, color: DARK, minWidth: "100px" }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. VALE PARTNER DASHBOARD — 3 feature columns
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: DARK }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="mb-3"
              style={{
                fontFamily:    OS,
                fontSize:      "clamp(26px, 3.5vw, 42px)",
                fontWeight:    800,
                color:         "#FFFFFF",
                letterSpacing: "-0.02em",
              }}
            >
              Meet your Vale Partner Dashboard
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
              A secure portal giving funeral directors live enquiries and a window into
              their marketing performance — all in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: MapPin,
                color: LAV,
                title: "Manage Your Profile",
                body: "Update your pricing, photos, team bios, opening hours and service list at any time. Changes go live instantly — complete control, always.",
              },
              {
                icon: MessageSquare,
                color: MINT,
                title: "View Quote Requests",
                body: "See every family enquiry in real time. Contact details, service type, preferred date and budget — everything you need to respond quickly and win the booking.",
              },
              {
                icon: BarChart2,
                color: YEL,
                title: "Monitor Your Performance",
                body: "Track profile views, enquiry volume and conversion rates week by week. Benchmark your pricing against local competitors and act on real data.",
              },
            ].map(({ icon: Icon, color, title, body }) => (
              <div
                key={title}
                className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: color }}
                >
                  <Icon className="w-5 h-5" style={{ color: DARK }} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-base mb-2.5" style={{ fontFamily: OS, color: "#FFFFFF" }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{body}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/admin/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white transition-all hover:scale-[1.03] active:scale-[0.98] focus:outline-none"
              style={{ background: LAV_BTN }}
            >
              Access your dashboard — it&apos;s free
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. PRESS LOGOS
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 px-6" style={{ background: "#FAFAFA", borderBottom: `1px solid ${BDR}` }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-[0.18em] mb-8" style={{ color: LITE }}>
            As seen in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {PRESS.map((name) => (
              <span
                key={name}
                className="text-base font-bold"
                style={{ color: "#C0C0D0", fontFamily: "Georgia, serif", letterSpacing: "-0.01em" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. PRICING — two cards
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="mb-3"
              style={{
                fontFamily:    OS,
                fontSize:      "clamp(26px, 3.5vw, 42px)",
                fontWeight:    800,
                color:         DARK,
                letterSpacing: "-0.02em",
              }}
            >
              Vale&apos;s pricing model
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: MED }}>
              Simple, fair and fully aligned with your success.
              You only pay when Vale delivers a result.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Free listing */}
            <div
              className="rounded-2xl p-8"
              style={{ background: "#F4F4FD", border: `1.5px solid ${BDR}` }}
            >
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                style={{ background: LAV, color: LAV_BTN }}
              >
                Standard Listing
              </div>
              <h3
                className="mb-1"
                style={{ fontFamily: OS, fontSize: "28px", fontWeight: 800, color: DARK }}
              >
                Free
              </h3>
              <p className="text-sm mb-6" style={{ color: MED }}>
                + 3.5% commission on confirmed bookings only
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Full public profile with photos and team bios",
                  "CMA-compliant pricing display",
                  "Verified family reviews",
                  "Direct enquiry inbox",
                  "Basic analytics dashboard",
                  "Listed in search results by relevance",
                ].map((item) => <Check key={item}>{item}</Check>)}
              </ul>
              <Link
                href="/admin/signup"
                className="block text-center px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98] focus:outline-none"
                style={{ background: LAV_BTN, color: "white" }}
              >
                Get started — it&apos;s free
              </Link>
            </div>

            {/* Vale Assured */}
            <div
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background: DARK, border: `1.5px solid rgba(107,109,232,0.4)` }}
            >
              <div
                className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(196,94,196,0.2) 0%, transparent 70%)" }}
                aria-hidden="true"
              />
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4"
                style={{ background: PINK, color: PINK_BTN }}
              >
                <Award className="w-3 h-3" />
                Vale Assured
              </div>
              <h3
                className="mb-1"
                style={{ fontFamily: OS, fontSize: "28px", fontWeight: 800, color: "#FFFFFF" }}
              >
                £79
                <span className="text-base font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>/month</span>
              </h3>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                + 2% commission (reduced from 3.5%)
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Standard, plus:",
                  "Gold Assured badge on your profile",
                  "Priority placement in all search results",
                  "Dedicated Vale account manager",
                  "Advanced analytics with competitor benchmarking",
                  "Quarterly Vale quality audit & certificate",
                ].map((item, i) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: i === 0 ? "transparent" : MINT_BTN }}
                    />
                    <span
                      className={`text-sm ${i === 0 ? "font-bold" : ""}`}
                      style={{ color: i === 0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.8)" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="mailto:hello@vale.co.uk?subject=Vale Assured enquiry"
                className="block text-center px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98] focus:outline-none"
                style={{ background: LAV_BTN, color: "white" }}
              >
                Apply for Vale Assured
              </Link>
            </div>
          </div>

          {/* Pricing CTA strip */}
          <div
            className="rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ background: MINT, border: `1px solid ${BDR}` }}
          >
            <div>
              <p className="font-bold text-base mb-1" style={{ fontFamily: OS, color: DARK }}>
                Ready to see a demo of everything Vale has to offer?
              </p>
              <p className="text-sm" style={{ color: MED }}>
                Get in touch and a member of our team will walk you through the platform.
              </p>
            </div>
            <Link
              href="mailto:hello@vale.co.uk?subject=Vale demo request"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-[1.03] focus:outline-none"
              style={{ background: DARK }}
            >
              Request a demo
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. TESTIMONIALS — "Don't just take our word for it"
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: LAV }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="mb-3"
              style={{
                fontFamily:    OS,
                fontSize:      "clamp(26px, 3.5vw, 42px)",
                fontWeight:    800,
                color:         DARK,
                letterSpacing: "-0.02em",
              }}
            >
              Don&apos;t just take our word for it
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: MED }}>
              Hear from funeral directors already growing their business on Vale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ name, role, location, body, rating, color }) => (
              <div
                key={name}
                className="rounded-2xl p-6 flex flex-col"
                style={{ background: "white", border: `1px solid ${BDR}` }}
              >
                <StarRow n={rating} />
                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: MED }}>
                  &ldquo;{body}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                    style={{ background: color, color: DARK }}
                  >
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: DARK }}>{name}</p>
                    <p className="text-xs" style={{ color: LITE }}>{role}</p>
                    <p className="text-xs flex items-center gap-1" style={{ color: LITE }}>
                      <MapPin className="w-3 h-3" aria-hidden="true" />
                      {location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          10. FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="mb-3"
              style={{
                fontFamily:    OS,
                fontSize:      "clamp(24px, 3vw, 38px)",
                fontWeight:    800,
                color:         DARK,
                letterSpacing: "-0.02em",
              }}
            >
              Frequently asked questions
            </h2>
            <p className="text-base" style={{ color: MED }}>
              Everything funeral directors need to know about listing on Vale.
            </p>
          </div>

          <div style={{ border: `1px solid ${BDR}`, borderRadius: "16px", overflow: "hidden" }}>
            <div className="px-6">
              {FAQS.map(({ q, a }) => (
                <FAQItem key={q} q={q} a={a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          11. FINAL CTA — mint + lavender gradient
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-24 md:py-32 px-6 md:px-10"
        style={{
          background: "#F8FDF8",
          backgroundImage: [
            "radial-gradient(ellipse at 0% 100%, rgba(196,245,196,0.7) 0%, transparent 55%)",
            "radial-gradient(ellipse at 100% 0%, rgba(180,182,246,0.7) 0%, transparent 55%)",
          ].join(", "),
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(58,168,56,0.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <h2
            className="mb-4"
            style={{
              fontFamily:    OS,
              fontSize:      "clamp(28px, 4vw, 50px)",
              fontWeight:    800,
              lineHeight:    1.1,
              letterSpacing: "-0.025em",
              color:         DARK,
            }}
          >
            Ready to reach more families than ever before?
          </h2>
          <p className="text-base leading-relaxed mb-10 max-w-lg mx-auto" style={{ color: MED }}>
            Join hundreds of funeral directors who have already listed on Vale.
            Set up your profile in under 10 minutes — no commitment required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/admin/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white transition-all hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B6DE8]"
              style={{ background: LAV_BTN }}
            >
              List your business — it&apos;s free
            </Link>
            <Link
              href="mailto:hello@vale.co.uk"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B6DE8]"
              style={{ background: "white", border: `1.5px solid ${BDR}`, color: DARK }}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              Talk to our team
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {["✓  Free to join", "✓  No hidden fees", "✓  Go live in minutes", "✓  Cancel any time"].map((t) => (
              <span key={t} className="text-xs font-medium" style={{ color: MED }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
