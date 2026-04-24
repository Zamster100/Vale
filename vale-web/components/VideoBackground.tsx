"use client";

import { useEffect, useRef } from "react";

export default function VideoBackground({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let raf: number;

    const tick = () => {
      const { currentTime: t, duration: d } = v;
      if (!d) { raf = requestAnimationFrame(tick); return; }
      if (t < 0.5) {
        v.style.opacity = String(t / 0.5);
      } else if (t > d - 0.5) {
        v.style.opacity = String((d - t) / 0.5);
      } else {
        v.style.opacity = "1";
      }
      raf = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      v.style.opacity = "0";
      setTimeout(() => { v.currentTime = 0; v.play(); }, 100);
    };

    v.style.opacity = "0";
    v.play().catch(() => {});
    raf = requestAnimationFrame(tick);
    v.addEventListener("ended", onEnded);

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      className="absolute w-full h-full object-cover"
      style={{ opacity: 0 }}
    />
  );
}
