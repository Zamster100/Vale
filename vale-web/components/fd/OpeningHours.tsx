"use client";

import { Phone, Clock } from "lucide-react";
import type { OpeningHours as OpeningHoursData, DayKey } from "@/lib/data";

const DAY_LABELS: Record<DayKey, string> = {
  mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday",
  fri: "Friday", sat: "Saturday", sun: "Sunday",
};

const DAYS: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const JS_DAY_TO_KEY: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

const OOH_LABELS: Record<number, string> = {
  1: "1 hour", 2: "2 hours", 4: "4 hours", 8: "8 hours", 24: "24 hours",
};

function format12h(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h < 12 ? "am" : "pm";
  const hour = h % 12 || 12;
  return m === 0 ? `${hour}${suffix}` : `${hour}:${String(m).padStart(2, "0")}${suffix}`;
}

function isOpenNow(hours: OpeningHoursData): boolean {
  if (hours.availability24hr) return true;
  const now = new Date();
  const todayKey = JS_DAY_TO_KEY[now.getDay()];
  const day = hours.schedule[todayKey];
  if (!day.open || !day.from || !day.to) return false;
  const [fh, fm] = day.from.split(":").map(Number);
  const [th, tm] = day.to.split(":").map(Number);
  const nowMins = now.getHours() * 60 + now.getMinutes();
  return nowMins >= fh * 60 + fm && nowMins < th * 60 + tm;
}

export default function OpeningHoursSection({ hours }: { hours: OpeningHoursData }) {
  const openNow = isOpenNow(hours);
  const todayKey = JS_DAY_TO_KEY[new Date().getDay()];

  return (
    <div className="p-6 rounded-2xl" style={{ background: "white", border: "0.5px solid rgba(143,160,176,0.3)" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg" style={{ color: "#5D3A7A" }}>Opening hours</h2>
        {hours.availability24hr ? (
          <span
            className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: "#d4a574", color: "#1a3a52" }}
          >
            <Clock className="w-3 h-3" aria-hidden="true" />
            24/7
          </span>
        ) : (
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={openNow
              ? { background: "rgba(123,168,74,0.15)", color: "#1F4A0E" }
              : { background: "rgba(226,107,94,0.12)", color: "#7A1F1A" }
            }
          >
            {openNow ? "Open now" : "Closed now"}
          </span>
        )}
      </div>

      {hours.availability24hr ? (
        <p className="text-sm" style={{ color: "#5F7080" }}>Available at any time, day or night.</p>
      ) : (
        <div className="space-y-1">
          {DAYS.map((day) => {
            const d = hours.schedule[day];
            const isToday = day === todayKey;
            return (
              <div
                key={day}
                className="flex items-center justify-between text-sm py-1.5 px-3 rounded-lg"
                style={isToday ? { background: "rgba(93,58,122,0.06)" } : {}}
              >
                <span style={{ color: isToday ? "#5D3A7A" : "#3F5E2C", fontWeight: isToday ? 600 : 400, minWidth: "90px" }}>
                  {DAY_LABELS[day]}
                  {isToday && (
                    <span className="text-xs ml-1.5 font-normal" style={{ color: "#8A5FAA" }}>Today</span>
                  )}
                </span>
                <span style={{ color: d.open ? (isToday ? "#5D3A7A" : "#3F5E2C") : "#5F7080" }}>
                  {d.open && d.from && d.to
                    ? `${format12h(d.from)} – ${format12h(d.to)}`
                    : "Closed"
                  }
                </span>
              </div>
            );
          })}
        </div>
      )}

      {(hours.oohPhone || hours.oohResponseHours) && (
        <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(212,165,116,0.08)", border: "0.5px solid rgba(212,165,116,0.3)" }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#5D3A7A" }}>
            Out-of-hours support
          </p>
          {hours.oohPhone && (
            <div className="flex items-center gap-2 mb-1">
              <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: "#d4a574" }} aria-hidden="true" />
              <a
                href={`tel:${hours.oohPhone}`}
                className="text-sm hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA] rounded"
                style={{ color: "#8A5FAA" }}
              >
                {hours.oohPhone}
              </a>
            </div>
          )}
          {hours.oohResponseHours && (
            <p className="text-xs" style={{ color: "#5F7080" }}>
              Typically responds within {OOH_LABELS[hours.oohResponseHours] ?? `${hours.oohResponseHours} hours`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
