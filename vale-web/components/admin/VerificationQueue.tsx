"use client";

import { useState, useEffect } from "react";
import { Check, Save, ShieldCheck, Loader2 } from "lucide-react";

interface RowState {
  id: string;
  name: string;
  nafdVerified: boolean;
  saifVerified: boolean;
  bifdVerified: boolean;
  iccmVerified: boolean;
  assured: boolean;
  verifiedAt: string;
}

interface VerificationRow {
  id: string;
  name: string;
  nafd_verified: boolean;
  saif_verified: boolean;
  bifd_verified: boolean;
  iccm_verified: boolean;
  assured: boolean;
  verified_at: string | null;
}

type BoolField = "nafdVerified" | "saifVerified" | "bifdVerified" | "iccmVerified" | "assured";

const ACCRED_COLS: { field: BoolField; label: string }[] = [
  { field: "nafdVerified", label: "NAFD" },
  { field: "saifVerified", label: "SAIF" },
  { field: "bifdVerified", label: "BIFD" },
  { field: "iccmVerified", label: "ICCM" },
];

export default function VerificationQueue() {
  const [rows, setRows] = useState<RowState[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/verification")
      .then((res) => res.json())
      .then((data: VerificationRow[]) => {
        setRows(
          data.map((fd) => ({
            id: fd.id,
            name: fd.name,
            nafdVerified: fd.nafd_verified,
            saifVerified: fd.saif_verified,
            bifdVerified: fd.bifd_verified,
            iccmVerified: fd.iccm_verified,
            assured: fd.assured,
            verifiedAt: fd.verified_at ?? "",
          }))
        );
        setLoading(false);
      });
  }, []);

  const toggle = (id: string, field: BoolField) => {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, [field]: !r[field] } : r));
    setSaved(false);
  };

  const setDate = (id: string, val: string) => {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, verifiedAt: val } : r));
    setSaved(false);
  };

  const saveAll = async () => {
    setSaving(true);
    await Promise.all(
      rows.map((row) =>
        fetch("/api/admin/verification", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: row.id,
            nafdVerified: row.nafdVerified,
            saifVerified: row.saifVerified,
            bifdVerified: row.bifdVerified,
            iccmVerified: row.iccmVerified,
            assured: row.assured,
            verifiedAt: row.verifiedAt,
          }),
        })
      )
    );
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#4A415E" }} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: "#100B20" }}>
            Verification Status
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "#4A415E" }}>
            Manage professional accreditations and Vale Assured status per provider.
          </p>
        </div>
        <button
          onClick={saveAll}
          disabled={saving}
          className="flex items-center gap-1.5 text-sm px-5 py-2.5 rounded-md font-semibold hover:opacity-90 transition-all duration-200 focus:outline-none shrink-0 min-h-[40px] disabled:opacity-60"
          style={
            saved
              ? { background: "rgba(90,174,85,0.15)", color: "#3F7A35" }
              : { background: "#100B20", color: "white" }
          }
        >
          {saved
            ? <Check className="w-4 h-4" aria-hidden="true" />
            : saving
            ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            : <Save className="w-4 h-4" aria-hidden="true" />}
          {saved ? "Saved" : saving ? "Saving…" : "Save changes"}
        </button>
      </div>

      <div
        className="overflow-x-auto rounded-xl"
        style={{ border: "1px solid #D5D0E4" }}
      >
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr
              style={{
                background: "#FDFCFE",
                borderBottom: "1px solid #D5D0E4",
              }}
            >
              <th
                className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                style={{ color: "#4A415E" }}
              >
                Provider
              </th>
              {ACCRED_COLS.map(({ label }) => (
                <th
                  key={label}
                  className="text-center px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                  style={{ color: "#4A415E" }}
                >
                  {label}
                </th>
              ))}
              <th
                className="text-center px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                style={{ color: "#4F34C4" }}
              >
                Assured
              </th>
              <th
                className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                style={{ color: "#4A415E" }}
              >
                Verified date
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id}
                style={{
                  background: i % 2 === 0 ? "white" : "rgba(249,250,251,0.7)",
                  borderBottom: "1px solid #D5D0E4",
                }}
              >
                <td className="px-4 py-3 font-medium" style={{ color: "#4A415E" }}>
                  {row.name}
                </td>

                {ACCRED_COLS.map(({ field, label }) => (
                  <td key={field} className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={row[field] as boolean}
                      onChange={() => toggle(row.id, field)}
                      className="w-4 h-4 cursor-pointer"
                      style={{ accentColor: "#4F34C4" }}
                      aria-label={`${label} verified for ${row.name}`}
                    />
                  </td>
                ))}

                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggle(row.id, "assured")}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 hover:opacity-90 focus:outline-none"
                    style={
                      row.assured
                        ? { background: "#4F34C4", color: "#FFFFFF" }
                        : { background: "rgba(213,208,228,0.4)", color: "#4A415E" }
                    }
                    aria-pressed={row.assured}
                    aria-label={`Toggle Assured for ${row.name}`}
                  >
                    {row.assured && (
                      <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                    )}
                    {row.assured ? "Assured" : "Off"}
                  </button>
                </td>

                <td className="px-4 py-3">
                  <input
                    type="date"
                    value={row.verifiedAt ? row.verifiedAt.slice(0, 10) : ""}
                    onChange={(e) => setDate(row.id, e.target.value)}
                    className="text-xs rounded-lg px-2 py-1.5 focus:outline-none"
                    style={{
                      border: "1px solid #D5D0E4",
                      color: "#4A415E",
                      background: "white",
                    }}
                    aria-label={`Verified date for ${row.name}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs mt-4" style={{ color: "#4A415E" }}>
        Changes save to the shared Vale database for all providers.
      </p>
    </div>
  );
}
