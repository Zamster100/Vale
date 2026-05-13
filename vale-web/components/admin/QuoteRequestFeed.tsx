"use client";

import { useState } from "react";
import { Phone, Mail, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { type QuoteRequest, type QuoteStatus, SERVICE_TYPE_LABELS, timeAgo } from "@/lib/adminData";

const STATUS_STYLES: Record<QuoteStatus, { bg: string; text: string; label: string }> = {
  pending: { bg: "rgba(226,107,94,0.1)", text: "#C95548", label: "New" },
  contacted: { bg: "rgba(94,139,115,0.1)", text: "#1C1F2A", label: "Contacted" },
  booked: { bg: "rgba(123,168,74,0.15)", text: "#5A8A30", label: "Booked" },
  declined: { bg: "rgba(232,226,216,0.3)", text: "#7A6E64", label: "Declined" },
};

async function patchStatus(id: string, status: QuoteStatus): Promise<void> {
  await fetch(`/api/quote-requests/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
}

function QuoteCard({ request: init }: { request: QuoteRequest }) {
  const [status, setStatus] = useState<QuoteStatus>(init.status);
  const [expanded, setExpanded] = useState(init.status === "pending");
  const [statusAnnounce, setStatusAnnounce] = useState("");

  const style = STATUS_STYLES[status];

  const handleStatus = async (next: QuoteStatus) => {
    setStatus(next);
    setStatusAnnounce(`${init.familyName} marked as ${STATUS_STYLES[next].label.toLowerCase()}`);
    await patchStatus(init.id, next);
  };

  return (
    <div
      className="rounded-xl overflow-hidden transition-all"
      style={{
        border: status === "pending" ? "1.5px solid rgba(226,107,94,0.4)" : "1px solid #E8E2D8",
      }}
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">{statusAnnounce}</p>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="w-full flex items-center justify-between gap-4 p-4 text-left focus:outline-none hover:opacity-90 transition-opacity"
        style={{ background: "white" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          {status === "pending" && (
            <span className="w-2 h-2 rounded-full shrink-0" aria-hidden="true" style={{ background: "#5E8B73" }} />
          )}
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate" style={{ color: "#5A4E44" }}>{init.familyName}</p>
            <p className="text-xs" style={{ color: "#7A6E64" }}>
              {SERVICE_TYPE_LABELS[init.serviceType] ?? init.serviceType}{" · "}{timeAgo(init.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: style.bg, color: style.text }}
          >
            {style.label}
          </span>
          {expanded
            ? <ChevronUp className="w-4 h-4" aria-hidden="true" style={{ color: "#7A6E64" }} />
            : <ChevronDown className="w-4 h-4" aria-hidden="true" style={{ color: "#7A6E64" }} />
          }
        </div>
      </button>

      {expanded && (
        <div className="p-4" style={{ borderTop: "1px solid #E8E2D8", background: "#F7F3EE" }}>
          <div className="flex flex-wrap gap-2 mb-4">
            <a
              href={`mailto:${init.email}`}
              className="flex items-center gap-1.5 text-sm hover:underline min-h-[44px] px-3 py-2 rounded-xl hover:opacity-80 transition-opacity focus:outline-none"
              style={{ background: "white", border: "1px solid #E8E2D8", color: "#5E8B73" }}
            >
              <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" style={{ color: "#7A6E64" }} />
              <span className="truncate max-w-[180px]">{init.email}</span>
            </a>
            {init.phone && (
              <a
                href={`tel:${init.phone}`}
                className="flex items-center gap-1.5 text-sm hover:underline min-h-[44px] px-3 py-2 rounded-xl hover:opacity-80 transition-opacity focus:outline-none"
                style={{ background: "white", border: "1px solid #E8E2D8", color: "#5E8B73" }}
              >
                <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" style={{ color: "#7A6E64" }} />
                {init.phone}
              </a>
            )}
          </div>

          {init.message && (
            <blockquote
              className="pl-3 mb-4 text-sm italic leading-relaxed"
              style={{ borderLeft: "2px solid #5E8B73", color: "#7A6E64" }}
            >
              &ldquo;{init.message}&rdquo;
            </blockquote>
          )}

          {status !== "booked" && status !== "declined" && (
            <div className="flex flex-wrap gap-2">
              {status === "pending" && (
                <button
                  type="button"
                  onClick={() => handleStatus("contacted")}
                  className="text-white px-4 py-2 rounded-md text-xs font-semibold hover:opacity-90 transition-opacity min-h-[44px] focus:outline-none"
                  style={{ background: "#1C1F2A" }}
                >
                  Mark as contacted
                </button>
              )}
              {status === "contacted" && (
                <button
                  type="button"
                  onClick={() => handleStatus("booked")}
                  className="text-white px-4 py-2 rounded-md text-xs font-semibold hover:opacity-90 transition-opacity min-h-[44px] focus:outline-none"
                  style={{ background: "#7BA84A" }}
                >
                  Mark as booked
                </button>
              )}
              <button
                type="button"
                onClick={() => handleStatus("declined")}
                className="px-4 py-2 rounded-md text-xs font-semibold hover:opacity-80 transition-opacity min-h-[44px] focus:outline-none"
                style={{ background: "white", border: "1px solid #E8E2D8", color: "#7A6E64" }}
              >
                Decline
              </button>
            </div>
          )}

          {status === "booked" && (
            <p className="text-xs font-semibold flex items-center gap-1.5" style={{ color: "#7BA84A" }}>
              <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
              Booked — funeral arranged
            </p>
          )}
          {status === "declined" && (
            <p className="text-xs" style={{ color: "#7A6E64" }}>This request has been declined.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function QuoteRequestFeed({ requests }: { requests: QuoteRequest[] }) {
  const newCount = requests.filter((r) => r.status === "pending").length;

  return (
    <section aria-label="Quote request feed">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold" style={{ color: "#1C1F2A" }}>Quote requests</h2>
        {newCount > 0 && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(226,107,94,0.1)", color: "#C95548" }}>
            {newCount} new
          </span>
        )}
      </div>

      {requests.length === 0 ? (
        <div className="p-8 text-center rounded-xl" style={{ background: "white", border: "1px solid #E8E2D8" }}>
          <p className="text-sm" style={{ color: "#7A6E64" }}>No quote requests yet.</p>
          <p className="text-xs mt-1" style={{ color: "#7A6E64" }}>Requests from families will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3" aria-live="polite" aria-relevant="additions">
          {requests.map((r) => <QuoteCard key={r.id} request={r} />)}
        </div>
      )}
    </section>
  );
}
