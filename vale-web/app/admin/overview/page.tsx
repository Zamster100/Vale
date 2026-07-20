"use client";

import { useEffect, useState } from "react";
import StaffHeader from "@/components/admin/StaffHeader";
import MetricCard from "@/components/MetricCard";
import { Loader2 } from "lucide-react";

interface OverviewData {
  totalFds: number;
  verifiedFds: number;
  assuredFds: number;
  unclaimedFds: number;
  totalQuoteRequests: number;
  recentQuoteRequests: number;
  totalReviews: number;
  hiddenReviews: number;
  averageRating: number;
}

export default function StaffOverviewPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/overview")
      .then((res) => res.json())
      .then((d: OverviewData) => {
        setData(d);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#FDFCFE" }}>
      <StaffHeader />

      <main className="max-w-[1366px] mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1" style={{ color: "#100B20", fontFamily: "var(--font-dm-sans)" }}>
            Platform overview
          </h1>
          <p className="text-sm" style={{ color: "#4A415E" }}>
            Vale-wide totals across all funeral director accounts.
          </p>
        </div>

        {loading || !data ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#4A415E" }} aria-hidden="true" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="Funeral directors"
              value={data.totalFds}
              subtext={`${data.verifiedFds} verified · ${data.assuredFds} assured`}
            />
            <MetricCard
              label="Unclaimed listings"
              value={data.unclaimedFds}
              subtext="Seeded, no owner account yet"
            />
            <MetricCard
              label="Quote requests"
              value={data.totalQuoteRequests}
              subtext={`${data.recentQuoteRequests} in the last 7 days`}
            />
            <MetricCard
              label="Reviews"
              value={data.totalReviews}
              subtext={`${data.hiddenReviews} hidden`}
            />
            <MetricCard
              label="Platform average rating"
              value={data.averageRating > 0 ? data.averageRating.toFixed(1) : "—"}
              subtext="Across all visible reviews"
            />
          </div>
        )}
      </main>
    </div>
  );
}
