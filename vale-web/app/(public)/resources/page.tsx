"use client";

import { useState, useEffect } from "react";
import { FileText, CheckCircle, Download, Shield, Star } from "lucide-react";

interface SignupRecord { id: string; email: string; name: string; signed_up_at: string }
interface DownloadRecord { id: string; resource_name: string; email: string; downloaded_at: string }
interface ChecklistSection { title: string; items: string[]; notes?: string[] }

const SIGNUP_KEY = "vale_resource_signups";
const DOWNLOAD_KEY = "vale_pdf_downloads";

const SECTIONS = [
  { title: "Before contacting a funeral director", count: 7, color: "#5D3A7A" },
  { title: "First 24–48 hours", count: 8, color: "#3F5E2C" },
  { title: "Planning the service", count: 9, color: "#1a3a52" },
  { title: "After the service", count: 8, color: "#8A5FAA" },
];

const CHECKLIST: ChecklistSection[] = [
  {
    title: "Section 1: Before Contacting a Funeral Director",
    items: [
      "Obtain a medical certificate of cause of death from the attending doctor",
      "If the person died alone, contact the police or coroner as required",
      "Check for any pre-paid funeral plan and contact the provider",
      "Review the will for any funeral wishes expressed",
      "Notify immediate family members and close friends",
      "Secure the deceased's home and any dependent pets",
      "Gather key documents: passport, insurance policies, and the will",
    ],
  },
  {
    title: "Section 2: First 24–48 Hours",
    items: [
      "Contact a funeral director to arrange collection of the deceased",
      "Register the death with the local register office (within 5 days in England and Wales)",
      "Collect the death certificate — several certified copies are recommended",
      "Notify the GP surgery and any specialist medical teams involved",
      "Contact the employer, school, or place of education if relevant",
      "Notify benefit agencies: DWP, Universal Credit, State Pension",
      "Check for any immediate financial obligations (e.g. direct debits, rent)",
      "Inform the wider community — friends, faith groups, clubs, colleagues",
    ],
  },
  {
    title: "Section 3: Planning the Service",
    items: [
      "Choose between burial and cremation",
      "Select a date, time, and venue for the service",
      "Engage a celebrant, minister, or officiant",
      "Choose hymns, readings, poems, or music",
      "Plan flowers and any personal tributes",
      "Write an obituary for local press or social media",
      "Arrange transport for the family on the day",
      "Organise an order of service or printed programme",
      "Consider reception or gathering arrangements after the service",
    ],
    notes: ["Special wishes:", "Music / readings:", "Other requests:"],
  },
  {
    title: "Section 4: After the Service",
    items: [
      "Obtain the Grant of Probate or Letters of Administration if required",
      "Notify banks, building societies, and financial institutions",
      "Contact HMRC to settle any outstanding tax affairs",
      "Cancel subscriptions, memberships, and direct debits",
      "Redirect mail and update key correspondents",
      "Distribute personal belongings and settle the estate",
      "Return any equipment borrowed from the NHS or local council",
      "Consider bereavement counselling or support for family members",
    ],
  },
];

async function generatePDF(name: string, email: string): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const W = 210;
  const H = 297;
  const MARGIN = 18;
  const CW = W - MARGIN * 2;

  const addHeader = () => {
    doc.setFillColor(26, 58, 82);
    doc.rect(0, 0, W, 20, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("VALE", MARGIN, 13);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Funeral Planning Checklist", MARGIN + 18, 13);
    doc.text("vale.co.uk", W - MARGIN, 13, { align: "right" });
  };

  const addFooter = (p: number) => {
    doc.setFillColor(26, 58, 82);
    doc.rect(0, H - 12, W, 12, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.text(
      "VALE  |  vale.co.uk  |  Helping families navigate one of life’s hardest moments.",
      MARGIN,
      H - 4.5
    );
    doc.text(`Page ${p} of 2`, W - MARGIN, H - 4.5, { align: "right" });
  };

  const drawCheckbox = (x: number, y: number) => {
    doc.setDrawColor(143, 160, 176);
    doc.setLineWidth(0.3);
    doc.rect(x, y - 3.2, 3.5, 3.5, "S");
  };

  const renderSection = (section: ChecklistSection, startY: number): number => {
    let y = startY;
    doc.setFillColor(212, 165, 116);
    doc.rect(MARGIN, y, CW, 7, "F");
    doc.setTextColor(26, 58, 82);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(section.title, MARGIN + 3, y + 4.8);
    y += 11;

    doc.setFont("helvetica", "normal");
    section.items.forEach((item) => {
      drawCheckbox(MARGIN, y);
      doc.setTextColor(63, 94, 44);
      doc.setFontSize(9);
      const lines = doc.splitTextToSize(item, CW - 8);
      doc.text(lines, MARGIN + 6, y);
      y += (lines as string[]).length * 4.5 + 1.5;
    });

    if (section.notes) {
      y += 3;
      section.notes.forEach((note) => {
        doc.setTextColor(95, 112, 128);
        doc.setFontSize(8.5);
        doc.text(note, MARGIN + 6, y);
        const noteW = doc.getTextWidth(note);
        doc.setDrawColor(195, 210, 220);
        doc.setLineWidth(0.3);
        doc.line(MARGIN + 6 + noteW + 2, y + 0.5, MARGIN + CW, y + 0.5);
        y += 7;
      });
    }

    return y + 5;
  };

  // Page 1
  addHeader();
  let y = 28;

  doc.setTextColor(26, 58, 82);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Funeral Planning Checklist", MARGIN, y);
  y += 6;

  doc.setTextColor(95, 112, 128);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const subtitle =
    "A step-by-step guide to help families at every stage — from the first hours to settling the estate.";
  const subtitleLines = doc.splitTextToSize(subtitle, CW) as string[];
  doc.text(subtitleLines, MARGIN, y);
  y += subtitleLines.length * 4.5 + 4;

  doc.setFillColor(212, 165, 116);
  doc.rect(MARGIN, y, CW, 0.5, "F");
  y += 6;

  if (name.trim()) {
    doc.setTextColor(93, 58, 122);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "italic");
    doc.text(`Prepared for ${name.trim()}`, MARGIN, y);
    y += 8;
  }

  y = renderSection(CHECKLIST[0], y);
  y = renderSection(CHECKLIST[1], y);
  addFooter(1);

  // Page 2
  doc.addPage();
  addHeader();
  y = 28;
  y = renderSection(CHECKLIST[2], y);
  y = renderSection(CHECKLIST[3], y);

  // Disclaimer
  y += 4;
  doc.setFillColor(245, 241, 232);
  doc.rect(MARGIN, y, CW, 24, "F");
  doc.setTextColor(95, 112, 128);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "italic");
  const disclaimer =
    "This checklist is intended as general guidance only and does not constitute legal, financial, or professional advice. " +
    "Requirements may vary in Scotland and Northern Ireland. VALE recommends consulting a qualified solicitor regarding probate and estate matters. " +
    "For bereavement support, contact Cruse Bereavement Care at cruse.org.uk.";
  const disclaimerLines = doc.splitTextToSize(disclaimer, CW - 6) as string[];
  doc.text(disclaimerLines, MARGIN + 3, y + 5);

  addFooter(2);

  // Log download
  try {
    const existing: DownloadRecord[] = JSON.parse(
      localStorage.getItem(DOWNLOAD_KEY) ?? "[]"
    );
    existing.unshift({
      id: crypto.randomUUID(),
      resource_name: "funeral-planning-checklist",
      email,
      downloaded_at: new Date().toISOString(),
    });
    localStorage.setItem(DOWNLOAD_KEY, JSON.stringify(existing));
  } catch {}

  doc.save("vale-funeral-planning-checklist.pdf");
}

export default function ResourcesPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    try {
      const existing: SignupRecord[] = JSON.parse(
        localStorage.getItem(SIGNUP_KEY) ?? "[]"
      );
      if (existing.length > 0) {
        setSubmitted(true);
        setName(existing[0].name);
        setEmail(existing[0].email);
      }
    } catch {}
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimName = name.trim();
    const trimEmail = email.trim();
    if (!trimName) { setError("Please enter your name."); return; }
    if (!trimEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      const existing: SignupRecord[] = JSON.parse(
        localStorage.getItem(SIGNUP_KEY) ?? "[]"
      );
      existing.unshift({
        id: crypto.randomUUID(),
        email: trimEmail,
        name: trimName,
        signed_up_at: new Date().toISOString(),
      });
      localStorage.setItem(SIGNUP_KEY, JSON.stringify(existing));
    } catch {}
    setError("");
    setSubmitted(true);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await generatePDF(name, email);
    } finally {
      setDownloading(false);
    }
  };

  const firstName = name.split(" ")[0];

  return (
    <div className="min-h-screen" style={{ background: "#F5F1E8" }}>
      {/* Hero */}
      <section style={{ background: "#5D3A7A" }}>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div
            className="animate-fade-rise inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-[11px] font-medium uppercase tracking-[0.13em]"
            style={{
              border: "0.5px solid rgba(197,210,220,0.3)",
              background: "rgba(197,210,220,0.15)",
              color: "#C5D2DC",
            }}
          >
            <FileText className="w-3.5 h-3.5" aria-hidden="true" />
            Free resource
          </div>
          <h1
            className="animate-fade-rise mb-5"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(38px, 6vw, 64px)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: "white",
            }}
          >
            Funeral Planning
            <br />
            <em style={{ color: "#C5D2DC", fontStyle: "italic" }}>Checklist</em>
          </h1>
          <p
            className="animate-fade-rise-delay text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(197,210,220,0.85)" }}
          >
            A clear, compassionate guide to help families navigate every step —
            from the first hours to settling the estate.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: What's inside */}
          <div>
            <div className="w-10 h-[2px] rounded-full mb-6" style={{ background: "#8A5FAA" }} aria-hidden="true" />
            <h2
              className="mb-3"
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontSize: "clamp(24px, 3vw, 36px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                fontWeight: 400,
                color: "#5D3A7A",
              }}
            >
              What&apos;s inside
            </h2>
            <p className="text-sm mb-8 leading-relaxed" style={{ color: "#8FA0B0" }}>
              32 practical steps across 4 clear sections — written with funeral
              directors, bereavement counsellors, and families in mind.
            </p>
            <div className="space-y-3">
              {SECTIONS.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-5 rounded-2xl transition-all duration-200"
                  style={{
                    background: "white",
                    border: "0.5px solid rgba(143,160,176,0.3)",
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
                    style={{
                      background: "rgba(138,95,170,0.12)",
                      color: "#8A5FAA",
                    }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#5D3A7A" }}
                    >
                      {s.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#8FA0B0" }}>
                      {s.count} steps
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-5 mt-8 pt-6" style={{ borderTop: "0.5px solid rgba(143,160,176,0.3)" }}>
              {[
                { icon: Shield, text: "No spam, ever" },
                { icon: CheckCircle, text: "Free download" },
                { icon: Star, text: "Reviewed by professionals" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 text-xs font-medium"
                  style={{ color: "#8FA0B0" }}
                >
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{ color: "#8A5FAA" }}
                    aria-hidden="true"
                  />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Signup / Download */}
          <div
            className="rounded-2xl p-7"
            style={{
              background: "white",
              border: "0.5px solid rgba(143,160,176,0.3)",
            }}
          >
            {!submitted ? (
              <>
                <h2
                  className="mb-1"
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    fontSize: "clamp(20px, 2vw, 26px)",
                    lineHeight: 1.2,
                    fontWeight: 400,
                    color: "#5D3A7A",
                  }}
                >
                  Get your free guide
                </h2>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: "#8FA0B0" }}>
                  Enter your details below. We&apos;ll never share your
                  information.
                </p>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="space-y-3 mb-4">
                    <div>
                      <label
                        htmlFor="res-name"
                        className="block text-sm font-medium mb-1.5"
                        style={{ color: "#5D3A7A" }}
                      >
                        Your name
                      </label>
                      <input
                        id="res-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setError("");
                        }}
                        autoComplete="name"
                        placeholder="e.g. Sarah Thompson"
                        className="w-full text-sm rounded-xl px-4 py-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA] focus-visible:ring-offset-1"
                        style={{
                          background: "#F5F1E8",
                          border: "0.5px solid rgba(143,160,176,0.4)",
                          color: "#3F5E2C",
                          minHeight: "44px",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="res-email"
                        className="block text-sm font-medium mb-1.5"
                        style={{ color: "#5D3A7A" }}
                      >
                        Email address
                      </label>
                      <input
                        id="res-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        autoComplete="email"
                        placeholder="e.g. sarah@example.com"
                        className="w-full text-sm rounded-xl px-4 py-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA] focus-visible:ring-offset-1"
                        style={{
                          background: "#F5F1E8",
                          border: "0.5px solid rgba(143,160,176,0.4)",
                          color: "#3F5E2C",
                          minHeight: "44px",
                        }}
                      />
                    </div>
                  </div>
                  {error && (
                    <p
                      role="alert"
                      className="text-sm mb-3"
                      style={{ color: "#C95548" }}
                    >
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 text-sm font-medium py-3 rounded-xl min-h-[52px] hover:scale-[1.02] active:scale-[0.98] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA] focus-visible:ring-offset-2"
                    style={{ background: "#5AAE55", color: "white" }}
                  >
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    Get your free guide
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "rgba(90,174,85,0.12)" }}
                >
                  <CheckCircle
                    className="w-7 h-7"
                    style={{ color: "#5AAE55" }}
                    aria-hidden="true"
                  />
                </div>
                <h2
                  className="mb-1"
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    fontSize: "clamp(20px, 2vw, 26px)",
                    lineHeight: 1.2,
                    fontWeight: 400,
                    color: "#5D3A7A",
                  }}
                >
                  {firstName ? `Thank you, ${firstName}.` : "Thank you."}
                </h2>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: "#8FA0B0" }}>
                  Your checklist is ready to download.
                </p>
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full flex items-center justify-center gap-2 text-sm font-medium py-3 rounded-xl min-h-[52px] hover:scale-[1.02] active:scale-[0.98] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA] focus-visible:ring-offset-2 disabled:opacity-60 disabled:scale-100"
                  style={{ background: "#5AAE55", color: "white" }}
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  {downloading ? "Generating…" : "Download PDF"}
                </button>
                <p className="text-xs mt-3" style={{ color: "#8FA0B0" }}>
                  Opens as a PDF in your downloads folder.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Checklist preview */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <div className="w-10 h-[2px] rounded-full mb-6" style={{ background: "#8A5FAA" }} aria-hidden="true" />
        <h2
          className="mb-2"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontSize: "clamp(22px, 2.5vw, 30px)",
            lineHeight: 1.2,
            fontWeight: 400,
            color: "#5D3A7A",
          }}
        >
          A look inside
        </h2>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: "#8FA0B0" }}>
          The first few steps from each section — the full guide covers all 32.
        </p>
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "white", border: "0.5px solid rgba(143,160,176,0.3)" }}
        >
          {CHECKLIST.map((section, si) => (
            <div
              key={si}
              style={{
                borderBottom:
                  si < CHECKLIST.length - 1
                    ? "0.5px solid rgba(143,160,176,0.2)"
                    : "none",
              }}
            >
              {/* Section header */}
              <div
                className="px-6 py-4 flex items-center gap-3"
                style={{ background: si % 2 === 0 ? "white" : "#F5F1E8" }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{
                    background: "rgba(138,95,170,0.12)",
                    color: "#8A5FAA",
                  }}
                  aria-hidden="true"
                >
                  {si + 1}
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#5D3A7A" }}
                >
                  {section.title.replace(/^Section \d+: /, "")}
                </span>
                <span
                  className="ml-auto text-xs font-medium"
                  style={{ color: "#8FA0B0" }}
                >
                  {section.items.length} steps
                </span>
              </div>

              {/* Preview items */}
              <div
                className="px-6 pb-5"
                style={{ background: si % 2 === 0 ? "white" : "#F5F1E8" }}
              >
                {section.items.slice(0, 3).map((item, ii) => (
                  <div
                    key={ii}
                    className="flex items-start gap-3 py-2"
                  >
                    <div
                      className="w-3.5 h-3.5 border rounded-sm mt-0.5 shrink-0"
                      style={{ borderColor: "rgba(138,95,170,0.35)" }}
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed" style={{ color: "#3F5E2C" }}>
                      {item}
                    </span>
                  </div>
                ))}
                {section.items.length > 3 && (
                  <p
                    className="text-xs mt-2 pl-6 font-medium"
                    style={{ color: "#8A5FAA" }}
                  >
                    + {section.items.length - 3} more steps in the full guide
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
