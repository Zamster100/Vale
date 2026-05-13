"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Pencil, Share2, Printer, LogOut, Check, Download, Plus,
  Mail, Star, ChevronRight, Clock, Phone,
} from "lucide-react";
import {
  getVaultUser, getVaultData, signOutVault,
  SERVICE_TYPE_LABELS, SERVICE_SIZE_LABELS, FLOWERS_LABELS,
  type VaultData, type VaultUser, type ServiceType,
} from "@/lib/vault";
import { funeralDirectors, filterByServiceType, getLowestPrice, type FuneralDirector } from "@/lib/data";
import QuoteModal from "@/components/QuoteModal";
import type { QuoteRequest } from "@/lib/adminData";

function formatDate(iso: string): string {
  try { return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }); }
  catch { return iso; }
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending:   { bg: "rgba(226,107,94,0.1)",   text: "#C95548", label: "Pending" },
  contacted: { bg: "rgba(94,139,115,0.1)",    text: "#1C1F2A", label: "Contacted" },
  booked:    { bg: "rgba(123,168,74,0.15)",   text: "#5A8A30", label: "Booked" },
  declined:  { bg: "rgba(232,226,216,0.3)",   text: "#7A6E64", label: "Declined" },
};

const SERVICE_TYPE_DATA_LABELS: Record<string, string> = {
  cremation: "Cremation", burial: "Burial", direct_cremation: "Direct cremation",
};

const card: React.CSSProperties = {
  background: "white",
  border: "1px solid #E8E2D8",
  borderRadius: "12px",
  overflow: "hidden",
};

function SectionCard({ title, step, empty, children }: { title: string; step: number; empty: boolean; children: React.ReactNode }) {
  return (
    <section style={card}>
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #E8E2D8", background: "#F7F3EE" }}>
        <h2 className="text-base font-semibold" style={{ color: "#1C1F2A" }}>{title}</h2>
        <Link
          href={`/vault/start?step=${step}`}
          className="flex items-center gap-1.5 text-sm font-semibold hover:underline focus:outline-none rounded px-2 py-1 min-h-[44px]"
          style={{ color: "#5E8B73" }}
        >
          <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
          {empty ? "Add" : "Edit"}
        </Link>
      </div>
      <div className="px-6 py-5">
        {empty ? (
          <p className="text-sm italic" style={{ color: "#7A6E64" }}>
            Not yet added —{" "}
            <Link href={`/vault/start?step=${step}`} className="not-italic underline" style={{ color: "#5E8B73" }}>fill in your details</Link>
          </p>
        ) : children}
      </div>
    </section>
  );
}

function DataRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 py-2.5 last:border-0" style={{ borderBottom: "1px solid rgba(234,242,238,0.6)" }}>
      <dt className="text-xs font-semibold uppercase tracking-wider sm:w-44 shrink-0 mb-0.5 sm:mb-0 sm:pt-0.5" style={{ color: "#7A6E64" }}>{label}</dt>
      <dd className="text-sm leading-relaxed" style={{ color: "#5A4E44" }}>{value}</dd>
    </div>
  );
}

function ProviderCard({ fd, serviceType, rank, onRequestQuote }: { fd: FuneralDirector; serviceType: ServiceType | ""; rank: number; onRequestQuote: (fd: FuneralDirector) => void }) {
  const price = serviceType
    ? (fd.prices.find((p) => p.type === serviceType)?.price ?? getLowestPrice(fd))
    : getLowestPrice(fd);

  return (
    <div className="relative flex flex-col gap-3 p-5 rounded-xl" style={{ background: "white", border: rank === 0 ? "1.5px solid rgba(94,139,115,0.5)" : "1px solid #E8E2D8" }}>
      {rank === 0 && (
        <span className="absolute -top-2.5 left-4 text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: "#5E8B73", color: "white" }}>
          Best match
        </span>
      )}
      <div>
        <p className="font-semibold text-sm leading-snug" style={{ color: "#1C1F2A" }}>{fd.name}</p>
        <p className="text-xs mt-0.5" style={{ color: "#7A6E64" }}>{fd.city}</p>
      </div>
      <div className="flex items-center gap-1.5">
        <Star className="w-3.5 h-3.5" aria-hidden="true" style={{ color: "#E26B5E", fill: "#E26B5E" }} />
        <span className="text-xs font-semibold" style={{ color: "#1C1F2A" }}>{fd.rating}</span>
        <span className="text-xs" style={{ color: "#7A6E64" }}>({fd.reviewCount})</span>
      </div>
      <div>
        <p className="text-xs" style={{ color: "#7A6E64" }}>From</p>
        <p className="text-xl font-light" style={{ color: "#1C1F2A" }}>£{price.toLocaleString()}</p>
      </div>
      <button
        onClick={() => onRequestQuote(fd)}
        className="w-full text-white py-2.5 rounded-md text-xs font-semibold hover:opacity-90 transition-opacity min-h-[44px] focus:outline-none"
        style={{ background: "#1C1F2A" }}
      >
        Request quote
      </button>
      <Link
        href={`/funeral-directors/${fd.id}`}
        className="w-full py-2 rounded-md text-xs font-semibold text-center hover:opacity-80 transition-opacity min-h-[44px] flex items-center justify-center gap-1 focus:outline-none"
        style={{ border: "1px solid #E8E2D8", color: "#1C1F2A" }}
      >
        View profile <ChevronRight className="w-3 h-3" aria-hidden="true" />
      </Link>
    </div>
  );
}

export default function VaultViewPage() {
  const router = useRouter();
  const [user, setUser] = useState<VaultUser | null>(null);
  const [vault, setVault] = useState<VaultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [quoteTarget, setQuoteTarget] = useState<{ fd: FuneralDirector } | null>(null);
  const [myRequests, setMyRequests] = useState<QuoteRequest[]>([]);

  useEffect(() => {
    const u = getVaultUser();
    if (!u) { router.replace("/vault/login"); return; }
    setUser(u);
    setVault(getVaultData(u.id));
    setLoading(false);
    fetch("/api/quote-requests")
      .then((r) => r.json())
      .then((all: QuoteRequest[]) => setMyRequests(all.filter((r) => r.email.toLowerCase() === u.email.toLowerCase())))
      .catch(() => {});
  }, [router]);

  const handleSignOut = () => { signOutVault(); router.push("/vault/login"); };

  const handleCopyLink = async () => {
    if (!vault) return;
    const url = `${window.location.origin}/vault/share/${vault.shareToken}`;
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 3000); }
    catch { window.prompt("Copy this link to share with your family:", url); }
  };

  const handleEmailShare = () => {
    if (!vault) return;
    const url = `${window.location.origin}/vault/share/${vault.shareToken}`;
    const name = vault.fullName || "Someone you love";
    const subject = encodeURIComponent(`${name}'s funeral wishes — shared via Vale`);
    const body = encodeURIComponent(`Hello,\n\n${name} has prepared their funeral wishes using Vale Vault and would like to share them with you.\n\nYou can view their wishes here:\n${url}\n\nWith love,\n${name}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F7F3EE" }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#1C1F2A", borderTopColor: "transparent" }} aria-label="Loading" />
      </div>
    );
  }

  const hasBasics = !!(vault?.fullName || vault?.dateOfBirth || vault?.postcode);
  const hasWishes = !!(vault?.serviceType || vault?.serviceSize);
  const hasDetails = !!(vault?.musicSelections || vault?.readings || vault?.flowersPreference || vault?.guestConsiderations);
  const hasFinancial = !!(vault?.insuranceProvider || vault?.policyNumber || vault?.bankAccountRef || vault?.willLocation || vault?.solicitorName);
  const hasDocs = !!(vault?.documents && vault.documents.length > 0);
  const firstName = vault?.fullName?.split(" ")[0];

  const VALID_SERVICE_TYPES: ServiceType[] = ["cremation", "burial", "direct_cremation"];
  const vaultServiceType = vault?.serviceType && VALID_SERVICE_TYPES.includes(vault.serviceType as ServiceType)
    ? (vault.serviceType as ServiceType) : null;

  const recommendedFDs = (vaultServiceType ? filterByServiceType(funeralDirectors, vaultServiceType) : [...funeralDirectors])
    .sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F7F3EE" }}>
      <header className="sticky top-0 z-50" style={{ background: "#1C1F2A" }}>
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 focus:outline-none rounded" aria-label="Vale homepage">
            <span className="text-xl tracking-tight" style={{ color: "white", fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}>Vale<span style={{ color: "#5E8B73" }}>.</span></span>
            <span className="text-sm hidden sm:inline ml-1" style={{ color: "rgba(255,255,255,0.5)" }}>Vault</span>
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-sm px-3 py-2 rounded hover:bg-white/10 transition-colors min-h-[44px] focus:outline-none"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="mb-1" style={{ color: "#1C1F2A", fontFamily: "var(--font-cormorant)", fontSize: "clamp(24px,4vw,36px)" }}>
            {firstName ? `${firstName}'s Vault` : "Your Vault"}
          </h1>
          <p className="text-sm" style={{ color: "#7A6E64" }}>
            {hasBasics ? "You've done something truly thoughtful for the people who love you." : "Start recording your wishes — it's a meaningful gift to your family."}
          </p>
          {vault?.updatedAt && <p className="text-xs mt-1" style={{ color: "#7A6E64" }}>Last updated {formatDate(vault.updatedAt)}</p>}
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {!vault || !hasBasics ? (
            <Link
              href="/vault/start"
              className="flex items-center gap-2 text-white px-5 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity min-h-[44px] focus:outline-none"
              style={{ background: "#1C1F2A" }}
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Start my Vault
            </Link>
          ) : (
            <>
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-2 text-white px-5 py-3 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity min-h-[44px] focus:outline-none"
                style={{ background: "#5E8B73" }}
              >
                {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Share2 className="w-4 h-4" aria-hidden="true" />}
                {copied ? "Link copied!" : "Copy share link"}
              </button>
              <button
                type="button"
                onClick={handleEmailShare}
                className="flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-sm hover:opacity-80 transition-opacity min-h-[44px] focus:outline-none"
                style={{ background: "white", border: "1px solid #E8E2D8", color: "#1C1F2A" }}
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                Email to family
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-sm hover:opacity-80 transition-opacity min-h-[44px] focus:outline-none"
                style={{ background: "white", border: "1px solid #E8E2D8", color: "#7A6E64" }}
              >
                <Printer className="w-4 h-4" aria-hidden="true" />
                Print
              </button>
            </>
          )}
        </div>

        <div className="space-y-5">
          <SectionCard title="Your Basics" step={0} empty={!hasBasics}>
            <dl>
              <DataRow label="Full name" value={vault?.fullName} />
              <DataRow label="Date of birth" value={vault?.dateOfBirth ? formatDate(vault.dateOfBirth) : undefined} />
              <DataRow label="Postcode" value={vault?.postcode} />
            </dl>
          </SectionCard>
          <SectionCard title="Your Wishes" step={1} empty={!hasWishes}>
            <dl>
              <DataRow label="Service type" value={vault?.serviceType ? SERVICE_TYPE_LABELS[vault.serviceType as ServiceType] : undefined} />
              <DataRow label="Service size" value={vault?.serviceSize ? SERVICE_SIZE_LABELS[vault.serviceSize] : undefined} />
              <DataRow label="Religious preference" value={vault?.religiousPreference || undefined} />
            </dl>
          </SectionCard>
          <SectionCard title="Service Details" step={2} empty={!hasDetails}>
            <dl>
              <DataRow label="Music" value={vault?.musicSelections || undefined} />
              <DataRow label="Readings" value={vault?.readings || undefined} />
              <DataRow label="Flowers" value={vault?.flowersPreference ? FLOWERS_LABELS[vault.flowersPreference] : undefined} />
              <DataRow label="Guest notes" value={vault?.guestConsiderations || undefined} />
            </dl>
          </SectionCard>
          <SectionCard title="Financial &amp; Legal" step={3} empty={!hasFinancial}>
            <dl>
              <DataRow label="Insurance provider" value={vault?.insuranceProvider || undefined} />
              <DataRow label="Policy number" value={vault?.policyNumber || undefined} />
              <DataRow label="Bank reference" value={vault?.bankAccountRef || undefined} />
              <DataRow label="Will location" value={vault?.willLocation || undefined} />
              <DataRow label="Solicitor" value={vault?.solicitorName || undefined} />
              <DataRow label="Solicitor phone" value={vault?.solicitorPhone || undefined} />
            </dl>
          </SectionCard>
          <SectionCard title="Documents" step={4} empty={!hasDocs}>
            <ul className="space-y-3">
              {vault?.documents.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between gap-3 rounded-xl px-4 py-3" style={{ border: "1px solid #E8E2D8" }}>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold" style={{ color: "#5A4E44" }}>{doc.label}</p>
                    <p className="text-xs truncate" style={{ color: "#7A6E64" }}>{doc.fileName} · Uploaded {formatDate(doc.uploadedAt)}</p>
                  </div>
                  <a
                    href={doc.dataUrl}
                    download={doc.fileName}
                    aria-label={`Download ${doc.label}`}
                    className="flex items-center gap-1.5 text-xs font-semibold hover:underline focus:outline-none rounded px-2 py-1 min-h-[44px] shrink-0"
                    style={{ color: "#5E8B73" }}
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    Download
                  </a>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        {myRequests.length > 0 && (
          <section className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-base font-semibold" style={{ color: "#1C1F2A" }}>Your quote requests</h2>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(234,242,238,0.4)", color: "#7A6E64" }}>{myRequests.length}</span>
            </div>
            <div className="space-y-2">
              {myRequests.map((req) => {
                const status = STATUS_STYLES[req.status] ?? STATUS_STYLES.pending;
                return (
                  <div key={req.id} className="rounded-xl px-5 py-4 flex items-center justify-between gap-4" style={{ background: "white", border: "1px solid #E8E2D8" }}>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm truncate" style={{ color: "#5A4E44" }}>{req.fdName}</p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-xs" style={{ color: "#7A6E64" }}>{SERVICE_TYPE_DATA_LABELS[req.serviceType] ?? req.serviceType}</span>
                        <span style={{ color: "rgba(232,226,216,0.8)" }} aria-hidden="true">·</span>
                        <span className="flex items-center gap-1 text-xs" style={{ color: "#7A6E64" }}>
                          <Clock className="w-3 h-3" aria-hidden="true" />{timeAgo(req.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {req.phone && (
                        <a href={`tel:${req.phone}`} aria-label={`Call ${req.fdName}`} className="hover:opacity-70 transition-opacity focus:outline-none rounded p-1" style={{ color: "#7A6E64" }}>
                          <Phone className="w-4 h-4" aria-hidden="true" />
                        </a>
                      )}
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: status.bg, color: status.text }}>{status.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {hasBasics && (
          <section className="mt-8">
            <div style={{ ...card }}>
              <div className="px-6 py-5" style={{ borderBottom: "1px solid #E8E2D8" }}>
                <h2 className="text-base font-semibold mb-0.5" style={{ color: "#1C1F2A" }}>
                  {vaultServiceType ? `Funeral directors offering ${SERVICE_TYPE_LABELS[vaultServiceType as ServiceType]?.toLowerCase()}` : "Funeral directors near you"}
                </h2>
                <p className="text-sm" style={{ color: "#7A6E64" }}>
                  {vaultServiceType ? "Based on your wishes, these providers offer exactly what you're looking for." : "Add your service wishes to get personalised recommendations."}
                </p>
              </div>
              <div className="p-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  {recommendedFDs.map((fd, i) => (
                    <ProviderCard key={fd.id} fd={fd} serviceType={vault?.serviceType ?? ""} rank={i} onRequestQuote={(fd) => setQuoteTarget({ fd })} />
                  ))}
                </div>
                <div className="mt-5 pt-5 flex items-center justify-between gap-4" style={{ borderTop: "1px solid #E8E2D8" }}>
                  <p className="text-xs" style={{ color: "#7A6E64" }}>Showing top rated providers. All prices include VAT and are CMA compliant.</p>
                  <Link href="/search" className="text-sm font-semibold hover:underline flex items-center gap-1 shrink-0 focus:outline-none rounded min-h-[44px]" style={{ color: "#5E8B73" }}>
                    See all providers <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {hasBasics && (
          <p className="mt-8 text-xs text-center" style={{ color: "#7A6E64" }}>
            Share link:{" "}
            <span className="font-mono break-all">
              {typeof window !== "undefined" ? `${window.location.origin}/vault/share/${vault?.shareToken}` : ""}
            </span>
          </p>
        )}
      </main>

      {quoteTarget && (
        <QuoteModal fdName={quoteTarget.fd.name} fdId={quoteTarget.fd.id} initialServiceType={vault?.serviceType || undefined} onClose={() => setQuoteTarget(null)} />
      )}
    </div>
  );
}
