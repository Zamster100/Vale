"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { GalleryPhoto, PhotoCategory } from "@/lib/data";

const CATEGORY_LABELS: Record<PhotoCategory, string> = {
  chapel: "Chapel",
  reception: "Reception",
  vehicles: "Vehicles",
  exterior: "Exterior",
  team: "Team",
};

const card = {
  background: "white",
  border: "1px solid #E8E2D8",
  borderRadius: "12px",
};

export default function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sorted = [...photos].sort((a, b) => a.order - b.order);
  const isOpen = lightboxIndex !== null;

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i - 1 + sorted.length) % sorted.length : null)),
    [sorted.length]
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i + 1) % sorted.length : null)),
    [sorted.length]
  );

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { close(); return; }
      if (e.key === "ArrowLeft") { prev(); return; }
      if (e.key === "ArrowRight") { next(); return; }
      if (e.key === "Tab") {
        const els = [
          closeButtonRef.current,
          prevButtonRef.current,
          nextButtonRef.current,
        ].filter(Boolean) as HTMLButtonElement[];
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, prev, next]);

  if (!photos.length) return null;

  const current = lightboxIndex !== null ? sorted[lightboxIndex] : null;

  return (
    <>
      <section style={card} className="p-6" aria-label="Photo gallery">
        <h2 className="text-lg font-semibold mb-1" style={{ color: "#1C1F2A" }}>
          Gallery
        </h2>
        <p className="text-sm mb-5" style={{ color: "#5F7080" }}>
          {photos.length} photo{photos.length !== 1 ? "s" : ""} · Click any image to view full size
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sorted.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] focus-visible:ring-offset-2"
              style={{
                aspectRatio: "4/3",
                borderRadius: "10px",
                background: "rgba(234,242,238,0.3)",
                display: "block",
                width: "100%",
              }}
              aria-label={photo.caption || `${CATEGORY_LABELS[photo.category]} photo ${idx + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.caption || CATEGORY_LABELS[photo.category]}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* hover tint */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "rgba(28,31,42,0.18)" }}
                aria-hidden="true"
              />

              {/* zoom icon */}
              <div
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                aria-hidden="true"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.92)" }}
                >
                  <ZoomIn className="w-3.5 h-3.5" style={{ color: "#1C1F2A" }} />
                </div>
              </div>

              {/* category badge */}
              <div className="absolute top-2 left-2 z-10">
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: "rgba(255,255,255,0.88)", color: "#1C1F2A" }}
                >
                  {CATEGORY_LABELS[photo.category]}
                </span>
              </div>

              {/* caption on hover */}
              {photo.caption && (
                <div
                  className="absolute bottom-0 left-0 right-0 px-3 py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-200 z-10"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)" }}
                  aria-hidden="true"
                >
                  <p className="text-xs text-white text-left truncate">{photo.caption}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {current && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-200"
          style={{ background: "rgba(0,0,0,0.93)" }}
          onClick={close}
        >
          {/* Counter */}
          <p
            className="absolute top-5 left-1/2 -translate-x-1/2 text-sm z-10 pointer-events-none"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {lightboxIndex + 1} / {sorted.length}
          </p>

          {/* Close */}
          <button
            ref={closeButtonRef}
            onClick={close}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-75 transition-opacity z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
            aria-label="Close photo viewer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          {sorted.length > 1 && (
            <button
              ref={prevButtonRef}
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-75 transition-opacity z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Next */}
          {sorted.length > 1 && (
            <button
              ref={nextButtonRef}
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-75 transition-opacity z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative rounded-xl overflow-hidden animate-in zoom-in-95 duration-200"
            style={{ maxWidth: "min(90vw, 860px)", maxHeight: "78vh", aspectRatio: "4/3", width: "100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.url}
              alt={current.caption || CATEGORY_LABELS[current.category]}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Caption */}
          <div className="absolute bottom-6 left-0 right-0 text-center z-10 pointer-events-none px-6">
            <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.88)" }}>
              {current.caption || CATEGORY_LABELS[current.category]}
            </p>
            {current.caption && (
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                {CATEGORY_LABELS[current.category]}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
