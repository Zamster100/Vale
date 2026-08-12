import { CheckCircle } from "lucide-react";
import BlogLayout from "@/components/blog/BlogLayout";

const DARK    = "#100B20";
const MED     = "#4A415E";
const LITE    = "#9E96B2";
const LAV     = "#E3DFFF";
const LAV_BTN = "#4F34C4";
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
  { href: "#sharing-news",       label: "How to Share the News" },
  { href: "#drafting-invitation", label: "Drafting Your Funeral Invitation" },
  { href: "#key-details",        label: "Key Details to Consider" },
  { href: "#what-to-include",    label: "What Should Be Included?" },
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

export default function CraftingInvitationsPage() {
  return (
    <BlogLayout
      title="Crafting Funeral Invitations: Guidance and Wording Examples"
      category="Guide"
      categoryBg={MINT}
      categoryText="#3AA838"
      author="Vale Family Advisors"
      date="2 June 2026"
      readTime="6 min"
      heroColor={MINT}
      heroImage="/guides/crafting-funeral-invitations.png"
      tocLinks={TOC}
    >

      {/* ── Intro ── */}
      <p style={P}>
        Sharing the news of a death and inviting others to a funeral is a sensitive task. When you are grieving,
        finding the right words can feel daunting. This guide is designed to help you communicate effectively while
        ensuring that those who cared for your loved one have the opportunity to pay their respects.
      </p>

      {/* ── Section 1 ── */}
      <section id="sharing-news" style={SCROLL_OFFSET}>
        <h2 style={H2}>How to Share the News</h2>
        <p style={P}>
          Today, funeral invitations often serve a dual purpose: they break the news of a passing while providing
          essential details about the service.
        </p>
        <ul className="mb-6" style={{ listStyle: "none", padding: 0 }}>
          <BulletItem>
            <span style={STRONG}>Personal Communication: </span>For close friends and family, a direct phone call or
            personal message is often the most respectful approach.
          </BulletItem>
          <BulletItem>
            <span style={STRONG}>Wider Circles: </span>For colleagues, members of clubs, or places of worship, you
            might reach out to a single point of contact — such as a club secretary or group leader — and ask them to
            forward the details to the wider group on your behalf.
          </BulletItem>
          <BulletItem>
            <span style={STRONG}>Digital Reach: </span>Social media and online obituaries have become standard ways
            to share arrangements quickly. Many funeral directors now provide digital portals where you can post the
            details, and mourners can RSVP at the touch of a button.
          </BulletItem>
        </ul>
      </section>

      {/* ── Section 2 ── */}
      <section id="drafting-invitation" style={SCROLL_OFFSET}>
        <h2 style={H2}>Drafting Your Funeral Invitation</h2>
        <p style={P}>
          Whether you are writing a formal notice or a heartfelt message, the tone should reflect your loved
          one&apos;s personality and your family&apos;s wishes. Below are two common formats to guide you.
        </p>

        {/* Example 1 */}
        <div
          className="rounded-xl p-5 mb-5"
          style={{ background: "#F8F8FF", border: `2px solid ${LAV}` }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
              style={{ background: LAV_BTN, color: "#FFFFFF" }}
              aria-hidden="true"
            >1</span>
            <p style={{ fontSize: "11px", fontWeight: 700, color: LAV_BTN, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 0 }}>
              Example 1: Direct and Informative
            </p>
          </div>
          <blockquote
            style={{
              fontSize: "14px",
              color: MED,
              lineHeight: 1.8,
              fontStyle: "italic",
              borderLeft: `3px solid ${LAV}`,
              paddingLeft: "16px",
              margin: 0,
            }}
          >
            &ldquo;It is with great sadness that we share the news of [Name]&rsquo;s passing, who died peacefully at
            [Location] on [Date]. We are so grateful for the kindness and support shown to [Name] during
            [his/her/their] final illness.
            <br /><br />
            The funeral will be held on [Day/Date] at [Time] at [Venue]. A reception will follow at [Venue
            Name/Location]. Please feel free to share this message with anyone who knew [Name] and would like to join
            us in celebrating [his/her/their] life.&rdquo;
          </blockquote>
        </div>

        {/* Example 2 */}
        <div
          className="rounded-xl p-5 mb-6"
          style={{ background: "#F3FDF3", border: `2px solid ${MINT}` }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
              style={{ background: "#3AA838", color: "#FFFFFF" }}
              aria-hidden="true"
            >2</span>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#3AA838", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 0 }}>
              Example 2: Traditional Notice
            </p>
          </div>
          <blockquote
            style={{
              fontSize: "14px",
              color: MED,
              lineHeight: 1.8,
              fontStyle: "italic",
              borderLeft: `3px solid ${MINT}`,
              paddingLeft: "16px",
              margin: 0,
            }}
          >
            &ldquo;In loving memory of [Name], who sadly passed away on [Date]. [Name] was a loving
            [Husband/Wife/Parent/Grandparent] and a cherished friend to many.
            <br /><br />
            A service will take place at [Venue] on [Date] at [Time], followed by a gathering at [Location].
            [Flowers may be sent to X Funeral Directors / In lieu of flowers, donations can be made to X Charity
            in [Name]&rsquo;s memory].&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── Section 3 ── */}
      <section id="key-details" style={SCROLL_OFFSET}>
        <h2 style={H2}>Key Details to Consider</h2>

        <div className="space-y-4 mb-6">
          {[
            {
              title: "Private Services",
              body: "If you prefer a small, intimate funeral, it is perfectly acceptable to state that the service is \"for close family only.\" You may choose to host a larger memorial service or celebration of life at a later date.",
            },
            {
              title: "Donations vs. Flowers",
              body: "If you would prefer donations to a specific charity rather than floral tributes, be sure to include the charity's name and instructions on how to contribute.",
            },
            {
              title: "Personal Touches",
              body: "Feel free to include a meaningful quote, a short poem, or a favourite photograph. If you are planning a less formal \"Celebration of Life,\" some families include small tokens, such as packets of forget-me-not seeds for guests to plant in memory of the deceased.",
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

      {/* ── Section 4 ── */}
      <section id="what-to-include" style={SCROLL_OFFSET}>
        <h2 style={H2}>What Should Be Included?</h2>
        <p style={P}>
          If you are designing a printed or digital invite, ensure the following information is clear:
        </p>

        <div className="rounded-xl p-6" style={{ background: YEL, border: "1px solid #E8E080" }}>
          <ul className="space-y-4">
            {[
              {
                label: "The Name",
                desc: "Full name and any nicknames by which they were known.",
              },
              {
                label: "Dates",
                desc: "Date of birth and date of death (optional, but common).",
              },
              {
                label: "The Logistics",
                desc: "Clearly stated date, time, and address of the venue.",
              },
              {
                label: "RSVPs",
                desc: "Contact details for someone to manage queries or attendance numbers.",
              },
              {
                label: "Special Instructions",
                desc: "Dress codes (e.g., \"bright colours encouraged\") or any specific requests regarding the service.",
              },
            ].map(({ label, desc }) => (
              <li key={label} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#806000" }} aria-hidden="true" />
                <p style={{ fontSize: "14px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
                  <span style={STRONG}>{label}: </span>{desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Closing note ── */}
      <div className="mt-10 rounded-xl p-5" style={{ background: "#F8F8FF", border: `1px solid ${BDR}` }}>
        <h3 style={{ ...H3, marginTop: 0, marginBottom: "8px" }}>Navigating the Process</h3>
        <p style={{ fontSize: "14px", color: MED, lineHeight: 1.75, marginBottom: 0 }}>
          Your funeral director is an invaluable resource during this time. They are experienced in drafting
          obituaries and notices, and they can often handle the publishing process for you in local newspapers or on
          dedicated online platforms.
          <br /><br />
          If you are currently handling arrangements, take things one step at a time. Whether you choose a formal
          invitation or a simple email, the most important thing is that the message comes from the heart.
        </p>
      </div>

    </BlogLayout>
  );
}
