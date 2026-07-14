"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ShieldCheck, Download, FileCheck2 } from "lucide-react";

interface SignupRecord { id: string; email: string; name: string; signed_up_at: string }
interface DownloadRecord { id: string; resource_name: string; email: string; downloaded_at: string }
interface ChecklistSection { title: string; items: string[]; notes?: string[] }

const SIGNUP_KEY = "vale_resource_signups";
const DOWNLOAD_KEY = "vale_pdf_downloads";

/* ─── Design tokens ─────────────────────────────────────────────── */
const DARK  = "#100B20";
const MED   = "#4A415E";
const BDR   = "#E3DFFF";
const LAV   = "#F4F0FF";
const PURPLE       = "#4F34C4";
const PURPLE_MUTED = "#A898F4";
const PURPLE_ICON  = "#7C69EB";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SECTIONS = [
  { title: "Before contacting a funeral director", count: "7 steps" },
  { title: "First 24–48 hours", count: "8 steps" },
  { title: "Planning the service", count: "9 steps" },
  { title: "After the service", count: "8 steps" },
];

const trustItems = ["No spam, ever", "Free download", "Reviewed by professionals"];

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
    doc.setFillColor(28, 31, 42);
    doc.rect(0, 0, W, 20, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Vale", MARGIN, 13);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Funeral Planning Checklist", MARGIN + 18, 13);
    doc.text("vale.co.uk", W - MARGIN, 13, { align: "right" });
  };

  const addFooter = (p: number) => {
    doc.setFillColor(28, 31, 42);
    doc.rect(0, H - 12, W, 12, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Vale  |  vale.co.uk  |  Helping families navigate one of life’s hardest moments.",
      MARGIN,
      H - 4.5
    );
    doc.text(`Page ${p} of 2`, W - MARGIN, H - 4.5, { align: "right" });
  };

  const drawCheckbox = (x: number, y: number) => {
    doc.setDrawColor(94, 139, 115);
    doc.setLineWidth(0.3);
    doc.rect(x, y - 3.2, 3.5, 3.5, "S");
  };

  const renderSection = (section: ChecklistSection, startY: number): number => {
    let y = startY;
    doc.setFillColor(234, 242, 238);
    doc.rect(MARGIN, y, CW, 7, "F");
    doc.setTextColor(28, 31, 42);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(section.title.replace(/^Section \d+: /, ""), MARGIN + 3, y + 4.8);
    y += 11;

    doc.setFont("helvetica", "normal");
    section.items.forEach((item) => {
      drawCheckbox(MARGIN, y);
      doc.setTextColor(90, 78, 68);
      doc.setFontSize(9);
      const lines = doc.splitTextToSize(item, CW - 8);
      doc.text(lines, MARGIN + 6, y);
      y += (lines as string[]).length * 4.5 + 1.5;
    });

    if (section.notes) {
      y += 3;
      section.notes.forEach((note) => {
        doc.setTextColor(122, 110, 100);
        doc.setFontSize(8.5);
        doc.text(note, MARGIN + 6, y);
        const noteW = doc.getTextWidth(note);
        doc.setDrawColor(232, 226, 216);
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

  doc.setTextColor(93, 58, 122);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Funeral Planning Checklist", MARGIN, y);
  y += 6;

  doc.setTextColor(143, 160, 176);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const subtitle =
    "A step-by-step guide to help families at every stage — from the first hours to settling the estate.";
  const subtitleLines = doc.splitTextToSize(subtitle, CW) as string[];
  doc.text(subtitleLines, MARGIN, y);
  y += subtitleLines.length * 4.5 + 4;

  doc.setFillColor(94, 139, 115);
  doc.rect(MARGIN, y, CW, 0.5, "F");
  y += 6;

  if (name.trim()) {
    doc.setTextColor(28, 31, 42);
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
  doc.setFillColor(247, 243, 238);
  doc.rect(MARGIN, y, CW, 24, "F");
  doc.setTextColor(95, 112, 128);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "italic");
  const disclaimer =
    "This checklist is intended as general guidance only and does not constitute legal, financial, or professional advice. " +
    "Requirements may vary in Scotland and Northern Ireland. Vale recommends consulting a qualified solicitor regarding probate and estate matters. " +
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
  const reduce = useReducedMotion();
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
  });
  const revealUp = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" } as const,
    transition: { duration: 0.55, delay, ease: EASE },
  });

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
    <section className="bg-[#F4F0FF] py-16 md:py-24" aria-labelledby="funeral-guide-heading">
      <div className="max-w-[1366px] mx-auto px-4 sm:px-[1.7rem]">

        {/* Two-column: intro + form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-20 md:mb-28">

          {/* LEFT */}
          <motion.div {...fadeUp(0)}>
            <motion.p
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[12px] font-[700] tracking-[0.08em] uppercase text-[#4F34C4] border border-[#E3DFFF]"
              {...fadeUp(0)}
            >
              Free resource
            </motion.p>
            <motion.h1
              id="funeral-guide-heading"
              className="text-[36px] sm:text-[48px] lg:text-[56px] font-[900] leading-[1.05] tracking-[-0.03em] text-[#100B20] mb-5"
              style={{ textWrap: "balance" } as React.CSSProperties}
              {...fadeUp(0.08)}
            >
              Funeral Planning Checklist
            </motion.h1>
            <motion.p
              className="text-[16px] md:text-[18px] font-[400] leading-[1.6] text-[#4A415E] mb-8"
              style={{ maxWidth: "52ch" } as React.CSSProperties}
              {...fadeUp(0.16)}
            >
              A clear, compassionate guide to help families navigate every step — from the
              first hours to settling the estate.
            </motion.p>

            {/* What's inside */}
            <motion.div className="mb-8" {...fadeUp(0.22)}>
              <h2 className="text-[15px] font-[700] tracking-[0.04em] uppercase text-[#26126E] mb-3">
                What&apos;s inside
              </h2>
              <p className="text-[15px] md:text-[16px] font-[400] leading-[1.65] text-[#4A415E]" style={{ maxWidth: "52ch" }}>
                32 practical steps across 4 clear sections — written with funeral directors,
                bereavement counsellors, and families in mind.
              </p>
            </motion.div>

            {/* Trust row */}
            <motion.div className="flex flex-wrap items-center gap-3" {...fadeUp(0.28)}>
              {trustItems.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-[600] text-[#26126E] border border-[#E3DFFF]"
                >
                  <ShieldCheck size={14} className="flex-shrink-0 text-[#7C69EB]" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div
            className="w-full lg:sticky lg:top-24 rounded-2xl bg-white p-8 md:p-10"
            style={{ boxShadow: "0 12px 50px rgba(79,52,196,0.10)" }}
            {...fadeUp(0.1)}
          >
            {submitted ? (
              <div className="text-center py-6" role="status" aria-live="polite">
                <span
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
                  style={{ backgroundColor: "#F4F0FF", color: "#4F34C4" }}
                  aria-hidden="true"
                >
                  <FileCheck2 size={26} />
                </span>
                <h3 className="text-[24px] md:text-[28px] font-[900] leading-[1.15] tracking-[-0.02em] text-[#100B20] mb-3">
                  {firstName ? `Thank you, ${firstName}.` : "Thank you."}
                </h3>
                <p className="text-[15px] font-[400] leading-[1.6] text-[#4A415E] mb-6" style={{ maxWidth: "40ch", margin: "0 auto" }}>
                  Your Funeral Planning Checklist is ready to download.
                </p>
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-[#4F34C4] text-white text-[15px] font-[700] transition-colors duration-200 ease-out hover:bg-[#3B229D] active:bg-[#26126E] disabled:opacity-60"
                >
                  <Download size={16} aria-hidden="true" />
                  {downloading ? "Generating…" : "Download PDF"}
                </button>
                <p className="text-[13px] font-[400] text-[#4A415E] mt-3">
                  Opens as a PDF in your downloads folder.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: "#F4F0FF", color: "#4F34C4" }}
                    aria-hidden="true"
                  >
                    <Download size={18} />
                  </span>
                  <h3 className="text-[22px] md:text-[26px] font-[900] leading-[1.15] tracking-[-0.02em] text-[#100B20]">
                    Get your free guide
                  </h3>
                </div>
                <p className="text-[14px] font-[400] leading-[1.6] text-[#4A415E] mb-7">
                  Enter your details below. We&apos;ll never share your information.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="res-name" className="sr-only">Your name</label>
                    <input
                      id="res-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setError(""); }}
                      placeholder="Your name"
                      className="w-full rounded-xl bg-[#F4F0FF] border border-[#E3DFFF] px-4 py-3 text-[15px] font-[400] text-[#100B20] placeholder:text-[#9E96B2] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F34C4]/20 focus:border-[#4F34C4]"
                    />
                  </div>
                  <div>
                    <label htmlFor="res-email" className="sr-only">Email address</label>
                    <input
                      id="res-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      placeholder="Email address"
                      className="w-full rounded-xl bg-[#F4F0FF] border border-[#E3DFFF] px-4 py-3 text-[15px] font-[400] text-[#100B20] placeholder:text-[#9E96B2] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F34C4]/20 focus:border-[#4F34C4]"
                    />
                  </div>
                  {error && (
                    <p role="alert" className="text-[13px]" style={{ color: "#C95548" }}>
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-xl bg-[#4F34C4] text-white text-[15px] font-[700] transition-colors duration-200 ease-out hover:bg-[#3B229D] active:bg-[#26126E]"
                  >
                    Get your free guide
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>

        {/* Four section tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-16 md:mb-20">
          {SECTIONS.map(({ title, count }, i) => (
            <motion.div
              key={title}
              className="rounded-2xl bg-white p-6 flex flex-col"
              {...revealUp(0.05 + i * 0.09)}
            >
              <span
                className="inline-flex items-center justify-center w-11 h-11 rounded-full text-[18px] font-[900] mb-5"
                style={{ backgroundColor: "#F4F0FF", color: "#A898F4" }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="text-[16px] font-[700] leading-[1.3] text-[#100B20] mb-2">{title}</h3>
              <p className="mt-auto text-[13px] font-[600] text-[#A898F4]">{count}</p>
            </motion.div>
          ))}
        </div>

        {/* A look inside */}
        <motion.div className="max-w-2xl mb-10" {...revealUp()}>
          <h2
            className="text-[26px] md:text-[32px] font-[900] leading-[1.12] tracking-[-0.02em] text-[#100B20] mb-3"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            A look inside
          </h2>
          <p className="text-[15px] md:text-[16px] font-[400] leading-[1.65] text-[#4A415E]">
            The first few steps from each section — the full guide covers all 32.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-16">
          {CHECKLIST.map((section, i) => {
            const title = section.title.replace(/^Section \d+: /, "");
            const preview = section.items.slice(0, 3);
            const more = section.items.length - 3;
            return (
              <motion.div
                key={section.title}
                className="rounded-2xl bg-white p-7"
                {...revealUp(0.05 + (i % 2) * 0.09)}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full text-[14px] font-[900] flex-shrink-0"
                    style={{ backgroundColor: "#F4F0FF", color: "#A898F4" }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-[16px] font-[700] leading-[1.25] text-[#100B20]">{title}</h3>
                </div>
                <ul className="space-y-3 mb-4">
                  {preview.map((step) => (
                    <li key={step} className="flex items-start gap-3">
                      <Check size={16} className="mt-0.5 flex-shrink-0 text-[#7C69EB]" aria-hidden="true" />
                      <span className="text-[14px] font-[400] leading-[1.55] text-[#4A415E]">{step}</span>
                    </li>
                  ))}
                </ul>
                {more > 0 && (
                  <p className="text-[13px] font-[600] text-[#A898F4] pl-7">+ {more} more steps in the full guide</p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA to search */}
        <motion.div className="text-center" {...revealUp()}>
          <p className="text-[15px] font-[400] text-[#4A415E] mb-5">
            Ready to find a funeral director?
          </p>
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-7 py-3 rounded-xl bg-[#4F34C4] text-white text-[15px] font-[700] transition-[background-color] duration-200 ease-out hover:bg-[#3B229D] active:bg-[#26126E] group"
          >
            Search verified directors
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
