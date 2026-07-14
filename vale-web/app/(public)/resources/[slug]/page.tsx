import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

/* ─── Design tokens ──────────────────────────────────────────── */
const DM       = "var(--font-dm-sans), -apple-system, sans-serif";
const PURPLE   = "#4F34C4";
const DARK     = "#100B20";
const BODY     = "#4A415E";
const MUTED    = "#9E96B2";
const BORDER   = "#D5D0E4";
const BG_OFF   = "#FDFCFE";
const LAVENDER = "#E3DFFF";
const CREAM    = "#FEF1C6";
const PUR_GRAY = "#EAE7F2";
const PERIW    = "#CFC8FF";
const GOLD     = "#AC7E08";
const DRK_PUR  = "#342C46";

/* ─── Page data ──────────────────────────────────────────────── */
const PAGES: Record<string, {
  title: string;
  subtitle: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  heroBg: string;
  paragraphs: string[];
  suits: string[];
  doesNotSuit: string[];
  typical_cost: string;
  searchHref: string;
  searchLabel: string;
}> = {
  "direct-cremation": {
    title: "What is a direct cremation?",
    subtitle: "The simplest, most affordable form of funeral — cremation without a formal service.",
    tag: "Direct Cremation",
    tagBg: LAVENDER,
    tagColor: PURPLE,
    heroBg: LAVENDER,
    paragraphs: [
      "Direct cremation is the simplest and most affordable type of funeral. Your loved one is collected, cared for, and cremated — without a formal funeral service beforehand. The ashes are then returned to you, usually within a few days to a couple of weeks.",
      "There's no coffin parade, no chapel booking, no set time you have to be somewhere. Just a quiet, dignified process — and then the ashes, which you can do anything with. Scatter them somewhere meaningful, keep them at home, have them made into something lasting. That part is entirely yours.",
      "It's become significantly more common in the UK over the past decade. Around one in three families now choose direct cremation — not because they care less, but because they want a farewell that fits their loved one, on their own terms and timeline.",
    ],
    suits: [
      "Families managing costs carefully — direct cremation is typically the most affordable option",
      "Those who plan to hold a separate celebration of life at a later date",
      "People whose loved one wanted something simple and low-fuss",
      "Families spread across different locations who need time to gather",
    ],
    doesNotSuit: [
      "Those who want a traditional gathering at the time of cremation",
      "Families with religious requirements for a graveside or chapel ceremony",
    ],
    typical_cost: "£995 – £1,995",
    searchHref: "/search?type=direct-cremation",
    searchLabel: "Find direct cremation providers near you",
  },
  "direct-burial": {
    title: "What is a direct burial?",
    subtitle: "Burial without a ceremony — a private, straightforward choice with a permanent resting place.",
    tag: "Direct Burial",
    tagBg: CREAM,
    tagColor: GOLD,
    heroBg: CREAM,
    paragraphs: [
      "Direct burial follows the same idea as direct cremation — your loved one is buried without a formal funeral service taking place first. The burial itself is carried out quietly, without a ceremony at the graveside or chapel.",
      "It's less common than direct cremation and not offered by every provider, but for families with strong cultural or religious reasons to bury rather than cremate — or those who simply want a permanent resting place — it offers a simpler, lower-cost route than a traditional burial.",
      "You still get a grave to visit. The difference is that the burial happens privately, without a formal gathering. Many families then hold their own memorial separately, when they're ready.",
    ],
    suits: [
      "Families with faith or cultural reasons to bury rather than cremate",
      "Those who want a permanent grave to visit without the formality of a ceremony",
      "People planning a separate memorial at a later date",
      "Families managing costs while still wanting a burial",
    ],
    doesNotSuit: [
      "Those who want family and friends present at the burial",
      "Families who value the ritual of a formal funeral service",
    ],
    typical_cost: "£1,500 – £3,500",
    searchHref: "/search?type=direct-burial",
    searchLabel: "Find direct burial providers near you",
  },
  "traditional-cremation": {
    title: "What is a traditional cremation?",
    subtitle: "A full funeral service and farewell, followed by cremation.",
    tag: "Traditional Cremation",
    tagBg: PUR_GRAY,
    tagColor: DRK_PUR,
    heroBg: PUR_GRAY,
    paragraphs: [
      "A traditional cremation is what most people picture when they think of a funeral. There's a service — usually held at a crematorium chapel, a church, or another venue — where family and friends gather to say goodbye. The cremation takes place after the service, and the ashes are returned to the family.",
      "It follows a familiar shape: a hearse, a coffin, a gathering, words spoken, music played. That structure exists for a reason — it gives people somewhere to be and something to do at a moment when everything feels unmoored.",
      "Traditional cremation is the most common type of funeral in the UK, and for good reason. It's flexible — you can hold the service in a place that meant something to your loved one, choose music they loved, and invite the people who mattered to them.",
    ],
    suits: [
      "Families who want a proper gathering and a moment to mark the death together",
      "Those who value the ritual and structure of a formal service",
      "People who want the flexibility to personalise the ceremony",
      "Families whose loved one had a preference for cremation over burial",
    ],
    doesNotSuit: [
      "Those on a tight budget — traditional funerals are significantly more expensive than direct cremation",
      "Families who prefer a private, low-key farewell",
    ],
    typical_cost: "£3,000 – £5,500",
    searchHref: "/search?type=traditional-cremation",
    searchLabel: "Find traditional cremation providers near you",
  },
  "traditional-burial": {
    title: "What is a traditional burial?",
    subtitle: "A full funeral service with burial in a cemetery or churchyard — the oldest and most recognisable form of funeral.",
    tag: "Traditional Burial",
    tagBg: PERIW,
    tagColor: PURPLE,
    heroBg: PERIW,
    paragraphs: [
      "A traditional burial is the oldest and most recognisable form of funeral. There's a service — at a church, crematorium chapel, or other venue — followed by burial in a cemetery or churchyard. The coffin is lowered into the ground, often with family present.",
      "For many families it's what feels right without needing to explain why. The permanence of a burial, a place to return to, a headstone to visit — these things matter in ways that are hard to put into words.",
      "Traditional burial tends to be the most expensive type of funeral, largely because of burial plot costs, which vary enormously by location. In London, a plot can cost several thousand pounds on its own. In rural areas, it may be far more affordable.",
    ],
    suits: [
      "Families who want a permanent resting place to visit",
      "Those with faith or cultural traditions centred on burial",
      "People who find meaning in ritual, ceremony, and a formal goodbye",
      "Families whose loved one had a strong preference for burial",
    ],
    doesNotSuit: [
      "Those managing costs carefully — traditional burial is typically the most expensive option",
      "Families without a local cemetery or churchyard connection",
    ],
    typical_cost: "£4,500 – £9,000+",
    searchHref: "/search?type=traditional-burial",
    searchLabel: "Find traditional burial providers near you",
  },
};

/* ─── Page ───────────────────────────────────────────────────── */
export default async function ResourceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) notFound();

  const {
    title, subtitle, tag, tagBg, tagColor, heroBg,
    paragraphs, suits, doesNotSuit, typical_cost,
    searchHref, searchLabel,
  } = page;

  return (
    <div style={{ fontFamily: DM, background: "#ffffff", color: DARK }}>

      {/* ── Hero ── */}
      <section style={{ background: heroBg, paddingTop: "64px", paddingBottom: "64px" }}>
        <div className="max-w-[1366px] mx-auto px-4 sm:px-7">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 mb-8 text-[13px] font-medium transition-opacity hover:opacity-70"
            style={{ color: tagColor }}
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            All resources
          </Link>
          <span
            className="inline-block mb-4 px-3 py-1 rounded-full text-[12px] font-semibold tracking-wide uppercase"
            style={{ background: "rgba(255,255,255,0.6)", color: tagColor }}
          >
            {tag}
          </span>
          <h1
            className="mb-4"
            style={{
              fontSize: "clamp(28px,4vw,48px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: DARK,
              maxWidth: "18ch",
            }}
          >
            {title}
          </h1>
          <p style={{ fontSize: "clamp(16px,1.4vw,18px)", color: BODY, maxWidth: "54ch", lineHeight: 1.65 }}>
            {subtitle}
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1366px] mx-auto px-4 sm:px-7">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">

            {/* Main content */}
            <div className="md:col-span-2 space-y-5">
              {paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: "17px", lineHeight: 1.75, color: BODY }}>{p}</p>
              ))}

              {/* Suits / Doesn't suit */}
              <div className="mt-10 grid sm:grid-cols-2 gap-5">
                <div
                  className="rounded-2xl p-6"
                  style={{ background: BG_OFF, border: `1px solid ${BORDER}` }}
                >
                  <p className="mb-4 text-[13px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>
                    It suits families who…
                  </p>
                  <ul className="space-y-3">
                    {suits.map((s) => (
                      <li key={s} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: PURPLE }} aria-hidden="true" />
                        <span style={{ fontSize: "14px", color: BODY, lineHeight: 1.55 }}>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="rounded-2xl p-6"
                  style={{ background: BG_OFF, border: `1px solid ${BORDER}` }}
                >
                  <p className="mb-4 text-[13px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>
                    May not suit if you…
                  </p>
                  <ul className="space-y-3">
                    {doesNotSuit.map((s) => (
                      <li key={s} className="flex items-start gap-2.5">
                        <span className="w-4 h-4 mt-0.5 flex-shrink-0 rounded-full border-2 flex-none" style={{ borderColor: BORDER }} aria-hidden="true" />
                        <span style={{ fontSize: "14px", color: BODY, lineHeight: 1.55 }}>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Typical cost */}
              <div
                className="rounded-2xl p-6"
                style={{ background: tagBg, border: `1px solid ${BORDER}` }}
              >
                <p className="mb-1 text-[12px] font-semibold uppercase tracking-wider" style={{ color: tagColor }}>
                  Typical UK cost
                </p>
                <p
                  style={{
                    fontSize: "clamp(28px,3vw,36px)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: DARK,
                    lineHeight: 1.1,
                    marginBottom: "6px",
                  }}
                >
                  {typical_cost}
                </p>
                <p style={{ fontSize: "12px", color: BODY }}>Vale Funeral Price Index Q1 2026. Regional prices vary.</p>
              </div>

              {/* CTA */}
              <div
                className="rounded-2xl p-6"
                style={{ border: `1px solid ${BORDER}` }}
              >
                <p className="mb-1 text-[13px] font-semibold" style={{ color: DARK }}>
                  Ready to compare prices?
                </p>
                <p className="mb-5" style={{ fontSize: "13px", color: BODY, lineHeight: 1.55 }}>
                  Compare verified providers near you with full prices shown upfront.
                </p>
                <Link
                  href={searchHref}
                  className="inline-flex items-center justify-center gap-2 w-full min-h-[44px] rounded-lg text-[14px] font-bold transition-colors duration-200"
                  style={{ background: PURPLE, color: "#ffffff" }}
                >
                  {searchLabel}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Back to resources */}
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 text-[13px] font-medium transition-opacity hover:opacity-70"
                style={{ color: MUTED }}
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                Back to all resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related CTA ── */}
      <section className="py-16" style={{ background: BG_OFF, borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-[1366px] mx-auto px-4 sm:px-7 text-center">
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-wider" style={{ color: MUTED }}>
            Free advice
          </p>
          <h2
            className="mb-4"
            style={{ fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 700, letterSpacing: "-0.02em", color: DARK }}
          >
            Not sure which option is right?
          </h2>
          <p className="mb-8 mx-auto" style={{ fontSize: "16px", color: BODY, maxWidth: "48ch", lineHeight: 1.65 }}>
            Our care advisors are available every day — no pressure, no sales. Just honest guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-7 rounded-lg text-[14px] font-bold transition-colors duration-200"
              style={{ background: PURPLE, color: "#ffffff" }}
            >
              Search providers
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center justify-center min-h-[44px] px-7 rounded-lg border text-[14px] font-semibold transition-colors duration-200"
              style={{ borderColor: BORDER, color: DRK_PUR }}
            >
              Read our guides
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}
