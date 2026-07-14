import BlogLayout from "@/components/blog/BlogLayout";

const DARK    = "#100B20";
const MED     = "#4A415E";
const LAV     = "#E3DFFF";
const LAV_BTN = "#4F34C4";
const MINT    = "#D3FCD2";
const PINK    = "#CFC8FF";
const YEL     = "#FCFBD2";
const BDR     = "#D5D0E4";

const H2: React.CSSProperties = { fontSize: "22px", fontWeight: 700, color: DARK, marginTop: "40px", marginBottom: "12px", lineHeight: 1.25 };
const H3: React.CSSProperties = { fontSize: "16px", fontWeight: 700, color: DARK, marginTop: "20px", marginBottom: "8px", lineHeight: 1.3 };
const P:  React.CSSProperties = { fontSize: "15px", color: MED, lineHeight: 1.8, marginBottom: "16px" };
const SB: React.CSSProperties = { fontWeight: 700, color: DARK };
const SO: React.CSSProperties = { scrollMarginTop: "96px" };

const TOC = [
  { href: "#conversation",       label: "Start with a Conversation" },
  { href: "#formal-provisions",  label: "Making Formal Provisions in Your Will" },
  { href: "#charity-schemes",    label: "Utilising Animal Charity Schemes" },
  { href: "#next-steps",         label: "Next Steps" },
];

export default function PlanningForYourPetPage() {
  return (
    <BlogLayout
      title="Planning for Your Pet's Future: A Guide to Pet Care After Bereavement"
      category="Guide"
      categoryBg={MINT}
      categoryText="#3AA838"
      author="Vale Family Advisors"
      date="10 May 2026"
      readTime="6 min"
      heroColor={YEL}
      tocLinks={TOC}
    >
      <p style={P}>
        For many of us, our pets are cherished members of the family. However, one of the most difficult questions to
        consider is what will happen to them if we are no longer here. Without clear arrangements, pets can face
        uncertainty and risk ending up in shelters. Taking proactive steps today ensures that your companion is
        protected, regardless of what the future holds.
      </p>

      {/* Conversation */}
      <section id="conversation" style={SO}>
        <h2 style={H2}>Start with a Conversation</h2>
        <p style={P}>
          It is a common misconception that a friend or family member will automatically step in to care for a pet.
          Even if you have named someone in your will, they are not legally obligated to take on the responsibility
          unless they have formally agreed to it.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { label: "Be Proactive", desc: "Have a direct, honest conversation with potential guardians. Confirm they are both willing and able to provide the care your pet needs.", color: MINT },
            { label: "Emergency Planning", desc: "If you live alone, ensure that neighbours, friends, or local authorities know about your pets. Consider keeping an \"in case of emergency\" card in your wallet that lists your pet's details and who should be contacted if you are suddenly taken ill.", color: YEL },
          ].map(({ label, desc, color }) => (
            <div key={label} className="rounded-xl p-4" style={{ background: color }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "6px" }}>{label}</p>
              <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Formal provisions */}
      <section id="formal-provisions" style={SO}>
        <h2 style={H2}>Making Formal Provisions in Your Will</h2>
        <p style={P}>
          Once you have identified a guardian, you can solidify these arrangements within your estate planning.
        </p>
        <div className="space-y-3 mb-4">
          {[
            { label: "Bequests", desc: "You can leave a specific sum of money to the person who will be taking on your pet. This fund is intended to cover the costs of food, grooming, and veterinary care for the remainder of the animal's life." },
            { label: "Discretionary Trusts", desc: "Alternatively, you can set up a trust specifically for your pet's upkeep, where the new guardian acts as the trustee. You can also specify where any remaining funds should go once the pet passes away." },
          ].map(({ label, desc }) => (
            <div key={label} className="rounded-xl p-4 flex gap-3" style={{ background: "#FAFAFA", border: `1px solid ${BDR}` }}>
              <div className="w-2 shrink-0 rounded-full self-stretch" style={{ background: LAV_BTN }} aria-hidden="true" />
              <p style={{ fontSize: "14px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
                <span style={SB}>{label}: </span>{desc}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-5 mb-4" style={{ background: LAV, border: `1px solid #B4B6F0` }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "6px" }}>Drafting Tips</p>
          <p style={{ fontSize: "14px", color: MED, lineHeight: 1.75, marginBottom: 0 }}>
            Avoid naming a specific animal in your will (e.g., &ldquo;my dog Buster&rdquo;), as your circumstances
            may change. Instead, use a general reference such as{" "}
            <span style={SB}>&ldquo;any pets I own at the time of my death.&rdquo;</span>
          </p>
        </div>

        <div className="rounded-xl p-5" style={{ background: MINT }}>
          <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "6px" }}>Letter of Wishes</p>
          <p style={{ fontSize: "14px", color: MED, lineHeight: 1.75, marginBottom: 0 }}>
            Create a separate, non-binding &ldquo;letter of wishes&rdquo; to keep with your will. This is the perfect
            place to detail your pet&apos;s personality, daily routine, preferred food, medication requirements, and
            their registered vet. You can update this document as often as you like without needing a solicitor.
          </p>
        </div>
      </section>

      {/* Charities */}
      <section id="charity-schemes" style={SO}>
        <h2 style={H2}>Utilising Animal Charity Schemes</h2>
        <p style={P}>
          If you do not have family or friends who can take on your pet, several national charities offer peace of
          mind through &ldquo;pre-need&rdquo; registration schemes:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { org: "RSPCA — Home for Life", desc: "This service grants the charity authority to take responsibility for your animal and find them a loving, vetted home.", color: PINK },
            { org: "Dogs Trust — Canine Care Card", desc: "The Dogs Trust will take in your dog upon your death. They pride themselves on a \"no-kill\" policy for healthy dogs, ensuring lifetime care if a new home cannot be found.", color: YEL },
            { org: "Cats Protection — Cat Guardians Card", desc: "When notified of your passing, they will collect your cat and work to find a new owner, providing lifetime care if a new home isn't immediately found.", color: MINT },
            { org: "The Cinnamon Trust", desc: "Unique in offering a network of volunteers who can help with dog walking and pet care if you become elderly or terminally ill. They also provide a foster-led service and lifetime care at their sanctuaries.", color: LAV },
          ].map(({ org, desc, color }) => (
            <div key={org} className="rounded-xl p-4" style={{ background: color }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "6px" }}>{org}</p>
              <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Next steps */}
      <section id="next-steps" style={SO}>
        <h2 style={H2}>Next Steps</h2>
        <div className="rounded-xl p-5" style={{ background: YEL, border: "1px solid #E8E080" }}>
          <p style={{ fontSize: "14px", color: MED, lineHeight: 1.75, marginBottom: 0 }}>
            Protecting your pet is a simple but vital part of estate planning. Whether you choose to entrust a family
            member or a reputable national charity, the effort you make today is a final act of love that ensures your
            companion&apos;s security and well-being.
            <br /><br />
            If you are drafting your will, talk to your solicitor about including a specific clause for your pets. It
            is a small addition that makes a world of difference.
          </p>
        </div>
      </section>
    </BlogLayout>
  );
}
