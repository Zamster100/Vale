function Pulse({ className, style }: { className: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`animate-pulse rounded ${className}`}
      style={{ background: "rgba(197,210,220,0.4)", ...style }}
      aria-hidden="true"
    />
  );
}

const card = {
  background: "white",
  border: "0.5px solid rgba(143,160,176,0.3)",
  borderRadius: "16px",
};

export function SkeletonMetricCard() {
  return (
    <div style={card} className="p-6 space-y-3">
      <Pulse className="h-3 w-24" />
      <Pulse className="h-8 w-16" />
      <Pulse className="h-3 w-20" />
      <Pulse className="h-3 w-28" />
    </div>
  );
}

export function SkeletonChartCard() {
  return (
    <div style={card} className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <Pulse className="h-3.5 w-28" />
          <Pulse className="h-3 w-16" />
        </div>
        <Pulse className="h-8 w-12" />
      </div>
      <div className="flex items-end gap-1.5 h-28 mb-2">
        {[60, 40, 70, 90, 55, 75, 45].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end h-full">
            <Pulse className="w-full rounded-t-sm" style={{ height: `${h}%` } as React.CSSProperties} />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1 space-y-1">
            <Pulse className="h-2.5 w-full" />
            <Pulse className="h-2.5 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonFeedItem() {
  return (
    <div style={{ ...card, overflow: "hidden" }}>
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Pulse className="w-2 h-2 rounded-full shrink-0" />
          <div className="min-w-0 space-y-1.5 flex-1">
            <Pulse className="h-3.5 w-32" />
            <Pulse className="h-3 w-48" />
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Pulse className="h-6 w-16 rounded-full" />
          <Pulse className="h-4 w-4 rounded" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonReviewCard() {
  return (
    <div style={card} className="p-5 space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <Pulse className="h-3.5 w-28" />
          <Pulse className="h-3 w-20" />
        </div>
        <Pulse className="h-4 w-20 rounded" />
      </div>
      <Pulse className="h-3 w-full" />
      <Pulse className="h-3 w-4/5" />
    </div>
  );
}

export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Pulse key={i} className={`h-3 ${i === lines - 1 ? "w-3/4" : "w-full"}`} />
      ))}
    </div>
  );
}
