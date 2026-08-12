import BlogLayout from "@/components/blog/BlogLayout";

const DARK    = "#100B20";
const MED     = "#4A415E";
const LAV     = "#E3DFFF";
const LAV_BTN = "#4F34C4";
const PINK    = "#CFC8FF";
const MINT    = "#D3FCD2";
const YEL     = "#FCFBD2";
const BDR     = "#D5D0E4";

const H2: React.CSSProperties = {
  fontSize: "22px", fontWeight: 700, color: DARK,
  marginTop: "40px", marginBottom: "12px", lineHeight: 1.25,
};
const H3: React.CSSProperties = {
  fontSize: "17px", fontWeight: 700, color: DARK,
  marginTop: "24px", marginBottom: "8px", lineHeight: 1.3,
};
const P: React.CSSProperties = {
  fontSize: "15px", color: MED, lineHeight: 1.8, marginBottom: "16px",
};
const STRONG: React.CSSProperties = { fontWeight: 700, color: DARK };
const SCROLL_OFFSET: React.CSSProperties = { scrollMarginTop: "96px" };

const TOC = [
  { href: "#initial-considerations", label: "Initial Considerations" },
  { href: "#communicating-details",  label: "Communicating the Details" },
  { href: "#personalizing",          label: "Personalizing the Service" },
  { href: "#order-of-service",       label: "Crafting the Order of Service" },
  { href: "#music-readings",         label: "Music, Readings, and Eulogies" },
  { href: "#wake",                   label: "The Wake or Funeral Reception" },
];

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 mb-3">
      <span
        className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0"
        style={{ background: LAV_BTN }}
        aria-hidden="true"
      />
      <span style={{ fontSize: "14px", color: MED, lineHeight: 1.7 }}>{children}</span>
    </li>
  );
}

export default function PlanningFuneralPage() {
  return (
    <BlogLayout
      title="A Complete Guide to Planning a Meaningful Funeral"
      category="Guide"
      categoryBg={LAV}
      categoryText={LAV_BTN}
      author="Vale Family Advisors"
      date="3 June 2026"
      readTime="10 min"
      heroColor={PINK}
      heroImage="/guides/planning-a-meaningful-funeral.png"
      tocLinks={TOC}
    >

      {/* ── Intro ── */}
      <p style={P}>
        Arranging a funeral while grieving is a challenging task, and it is completely normal to feel overwhelmed by the
        number of decisions involved. Please know that you do not have to navigate this alone — your funeral director is
        there to act as a professional guide, handling the logistics and paperwork so you can focus on honouring your
        loved one.
      </p>
      <p style={P}>
        While you don&apos;t need to have every detail decided before your first meeting, having a rough idea of your
        preferences will help the process run more smoothly.
      </p>

      {/* ── Section 1 ── */}
      <section id="initial-considerations" style={SCROLL_OFFSET}>
        <h2 style={H2}>Initial Considerations</h2>
        <p style={P}>
          When you begin planning, consider these foundational questions to help shape the service:
        </p>

        <div className="rounded-xl p-5 mb-6" style={{ background: LAV, border: `1px solid #B4B6F0` }}>
          <ul className="space-y-3">
            {[
              { label: "Disposition", desc: "Would you prefer a cremation or a burial?" },
              { label: "Tone", desc: "Do you want a religious ceremony, a non-religious service, or something secular that reflects their specific values?" },
              { label: "Budget", desc: "Establishing a budget early on helps you prioritise which elements are most important to you." },
              { label: "Personalisation", desc: "Think about how you can best celebrate their unique life. Remember, your choices can be adjusted as you go — these decisions are not set in stone until the day of the service." },
            ].map(({ label, desc }) => (
              <li key={label} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                  style={{ background: LAV_BTN, color: "#FFFFFF" }}
                  aria-hidden="true"
                >
                  ?
                </div>
                <p style={{ fontSize: "14px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
                  <span style={STRONG}>{label}: </span>{desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Section 2 ── */}
      <section id="communicating-details" style={SCROLL_OFFSET}>
        <h2 style={H2}>Communicating the Details</h2>
        <p style={P}>
          There is no &ldquo;correct&rdquo; way to invite people to a funeral. Modern technology has changed how we
          share information:
        </p>
        <ul className="mb-6" style={{ listStyle: "none", padding: 0 }}>
          <BulletItem>
            <span style={STRONG}>Obituaries and Notices: </span>Publishing an online obituary or death notice is the
            most common way to share the date, time, and venue.
          </BulletItem>
          <BulletItem>
            <span style={STRONG}>Live-Streaming: </span>If family and friends are unable to travel, many funeral homes
            now offer live-streaming services, allowing mourners to participate and pay their respects from afar.
          </BulletItem>
          <BulletItem>
            <span style={STRONG}>Dress Codes: </span>If you would like guests to wear specific colours (such as bright
            clothing to celebrate a life) or meaningful emblems, this can be clearly communicated via the online
            obituary.
          </BulletItem>
        </ul>
      </section>

      {/* ── Section 3 ── */}
      <section id="personalizing" style={SCROLL_OFFSET}>
        <h2 style={H2}>Personalizing the Service</h2>
        <p style={P}>
          A funeral is a time for reflection, thanksgiving, and celebration. Consider these ways to make the day more
          personal:
        </p>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            {
              title: "Ceremonial Gestures",
              body: "If the deceased had a particular profession or served in the armed forces, colleagues may wish to wear uniforms or perform a guard of honour.",
              color: LAV,
            },
            {
              title: "Pallbearers",
              body: "You may ask close friends or family to serve as pallbearers, carrying the coffin to its final resting place.",
              color: MINT,
            },
            {
              title: "The Officiant",
              body: "You can choose a religious minister, a professional funeral celebrant, or even lead the service yourself if you feel comfortable doing so.",
              color: PINK,
            },
          ].map(({ title, body, color }) => (
            <div key={title} className="rounded-xl p-4" style={{ background: color }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "6px" }}>{title}</p>
              <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 4 ── */}
      <section id="order-of-service" style={SCROLL_OFFSET}>
        <h2 style={H2}>Crafting the Order of Service</h2>
        <p style={P}>
          The &ldquo;Order of Service&rdquo; outlines the structure of the day. If you choose a religious funeral, your
          funeral director can liaise with a local minister to ensure any specific prayers or rites are included. If you
          prefer a non-religious or &ldquo;hybrid&rdquo; approach, many ministers are happy to discuss incorporating
          special, personal requests.
        </p>
      </section>

      {/* ── Section 5 ── */}
      <section id="music-readings" style={SCROLL_OFFSET}>
        <h2 style={H2}>Music, Readings, and Eulogies</h2>
        <p style={P}>
          These elements are the heart of a funeral, allowing the personality of the deceased to shine through.
        </p>

        <div className="space-y-4 mb-6">
          {[
            {
              title: "Music",
              body: "From traditional hymns and classical pieces to favourite chart hits or lighthearted songs, music sets the mood. It is common to select specific tracks for when the coffin enters and leaves the venue.",
              color: YEL,
            },
            {
              title: "Readings and Poems",
              body: "Selecting a poem or a meaningful passage — whether from religious scripture, Shakespeare, or contemporary literature — is a wonderful way to involve friends and family members in the service.",
              color: LAV,
            },
            {
              title: "The Eulogy",
              body: "The eulogy is a personal speech that honours the life and character of your loved one. While it can feel daunting to write and deliver, it is perhaps the most touching part of the ceremony. Don't be afraid to ask for help with structure and phrasing if you need it.",
              color: MINT,
            },
          ].map(({ title, body, color }) => (
            <div key={title} className="rounded-xl p-5 flex gap-4" style={{ background: color }}>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: DARK, marginBottom: "6px" }}>{title}</p>
                <p style={{ fontSize: "14px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 6 ── */}
      <section id="wake" style={SCROLL_OFFSET}>
        <h2 style={H2}>The Wake or Funeral Reception</h2>
        <p style={P}>
          Most funerals conclude with a wake or reception, providing a space for family and friends to gather, share
          memories, and support one another. If the committal is private (for example, at a graveside), the reception
          often serves as the main gathering point for the wider circle of friends and extended family.
        </p>
      </section>

      {/* ── Note of Support ── */}
      <div className="mt-10 rounded-xl p-6" style={{ background: PINK, border: "1px solid #B5AAFC" }}>
        <h3 style={{ ...H3, marginTop: 0, marginBottom: "8px" }}>A Note of Support</h3>
        <p style={{ fontSize: "14px", color: MED, lineHeight: 1.75, marginBottom: 0 }}>
          If you are planning a funeral today, please accept our deepest condolences. By taking these steps one at a
          time, you are creating a fitting tribute that reflects the love and respect you hold for your loved one.
        </p>
      </div>

    </BlogLayout>
  );
}
