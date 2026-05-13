interface DayData {
  day: string;
  views: number;
}

interface ProfileViewsChartProps {
  data: DayData[];
  thisWeek: number;
  lastWeek: number;
}

export default function ProfileViewsChart({ data, thisWeek, lastWeek }: ProfileViewsChartProps) {
  const max = Math.max(...data.map((d) => d.views), 1);
  const trend = thisWeek - lastWeek;
  const trendLabel =
    trend > 0 ? `↑ ${trend} vs last week`
    : trend < 0 ? `↓ ${Math.abs(trend)} vs last week`
    : "Same as last week";
  const trendColor = trend > 0 ? "#7BA84A" : trend < 0 ? "#E26B5E" : "#7A6E64";

  return (
    <section className="rounded-xl p-5" style={{ background: "white", border: "1px solid #E8E2D8" }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold" style={{ color: "#1C1F2A" }}>Profile views</h2>
          <p className="text-xs" style={{ color: "#7A6E64" }}>Last 7 days</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-light leading-none" style={{ color: "#1C1F2A" }}>{thisWeek}</p>
          <p className="text-xs font-semibold mt-0.5" style={{ color: trendColor }}>{trendLabel}</p>
        </div>
      </div>

      <div
        role="img"
        aria-label={`Profile views last 7 days: ${data.map((d) => `${d.day} ${d.views}`).join(", ")}`}
        className="flex items-end gap-1.5 h-28 mb-2"
      >
        {data.map(({ day, views }) => (
          <div key={day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <div
              className="w-full rounded-t-sm transition-all"
              style={{ height: `${Math.max((views / max) * 96, 4)}px`, background: "#5E8B73" }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {data.map(({ day, views }) => (
          <div key={day} className="flex-1 text-center">
            <span className="text-xs leading-none block" style={{ color: "#7A6E64" }}>{day}</span>
            <span className="text-xs font-semibold leading-none block" style={{ color: "#5A4E44" }}>{views}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
