import Link from "next/link";
import { Search, Building2, TrendingUp, Users, ShieldCheck, Heart } from "lucide-react";

const VALUES = [
  {
    icon: "◎",
    title: "Radical transparency",
    body: "Every price, every review, every data point on Vale is real and verified. We do not accept advertising, sponsored placements, or paid listings.",
  },
  {
    icon: "◌",
    title: "No pressure, ever",
    body: "We will never contact you, upsell you, or pass your details to a provider without your explicit consent. Your search is private.",
  },
  {
    icon: "◈",
    title: "Families first, always",
    body: "Vale's commercial model is funded by providers who list with us. But our loyalty is to families — full stop. Those two things are never in conflict because transparency is what makes providers valuable.",
  },
  {
    icon: "◻",
    title: "Local and independent",
    body: "We believe independent funeral directors often provide the most personal care. Vale gives them the same digital visibility as national chains — on merit, not budget.",
  },
];

const STATS = [
  { value: "1,200+", label: "Verified providers" },
  { value: "4.9/5",  label: "Family satisfaction" },
  { value: "£1,895", label: "Avg. saving found" },
  { value: "0",      label: "Hidden charges ever" },
];

const INDUSTRY_STATS = [
  { icon: TrendingUp, value: "134%",   label: "Rise in funeral costs since 2004 — more than double inflation" },
  { icon: Users,      value: "18%",    label: "Of families arranging a funeral face genuine financial hardship" },
  { icon: ShieldCheck,value: "3 yrs",  label: "CMA investigation concluded the market was failing families" },
  { icon: Heart,      value: "£9,797", label: "Average cost of dying in the UK in 2024 — a record high" },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#F7F3EE" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-6 md:px-10 pt-20 pb-28 md:pt-28 md:pb-36"
        style={{ background: "#1C1F2A" }}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />
        {/* Subtle sage glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-160px", right: "-160px",
            width: "560px", height: "560px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(94,139,115,0.09) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-8">
            <span aria-hidden className="inline-block w-6 h-px" style={{ background: "#5E8B73" }} />
            <span className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: "#5E8B73" }}>
              About Vale
            </span>
          </div>

          {/* Headline */}
          <h1
            className="mb-6 max-w-3xl"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(38px, 5.5vw, 70px)",
              fontWeight: 300,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
            }}
          >
            We built Vale because{" "}
            <em style={{ color: "#5E8B73", fontStyle: "italic" }}>
              the alternative was unacceptable.
            </em>
          </h1>

          {/* Sub */}
          <p
            className="max-w-2xl mb-12 leading-relaxed"
            style={{ fontSize: "17px", color: "rgba(234,242,238,0.65)", fontFamily: "var(--font-lora), serif", fontStyle: "italic" }}
          >
            Transparency belongs in every part of life — including the end of it.
          </p>

          {/* Dual CTA */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/search"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md font-medium text-[14px] transition-transform hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73]"
              style={{ background: "#F7F3EE", color: "#1C1F2A" }}
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              Find a funeral director
            </Link>
            <Link
              href="/for-funeral-directors"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-md font-medium text-[14px] transition-transform hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73]"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(234,242,238,0.85)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <Building2 className="w-4 h-4" aria-hidden="true" />
              List your funeral home
            </Link>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: "#FFFFFF", borderBottom: "1px solid #E8E2D8" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

            {/* Left — story */}
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <span aria-hidden className="inline-block w-6 h-px" style={{ background: "#5E8B73" }} />
                <span className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: "#5E8B73" }}>
                  Why we exist
                </span>
              </div>
              <h2
                className="mb-6"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(26px, 3vw, 38px)",
                  fontWeight: 400,
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  color: "#1C1F2A",
                }}
              >
                The UK funeral industry was{" "}
                <em style={{ color: "#A0745A" }}>failing the families it serves.</em>
              </h2>
              <p
                className="mb-5 leading-relaxed"
                style={{ fontFamily: "var(--font-lora), serif", fontStyle: "italic", fontSize: "16px", color: "#3A3228" }}
              >
                Funeral costs in the UK have risen by 134% since 2004 — more than double the rate of inflation. In 2024, the average cost of dying reached a record £9,797.
              </p>
              <p className="mb-5 text-sm leading-relaxed" style={{ color: "#5A4E44" }}>
                The Competition and Markets Authority spent three years investigating this market and reached a clear conclusion: it was failing families. Not because funeral directors are dishonest — most are dedicated professionals who care deeply — but because the conditions that allow comparison, the infrastructure of price transparency, had never been built.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#5A4E44" }}>
                Vale is that infrastructure. We are not here to make funerals cheaper. We are here to make them fairer — so that what a family pays reflects the quality of care they receive, not the desperation of the moment they were in when they chose.
              </p>
            </div>

            {/* Right — industry stats */}
            <div className="grid grid-cols-1 gap-4">
              {INDUSTRY_STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={value}
                  className="flex items-start gap-5 rounded-xl px-6 py-5"
                  style={{ background: "#FAF8F4", border: "1px solid #E8E2D8" }}
                >
                  <div
                    className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5"
                    style={{ background: "#EAF2EE" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "#5E8B73" }} aria-hidden="true" />
                  </div>
                  <div>
                    <div
                      style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "28px", fontWeight: 300, color: "#1C1F2A", lineHeight: 1, letterSpacing: "-0.02em" }}
                    >
                      {value}
                    </div>
                    <p className="text-[12px] mt-1 leading-relaxed" style={{ color: "#7A6E64" }}>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: "#F7F3EE" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2.5 mb-6">
            <span aria-hidden className="inline-block w-6 h-px" style={{ background: "#5E8B73" }} />
            <span className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: "#5E8B73" }}>
              Our values
            </span>
          </div>
          <h2
            className="mb-12 max-w-lg"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(26px, 3vw, 38px)",
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#1C1F2A",
            }}
          >
            The principles we will not compromise on
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VALUES.map(({ icon, title, body }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-xl px-6 py-5"
                style={{ background: "#FFFFFF", border: "1px solid #E8E2D8" }}
              >
                <div
                  className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5 text-[15px]"
                  style={{ background: "#EAF2EE", color: "#5E8B73" }}
                  aria-hidden="true"
                >
                  {icon}
                </div>
                <div>
                  <h3
                    className="mb-1.5"
                    style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "19px", fontWeight: 500, color: "#1C1F2A", lineHeight: 1.2 }}
                  >
                    {title}
                  </h3>
                  <p className="text-[13px] leading-[1.65]" style={{ color: "#5A4E44" }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS + WHO WE ARE ────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: "#FFFFFF", borderTop: "1px solid #E8E2D8" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

            {/* Stats 2x2 */}
            <div>
              <div className="flex items-center gap-2.5 mb-8">
                <span aria-hidden className="inline-block w-6 h-px" style={{ background: "#5E8B73" }} />
                <span className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: "#5E8B73" }}>
                  Vale in numbers
                </span>
              </div>
              <div className="grid grid-cols-2 border border-mist rounded-xl overflow-hidden" style={{ border: "1px solid #E8E2D8" }}>
                {STATS.map(({ value, label }, i) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center px-4 py-8"
                    style={{
                      borderRight:  i % 2 === 0 ? "1px solid #E8E2D8" : undefined,
                      borderBottom: i < 2       ? "1px solid #E8E2D8" : undefined,
                      background: "#FAF8F4",
                    }}
                  >
                    <div
                      style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "36px", fontWeight: 300, lineHeight: 1, color: "#1C1F2A", letterSpacing: "-0.02em" }}
                    >
                      {value}
                    </div>
                    <div className="text-[10px] mt-2 tracking-[0.08em] uppercase text-center" style={{ color: "#7A6E64" }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Who we are */}
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <span aria-hidden className="inline-block w-6 h-px" style={{ background: "#5E8B73" }} />
                <span className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: "#5E8B73" }}>
                  Who we are
                </span>
              </div>
              <h2
                className="mb-5"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(24px, 2.5vw, 34px)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "#1C1F2A",
                }}
              >
                Founded in London.<br />Built for families.
              </h2>
              <p
                className="mb-4 leading-relaxed"
                style={{ fontFamily: "var(--font-lora), serif", fontStyle: "italic", fontSize: "15px", color: "#3A3228" }}
              >
                Vale was founded in London in 2026 by a team that had experienced the confusion of arranging a funeral at first hand and refused to accept that it had to be that way.
              </p>
              <p className="mb-4 text-sm leading-relaxed" style={{ color: "#5A4E44" }}>
                We are backed by investors who share our belief that transparency in this market is not just a business opportunity — it is a social necessity.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#5A4E44" }}>
                We are members of the Good Business Charter. All Vale advisors complete professional bereavement awareness training. Our data is independently audited quarterly.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── TEAM PLACEHOLDER ─────────────────────────────────── */}
      <section className="py-20 md:py-24 px-6 md:px-10" style={{ background: "#F7F3EE", borderTop: "1px solid #E8E2D8" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2.5 mb-6">
            <span aria-hidden className="inline-block w-6 h-px" style={{ background: "#5E8B73" }} />
            <span className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: "#5E8B73" }}>
              The team
            </span>
          </div>
          <h2
            className="mb-4 max-w-md"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(26px, 3vw, 38px)",
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#1C1F2A",
            }}
          >
            The people behind Vale
          </h2>
          <p className="text-sm mb-10 max-w-md" style={{ color: "#7A6E64" }}>
            {/* TODO: add team bios */}
            We&apos;ll be sharing more about the team shortly.
          </p>
          {/* Team cards placeholder */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-xl p-6 flex flex-col items-center text-center"
                style={{ background: "#FFFFFF", border: "1px solid #E8E2D8" }}
              >
                <div
                  className="w-16 h-16 rounded-full mb-4"
                  style={{ background: "#EAF2EE" }}
                  aria-hidden="true"
                />
                <div className="w-20 h-3 rounded mb-2" style={{ background: "#E8E2D8" }} aria-hidden="true" />
                <div className="w-14 h-2.5 rounded" style={{ background: "#F0EDE8" }} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL DUAL CTA ───────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 md:py-32 px-6 md:px-10"
        style={{ background: "#1C1F2A" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-5xl mx-auto">
          <div className="w-10 h-[2px] rounded-full mb-8" style={{ background: "#5E8B73" }} aria-hidden="true" />
          <h2
            className="mb-4 max-w-2xl"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(30px, 4vw, 52px)",
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
            }}
          >
            Ready to find a funeral director{" "}
            <em style={{ color: "#5E8B73" }}>you can trust?</em>
          </h2>
          <p className="mb-10 max-w-lg text-[15px] leading-relaxed" style={{ color: "rgba(234,242,238,0.6)" }}>
            Or if you&apos;re a funeral director who believes families deserve better — we&apos;d like to work with you.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/search"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-md font-medium text-[15px] transition-transform hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73]"
              style={{ background: "#F7F3EE", color: "#1C1F2A" }}
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              Search funeral directors
            </Link>
            <Link
              href="/for-funeral-directors"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-md font-medium text-[15px] transition-transform hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73]"
              style={{ background: "#5E8B73", color: "#FFFFFF" }}
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
