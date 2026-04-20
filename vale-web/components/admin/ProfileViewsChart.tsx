interface DayData {
  day: string;
  views: number;
}

interface ProfileViewsChartProps {
  data: DayData[];
  thisWeek: number;
  lastWeek: number;
}

export default function ProfileViewsChart({
  data,
  thisWeek,
  lastWeek,
}: ProfileViewsChartProps) {
  const max = Math.max(...data.map((d) => d.views), 1);
  const trend = thisWeek - lastWeek;
  const trendLabel =
    trend > 0
      ? `↑ ${trend} vs last week`
      : trend < 0
      ? `↓ ${Math.abs(trend)} vs last week`
      : "Same as last week";
  const trendColor =
    trend > 0 ? "text-[#059669]" : trend < 0 ? "text-[#dc2626]" : "text-[#6b7280]";

  return (
    <section className="bg-white border border-[#e5e7eb] rounded-lg p-5 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-[#1a3a52]">Profile views</h2>
          <p className="text-xs text-[#6b7280]">Last 7 days</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#1a3a52] leading-none">{thisWeek}</p>
          <p className={`text-xs font-semibold mt-0.5 ${trendColor}`}>{trendLabel}</p>
        </div>
      </div>

      {/* Bar chart */}
      <div
        role="img"
        aria-label={`Profile views last 7 days: ${data.map((d) => `${d.day} ${d.views}`).join(", ")}`}
        className="flex items-end gap-1.5 h-28 mb-2"
      >
        {data.map(({ day, views }) => (
          <div
            key={day}
            className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
          >
            <div
              className="w-full bg-[#1a3a52] rounded-t-sm transition-all"
              style={{ height: `${Math.max((views / max) * 96, 4)}px` }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {data.map(({ day, views }) => (
          <div key={day} className="flex-1 text-center">
            <span className="text-xs text-[#6b7280] leading-none block">{day}</span>
            <span className="text-xs font-semibold text-[#374151] leading-none block">
              {views}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
