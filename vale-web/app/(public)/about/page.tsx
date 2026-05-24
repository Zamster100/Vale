import Link from "next/link";
import { Search, Building2, TrendingUp, Users, ShieldCheck, Heart } from "lucide-react";

/* ─── Design tokens ─────────────────────────────────────────────── */
const OS   = "var(--font-open-sans), -apple-system, sans-serif";
const DARK = "#1A1A2E";
const MED  = "#5C5C7A";
const BDR  = "#E8E8F4";

const LAV       = "#D2D3FC";
const LAV_BTN   = "#6B6DE8";
const MINT      = "#D3FCD2";
const MINT_BTN  = "#3AA838";
const YEL       = "#FCFBD2";
const PINK      = "#FBD2FC";

/* ─── Data ──────────────────────────────────────────────────────── */
const VALUES = [
  {
    color: LAV,
    accent: LAV_BTN,
    icon: "◎",
    title: "Radical transparency",
    body: "Every price, every review, every data point on Vale is real and verified. We do not accept advertising, sponsored placements, or paid listings.",
  },
  {
    color: MINT,
    accent: MINT_BTN,
    icon: "◌",
    title: "No pressure, ever",
    body: "We will never contact you, upsell you, or pass your details to a provider without your explicit consent. Your search is private.",
  },
  {
    color: PINK,
    accent: "#C45EC4",
    icon: "◈",
    title: "Families first, always",
    body: "Vale's commercial model is funded by providers who list with us. But our loyalty is to families — full stop. Those two things are never in conflict because transparency is what makes providers valuable.",
  },
  {
    color: YEL,
    accent: "#806000",
    icon: "◻",
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
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className="inline-block w-5 h-px" style={{ background: LAV_BTN }} aria-hidden="true" />
      <span
        className="text-[11px] font-bold uppercase tracking-[0.18em]"
        style={{ color: LAV_BTN }}
      >
        {children}
      </span>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div style={{ background: "#FFFFFF" }}>

      {/* ══════════════ HERO ══════════════ */}
      <section
        className="relative overflow-hidden px-6 md:px-10 pt-20 pb-28 md:pt-28 md:pb-36"
        style={{ background: LAV }}
      >
        {/* Dot texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(107,109,232,0.18) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
          aria-hidden="true"
        />
        {/* Pink glow blob */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-120px", right: "-120px",
            width: "520px", height: "520px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(196,94,196,0.2) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto">
          <SectionLabel>About Vale</SectionLabel>

          <h1
            className="mb-5 max-w-3xl"
            style={{
              fontFamily:    OS,
              fontSize:      "clamp(36px, 5vw, 64px)",
              fontWeight:    800,
              lineHeight:    1.05,
              letterSpacing: "-0.025em",
              color:         DARK,
            }}
          >
            We built Vale because the alternative was unacceptable.
          </h1>

          <p
            className="max-w-xl mb-12 text-base leading-relaxed"
            style={{ fontFamily: OS, color: MED }}
          >
            Transparency belongs in every part of life — including the end of it. We
            created Vale so families can make informed choices at the hardest moment.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/search"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B6DE8]"
              style={{ background: DARK, color: "#FFFFFF" }}
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              Find a funeral director
            </Link>
            <Link
              href="/for-funeral-directors"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B6DE8]"
              style={{ background: "rgba(107,109,232,0.12)", color: DARK, border: "1px solid rgba(107,109,232,0.3)" }}
            >
              <Building2 className="w-4 h-4" aria-hidden="true" />
              List your funeral home
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ WHY WE EXIST ══════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

            {/* Left — story */}
            <div>
              <SectionLabel>Why we exist</SectionLabel>

              <h2
                className="mb-5"
                style={{
                  fontFamily:    OS,
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
            </div>

            {/* Right — industry stats */}
            <div className="grid grid-cols-1 gap-4">
              {INDUSTRY_STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={value}
                  className="flex items-start gap-5 rounded-2xl px-6 py-5"
                  style={{ background: "#F4F4FD", border: `1px solid ${BDR}` }}
                >
                  <div
                    className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center mt-0.5"
                    style={{ background: LAV }}
                  >
                    <Icon className="w-5 h-5" style={{ color: LAV_BTN }} aria-hidden="true" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily:    OS,
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
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════ VALUES ══════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: MINT }}>
        <div className="max-w-5xl mx-auto">
          <SectionLabel>Our values</SectionLabel>

          <h2
            className="mb-12 max-w-xl"
            style={{
              fontFamily:    OS,
              fontSize:      "clamp(26px, 3vw, 40px)",
              fontWeight:    700,
              lineHeight:    1.12,
              letterSpacing: "-0.02em",
              color:         DARK,
            }}
          >
            The principles we will never compromise on
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VALUES.map(({ color, accent, icon, title, body }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-2xl px-6 py-6"
                style={{ background: "#FFFFFF", border: `1px solid ${BDR}` }}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5 text-base font-bold"
                  style={{ background: color, color: accent }}
                  aria-hidden="true"
                >
                  {icon}
                </div>
                <div>
                  <h3
                    className="mb-2"
                    style={{ fontFamily: OS, fontSize: "17px", fontWeight: 700, color: DARK, lineHeight: 1.25 }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: MED }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ STATS + WHO WE ARE ══════════════ */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

            {/* Stats 2×2 grid */}
            <div>
              <SectionLabel>Vale in numbers</SectionLabel>
              <div
                className="grid grid-cols-2 rounded-2xl overflow-hidden"
                style={{ border: `1px solid ${BDR}` }}
              >
                {STATS.map(({ value, label }, i) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center px-4 py-10"
                    style={{
                      borderRight:  i % 2 === 0 ? `1px solid ${BDR}` : undefined,
                      borderBottom: i < 2       ? `1px solid ${BDR}` : undefined,
                      background:   i % 2 === 0 ? "#F4F4FD" : LAV,
                    }}
                  >
                    <div
                      style={{
                        fontFamily:    OS,
                        fontSize:      "38px",
                        fontWeight:    800,
                        lineHeight:    1,
                        color:         DARK,
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {value}
                    </div>
                    <div
                      className="text-[11px] mt-2.5 tracking-[0.08em] uppercase font-semibold text-center"
                      style={{ color: MED }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Who we are */}
            <div>
              <SectionLabel>Who we are</SectionLabel>

              <h2
                className="mb-5"
                style={{
                  fontFamily:    OS,
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
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════ TEAM PLACEHOLDER ══════════════ */}
      <section className="py-20 md:py-24 px-6 md:px-10" style={{ background: YEL }}>
        <div className="max-w-5xl mx-auto">
          <SectionLabel>The team</SectionLabel>

          <h2
            className="mb-3 max-w-md"
            style={{
              fontFamily:    OS,
              fontSize:      "clamp(26px, 3vw, 40px)",
              fontWeight:    700,
              lineHeight:    1.12,
              letterSpacing: "-0.02em",
              color:         DARK,
            }}
          >
            The people behind Vale
          </h2>
          <p className="text-sm mb-10 max-w-md" style={{ color: MED }}>
            We&apos;ll be sharing more about the team shortly.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl p-6 flex flex-col items-center text-center"
                style={{ background: "#FFFFFF", border: `1px solid ${BDR}` }}
              >
                <div
                  className="w-16 h-16 rounded-full mb-4"
                  style={{ background: LAV }}
                  aria-hidden="true"
                />
                <div className="w-20 h-3 rounded-full mb-2" style={{ background: BDR }} aria-hidden="true" />
                <div className="w-14 h-2.5 rounded-full" style={{ background: BDR }} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FINAL CTA ══════════════ */}
      <section
        className="relative overflow-hidden py-24 md:py-32 px-6 md:px-10"
        style={{ background: LAV }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(107,109,232,0.18) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
          aria-hidden="true"
        />
        {/* Green glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-80px", left: "-80px",
            width: "400px", height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(58,168,56,0.2) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto">
          <SectionLabel>Get started</SectionLabel>

          <h2
            className="mb-4 max-w-2xl"
            style={{
              fontFamily:    OS,
              fontSize:      "clamp(28px, 4vw, 52px)",
              fontWeight:    800,
              lineHeight:    1.08,
              letterSpacing: "-0.025em",
              color:         DARK,
            }}
          >
            Ready to find a funeral director you can trust?
          </h2>

          <p
            className="mb-10 max-w-lg text-base leading-relaxed"
            style={{ color: MED }}
          >
            Or if you&apos;re a funeral director who believes families deserve better —
            we&apos;d like to work with you.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/search"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B6DE8]"
              style={{ background: DARK, color: "#FFFFFF" }}
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              Search funeral directors
            </Link>
            <Link
              href="/for-funeral-directors"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B6DE8]"
              style={{ background: LAV_BTN, color: "#FFFFFF" }}
            >
              <Building2 className="w-4 h-4" aria-hidden="true" />
              List your funeral home
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
