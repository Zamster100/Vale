import Link from "next/link";

const DM = "var(--font-dm-sans), -apple-system, sans-serif";
const DARK = "#100B20";
const MED = "#4A415E";
const BDR = "#D5D0E4";
const PURPLE = "#4F34C4";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold mb-2.5" style={{ fontFamily: DM, color: DARK }}>{title}</h2>
      <div className="text-sm leading-relaxed space-y-3" style={{ color: MED }}>{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div style={{ fontFamily: DM, background: "#FFFFFF" }}>
      <div className="max-w-[720px] mx-auto px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: PURPLE }}>Legal</p>
        <h1
          className="mb-3"
          style={{ fontFamily: DM, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em", color: DARK }}
        >
          Terms of Service
        </h1>
        <p className="text-sm mb-10" style={{ color: MED }}>Last updated: July 2026</p>

        <Section title="Using Vale">
          <p>
            Vale is a directory and comparison marketplace connecting families with funeral
            directors across the UK. Searching, comparing, and requesting quotes is free for
            families. Funeral directors list on Vale under a separate provider agreement.
          </p>
        </Section>

        <Section title="Accuracy of information">
          <p>
            We work with listed providers to keep prices, hours, and accreditation status
            current, but Vale does not independently arrange funerals or act as a party to any
            agreement between a family and a funeral director.
          </p>
        </Section>

        <Section title="Accounts">
          <p>
            Funeral director accounts are for the business named at signup. You&apos;re
            responsible for keeping your login credentials secure and for the accuracy of the
            information you publish on your listing.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about these terms can be sent to{" "}
            <a href="mailto:hello@vale.co.uk" className="underline" style={{ color: PURPLE }}>
              hello@vale.co.uk
            </a>.
          </p>
        </Section>

        <Link href="/" className="text-sm font-semibold hover:underline" style={{ color: PURPLE }}>
          ← Back to Vale
        </Link>
      </div>
    </div>
  );
}
