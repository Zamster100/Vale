import Link from "next/link";
import { Target, BarChart2, Star } from "lucide-react";

const FEATURES = [
  {
    icon: Target,
    title: "Enquiries from families who've compared",
    body: "Every family who contacts you through Vale has already seen your pricing, read your reviews, and chosen to reach out. Not cold leads — warm, informed, ready families.",
  },
  {
    icon: BarChart2,
    title: "A dashboard built for your business",
    body: "See how families find you, how your pricing compares to local providers, and how your reviews are performing — in one place, updated in real time.",
  },
  {
    icon: Star,
    title: "Reviews you can trust — and so can families",
    body: "Vale only collects reviews from families who arranged through us. Every review is verified. Your reputation, built honestly, becomes your strongest sales tool.",
  },
];

export default function ForFuneralDirectors() {
  return (
    <div style={{ background: "#FFFFFF" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-6 md:px-10 pt-20 pb-24 md:pt-28 md:pb-32"
        style={{ background: "#FCFBD2" }}
      >
        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(128,96,0,0.09) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-8">
            <span aria-hidden className="inline-block w-6 h-px" style={{ background: "#6B6DE8" }} />
            <span
              className="text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: "#6B6DE8" }}
            >
              For funeral directors
            </span>
          </div>

          {/* Headline */}
          <h1
            className="mb-6 max-w-3xl"
            style={{
              fontFamily: "var(--font-open-sans), sans-serif",
              fontSize: "clamp(36px, 5.5vw, 68px)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#1A1A2E",
            }}
          >
            Reach the families who are{" "}
            <em style={{ color: "#C45EC4", fontStyle: "italic" }}>
              already searching for you.
            </em>
          </h1>

          {/* Body */}
          <p
            className="max-w-xl mb-10 leading-relaxed"
            style={{ fontSize: "16px", color: "#5C5C7A" }}
          >
            Twenty-four thousand families search for a funeral director online every month.
            Vale puts your services in front of them — with your full pricing displayed,
            your reviews front and centre, and your values clear from the first click.
          </p>

          {/* CTA */}
          <Link
            href="/admin/signup"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-md font-medium text-[15px] transition-transform hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B6DE8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFBD2]"
            style={{ background: "#1A1A2E", color: "#FFFFFF" }}
          >
            List your service — it&apos;s free
          </Link>

          {/* Trust note */}
          <p className="mt-4 text-xs" style={{ color: "#9090A8" }}>
            No contract · No monthly fee · Cancel any time
          </p>
        </div>
      </section>

      {/* ── WHAT YOU GET ─────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">

          {/* Section label */}
          <div className="flex items-center gap-2.5 mb-12">
            <span aria-hidden className="inline-block w-6 h-px" style={{ background: "#6B6DE8" }} />
            <span
              className="text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: "#6B6DE8" }}
            >
              What you get on Vale
            </span>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex flex-col rounded-xl p-7"
                style={{ background: "#FFFFFF", border: "1px solid #E8E8F4" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 shrink-0"
                  style={{ background: "#D2D3FC" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#6B6DE8" }} aria-hidden="true" />
                </div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-open-sans), sans-serif",
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#1A1A2E",
                    lineHeight: 1.25,
                  }}
                >
                  {title}
                </h3>
                <p className="text-[13px] leading-[1.7]" style={{ color: "#5C5C7A" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div
            className="mt-10 rounded-xl px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{ background: "#D2D3FC", border: "1px solid #E8E8F4" }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-open-sans), sans-serif",
                  fontSize: "22px",
                  fontWeight: 400,
                  color: "#1A1A2E",
                  lineHeight: 1.2,
                  marginBottom: "4px",
                }}
              >
                Ready to list your service?
              </p>
              <p className="text-sm" style={{ color: "#5C5C7A" }}>
                Set up your profile in under 10 minutes. No commitment required.
              </p>
            </div>
            <Link
              href="/admin/signup"
              className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-medium text-[14px] text-white transition-transform hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B6DE8] focus-visible:ring-offset-2 whitespace-nowrap"
              style={{ background: "#1A1A2E" }}
            >
              List your service — it&apos;s free
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
