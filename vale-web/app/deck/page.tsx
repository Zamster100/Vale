"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Search, BarChart2, MessageSquare, Phone, Tag, ShieldCheck, Star,
  CheckCircle, ChevronDown, MapPin, ArrowRight,
} from "lucide-react";

/* ─── Design tokens (matches /for-funeral-directors) ───────────────── */
const DM      = "var(--font-dm-sans), -apple-system, sans-serif";
const SERIF   = "var(--font-cormorant), Georgia, serif";
const DARK    = "#100B20";
const MED     = "#4A415E";
const LITE    = "#9E96B2";
const BDR     = "#D5D0E4";
const LAV     = "#E3DFFF";
const PURPLE  = "#4F34C4";
const GOLD    = "#F5C541";
const BG_OFF  = "#FDFCFE";
const BG_TINT = "#F4F2F8";
const EASE    = [0.16, 1, 0.3, 1] as const;

/* ─── Content ────────────────────────────────────────────────────── */
const AGENDA = [
  "The problem families face today",
  "Why now — how families search for a funeral director",
  "What Vale is, and how it works",
  "What it costs (and what it doesn't)",
  "Getting started",
];

const PROBLEM_STATS = [
  { value: "134%", label: "Rise in funeral costs since 2004 — more than double the rate of inflation" },
  { value: "£9,797", label: "Average cost of dying in the UK in 2024 — a record high" },
  { value: "3 yrs", label: "Length of the CMA's investigation into the funeral market" },
  { value: "18%", label: "Of families face genuine financial hardship arranging a funeral" },
];

const WHAT_VALE_IS = [
  { icon: Tag, title: "Real prices upfront", body: "Every provider publishes a full itemised price list, meeting CMA requirements." },
  { icon: ShieldCheck, title: "Independently verified", body: "Not every funeral director makes it onto Vale — each passes verification checks first." },
  { icon: Star, title: "Verified family reviews", body: "Reviews are linked only to confirmed arrangements, so they can't be gamed." },
];

const FAMILY_STEPS = [
  { icon: Search, title: "Search", body: "By need, postcode, faith or budget" },
  { icon: BarChart2, title: "Compare", body: "Real prices, availability and verified reviews" },
  { icon: MessageSquare, title: "Contact", body: "Reach a provider directly" },
  { icon: Phone, title: "Or talk", body: "A free Vale family advisor — no pressure, no sales" },
];

const WORKS_FOR_YOU = [
  "Reach families actively searching every month",
  "Free to list — no monthly fee, no setup cost",
  "CMA-compliant pricing display, zero extra work",
  "Direct enquiries — no call-centre intermediary",
  "Cancel any time — no lock-in contract",
];

const DASHBOARD_TILES = [
  { k: "Profile views", v: "1,284", d: "+12%" },
  { k: "Quote requests", v: "47", d: "+8%" },
  { k: "Conversion rate", v: "34%", d: "+5%" },
];

const DASHBOARD_BULLETS = [
  "Manage your profile — pricing, photos, bios, hours — changes go live instantly",
  "View every quote request in real time, with contact details and preferred date/budget",
  "Monitor performance and benchmark your pricing against local competitors",
];

const PROOF_STATS = [
  { value: "1,200+", label: "Verified providers across the UK" },
  { value: "4.9 / 5", label: "Average family rating" },
  { value: "2,400+", label: "Family enquiries last month" },
  { value: "£1,895", label: "Average saving found by families" },
  { value: "4.2x", label: "More enquiries for Vale Assured vs. Standard" },
];

const TESTIMONIALS = [
  {
    name: "James Hargreaves",
    role: "Director, Grace & Powell Funeral Directors",
    location: "London",
    body: "Since listing on Vale our enquiry volume has increased by over 40%. The families who contact us have already read our reviews and seen our pricing — they arrive ready to make a decision.",
  },
  {
    name: "Sarah Mitchell",
    role: "Owner, Willowbrook Funeral Services",
    location: "Manchester",
    body: "Vale has levelled the playing field between independent directors like us and the national chains. Our reviews are front and centre — that's what families genuinely care about.",
  },
  {
    name: "David Keane",
    role: "Principal, Ashbrook & Sons",
    location: "Birmingham",
    body: "The dashboard benchmarking is something I didn't know I needed. Seeing exactly how our pricing compares to the local area has helped us make much more confident decisions.",
  },
];

const OBJECTIONS = [
  { q: "“Won't this turn us into a price war?”", a: "Reviews carry as much weight as price on Vale — care and reputation consistently outperform being merely cheapest." },
  { q: "“We already get enough referrals.”", a: "Standard is free to try — it's additive to what's already working, not a replacement for it." },
  { q: "“We're not a tech-first team.”", a: "The dashboard is built for non-technical users — profile updates take minutes." },
  { q: "“I need sign-off before committing.”", a: "Completely normal — happy to provide a one-pager or join a follow-up call with whoever needs to be in the room." },
];

const WHY_VALE_POINTS = [
  "No advertising or sponsored placements — reviews can't be bought",
  "Independents ranked on merit and quality of care, not marketing budget",
  "Verification required before any provider can list",
  "Built around CMA transparency standards, not just minimally compliant with them",
];

const GETTING_STARTED = [
  { step: "Today", body: "Decide, and create your login" },
  { step: "This week", body: "Add your price list, photos and team bios, at your own pace" },
  { step: "Go live", body: "Start receiving enquiries" },
];

/* ─── Shared bits ────────────────────────────────────────────────── */
function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className="inline-block w-5 h-px" style={{ background: dark ? GOLD : PURPLE }} aria-hidden="true" />
      <span
        className="text-[11px] font-bold uppercase tracking-[0.18em]"
        style={{ color: dark ? GOLD : PURPLE }}
      >
        {children}
      </span>
    </div>
  );
}

function fadeIn(reduce: boolean | null, delay = 0) {
  return {
    initial: { opacity: 0, y: reduce ? 0 : 22 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: EASE } },
    viewport: { once: false, amount: 0.5 },
  };
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
function staggerItem(reduce: boolean | null): Variants {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };
}

/* ─── Page ──────────────────────────────────────────────────────── */
const SLIDE_COUNT = 15;
// Slide indices with a dark (navy) background — the fixed chrome switches to light text on these.
const DARK_BG_SLIDES = new Set([0, 7, 13, 14]);

export default function DeckPage() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.55) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { root, threshold: [0.55] }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function goTo(index: number) {
    const clamped = Math.max(0, Math.min(SLIDE_COUNT - 1, index));
    sectionRefs.current[clamped]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(active + 1);
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(active - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(SLIDE_COUNT - 1);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  function registerRef(i: number) {
    return (el: HTMLElement | null) => {
      sectionRefs.current[i] = el;
    };
  }

  const chromeOnDark = DARK_BG_SLIDES.has(active);

  return (
    <div style={{ background: DARK }} className="h-dvh w-full overflow-hidden relative">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 sm:px-8 py-4 pointer-events-none">
        <Link
          href="/"
          className="pointer-events-auto inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C541] rounded"
          aria-label="Back to Vale"
        >
          <span
            style={{ fontFamily: SERIF, fontWeight: 600, color: chromeOnDark ? "#FFFFFF" : DARK, transition: "color 0.3s ease" }}
            className="text-xl tracking-wide"
          >
            Vale<span style={{ color: GOLD }}>.</span>
          </span>
        </Link>
        <div className="pointer-events-auto flex items-center gap-4">
          <span
            className="text-[11px] font-semibold tabular-nums"
            style={{ fontFamily: DM, color: chromeOnDark ? "rgba(255,255,255,0.5)" : "rgba(16,11,32,0.45)", transition: "color 0.3s ease" }}
          >
            {String(active + 1).padStart(2, "0")} / {String(SLIDE_COUNT).padStart(2, "0")}
          </span>
          <Link
            href="/"
            className="text-[11px] font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C541] rounded"
            style={{ fontFamily: DM, color: chromeOnDark ? "rgba(255,255,255,0.55)" : "rgba(16,11,32,0.5)", transition: "color 0.3s ease" }}
          >
            Exit
          </Link>
        </div>
      </div>

      {/* Progress dots */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col gap-2.5">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="w-2.5 h-2.5 rounded-full transition-all focus:outline-none"
            style={{
              background: i === active ? GOLD : chromeOnDark ? "rgba(255,255,255,0.25)" : "rgba(16,11,32,0.18)",
              transform: i === active ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* Slide scroller */}
      <div
        ref={containerRef}
        className="h-dvh w-full overflow-y-scroll"
        style={{ scrollSnapType: "y mandatory", scrollBehavior: "smooth" }}
      >
        {/* 1 — Title */}
        <section
          ref={registerRef(0)}
          data-index={0}
          className="h-dvh w-full overflow-y-auto relative flex"
          style={{
            scrollSnapAlign: "start",
            background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(79,52,196,0.35), transparent), #100B20",
          }}
        >
          <motion.div className="text-center max-w-2xl m-auto px-6 py-24" {...fadeIn(reduce)}>
            <p className="text-[12px] font-bold uppercase tracking-[0.22em] mb-6" style={{ fontFamily: DM, color: GOLD }}>
              Partner with Vale
            </p>
            <h1 style={{ fontFamily: SERIF, fontWeight: 600, color: "#FFFFFF" }} className="text-[64px] sm:text-[88px] leading-none mb-6">
              Vale<span style={{ color: GOLD }}>.</span>
            </h1>
            <p className="italic text-[18px] sm:text-[22px] mb-8" style={{ fontFamily: SERIF, color: "#CFC8FF" }}>
              Transparent prices. Genuine choice. Dignity for every family.
            </p>
            <p className="text-[15px]" style={{ fontFamily: DM, color: "rgba(255,255,255,0.55)" }}>
              A partnership conversation for independent funeral directors
            </p>
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={reduce ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5" style={{ color: "rgba(255,255,255,0.4)" }} aria-hidden="true" />
          </motion.div>
        </section>

        {/* 2 — Agenda */}
        <section
          ref={registerRef(1)}
          data-index={1}
          className="h-dvh w-full overflow-y-auto flex"
          style={{ scrollSnapAlign: "start", background: "#FFFFFF" }}
        >
          <motion.div className="max-w-xl w-full m-auto px-6 py-24" {...fadeIn(reduce)}>
            <Eyebrow>What we&apos;ll cover</Eyebrow>
            <h2 className="mb-10" style={{ fontFamily: DM, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, color: DARK, letterSpacing: "-0.02em" }}>
              Five minutes, five things
            </h2>
            <motion.ol className="space-y-5" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }}>
              {AGENDA.map((item, i) => (
                <motion.li key={item} variants={staggerItem(reduce)} className="flex items-start gap-4">
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: LAV, color: PURPLE, fontFamily: DM }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[16px] sm:text-[18px] pt-1" style={{ color: MED }}>{item}</span>
                </motion.li>
              ))}
            </motion.ol>
          </motion.div>
        </section>

        {/* 3 — The problem */}
        <section
          ref={registerRef(2)}
          data-index={2}
          className="h-dvh w-full overflow-y-auto flex"
          style={{ scrollSnapAlign: "start", background: BG_OFF }}
        >
          <motion.div className="max-w-3xl w-full m-auto px-6 py-24" {...fadeIn(reduce)}>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="mb-10" style={{ fontFamily: DM, fontSize: "clamp(24px, 3.4vw, 38px)", fontWeight: 800, color: DARK, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              The funeral market wasn&apos;t built for price transparency
            </h2>
            <motion.div
              className="grid grid-cols-2 gap-4 mb-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              {PROBLEM_STATS.map(({ value, label }) => (
                <motion.div key={value} variants={staggerItem(reduce)} className="rounded-2xl p-5 sm:p-6" style={{ background: "white", border: `1px solid ${BDR}` }}>
                  <div className="mb-2" style={{ fontFamily: DM, fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 900, color: PURPLE }}>{value}</div>
                  <div className="text-[13px] leading-snug" style={{ color: MED }}>{label}</div>
                </motion.div>
              ))}
            </motion.div>
            <p className="text-xs italic" style={{ color: LITE }}>
              Source: Competition and Markets Authority, funeral market investigation; Vale Funeral Price Index.
            </p>
          </motion.div>
        </section>

        {/* 4 — Why now */}
        <section
          ref={registerRef(3)}
          data-index={3}
          className="h-dvh w-full overflow-y-auto flex"
          style={{ scrollSnapAlign: "start", background: "linear-gradient(180deg, #A898F4 0%, #BFAFF9 55%, #F4F0FF 100%)" }}
        >
          <motion.div className="max-w-xl m-auto px-6 py-24 text-center" {...fadeIn(reduce)}>
            <p className="mb-6 text-[13px] font-bold uppercase tracking-[0.2em]" style={{ fontFamily: DM, color: "#26126E" }}>
              Why this matters right now
            </p>
            <div style={{ fontFamily: DM, fontSize: "clamp(56px, 10vw, 96px)", fontWeight: 900, color: "#100B20", lineHeight: 1 }} className="mb-6">
              24,000+
            </div>
            <p className="text-[17px] sm:text-[19px] font-semibold mb-4" style={{ fontFamily: DM, color: "#26126E" }}>
              Family searches on Vale every month
            </p>
            <p className="text-[15px] max-w-md mx-auto" style={{ color: "#342C46" }}>
              Families decide who to call before they pick up the phone. If you&apos;re not visible where that search happens, you&apos;re invisible at exactly the moment someone needs you most.
            </p>
          </motion.div>
        </section>

        {/* 5 — What Vale is */}
        <section
          ref={registerRef(4)}
          data-index={4}
          className="h-dvh w-full overflow-y-auto flex"
          style={{ scrollSnapAlign: "start", background: "#FFFFFF" }}
        >
          <motion.div className="max-w-3xl w-full m-auto px-6 py-24" {...fadeIn(reduce)}>
            <Eyebrow>What Vale is</Eyebrow>
            <h2 className="mb-10" style={{ fontFamily: DM, fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: DARK, letterSpacing: "-0.02em" }}>
              The UK&apos;s verified funeral marketplace
            </h2>
            <motion.div
              className="grid sm:grid-cols-3 gap-5 mb-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              {WHAT_VALE_IS.map(({ icon: Icon, title, body }) => (
                <motion.div key={title} variants={staggerItem(reduce)} className="rounded-2xl p-6" style={{ background: BG_TINT, border: `1px solid ${BDR}` }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: LAV }}>
                    <Icon className="w-5 h-5" style={{ color: PURPLE }} aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ fontFamily: DM, color: DARK }}>{title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: MED }}>{body}</p>
                </motion.div>
              ))}
            </motion.div>
            <p className="italic text-sm" style={{ color: PURPLE, fontFamily: SERIF }}>
              No paid placements, no advertising — the marketplace is not pay-to-play.
            </p>
          </motion.div>
        </section>

        {/* 6 — Family journey */}
        <section
          ref={registerRef(5)}
          data-index={5}
          className="h-dvh w-full overflow-y-auto flex"
          style={{ scrollSnapAlign: "start", background: BG_OFF }}
        >
          <motion.div className="max-w-3xl w-full m-auto px-6 py-24" {...fadeIn(reduce)}>
            <Eyebrow>A family&apos;s journey on Vale</Eyebrow>
            <motion.div
              className="grid sm:grid-cols-4 gap-4 mb-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              {FAMILY_STEPS.map(({ icon: Icon, title, body }) => (
                <motion.div key={title} variants={staggerItem(reduce)}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: LAV }}>
                    <Icon className="w-5 h-5" style={{ color: PURPLE }} aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-sm mb-1.5" style={{ fontFamily: DM, color: DARK }}>{title}</h3>
                  <p className="text-[12px] leading-relaxed" style={{ color: MED }}>{body}</p>
                </motion.div>
              ))}
            </motion.div>
            <div className="rounded-2xl p-6" style={{ background: "white", borderLeft: `3px solid ${GOLD}` }}>
              <p className="italic text-[15px] leading-relaxed mb-3" style={{ fontFamily: SERIF, color: DARK }}>
                &ldquo;I was in the worst week of my life. Vale let me look at real prices at 2am without calling anyone. I found a funeral director we could afford, close to home.&rdquo;
              </p>
              <p className="text-xs font-semibold" style={{ color: LITE }}>— Rachel T., Leeds</p>
            </div>
          </motion.div>
        </section>

        {/* 7 — How Vale works for you */}
        <section
          ref={registerRef(6)}
          data-index={6}
          className="h-dvh w-full overflow-y-auto flex"
          style={{ scrollSnapAlign: "start", background: "#FFFFFF" }}
        >
          <motion.div className="max-w-xl w-full m-auto px-6 py-24" {...fadeIn(reduce)}>
            <Eyebrow>For your business</Eyebrow>
            <h2 className="mb-8" style={{ fontFamily: DM, fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: DARK, letterSpacing: "-0.02em" }}>
              What listing on Vale gets you
            </h2>
            <ul className="space-y-3 mb-8">
              {WORKS_FOR_YOU.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: PURPLE }} aria-hidden="true" />
                  <span className="text-[15px]" style={{ color: MED }}>{item}</span>
                </li>
              ))}
            </ul>
            <div className="inline-block rounded-xl px-5 py-3" style={{ background: GOLD }}>
              <p className="text-sm font-bold" style={{ fontFamily: DM, color: DARK }}>You only pay when Vale delivers a result.</p>
            </div>
          </motion.div>
        </section>

        {/* 8 — Dashboard */}
        <section
          ref={registerRef(7)}
          data-index={7}
          className="h-dvh w-full overflow-y-auto flex"
          style={{ scrollSnapAlign: "start", background: DARK }}
        >
          <motion.div className="max-w-3xl w-full m-auto px-6 py-24" {...fadeIn(reduce)}>
            <Eyebrow dark>Your Vale Partner Dashboard</Eyebrow>
            <h2 className="mb-10" style={{ fontFamily: DM, fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
              See everything, in real time
            </h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              {DASHBOARD_TILES.map(({ k, v, d }) => (
                <motion.div key={k} variants={staggerItem(reduce)} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="text-[10px] font-semibold tracking-[0.04em] uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.45)" }}>{k}</div>
                  <div className="text-[20px] sm:text-[26px] font-[900] leading-none mb-1" style={{ fontFamily: DM, color: "#FFFFFF" }}>{v}</div>
                  <div className="text-[11px] font-semibold" style={{ color: "#7FE0A8" }}>{d} this week</div>
                </motion.div>
              ))}
            </motion.div>
            <ul className="space-y-2.5">
              {DASHBOARD_BULLETS.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: GOLD }} aria-hidden="true" />
                  <span className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* 9 — Proof it works */}
        <section
          ref={registerRef(8)}
          data-index={8}
          className="h-dvh w-full overflow-y-auto flex"
          style={{ scrollSnapAlign: "start", background: "#FFFFFF" }}
        >
          <motion.div className="max-w-4xl w-full m-auto px-6 py-24" {...fadeIn(reduce)}>
            <Eyebrow>Proof it works</Eyebrow>
            <h2 className="mb-10" style={{ fontFamily: DM, fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: DARK, letterSpacing: "-0.02em" }}>
              A live marketplace, not a concept
            </h2>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-5 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              {PROOF_STATS.map(({ value, label }) => (
                <motion.div key={value} variants={staggerItem(reduce)} className="text-center sm:text-left">
                  <div className="mb-1.5" style={{ fontFamily: DM, fontSize: "clamp(22px, 2.6vw, 28px)", fontWeight: 900, color: PURPLE }}>{value}</div>
                  <div className="text-[12px] leading-snug" style={{ color: MED }}>{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* 10 — Testimonials */}
        <section
          ref={registerRef(9)}
          data-index={9}
          className="h-dvh w-full overflow-y-auto flex"
          style={{ scrollSnapAlign: "start", background: BG_OFF }}
        >
          <motion.div className="max-w-4xl w-full m-auto px-6 py-24" {...fadeIn(reduce)}>
            <Eyebrow>What directors say about Vale</Eyebrow>
            <motion.div
              className="grid sm:grid-cols-3 gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.4 }}
            >
              {TESTIMONIALS.map(({ name, role, location, body }) => (
                <motion.div key={name} variants={staggerItem(reduce)} className="rounded-2xl p-5 flex flex-col" style={{ background: "white", border: `1px solid ${BDR}` }}>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5" style={{ color: GOLD, fill: GOLD }} />
                    ))}
                  </div>
                  <p className="text-[12.5px] leading-relaxed flex-1 mb-4" style={{ color: MED }}>&ldquo;{body}&rdquo;</p>
                  <div>
                    <p className="font-bold text-[13px]" style={{ color: DARK }}>{name}</p>
                    <p className="text-[11px]" style={{ color: LITE }}>{role}</p>
                    <p className="text-[11px] flex items-center gap-1" style={{ color: LITE }}>
                      <MapPin className="w-3 h-3" aria-hidden="true" />{location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* 11 — Pricing */}
        <section
          ref={registerRef(10)}
          data-index={10}
          className="h-dvh w-full overflow-y-auto flex"
          style={{ scrollSnapAlign: "start", background: "#FFFFFF" }}
        >
          <motion.div className="max-w-3xl w-full m-auto px-6 py-24" {...fadeIn(reduce)}>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mb-8" style={{ fontFamily: DM, fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, color: DARK, letterSpacing: "-0.02em" }}>
              Vale&apos;s pricing model
            </h2>
            <div className="grid sm:grid-cols-2 gap-5 mb-6">
              <div className="rounded-2xl p-6" style={{ background: BG_TINT, border: `1.5px solid ${BDR}` }}>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ background: LAV, color: PURPLE }}>Standard Listing</div>
                <p className="font-[900] mb-1" style={{ fontFamily: DM, fontSize: "24px", color: DARK }}>Free</p>
                <p className="text-[13px]" style={{ color: MED }}>+ 3.5% commission on confirmed bookings only</p>
              </div>
              <div className="rounded-2xl p-6 relative" style={{ background: DARK, border: "1.5px solid rgba(79,52,196,0.4)" }}>
                <span className="absolute top-5 right-5 px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: GOLD, color: DARK }}>Recommended</span>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3" style={{ background: "rgba(245,197,65,0.12)", color: GOLD }}>Vale Assured</div>
                <p className="font-[900] mb-1" style={{ fontFamily: DM, fontSize: "24px", color: "#FFFFFF" }}>£79<span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>/mo</span></p>
                <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.55)" }}>+ 2% commission (reduced from 3.5%)</p>
              </div>
            </div>
            <p className="text-sm font-semibold" style={{ color: PURPLE }}>No setup fee. No contract. Cancel any time.</p>
          </motion.div>
        </section>

        {/* 12 — Objections */}
        <section
          ref={registerRef(11)}
          data-index={11}
          className="h-dvh w-full overflow-y-auto flex"
          style={{ scrollSnapAlign: "start", background: BG_OFF }}
        >
          <motion.div className="max-w-3xl w-full m-auto px-6 py-24" {...fadeIn(reduce)}>
            <Eyebrow>Questions we hear most</Eyebrow>
            <motion.div
              className="grid sm:grid-cols-2 gap-x-8 gap-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.4 }}
            >
              {OBJECTIONS.map(({ q, a }) => (
                <motion.div key={q} variants={staggerItem(reduce)}>
                  <p className="font-bold text-[14px] mb-1.5" style={{ fontFamily: DM, color: DARK }}>{q}</p>
                  <p className="text-[13.5px] leading-relaxed" style={{ color: MED }}>{a}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* 13 — Why Vale, not just another directory */}
        <section
          ref={registerRef(12)}
          data-index={12}
          className="h-dvh w-full overflow-y-auto flex"
          style={{ scrollSnapAlign: "start", background: "#FFFFFF" }}
        >
          <motion.div className="max-w-2xl w-full m-auto px-6 py-24" {...fadeIn(reduce)}>
            <Eyebrow>Why Vale</Eyebrow>
            <h2 className="mb-10" style={{ fontFamily: DM, fontSize: "clamp(26px, 3.6vw, 42px)", fontWeight: 800, color: DARK, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Built to level the playing field, not tilt it further
            </h2>
            <motion.ul
              className="space-y-5"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              {WHY_VALE_POINTS.map((item) => (
                <motion.li key={item} variants={staggerItem(reduce)} className="text-[16px] sm:text-[18px] leading-relaxed pl-6 relative" style={{ color: MED }}>
                  <span className="absolute left-0 top-[0.55em] w-2.5 h-px" style={{ background: PURPLE }} aria-hidden="true" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </section>

        {/* 14 — Getting started */}
        <section
          ref={registerRef(13)}
          data-index={13}
          className="h-dvh w-full overflow-y-auto flex"
          style={{ scrollSnapAlign: "start", background: DARK }}
        >
          <motion.div className="max-w-2xl w-full m-auto px-6 py-24 text-center" {...fadeIn(reduce)}>
            <Eyebrow dark>Getting started</Eyebrow>
            <h2 className="mb-10" style={{ fontFamily: DM, fontSize: "clamp(26px, 3.6vw, 40px)", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
              Under 10 minutes to go live
            </h2>
            <motion.div
              className="grid sm:grid-cols-3 gap-6 mb-10 text-left"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              {GETTING_STARTED.map(({ step, body }, i) => (
                <motion.div key={step} variants={staggerItem(reduce)}>
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: GOLD }}>Step {i + 1} — {step}</div>
                  <p className="text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>{body}</p>
                </motion.div>
              ))}
            </motion.div>
            <p className="text-sm font-semibold mb-8" style={{ color: GOLD }}>Free to join. No hidden fees. Cancel any time.</p>
            <Link
              href="/directors/signup"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C541]"
              style={{ background: GOLD, color: DARK }}
            >
              List your business — it&apos;s free
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>
        </section>

        {/* 15 — Thank you */}
        <section
          ref={registerRef(14)}
          data-index={14}
          className="h-dvh w-full overflow-y-auto flex"
          style={{ scrollSnapAlign: "start", background: "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(79,52,196,0.35), transparent), #100B20" }}
        >
          <motion.div className="max-w-xl m-auto px-6 py-24 text-center" {...fadeIn(reduce)}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 600, color: "#FFFFFF" }} className="text-[44px] sm:text-[56px] mb-5">
              Thank you
            </h2>
            <p className="italic text-[16px] sm:text-[18px] mb-8" style={{ fontFamily: SERIF, color: "#CFC8FF" }}>
              Transparent prices. Genuine choice. Dignity for every family.
            </p>
            <p className="text-[14px]" style={{ fontFamily: DM, color: "rgba(255,255,255,0.55)" }}>
              <a href="mailto:hello@vale.co.uk" className="underline decoration-white/20 hover:decoration-white/50 transition-colors">hello@vale.co.uk</a>
              {" · "}
              <Link href="/for-funeral-directors" className="underline decoration-white/20 hover:decoration-white/50 transition-colors">vale.co.uk/for-funeral-directors</Link>
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
