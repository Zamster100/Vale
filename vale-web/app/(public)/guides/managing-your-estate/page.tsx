import BlogLayout from "@/components/blog/BlogLayout";

const DARK    = "#100B20";
const MED     = "#4A415E";
const LAV     = "#E3DFFF";
const LAV_BTN = "#4F34C4";
const MINT    = "#D3FCD2";
const YEL     = "#FCFBD2";
const BDR     = "#D5D0E4";

const H2: React.CSSProperties = { fontSize: "22px", fontWeight: 700, color: DARK, marginTop: "40px", marginBottom: "12px", lineHeight: 1.25 };
const H3: React.CSSProperties = { fontSize: "16px", fontWeight: 700, color: DARK, marginTop: "20px", marginBottom: "8px", lineHeight: 1.3 };
const P:  React.CSSProperties = { fontSize: "15px", color: MED, lineHeight: 1.8, marginBottom: "16px" };
const SB: React.CSSProperties = { fontWeight: 700, color: DARK };
const SO: React.CSSProperties = { scrollMarginTop: "96px" };

const TOC = [
  { href: "#estate-comprises",    label: "What Comprises an Estate?" },
  { href: "#notifying-authorities", label: "Notifying Authorities" },
  { href: "#debts",               label: "Handling Debts" },
  { href: "#joint-assets",        label: "Joint Assets and Property" },
  { href: "#low-value",           label: "Understanding 'Low-Value' Estates" },
  { href: "#distribution",        label: "Final Distribution" },
];

export default function ManagingYourEstatePage() {
  return (
    <BlogLayout
      title="Managing an Estate: A Guide for Executors and Administrators"
      category="Guide"
      categoryBg={LAV}
      categoryText={LAV_BTN}
      author="Vale Family Advisors"
      date="19 May 2026"
      readTime="9 min"
      heroColor={LAV}
      heroImage="/guides/managing-your-estate.png"
      tocLinks={TOC}
    >
      <p style={P}>
        When a loved one passes away, the responsibility for managing their financial and personal affairs typically
        falls to an <span style={SB}>executor</span> (if named in a will) or an{" "}
        <span style={SB}>administrator</span> (if there is no will). This process — often referred to as
        &ldquo;administering the estate&rdquo; — involves gathering assets, settling debts, and distributing the
        remainder to those entitled to it.
      </p>

      {/* Estate comprises */}
      <section id="estate-comprises" style={SO}>
        <h2 style={H2}>What Comprises an Estate?</h2>
        <p style={P}>
          An estate includes everything the deceased owned at the time of their death:
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Financial Assets", desc: "Bank accounts, cash, investments, shares, and life insurance policies.", color: LAV },
            { label: "Property and Possessions", desc: "Real estate (homes or land), personal belongings, and vehicles.", color: MINT },
            { label: "Debts Owed", desc: "Any money that was owed to the deceased.", color: YEL },
          ].map(({ label, desc, color }) => (
            <div key={label} className="rounded-xl p-4" style={{ background: color }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "6px" }}>{label}</p>
              <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-4" style={{ background: "#FAFAFA", border: `1px solid ${BDR}` }}>
          <p style={{ fontSize: "13px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
            Before any inheritance can be distributed, all liabilities — such as mortgages, credit card balances, and
            utility bills — must be settled from the estate&apos;s funds.
          </p>
        </div>
      </section>

      {/* Notifying */}
      <section id="notifying-authorities" style={SO}>
        <h2 style={H2}>Notifying Authorities</h2>
        <p style={P}>
          Once you have the legal authority to act (via probate or letters of administration), you must notify various
          government agencies. The <span style={SB}>&ldquo;Tell Us Once&rdquo;</span> service allows you to notify
          multiple departments simultaneously. If unavailable, contact each agency below:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {["HMRC", "DWP", "Passport Office", "DVLA", "Local Council", "Pension Providers"].map((agency) => (
            <div key={agency} className="rounded-lg px-3 py-2.5 text-center" style={{ background: "#F8F8FF", border: `1px solid ${BDR}` }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: DARK }}>{agency}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Debts */}
      <section id="debts" style={SO}>
        <h2 style={H2}>Handling Debts</h2>
        <p style={P}>
          Creditors must be informed of the death, and their claims are paid from the estate&apos;s assets.
        </p>
        <div className="space-y-3 mb-6">
          {[
            { label: "Limited Assets", desc: "If the estate is insufficient to cover all debts, family members are not personally liable to pay them from their own savings." },
            { label: "Joint Liabilities", desc: "If a debt was held in a joint account (like a mortgage or loan), the responsibility for repayment typically passes to the surviving account holder. Similarly, surviving household members remain responsible for ongoing bills and Council Tax." },
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

      {/* Joint assets */}
      <section id="joint-assets" style={SO}>
        <h2 style={H2}>Joint Assets and Property</h2>
        <p style={P}>
          The way assets were held during the deceased&apos;s life significantly impacts how they are transferred.
        </p>

        <h3 style={H3}>Joint Bank Accounts</h3>
        <p style={P}>
          Funds usually pass automatically to the surviving partner. You will generally only need to provide a death
          certificate to the bank to update the account into the survivor&apos;s name.
        </p>

        <h3 style={H3}>Jointly Owned Property</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {[
            { label: "Beneficial Joint Tenancy", desc: "The survivor automatically inherits the deceased's share.", color: MINT, note: "Automatic transfer" },
            { label: "Tenancy in Common", desc: "Each person owns a distinct share. The deceased's share does not pass automatically to the co-owner — it must be distributed according to the will or laws of intestacy.", color: YEL, note: "Distributed via will" },
          ].map(({ label, desc, color, note }) => (
            <div key={label} className="rounded-xl p-4" style={{ background: color }}>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: 0 }}>{label}</p>
                <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.6)", color: DARK }}>{note}</span>
              </div>
              <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: 0 }}>{desc}</p>
            </div>
          ))}
        </div>

        <h3 style={H3}>Mortgaged Property</h3>
        <p style={P}>
          If you inherit a mortgaged home, the lender will require you to either take over the mortgage (subject to
          affordability checks) or pay off the balance in full, perhaps using a mortgage protection insurance policy
          if one exists.
        </p>
      </section>

      {/* Low value */}
      <section id="low-value" style={SO}>
        <h2 style={H2}>Understanding &lsquo;Low-Value&rsquo; Estates</h2>
        <p style={P}>
          Not every estate requires a full probate process. Some banks and building societies have discretion to
          release funds for &ldquo;low-value&rdquo; accounts without requiring a Grant of Probate.
        </p>
        <div className="rounded-xl p-5" style={{ background: LAV }}>
          <p style={{ ...P, marginBottom: "8px" }}>
            <span style={SB}>Definition: </span>Each institution sets its own threshold for what qualifies as a
            &ldquo;small amount.&rdquo;
          </p>
          <p style={{ fontSize: "14px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
            <span style={SB}>Urgent Expenses: </span>Even before probate is granted, some funds may be released to
            cover essential costs such as funeral fees, inheritance tax, or probate application costs.
          </p>
        </div>
      </section>

      {/* Distribution */}
      <section id="distribution" style={SO}>
        <h2 style={H2}>Final Distribution</h2>
        <p style={P}>
          Only after all debts, taxes, and administrative expenses are cleared can the remaining estate be distributed
          to the beneficiaries according to the will. If there is no will, the estate is distributed according to the
          <span style={SB}> Rules of Intestacy</span>, which prioritise spouses, civil partners, and children.
        </p>
        <div className="rounded-xl p-4" style={{ background: YEL, border: "1px solid #E8E080" }}>
          <p style={{ fontSize: "13px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
            Managing an estate can be complex. If you feel overwhelmed, remember that you are allowed to seek
            professional advice from a solicitor or a professional probate practitioner to ensure the estate is handled
            correctly and legally.
          </p>
        </div>
      </section>
    </BlogLayout>
  );
}
