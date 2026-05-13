"use client";

import { useState } from "react";
import { Check, Save, ShieldCheck } from "lucide-react";
import { funeralDirectors } from "@/lib/data";

const STORAGE_KEY = "vale_verifications";

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

type BoolField = "nafdVerified" | "saifVerified" | "bifdVerified" | "iccmVerified" | "assured";

function loadState(): RowState[] {
  const base: RowState[] = funeralDirectors.map((fd) => ({
    id: fd.id,
    name: fd.name,
    nafdVerified: fd.nafdVerified ?? false,
    saifVerified: fd.saifVerified ?? false,
    bifdVerified: fd.bifdVerified ?? false,
    iccmVerified: fd.iccmVerified ?? false,
    assured: fd.assured,
    verifiedAt: fd.verifiedAt ?? "",
  }));

  if (typeof window === "undefined") return base;
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Record<string, Partial<RowState>> | null;
    if (!saved) return base;
    return base.map((row) => ({ ...row, ...(saved[row.id] ?? {}) }));
  } catch {
    return base;
  }
}

const ACCRED_COLS: { field: BoolField; label: string }[] = [
  { field: "nafdVerified", label: "NAFD" },
  { field: "saifVerified", label: "SAIF" },
  { field: "bifdVerified", label: "BIFD" },
  { field: "iccmVerified", label: "ICCM" },
];

export default function VerificationPanel() {
  const [rows, setRows] = useState<RowState[]>(loadState);
  const [saved, setSaved] = useState(false);

  const toggle = (id: string, field: BoolField) => {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, [field]: !r[field] } : r));
    setSaved(false);
  };

  const setDate = (id: string, val: string) => {
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, verifiedAt: val } : r));
    setSaved(false);
  };

  const saveAll = () => {
    const map: Record<string, Omit<RowState, "id" | "name">> = {};
    for (const { id, name: _name, ...rest } of rows) {
      map[id] = rest;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: "#1C1F2A" }}>
            Verification Status
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "#5F7080" }}>
            Manage professional accreditations and Vale Assured status per provider.
          </p>
        </div>
        <button
          onClick={saveAll}
          className="flex items-center gap-1.5 text-sm px-5 py-2.5 rounded-md font-semibold hover:opacity-90 transition-all duration-200 focus:outline-none shrink-0 min-h-[40px]"
          style={
            saved
              ? { background: "rgba(90,174,85,0.15)", color: "#3F7A35" }
              : { background: "#1C1F2A", color: "white" }
          }
        >
          {saved ? <Check className="w-4 h-4" aria-hidden="true" /> : <Save className="w-4 h-4" aria-hidden="true" />}
          {saved ? "Saved" : "Save changes"}
        </button>
      </div>

      <div
        className="overflow-x-auto rounded-xl"
        style={{ border: "1px solid #E8E2D8" }}
      >
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr
              style={{
                background: "#F7F3EE",
                borderBottom: "1px solid #E8E2D8",
              }}
            >
              <th
                className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                style={{ color: "#5F7080" }}
              >
                Provider
              </th>
              {ACCRED_COLS.map(({ label }) => (
                <th
                  key={label}
                  className="text-center px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                  style={{ color: "#5F7080" }}
                >
                  {label}
                </th>
              ))}
              <th
                className="text-center px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                style={{ color: "#C4975A" }}
              >
                Assured
              </th>
              <th
                className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider"
                style={{ color: "#5F7080" }}
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
                  borderBottom: "1px solid #E8E2D8",
                }}
              >
                <td className="px-4 py-3 font-medium" style={{ color: "#5A4E44" }}>
                  {row.name}
                </td>

                {ACCRED_COLS.map(({ field, label }) => (
                  <td key={field} className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={row[field] as boolean}
                      onChange={() => toggle(row.id, field)}
                      className="w-4 h-4 cursor-pointer"
                      style={{ accentColor: "#5E8B73" }}
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
                        ? { background: "#C4975A", color: "#1C1F2A" }
                        : { background: "rgba(232,226,216,0.4)", color: "#7A6E64" }
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
                      border: "1px solid #E8E2D8",
                      color: "#5A4E44",
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

      <p className="text-xs mt-4" style={{ color: "#5F7080" }}>
        Changes are saved locally for demo. Production integration requires database persistence.
      </p>
    </div>
  );
}
