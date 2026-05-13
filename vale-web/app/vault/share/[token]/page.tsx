"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Printer, Search } from "lucide-react";
import { getVaultByToken, SERVICE_TYPE_LABELS, SERVICE_SIZE_LABELS, FLOWERS_LABELS, type VaultData } from "@/lib/vault";

function formatDate(iso: string): string {
  try { return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }); }
  catch { return iso; }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 print:mb-6">
      <h2
        className="text-xs font-bold uppercase tracking-widest pb-2 mb-4"
        style={{ color: "#7A6E64", borderBottom: "1px solid #E8E2D8" }}
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
    <div className="flex flex-col sm:flex-row sm:gap-6 py-2.5 last:border-0" style={{ borderBottom: "1px solid rgba(234,242,238,0.6)" }}>
      <dt className="text-xs font-semibold sm:w-44 shrink-0 mb-0.5 sm:mb-0" style={{ color: "#7A6E64" }}>{label}</dt>
      <dd className="text-sm leading-relaxed" style={{ color: "#5A4E44" }}>{value}</dd>
    </div>
  );
}

export default function VaultSharePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [vault, setVault] = useState<VaultData | null | "loading">("loading");

  useEffect(() => { setVault(getVaultByToken(token)); }, [token]);

  if (vault === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F7F3EE" }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#1C1F2A", borderTopColor: "transparent" }} aria-label="Loading" />
      </div>
    );
  }

  if (!vault) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ background: "#F7F3EE" }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(234,242,238,0.4)" }} aria-hidden="true"><span className="text-2xl">🔒</span></div>
        <h1 className="text-xl font-semibold mb-2" style={{ color: "#1C1F2A", fontFamily: "var(--font-cormorant)" }}>
          This Vault isn&apos;t available
        </h1>
        <p className="text-sm mb-6 max-w-sm" style={{ color: "#7A6E64" }}>The link may be invalid, or the Vault has been removed.</p>
        <Link href="/" className="text-sm font-semibold hover:underline focus:outline-none rounded" style={{ color: "#5E8B73" }}>
          Back to Vale
        </Link>
      </div>
    );
  }

  const hasWishes = !!(vault.serviceType || vault.serviceSize || vault.religiousPreference);
  const hasDetails = !!(vault.musicSelections || vault.readings || vault.flowersPreference || vault.guestConsiderations);
  const hasFinancial = !!(vault.insuranceProvider || vault.policyNumber || vault.bankAccountRef || vault.willLocation || vault.solicitorName);

  return (
    <div className="min-h-screen" style={{ background: "#F7F3EE" }}>
      <header className="print:hidden" style={{ background: "white", borderBottom: "1px solid #E8E2D8" }}>
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" aria-label="Vale homepage">
            <span className="text-2xl tracking-tight" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#1C1F2A" }}>Vale<span style={{ color: "#5E8B73" }}>.</span></span>
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-sm px-3 py-2 rounded min-h-[44px] hover:opacity-70 transition-opacity focus:outline-none"
            style={{ color: "#7A6E64" }}
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            Print
          </button>
        </div>
      </header>

      <div className="hidden print:flex items-center gap-3 px-8 py-4" style={{ borderBottom: "1px solid #E8E2D8" }}>
        <span className="text-2xl font-semibold" style={{ color: "#1C1F2A", fontFamily: "var(--font-cormorant), serif" }}>Vale<span style={{ color: "#5E8B73" }}>.</span></span>
        <span style={{ color: "#7A6E64" }} aria-hidden="true">|</span>
        <span className="text-sm" style={{ color: "#7A6E64" }}>Pre-arranged wishes</span>
      </div>

      <main className="max-w-2xl mx-auto px-6 py-10 print:py-6 print:px-8">
        <div className="text-center mb-10 print:text-left print:mb-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 print:hidden" style={{ background: "rgba(94,139,115,0.1)" }} aria-hidden="true"><span className="text-3xl">💛</span></div>
          <h1 className="text-2xl font-semibold mb-2" style={{ color: "#1C1F2A", fontFamily: "var(--font-cormorant)" }}>
            {vault.fullName}&apos;s Wishes
          </h1>
          <p className="text-sm leading-relaxed max-w-md mx-auto print:mx-0" style={{ color: "#7A6E64" }}>
            These wishes were prepared in advance with care and love, using Vale Vault.
            {vault.dateOfBirth && <> Born {formatDate(vault.dateOfBirth)}.</>}
          </p>
          {vault.postcode && <p className="text-xs mt-1" style={{ color: "#7A6E64" }}>Based in {vault.postcode}</p>}
        </div>

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
                  <span className="font-medium" style={{ color: "#5A4E44" }}>{doc.label}</span>
                  <span style={{ color: "#7A6E64" }}>— {doc.fileName}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs mt-3 leading-relaxed" style={{ color: "#7A6E64" }}>
              These documents are held securely in the Vault and can be accessed by the account holder.
            </p>
          </Section>
        )}

        <div className="mt-10 pt-8 text-center print:hidden" style={{ borderTop: "1px solid #E8E2D8" }}>
          <p className="text-sm mb-4" style={{ color: "#7A6E64" }}>Ready to find a funeral director who can honour these wishes?</p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity min-h-[44px] focus:outline-none"
            style={{ background: "#1C1F2A" }}
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            Find a funeral director on Vale
          </Link>
          <p className="text-xs mt-6" style={{ color: "#7A6E64" }}>
            Prepared with <Link href="/" className="hover:underline" style={{ color: "#5E8B73" }}>Vale Vault</Link> · Private &amp; secure
          </p>
        </div>

        <div className="hidden print:block mt-8 pt-4 text-xs" style={{ borderTop: "1px solid #E8E2D8", color: "#7A6E64" }}>
          Prepared with care using Vale Vault (vale.co.uk) · Printed {new Date().toLocaleDateString("en-GB")}
        </div>
      </main>
    </div>
  );
}
