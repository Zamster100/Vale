import Link from "next/link";

const DM = "var(--font-dm-sans), -apple-system, sans-serif";
const DARK = "#100B20";
const MED = "#4A415E";
const PURPLE = "#4F34C4";

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-8 scroll-mt-20">
      <h2 className="text-lg font-bold mb-2.5" style={{ fontFamily: DM, color: DARK }}>{title}</h2>
      <div className="text-sm leading-relaxed space-y-3" style={{ color: MED }}>{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div style={{ fontFamily: DM, background: "#FFFFFF" }}>
      <div className="max-w-[720px] mx-auto px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] mb-3" style={{ color: PURPLE }}>Legal</p>
        <h1
          className="mb-3"
          style={{ fontFamily: DM, fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em", color: DARK }}
        >
          Privacy Policy
        </h1>
        <p className="text-sm mb-10" style={{ color: MED }}>Last updated: July 2026</p>

        <Section title="What we collect">
          <p>
            When you search Vale, we don&apos;t require an account or collect personal
            information. If you submit a quote request or a review, we collect the details you
            provide (name, contact information, and your message) solely to pass to the relevant
            funeral director or to publish your review.
          </p>
        </Section>

        <Section title="Funeral director accounts">
          <p>
            Provider accounts store the business and contact details needed to run a listing —
            name, address, phone, and the content you choose to publish (prices, photos, team,
            hours).
          </p>
        </Section>

        <Section title="How we use it">
          <p>
            Quote request details are shared only with the funeral director you contacted.
            We don&apos;t sell personal data to third parties or use it for advertising.
          </p>
        </Section>

        <Section title="Cookies" id="cookies">
          <p>
            Vale uses only the cookies required to keep you signed in and to remember your
            session — no third-party tracking or advertising cookies.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about this policy, or requests to access or delete your data, can be sent
            to{" "}
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
