import { CheckCircle } from "lucide-react";
import BlogLayout from "@/components/blog/BlogLayout";

const DARK    = "#1A1A2E";
const MED     = "#5C5C7A";
const LITE    = "#9090A8";
const LAV     = "#D2D3FC";
const LAV_BTN = "#6B6DE8";
const PINK    = "#FBD2FC";
const MINT    = "#D3FCD2";
const YEL     = "#FCFBD2";
const BDR     = "#E8E8F4";

const H2: React.CSSProperties = {
  fontSize: "22px", fontWeight: 700, color: DARK,
  marginTop: "40px", marginBottom: "12px", lineHeight: 1.25,
};
const H3: React.CSSProperties = {
  fontSize: "18px", fontWeight: 700, color: DARK,
  marginTop: "28px", marginBottom: "8px", lineHeight: 1.3,
};
const P: React.CSSProperties = {
  fontSize: "15px", color: MED, lineHeight: 1.8, marginBottom: "16px",
};
const STRONG: React.CSSProperties = { fontWeight: 700, color: DARK };
const SCROLL_OFFSET: React.CSSProperties = { scrollMarginTop: "96px" };

const TOC = [
  { href: "#accessing-estate",    label: "Accessing Your Loved One's Estate" },
  { href: "#government-support",  label: "Government Support and Grants" },
  { href: "#additional-help",     label: "Additional Sources of Help" },
  { href: "#key-takeaways",       label: "Key Takeaways" },
];

export default function CannotAffordFuneralPage() {
  return (
    <BlogLayout
      title="What to Do If You Cannot Afford a Funeral: A Guide to Financial Support"
      category="Guide"
      categoryBg={LAV}
      categoryText={LAV_BTN}
      author="Vale Family Advisors"
      date="4 June 2026"
      readTime="8 min"
      heroColor={LAV}
      tocLinks={TOC}
    >

      {/* ── Intro ── */}
      <p style={P}>
        Facing the loss of a loved one is an incredibly difficult time, and the pressure of arranging a funeral can feel
        overwhelming, especially if you are worried about the costs. If you are the person responsible for the
        arrangements, it is natural to feel anxious about how to cover these expenses.
      </p>
      <p style={P}>
        While the legal responsibility for funeral costs typically falls on the person making the arrangements, you are
        not alone. There are several pathways, government schemes, and financial resources available to support you if
        you are struggling to afford a funeral.
      </p>

      {/* ── Section 1 ── */}
      <section id="accessing-estate" style={SCROLL_OFFSET}>
        <h2 style={H2}>Accessing Your Loved One&apos;s Estate</h2>
        <p style={P}>
          Before seeking external help, the first step is to establish if your loved one left behind any assets that can
          be used for their funeral.
        </p>

        <div className="rounded-xl p-5 mb-4" style={{ background: "#F8F8FF", border: `1px solid ${BDR}` }}>
          <h3 style={{ ...H3, marginTop: 0, marginBottom: "6px", fontSize: "15px" }}>Using the Estate</h3>
          <p style={{ ...P, marginBottom: 0 }}>
            If the deceased had funds in bank accounts or other assets, these can often be used to pay for the funeral.
            However, once a bank is notified of a death, they typically freeze individual accounts. You will generally
            need to wait for probate or a Letter of Administration to gain full access to these funds.
          </p>
        </div>

        <div className="rounded-xl p-5 mb-4" style={{ background: "#F8F8FF", border: `1px solid ${BDR}` }}>
          <h3 style={{ ...H3, marginTop: 0, marginBottom: "6px", fontSize: "15px" }}>Checking for Existing Plans</h3>
          <p style={{ ...P, marginBottom: 0 }}>
            Look through their paperwork or bank statements for evidence of pre-paid funeral plans or life insurance
            policies. These are specifically designed to cover end-of-life costs and are usually released once a Death
            Certificate is provided to the provider.
          </p>
        </div>

        <div className="rounded-xl p-5 mb-4" style={{ background: "#F8F8FF", border: `1px solid ${BDR}` }}>
          <h3 style={{ ...H3, marginTop: 0, marginBottom: "6px", fontSize: "15px" }}>Speak to Your Funeral Director</h3>
          <p style={{ ...P, marginBottom: 0 }}>
            Many funeral directors are compassionate and experienced in these situations. They may be willing to offer a
            payment plan or hold the final invoice until the deceased&apos;s assets have been released.
          </p>
        </div>
      </section>

      {/* ── Section 2 ── */}
      <section id="government-support" style={SCROLL_OFFSET}>
        <h2 style={H2}>Government Support and Grants</h2>
        <p style={P}>
          If there is no money in the estate, or if the funds are insufficient, the UK government offers several forms
          of assistance based on your current financial situation.
        </p>

        {/* 1. Funeral Expenses Payment */}
        <div className="rounded-xl overflow-hidden mb-5" style={{ border: `1px solid #B4B6F0` }}>
          <div className="px-5 py-3 flex items-center gap-2" style={{ background: LAV_BTN }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: "rgba(255,255,255,0.25)", color: "#FFFFFF" }}>1</span>
            <h3 style={{ ...H3, marginTop: 0, marginBottom: 0, color: "#FFFFFF", fontSize: "15px" }}>
              Funeral Expenses Payment (Social Fund)
            </h3>
          </div>
          <div className="p-5" style={{ background: LAV }}>
            <p style={{ ...P, marginBottom: "12px" }}>
              If you are in receipt of certain means-tested benefits, you may be eligible for a Funeral Expenses
              Payment — a government grant designed to help cover the costs of a basic, dignified funeral.
            </p>
            <div className="rounded-lg p-4" style={{ background: "rgba(255,255,255,0.6)" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: DARK, marginBottom: "6px" }}>Eligibility</p>
              <p style={{ fontSize: "13px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
                To qualify, you must be a close relative or friend of the deceased and currently receive benefits such
                as Universal Credit, Income Support, Pension Credit, or Housing Benefit.
              </p>
            </div>
            <p className="mt-4 text-sm" style={{ color: MED, lineHeight: 1.7, marginBottom: 0 }}>
              <span style={STRONG}>Important note: </span>The government will assess the deceased&apos;s estate for any
              existing insurance or savings that could contribute to the costs before granting aid.
            </p>
          </div>
        </div>

        {/* 2. Budgeting Loans */}
        <div className="rounded-xl overflow-hidden mb-5" style={{ border: `1px solid #B4B6F0` }}>
          <div className="px-5 py-3 flex items-center gap-2" style={{ background: LAV_BTN }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: "rgba(255,255,255,0.25)", color: "#FFFFFF" }}>2</span>
            <h3 style={{ ...H3, marginTop: 0, marginBottom: 0, color: "#FFFFFF", fontSize: "15px" }}>
              Budgeting Loans
            </h3>
          </div>
          <div className="p-5" style={{ background: LAV }}>
            <p style={{ ...P, marginBottom: 0 }}>
              If you have been receiving certain benefits (such as Income Support or Pension Credit) for at least 26
              weeks, you may be eligible for a Budgeting Loan. These are{" "}
              <span style={STRONG}>interest-free loans</span> provided by the government, repaid through deductions
              from your future benefit payments.
            </p>
          </div>
        </div>

        {/* 3. BSP */}
        <div className="rounded-xl overflow-hidden mb-5" style={{ border: `1px solid #B4B6F0` }}>
          <div className="px-5 py-3 flex items-center gap-2" style={{ background: LAV_BTN }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: "rgba(255,255,255,0.25)", color: "#FFFFFF" }}>3</span>
            <h3 style={{ ...H3, marginTop: 0, marginBottom: 0, color: "#FFFFFF", fontSize: "15px" }}>
              Bereavement Support Payment (BSP)
            </h3>
          </div>
          <div className="p-5" style={{ background: LAV }}>
            <p style={{ ...P, marginBottom: "16px" }}>
              If you have lost a spouse or civil partner, you may be eligible for the Bereavement Support Payment. This
              is available to those who were under State Pension age at the time of their partner&apos;s death.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl p-4" style={{ background: MINT, border: "1px solid #B0ECAE" }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#3AA838", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                  With Dependent Children
                </p>
                <p style={{ fontSize: "30px", fontWeight: 700, color: DARK, lineHeight: 1, marginBottom: "4px" }}>£3,500</p>
                <p style={{ fontSize: "12px", color: MED, marginBottom: "10px" }}>Initial lump sum</p>
                <p style={{ fontSize: "13px", color: MED, lineHeight: 1.6 }}>
                  + 18 monthly payments of <span style={STRONG}>£350</span>
                </p>
              </div>
              <div className="rounded-xl p-4" style={{ background: PINK, border: "1px solid #F0B0F0" }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#C45EC4", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                  Without Dependent Children
                </p>
                <p style={{ fontSize: "30px", fontWeight: 700, color: DARK, lineHeight: 1, marginBottom: "4px" }}>£2,500</p>
                <p style={{ fontSize: "12px", color: MED, marginBottom: "10px" }}>Initial lump sum</p>
                <p style={{ fontSize: "13px", color: MED, lineHeight: 1.6 }}>
                  + 18 monthly payments of <span style={STRONG}>£100</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3 ── */}
      <section id="additional-help" style={SCROLL_OFFSET}>
        <h2 style={H2}>Additional Sources of Help</h2>
        <p style={P}>
          If government support is not applicable, consider these alternative routes:
        </p>

        <div className="space-y-4 mb-6">
          {[
            {
              title: "Veterans UK",
              body: "If your loved one served in HM Forces or died as a result of their service, you may be eligible for financial support through the War Disablement Pension scheme. Reach out to the Veterans UK bereavement line at 0800 169 3458.",
            },
            {
              title: "Charitable Funds and Trade Unions",
              body: "Many benevolent societies and trade unions offer emergency grants to help members and their dependents during times of bereavement. If your loved one belonged to a specific trade or industry, contacting their union is often a vital first step.",
            },
            {
              title: "Public Health Funerals",
              body: "In circumstances where there is absolutely no money and no one to take responsibility for the arrangements, the local council has a legal duty to step in and arrange a \"Public Health Funeral\" (often referred to as a \"council funeral\"). This is a final resort for those with no other options.",
            },
          ].map(({ title, body }) => (
            <div key={title} className="rounded-xl p-5 flex gap-4"
              style={{ background: "#FAFAFA", border: `1px solid ${BDR}` }}>
              <div className="w-2 shrink-0 rounded-full self-stretch" style={{ background: LAV_BTN }} aria-hidden="true" />
              <div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: DARK, marginBottom: "4px" }}>{title}</p>
                <p style={{ fontSize: "14px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Key Takeaways ── */}
      <section id="key-takeaways" style={SCROLL_OFFSET}>
        <div className="rounded-xl p-6" style={{ background: MINT, border: "1px solid #B0ECAE" }}>
          <h2 style={{ ...H2, marginTop: 0, marginBottom: "16px" }}>Key Takeaways</h2>
          <ul className="space-y-4">
            {[
              {
                title: "Do not pay before you check",
                body: "Always check for insurance or pre-paid plans before paying out of your own pocket.",
              },
              {
                title: "Communicate openly",
                body: "Speak with your chosen funeral director as early as possible. They can guide you through the process and explain the payment options they provide.",
              },
              {
                title: "Keep records",
                body: "Keep copies of all funeral-related invoices and receipts, as these will be essential when applying for any government grants or claiming from the estate.",
              },
            ].map(({ title, body }) => (
              <li key={title} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" style={{ color: "#3AA838" }} aria-hidden="true" />
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "2px" }}>{title}</p>
                  <p style={{ fontSize: "14px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <div className="mt-10 rounded-xl p-5" style={{ background: YEL, border: "1px solid #E8E080" }}>
        <p style={{ fontSize: "13px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
          <span style={{ fontWeight: 700, color: DARK }}>Disclaimer: </span>
          This information is for guidance only. Rules regarding benefits and eligibility can change. For the most
          accurate and current advice, please visit the official GOV.UK bereavement pages or contact your local Citizens
          Advice office.
        </p>
      </div>

    </BlogLayout>
  );
}
