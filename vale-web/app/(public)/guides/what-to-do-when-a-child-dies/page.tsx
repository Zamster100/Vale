import { Heart } from "lucide-react";
import BlogLayout from "@/components/blog/BlogLayout";

const DARK    = "#1A1A2E";
const MED     = "#5C5C7A";
const LAV     = "#D2D3FC";
const LAV_BTN = "#6B6DE8";
const PINK    = "#FBD2FC";
const MINT    = "#D3FCD2";
const YEL     = "#FCFBD2";
const BDR     = "#E8E8F4";

const H2: React.CSSProperties = { fontSize: "22px", fontWeight: 700, color: DARK, marginTop: "40px", marginBottom: "12px", lineHeight: 1.25 };
const H3: React.CSSProperties = { fontSize: "16px", fontWeight: 700, color: DARK, marginTop: "20px", marginBottom: "8px", lineHeight: 1.3 };
const P:  React.CSSProperties = { fontSize: "15px", color: MED, lineHeight: 1.8, marginBottom: "16px" };
const SB: React.CSSProperties = { fontWeight: 700, color: DARK };
const SO: React.CSSProperties = { scrollMarginTop: "96px" };

const TOC = [
  { href: "#registering-death",  label: "Registering the Death" },
  { href: "#notifying-agencies", label: "Notifying Financial and Government Agencies" },
  { href: "#savings",            label: "Child Trust Funds and Savings" },
  { href: "#employment",         label: "Employment and Compassionate Leave" },
  { href: "#finding-support",    label: "Finding Support" },
];

export default function WhatToDoWhenChildDiesPage() {
  return (
    <BlogLayout
      title="What To Do When a Child Dies"
      category="Support"
      categoryBg={PINK}
      categoryText="#C45EC4"
      author="Vale Family Advisors"
      date="25 May 2026"
      readTime="8 min"
      heroColor={PINK}
      tocLinks={TOC}
    >
      {/* Sympathetic intro */}
      <div className="rounded-xl p-5 mb-8 flex gap-4" style={{ background: PINK, border: "1px solid #F0B0F0" }}>
        <Heart className="w-5 h-5 mt-0.5 shrink-0 fill-current" style={{ color: "#C45EC4" }} aria-hidden="true" />
        <p style={{ fontSize: "15px", color: MED, lineHeight: 1.75, marginBottom: 0 }}>
          If you are reading this page, please accept our deepest and most sincere condolences for the loss of your
          child or baby. We recognise that this is an unimaginably painful time. While your priority is, and should
          remain, your emotional well-being and that of your family, there are practical and administrative tasks that
          will eventually need to be addressed.
          <br /><br />
          We recommend that you do not face this alone. If possible, ask a trusted family member or close friend to
          handle these phone calls and notifications on your behalf.
        </p>
      </div>

      <h2 style={{ ...H2, marginTop: 0 }}>Essential Administrative Steps</h2>

      {/* Registering */}
      <section id="registering-death" style={SO}>
        <h3 style={H3}>Registering the Death</h3>
        <p style={P}>
          As with any death, a child&apos;s passing must be legally registered. This is a process that either parent can
          undertake. Please note:
        </p>
        <div className="space-y-3 mb-6">
          {[
            { label: "Newborns", desc: "If a baby dies shortly after birth, both a birth registration and a death registration are required." },
            { label: "Stillbirths", desc: "A stillbirth — defined as a baby delivered at 24 weeks of pregnancy or later — must also be officially registered." },
          ].map(({ label, desc }) => (
            <div key={label} className="rounded-xl p-4 flex gap-3" style={{ background: "#F8F8FF", border: `1px solid ${BDR}` }}>
              <div className="w-2 shrink-0 rounded-full self-stretch" style={{ background: LAV_BTN }} aria-hidden="true" />
              <p style={{ fontSize: "14px", color: MED, lineHeight: 1.7, marginBottom: 0 }}>
                <span style={SB}>{label}: </span>{desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Notifying agencies */}
      <section id="notifying-agencies" style={SO}>
        <h3 style={H3}>Notifying Financial and Government Agencies</h3>
        <p style={P}>
          To ensure your records are updated and to avoid the distress of future administrative issues, you will need
          to contact several departments.
        </p>
        <div className="space-y-3 mb-6">
          {[
            {
              label: "Child Benefit Office",
              desc: "You should notify them as soon as you feel able. Generally, payments continue for eight weeks following a child's death, which can provide a brief financial cushion. If your child passed away at birth, you can still claim this eight-week period, provided you apply within three months. (Note: These payments do not apply to stillbirths).",
            },
            {
              label: "Tax Credit Office",
              desc: "If your family receives Tax Credits, you are requested to inform the office within one month of the loss. This helps ensure your claim is adjusted correctly. Similar to Child Benefit, payments usually continue for up to eight weeks.",
            },
            {
              label: "Sure Start Maternity Grant",
              desc: "If you were expecting a baby or have a newborn, you may be entitled to a one-off £500 grant if you meet certain criteria. You must register your claim within three months of the birth.",
            },
          ].map(({ label, desc }) => (
            <div key={label} className="rounded-xl p-4" style={{ background: LAV }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "5px" }}>{label}</p>
              <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Savings */}
      <section id="savings" style={SO}>
        <h3 style={H3}>Child Trust Funds and Savings</h3>
        <p style={P}>
          If your child held a Child Trust Fund (or any other savings account), these are considered part of the
          child&apos;s estate.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { label: "Accessing Funds", desc: "These accounts will be inherited by the next-of-kin, usually the parents. To close these accounts or access the funds, the bank or building society will require a copy of the death certificate.", color: YEL },
            { label: "Early Access", desc: "In cases where a child was terminally ill, HMRC provides a process for early access to these funds through a specific \"terminal illness\" application form.", color: MINT },
          ].map(({ label, desc, color }) => (
            <div key={label} className="rounded-xl p-4" style={{ background: color }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "6px" }}>{label}</p>
              <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Employment */}
      <section id="employment" style={SO}>
        <h3 style={H3}>Employment and Compassionate Leave</h3>
        <p style={P}>
          It is important to understand your rights regarding time away from work while you process your grief.
        </p>
        <div className="space-y-3 mb-6">
          {[
            { label: "Maternity and Paternity Leave", desc: "Parents are entitled to full statutory maternity or paternity leave if their baby is stillborn or dies shortly after birth." },
            { label: "Loss of an Older Child", desc: "Compassionate leave for the loss of an older child is currently at the discretion of the employer. However, many companies have dedicated bereavement policies." },
            { label: "Statutory Sick Pay", desc: "If you are struggling to return to work due to the profound impact of grief — such as severe anxiety, depression, or shock — your GP may advise that you take time off under Statutory Sick Pay." },
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

      {/* Support */}
      <section id="finding-support" style={SO}>
        <h2 style={H2}>Finding Support</h2>
        <p style={P}>
          The grief that follows the loss of a child is unique and life-altering. You are not expected to walk this
          path alone.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { title: "Peer Support and Counselling", body: "There are numerous charities, listening services, and support groups dedicated to bereaved parents. Connecting with others who have experienced a similar loss can sometimes provide a unique form of comfort.", color: PINK },
            { title: "Understanding Grief", body: "You may find it helpful to read about the different models of grief. While everyone's journey is entirely personal and there is no \"right\" way to feel, understanding the psychological aspects of bereavement can sometimes help you navigate your own emotions.", color: LAV },
          ].map(({ title, body, color }) => (
            <div key={title} className="rounded-xl p-4" style={{ background: color }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: DARK, marginBottom: "6px" }}>{title}</p>
              <p style={{ fontSize: "13px", color: MED, lineHeight: 1.65, marginBottom: 0 }}>{body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-5" style={{ background: "#F8F8FF", border: `1px solid ${BDR}` }}>
          <p style={{ fontSize: "14px", color: MED, lineHeight: 1.75, marginBottom: 0 }}>
            If you are in immediate need of someone to talk to, please consider reaching out to{" "}
            <span style={SB}>Cruse Bereavement Support</span> or the <span style={SB}>Samaritans</span>, who are
            available 24/7 to listen.
          </p>
        </div>
      </section>
    </BlogLayout>
  );
}
