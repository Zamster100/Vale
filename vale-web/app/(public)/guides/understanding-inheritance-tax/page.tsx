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
  { href: "#thresholds",      label: "Understanding the Thresholds and Rates" },
  { href: "#who-pays",        label: "Who Is Responsible for Payment?" },
  { href: "#exemptions",      label: "Key Exemptions" },
  { href: "#how-to-calculate", label: "How to Calculate and Report IHT" },
  { href: "#deadlines",       label: "Deadlines and Payment Methods" },
  { href: "#how-to-pay",      label: "How to Make a Payment" },
];

export default function UnderstandingInheritanceTaxPage() {
  return (
    <BlogLayout
      title="A Guide to Understanding Inheritance Tax"
      category="Explainer"
      categoryBg={YEL}
      categoryText="#806000"
      author="Vale Family Advisors"
      date="16 May 2026"
      readTime="8 min"
      heroColor={MINT}
      tocLinks={TOC}
    >
      <p style={P}>
        Inheritance Tax (IHT) is a tax levied on the estate (the total value of money, property, and possessions) of
        a person who has passed away. While the topic can seem complex, this guide breaks down the essential rules and
        procedures you need to be aware of when managing an estate.
      </p>

      {/* Thresholds */}
      <section id="thresholds" style={SO}>
        <h2 style={H2}>Understanding the Thresholds and Rates</h2>
        <p style={P}>The amount of tax owed depends on the total value of the estate.</p>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            { stat: "£325,000", label: "Nil-Rate Band", desc: "Standard threshold — estates below this generally pay no IHT.", color: MINT },
            { stat: "40%",      label: "Standard Rate",  desc: "Applied to the portion of the estate above the £325,000 threshold.", color: PINK },
            { stat: "36%",      label: "Reduced Rate",   desc: "If at least 10% of the net estate is left to a registered charity.", color: YEL },
          ].map(({ stat, label, desc, color }) => (
            <div key={label} className="rounded-xl p-4 text-center" style={{ background: color }}>
              <p style={{ fontSize: "32px", fontWeight: 700, color: DARK, lineHeight: 1, marginBottom: "4px" }}>{stat}</p>
              <p style={{ fontSize: "12px", fontWeight: 700, color: DARK, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>{label}</p>
              <p style={{ fontSize: "12px", color: MED, lineHeight: 1.5, marginBottom: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who pays */}
      <section id="who-pays" style={SO}>
        <h2 style={H2}>Who Is Responsible for Payment?</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "Executors and Administrators", desc: "It is the legal responsibility of the executor (if there is a will) or the administrator (if there is no will) to pay the tax using the estate's funds." },
            { label: "Trustees", desc: "If the estate includes assets held in a trust, the trustees may be responsible for the tax due on those specific assets." },
            { label: "Beneficiaries", desc: "Generally, those who inherit from an estate do not pay the tax personally — it is deducted from the estate before distribution. However, there are exceptions, such as taxes due on certain gifts made by the deceased prior to their death." },
          ].map(({ label, desc }) => (
            <div key={label} className="rounded-xl p-4 flex gap-3" style={{ background: "#FAFAFA", border: `1px solid ${BDR}` }}>
              <div className="w-2 shrink-0 rounded-full self-stretch" style={{ background: LAV_BTN }} aria-hidden="true" />
              <p style={{ fontSize: "14px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
                <span style={SB}>{label}: </span>{desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Exemptions */}
      <section id="exemptions" style={SO}>
        <h2 style={H2}>Key Exemptions</h2>
        <p style={P}>Certain assets and transfers are exempt from Inheritance Tax:</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { label: "Spousal Transfers", desc: "Assets left to a husband, wife, or civil partner are typically exempt from IHT.", color: LAV },
            { label: "Agricultural and Business Reliefs", desc: "Certain types of property, such as agricultural land or holdings in specific types of businesses, may qualify for special reliefs that reduce or eliminate the tax liability.", color: MINT },
          ].map(({ label, desc, color }) => (
            <div key={label} className="rounded-xl p-4" style={{ background: color }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "6px" }}>{label}</p>
              <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Calculate */}
      <section id="how-to-calculate" style={SO}>
        <h2 style={H2}>How to Calculate and Report IHT</h2>
        <p style={P}>
          To determine if tax is due, you must conduct a thorough valuation of the deceased&apos;s assets, including
          property, savings, investments, and personal belongings.
        </p>
        <div className="rounded-xl overflow-hidden mb-6" style={{ border: `1px solid ${BDR}` }}>
          {[
            { condition: "If IHT is due", form: "IHT400 (C1 for Scottish estates)", bg: "#FAFAFA" },
            { condition: "If no IHT is due", form: "IHT205 (or C1/C5 for Scotland) to confirm estate is below threshold", bg: "#FFFFFF" },
          ].map(({ condition, form, bg }) => (
            <div key={condition} className="flex items-start gap-4 px-5 py-4"
              style={{ borderBottom: `1px solid ${BDR}`, background: bg }}>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: DARK, marginBottom: "3px" }}>{condition}</p>
                <p style={{ fontSize: "13px", color: MED, lineHeight: 1.6, marginBottom: 0 }}>
                  Complete form: <span style={SB}>{form}</span>
                </p>
              </div>
            </div>
          ))}
          <div className="px-5 py-4" style={{ background: LAV }}>
            <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: 0 }}>
              <span style={SB}>Submission: </span>These forms must be submitted alongside your application for a
              Grant of Representation (Probate), which provides legal authority to manage the estate.
            </p>
          </div>
        </div>
      </section>

      {/* Deadlines */}
      <section id="deadlines" style={SO}>
        <h2 style={H2}>Deadlines and Payment Methods</h2>
        <div className="space-y-3 mb-6">
          {[
            { label: "The Deadline", desc: "Inheritance Tax must be paid within six months of the end of the month in which the person died. Payments made after this deadline will incur interest charges." },
            { label: "Early Payments", desc: "You can make payments to HMRC before the final tax bill is calculated to minimise potential interest." },
            { label: "Instalment Options", desc: "If the estate includes \"non-liquid\" assets — such as a property or company shares — that take time to sell, you may be eligible to pay the tax on those assets in annual instalments over up to 10 years." },
          ].map(({ label, desc }) => (
            <div key={label} className="rounded-xl p-4 flex gap-3" style={{ background: "#FAFAFA", border: `1px solid ${BDR}` }}>
              <div className="w-2 shrink-0 rounded-full self-stretch" style={{ background: LAV_BTN }} aria-hidden="true" />
              <p style={{ fontSize: "14px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
                <span style={SB}>{label}: </span>{desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How to pay */}
      <section id="how-to-pay" style={SO}>
        <h2 style={H2}>How to Make a Payment</h2>
        <p style={P}>
          Before sending any money, you must obtain an <span style={SB}>Inheritance Tax reference number</span> from
          HMRC — requested at least three weeks before you intend to pay (online or via form IHT422). Once you have
          your reference number, you can pay via:
        </p>
        <div className="space-y-2 mb-6">
          {[
            { label: "Direct Payment Scheme", desc: "Pay the tax directly from the deceased's bank or building society account before probate is granted." },
            { label: "Standard Methods", desc: "Through your own bank, via bank transfer, or by cheque." },
          ].map(({ label, desc }) => (
            <div key={label} className="flex items-start gap-3 py-2">
              <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: LAV_BTN }} aria-hidden="true" />
              <p style={{ fontSize: "14px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
                <span style={SB}>{label}: </span>{desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="rounded-xl p-4" style={{ background: YEL, border: "1px solid #E8E080" }}>
        <p style={{ fontSize: "13px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
          Tax legislation can change frequently, and estate valuation can be complicated. If you are dealing with a
          significant estate, it is strongly advised to seek guidance from a qualified solicitor or an independent
          financial advisor to ensure compliance and avoid penalties.
        </p>
      </div>
    </BlogLayout>
  );
}
