import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  PoundSterling,
  Shield,
  Star,
  BookOpen,
  ChevronRight,
  MapPin,
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────── */

const HERO_STATS = [
  { value: "10+", label: "Verified directors" },
  { value: "100+", label: "Family reviews" },
  { value: "4.9", label: "Average rating" },
];

const VALUE_PROPS = [
  {
    Icon: PoundSterling,
    number: "01",
    title: "Real prices, upfront",
    body: "See actual costs before you commit. No vague estimates — just honest, itemised pricing from every director we list.",
    detail: "All prices include VAT · CMA transparency compliant",
  },
  {
    Icon: Star,
    number: "02",
    title: "Verified reviews",
    body: "Every review is from a family who actually used the service. No anonymous posts, no unverified ratings.",
    detail: "Reviews moderated and linked to confirmed bookings",
  },
  {
    Icon: Shield,
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

/* ─── Page ───────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-[#1a3a52] relative"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 70% 55% at 72% -8%, rgba(212,165,116,0.13) 0%, transparent 65%)",
            "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "100% 100%, 30px 30px",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-36">
          <div className="grid lg:grid-cols-[1fr_360px] gap-16 items-center">

            {/* Left — copy */}
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 border border-white/15 bg-white/[0.07] text-[#d4a574] text-[11px] font-bold uppercase tracking-[0.13em] px-4 py-1.5 rounded-full mb-10">
                <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
                Verified UK funeral directors
              </div>

              {/* Gold rule */}
              <div className="w-14 h-[3px] bg-[#d4a574] rounded-full mb-8" aria-hidden="true" />

              {/* Headline */}
              <h1
                className="text-white mb-7 max-w-[540px]"
                style={{
                  fontSize: "clamp(44px, 6vw, 66px)",
                  lineHeight: 1.07,
                  letterSpacing: "-0.03em",
                  fontWeight: 800,
                  color: "white",
                }}
              >
                Compare
                <br />
                funeral prices.
                <br />
                <span className="text-[#d4a574]">Choose with</span>
                <br />
                <span className="text-[#d4a574]">confidence.</span>
              </h1>

              {/* Subheading */}
              <p
                className="text-[#b8cdd9] leading-relaxed mb-10 max-w-[420px]"
                style={{ fontSize: "17px" }}
              >
                Find funeral directors near you. See real prices upfront.
                No hidden fees — just honest choices at life&apos;s most
                important moment.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2.5 bg-[#d4a574] text-[#1a3a52] px-8 py-4 rounded-lg font-bold text-[15px] hover:bg-[#c29560] active:bg-[#b08550] transition-colors duration-200 min-h-[52px] shadow-lg shadow-[#d4a574]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a3a52]"
                >
                  Find a funeral director
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/vault/login"
                  className="inline-flex items-center gap-2.5 border border-white/25 text-white px-8 py-4 rounded-lg font-semibold text-[15px] hover:bg-white/10 active:bg-white/15 transition-colors duration-200 min-h-[52px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a3a52]"
                >
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  Plan ahead — free
                </Link>
              </div>

              <p className="text-[#b8cdd9] text-xs opacity-60 tracking-wide">
                No account needed · Prices shown upfront · CMA compliant
              </p>
            </div>

            {/* Right — stat panel (desktop only) */}
            <div className="hidden lg:block" aria-label="VALE at a glance">
              <div className="border border-white/[0.12] bg-white/[0.06] rounded-2xl p-8">
                <p className="text-[#d4a574] text-[10px] font-bold uppercase tracking-[0.15em] mb-8">
                  VALE at a glance
                </p>

                <div className="space-y-7 mb-8">
                  {HERO_STATS.map(({ value, label }) => (
                    <div key={label} className="flex items-baseline gap-3">
                      <span
                        className="text-white font-bold tabular-nums"
                        style={{ fontSize: "44px", lineHeight: 1, letterSpacing: "-0.03em" }}
                      >
                        {value}
                      </span>
                      <span className="text-[#b8cdd9] text-sm">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-6 space-y-3">
                  {[
                    "CMA compliant transparent pricing",
                    "NAFD & SAIF verified members",
                    "Independently audited reviews",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle
                        className="w-3.5 h-3.5 text-[#d4a574] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-[#b8cdd9] text-xs leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile stats strip */}
          <div className="lg:hidden mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
            {HERO_STATS.map(({ value, label }) => (
              <div key={label}>
                <p
                  className="text-white font-bold mb-0.5"
                  style={{ fontSize: "30px", lineHeight: 1, letterSpacing: "-0.025em" }}
                >
                  {value}
                </p>
                <p className="text-[#b8cdd9] text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          VALUE PROPS
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
            <div>
              <div className="w-10 h-[3px] bg-[#d4a574] rounded-full mb-6" aria-hidden="true" />
              <h2
                style={{
                  fontSize: "clamp(30px, 4vw, 44px)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.025em",
                }}
              >
                Built around<br className="hidden sm:block" /> the families we serve
              </h2>
            </div>
            <p className="text-[#6b7280] max-w-xs text-sm leading-relaxed md:text-right md:pb-1">
              Every feature exists because a real family told us they needed it.
            </p>
          </div>

          {/* Cards — middle is offset for visual dynamism */}
          <div className="grid md:grid-cols-3 gap-6 md:items-start">
            {VALUE_PROPS.map(({ Icon, number, title, body, detail }, i) => (
              <div
                key={title}
                className="group bg-white border border-[#e5e7eb] rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-[#d4a574]/50 transition-all duration-300"
                style={{ marginTop: i === 1 ? "32px" : undefined }}
              >
                {/* Icon + number row */}
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 bg-[#faf6f1] rounded-xl flex items-center justify-center group-hover:bg-[#1a3a52] transition-colors duration-300">
                    <Icon
                      className="w-7 h-7 text-[#d4a574]"
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    className="text-[#e5e7eb] font-extrabold select-none group-hover:text-[#d4a574]/20 transition-colors duration-300"
                    style={{ fontSize: "52px", lineHeight: 1, letterSpacing: "-0.05em" }}
                    aria-hidden="true"
                  >
                    {number}
                  </span>
                </div>

                <h3
                  className="text-[#1a3a52] mb-3"
                  style={{ fontSize: "20px", fontWeight: 700, lineHeight: 1.3 }}
                >
                  {title}
                </h3>
                <p className="text-[#6b7280] text-sm leading-relaxed mb-7">{body}</p>

                <div className="border-t border-[#f3f4f6] pt-5">
                  <p className="text-xs font-semibold text-[#d4a574]">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#faf6f1] border-y border-[#e5e7eb] py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <div className="mb-16">
            <div className="w-10 h-[3px] bg-[#d4a574] rounded-full mb-6" aria-hidden="true" />
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              Trusted at life&apos;s<br className="hidden sm:block" /> hardest moments
            </h2>
          </div>

          {/* Featured left + two stacked right */}
          <div className="grid lg:grid-cols-[1.45fr_1fr] gap-5 items-start">

            {/* Featured testimonial */}
            {TESTIMONIALS.filter((t) => t.featured).map(({ quote, author, role }) => (
              <figure
                key={author}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
                style={{ borderLeft: "4px solid #d4a574" }}
              >
                <div className="p-9 flex flex-col flex-1">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-5" aria-label="5 stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-4 h-4 text-[#d4a574] fill-[#d4a574]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Decorative quote mark */}
                  <div
                    className="text-[#d4a574] mb-2 select-none"
                    style={{
                      fontSize: "80px",
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      lineHeight: 0.75,
                      fontWeight: 700,
                    }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>

                  <blockquote className="flex-1">
                    <p
                      className="text-[#1a3a52] italic leading-relaxed"
                      style={{ fontSize: "18px", lineHeight: 1.75 }}
                    >
                      {quote}
                    </p>
                  </blockquote>

                  <figcaption className="mt-8 pt-6 border-t border-[#f3f4f6] flex items-center gap-4">
                    <div
                      aria-hidden="true"
                      className="w-11 h-11 rounded-full bg-[#faf6f1] border-2 border-[#d4a574]/30 flex items-center justify-center text-sm font-bold text-[#1a3a52] shrink-0"
                    >
                      {author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-[#1a3a52] text-sm">{author}</p>
                      <p className="text-xs text-[#6b7280] mt-0.5">{role}</p>
                    </div>
                  </figcaption>
                </div>
              </figure>
            ))}

            {/* Two smaller testimonials */}
            <div className="flex flex-col gap-5">
              {TESTIMONIALS.filter((t) => !t.featured).map(({ quote, author, role }) => (
                <figure
                  key={author}
                  className="bg-white rounded-2xl p-7 shadow-sm border border-[#e5e7eb] hover:shadow-md hover:border-[#d4a574]/30 transition-all duration-200"
                >
                  <div className="flex gap-0.5 mb-4" aria-label="5 stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-3.5 h-3.5 text-[#d4a574] fill-[#d4a574]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote>
                    <p className="text-[#374151] text-sm leading-relaxed italic">
                      &ldquo;{quote}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-5 pt-4 border-t border-[#f3f4f6] flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      className="w-8 h-8 rounded-full bg-[#faf6f1] flex items-center justify-center text-xs font-bold text-[#1a3a52] shrink-0"
                    >
                      {author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">{author}</p>
                      <p className="text-xs text-[#6b7280] mt-0.5">{role}</p>
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
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="rounded-3xl relative overflow-hidden px-8 py-14 md:px-16 md:py-16"
            style={{
              background: "#1a3a52",
              backgroundImage: [
                "radial-gradient(ellipse 55% 80% at 105% 50%, rgba(212,165,116,0.11) 0%, transparent 60%)",
                "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
              ].join(", "),
              backgroundSize: "100% 100%, 28px 28px",
            }}
          >
            {/* Gold corner accent */}
            <div
              className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(212,165,116,0.18) 0%, transparent 70%)",
              }}
            />

            <div className="relative grid md:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <p className="text-[#d4a574] text-[10px] font-bold uppercase tracking-[0.16em] mb-4">
                  VALE Vault — Free pre-planning
                </p>
                <h2
                  className="mb-5"
                  style={{
                    color: "white",
                    fontSize: "clamp(26px, 3.5vw, 40px)",
                    lineHeight: 1.18,
                    letterSpacing: "-0.025em",
                    fontWeight: 800,
                  }}
                >
                  The kindest thing you can do
                  <br className="hidden md:block" /> for the people you love.
                </h2>
                <p
                  className="text-[#b8cdd9] leading-relaxed max-w-lg"
                  style={{ fontSize: "15px" }}
                >
                  Record your wishes — service type, music, readings, practical
                  details. Share with your family so they never have to guess
                  when it matters most.
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-start md:items-center gap-3">
                <Link
                  href="/vault/login"
                  className="inline-flex items-center gap-2.5 bg-[#d4a574] text-[#1a3a52] px-7 py-4 rounded-xl font-bold text-[15px] hover:bg-[#c29560] active:bg-[#b08550] transition-colors duration-200 min-h-[52px] whitespace-nowrap shadow-lg shadow-[#d4a574]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a3a52]"
                >
                  <BookOpen className="w-4 h-4" aria-hidden="true" />
                  Start your Vault — it&apos;s free
                </Link>
                <p className="text-[#b8cdd9] text-xs opacity-70">
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
      <section
        className="relative overflow-hidden py-28 md:py-36"
        style={{
          background: "#1a3a52",
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        {/* Vertical gold accent bars */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-[3px]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #d4a574 40%, #d4a574 60%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 bottom-0 w-[3px]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, #d4a574 40%, #d4a574 60%, transparent 100%)",
          }}
        />

        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <div className="w-12 h-[3px] bg-[#d4a574] rounded-full mx-auto mb-10" aria-hidden="true" />

          <h2
            className="mb-6"
            style={{
              color: "white",
              fontSize: "clamp(32px, 5vw, 54px)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              fontWeight: 800,
            }}
          >
            Find a funeral director
            <br />
            <span className="text-[#d4a574]">you can trust.</span>
          </h2>

          <p
            className="text-[#b8cdd9] mb-12 leading-relaxed max-w-md mx-auto"
            style={{ fontSize: "17px" }}
          >
            Search by postcode and compare prices, reviews, and services from
            verified funeral directors across the UK.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/search"
              className="inline-flex items-center gap-2.5 bg-[#d4a574] text-[#1a3a52] px-10 py-4 rounded-xl font-bold text-[16px] hover:bg-[#c29560] active:bg-[#b08550] transition-colors duration-200 min-h-[56px] shadow-xl shadow-[#d4a574]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a3a52]"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              Search funeral directors
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center gap-2.5 border border-white/25 text-white px-10 py-4 rounded-xl font-semibold text-[16px] hover:bg-white/10 active:bg-white/15 transition-colors duration-200 min-h-[56px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a3a52]"
            >
              Browse all directors
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <p className="text-[#b8cdd9] text-xs mt-10 opacity-50 tracking-wide">
            No account needed · Free to use · Prices shown upfront
          </p>
        </div>
      </section>

    </div>
  );
}
