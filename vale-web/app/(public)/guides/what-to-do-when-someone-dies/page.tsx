import BlogLayout from "@/components/blog/BlogLayout";

const DARK    = "#100B20";
const MED     = "#4A415E";
const LITE    = "#9E96B2";
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
  { href: "#confirming-death",   label: "1. Confirming the Cause of Death" },
  { href: "#medical-certificate", label: "2. Obtaining the Medical Certificate" },
  { href: "#registering",        label: "3. Registering the Death" },
  { href: "#arranging-funeral",  label: "4. Arranging the Funeral" },
  { href: "#useful-services",    label: "Useful Services" },
];

function StepCard({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden mb-5" style={{ border: `1px solid #B4B6F0` }}>
      <div className="px-5 py-3 flex items-center gap-3" style={{ background: LAV_BTN }}>
        <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
          style={{ background: "rgba(255,255,255,0.2)", color: "#FFFFFF" }}>{num}</span>
        <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>{title}</h2>
      </div>
      <div className="p-5" style={{ background: LAV }}>
        {children}
      </div>
    </div>
  );
}

function InfoBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg p-4 mb-4" style={{ background: "rgba(255,255,255,0.6)" }}>
      {title && <p style={{ fontSize: "13px", fontWeight: 700, color: DARK, marginBottom: "5px" }}>{title}</p>}
      <div style={{ fontSize: "13px", color: MED, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

export default function WhatToDoWhenSomeoneDiesPage() {
  return (
    <BlogLayout
      title="What To Do When Someone Dies"
      category="Guide"
      categoryBg={MINT}
      categoryText="#3AA838"
      author="Vale Family Advisors"
      date="28 May 2026"
      readTime="6 min"
      heroColor={MINT}
      heroImage="/guides/what-to-do-when-someone-dies.png"
      tocLinks={TOC}
    >
      <p style={P}>
        Losing a loved one is profoundly difficult, and the practical administrative tasks that follow can feel
        overwhelming. Please know that you do not have to manage everything at once. Below is a simplified guide to
        help you navigate the essential steps following a death.
      </p>

      {/* Step 1 */}
      <section id="confirming-death" style={SO}>
        <StepCard num={1} title="Confirming the Cause of Death">
          <p style={{ ...P, marginBottom: "12px" }}>
            The first step is for a medical professional to verify the death and confirm the cause.
          </p>
          <InfoBox title="Expected Deaths">
            If the person was under the care of a GP or in a hospital, a doctor will complete a Medical Certificate of
            Cause of Death (MCCD). This is then reviewed by a Medical Examiner, who will contact you to confirm the
            cause and provide a formal notice explaining how to proceed with registration.
          </InfoBox>
          <InfoBox title="Unexpected or Unexplained Deaths">
            If the death was sudden or the cause is unclear, it must be reported to the Coroner. The Coroner will
            investigate, which may involve a post-mortem. While this can cause a delay in funeral arrangements, the
            Coroner&apos;s office will provide the necessary documentation to allow the funeral to eventually proceed.
          </InfoBox>
        </StepCard>
      </section>

      {/* Step 2 */}
      <section id="medical-certificate" style={SO}>
        <StepCard num={2} title="Obtaining the Medical Certificate of Cause of Death">
          <div className="space-y-3">
            <InfoBox title="Death in hospital">
              If the attending doctor is confident in the cause of death, they will issue an MCCD — typically handed to
              you in a sealed envelope with guidance on how to proceed with formal registration.
            </InfoBox>
            <InfoBox title="Death at home">
              If the death was expected and the GP had seen your loved one recently, they may be able to issue the
              certificate. You will either receive this in person or be asked to collect it from the surgery.
            </InfoBox>
            <InfoBox title="When a certificate cannot be issued">
              In some cases — such as when the cause of death is uncertain or unexpected — the case will be referred
              to the Coroner&apos;s office. The Coroner will typically issue an{" "}
              <span style={SB}>interim death certificate</span>, which allows you to proceed with funeral arrangements
              and begin the probate process while the investigation concludes.
            </InfoBox>
          </div>
        </StepCard>
      </section>

      {/* Step 3 */}
      <section id="registering" style={SO}>
        <StepCard num={3} title="Registering the Death">
          <p style={{ ...P, marginBottom: "12px" }}>
            Once you have the medical documentation, you must formally register the death.
          </p>
          <div className="space-y-3">
            <InfoBox title="Timeframe">
              In England and Wales, you are generally required to register the death within{" "}
              <span style={SB}>five days</span> of receiving notification from the Medical Examiner or Coroner.
            </InfoBox>
            <InfoBox title="The Appointment">
              Book an appointment at a local register office — ideally the one in the district where the death occurred.
              The registrar will ask for details including the deceased&apos;s full name, address, occupation, and
              date/place of birth.
            </InfoBox>
            <InfoBox title="Certificates Provided">
              You will receive the <span style={SB}>Certificate for Burial or Cremation</span> (the &ldquo;green
              form&rdquo;), which you must give to your funeral director to finalise arrangements. You can also purchase
              certified copies of the Death Certificate, needed to manage financial affairs.
            </InfoBox>
          </div>
        </StepCard>
      </section>

      {/* Step 4 */}
      <section id="arranging-funeral" style={SO}>
        <StepCard num={4} title="Arranging the Funeral">
          <p style={{ ...P, marginBottom: "12px" }}>
            While you technically need the formal green form to finalise burial or cremation, you can — and often
            should — contact a funeral director soon after the death.
          </p>
          <div className="space-y-3">
            <InfoBox title="Professional Guidance">
              A funeral director is an expert who can support you through this entire process. They can offer advice
              on legal requirements, explain their services, and help you begin planning a tribute that is right for
              your family.
            </InfoBox>
            <InfoBox title="Starting the Conversation">
              Many funeral directors are available 24/7 to help you move your loved one into their care. Don&apos;t
              feel pressured to have all the answers — simply reach out when you feel ready, and they will guide you
              through the next steps.
            </InfoBox>
          </div>
        </StepCard>
      </section>

      {/* Useful Services */}
      <section id="useful-services" style={SO}>
        <h2 style={H2}>Useful Services</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            {
              title: "Tell Us Once",
              body: "A government service that allows you to report a death to multiple departments (DWP, HMRC, Passport Office) in one go, saving you from notifying each agency individually.",
              color: YEL,
            },
            {
              title: "Bereavement Support",
              body: "If you are struggling with your loss, support is available through organisations like Cruse Bereavement Support or the Samaritans.",
              color: MINT,
            },
          ].map(({ title, body, color }) => (
            <div key={title} className="rounded-xl p-4" style={{ background: color }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "6px" }}>{title}</p>
              <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="rounded-xl p-4" style={{ background: "#FAFAFA", border: `1px solid ${BDR}` }}>
        <p style={{ fontSize: "13px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
          <span style={SB}>Disclaimer: </span>This information is for general guidance. If you are ever unsure about
          the specific requirements in your local area, your funeral director or local Register Office can provide
          clear, localised advice.
        </p>
      </div>
    </BlogLayout>
  );
}
