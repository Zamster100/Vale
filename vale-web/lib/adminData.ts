export type QuoteStatus = "pending" | "contacted" | "booked" | "declined";

export interface QuoteRequest {
  id: string;
  fdId: string;
  fdName: string;
  familyName: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  status: QuoteStatus;
  createdAt: string; // ISO timestamp — source of truth
}

export const SERVICE_TYPE_LABELS: Record<string, string> = {
  cremation: "Cremation",
  burial: "Burial",
  direct_cremation: "Direct cremation",
  repatriation: "Repatriation",
};

/** Derive a human-readable "time ago" label from an ISO timestamp. */
export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "Yesterday" : `${days} days ago`;
}

/** Distribute a weekly view total across 7 days with a realistic pattern. */
export function generateDailyViews(
  weekTotal: number
): { day: string; views: number }[] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weights = [0.12, 0.16, 0.14, 0.18, 0.16, 0.13, 0.11];
  return days.map((day, i) => ({
    day,
    views: Math.max(1, Math.round(weekTotal * weights[i])),
  }));
}

/** Conversion rate: booked / (total - declined) × 100. */
export function getConversionRate(requests: QuoteRequest[]): number {
  const active = requests.filter((r) => r.status !== "declined").length;
  if (active === 0) return 0;
  const booked = requests.filter((r) => r.status === "booked").length;
  return Math.round((booked / active) * 100);
}

/** Derive summary metrics from a live request array. */
export function deriveMetrics(requests: QuoteRequest[]) {
  const serviceCount = requests.reduce(
    (acc, r) => ({ ...acc, [r.serviceType]: (acc[r.serviceType] ?? 0) + 1 }),
    {} as Record<string, number>
  );
  const sorted = Object.entries(serviceCount).sort((a, b) => b[1] - a[1]);
  const topServiceKey = sorted[0]?.[0] ?? "";
  const topServicePct = sorted[0]
    ? Math.round((sorted[0][1] / requests.length) * 100)
    : 0;

  return {
    newQuoteRequests: requests.filter((r) => r.status === "pending").length,
    totalQuoteRequests: requests.length,
    bookedRequests: requests.filter((r) => r.status === "booked").length,
    contactedRequests: requests.filter((r) => r.status === "contacted").length,
    topService: SERVICE_TYPE_LABELS[topServiceKey] ?? topServiceKey,
    topServicePercent: topServicePct,
    serviceBreakdown: sorted.map(([type, count]) => ({
      type,
      label: SERVICE_TYPE_LABELS[type] ?? type,
      count,
      pct: Math.round((count / requests.length) * 100),
    })),
  };
}

// These stay as mock data — we don't have a real view tracker or benchmark yet.
export const mockMetrics = {
  profileViewsThisWeek: 47,
  profileViewsLastWeek: 31,
};

export const mockBenchmark = {
  yourAvgPrice: 2617,
  areaAvgPrice: 2950,
  yourRating: 4.7,
  areaAvgRating: 4.2,
  city: "London",
};
