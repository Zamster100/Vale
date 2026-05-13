"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { prefix: "",  value: 1200, suffix: "+", label: "Verified providers",    display: (n: number) => `${n.toLocaleString()}+` },
  { prefix: "",  value: 4.9,  suffix: "",  label: "Family satisfaction",   display: (n: number) => `${n.toFixed(1)}/5`       },
  { prefix: "£", value: 1895, suffix: "",  label: "Avg. saving found",     display: (n: number) => `£${n.toLocaleString()}`  },
  { prefix: "",  value: 0,    suffix: "",  label: "Hidden charges, ever",  display: (n: number) => `${n}`                    },
];

function useCountUp(target: number, duration = 1600, triggered: boolean) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    if (target === 0) { setCurrent(0); return; }

    let startTime: number | null = null;
    const isFloat = target % 1 !== 0;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(isFloat ? parseFloat((eased * target).toFixed(1)) : Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [triggered, target, duration]);

  return current;
}

function StatCell({ stat, triggered }: { stat: typeof STATS[number]; triggered: boolean }) {
  const count = useCountUp(stat.value, 1600, triggered);
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <div
        className="tabular-nums"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "clamp(32px, 4vw, 48px)",
          fontWeight: 300,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: "#1C1F2A",
        }}
      >
        {stat.display(count)}
      </div>
      <div
        className="text-[10px] mt-2.5 tracking-[0.1em] uppercase text-center"
        style={{ color: "#7A6E64" }}
      >
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* Horizontal stat strip */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden"
        style={{ background: "#FFFFFF", border: "1px solid #E8E2D8", boxShadow: "0 4px 32px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)" }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              borderRight:  i % 4 !== 3 ? "1px solid #E8E2D8" : undefined,
              borderBottom: i < 2       ? "1px solid #E8E2D8" : undefined,
            }}
          >
            <StatCell stat={stat} triggered={triggered} />
          </div>
        ))}
      </div>

    </div>
  );
}
