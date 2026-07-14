'use client';

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Search, Building2, TrendingUp, Users, ShieldCheck, Heart, HandHeart, MapPin, ArrowRight } from "lucide-react";

/* ─── Design tokens ─────────────────────────────────────────────── */
const DM    = "var(--font-dm-sans), -apple-system, sans-serif";
const DARK  = "#100B20";
const MED   = "#4A415E";
const BDR   = "#D5D0E4";

const LAV       = "#E3DFFF";
const PURPLE    = "#4F34C4";
const GOLD      = "#F5C541";
const EASE      = [0.16, 1, 0.3, 1] as const;

/* ─── Data ──────────────────────────────────────────────────────── */
const VALUES = [
  {
    icon: ShieldCheck,
    title: "Radical transparency",
    body: "Every price, every review, every data point on Vale is real and verified. We do not accept advertising, sponsored placements, or paid listings.",
  },
  {
    icon: HandHeart,
    title: "No pressure, ever",
    body: "We will never contact you, upsell you, or pass your details to a provider without your explicit consent. Your search is private.",
  },
  {
    icon: Users,
    title: "Families first, always",
    body: "Vale's commercial model is funded by providers who list with us. But our loyalty is to families — full stop. Those two things are never in conflict because transparency is what makes providers valuable.",
  },
  {
    icon: MapPin,
    title: "Local and independent",
    body: "We believe independent funeral directors often provide the most personal care. Vale gives them the same digital visibility as national chains — on merit, not budget.",
  },
];

const STATS = [
  { value: "1,200+", label: "Verified providers" },
  { value: "4.9/5",  label: "Family satisfaction" },
  { value: "£1,895", label: "Avg. saving found"   },
  { value: "0",      label: "Hidden charges ever"  },
];

const INDUSTRY_STATS = [
  { icon: TrendingUp,  value: "134%",   label: "Rise in funeral costs since 2004 — more than double inflation"   },
  { icon: Users,       value: "18%",    label: "Of families arranging a funeral face genuine financial hardship" },
  { icon: ShieldCheck, value: "3 yrs",  label: "CMA investigation concluded the market was failing families"     },
  { icon: Heart,       value: "£9,797", label: "Average cost of dying in the UK in 2024 — a record high"        },
];

/* ─── Section label helper ──────────────────────────────────────── */
function SectionLabel({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className="inline-block w-5 h-px" style={{ background: dark ? "#9889F5" : PURPLE }} aria-hidden="true" />
      <span
        className="text-[11px] font-bold uppercase tracking-[0.18em]"
        style={{ color: dark ? "#9889F5" : PURPLE }}
      >
        {children}
      </span>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function AboutPage() {
  const reduce = useReducedMotion();

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

      {/* ══════════════ HERO ══════════════ */}
      <section
        className="relative overflow-hidden bg-[#A898F4] pt-20 pb-24 md:pt-28 md:pb-28"
        aria-label="About Vale"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, #A898F4 0%, #BFAFF9 60%, #F4F0FF 100%)" }}
        />
        <div className="relative z-10 max-w-[1366px] mx-auto px-4 sm:px-[1.7rem]">
          <div className="max-w-3xl">
            <motion.p
              className="mb-5 inline-flex items-center rounded-full bg-white/30 backdrop-blur-sm px-4 py-1.5 text-[13px] font-[600] text-[#26126E] border border-white/40 tracking-[0.04em] uppercase"
              {...fadeUp(0)}
            >
              About Vale
            </motion.p>

            <motion.h1
              className="text-balance text-[36px] sm:text-[48px] lg:text-[56px] font-[900] leading-[1.1] tracking-[-0.02em] text-[#100B20] mb-6"
              {...fadeUp(0.1)}
            >
              We built Vale because the alternative was unacceptable.
            </motion.h1>

            <motion.p
              className="max-w-2xl text-[16px] sm:text-[18px] font-[400] leading-[1.6] text-[#342C46] mb-10"
              {...fadeUp(0.2)}
            >
              Transparency belongs in every part of life — including the end of it.
              We created Vale so families can make informed choices at the hardest moment.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-3" {...fadeUp(0.3)}>
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-7 py-3 rounded-xl bg-[#4F34C4] text-white text-[15px] font-[700] transition-[background-color] duration-200 ease-out hover:bg-[#3B229D] active:bg-[#26126E] group"
              >
                Find a funeral director
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/for-funeral-directors"
                className="inline-flex items-center justify-center min-h-[44px] px-7 py-3 rounded-xl border border-[#100B20]/15 bg-white/40 backdrop-blur-sm text-[15px] font-[600] text-[#26126E] transition-colors duration-200 ease-out hover:bg-white/70 hover:border-[#100B20]/25"
              >
                List your funeral home
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ WHY WE EXIST ══════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
        <div className="max-w-[1366px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

            {/* Left — story */}
            <motion.div {...fadeUp(0)}>
              <SectionLabel>Why we exist</SectionLabel>

              <h2
                className="mb-5"
                style={{
                  fontFamily:    DM,
                  fontSize:      "clamp(24px, 3vw, 36px)",
                  fontWeight:    700,
                  lineHeight:    1.15,
                  letterSpacing: "-0.02em",
                  color:         DARK,
                }}
              >
                The UK funeral industry was failing the families it serves.
              </h2>

              <p className="mb-5 text-base font-semibold leading-relaxed" style={{ color: DARK }}>
                Funeral costs in the UK have risen by 134% since 2004 — more than double
                the rate of inflation. In 2024, the average cost of dying reached a record
                £9,797.
              </p>
              <p className="mb-5 text-sm leading-relaxed" style={{ color: MED }}>
                The Competition and Markets Authority spent three years investigating this
                market and reached a clear conclusion: it was failing families. Not because
                funeral directors are dishonest — most are dedicated professionals who care
                deeply — but because the infrastructure of price transparency had never been
                built.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: MED }}>
                Vale is that infrastructure. We are not here to make funerals cheaper. We
                are here to make them fairer — so that what a family pays reflects the
                quality of care they receive, not the desperation of the moment they chose.
              </p>
            </motion.div>

            {/* Right — industry stats, top-padded to align with the h2 headline */}
            <motion.div
              className="grid grid-cols-1 gap-4 md:pt-[52px]"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {INDUSTRY_STATS.map(({ icon: Icon, value, label }) => (
                <motion.div
                  key={value}
                  variants={staggerItem}
                  className="flex items-start gap-5 rounded-2xl px-6 py-5"
                  style={{ background: "#F4F4FD", border: `1px solid ${BDR}` }}
                >
                  <div
                    className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center mt-0.5"
                    style={{ background: LAV }}
                  >
                    <Icon className="w-5 h-5" style={{ color: PURPLE }} aria-hidden="true" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily:    DM,
                        fontSize:      "30px",
                        fontWeight:    800,
                        color:         DARK,
                        lineHeight:    1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {value}
                    </div>
                    <p className="text-[12px] mt-1.5 leading-relaxed" style={{ color: MED }}>
                      {label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════ VALUES ══════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: "#F4F2F8" }}>
        <div className="max-w-[1366px] mx-auto">
          <motion.div {...fadeUp(0)}>
            <SectionLabel>Our values</SectionLabel>

            <h2
              className="mb-12 max-w-xl"
              style={{
                fontFamily:    DM,
                fontSize:      "clamp(26px, 3vw, 40px)",
                fontWeight:    700,
                lineHeight:    1.12,
                letterSpacing: "-0.02em",
                color:         DARK,
              }}
            >
              The principles we will never compromise on
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {VALUES.map(({ icon: Icon, title, body }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="flex items-start gap-4 rounded-2xl px-6 py-6"
                style={{ background: "#FFFFFF", border: `1px solid ${BDR}` }}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                  style={{ background: LAV, color: PURPLE }}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3
                    className="mb-2"
                    style={{ fontFamily: DM, fontSize: "17px", fontWeight: 700, color: DARK, lineHeight: 1.25 }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: MED }}>{body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════ VALE IN NUMBERS — dark band ══════════════ */}
      <section className="py-20 md:py-24 px-6 md:px-10" style={{ background: DARK }}>
        <div className="max-w-[1366px] mx-auto">
          <motion.div {...fadeUp(0)}>
            <SectionLabel dark>Vale in numbers</SectionLabel>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 md:divide-x"
            style={{ borderColor: "#1E172E" }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {STATS.map(({ value, label }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                className="py-6 md:px-10 first:md:pl-0 last:md:pr-0 border-t md:border-t-0"
                style={{ borderColor: "#1E172E" }}
              >
                <div
                  style={{
                    fontFamily:    DM,
                    fontSize:      "clamp(32px,3vw,42px)",
                    fontWeight:    800,
                    lineHeight:    1,
                    letterSpacing: "-0.025em",
                    color:         GOLD,
                    marginBottom:  "8px",
                  }}
                >
                  {value}
                </div>
                <div
                  className="text-[13px] tracking-[0.04em] uppercase font-semibold"
                  style={{ color: "#9E96B2" }}
                >
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════ WHO WE ARE ══════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
        <div className="max-w-[1366px] mx-auto">
          <motion.div className="max-w-2xl" {...fadeUp(0)}>
            <SectionLabel>Who we are</SectionLabel>

            <h2
              className="mb-5"
              style={{
                fontFamily:    DM,
                fontSize:      "clamp(24px, 2.5vw, 36px)",
                fontWeight:    700,
                lineHeight:    1.15,
                letterSpacing: "-0.02em",
                color:         DARK,
              }}
            >
              Founded in London. Built for families.
            </h2>

            <p className="mb-4 text-base font-semibold leading-relaxed" style={{ color: DARK }}>
              Vale was founded in London in 2026 by a team that had experienced the
              confusion of arranging a funeral first-hand and refused to accept that it
              had to be that way.
            </p>
            <p className="mb-4 text-sm leading-relaxed" style={{ color: MED }}>
              We are backed by investors who share our belief that transparency in this
              market is not just a business opportunity — it is a social necessity.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: MED }}>
              We are members of the Good Business Charter. All Vale advisors complete
              professional bereavement awareness training. Our data is independently
              audited quarterly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ FINAL CTA — dark band ══════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-10" style={{ background: DARK }}>
        <motion.div className="max-w-[1366px] mx-auto" {...fadeUp(0)}>
          <SectionLabel dark>Get started</SectionLabel>

          <h2
            className="mb-4 max-w-2xl"
            style={{
              fontFamily:    DM,
              fontSize:      "clamp(28px, 4vw, 52px)",
              fontWeight:    800,
              lineHeight:    1.08,
              letterSpacing: "-0.025em",
              color:         "#FFFFFF",
            }}
          >
            Ready to find a funeral director you can trust?
          </h2>

          <p
            className="mb-10 max-w-lg text-base leading-relaxed"
            style={{ color: "#9889F5" }}
          >
            Or if you&apos;re a funeral director who believes families deserve better —
            we&apos;d like to work with you.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/search"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C541]"
              style={{ background: GOLD, color: DARK }}
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              Search funeral directors
            </Link>
            <Link
              href="/for-funeral-directors"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9889F5]"
              style={{ background: "transparent", color: "#CFC8FF", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <Building2 className="w-4 h-4" aria-hidden="true" />
              List your funeral home
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
