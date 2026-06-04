import BlogLayout from "@/components/blog/BlogLayout";

const DARK    = "#1A1A2E";
const MED     = "#5C5C7A";
const LAV     = "#D2D3FC";
const LAV_BTN = "#6B6DE8";
const MINT    = "#D3FCD2";
const YEL     = "#FCFBD2";
const BDR     = "#E8E8F4";

const H2: React.CSSProperties = { fontSize: "22px", fontWeight: 700, color: DARK, marginTop: "40px", marginBottom: "12px", lineHeight: 1.25 };
const H3: React.CSSProperties = { fontSize: "16px", fontWeight: 700, color: DARK, marginTop: "20px", marginBottom: "8px", lineHeight: 1.3 };
const P:  React.CSSProperties = { fontSize: "15px", color: MED, lineHeight: 1.8, marginBottom: "16px" };
const SB: React.CSSProperties = { fontWeight: 700, color: DARK };
const SO: React.CSSProperties = { scrollMarginTop: "96px" };

const TOC = [
  { href: "#definition",         label: "What 'Next of Kin' Means" },
  { href: "#empowering-choices", label: "Empowering Your Choices" },
  { href: "#responsibilities",   label: "Responsibilities After a Death" },
  { href: "#intestacy",          label: "Inheritance and Intestacy" },
  { href: "#no-one-found",       label: "What Happens if No One Is Found?" },
];

export default function UnderstandingNextOfKinPage() {
  return (
    <BlogLayout
      title="Understanding 'Next of Kin': Rights, Responsibilities, and Legal Realities"
      category="Explainer"
      categoryBg={YEL}
      categoryText="#806000"
      author="Vale Family Advisors"
      date="22 May 2026"
      readTime="7 min"
      heroColor={YEL}
      tocLinks={TOC}
    >
      <p style={P}>
        The term &ldquo;next of kin&rdquo; is frequently used in hospitals and during bereavement, yet it is often
        misunderstood. Many people assume it confers automatic legal authority, but in the UK, the status is more
        flexible and less strictly defined by law than you might expect.
      </p>

      {/* Definition */}
      <section id="definition" style={SO}>
        <h2 style={H2}>What Exactly Does &lsquo;Next of Kin&rsquo; Mean?</h2>
        <p style={P}>
          In the UK, there is no single legal definition of &ldquo;next of kin.&rdquo; It is generally used to identify
          the person who is emotionally closest to an individual.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            {
              label: "In Hospital Settings",
              desc: "When you are admitted to a hospital, you are invited to nominate a \"next of kin.\" This can be anyone you choose — a spouse, a life partner, a best friend, or a family member. It is a communication preference rather than a legal designation.",
              color: LAV,
            },
            {
              label: "Medical Decisions",
              desc: "A \"next of kin\" cannot automatically make medical decisions for you. Medical staff will always prioritise the patient's clinical best interests. If a patient is unable to communicate, doctors make decisions based on clinical evidence — the \"next of kin\" does not hold a legal right to dictate treatment.",
              color: YEL,
            },
          ].map(({ label, desc, color }) => (
            <div key={label} className="rounded-xl p-4" style={{ background: color }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "6px" }}>{label}</p>
              <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Empowering */}
      <section id="empowering-choices" style={SO}>
        <h2 style={H2}>Empowering Your Choices</h2>
        <p style={P}>
          If you want to ensure specific people are involved in your end-of-life care, you can take proactive steps:
        </p>
        <div className="space-y-4 mb-6">
          {[
            {
              title: "Lasting Power of Attorney (LPA)",
              body: "A legal document where you formally appoint someone to make decisions about your health and welfare if you lose the capacity to do so yourself. Unlike \"next of kin,\" an LPA for health and welfare is legally binding.",
              badge: "Legally Binding",
              badgeColor: "#3AA838",
              bg: MINT,
            },
            {
              title: "Advance Decisions (Living Wills)",
              body: "You can create an Advance Decision to refuse specific life-prolonging treatments. This ensures your wishes are respected if you are ever unable to communicate them.",
              badge: "Legally Binding",
              badgeColor: "#3AA838",
              bg: MINT,
            },
            {
              title: "Advance Statements",
              body: "While not legally binding, an advance statement records your preferences and values. It acts as a guide for medical staff and your family, helping them understand your wishes during a difficult time.",
              badge: "Guidance Only",
              badgeColor: "#806000",
              bg: YEL,
            },
          ].map(({ title, body, badge, badgeColor, bg }) => (
            <div key={title} className="rounded-xl p-5" style={{ background: bg }}>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <p style={{ fontSize: "15px", fontWeight: 700, color: DARK, marginBottom: 0 }}>{title}</p>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.6)", color: badgeColor }}>{badge}</span>
              </div>
              <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Responsibilities */}
      <section id="responsibilities" style={SO}>
        <h2 style={H2}>Responsibilities After a Death</h2>
        <p style={P}>
          When someone passes away, the &ldquo;next of kin&rdquo; role becomes more practical, particularly regarding
          funeral arrangements.
        </p>
        <div className="space-y-3 mb-6">
          {[
            { label: "Arranging the Funeral", desc: "Anyone can arrange a funeral, but the person who signs the contract with the funeral director takes legal responsibility for the cost (though these costs can usually be reclaimed from the deceased's estate)." },
            { label: "Executors vs. Next of Kin", desc: "If a will exists, the person named as the Executor is responsible for managing the estate and settling funeral bills. Often, the person you consider \"next of kin\" is also your Executor, but they are technically two different roles." },
            { label: "Planning Ahead", desc: "If you are concerned about potential family disagreements, writing a will and setting up a pre-paid funeral plan is the most effective way to remove the burden of decision-making from your loved ones." },
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

      {/* Intestacy */}
      <section id="intestacy" style={SO}>
        <h2 style={H2}>Inheritance and &lsquo;Intestacy&rsquo;</h2>
        <p style={P}>
          While &ldquo;next of kin&rdquo; is informal during a person&apos;s life, the law becomes very specific if
          someone dies <span style={SB}>intestate</span> (without a will). In this scenario, the law dictates who
          inherits based on a strict order of priority:
        </p>
        <div className="rounded-xl overflow-hidden mb-4" style={{ border: `1px solid ${BDR}` }}>
          {[
            { num: 1, label: "Spouses and Civil Partners", desc: "First in line to inherit — even if the couple was separated, provided they were not legally divorced." },
            { num: 2, label: "Children and Grandchildren", desc: "They follow if there is no surviving spouse." },
            { num: 3, label: "Other Blood Relatives", desc: "If no spouse or children exist, the estate moves to parents, siblings, etc." },
          ].map(({ num, label, desc }, i) => (
            <div key={label} className="flex items-start gap-4 px-5 py-4"
              style={{ borderBottom: i < 2 ? `1px solid ${BDR}` : "none", background: i % 2 === 0 ? "#FAFAFA" : "#FFFFFF" }}>
              <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5"
                style={{ background: LAV, color: LAV_BTN }}>{num}</span>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "3px" }}>{label}</p>
                <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-4" style={{ background: YEL, border: "1px solid #E8E080" }}>
          <p style={{ fontSize: "13px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
            <span style={SB}>Important: </span>Surviving long-term partners who were not married or in a civil
            partnership are not legally recognised as next of kin under the rules of intestacy and do not have an
            automatic right to inherit.
          </p>
        </div>
      </section>

      {/* No one found */}
      <section id="no-one-found" style={SO}>
        <h2 style={H2}>What Happens if No One Is Found?</h2>
        <p style={P}>
          If someone dies alone and no family can be traced, the local authority or hospital will perform the necessary
          searches. If no one claims responsibility, the local council will arrange a{" "}
          <span style={SB}>&ldquo;Public Health Funeral&rdquo;</span> (often called a council funeral). Even in these
          cases, the local authority will attempt to recover costs from the deceased&apos;s estate if any assets exist.
        </p>
      </section>

      {/* Disclaimer */}
      <div className="rounded-xl p-4 mt-6" style={{ background: "#FAFAFA", border: `1px solid ${BDR}` }}>
        <p style={{ fontSize: "13px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
          <span style={SB}>Disclaimer: </span>This information is for general guidance. Because laws regarding
          inheritance and legal authority can be complex, you may wish to consult with a solicitor regarding wills or
          Lasting Power of Attorney to ensure your wishes are legally protected.
        </p>
      </div>
    </BlogLayout>
  );
}
