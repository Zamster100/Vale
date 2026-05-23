"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, SlidersHorizontal, ShieldCheck, Phone } from "lucide-react";

const STEPS = [
  {
    icon: MapPin,
    title: "Search your area",
    body: "Enter your postcode to see verified funeral directors nearby. Real prices shown immediately — no calls, no personal details.",
  },
  {
    icon: SlidersHorizontal,
    title: "Compare providers",
    body: "Full itemised price lists from every provider. Filter by budget, service type, or specific needs. Compare side by side.",
  },
  {
    icon: ShieldCheck,
    title: "Read verified reviews",
    body: "Every review is linked to a confirmed arrangement. Honest accounts from real families — no anonymous posts.",
  },
  {
    icon: Phone,
    title: "Connect when ready",
    body: "Request a callback, message, or call directly. Shortlist providers and share with family. No time pressure, ever.",
  },
];

export default function HowItWorks() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion — show immediately with no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // stay visible once triggered
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {STEPS.map(({ icon: Icon, title, body }, i) => (
        <div
          key={title}
          className="flex flex-col px-6 py-7 rounded-xl"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E8E2D8",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
            // Animation state driven by `visible`
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0px)" : "translateY(32px)",
            transition: "opacity 0.55s ease, transform 0.55s ease",
            transitionDelay: `${i * 110}ms`,
          }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 shrink-0"
            style={{ background: "#EAF2EE" }}
          >
            <Icon className="w-5 h-5" style={{ color: "#5E8B73" }} aria-hidden="true" />
          </div>
          <h3
            className="mb-2"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "19px",
              fontWeight: 500,
              color: "#1C1F2A",
              lineHeight: 1.25,
            }}
          >
            {title}
          </h3>
          <p className="text-[13px] leading-[1.65]" style={{ color: "#7A6E64" }}>
            {body}
          </p>
        </div>
      ))}
    </div>
  );
}
