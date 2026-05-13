"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import type { DayKey, DayHours, OpeningHours } from "@/lib/data";

const STORAGE_KEY = "vale_hours_fd001";

const DAYS: { key: DayKey; label: string }[] = [
  { key: "mon", label: "Monday" },
  { key: "tue", label: "Tuesday" },
  { key: "wed", label: "Wednesday" },
  { key: "thu", label: "Thursday" },
  { key: "fri", label: "Friday" },
  { key: "sat", label: "Saturday" },
  { key: "sun", label: "Sunday" },
];

const OOH_OPTIONS = [1, 2, 4, 8, 24] as const;

const DEFAULT_HOURS: OpeningHours = {
  schedule: {
    mon: { open: true, from: "09:00", to: "17:00" },
    tue: { open: true, from: "09:00", to: "17:00" },
    wed: { open: true, from: "09:00", to: "17:00" },
    thu: { open: true, from: "09:00", to: "17:00" },
    fri: { open: true, from: "09:00", to: "17:00" },
    sat: { open: true, from: "10:00", to: "14:00" },
    sun: { open: false },
  },
  oohPhone: "020 7946 0958",
  oohResponseHours: 2,
};

export default function HoursEditor() {
  const [hours, setHours] = useState<OpeningHours>(DEFAULT_HOURS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setHours(JSON.parse(stored) as OpeningHours);
    } catch {}
  }, []);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hours));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const setDay = (key: DayKey, patch: Partial<DayHours>) => {
    setHours((h) => ({
      ...h,
      schedule: { ...h.schedule, [key]: { ...h.schedule[key], ...patch } },
    }));
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="text-base font-semibold mb-0.5" style={{ color: "#1C1F2A", fontFamily: "var(--font-cormorant)" }}>
            Opening hours
          </h2>
          <p className="text-xs" style={{ color: "#7A6E64" }}>
            Set when your office is staffed. Families see this on your profile.
          </p>
        </div>
        <button
          type="button"
          onClick={save}
          className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-md min-h-[44px] shrink-0 transition-all hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] focus-visible:ring-offset-2"
          style={saved
            ? { background: "rgba(123,168,74,0.15)", color: "#5A8A30" }
            : { background: "#1C1F2A", color: "white" }
          }
        >
          <Save className="w-3.5 h-3.5" aria-hidden="true" />
          {saved ? "Saved!" : "Save hours"}
        </button>
      </div>

      {/* 24/7 toggle */}
      <label
        className="flex items-center gap-3 p-4 rounded-xl mb-5 cursor-pointer select-none"
        style={{ background: "rgba(212,165,116,0.08)", border: "1px solid rgba(212,165,116,0.3)" }}
      >
        <input
          type="checkbox"
          checked={hours.availability24hr ?? false}
          onChange={(e) => setHours((h) => ({ ...h, availability24hr: e.target.checked }))}
          className="w-4 h-4 rounded shrink-0"
          style={{ accentColor: "#C4975A" }}
        />
        <div>
          <p className="text-sm font-semibold" style={{ color: "#1C1F2A" }}>Available 24 hours, 7 days a week</p>
          <p className="text-xs mt-0.5" style={{ color: "#7A6E64" }}>
            Shows a 24/7 badge on your profile — families can call at any time
          </p>
        </div>
      </label>

      {/* Day schedule */}
      {!hours.availability24hr && (
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#5A4E44" }}>
            Office hours
          </p>
          <div className="space-y-2">
            {DAYS.map(({ key, label }) => {
              const d = hours.schedule[key];
              return (
                <div key={key} className="flex items-center gap-3 flex-wrap">
                  <label className="flex items-center gap-2 cursor-pointer" style={{ minWidth: "110px" }}>
                    <input
                      type="checkbox"
                      checked={d.open}
                      onChange={(e) => setDay(key, { open: e.target.checked })}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: "#5E8B73" }}
                    />
                    <span className="text-sm" style={{ color: "#5A4E44" }}>{label}</span>
                  </label>
                  {d.open ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={d.from ?? "09:00"}
                        onChange={(e) => setDay(key, { from: e.target.value })}
                        className="text-sm rounded-lg px-2 py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#5E8B73]"
                        style={{ background: "#F7F3EE", border: "1px solid #E8E2D8", color: "#5A4E44", minHeight: "36px" }}
                      />
                      <span className="text-xs" style={{ color: "#5F7080" }}>to</span>
                      <input
                        type="time"
                        value={d.to ?? "17:00"}
                        onChange={(e) => setDay(key, { to: e.target.value })}
                        className="text-sm rounded-lg px-2 py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#5E8B73]"
                        style={{ background: "#F7F3EE", border: "1px solid #E8E2D8", color: "#5A4E44", minHeight: "36px" }}
                      />
                    </div>
                  ) : (
                    <span className="text-sm" style={{ color: "#5F7080" }}>Closed</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* OOH section */}
      <div className="pt-5" style={{ borderTop: "1px solid #E8E2D8" }}>
        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#5A4E44" }}>
          Out-of-hours contact
        </p>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "#1C1F2A" }}>Phone number</label>
            <input
              type="tel"
              value={hours.oohPhone ?? ""}
              onChange={(e) => setHours((h) => ({ ...h, oohPhone: e.target.value }))}
              placeholder="e.g. 020 7946 0958"
              className="w-full text-sm rounded-xl px-4 py-2.5 focus:outline-none"
              style={{ background: "#F7F3EE", border: "1px solid #E8E2D8", color: "#5A4E44", minHeight: "44px" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "#1C1F2A" }}>Typical response time</label>
            <select
              value={hours.oohResponseHours ?? ""}
              onChange={(e) => setHours((h) => ({ ...h, oohResponseHours: Number(e.target.value) || undefined }))}
              className="w-full text-sm rounded-xl px-4 py-2.5 focus:outline-none"
              style={{ background: "#F7F3EE", border: "1px solid #E8E2D8", color: "#5A4E44", minHeight: "44px" }}
            >
              <option value="">Select…</option>
              {OOH_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n === 1 ? "Within 1 hour" : n === 24 ? "Within 24 hours" : `Within ${n} hours`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
