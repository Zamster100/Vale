"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, ExternalLink, CheckCircle, ShieldCheck, Loader2, Trash2, X, AlertTriangle } from "lucide-react";
import StaffHeader from "@/components/admin/StaffHeader";

interface DirectorRow {
  id: string;
  name: string;
  city: string;
  postcode: string;
  rating: number;
  review_count: number;
  verified: boolean;
  assured: boolean;
  owner_user_id: string | null;
  created_at: string;
}

export default function StaffDirectorsPage() {
  const [rows, setRows] = useState<DirectorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<DirectorRow | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    fetch("/api/admin/directors")
      .then((res) => res.json())
      .then((data: DirectorRow[]) => {
        setRows(data);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) => r.name.toLowerCase().includes(q) || r.city.toLowerCase().includes(q)
    );
  }, [rows, query]);

  const closeDeleteModal = () => {
    setDeleteTarget(null);
    setConfirmText("");
    setDeleteError("");
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setDeleteError("");
    const res = await fetch(`/api/admin/directors?id=${encodeURIComponent(deleteTarget.id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setRows((prev) => prev.filter((r) => r.id !== deleteTarget.id));
      closeDeleteModal();
    } else {
      const body = await res.json().catch(() => ({}));
      setDeleteError(body.error ?? "Failed to delete. Please try again.");
    }
    setDeleting(false);
  };

  return (
    <div className="min-h-screen" style={{ background: "#FDFCFE" }}>
      <StaffHeader />

      <main className="max-w-[1366px] mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1" style={{ color: "#100B20", fontFamily: "var(--font-dm-sans)" }}>
            Directors
          </h1>
          <p className="text-sm" style={{ color: "#4A415E" }}>
            Every funeral director listed on Vale.
          </p>
        </div>

        <div
          className="flex items-center gap-2.5 mb-6 rounded-xl px-4"
          style={{ background: "white", border: "1px solid #D5D0E4", maxWidth: "420px" }}
        >
          <Search className="w-4 h-4 shrink-0" style={{ color: "#4F34C4" }} aria-hidden="true" />
          <label htmlFor="director-search" className="sr-only">Search by name or city</label>
          <input
            id="director-search"
            type="text"
            placeholder="Search by name or city…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 min-w-0 text-sm outline-none bg-transparent"
            style={{ color: "#100B20", padding: "12px 0" }}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#4A415E" }} aria-hidden="true" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid #D5D0E4" }}>
            <table className="w-full text-sm min-w-[760px]">
              <thead>
                <tr style={{ background: "#FDFCFE", borderBottom: "1px solid #D5D0E4" }}>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: "#4A415E" }}>Provider</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: "#4A415E" }}>Location</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: "#4A415E" }}>Rating</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: "#4A415E" }}>Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: "#4A415E" }}>Account</th>
                  <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: "#4A415E" }}>Signed up</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((fd, i) => (
                  <tr
                    key={fd.id}
                    style={{
                      background: i % 2 === 0 ? "white" : "rgba(249,250,251,0.7)",
                      borderBottom: "1px solid #D5D0E4",
                    }}
                  >
                    <td className="px-4 py-3 font-medium" style={{ color: "#100B20" }}>{fd.name}</td>
                    <td className="px-4 py-3" style={{ color: "#4A415E" }}>{fd.city} · {fd.postcode}</td>
                    <td className="px-4 py-3" style={{ color: "#4A415E" }}>
                      {fd.rating.toFixed(1)} <span style={{ color: "#9090A8" }}>({fd.review_count})</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {fd.assured && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "#4F34C4", color: "white" }}>
                            <ShieldCheck className="w-3 h-3" aria-hidden="true" /> Assured
                          </span>
                        )}
                        {!fd.assured && fd.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "#E3DFFF", color: "#4F34C4" }}>
                            <CheckCircle className="w-3 h-3" aria-hidden="true" /> Verified
                          </span>
                        )}
                        {!fd.assured && !fd.verified && (
                          <span className="text-xs" style={{ color: "#9090A8" }}>Unverified</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={
                          fd.owner_user_id
                            ? { background: "rgba(90,174,85,0.15)", color: "#3F7A35" }
                            : { background: "rgba(213,208,228,0.4)", color: "#4A415E" }
                        }
                      >
                        {fd.owner_user_id ? "Claimed" : "Unclaimed"}
                      </span>
                    </td>
                    <td className="px-4 py-3" style={{ color: "#4A415E" }}>
                      {new Date(fd.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/funeral-directors/${fd.id}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-xs font-semibold hover:underline focus:outline-none whitespace-nowrap"
                          style={{ color: "#4F34C4" }}
                        >
                          View profile <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(fd)}
                          aria-label={`Delete ${fd.name}`}
                          className="p-1.5 rounded-md hover:opacity-75 transition-opacity focus:outline-none shrink-0"
                          style={{ color: "#C95548" }}
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="text-sm text-center py-10" style={{ color: "#4A415E" }}>
                No funeral directors match &ldquo;{query}&rdquo;.
              </p>
            )}
          </div>
        )}
      </main>

      {deleteTarget && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          style={{ background: "rgba(16,11,32,0.5)" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
        >
          <div className="w-full max-w-md rounded-2xl p-6" style={{ background: "white" }}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(226,107,94,0.12)" }}
                >
                  <AlertTriangle className="w-4.5 h-4.5" style={{ color: "#C95548" }} aria-hidden="true" />
                </div>
                <div>
                  <h2 id="delete-modal-title" className="text-base font-semibold" style={{ color: "#100B20" }}>
                    Delete {deleteTarget.name}?
                  </h2>
                  <p className="text-sm mt-1" style={{ color: "#4A415E" }}>
                    This permanently removes their listing, prices, reviews, gallery, team
                    members, and quote requests. This can&apos;t be undone.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeDeleteModal}
                aria-label="Cancel"
                className="p-1 rounded hover:opacity-70 transition-opacity focus:outline-none shrink-0"
                style={{ color: "#9090A8" }}
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {deleteError && (
              <div
                role="alert"
                className="rounded-lg px-3 py-2 text-sm mb-4"
                style={{ background: "rgba(226,107,94,0.1)", color: "#C95548", border: "1px solid rgba(226,107,94,0.3)" }}
              >
                {deleteError}
              </div>
            )}

            <label htmlFor="confirm-name" className="block text-xs font-semibold mb-1.5" style={{ color: "#4A415E" }}>
              Type <span style={{ color: "#100B20" }}>{deleteTarget.name}</span> to confirm
            </label>
            <input
              id="confirm-name"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              autoFocus
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none mb-5"
              style={{ border: "1px solid #D5D0E4", color: "#100B20" }}
            />

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="text-sm font-semibold px-4 py-2.5 rounded-md focus:outline-none"
                style={{ color: "#4A415E" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={confirmText !== deleteTarget.name || deleting}
                className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-md text-white focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "#C95548" }}
              >
                {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />}
                {deleting ? "Deleting…" : "Delete permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
