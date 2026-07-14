"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { type FuneralDirector, getLowestPrice } from "@/lib/data";
import "leaflet/dist/leaflet.css";

/* ── Custom SVG pin factory ──────────────────────────────────────── */
function makePinIcon(fill: string, ring: string) {
  const svg = `
    <svg width="28" height="36" viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg">
      <filter id="shadow" x="-30%" y="-10%" width="160%" height="160%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.22)"/>
      </filter>
      <path d="M14 1C7.37 1 2 6.37 2 13c0 8.63 11.14 21.24 12 22.18a2.67 2.67 0 003.98 0C18.87 34.24 26 21.63 26 13 26 6.37 20.63 1 14 1z"
        fill="${fill}" filter="url(#shadow)"/>
      <circle cx="14" cy="13" r="5.5" fill="white" stroke="${ring}" stroke-width="1.5"/>
    </svg>`.trim();

  return L.divIcon({
    className: "",
    html: svg,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -38],
  });
}

/* Pins initialised lazily so Leaflet is only touched client-side */
let _assured: L.DivIcon | null = null;
let _verified: L.DivIcon | null = null;
let _standard: L.DivIcon | null = null;

function getPin(fd: FuneralDirector) {
  if (fd.assured) {
    _assured ??= makePinIcon("#AC7E08", "#8A6506");
    return _assured;
  }
  if (fd.verified) {
    _verified ??= makePinIcon("#4F34C4", "#3B229D");
    return _verified;
  }
  _standard ??= makePinIcon("#9090A8", "#6B6B7E");
  return _standard;
}

/* ── Legend ──────────────────────────────────────────────────────── */
const LEGEND = [
  { color: "#AC7E08", label: "Vale Assured" },
  { color: "#4F34C4", label: "Verified" },
  { color: "#9090A8", label: "Listed" },
] as const;

/* ── Component ───────────────────────────────────────────────────── */
interface MapViewProps {
  directors: FuneralDirector[];
}

export default function MapView({ directors }: MapViewProps) {
  const center: [number, number] =
    directors.length > 0
      ? [
          directors.reduce((s, fd) => s + fd.latitude, 0) / directors.length,
          directors.reduce((s, fd) => s + fd.longitude, 0) / directors.length,
        ]
      : [52.3555, -1.1743];

  return (
    <div className="flex flex-col h-full">
      {/* Legend strip */}
      <div
        className="flex items-center gap-4 px-4 py-2.5 shrink-0"
        style={{ background: "white", borderBottom: "1px solid #D5D0E4" }}
      >
        {LEGEND.map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-full shrink-0"
              style={{ background: color }}
            />
            <span className="text-[11px] font-medium" style={{ color: "#4A415E" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="flex-1 min-h-0">
        <MapContainer
          center={center}
          zoom={directors.length === 1 ? 14 : 6}
          style={{ width: "100%", height: "100%" }}
          scrollWheelZoom={false}
        >
          {/* CartoDB Positron — clean greyscale tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {directors.map((fd) => (
            <Marker
              key={fd.id}
              position={[fd.latitude, fd.longitude]}
              icon={getPin(fd)}
            >
              <Popup>
                <div style={{ minWidth: "175px", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  {fd.assured && (
                    <span
                      className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5"
                      style={{ background: "#FEF1C6", color: "#AC7E08" }}
                    >
                      Vale Assured ✦
                    </span>
                  )}
                  <p className="font-bold text-sm leading-snug mb-0.5" style={{ color: "#100B20" }}>
                    {fd.name}
                  </p>
                  <p className="text-xs mb-2" style={{ color: "#4A415E" }}>
                    {fd.city} · {fd.postcode}
                  </p>
                  <p className="text-base font-bold mb-2.5" style={{ color: "#100B20" }}>
                    From £{getLowestPrice(fd).toLocaleString()}
                  </p>
                  <Link
                    href={`/funeral-directors/${fd.id}`}
                    className="block text-center text-white text-xs font-bold px-3 py-2 rounded-lg hover:opacity-90 transition-opacity"
                    style={{ background: "#4F34C4" }}
                  >
                    View profile →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
