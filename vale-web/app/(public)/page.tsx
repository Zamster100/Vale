import Link from "next/link";
import { CheckCircle, Star, BookOpen, ChevronRight } from "lucide-react";
import VideoBackground from "@/components/VideoBackground";
import HeroSearch from "@/components/HeroSearch";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

const VALUE_PROPS = [
  {
    number: "01",
    title: "Real prices, upfront",
    body: "See actual costs before you commit. No vague estimates — just honest, itemised pricing from every director we list.",
    detail: "All prices include VAT · CMA transparency compliant",
  },
  {
    number: "02",
    title: "Verified reviews",
    body: "Every review is from a family who actually used the service. No anonymous posts, no unverified ratings.",
    detail: "Reviews moderated and linked to confirmed bookings",
  },
  {
    number: "03",
    title: "Regulated & verified",
    body: "Every funeral director is independently verified before listing. Many hold NAFD or SAIF membership.",
    detail: "Re-verified annually so standards stay high",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "VALE helped us find a funeral director within hours. Seeing the prices upfront meant we could make a decision without the added stress of unexpected costs. I can't recommend it enough.",
    author: "Sarah M.",
    role: "Arranged her father's funeral, March 2026",
    featured: true,
  },
  {
    quote:
      "We were completely overwhelmed. VALE made it simple to compare our options and find someone who truly understood what we wanted for our mum.",
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
    <div style={{ background: "#F5F1E8" }}>

      {/* ══════════════════════════════════════════════════════════
          HERO — video background + centered copy
      ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen w-full overflow-hidden" style={{ background: "#F5F1E8" }}>

        {/* Video layer — starts 300px from top, fills rest */}
        <div className="absolute inset-0 z-0" style={{ top: "300px" }}>
          <VideoBackground src={VIDEO_URL} />
          {/* Gradient overlays — fade video into background at top and bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, #F5F1E8 0%, transparent 30%, transparent 70%, #F5F1E8 100%)",
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
              border: "0.5px solid rgba(143,160,176,0.5)",
              background: "rgba(197,210,220,0.3)",
              color: "#8A5FAA",
            }}
          >
            <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
            Verified UK funeral directors
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-rise max-w-5xl font-normal"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(44px, 8vw, 96px)",
              lineHeight: 0.95,
              letterSpacing: "-2.46px",
              color: "#5D3A7A",
            }}
          >
            Choose with care.{" "}
            <em style={{ color: "#8FA0B0", fontStyle: "italic" }}>
              Move forward with confidence.
            </em>
          </h1>

          {/* Search box */}
          <div className="animate-fade-rise-delay w-full max-w-2xl mt-12 px-2 sm:px-0">
            <HeroSearch />
          </div>

          <p className="animate-fade-rise-delay-2 mt-6 text-xs opacity-60" style={{ color: "#8FA0B0" }}>
            No account needed · Prices shown upfront · CMA compliant
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          VALUE PROPS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ background: "#F5F1E8" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
            <div>
              <div className="w-10 h-[2px] rounded-full mb-6" style={{ background: "#8A5FAA" }} aria-hidden="true" />
              <h2
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "clamp(30px, 4vw, 44px)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.025em",
                  fontWeight: 400,
                  color: "#5D3A7A",
                }}
              >
                Built around<br className="hidden sm:block" /> the families we serve
              </h2>
            </div>
            <p className="text-sm leading-relaxed max-w-xs md:text-right md:pb-1" style={{ color: "#8FA0B0" }}>
              Every feature exists because a real family told us they needed it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:items-start">
            {VALUE_PROPS.map(({ number, title, body, detail }, i) => (
              <div
                key={title}
                className="group rounded-2xl p-8 transition-all duration-300"
                style={{
                  background: "white",
                  border: "0.5px solid rgba(143,160,176,0.3)",
                  marginTop: i === 1 ? "32px" : undefined,
                }}
              >
                <div className="flex items-start justify-between mb-8">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(197,210,220,0.4)" }}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ background: "#8A5FAA" }} />
                  </div>
                  <span
                    className="font-extrabold select-none"
                    style={{ fontSize: "52px", lineHeight: 1, letterSpacing: "-0.05em", color: "rgba(143,160,176,0.25)" }}
                    aria-hidden="true"
                  >
                    {number}
                  </span>
                </div>

                <h3
                  className="mb-3"
                  style={{ fontSize: "20px", fontWeight: 500, lineHeight: 1.3, color: "#5D3A7A" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed mb-7" style={{ color: "#3F5E2C" }}>{body}</p>

                <div className="pt-5" style={{ borderTop: "0.5px solid rgba(143,160,176,0.3)" }}>
                  <p className="text-xs font-medium" style={{ color: "#8A5FAA" }}>{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════ */}
      <section
        className="py-24 md:py-32"
        style={{ background: "#C5D2DC", borderTop: "0.5px solid rgba(143,160,176,0.3)", borderBottom: "0.5px solid rgba(143,160,176,0.3)" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <div className="w-10 h-[2px] rounded-full mb-6" style={{ background: "#8A5FAA" }} aria-hidden="true" />
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                fontWeight: 400,
                color: "#5D3A7A",
              }}
            >
              Trusted at life&apos;s<br className="hidden sm:block" /> hardest moments
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1.45fr_1fr] gap-5 items-start">
            {TESTIMONIALS.filter((t) => t.featured).map(({ quote, author, role }) => (
              <figure
                key={author}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{ background: "white", borderLeft: "3px solid #8A5FAA", border: "0.5px solid rgba(143,160,176,0.3)", borderLeftWidth: "3px", borderLeftColor: "#8A5FAA" }}
              >
                <div className="p-9 flex flex-col flex-1">
                  <div className="flex gap-0.5 mb-5" aria-label="5 stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4" style={{ color: "#8A5FAA", fill: "#8A5FAA" }} aria-hidden="true" />
                    ))}
                  </div>
                  <div
                    className="mb-2 select-none"
                    style={{ fontSize: "80px", fontFamily: "Georgia, serif", lineHeight: 0.75, color: "#8A5FAA" }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>
                  <blockquote className="flex-1">
                    <p className="italic leading-relaxed" style={{ fontSize: "18px", lineHeight: 1.75, color: "#3F5E2C" }}>
                      {quote}
                    </p>
                  </blockquote>
                  <figcaption className="mt-8 pt-6 flex items-center gap-4" style={{ borderTop: "0.5px solid rgba(143,160,176,0.3)" }}>
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-medium shrink-0"
                      style={{ background: "rgba(197,210,220,0.5)", color: "#5D3A7A" }}
                      aria-hidden="true"
                    >
                      {author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{ color: "#5D3A7A" }}>{author}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#8FA0B0" }}>{role}</p>
                    </div>
                  </figcaption>
                </div>
              </figure>
            ))}

            <div className="flex flex-col gap-5">
              {TESTIMONIALS.filter((t) => !t.featured).map(({ quote, author, role }) => (
                <figure
                  key={author}
                  className="rounded-2xl p-7 transition-all duration-200"
                  style={{ background: "white", border: "0.5px solid rgba(143,160,176,0.3)" }}
                >
                  <div className="flex gap-0.5 mb-4" aria-label="5 stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5" style={{ color: "#8A5FAA", fill: "#8A5FAA" }} aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote>
                    <p className="text-sm leading-relaxed italic" style={{ color: "#3F5E2C" }}>
                      &ldquo;{quote}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-5 pt-4 flex items-center gap-3" style={{ borderTop: "0.5px solid rgba(143,160,176,0.3)" }}>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
                      style={{ background: "rgba(197,210,220,0.5)", color: "#5D3A7A" }}
                      aria-hidden="true"
                    >
                      {author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#5D3A7A" }}>{author}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#8FA0B0" }}>{role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          VAULT PROMO
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24" style={{ background: "#F5F1E8" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="rounded-3xl relative overflow-hidden px-8 py-14 md:px-16 md:py-16"
            style={{ background: "#5D3A7A" }}
          >
            {/* Subtle dot pattern */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
              aria-hidden="true"
            />
            <div className="relative grid md:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-4" style={{ color: "#C5D2DC" }}>
                  VALE Vault — Free pre-planning
                </p>
                <h2
                  className="mb-5"
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    color: "white",
                    fontSize: "clamp(26px, 3.5vw, 40px)",
                    lineHeight: 1.18,
                    letterSpacing: "-0.025em",
                    fontWeight: 400,
                  }}
                >
                  The kindest thing you can do
                  <br className="hidden md:block" /> for the people you love.
                </h2>
                <p className="leading-relaxed max-w-lg" style={{ fontSize: "15px", color: "rgba(197,210,220,0.85)" }}>
                  Record your wishes — service type, music, readings, practical
                  details. Share with your family so they never have to guess
                  when it matters most.
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-start md:items-center gap-3">
                <Link
                  href="/vault/login"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-medium text-[15px] hover:scale-[1.03] active:scale-[0.98] transition-transform min-h-[52px] whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                  style={{ background: "#5AAE55", color: "white" }}
                >
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  Start your Vault — it&apos;s free
                </Link>
                <p className="text-xs opacity-70" style={{ color: "#C5D2DC" }}>
                  Private · Secure · Takes 10 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════ */}
      <section className="py-28 md:py-36 text-center" style={{ background: "#F5F1E8" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="w-12 h-[2px] rounded-full mx-auto mb-10" style={{ background: "#8A5FAA" }} aria-hidden="true" />
          <h2
            className="mb-6"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              color: "#5D3A7A",
              fontSize: "clamp(32px, 5vw, 54px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              fontWeight: 400,
            }}
          >
            Find a funeral director
            <br />
            <em style={{ color: "#8A5FAA" }}>you can trust.</em>
          </h2>

          <p
            className="mb-12 leading-relaxed max-w-md mx-auto"
            style={{ fontSize: "17px", color: "#8FA0B0" }}
          >
            Search by postcode and compare prices, reviews, and services from
            verified funeral directors across the UK.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/search"
              className="inline-flex items-center gap-2.5 rounded-xl px-10 py-4 font-medium text-[16px] text-white hover:scale-[1.03] active:scale-[0.98] transition-transform min-h-[56px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA] focus-visible:ring-offset-2"
              style={{ background: "#5AAE55" }}
            >
              Search funeral directors
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center gap-2.5 rounded-xl px-10 py-4 font-medium text-[16px] transition-colors min-h-[56px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA] focus-visible:ring-offset-2"
              style={{
                border: "0.5px solid rgba(143,160,176,0.5)",
                color: "#5D3A7A",
                background: "rgba(197,210,220,0.25)",
              }}
            >
              Browse all directors
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <p className="text-xs mt-10 opacity-50" style={{ color: "#8FA0B0" }}>
            No account needed · Free to use · Prices shown upfront
          </p>
        </div>
      </section>
    </div>
  );
}
