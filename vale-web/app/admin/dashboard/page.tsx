"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  LogOut,
  Star,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Settings,
  RefreshCw,
} from "lucide-react";
import MetricCard from "@/components/admin/MetricCard";
import QuoteRequestFeed from "@/components/admin/QuoteRequestFeed";
import ProfileViewsChart from "@/components/admin/ProfileViewsChart";
import ServiceBreakdown from "@/components/admin/ServiceBreakdown";
import { SkeletonMetricCard, SkeletonChartCard, SkeletonFeedItem } from "@/components/Skeleton";
import { useToast, ToastList } from "@/components/Toast";
import { getUser, getProfile, signOut, type FDUser, type FDProfile } from "@/lib/auth";
import {
  type QuoteRequest,
  mockMetrics,
  mockBenchmark,
  getConversionRate,
  deriveMetrics,
  generateDailyViews,
} from "@/lib/adminData";

const POLL_INTERVAL = 30_000; // 30 seconds

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<FDUser | null>(null);
  const [profile, setProfile] = useState<FDProfile | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const knownIds = useRef<Set<string>>(new Set());
  const { toasts, addToast, dismiss } = useToast();

  const fetchRequests = useCallback(
    async (isPolling = false) => {
      try {
        const res = await fetch("/api/quote-requests?fdId=fd_001");
        if (!res.ok) throw new Error("fetch failed");
        const data: QuoteRequest[] = await res.json();

        if (isPolling) {
          const newItems = data.filter(
            (r) => r.status === "pending" && !knownIds.current.has(r.id)
          );
          newItems.forEach((r) => {
            addToast(`New quote request from ${r.familyName}`, "info");
          });
        }

        data.forEach((r) => knownIds.current.add(r.id));
        setRequests(data);
        setFetchError(false);
      } catch {
        if (!isPolling) setFetchError(true);
      } finally {
        if (!isPolling) setDataLoading(false);
      }
    },
    [addToast]
  );

  useEffect(() => {
    const u = getUser();
    const p = getProfile();
    if (!u) { router.replace("/admin/signup"); return; }
    if (!u.onboarded) { router.replace("/admin/onboard"); return; }
    setUser(u);
    setProfile(p);
    setAuthChecked(true);
    fetchRequests(false);
  }, [router, fetchRequests]);

  // Polling
  useEffect(() => {
    if (!authChecked) return;
    const id = setInterval(() => fetchRequests(true), POLL_INTERVAL);
    return () => clearInterval(id);
  }, [authChecked, fetchRequests]);

  const handleSignOut = () => {
    signOut();
    router.push("/admin/signup");
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1a3a52] border-t-transparent rounded-full animate-spin" aria-label="Loading dashboard" />
      </div>
    );
  }

  const metrics = deriveMetrics(requests);
  const conversionRate = getConversionRate(requests);
  const priceDiff = mockBenchmark.areaAvgPrice - mockBenchmark.yourAvgPrice;
  const priceDiffLabel =
    priceDiff > 0
      ? `£${priceDiff.toLocaleString()} below area average`
      : `£${Math.abs(priceDiff).toLocaleString()} above area average`;

  const viewsTrend = mockMetrics.profileViewsThisWeek - mockMetrics.profileViewsLastWeek;
  const dailyViews = generateDailyViews(mockMetrics.profileViewsThisWeek);

  const displayName = profile?.businessName || user?.email?.split("@")[0] || "Your business";

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      {/* Admin nav */}
      <header className="bg-[#1a3a52] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="VALE public site" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded">
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center" aria-hidden="true">
                <MapPin className="w-4 h-4 text-[#d4a574]" />
              </div>
              <span className="text-lg font-bold tracking-tight">VALE</span>
            </Link>
            <span className="text-white/30 hidden sm:inline" aria-hidden="true">|</span>
            <span className="text-sm text-[#b8cdd9] hidden sm:inline">{displayName}</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/funeral-directors/fd_001`}
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-sm text-[#b8cdd9] hover:text-white transition-colors px-3 py-2 rounded min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574]"
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              View profile
            </Link>
            <button
              type="button"
              aria-label="Settings (coming soon)"
              className="p-2 text-[#b8cdd9] hover:text-white transition-colors rounded min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574]"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-sm text-white px-3 py-2 rounded transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574]"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="mb-1">Dashboard</h1>
          <p className="text-[#6b7280] text-sm">
            Here&apos;s how {displayName} is performing on VALE this week.
          </p>
        </div>

        {/* Fetch error banner */}
        {fetchError && (
          <div role="alert" className="mb-6 bg-[#fff5f5] border border-[#fca5a5] rounded-lg px-4 py-3 flex items-center justify-between gap-4">
            <p className="text-sm text-[#991b1b]">
              Could not load quote requests. Check your connection and try again.
            </p>
            <button
              type="button"
              onClick={() => fetchRequests(false)}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#991b1b] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              Retry
            </button>
          </div>
        )}

        {/* Metric cards */}
        <section aria-label="Key metrics" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {dataLoading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonMetricCard key={i} />)
          ) : (
            <>
              <MetricCard
                label="Profile views"
                value={mockMetrics.profileViewsThisWeek}
                subtext="This week"
                trend={{
                  direction: viewsTrend >= 0 ? "up" : "down",
                  label: `${Math.abs(viewsTrend)} vs last week`,
                }}
              />
              <MetricCard
                label="New requests"
                value={metrics.newQuoteRequests}
                subtext={`${metrics.totalQuoteRequests} total`}
                trend={{ direction: "neutral", label: "Awaiting response" }}
                accent={metrics.newQuoteRequests > 0}
              />
              <MetricCard
                label="Conversion rate"
                value={`${conversionRate}%`}
                subtext="Requests → booked"
                trend={{
                  direction: conversionRate >= 30 ? "up" : "neutral",
                  label: conversionRate >= 30 ? "Above average" : "Room to improve",
                }}
              />
              <MetricCard
                label="Top service"
                value={metrics.topService || "—"}
                subtext={metrics.topServicePercent ? `${metrics.topServicePercent}% of requests` : "No requests yet"}
                trend={{ direction: "neutral", label: "Most requested" }}
              />
            </>
          )}
        </section>

        {/* Analytics section */}
        <section aria-label="Analytics" className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6b7280] mb-3">Analytics</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {dataLoading ? (
              <>
                <SkeletonChartCard />
                <SkeletonChartCard />
              </>
            ) : (
              <>
                <ProfileViewsChart
                  data={dailyViews}
                  thisWeek={mockMetrics.profileViewsThisWeek}
                  lastWeek={mockMetrics.profileViewsLastWeek}
                />
                <ServiceBreakdown
                  breakdown={metrics.serviceBreakdown}
                  total={requests.length}
                />
              </>
            )}
          </div>
        </section>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quote requests — 2/3 width */}
          <div className="lg:col-span-2">
            {dataLoading ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 w-36 bg-[#e5e7eb] rounded animate-pulse" />
                </div>
                {Array.from({ length: 3 }).map((_, i) => <SkeletonFeedItem key={i} />)}
              </div>
            ) : (
              <QuoteRequestFeed requests={requests} />
            )}
          </div>

          {/* Sidebar — 1/3 width */}
          <aside className="space-y-5" aria-label="Insights and benchmarks">
            {/* Benchmark */}
            <section className="bg-white border border-[#e5e7eb] rounded-lg p-5 shadow-sm">
              <h2 className="text-base font-bold text-[#1a3a52] mb-4">
                How you compare
              </h2>
              <p className="text-xs text-[#6b7280] uppercase tracking-wider mb-3">
                vs. {mockBenchmark.city} average
              </p>

              {/* Price comparison */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-[#111827] font-medium">Avg. price</span>
                  <div className="flex items-center gap-1 text-[#059669] text-sm font-semibold">
                    <TrendingDown className="w-3.5 h-3.5" aria-hidden="true" />
                    {priceDiff > 0 ? "Lower" : "Higher"}
                  </div>
                </div>
                <div className="flex items-end gap-3 mb-1">
                  <div className="flex-1">
                    <p className="text-xs text-[#6b7280] mb-1">You</p>
                    <div className="bg-[#1a3a52] h-3 rounded-full" style={{ width: `${(mockBenchmark.yourAvgPrice / mockBenchmark.areaAvgPrice) * 100}%` }} aria-hidden="true" />
                    <p className="text-sm font-bold text-[#1a3a52] mt-1">
                      £{mockBenchmark.yourAvgPrice.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-[#6b7280] mb-1">Area avg</p>
                    <div className="bg-[#e5e7eb] h-3 rounded-full w-full" aria-hidden="true" />
                    <p className="text-sm font-bold text-[#6b7280] mt-1">
                      £{mockBenchmark.areaAvgPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#059669] font-semibold">{priceDiffLabel}</p>
              </div>

              {/* Rating comparison */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-[#111827] font-medium">Rating</span>
                  <div className="flex items-center gap-1 text-[#059669] text-sm font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                    Higher
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#1a3a52]">{mockBenchmark.yourRating}</div>
                    <div className="flex justify-center mt-0.5" aria-label={`Your rating: ${mockBenchmark.yourRating} out of 5`}>
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} className={`w-3 h-3 ${s <= Math.round(mockBenchmark.yourRating) ? "text-[#d4a574] fill-[#d4a574]" : "text-[#e5e7eb]"}`} aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-xs text-[#6b7280] mt-0.5">You</p>
                  </div>
                  <div className="flex-1 h-px bg-[#e5e7eb]" aria-hidden="true" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#6b7280]">{mockBenchmark.areaAvgRating}</div>
                    <div className="flex justify-center mt-0.5" aria-label={`Area average: ${mockBenchmark.areaAvgRating} out of 5`}>
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} className={`w-3 h-3 ${s <= Math.round(mockBenchmark.areaAvgRating) ? "text-[#d4a574] fill-[#d4a574]" : "text-[#e5e7eb]"}`} aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-xs text-[#6b7280] mt-0.5">Area avg</p>
                  </div>
                </div>
                <p className="text-xs text-[#059669] font-semibold mt-2">
                  +{(mockBenchmark.yourRating - mockBenchmark.areaAvgRating).toFixed(1)} above {mockBenchmark.city} average
                </p>
              </div>
            </section>

            {/* Assured upgrade CTA */}
            <section className="bg-[#1a3a52] text-white rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-[#d4a574] rounded flex items-center justify-center shrink-0" aria-hidden="true">
                  <Star className="w-4 h-4 text-[#1a3a52] fill-[#1a3a52]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white mb-0.5">Upgrade to Assured</h2>
                  <p className="text-[#a8c4d8] text-xs leading-relaxed">
                    Get a gold badge, priority placement, and a reduced 2% commission rate.
                  </p>
                </div>
              </div>
              <ul className="space-y-1.5 mb-4 text-xs text-[#b8cdd9]">
                {[
                  "Gold Assured badge on your profile",
                  "Priority placement in search results",
                  "2% commission (vs 3.5% standard)",
                  "Dedicated account manager",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-[#d4a574]" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="w-full bg-[#d4a574] text-[#1a3a52] py-2.5 rounded font-semibold text-sm hover:bg-[#c29560] transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a3a52]"
              >
                Learn about Assured — £79/month
              </button>
            </section>

            {/* Quick stats */}
            <section className="bg-white border border-[#e5e7eb] rounded-lg p-5 shadow-sm">
              <h2 className="text-sm font-bold text-[#1a3a52] mb-4">This week at a glance</h2>
              <dl className="space-y-3">
                {[
                  { label: "Families contacted", value: metrics.contactedRequests },
                  { label: "Funerals booked", value: metrics.bookedRequests },
                  { label: "Requests declined", value: requests.filter((r) => r.status === "declined").length },
                  { label: "Profile views today", value: Math.round(mockMetrics.profileViewsThisWeek / 7) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <dt className="text-sm text-[#6b7280]">{label}</dt>
                    <dd className="text-sm font-bold text-[#1a3a52]">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </aside>
        </div>
      </main>

      <ToastList toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
