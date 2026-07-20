"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Users, BarChart2, Star, Shield, TrendingUp, ChevronDown,
  ChevronUp, CheckCircle, Award, MessageSquare, Eye, Zap,
  Search, Phone, MapPin, ArrowRight,
} from "lucide-react";

/* ─── Design tokens ─────────────────────────────────────────────── */
const DM       = "var(--font-dm-sans), -apple-system, sans-serif";
const DARK     = "#100B20";
const MED      = "#4A415E";
const LITE     = "#9E96B2";
const BDR      = "#D5D0E4";
const LAV      = "#E3DFFF";
const PURPLE   = "#4F34C4";
const GOLD     = "#F5C541";
const BG_OFF   = "#FDFCFE";
const BG_TINT  = "#F4F2F8";
const EASE     = [0.16, 1, 0.3, 1] as const;

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
  },
  {
    name: "Sarah Mitchell",
    role: "Owner, Willowbrook Funeral Services",
    location: "Manchester",
    body: "Vale has levelled the playing field between independent directors like us and the national chains. Our reviews are front and centre, and that's what families genuinely care about. We've never had more meaningful enquiries.",
    rating: 5,
  },
  {
    name: "David Keane",
    role: "Principal, Ashbrook & Sons",
    location: "Birmingham",
    body: "The dashboard benchmarking is something I didn't know I needed. Seeing exactly how our pricing compares to the local area has helped us make much more confident decisions. The verified review system is also a genuine differentiator.",
    rating: 5,
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
function Check({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <li className="flex items-start gap-2.5">
      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: dark ? GOLD : PURPLE }} />
      <span className="text-sm" style={{ color: dark ? "rgba(255,255,255,0.8)" : MED }}>{children}</span>
    </li>
  );
}

function StarRow({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="w-4 h-4" style={{ color: GOLD, fill: GOLD }} />
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
        <span className="text-sm font-semibold" style={{ fontFamily: DM, color: DARK }}>{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 shrink-0" style={{ color: PURPLE }} />
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
  const reduce = useReducedMotion();

  const activeFeatures = tab === "business" ? MARKETING_BENEFITS : OTHER_BENEFITS;

  function fadeUp(delay: number) {
    return {
      initial: { opacity: 0, y: reduce ? 0 : 20 },
      whileInView: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
      viewport: { once: true, margin: "-80px" },
    };
  }

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };
  const staggerItem = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  return (
    <div style={{ background: "#FFFFFF" }}>

      {/* ══════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-[#A898F4] pt-20 pb-24 md:pt-24 md:pb-28"
        aria-label="For funeral directors"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, #A898F4 0%, #BFAFF9 65%, #F4F0FF 100%)" }}
        />
        <div className="relative z-10 max-w-[1366px] mx-auto px-4 sm:px-[1.7rem]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — copy */}
            <div>
              <motion.p
                className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/30 backdrop-blur-sm px-4 py-1.5 text-[13px] font-[600] text-[#26126E] border border-white/40"
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }}
              >
                2,400+ family enquiries last month — and growing
              </motion.p>
              <motion.h1
                className="text-balance text-[34px] sm:text-[44px] lg:text-[52px] font-[900] leading-[1.08] tracking-[-0.02em] text-[#100B20] mb-6"
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.1, ease: EASE } }}
              >
                The UK&apos;s most trusted funeral director discovery platform
              </motion.h1>
              <motion.p
                className="max-w-xl text-[16px] sm:text-[18px] font-[400] leading-[1.6] text-[#342C46] mb-8"
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.2, ease: EASE } }}
              >
                Partner with Vale to reach thousands of families searching for a funeral director
                near them — with fully transparent pricing, verified family reviews, and no
                pressure sales tactics.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-3 mb-5"
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.3, ease: EASE } }}
              >
                <Link
                  href="/directors/signup"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-7 py-3 rounded-xl bg-[#4F34C4] text-white text-[15px] font-[700] transition-[background-color] duration-200 ease-out hover:bg-[#3B229D] active:bg-[#26126E] group"
                >
                  List your business — it&apos;s free
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="mailto:hello@vale.co.uk"
                  className="inline-flex items-center justify-center min-h-[44px] px-7 py-3 rounded-xl border border-[#100B20]/15 bg-white/40 backdrop-blur-sm text-[15px] font-[600] text-[#26126E] transition-colors duration-200 ease-out hover:bg-white/70 hover:border-[#100B20]/25"
                >
                  Book a call
                </Link>
              </motion.div>
              <motion.p
                className="text-[13px] font-[500] text-[#342C46]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.38 } }}
              >
                No contract · No monthly fee · 3.5% commission on confirmed bookings only
              </motion.p>
            </div>

            {/* Right — dashboard mockup */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: reduce ? 0 : 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
            >
              <div className="rounded-2xl bg-white shadow-[0_24px_60px_rgba(16,11,32,0.18)] border border-white/60 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#EAE7F2] bg-[#FAF9FC]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E3DFFF]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#CFC8FF]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#B5AAFC]" />
                  <span className="ml-3 text-[12px] font-[500] text-[#9E96B2]">dashboard.vale.co.uk</span>
                </div>
                <div className="p-5 md:p-6">
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { k: "Profile views", v: "1,284", d: "+12%" },
                      { k: "Quote requests", v: "47", d: "+8%" },
                      { k: "Conversion rate", v: "34%", d: "+5%" },
                    ].map(({ k, v, d }) => (
                      <div key={k} className="rounded-xl bg-[#FAF9FC] border border-[#EAE7F2] p-3">
                        <div className="text-[10px] font-[600] tracking-[0.04em] uppercase text-[#9E96B2] mb-1.5">{k}</div>
                        <div className="text-[20px] md:text-[22px] font-[900] leading-none text-[#100B20] mb-1">{v}</div>
                        <div className="text-[11px] font-[600] text-[#0A7F49]">{d} this week</div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl bg-[#FAF9FC] border border-[#EAE7F2] p-4">
                    <div className="text-[11px] font-[600] text-[#4A415E] mb-3">Enquiry trend — last 8 weeks</div>
                    <div className="flex items-end gap-1.5 h-24">
                      {[38, 46, 42, 58, 54, 70, 66, 86].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-md"
                          style={{
                            height: `${h}%`,
                            background: i === 7 ? "#4F34C4" : "#CFC8FF",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stat band */}
          <motion.div
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/30 rounded-2xl overflow-hidden border border-white/40 backdrop-blur-sm"
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.45, ease: EASE } }}
          >
            {STATS.map(({ value, label }) => (
              <div key={label} className="bg-white/60 p-5 md:p-6 text-center">
                <div className="text-[26px] md:text-[32px] font-[900] leading-none tracking-[-0.025em] text-[#26126E] mb-2">{value}</div>
                <div className="text-[12px] md:text-[13px] font-[500] leading-[1.4] text-[#342C46]">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. "VALE CAN HELP YOU..." — centred heading break
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 text-center" style={{ background: "#FFFFFF" }}>
        <motion.h2
          style={{
            fontFamily:    DM,
            fontSize:      "clamp(28px, 4vw, 48px)",
            fontWeight:    800,
            color:         DARK,
            letterSpacing: "-0.02em",
          }}
          {...fadeUp(0)}
        >
          Vale can help you…
        </motion.h2>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. TRANSPARENCY EXPERTS — two-col with tabs
      ══════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28 px-6 md:px-10"
        style={{ background: BG_OFF }}
      >
        <div className="max-w-[1366px] mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">

          {/* Left — copy */}
          <motion.div {...fadeUp(0)}>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="inline-block w-5 h-px" style={{ background: PURPLE }} aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: PURPLE }}>
                Why Vale
              </span>
            </div>
            <h2
              className="mb-5"
              style={{
                fontFamily:    DM,
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
              style={{ background: BG_TINT }}
            >
              {(["business", "families"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-5 py-2 rounded-full text-sm font-bold transition-all focus:outline-none"
                  style={
                    tab === t
                      ? { background: PURPLE, color: "white" }
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
          </motion.div>

          {/* Right — feature cards */}
          <motion.div
            className="grid grid-cols-1 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {activeFeatures.map(({ icon: Icon, title, body }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="flex items-start gap-4 rounded-2xl px-6 py-5"
                style={{ background: "white", border: `1px solid ${BDR}` }}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                  style={{ background: LAV }}
                >
                  <Icon className="w-5 h-5" style={{ color: PURPLE }} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1.5" style={{ fontFamily: DM, color: DARK }}>
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: MED }}>{body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. "YOU'LL BE IN GOOD COMPANY" — accreditation logos
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
        <motion.div className="max-w-[1366px] mx-auto text-center" {...fadeUp(0)}>
          <h2
            className="mb-3"
            style={{ fontFamily: DM, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: DARK }}
          >
            You&apos;ll be in good company
          </h2>
          <p className="text-sm mb-10" style={{ color: MED }}>
            Vale works with directors accredited by the UK&apos;s leading funeral industry bodies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {["NAFD", "SAIF", "BIFD", "ICCM"].map((name) => (
              <div
                key={name}
                className="px-6 py-4 rounded-2xl flex items-center justify-center font-bold text-sm"
                style={{ background: BG_TINT, border: `1px solid ${BDR}`, color: MED, minWidth: "100px" }}
              >
                {name}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. VALE PARTNER DASHBOARD — dark, gold accent
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: DARK }}>
        <div className="max-w-[1366px] mx-auto">
          <motion.div className="text-center mb-14" {...fadeUp(0)}>
            <h2
              className="mb-3"
              style={{
                fontFamily:    DM,
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
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {[
              {
                icon: MapPin,
                title: "Manage Your Profile",
                body: "Update your pricing, photos, team bios, opening hours and service list at any time. Changes go live instantly — complete control, always.",
              },
              {
                icon: MessageSquare,
                title: "View Quote Requests",
                body: "See every family enquiry in real time. Contact details, service type, preferred date and budget — everything you need to respond quickly and win the booking.",
              },
              {
                icon: BarChart2,
                title: "Monitor Your Performance",
                body: "Track profile views, enquiry volume and conversion rates week by week. Benchmark your pricing against local competitors and act on real data.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "rgba(245,197,65,0.12)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: GOLD }} aria-hidden="true" />
                </div>
                <h3 className="font-bold text-base mb-2.5" style={{ fontFamily: DM, color: "#FFFFFF" }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{body}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center" {...fadeUp(0.1)}>
            <Link
              href="/directors/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.03] active:scale-[0.98] focus:outline-none"
              style={{ background: GOLD, color: DARK }}
            >
              Access your dashboard — it&apos;s free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          7. PRESS LOGOS
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 px-6" style={{ background: BG_OFF, borderBottom: `1px solid ${BDR}` }}>
        <motion.div className="max-w-[1366px] mx-auto" {...fadeUp(0)}>
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
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          8. PRICING — two cards
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
        <div className="max-w-[1366px] mx-auto">
          <motion.div className="text-center mb-14" {...fadeUp(0)}>
            <h2
              className="mb-3"
              style={{
                fontFamily:    DM,
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
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Free listing */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl p-8"
              style={{ background: "#F4F4FD", border: `1.5px solid ${BDR}` }}
            >
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4"
                style={{ background: LAV, color: PURPLE }}
              >
                Standard Listing
              </div>
              <h3
                className="mb-1"
                style={{ fontFamily: DM, fontSize: "28px", fontWeight: 800, color: DARK }}
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
                href="/directors/signup"
                className="block text-center px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98] focus:outline-none"
                style={{ background: PURPLE, color: "white" }}
              >
                Get started — it&apos;s free
              </Link>
            </motion.div>

            {/* Vale Assured */}
            <motion.div
              variants={staggerItem}
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background: DARK, border: `1.5px solid rgba(79,52,196,0.4)` }}
            >
              <span
                className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: GOLD, color: DARK }}
              >
                <Award className="w-3 h-3" />
                Recommended
              </span>
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4"
                style={{ background: "rgba(245,197,65,0.12)", color: GOLD }}
              >
                Vale Assured
              </div>
              <h3
                className="mb-1"
                style={{ fontFamily: DM, fontSize: "28px", fontWeight: 800, color: "#FFFFFF" }}
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
                      style={{ color: i === 0 ? "transparent" : GOLD }}
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
                style={{ background: GOLD, color: DARK }}
              >
                Apply for Vale Assured
              </Link>
            </motion.div>
          </motion.div>

          {/* Pricing CTA strip */}
          <motion.div
            className="rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ background: BG_TINT, border: `1px solid ${BDR}` }}
            {...fadeUp(0)}
          >
            <div>
              <p className="font-bold text-base mb-1" style={{ fontFamily: DM, color: DARK }}>
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
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          9. TESTIMONIALS — "Don't just take our word for it"
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: BG_OFF }}>
        <div className="max-w-[1366px] mx-auto">
          <motion.div className="text-center mb-14" {...fadeUp(0)}>
            <h2
              className="mb-3"
              style={{
                fontFamily:    DM,
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
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {TESTIMONIALS.map(({ name, role, location, body, rating }) => (
              <motion.div
                key={name}
                variants={staggerItem}
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
                    style={{ background: LAV, color: PURPLE }}
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          10. FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
        <motion.div className="max-w-3xl mx-auto" {...fadeUp(0)}>
          <div className="text-center mb-12">
            <h2
              className="mb-3"
              style={{
                fontFamily:    DM,
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
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          11. FINAL CTA — dark band
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-10" style={{ background: DARK }}>
        <motion.div className="relative max-w-3xl mx-auto text-center" {...fadeUp(0)}>
          <h2
            className="mb-4"
            style={{
              fontFamily:    DM,
              fontSize:      "clamp(28px, 4vw, 50px)",
              fontWeight:    800,
              lineHeight:    1.1,
              letterSpacing: "-0.025em",
              color:         "#FFFFFF",
            }}
          >
            Ready to reach more families than ever before?
          </h2>
          <p className="text-base leading-relaxed mb-10 max-w-lg mx-auto" style={{ color: "#9889F5" }}>
            Join hundreds of funeral directors who have already listed on Vale.
            Set up your profile in under 10 minutes — no commitment required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/directors/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C541]"
              style={{ background: GOLD, color: DARK }}
            >
              List your business — it&apos;s free
            </Link>
            <Link
              href="mailto:hello@vale.co.uk"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9889F5]"
              style={{ background: "transparent", border: `1.5px solid rgba(255,255,255,0.15)`, color: "#CFC8FF" }}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              Talk to our team
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            {["Free to join", "No hidden fees", "Go live in minutes", "Cancel any time"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: "#CFC8FF" }}>
                <CheckCircle className="w-3.5 h-3.5" style={{ color: GOLD }} aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

    </div>
  );
}
