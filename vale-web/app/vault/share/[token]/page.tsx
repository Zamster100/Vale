"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Printer, Search } from "lucide-react";
import {
  getVaultByToken,
  SERVICE_TYPE_LABELS,
  SERVICE_SIZE_LABELS,
  FLOWERS_LABELS,
  type VaultData,
} from "@/lib/vault";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 print:mb-6">
      <h2 className="text-xs font-bold uppercase tracking-widest text-[#6b7280] border-b border-[#e5e7eb] pb-2 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function DataRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:gap-6 py-2.5 border-b border-[#f3f4f6] last:border-0">
      <dt className="text-xs font-semibold text-[#6b7280] sm:w-44 shrink-0 mb-0.5 sm:mb-0">
        {label}
      </dt>
      <dd className="text-sm text-[#111827] leading-relaxed">{value}</dd>
    </div>
  );
}

export default function VaultSharePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const [vault, setVault] = useState<VaultData | null | "loading">("loading");

  useEffect(() => {
    setVault(getVaultByToken(token));
  }, [token]);

  if (vault === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div
          className="w-8 h-8 border-2 border-[#1a3a52] border-t-transparent rounded-full animate-spin"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (!vault) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center justify-center px-4 text-center">
        <div
          className="w-14 h-14 bg-[#f3f4f6] rounded-full flex items-center justify-center mb-4 text-2xl"
          aria-hidden="true"
        >
          🔒
        </div>
        <h1 className="text-xl font-bold text-[#1a3a52] mb-2">
          This Vault isn&apos;t available
        </h1>
        <p className="text-sm text-[#6b7280] mb-6 max-w-sm">
          The link may be invalid, or the Vault has been removed.
        </p>
        <Link
          href="/"
          className="text-sm font-semibold text-[#1a3a52] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded"
        >
          Back to VALE
        </Link>
      </div>
    );
  }

  const hasWishes = !!(vault.serviceType || vault.serviceSize || vault.religiousPreference);
  const hasDetails = !!(
    vault.musicSelections ||
    vault.readings ||
    vault.flowersPreference ||
    vault.guestConsiderations
  );
  const hasFinancial = !!(
    vault.insuranceProvider ||
    vault.policyNumber ||
    vault.bankAccountRef ||
    vault.willLocation ||
    vault.solicitorName
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Screen header */}
      <header className="border-b border-[#e5e7eb] print:hidden">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="VALE homepage">
            <div
              className="w-8 h-8 bg-[#1a3a52] rounded flex items-center justify-center"
              aria-hidden="true"
            >
              <MapPin className="w-4 h-4 text-[#d4a574]" />
            </div>
            <span className="text-xl font-bold text-[#1a3a52] tracking-tight">
              VALE
            </span>
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#1a3a52] transition-colors px-3 py-2 rounded min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574]"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            Print
          </button>
        </div>
      </header>

      {/* Print header */}
      <div className="hidden print:flex items-center gap-3 px-8 py-4 border-b border-[#e5e7eb]">
        <span className="text-2xl font-bold text-[#1a3a52]">VALE</span>
        <span className="text-[#6b7280]" aria-hidden="true">|</span>
        <span className="text-[#6b7280] text-sm">Pre-arranged wishes</span>
      </div>

      <main className="max-w-2xl mx-auto px-6 py-10 print:py-6 print:px-8">
        {/* Intro */}
        <div className="text-center mb-10 print:text-left print:mb-8">
          <div
            className="w-16 h-16 bg-[#faf6f1] rounded-full flex items-center justify-center mx-auto mb-5 text-3xl print:hidden"
            aria-hidden="true"
          >
            💛
          </div>
          <h1 className="text-2xl font-bold text-[#1a3a52] mb-2">
            {vault.fullName}&apos;s Wishes
          </h1>
          <p className="text-[#6b7280] text-sm leading-relaxed max-w-md mx-auto print:mx-0">
            These wishes were prepared in advance with care and love, using VALE
            Vault.
            {vault.dateOfBirth && (
              <> Born {formatDate(vault.dateOfBirth)}.</>
            )}
          </p>
          {vault.postcode && (
            <p className="text-xs text-[#6b7280] mt-1">
              Based in {vault.postcode}
            </p>
          )}
        </div>

        {/* Service wishes */}
        {hasWishes && (
          <Section title="Service wishes">
            <dl>
              <DataRow
                label="Service type"
                value={
                  vault.serviceType
                    ? SERVICE_TYPE_LABELS[vault.serviceType]
                    : undefined
                }
              />
              <DataRow
                label="Number of guests"
                value={
                  vault.serviceSize
                    ? SERVICE_SIZE_LABELS[vault.serviceSize]
                    : undefined
                }
              />
              <DataRow
                label="Religious preference"
                value={vault.religiousPreference || undefined}
              />
            </dl>
          </Section>
        )}

        {/* Personal touches */}
        {hasDetails && (
          <Section title="Personal touches">
            <dl>
              <DataRow
                label="Music"
                value={vault.musicSelections || undefined}
              />
              <DataRow label="Readings" value={vault.readings || undefined} />
              <DataRow
                label="Flowers"
                value={
                  vault.flowersPreference
                    ? FLOWERS_LABELS[vault.flowersPreference]
                    : undefined
                }
              />
              <DataRow
                label="Guest notes"
                value={vault.guestConsiderations || undefined}
              />
            </dl>
          </Section>
        )}

        {/* Practical information */}
        {hasFinancial && (
          <Section title="Practical information">
            <dl>
              <DataRow
                label="Insurance provider"
                value={vault.insuranceProvider || undefined}
              />
              <DataRow
                label="Policy number"
                value={vault.policyNumber || undefined}
              />
              <DataRow
                label="Bank reference"
                value={vault.bankAccountRef || undefined}
              />
              <DataRow
                label="Will location"
                value={vault.willLocation || undefined}
              />
              <DataRow
                label="Solicitor"
                value={vault.solicitorName || undefined}
              />
              <DataRow
                label="Solicitor phone"
                value={vault.solicitorPhone || undefined}
              />
            </dl>
          </Section>
        )}

        {/* Documents */}
        {vault.documents.length > 0 && (
          <Section title="Documents on file">
            <ul className="space-y-2">
              {vault.documents.map((doc) => (
                <li key={doc.id} className="flex items-center gap-3 text-sm">
                  <span className="text-[#d4a574]" aria-hidden="true">
                    📄
                  </span>
                  <span className="font-medium text-[#111827]">{doc.label}</span>
                  <span className="text-[#6b7280]">— {doc.fileName}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[#6b7280] mt-3 leading-relaxed">
              These documents are held securely in the Vault and can be accessed
              by the account holder.
            </p>
          </Section>
        )}

        {/* CTA — screen only */}
        <div className="mt-10 border-t border-[#e5e7eb] pt-8 text-center print:hidden">
          <p className="text-sm text-[#6b7280] mb-4">
            Ready to find a funeral director who can honour these wishes?
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-[#1a3a52] text-white px-6 py-3 rounded font-semibold text-sm hover:bg-[#0f2438] transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            Find a funeral director on VALE
          </Link>
          <p className="text-xs text-[#6b7280] mt-6">
            Prepared with{" "}
            <Link href="/" className="hover:underline">
              VALE Vault
            </Link>{" "}
            · Private &amp; secure
          </p>
        </div>

        {/* Print footer */}
        <div className="hidden print:block mt-8 pt-4 border-t border-[#e5e7eb] text-xs text-[#6b7280]">
          Prepared with care using VALE Vault (vale.co.uk) · Printed{" "}
          {new Date().toLocaleDateString("en-GB")}
        </div>
      </main>
    </div>
  );
}
