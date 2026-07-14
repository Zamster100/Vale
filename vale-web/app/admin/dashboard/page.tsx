"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LogOut,
  Star,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Settings,
  RefreshCw,
  LayoutDashboard,
  Images,
  ShieldCheck,
  Clock,
} from "lucide-react";
import MetricCard from "@/components/admin/MetricCard";
import QuoteRequestFeed from "@/components/admin/QuoteRequestFeed";
import ProfileViewsChart from "@/components/admin/ProfileViewsChart";
import ServiceBreakdown from "@/components/admin/ServiceBreakdown";
import GalleryTeamManager from "@/components/admin/GalleryTeamManager";
import HoursEditor from "@/components/admin/HoursEditor";
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

type AdminTab = "overview" | "gallery-team" | "hours";

const POLL_INTERVAL = 30_000;

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<FDUser | null>(null);
  const [profile, setProfile] = useState<FDProfile | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
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
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FDFCFE" }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#100B20", borderTopColor: "transparent" }} aria-label="Loading dashboard" />
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
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFCFE" }}>
      {/* Admin nav */}
      <header className="sticky top-0 z-50" style={{ background: "#100B20", borderBottom: "1px solid rgba(28,31,42,0.3)" }}>
        <div className="max-w-[1366px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="Vale public site" className="flex items-center gap-2 focus:outline-none rounded">
              <span
                className="text-xl tracking-tight"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600, color: "white" }}
              >Vale<span style={{ color: "#F5C541" }}>.</span></span>
            </Link>
            <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.3)" }} aria-hidden="true">|</span>
            <span className="text-sm hidden sm:inline" style={{ color: "rgba(255,255,255,0.7)" }}>{displayName}</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/verification"
              className="hidden sm:flex items-center gap-1.5 text-sm px-3 py-2 rounded min-h-[44px] hover:opacity-75 transition-opacity focus:outline-none"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              Verification
            </Link>
            <Link
              href="/funeral-directors/fd_001"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-sm px-3 py-2 rounded min-h-[44px] hover:opacity-75 transition-opacity focus:outline-none"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              View profile
            </Link>
            <button
              type="button"
              aria-label="Settings (coming soon)"
              className="p-2 rounded min-h-[44px] min-w-[44px] flex items-center justify-center hover:opacity-75 transition-opacity focus:outline-none"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-sm px-3 py-2 rounded min-h-[44px] hover:opacity-75 transition-opacity focus:outline-none"
              style={{ background: "rgba(255,255,255,0.12)", color: "white" }}
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1366px] mx-auto w-full px-6 py-8">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-1" style={{ color: "#100B20", fontFamily: "var(--font-dm-sans)" }}>Dashboard</h1>
          <p className="text-sm" style={{ color: "#4A415E" }}>
            Here&apos;s how {displayName} is performing on Vale this week.
          </p>
        </div>

        {/* Tabs */}
        <div
          className="flex items-center gap-1 mb-8 p-1 rounded-xl w-fit"
          style={{ background: "rgba(227,223,255,0.15)", border: "1px solid #D5D0E4" }}
          role="tablist"
          aria-label="Dashboard sections"
        >
          {([
            { id: "overview" as AdminTab, label: "Overview", icon: LayoutDashboard },
            { id: "gallery-team" as AdminTab, label: "Gallery & Team", icon: Images },
            { id: "hours" as AdminTab, label: "Hours", icon: Clock },
          ] as const).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeTab === id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg font-medium transition-all duration-150 focus:outline-none min-h-[36px]"
              style={
                activeTab === id
                  ? { background: "#100B20", color: "white" }
                  : { color: "#4A415E" }
              }
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {/* Gallery & Team tab panel */}
        {activeTab === "gallery-team" && (
          <div
            className="p-6 rounded-xl"
            style={{ background: "white", border: "1px solid #D5D0E4" }}
          >
            <GalleryTeamManager />
          </div>
        )}

        {/* Hours tab panel */}
        {activeTab === "hours" && (
          <div
            className="p-6 rounded-xl"
            style={{ background: "white", border: "1px solid #D5D0E4" }}
          >
            <HoursEditor />
          </div>
        )}

        {activeTab === "overview" && (
          <>
        {/* Fetch error banner */}
        {fetchError && (
          <div role="alert" className="mb-6 px-4 py-3 rounded-xl flex items-center justify-between gap-4" style={{ background: "rgba(226,107,94,0.08)", border: "1px solid rgba(226,107,94,0.3)" }}>
            <p className="text-sm" style={{ color: "#C95548" }}>
              Could not load quote requests. Check your connection and try again.
            </p>
            <button
              type="button"
              onClick={() => fetchRequests(false)}
              className="flex items-center gap-1.5 text-sm font-semibold hover:underline focus:outline-none rounded shrink-0"
              style={{ color: "#C95548" }}
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
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#4A415E" }}>Analytics</p>
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
                  <div className="h-6 w-36 rounded animate-pulse" style={{ background: "rgba(227,223,255,0.2)" }} />
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
            <section className="p-5 rounded-xl" style={{ background: "white", border: "1px solid #D5D0E4" }}>
              <h2 className="text-base font-semibold mb-4" style={{ color: "#100B20", fontFamily: "var(--font-dm-sans)" }}>
                How you compare
              </h2>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#4A415E" }}>
                vs. {mockBenchmark.city} average
              </p>

              {/* Price comparison */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium" style={{ color: "#4A415E" }}>Avg. price</span>
                  <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: "#7BA84A" }}>
                    <TrendingDown className="w-3.5 h-3.5" aria-hidden="true" />
                    {priceDiff > 0 ? "Lower" : "Higher"}
                  </div>
                </div>
                <div className="flex items-end gap-3 mb-1">
                  <div className="flex-1">
                    <p className="text-xs mb-1" style={{ color: "#4A415E" }}>You</p>
                    <div className="h-3 rounded-full" style={{ width: `${(mockBenchmark.yourAvgPrice / mockBenchmark.areaAvgPrice) * 100}%`, background: "#100B20" }} aria-hidden="true" />
                    <p className="text-sm font-bold mt-1" style={{ color: "#100B20" }}>
                      £{mockBenchmark.yourAvgPrice.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs mb-1" style={{ color: "#4A415E" }}>Area avg</p>
                    <div className="h-3 rounded-full w-full" style={{ background: "rgba(227,223,255,0.2)" }} aria-hidden="true" />
                    <p className="text-sm font-bold mt-1" style={{ color: "#4A415E" }}>
                      £{mockBenchmark.areaAvgPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-xs font-semibold" style={{ color: "#7BA84A" }}>{priceDiffLabel}</p>
              </div>

              {/* Rating comparison */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium" style={{ color: "#4A415E" }}>Rating</span>
                  <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: "#7BA84A" }}>
                    <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                    Higher
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-light" style={{ color: "#100B20" }}>{mockBenchmark.yourRating}</div>
                    <div className="flex justify-center mt-0.5" aria-label={`Your rating: ${mockBenchmark.yourRating} out of 5`}>
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} className="w-3 h-3" style={{ color: s <= Math.round(mockBenchmark.yourRating) ? "#F5C541" : "#EAF2EE", fill: s <= Math.round(mockBenchmark.yourRating) ? "#F5C541" : "#EAF2EE" }} aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "#4A415E" }}>You</p>
                  </div>
                  <div className="flex-1 h-px" style={{ background: "rgba(227,223,255,0.2)" }} aria-hidden="true" />
                  <div className="text-center">
                    <div className="text-2xl font-light" style={{ color: "#4A415E" }}>{mockBenchmark.areaAvgRating}</div>
                    <div className="flex justify-center mt-0.5" aria-label={`Area average: ${mockBenchmark.areaAvgRating} out of 5`}>
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} className="w-3 h-3" style={{ color: s <= Math.round(mockBenchmark.areaAvgRating) ? "#F5C541" : "#EAF2EE", fill: s <= Math.round(mockBenchmark.areaAvgRating) ? "#F5C541" : "#EAF2EE" }} aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "#4A415E" }}>Area avg</p>
                  </div>
                </div>
                <p className="text-xs font-semibold mt-2" style={{ color: "#7BA84A" }}>
                  +{(mockBenchmark.yourRating - mockBenchmark.areaAvgRating).toFixed(1)} above {mockBenchmark.city} average
                </p>
              </div>
            </section>

            {/* Assured upgrade CTA */}
            <section className="p-5 rounded-xl text-white" style={{ background: "#100B20" }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(245,197,65,0.15)" }} aria-hidden="true">
                  <Star className="w-4 h-4" style={{ color: "#F5C541", fill: "#F5C541" }} />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white mb-0.5">Upgrade to Assured</h2>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                    Get a gold badge, priority placement, and a reduced 2% commission rate.
                  </p>
                </div>
              </div>
              <ul className="space-y-1.5 mb-4 text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
                {[
                  "Gold Assured badge on your profile",
                  "Priority placement in search results",
                  "2% commission (vs 3.5% standard)",
                  "Dedicated account manager",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span style={{ color: "#F5C541" }} aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="w-full py-2.5 rounded-md font-semibold text-sm hover:opacity-90 transition-opacity min-h-[44px] focus:outline-none"
                style={{ background: "#F5C541", color: "#100B20" }}
              >
                Learn about Assured — £79/month
              </button>
            </section>

            {/* Quick stats */}
            <section className="p-5 rounded-xl" style={{ background: "white", border: "1px solid #D5D0E4" }}>
              <h2 className="text-sm font-semibold mb-4" style={{ color: "#100B20" }}>This week at a glance</h2>
              <dl className="space-y-3">
                {[
                  { label: "Families contacted", value: metrics.contactedRequests },
                  { label: "Funerals booked", value: metrics.bookedRequests },
                  { label: "Requests declined", value: requests.filter((r) => r.status === "declined").length },
                  { label: "Profile views today", value: Math.round(mockMetrics.profileViewsThisWeek / 7) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <dt className="text-sm" style={{ color: "#4A415E" }}>{label}</dt>
                    <dd className="text-sm font-semibold" style={{ color: "#100B20" }}>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </aside>
        </div>
          </>
        )}
      </main>

      <ToastList toasts={toasts} dismiss={dismiss} />
    </div>
  );
}
