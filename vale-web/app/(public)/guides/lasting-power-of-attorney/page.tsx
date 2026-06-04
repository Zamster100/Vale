import BlogLayout from "@/components/blog/BlogLayout";

const DARK    = "#1A1A2E";
const MED     = "#5C5C7A";
const LAV     = "#D2D3FC";
const LAV_BTN = "#6B6DE8";
const MINT    = "#D3FCD2";
const PINK    = "#FBD2FC";
const YEL     = "#FCFBD2";
const BDR     = "#E8E8F4";

const H2: React.CSSProperties = { fontSize: "22px", fontWeight: 700, color: DARK, marginTop: "40px", marginBottom: "12px", lineHeight: 1.25 };
const H3: React.CSSProperties = { fontSize: "16px", fontWeight: 700, color: DARK, marginTop: "20px", marginBottom: "8px", lineHeight: 1.3 };
const P:  React.CSSProperties = { fontSize: "15px", color: MED, lineHeight: 1.8, marginBottom: "16px" };
const SB: React.CSSProperties = { fontWeight: 700, color: DARK };
const SO: React.CSSProperties = { scrollMarginTop: "96px" };

const TOC = [
  { href: "#two-types",       label: "Understanding the Two Types of LPA" },
  { href: "#role",            label: "The Role of Your Attorney" },
  { href: "#how-to-create",  label: "How to Create an LPA" },
  { href: "#considerations",  label: "Important Considerations" },
];

export default function LastingPowerOfAttorneyPage() {
  return (
    <BlogLayout
      title="Lasting Power of Attorney (LPA): A Guide to Protecting Your Future"
      category="Guide"
      categoryBg={PINK}
      categoryText="#C45EC4"
      author="Vale Family Advisors"
      date="13 May 2026"
      readTime="7 min"
      heroColor={PINK}
      tocLinks={TOC}
    >
      <p style={P}>
        If you were to lose the &ldquo;mental capacity&rdquo; to make important decisions — perhaps due to a sudden
        illness or a life-limiting condition — a Lasting Power of Attorney (LPA) allows you to appoint someone you
        trust to act on your behalf. By setting this up in advance, you ensure that your affairs are managed by the
        person of your choice, rather than leaving those decisions to a court-appointed deputy.
      </p>

      {/* Two types */}
      <section id="two-types" style={SO}>
        <h2 style={H2}>Understanding the Two Types of LPA</h2>
        <p style={P}>You can choose to set up one or both of the following types of LPA:</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            {
              title: "Health and Welfare",
              desc: "Covers decisions regarding your daily routine, medical care, moving into a care home, and consenting to or refusing life-sustaining treatment.",
              note: "Can only be used once you have lost mental capacity.",
              color: LAV,
            },
            {
              title: "Property and Financial Affairs",
              desc: "Covers the management of bank accounts, paying bills, collecting benefits, and selling property.",
              note: "Can be used while you still have capacity, if you give your attorney permission.",
              color: MINT,
            },
          ].map(({ title, desc, note, color }) => (
            <div key={title} className="rounded-xl p-5 flex flex-col" style={{ background: color }}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: DARK, marginBottom: "8px" }}>{title}</p>
              <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: "10px", flex: 1 }}>{desc}</p>
              <p style={{ fontSize: "12px", color: MED, lineHeight: 1.5, marginBottom: 0, fontStyle: "italic", borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "8px" }}>{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Role */}
      <section id="role" style={SO}>
        <h2 style={H2}>The Role of Your Attorney</h2>
        <p style={P}>
          When someone agrees to be your attorney, they accept a position of significant legal responsibility. They are
          legally required to act in your best interests at all times.
        </p>
        <div className="rounded-xl p-5 mb-6" style={{ background: YEL, border: "1px solid #E8E080" }}>
          <p style={{ fontSize: "14px", color: MED, lineHeight: 1.75, marginBottom: 0 }}>
            It is vital to choose someone you trust implicitly. Before they take on this role, ensure they are aware
            of your personal values and any specific &ldquo;advance decisions&rdquo; (living wills) you have made
            regarding your medical care. This clarity helps avoid conflict and ensures your wishes are respected even
            if you are no longer able to communicate them.
          </p>
        </div>
      </section>

      {/* How to create */}
      <section id="how-to-create" style={SO}>
        <h2 style={H2}>How to Create an LPA</h2>
        <p style={P}>
          You must be 18 or over and have mental capacity when you create your LPA. The process varies by nation:
        </p>

        <div className="space-y-4 mb-6">
          {[
            {
              country: "England and Wales",
              details: [
                "Set up via the Office of the Public Guardian (OPG).",
                "Every LPA must be registered with the OPG before it can be used.",
                "Registration fee: £92 per document (£184 for both types) as of 2026.",
                "50% fee reduction if the donor's gross annual income is under £12,000. Fee exemption for those on means-tested benefits.",
              ],
              color: LAV,
            },
            {
              country: "Scotland",
              details: [
                "A Power of Attorney (PoA) document must generally be drafted with the involvement of a solicitor.",
                "Must be registered with the Office of the Public Guardian (Scotland).",
                "Registration fee: £99 (as of 1 April 2026), covering both continuing and welfare powers.",
              ],
              color: MINT,
            },
            {
              country: "Northern Ireland",
              details: [
                "Often referred to as an Enduring Power of Attorney (EPA).",
                "Consult with a qualified solicitor to ensure the document is drafted correctly.",
                "The Office of Care and Protection can provide additional guidance.",
              ],
              color: PINK,
            },
          ].map(({ country, details, color }) => (
            <div key={country} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${BDR}` }}>
              <div className="px-4 py-2.5" style={{ background: color }}>
                <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: 0 }}>{country}</p>
              </div>
              <div className="p-4" style={{ background: "#FAFAFA" }}>
                <ul className="space-y-1.5">
                  {details.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: LAV_BTN }} aria-hidden="true" />
                      <span style={{ fontSize: "13px", color: MED, lineHeight: 1.65 }}>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Considerations */}
      <section id="considerations" style={SO}>
        <h2 style={H2}>Important Considerations</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Flexibility", desc: "You can appoint more than one attorney, and you can substitute or remove attorneys at any time while you still have the capacity to do so." },
            { label: "Professional Help", desc: "While many people use the government's online tools to draft their own documents, others prefer the peace of mind that comes with professional legal advice. A solicitor can help ensure your LPA is robust and tailored to your specific family circumstances." },
          ].map(({ label, desc }) => (
            <div key={label} className="rounded-xl p-4 flex gap-3" style={{ background: "#FAFAFA", border: `1px solid ${BDR}` }}>
              <div className="w-2 shrink-0 rounded-full self-stretch" style={{ background: LAV_BTN }} aria-hidden="true" />
              <p style={{ fontSize: "14px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
                <span style={SB}>{label}: </span>{desc}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-5" style={{ background: LAV }}>
          <p style={{ fontSize: "14px", color: MED, lineHeight: 1.75, marginBottom: 0 }}>
            Establishing an LPA is one of the most proactive steps you can take for your future. It provides
            invaluable peace of mind for both you and your loved ones during difficult times.
          </p>
        </div>
      </section>
    </BlogLayout>
  );
}
