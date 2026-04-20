"use client";

import { useState } from "react";
import { Phone, Mail, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import {
  type QuoteRequest,
  type QuoteStatus,
  SERVICE_TYPE_LABELS,
  timeAgo,
} from "@/lib/adminData";

const STATUS_STYLES: Record<
  QuoteStatus,
  { bg: string; text: string; label: string }
> = {
  pending: { bg: "bg-[#faf6f1]", text: "text-[#92400e]", label: "New" },
  contacted: { bg: "bg-[#f0fdf4]", text: "text-[#059669]", label: "Contacted" },
  booked: { bg: "bg-[#eff6ff]", text: "text-[#1d4ed8]", label: "Booked" },
  declined: { bg: "bg-[#f9fafb]", text: "text-[#6b7280]", label: "Declined" },
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
    setStatusAnnounce(
      `${init.familyName} marked as ${STATUS_STYLES[next].label.toLowerCase()}`
    );
    await patchStatus(init.id, next);
  };

  return (
    <div
      className={`border rounded-lg overflow-hidden transition-all ${
        status === "pending" ? "border-[#d4a574]" : "border-[#e5e7eb]"
      }`}
    >
      {/* Hidden live region for status changes */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {statusAnnounce}
      </p>

      {/* Card header */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="w-full flex items-center justify-between gap-4 p-4 bg-white hover:bg-[#f9fafb] transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d4a574]"
      >
        <div className="flex items-center gap-3 min-w-0">
          {status === "pending" && (
            <span
              className="w-2 h-2 rounded-full bg-[#d4a574] shrink-0"
              aria-hidden="true"
            />
          )}
          <div className="min-w-0">
            <p className="font-semibold text-sm text-[#111827] truncate">
              {init.familyName}
            </p>
            <p className="text-xs text-[#6b7280]">
              {SERVICE_TYPE_LABELS[init.serviceType] ?? init.serviceType}
              {" · "}
              {timeAgo(init.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}
          >
            {style.label}
          </span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-[#6b7280]" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#6b7280]" aria-hidden="true" />
          )}
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-[#e5e7eb] bg-[#f9fafb] p-4">
          {/* Quick contact actions */}
          <div className="flex flex-wrap gap-2 mb-4">
            <a
              href={`mailto:${init.email}`}
              className="flex items-center gap-1.5 text-sm text-[#1a3a52] hover:underline min-h-[44px] px-3 py-2 bg-white border border-[#e5e7eb] rounded hover:bg-[#f3f4f6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574]"
            >
              <Mail className="w-3.5 h-3.5 text-[#6b7280] shrink-0" aria-hidden="true" />
              <span className="truncate max-w-[180px]">{init.email}</span>
            </a>
            {init.phone && (
              <a
                href={`tel:${init.phone}`}
                className="flex items-center gap-1.5 text-sm text-[#1a3a52] hover:underline min-h-[44px] px-3 py-2 bg-white border border-[#e5e7eb] rounded hover:bg-[#f3f4f6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574]"
              >
                <Phone className="w-3.5 h-3.5 text-[#6b7280] shrink-0" aria-hidden="true" />
                {init.phone}
              </a>
            )}
          </div>

          {init.message && (
            <blockquote className="border-l-2 border-[#d4a574] pl-3 mb-4 text-sm text-[#6b7280] italic leading-relaxed">
              &ldquo;{init.message}&rdquo;
            </blockquote>
          )}

          {/* Status action buttons */}
          {status !== "booked" && status !== "declined" && (
            <div className="flex flex-wrap gap-2">
              {status === "pending" && (
                <button
                  type="button"
                  onClick={() => handleStatus("contacted")}
                  className="bg-[#1a3a52] text-white px-4 py-2 rounded text-xs font-semibold hover:bg-[#0f2438] transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-1"
                >
                  Mark as contacted
                </button>
              )}
              {status === "contacted" && (
                <button
                  type="button"
                  onClick={() => handleStatus("booked")}
                  className="bg-[#059669] text-white px-4 py-2 rounded text-xs font-semibold hover:bg-[#047857] transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] focus-visible:ring-offset-1"
                >
                  Mark as booked
                </button>
              )}
              <button
                type="button"
                onClick={() => handleStatus("declined")}
                className="bg-white border border-[#e5e7eb] text-[#6b7280] px-4 py-2 rounded text-xs font-semibold hover:bg-[#f3f4f6] transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-1"
              >
                Decline
              </button>
            </div>
          )}

          {status === "booked" && (
            <p className="text-xs font-semibold text-[#059669] flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
              Booked — funeral arranged
            </p>
          )}
          {status === "declined" && (
            <p className="text-xs text-[#6b7280]">This request has been declined.</p>
          )}
        </div>
      )}
    </div>
  );
}

interface QuoteRequestFeedProps {
  requests: QuoteRequest[];
}

export default function QuoteRequestFeed({ requests }: QuoteRequestFeedProps) {
  const newCount = requests.filter((r) => r.status === "pending").length;

  return (
    <section aria-label="Quote request feed">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#1a3a52]">Quote requests</h2>
        {newCount > 0 && (
          <span className="text-xs font-semibold bg-[#faf6f1] text-[#92400e] px-2.5 py-1 rounded-full">
            {newCount} new
          </span>
        )}
      </div>

      {requests.length === 0 ? (
        <div className="bg-white border border-[#e5e7eb] rounded-lg p-8 text-center">
          <p className="text-sm text-[#6b7280]">No quote requests yet.</p>
          <p className="text-xs text-[#6b7280] mt-1">
            Requests from families will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3" aria-live="polite" aria-relevant="additions">
          {requests.map((r) => (
            <QuoteCard key={r.id} request={r} />
          ))}
        </div>
      )}
    </section>
  );
}
