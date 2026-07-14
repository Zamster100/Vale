import { CheckCircle, AlertCircle } from "lucide-react";
import BlogLayout from "@/components/blog/BlogLayout";

const DARK    = "#100B20";
const MED     = "#4A415E";
const LAV     = "#E3DFFF";
const LAV_BTN = "#4F34C4";
const MINT    = "#D3FCD2";
const YEL     = "#FCFBD2";
const BDR     = "#D5D0E4";

const H2: React.CSSProperties = { fontSize: "22px", fontWeight: 700, color: DARK, marginTop: "40px", marginBottom: "12px", lineHeight: 1.25 };
const H3: React.CSSProperties = { fontSize: "17px", fontWeight: 700, color: DARK, marginTop: "24px", marginBottom: "8px", lineHeight: 1.3 };
const P:  React.CSSProperties = { fontSize: "15px", color: MED, lineHeight: 1.8, marginBottom: "16px" };
const SB: React.CSSProperties = { fontWeight: 700, color: DARK };
const SO: React.CSSProperties = { scrollMarginTop: "96px" };

const TOC = [
  { href: "#typical-costs",      label: "Typical Funeral Costs" },
  { href: "#breaking-down-fees", label: "Breaking Down the Fees" },
  { href: "#optional-extras",    label: "Optional Extras: Controlling the Total" },
  { href: "#financial-support",  label: "Financial Support and Resources" },
  { href: "#special-circumstances", label: "Special Circumstances" },
];

export default function UnderstandingFuneralCostsPage() {
  return (
    <BlogLayout
      title="Understanding Funeral Costs: A Guide to Budgeting and Planning"
      category="Guide"
      categoryBg={LAV}
      categoryText={LAV_BTN}
      author="Vale Family Advisors"
      date="1 June 2026"
      readTime="7 min"
      heroColor={LAV}
      tocLinks={TOC}
    >
      <p style={P}>
        Navigating the costs associated with a funeral is a practical step that often occurs while you are managing the
        emotional weight of a loss. By understanding what you are paying for, you can make informed decisions that honour
        your loved one while remaining within your financial means.
      </p>

      {/* ── Typical Costs ── */}
      <section id="typical-costs" style={SO}>
        <h2 style={H2}>Typical Funeral Costs</h2>
        <p style={P}>
          While prices vary significantly depending on the location, the service provider, and the type of farewell you
          choose, the total cost generally comprises two main elements: the funeral director&apos;s professional fee and
          third-party disbursements.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { label: "Burial vs. Cremation", desc: "Generally, burials are more expensive than cremations due to costs associated with purchasing a grave plot, headstone, and interment fees.", color: LAV },
            { label: "Tailored vs. Package Deals", desc: "You can choose between a pre-set fixed-price package or a bespoke service where you select individual components. Discussing these options with your funeral director early on is the best way to manage your budget.", color: MINT },
          ].map(({ label, desc, color }) => (
            <div key={label} className="rounded-xl p-4" style={{ background: color }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "6px" }}>{label}</p>
              <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Breaking Down Fees ── */}
      <section id="breaking-down-fees" style={SO}>
        <h2 style={H2}>Breaking Down the Fees</h2>
        <p style={P}>
          It is helpful to distinguish between the services provided by your funeral director and the costs they pay on
          your behalf.
        </p>

        <div className="rounded-xl overflow-hidden mb-5" style={{ border: `1px solid #B4B6F0` }}>
          <div className="px-5 py-3 flex items-center gap-2" style={{ background: LAV_BTN }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: "rgba(255,255,255,0.25)", color: "#FFFFFF" }}>1</span>
            <h3 style={{ ...H3, marginTop: 0, marginBottom: 0, color: "#FFFFFF", fontSize: "15px" }}>
              Funeral Director&apos;s Professional Fees
            </h3>
          </div>
          <div className="p-5" style={{ background: LAV }}>
            <p style={{ ...P, marginBottom: "10px" }}>These cover the expertise and labour provided by the firm, including:</p>
            <ul className="space-y-2">
              {[
                "Collecting and caring for the deceased.",
                "Handling essential legal paperwork.",
                "Professional advice and guidance throughout the planning process.",
                "Logistics and staff management on the day of the service.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: LAV_BTN }} aria-hidden="true" />
                  <span style={{ fontSize: "14px", color: MED, lineHeight: 1.65 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden mb-6" style={{ border: `1px solid #B4B6F0` }}>
          <div className="px-5 py-3 flex items-center gap-2" style={{ background: LAV_BTN }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: "rgba(255,255,255,0.25)", color: "#FFFFFF" }}>2</span>
            <h3 style={{ ...H3, marginTop: 0, marginBottom: 0, color: "#FFFFFF", fontSize: "15px" }}>
              Disbursements (Third-Party Costs)
            </h3>
          </div>
          <div className="p-5" style={{ background: LAV }}>
            <p style={{ ...P, marginBottom: "10px" }}>
              These are costs that the funeral director pays to external providers, included in your final bill. They
              should always be itemised for transparency:
            </p>
            <ul className="space-y-2">
              {[
                "Crematorium or cemetery fees.",
                "Medical certificates and death registration fees.",
                "Celebrant or religious leader fees.",
                "Floral arrangements and catering.",
                "Death notices or obituaries.",
                "Printed orders of service.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: LAV_BTN }} aria-hidden="true" />
                  <span style={{ fontSize: "14px", color: MED, lineHeight: 1.65 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Optional Extras ── */}
      <section id="optional-extras" style={SO}>
        <h2 style={H2}>Optional Extras: Controlling the Total</h2>
        <p style={P}>
          Not every element of a funeral is mandatory. Many costs are optional and can be adjusted to suit your budget:
        </p>
        <div className="rounded-xl p-5 mb-6" style={{ background: "#FAFAFA", border: `1px solid ${BDR}` }}>
          <ul className="space-y-3">
            {[
              { label: "Chapel of Rest", desc: "Use of a private space for viewing your loved one." },
              { label: "Presentation", desc: "Embalming or specific dressing services." },
              { label: "Transport", desc: "The type and number of vehicles for the funeral procession (e.g. limousine hire)." },
              { label: "Staffing", desc: "Hiring professional pallbearers or additional staff. Many families choose to save on these costs by asking close friends or family members to act as pallbearers." },
            ].map(({ label, desc }) => (
              <li key={label} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#3AA838" }} aria-hidden="true" />
                <p style={{ fontSize: "14px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
                  <span style={SB}>{label}: </span>{desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Financial Support ── */}
      <section id="financial-support" style={SO}>
        <h2 style={H2}>Financial Support and Resources</h2>
        <p style={P}>
          If you are worried about covering funeral costs, there are several avenues for assistance:
        </p>
        <div className="space-y-3 mb-6">
          {[
            { label: "The Deceased's Estate", desc: "Funds held in bank or building society accounts can often be used for funeral expenses. Note that accounts are typically frozen until probate is granted, though some funeral directors may allow payment deferment until these funds are released." },
            { label: "Government Grants", desc: "You may be eligible for a Funeral Expenses Payment if you are receiving specific means-tested benefits." },
            { label: "Benevolent Funds", desc: "If your loved one worked in a specific trade or profession, their industry's benevolent fund may offer grants or financial support." },
            { label: "Public Health Funerals", desc: "If no one is able or willing to pay, the local authority has a statutory duty to provide a basic funeral. This is often the final option if no other financial resources are available." },
          ].map(({ label, desc }) => (
            <div key={label} className="rounded-xl p-4 flex gap-4" style={{ background: "#FAFAFA", border: `1px solid ${BDR}` }}>
              <div className="w-2 shrink-0 rounded-full self-stretch" style={{ background: LAV_BTN }} aria-hidden="true" />
              <div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "3px" }}>{label}</p>
                <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Special Circumstances ── */}
      <section id="special-circumstances" style={SO}>
        <h2 style={H2}>Special Circumstances</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { title: "Repatriation", body: "If you are bringing a loved one home from abroad, or sending them overseas for a funeral, costs can be complex. Contact a funeral director who specialises specifically in international repatriation.", color: YEL },
            { title: "DIY Arrangements", body: "It is legally possible to arrange a funeral yourself without a funeral director. While this can reduce costs, it involves significant administrative responsibility — seek professional advice on legal requirements first.", color: MINT },
          ].map(({ title, body, color }) => (
            <div key={title} className="rounded-xl p-4" style={{ background: color }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "6px" }}>{title}</p>
              <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Transparency note ── */}
      <div className="rounded-xl p-5" style={{ background: YEL, border: "1px solid #E8E080" }}>
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#806000" }} aria-hidden="true" />
          <div>
            <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "4px" }}>A Note on Transparency</p>
            <p style={{ fontSize: "13px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
              Every reputable funeral director should be clear about their pricing from the outset. Do not hesitate to
              ask for a full written estimate before committing to any arrangements. Comparing multiple providers is an
              effective way to ensure you find a service that aligns with both your personal wishes and your financial
              requirements.
            </p>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
}
