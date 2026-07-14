"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Printer, Search } from "lucide-react";
import { getVaultByToken, SERVICE_TYPE_LABELS, SERVICE_SIZE_LABELS, FLOWERS_LABELS, type VaultData } from "@/lib/vault";

const EASE = [0.16, 1, 0.3, 1] as const;

function formatDate(iso: string): string {
  try { return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }); }
  catch { return iso; }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 print:mb-6">
      <h2
        className="text-xs font-bold uppercase tracking-widest pb-2 mb-4"
        style={{ color: "#4A415E", borderBottom: "1px solid #D5D0E4" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function DataRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:gap-6 py-2.5 last:border-0" style={{ borderBottom: "1px solid rgba(213,208,228,0.6)" }}>
      <dt className="text-xs font-semibold sm:w-44 shrink-0 mb-0.5 sm:mb-0" style={{ color: "#4A415E" }}>{label}</dt>
      <dd className="text-sm leading-relaxed" style={{ color: "#4A415E" }}>{value}</dd>
    </div>
  );
}

export default function VaultSharePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const reduce = useReducedMotion();
  const [vault, setVault] = useState<VaultData | null | "loading">("loading");

  useEffect(() => { setVault(getVaultByToken(token)); }, [token]);

  if (vault === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FDFCFE" }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#100B20", borderTopColor: "transparent" }} aria-label="Loading" />
      </div>
    );
  }

  if (!vault) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ background: "#FDFCFE" }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(227,223,255,0.2)" }} aria-hidden="true"><span className="text-2xl">🔒</span></div>
        <h1 className="text-xl font-semibold mb-2" style={{ color: "#100B20", fontFamily: "var(--font-dm-sans)" }}>
          This Vault isn&apos;t available
        </h1>
        <p className="text-sm mb-6 max-w-sm" style={{ color: "#4A415E" }}>The link may be invalid, or the Vault has been removed.</p>
        <Link href="/" className="text-sm font-semibold hover:underline focus:outline-none rounded" style={{ color: "#4F34C4" }}>
          Back to Vale
        </Link>
      </div>
    );
  }

  const hasWishes = !!(vault.serviceType || vault.serviceSize || vault.religiousPreference);
  const hasDetails = !!(vault.musicSelections || vault.readings || vault.flowersPreference || vault.guestConsiderations);
  const hasFinancial = !!(vault.insuranceProvider || vault.policyNumber || vault.bankAccountRef || vault.willLocation || vault.solicitorName);

  return (
    <div className="min-h-screen" style={{ background: "#FDFCFE" }}>
      <header className="print:hidden" style={{ background: "white", borderBottom: "1px solid #D5D0E4" }}>
        <div className="max-w-[1366px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" aria-label="Vale homepage">
            <span className="text-2xl tracking-tight" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600, color: "#100B20" }}>Vale<span style={{ color: "#4F34C4" }}>.</span></span>
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-sm px-3 py-2 rounded min-h-[44px] hover:opacity-70 transition-opacity focus:outline-none"
            style={{ color: "#4A415E" }}
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            Print
          </button>
        </div>
      </header>

      <div className="hidden print:flex items-center gap-3 px-8 py-4" style={{ borderBottom: "1px solid #D5D0E4" }}>
        <span className="text-2xl font-semibold" style={{ color: "#100B20", fontFamily: "var(--font-dm-sans), sans-serif" }}>Vale<span style={{ color: "#4F34C4" }}>.</span></span>
        <span style={{ color: "#4A415E" }} aria-hidden="true">|</span>
        <span className="text-sm" style={{ color: "#4A415E" }}>Pre-arranged wishes</span>
      </div>

      <main className="max-w-[1366px] mx-auto px-6 py-10 print:py-6 print:px-8">
        <motion.div
          className="text-center mb-10 print:text-left print:mb-8"
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 print:hidden" style={{ background: "rgba(79,52,196,0.1)" }} aria-hidden="true"><span className="text-3xl">💛</span></div>
          <h1 className="text-2xl font-semibold mb-2" style={{ color: "#100B20", fontFamily: "var(--font-dm-sans)" }}>
            {vault.fullName}&apos;s Wishes
          </h1>
          <p className="text-sm leading-relaxed max-w-md mx-auto print:mx-0" style={{ color: "#4A415E" }}>
            These wishes were prepared in advance with care and love, using Vale Vault.
            {vault.dateOfBirth && <> Born {formatDate(vault.dateOfBirth)}.</>}
          </p>
          {vault.postcode && <p className="text-xs mt-1" style={{ color: "#4A415E" }}>Based in {vault.postcode}</p>}
        </motion.div>

        {hasWishes && (
          <Section title="Service wishes">
            <dl>
              <DataRow label="Service type" value={vault.serviceType ? SERVICE_TYPE_LABELS[vault.serviceType] : undefined} />
              <DataRow label="Number of guests" value={vault.serviceSize ? SERVICE_SIZE_LABELS[vault.serviceSize] : undefined} />
              <DataRow label="Religious preference" value={vault.religiousPreference || undefined} />
            </dl>
          </Section>
        )}

        {hasDetails && (
          <Section title="Personal touches">
            <dl>
              <DataRow label="Music" value={vault.musicSelections || undefined} />
              <DataRow label="Readings" value={vault.readings || undefined} />
              <DataRow label="Flowers" value={vault.flowersPreference ? FLOWERS_LABELS[vault.flowersPreference] : undefined} />
              <DataRow label="Guest notes" value={vault.guestConsiderations || undefined} />
            </dl>
          </Section>
        )}

        {hasFinancial && (
          <Section title="Practical information">
            <dl>
              <DataRow label="Insurance provider" value={vault.insuranceProvider || undefined} />
              <DataRow label="Policy number" value={vault.policyNumber || undefined} />
              <DataRow label="Bank reference" value={vault.bankAccountRef || undefined} />
              <DataRow label="Will location" value={vault.willLocation || undefined} />
              <DataRow label="Solicitor" value={vault.solicitorName || undefined} />
              <DataRow label="Solicitor phone" value={vault.solicitorPhone || undefined} />
            </dl>
          </Section>
        )}

        {vault.documents.length > 0 && (
          <Section title="Documents on file">
            <ul className="space-y-2">
              {vault.documents.map((doc) => (
                <li key={doc.id} className="flex items-center gap-3 text-sm">
                  <span aria-hidden="true">📄</span>
                  <span className="font-medium" style={{ color: "#4A415E" }}>{doc.label}</span>
                  <span style={{ color: "#4A415E" }}>— {doc.fileName}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs mt-3 leading-relaxed" style={{ color: "#4A415E" }}>
              These documents are held securely in the Vault and can be accessed by the account holder.
            </p>
          </Section>
        )}

        <div className="mt-10 pt-8 text-center print:hidden" style={{ borderTop: "1px solid #D5D0E4" }}>
          <p className="text-sm mb-4" style={{ color: "#4A415E" }}>Ready to find a funeral director who can honour these wishes?</p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity min-h-[44px] focus:outline-none"
            style={{ background: "#4F34C4" }}
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            Find a funeral director on Vale
          </Link>
          <p className="text-xs mt-6" style={{ color: "#4A415E" }}>
            Prepared with <Link href="/" className="hover:underline" style={{ color: "#4F34C4" }}>Vale Vault</Link> · Private &amp; secure
          </p>
        </div>

        <div className="hidden print:block mt-8 pt-4 text-xs" style={{ borderTop: "1px solid #D5D0E4", color: "#4A415E" }}>
          Prepared with care using Vale Vault (vale.co.uk) · Printed {new Date().toLocaleDateString("en-GB")}
        </div>
      </main>
    </div>
  );
}
