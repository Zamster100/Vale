import Link from "next/link";
import { CheckCircle, MapPin, SlidersHorizontal, ShieldCheck, Phone } from "lucide-react";
import VideoBackground from "@/components/VideoBackground";
import HeroSearch from "@/components/HeroSearch";
import StatsCounter from "@/components/StatsCounter";

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
          ABOUT
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 md:px-10" style={{ background: "#F7F3EE" }}>
        <div className="max-w-5xl mx-auto">

          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-5">
            <span aria-hidden className="inline-block w-6 h-px" style={{ background: "#5E8B73" }} />
            <span className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: "#5E8B73" }}>
              About
            </span>
          </div>

          {/* Headline */}
          <h2
            className="mb-10 max-w-2xl"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#1C1F2A",
            }}
          >
            Transparency belongs in every part of life —{" "}
            <em style={{ color: "#5E8B73" }}>including the end of it.</em>
          </h2>

          {/* Animated stats strip */}
          <StatsCounter />

          {/* Subheadline + link — right aligned */}
          <div className="mt-8 flex flex-col items-end text-right">
            <p
              className="max-w-sm text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-lora), serif", fontStyle: "italic", color: "#7A6E64" }}
            >
              The UK funeral industry is one of the last markets where you routinely spend thousands of pounds without seeing the price first. Not because it has to be that way. Because, until now, nobody had built the alternative.
            </p>
            <Link
              href="/about"
              className="mt-3 text-[14px] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] rounded"
              style={{ fontFamily: "var(--font-lora), serif", fontStyle: "italic", color: "#5E8B73" }}
            >
              Read our full story →
            </Link>
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

          {/* 4 step boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: MapPin,
                title: "Search your area",
                body: "Enter your postcode to see verified funeral directors nearby. Real prices shown immediately — no calls, no personal details.",
              },
              {
                icon: SlidersHorizontal,
                title: "Compare providers",
                body: "Full itemised price lists from every provider. Filter by budget, service type, or specific needs. Compare side by side.",
              },
              {
                icon: ShieldCheck,
                title: "Read verified reviews",
                body: "Every review is linked to a confirmed arrangement. Honest accounts from real families — no anonymous posts.",
              },
              {
                icon: Phone,
                title: "Connect when ready",
                body: "Request a callback, message, or call directly. Shortlist providers and share with family. No time pressure, ever.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex flex-col px-6 py-7 rounded-xl"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E8E2D8",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 shrink-0"
                  style={{ background: "#EAF2EE" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#5E8B73" }} aria-hidden="true" />
                </div>
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "19px",
                    fontWeight: 500,
                    color: "#1C1F2A",
                    lineHeight: 1.25,
                  }}
                >
                  {title}
                </h3>
                <p className="text-[13px] leading-[1.65]" style={{ color: "#7A6E64" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>

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
          FINAL CTA
      ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-28 md:py-36 text-center px-6" style={{ background: "#1C1F2A" }}>
        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="w-12 h-[2px] rounded-full mx-auto mb-10" style={{ background: "#5E8B73" }} aria-hidden="true" />
          <h2
            className="mb-6"
            style={{
              fontFamily: "var(--font-cormorant)",
              color: "#FFFFFF",
              fontSize: "clamp(32px, 5vw, 54px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              fontWeight: 400,
            }}
          >
            Find a funeral director
            <br />
            <em style={{ color: "#5E8B73" }}>you can trust.</em>
          </h2>

          <p
            className="mb-12 leading-relaxed max-w-md mx-auto"
            style={{ fontSize: "17px", color: "rgba(234,242,238,0.65)" }}
          >
            Search by postcode and compare prices, reviews, and services from
            verified funeral directors across the UK.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/search"
              className="inline-flex items-center gap-2.5 rounded-md px-10 py-4 font-medium text-[16px] hover:scale-[1.03] active:scale-[0.98] transition-transform min-h-[56px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1F2A]"
              style={{ background: "#5E8B73", color: "#FFFFFF" }}
            >
              Search funeral directors
            </Link>
          </div>

          <p className="text-xs mt-10" style={{ color: "rgba(234,242,238,0.35)" }}>
            No account needed · Free to use · Prices shown upfront
          </p>
        </div>
      </section>
    </div>
  );
}
