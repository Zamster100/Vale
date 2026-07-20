"use client";

import { useEffect, useState } from "react";
import { Star, EyeOff, Eye, Loader2 } from "lucide-react";
import StaffHeader from "@/components/admin/StaffHeader";

interface ReviewRow {
  id: string;
  fd_id: string;
  family_name: string;
  rating: number;
  text: string;
  created_at: string;
  hidden: boolean;
  funeral_directors: { name: string } | null;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className="w-3.5 h-3.5"
          style={{
            color: s <= rating ? "#E26B5E" : "#E3DFFF",
            fill: s <= rating ? "#E26B5E" : "#E3DFFF",
          }}
        />
      ))}
    </span>
  );
}

export default function StaffReviewsPage() {
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingId, setPendingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/reviews")
      .then((res) => res.json())
      .then((data: ReviewRow[]) => {
        setRows(data);
        setLoading(false);
      });
  }, []);

  const toggleHidden = async (row: ReviewRow) => {
    setPendingId(row.id);
    const nextHidden = !row.hidden;
    const res = await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: row.id, hidden: nextHidden }),
    });
    if (res.ok) {
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, hidden: nextHidden } : r)));
    }
    setPendingId(null);
  };

  return (
    <div className="min-h-screen" style={{ background: "#FDFCFE" }}>
      <StaffHeader />

      <main className="max-w-[1366px] mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1" style={{ color: "#100B20", fontFamily: "var(--font-dm-sans)" }}>
            Reviews
          </h1>
          <p className="text-sm" style={{ color: "#4A415E" }}>
            Every review across all providers. Hiding a review removes it from public pages immediately.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#4A415E" }} aria-hidden="true" />
          </div>
        ) : rows.length === 0 ? (
          <p className="text-sm py-10 text-center" style={{ color: "#4A415E" }}>No reviews yet.</p>
        ) : (
          <div className="space-y-3">
            {rows.map((row) => (
              <div
                key={row.id}
                className="rounded-xl p-5"
                style={{
                  background: "white",
                  border: row.hidden ? "1.5px solid rgba(226,107,94,0.4)" : "1px solid #D5D0E4",
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#100B20" }}>
                      {row.family_name} <span style={{ color: "#9090A8", fontWeight: 400 }}>on</span>{" "}
                      {row.funeral_directors?.name ?? row.fd_id}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={row.rating} />
                      <span className="text-xs" style={{ color: "#9090A8" }}>
                        {new Date(row.created_at).toLocaleDateString()}
                      </span>
                      {row.hidden && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(226,107,94,0.12)", color: "#C95548" }}>
                          Hidden
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleHidden(row)}
                    disabled={pendingId === row.id}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all focus:outline-none shrink-0 disabled:opacity-60"
                    style={
                      row.hidden
                        ? { background: "#100B20", color: "white" }
                        : { border: "1px solid #D5D0E4", color: "#4A415E" }
                    }
                  >
                    {pendingId === row.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                    ) : row.hidden ? (
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                    {row.hidden ? "Unhide" : "Hide"}
                  </button>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#4A415E" }}>{row.text}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
