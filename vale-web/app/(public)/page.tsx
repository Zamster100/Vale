import Link from "next/link";
import { CheckCircle } from "lucide-react";
import VideoBackground from "@/components/VideoBackground";
import HeroSearch from "@/components/HeroSearch";
import HowItWorks from "@/components/HowItWorks";

const STATS = [
  { value: "1,200+", label: "Verified providers" },
  { value: "4.9/5",  label: "Family satisfaction" },
  { value: "£1,895", label: "Avg. saving found" },
  { value: "0",      label: "Hidden charges ever" },
];

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";


const TESTIMONIALS = [
  {
    quote:
      "Vale helped us find a funeral director within hours. Seeing the prices upfront meant we could make a decision without the added stress of unexpected costs. I can't recommend it enough.",
    author: "Sarah M.",
    role: "Arranged her father's funeral, March 2026",
    featured: true,
  },
  {
    quote:
      "We were completely overwhelmed. Vale made it simple to compare our options and find someone who truly understood what we wanted for our mum.",
    author: "James & Claire R.",
    role: "Arranged their mother's funeral, January 2026",
    featured: false,
  },
  {
    quote:
      "The verified reviews gave us genuine confidence. We felt informed, not pressured — which meant everything at such a difficult time.",
    author: "Priya K.",
    role: "Arranged her grandmother's funeral, February 2026",
    featured: false,
  },
];

export default function Home() {
  return (
    <div style={{ background: "#F7F3EE" }}>

      {/* ══════════════════════════════════════════════════════════
          HERO — video background + centered copy
      ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen w-full overflow-hidden" style={{ background: "#F7F3EE" }}>

        {/* Video layer — starts 300px from top, fills rest */}
        <div className="absolute inset-0 z-0" style={{ top: "300px" }}>
          <VideoBackground src={VIDEO_URL} />
          {/* Gradient overlays — fade video into background at top and bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, #F7F3EE 0%, transparent 30%, transparent 70%, #F7F3EE 100%)",
            }}
          />
        </div>

        {/* Hero content */}
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 pb-40"
          style={{ paddingTop: "calc(8rem - 75px)" }}
        >
          {/* Eyebrow */}
          <div
            className="animate-fade-rise inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10 text-[11px] font-medium uppercase tracking-[0.13em]"
            style={{
              border: "1px solid #E8E2D8",
              background: "rgba(234,242,238,0.3)",
              color: "#5E8B73",
            }}
          >
            <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
            Verified UK funeral directors
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-rise max-w-5xl font-normal"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(36px, 6vw, 76px)",
              lineHeight: 0.95,
              letterSpacing: "-2.46px",
              color: "#1C1F2A",
            }}
          >
            Choose with care.{" "}
            <em style={{ color: "#7A6E64", fontStyle: "italic" }}>
              Move forward with confidence.
            </em>
          </h1>

          {/* Search box */}
          <div className="animate-fade-rise-delay w-full max-w-2xl mt-12 px-2 sm:px-0">
            <HeroSearch />
          </div>

          <p className="animate-fade-rise-delay-2 mt-6 text-xs opacity-60" style={{ color: "#7A6E64" }}>
            No account needed · Prices shown upfront · CMA compliant
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          WHO WE ARE
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-10" style={{ background: "#F7F3EE" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

            {/* LEFT — text */}
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
                  fontSize: "clamp(26px, 3.5vw, 42px)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "#1C1F2A",
                }}
              >
                Founded in London.{" "}
                <em style={{ color: "#5E8B73", fontStyle: "italic" }}>Built for families.</em>
              </h2>
              <p
                className="mb-4 leading-relaxed"
                style={{
                  fontFamily: "var(--font-lora), serif",
                  fontStyle: "italic",
                  fontSize: "15px",
                  color: "#3A3228",
                }}
              >
                Vale was founded in London in 2026 by a team that had experienced the confusion of arranging a funeral at first hand and refused to accept that it had to be that way.
              </p>
              <p className="mb-4 text-sm leading-relaxed" style={{ color: "#5A4E44" }}>
                We are backed by investors who share our belief that transparency in this market is not just a business opportunity — it is a social necessity.
              </p>
              <p className="mb-7 text-sm leading-relaxed" style={{ color: "#5A4E44" }}>
                We are members of the Good Business Charter. All Vale advisors complete professional bereavement awareness training. Our data is independently audited quarterly.
              </p>
              <Link
                href="/about"
                className="text-[14px] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] rounded"
                style={{ fontFamily: "var(--font-lora), serif", fontStyle: "italic", color: "#5E8B73" }}
              >
                Read our full story →
              </Link>
            </div>

            {/* RIGHT — stats 2×2 grid */}
            <div>
              <div className="flex items-center gap-2.5 mb-8">
                <span aria-hidden className="inline-block w-6 h-px" style={{ background: "#5E8B73" }} />
                <span className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: "#5E8B73" }}>
                  Vale in numbers
                </span>
              </div>
              <div
                className="grid grid-cols-2 rounded-xl overflow-hidden"
                style={{ border: "1px solid #E8E2D8" }}
              >
                {STATS.map(({ value, label }, i) => (
                  <div
                    key={label}
                    className="flex flex-col items-center justify-center px-4 py-10"
                    style={{
                      borderRight:  i % 2 === 0 ? "1px solid #E8E2D8" : undefined,
                      borderBottom: i < 2        ? "1px solid #E8E2D8" : undefined,
                      background: "white",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "38px",
                        fontWeight: 300,
                        lineHeight: 1,
                        color: "#1C1F2A",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {value}
                    </div>
                    <div
                      className="text-[10px] mt-2.5 tracking-[0.08em] uppercase text-center"
                      style={{ color: "#7A6E64" }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-28 px-6 md:px-10" style={{ background: "#FFFFFF", borderTop: "1px solid #E8E2D8" }}>
        {/* Wave layers */}
        <svg
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{ bottom: 0, left: 0, width: "100%", height: "340px" }}
          viewBox="0 0 1440 340"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Back wave — widest, lightest sage */}
          <path
            d="M -100,120 C 180,40 380,210 620,130 C 860,50 1060,190 1280,110 C 1380,75 1420,90 1540,80 L 1540,340 L -100,340 Z"
            fill="rgba(94,139,115,0.07)"
          />
          {/* Mid wave — sage-light */}
          <path
            d="M -100,175 C 150,95 360,250 600,175 C 840,100 1040,230 1260,160 C 1380,125 1440,140 1540,130 L 1540,340 L -100,340 Z"
            fill="rgba(234,242,238,0.6)"
          />
          {/* Front wave — mist, most defined */}
          <path
            d="M -100,225 C 200,165 420,285 660,215 C 900,145 1080,265 1300,195 C 1400,165 1440,178 1540,170 L 1540,340 L -100,340 Z"
            fill="rgba(232,226,216,0.55)"
          />
        </svg>
        <div className="relative max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-14 md:mb-16">
            <div className="flex items-center gap-2.5 mb-6">
              <span aria-hidden className="inline-block w-6 h-px" style={{ background: "#5E8B73" }} />
              <span className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: "#5E8B73" }}>
                How Vale works
              </span>
            </div>
            <h2
              className="mb-4 max-w-lg"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(28px, 3.5vw, 42px)",
                fontWeight: 400,
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "#1C1F2A",
              }}
            >
              Clarity when you need it most
            </h2>
            <p className="text-sm leading-relaxed max-w-md" style={{ color: "#7A6E64" }}>
              Search, compare, and connect at your own pace — without anyone pushing you towards a decision you&apos;re not ready to make.
            </p>
          </div>

          {/* 4 step boxes — animated entrance via HowItWorks component */}
          <HowItWorks />

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 md:py-28"
        style={{ background: "#EAF2EE", borderTop: "1px solid #E8E2D8", borderBottom: "1px solid #E8E2D8" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-[2fr_3fr] gap-12 md:gap-16 items-center">

            {/* Left — heading + description + CTA */}
            <div>
              <div className="w-8 h-[2px] rounded-full mb-6" style={{ background: "#5E8B73" }} aria-hidden="true" />
              <h2
                className="mb-5"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(28px, 3.5vw, 42px)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                  color: "#1C1F2A",
                }}
              >
                Trusted at life&apos;s hardest moments
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "#7A6E64", maxWidth: "280px" }}>
                Real families, real experiences. Every review is verified and linked to a confirmed arrangement — no anonymous posts.
              </p>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium text-white transition-transform hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] focus-visible:ring-offset-2"
                style={{ background: "#1C1F2A" }}
              >
                Read more reviews
              </Link>
            </div>

            {/* Right — 3 cards stacked */}
            <div className="flex flex-col gap-4">
              {TESTIMONIALS.map(({ quote, author, role }) => (
                <figure
                  key={author}
                  className="flex items-start gap-5 rounded-xl px-6 py-5"
                  style={{ background: "white", border: "1px solid #E8E2D8" }}
                >
                  {/* Avatar */}
                  <div
                    className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-sm font-medium mt-0.5"
                    style={{ background: "#EAF2EE", color: "#1C1F2A" }}
                    aria-hidden="true"
                  >
                    {author.charAt(0)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="select-none leading-none mb-2"
                      style={{ fontSize: "36px", fontFamily: "Georgia, serif", color: "#5E8B73", lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      &ldquo;
                    </div>
                    <blockquote>
                      <p className="text-sm leading-relaxed" style={{ color: "#5A4E44" }}>
                        {quote}
                      </p>
                    </blockquote>
                    <figcaption className="mt-3">
                      <span className="text-xs font-medium" style={{ color: "#5E8B73" }}>— </span>
                      <span className="text-xs font-medium" style={{ color: "#1C1F2A" }}>{author}</span>
                      <span className="text-xs ml-1.5" style={{ color: "#7A6E64" }}>{role}</span>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FINAL CTA — split: families left / directors right
      ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: "#1C1F2A" }}>
        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2">

          {/* ── LEFT — For families ── */}
          <div
            className="px-8 md:px-14 py-24 md:py-32"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-8">
              <span aria-hidden className="inline-block w-6 h-px" style={{ background: "#5E8B73" }} />
              <span className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: "#5E8B73" }}>
                For families
              </span>
            </div>

            <h2
              className="mb-5"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "#FFFFFF",
                fontSize: "clamp(30px, 3.5vw, 48px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              Find a funeral director{" "}
              <em style={{ color: "#5E8B73" }}>you can trust.</em>
            </h2>

            <p
              className="mb-10 leading-relaxed max-w-sm"
              style={{ fontSize: "15px", color: "rgba(234,242,238,0.6)" }}
            >
              Search by postcode and compare prices, reviews, and services from
              verified funeral directors across the UK. No account needed, no pressure, ever.
            </p>

            <Link
              href="/search"
              className="inline-flex items-center gap-2.5 rounded-md px-8 py-3.5 font-medium text-[15px] hover:scale-[1.03] active:scale-[0.98] transition-transform min-h-[52px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1F2A]"
              style={{
                background: "rgba(94,139,115,0.12)",
                color: "#5E8B73",
                border: "1px solid rgba(94,139,115,0.35)",
              }}
            >
              Search funeral directors →
            </Link>

            <p className="text-xs mt-6" style={{ color: "rgba(234,242,238,0.3)" }}>
              Free to use · Prices shown upfront · CMA compliant
            </p>
          </div>

          {/* Vertical divider — desktop only */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px"
            style={{ background: "rgba(255,255,255,0.08)" }}
            aria-hidden="true"
          />

          {/* ── RIGHT — For funeral directors ── */}
          <div className="px-8 md:px-14 py-24 md:py-32">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-8">
              <span aria-hidden className="inline-block w-6 h-px" style={{ background: "#C4975A" }} />
              <span className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: "#C4975A" }}>
                For funeral directors
              </span>
            </div>

            <h2
              className="mb-5"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "#FFFFFF",
                fontSize: "clamp(30px, 3.5vw, 48px)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                fontWeight: 400,
              }}
            >
              Reach the families already{" "}
              <em style={{ color: "#C4975A" }}>searching for you.</em>
            </h2>

            <p
              className="mb-10 leading-relaxed max-w-sm"
              style={{ fontSize: "15px", color: "rgba(234,242,238,0.6)" }}
            >
              Reach the 24,000 families searching for a funeral director
              every month. Your pricing shown upfront, reviews verified, and every
              enquiry already informed.
            </p>

            <Link
              href="/for-funeral-directors"
              className="inline-flex items-center gap-2.5 rounded-md px-8 py-3.5 font-medium text-[15px] hover:scale-[1.03] active:scale-[0.98] transition-transform min-h-[52px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4975A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1F2A]"
              style={{
                background: "rgba(196,151,90,0.12)",
                color: "#C4975A",
                border: "1px solid rgba(196,151,90,0.35)",
              }}
            >
              List your funeral home →
            </Link>

            <p className="text-xs mt-6" style={{ color: "rgba(234,242,238,0.3)" }}>
              No long-term contracts · Set up in minutes · Cancel any time
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
