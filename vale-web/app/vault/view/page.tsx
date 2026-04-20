"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Pencil,
  Share2,
  Printer,
  LogOut,
  Check,
  Download,
  Plus,
  Mail,
  Star,
  ChevronRight,
  Clock,
  Phone,
} from "lucide-react";
import {
  getVaultUser,
  getVaultData,
  signOutVault,
  SERVICE_TYPE_LABELS,
  SERVICE_SIZE_LABELS,
  FLOWERS_LABELS,
  type VaultData,
  type VaultUser,
  type ServiceType,
} from "@/lib/vault";
import {
  funeralDirectors,
  filterByServiceType,
  getLowestPrice,
  type FuneralDirector,
} from "@/lib/data";
import QuoteModal from "@/components/QuoteModal";
import type { QuoteRequest } from "@/lib/adminData";

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

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-[#fef3c7] text-[#92400e]" },
  contacted: { label: "Contacted", className: "bg-[#dbeafe] text-[#1e40af]" },
  booked: { label: "Booked", className: "bg-[#d1fae5] text-[#065f46]" },
  declined: { label: "Declined", className: "bg-[#f3f4f6] text-[#6b7280]" },
};

const SERVICE_TYPE_DATA_LABELS: Record<string, string> = {
  cremation: "Cremation",
  burial: "Burial",
  direct_cremation: "Direct cremation",
};

function SectionCard({
  title,
  step,
  empty,
  children,
}: {
  title: string;
  step: number;
  empty: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white border border-[#e5e7eb] rounded-lg shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e7eb] bg-[#f9fafb]">
        <h2 className="text-base font-bold text-[#1a3a52]">{title}</h2>
        <Link
          href={`/vault/start?step=${step}`}
          className="flex items-center gap-1.5 text-sm text-[#1a3a52] font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded px-2 py-1 min-h-[44px]"
        >
          <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
          {empty ? "Add" : "Edit"}
        </Link>
      </div>
      <div className="px-6 py-5">
        {empty ? (
          <p className="text-sm text-[#6b7280] italic">
            Not yet added —{" "}
            <Link
              href={`/vault/start?step=${step}`}
              className="text-[#1a3a52] underline not-italic"
            >
              fill in your details
            </Link>
          </p>
        ) : (
          children
        )}
      </div>
    </section>
  );
}

function DataRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 py-2.5 border-b border-[#f3f4f6] last:border-0">
      <dt className="text-xs font-semibold uppercase tracking-wider text-[#6b7280] sm:w-44 shrink-0 mb-0.5 sm:mb-0 sm:pt-0.5">
        {label}
      </dt>
      <dd className="text-sm text-[#111827] leading-relaxed">{value}</dd>
    </div>
  );
}

function ProviderCard({
  fd,
  serviceType,
  rank,
  onRequestQuote,
}: {
  fd: FuneralDirector;
  serviceType: ServiceType | "";
  rank: number;
  onRequestQuote: (fd: FuneralDirector) => void;
}) {
  const price =
    serviceType
      ? (fd.prices.find((p) => p.type === serviceType)?.price ?? getLowestPrice(fd))
      : getLowestPrice(fd);

  return (
    <div className={`bg-white border rounded-lg p-5 shadow-sm relative flex flex-col gap-3 ${rank === 0 ? "border-[#d4a574]" : "border-[#e5e7eb]"}`}>
      {rank === 0 && (
        <span className="absolute -top-2.5 left-4 text-xs font-bold bg-[#d4a574] text-[#1a3a52] px-2.5 py-0.5 rounded-full">
          Best match
        </span>
      )}
      <div>
        <p className="font-bold text-[#1a3a52] text-sm leading-snug">{fd.name}</p>
        <p className="text-xs text-[#6b7280] mt-0.5">{fd.city}</p>
      </div>
      <div className="flex items-center gap-1.5">
        <Star className="w-3.5 h-3.5 text-[#d4a574] fill-[#d4a574]" aria-hidden="true" />
        <span className="text-xs font-semibold text-[#1a3a52]">{fd.rating}</span>
        <span className="text-xs text-[#6b7280]">({fd.reviewCount})</span>
      </div>
      <div>
        <p className="text-xs text-[#6b7280]">From</p>
        <p className="text-xl font-bold text-[#1a3a52]">£{price.toLocaleString()}</p>
      </div>
      <button
        onClick={() => onRequestQuote(fd)}
        className="w-full bg-[#1a3a52] text-white py-2.5 rounded text-xs font-semibold hover:bg-[#0f2438] active:bg-[#081929] transition-colors duration-200 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
      >
        Request quote
      </button>
      <Link
        href={`/funeral-directors/${fd.id}`}
        className="w-full border border-[#d1d5db] text-[#1a3a52] py-2 rounded text-xs font-semibold text-center hover:bg-[#f3f4f6] active:bg-[#e5e7eb] transition-colors duration-200 min-h-[44px] flex items-center justify-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574]"
      >
        View profile
        <ChevronRight className="w-3 h-3" aria-hidden="true" />
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
    if (!u) {
      router.replace("/vault/login");
      return;
    }
    setUser(u);
    setVault(getVaultData(u.id));
    setLoading(false);

    // Fetch quote requests for this user's email
    fetch("/api/quote-requests")
      .then((r) => r.json())
      .then((all: QuoteRequest[]) => {
        const mine = all.filter(
          (r) => r.email.toLowerCase() === u.email.toLowerCase()
        );
        setMyRequests(mine);
      })
      .catch(() => {});
  }, [router]);

  const handleSignOut = () => {
    signOutVault();
    router.push("/vault/login");
  };

  const handleCopyLink = async () => {
    if (!vault) return;
    const url = `${window.location.origin}/vault/share/${vault.shareToken}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      window.prompt("Copy this link to share with your family:", url);
    }
  };

  const handleEmailShare = () => {
    if (!vault) return;
    const url = `${window.location.origin}/vault/share/${vault.shareToken}`;
    const name = vault.fullName || "Someone you love";
    const subject = encodeURIComponent(`${name}'s funeral wishes — shared via VALE`);
    const body = encodeURIComponent(
      `Hello,\n\n${name} has prepared their funeral wishes using VALE Vault and would like to share them with you.\n\nYou can view their wishes here:\n${url}\n\nThis link will show you their preferences for their funeral, including service type, personal touches, and important practical information.\n\nWith love,\n${name}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
        <div
          className="w-8 h-8 border-2 border-[#1a3a52] border-t-transparent rounded-full animate-spin"
          aria-label="Loading"
        />
      </div>
    );
  }

  const hasBasics = !!(vault?.fullName || vault?.dateOfBirth || vault?.postcode);
  const hasWishes = !!(vault?.serviceType || vault?.serviceSize);
  const hasDetails = !!(
    vault?.musicSelections ||
    vault?.readings ||
    vault?.flowersPreference ||
    vault?.guestConsiderations
  );
  const hasFinancial = !!(
    vault?.insuranceProvider ||
    vault?.policyNumber ||
    vault?.bankAccountRef ||
    vault?.willLocation ||
    vault?.solicitorName
  );
  const hasDocs = !!(vault?.documents && vault.documents.length > 0);

  const firstName = vault?.fullName?.split(" ")[0];

  // Build recommended providers
  const VALID_SERVICE_TYPES: ServiceType[] = ["cremation", "burial", "direct_cremation"];
  const vaultServiceType =
    vault?.serviceType && VALID_SERVICE_TYPES.includes(vault.serviceType as ServiceType)
      ? (vault.serviceType as ServiceType)
      : null;

  const recommendedFDs = (
    vaultServiceType
      ? filterByServiceType(funeralDirectors, vaultServiceType)
      : [...funeralDirectors]
  )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      <header className="bg-[#1a3a52] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded" aria-label="VALE homepage">
            <div
              className="w-8 h-8 bg-white/10 rounded flex items-center justify-center"
              aria-hidden="true"
            >
              <MapPin className="w-4 h-4 text-[#d4a574]" />
            </div>
            <span className="text-lg font-bold tracking-tight">VALE</span>
            <span className="text-sm text-[#b8cdd9] ml-1 hidden sm:inline">
              Vault
            </span>
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 active:bg-white/30 text-sm text-white px-3 py-2 rounded transition-colors duration-200 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574]"
          >
            <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="mb-1">
            {firstName ? `${firstName}'s Vault` : "Your Vault"}
          </h1>
          <p className="text-[#6b7280] text-sm">
            {hasBasics
              ? "You've done something truly thoughtful for the people who love you."
              : "Start recording your wishes — it's a meaningful gift to your family."}
          </p>
          {vault?.updatedAt && (
            <p className="text-xs text-[#6b7280] mt-1">
              Last updated {formatDate(vault.updatedAt)}
            </p>
          )}
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap gap-3 mb-8">
          {!vault || !hasBasics ? (
            <Link
              href="/vault/start"
              className="flex items-center gap-2 bg-[#1a3a52] text-white px-5 py-3 rounded font-semibold text-sm hover:bg-[#0f2438] active:bg-[#081929] transition-colors duration-200 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Start my Vault
            </Link>
          ) : (
            <>
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-2 bg-[#d4a574] text-[#1a3a52] px-5 py-3 rounded font-semibold text-sm hover:bg-[#c29560] active:bg-[#b08550] transition-colors duration-200 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
              >
                {copied ? (
                  <Check className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Share2 className="w-4 h-4" aria-hidden="true" />
                )}
                {copied ? "Link copied!" : "Copy share link"}
              </button>
              <button
                type="button"
                onClick={handleEmailShare}
                className="flex items-center gap-2 bg-white border border-[#e5e7eb] text-[#1a3a52] px-5 py-3 rounded font-semibold text-sm hover:bg-[#f3f4f6] active:bg-[#e5e7eb] transition-colors duration-200 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                Email to family
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-white border border-[#e5e7eb] text-[#6b7280] px-5 py-3 rounded font-semibold text-sm hover:bg-[#f3f4f6] active:bg-[#e5e7eb] transition-colors duration-200 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
              >
                <Printer className="w-4 h-4" aria-hidden="true" />
                Print
              </button>
            </>
          )}
        </div>

        {/* Vault sections */}
        <div className="space-y-5">
          <SectionCard title="Your Basics" step={0} empty={!hasBasics}>
            <dl>
              <DataRow label="Full name" value={vault?.fullName} />
              <DataRow
                label="Date of birth"
                value={
                  vault?.dateOfBirth ? formatDate(vault.dateOfBirth) : undefined
                }
              />
              <DataRow label="Postcode" value={vault?.postcode} />
            </dl>
          </SectionCard>

          <SectionCard title="Your Wishes" step={1} empty={!hasWishes}>
            <dl>
              <DataRow
                label="Service type"
                value={
                  vault?.serviceType
                    ? SERVICE_TYPE_LABELS[vault.serviceType as ServiceType]
                    : undefined
                }
              />
              <DataRow
                label="Service size"
                value={
                  vault?.serviceSize
                    ? SERVICE_SIZE_LABELS[vault.serviceSize]
                    : undefined
                }
              />
              <DataRow
                label="Religious preference"
                value={vault?.religiousPreference || undefined}
              />
            </dl>
          </SectionCard>

          <SectionCard title="Service Details" step={2} empty={!hasDetails}>
            <dl>
              <DataRow
                label="Music"
                value={vault?.musicSelections || undefined}
              />
              <DataRow label="Readings" value={vault?.readings || undefined} />
              <DataRow
                label="Flowers"
                value={
                  vault?.flowersPreference
                    ? FLOWERS_LABELS[vault.flowersPreference]
                    : undefined
                }
              />
              <DataRow
                label="Guest notes"
                value={vault?.guestConsiderations || undefined}
              />
            </dl>
          </SectionCard>

          <SectionCard title="Financial &amp; Legal" step={3} empty={!hasFinancial}>
            <dl>
              <DataRow
                label="Insurance provider"
                value={vault?.insuranceProvider || undefined}
              />
              <DataRow
                label="Policy number"
                value={vault?.policyNumber || undefined}
              />
              <DataRow
                label="Bank reference"
                value={vault?.bankAccountRef || undefined}
              />
              <DataRow
                label="Will location"
                value={vault?.willLocation || undefined}
              />
              <DataRow
                label="Solicitor"
                value={vault?.solicitorName || undefined}
              />
              <DataRow
                label="Solicitor phone"
                value={vault?.solicitorPhone || undefined}
              />
            </dl>
          </SectionCard>

          <SectionCard title="Documents" step={4} empty={!hasDocs}>
            <ul className="space-y-3">
              {vault?.documents.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center justify-between gap-3 border border-[#e5e7eb] rounded-lg px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#111827]">
                      {doc.label}
                    </p>
                    <p className="text-xs text-[#6b7280] truncate">
                      {doc.fileName} · Uploaded {formatDate(doc.uploadedAt)}
                    </p>
                  </div>
                  <a
                    href={doc.dataUrl}
                    download={doc.fileName}
                    aria-label={`Download ${doc.label}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#1a3a52] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded px-2 py-1 min-h-[44px] shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    Download
                  </a>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        {/* My quote requests */}
        {myRequests.length > 0 && (
          <section className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-base font-bold text-[#1a3a52]">Your quote requests</h2>
              <span className="text-xs bg-[#f3f4f6] text-[#6b7280] px-2 py-0.5 rounded-full font-medium">
                {myRequests.length}
              </span>
            </div>
            <div className="space-y-2">
              {myRequests.map((req) => {
                const status = STATUS_STYLES[req.status] ?? STATUS_STYLES.pending;
                return (
                  <div
                    key={req.id}
                    className="bg-white border border-[#e5e7eb] rounded-lg px-5 py-4 flex items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm text-[#111827] truncate">
                        {req.fdName}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-xs text-[#6b7280]">
                          {SERVICE_TYPE_DATA_LABELS[req.serviceType] ?? req.serviceType}
                        </span>
                        <span className="text-[#d1d5db]" aria-hidden="true">·</span>
                        <span className="flex items-center gap-1 text-xs text-[#6b7280]">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          {timeAgo(req.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {req.phone && (
                        <a
                          href={`tel:${req.phone}`}
                          aria-label={`Call ${req.fdName}`}
                          className="text-[#6b7280] hover:text-[#1a3a52] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded p-1"
                        >
                          <Phone className="w-4 h-4" aria-hidden="true" />
                        </a>
                      )}
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.className}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Recommended providers */}
        {hasBasics && (
          <section className="mt-8">
            <div className="bg-white border border-[#e5e7eb] rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-[#e5e7eb]">
                <h2 className="text-base font-bold text-[#1a3a52] mb-0.5">
                  {vaultServiceType
                    ? `Funeral directors offering ${SERVICE_TYPE_LABELS[vaultServiceType as ServiceType]?.toLowerCase()}`
                    : "Funeral directors near you"}
                </h2>
                <p className="text-sm text-[#6b7280]">
                  {vaultServiceType
                    ? "Based on your wishes, these providers offer exactly what you're looking for."
                    : "Add your service wishes to get personalised recommendations."}
                </p>
              </div>
              <div className="p-6">
                <div className="grid sm:grid-cols-3 gap-4">
                  {recommendedFDs.map((fd, i) => (
                    <ProviderCard
                      key={fd.id}
                      fd={fd}
                      serviceType={vault?.serviceType ?? ""}
                      rank={i}
                      onRequestQuote={(fd) => setQuoteTarget({ fd })}
                    />
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-[#e5e7eb] flex items-center justify-between gap-4">
                  <p className="text-xs text-[#6b7280]">
                    Showing top rated providers. All prices include VAT and are CMA compliant.
                  </p>
                  <Link
                    href="/search"
                    className="text-sm font-semibold text-[#1a3a52] hover:underline flex items-center gap-1 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded min-h-[44px]"
                  >
                    See all providers
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Share URL note */}
        {hasBasics && (
          <p className="mt-8 text-xs text-center text-[#6b7280]">
            Share link:{" "}
            <span className="font-mono break-all">
              {typeof window !== "undefined"
                ? `${window.location.origin}/vault/share/${vault?.shareToken}`
                : ""}
            </span>
          </p>
        )}
      </main>

      {quoteTarget && (
        <QuoteModal
          fdName={quoteTarget.fd.name}
          fdId={quoteTarget.fd.id}
          initialServiceType={vault?.serviceType || undefined}
          onClose={() => setQuoteTarget(null)}
        />
      )}
    </div>
  );
}
