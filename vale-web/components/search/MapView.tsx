"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { type FuneralDirector, getLowestPrice } from "@/lib/data";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon paths in Next.js
const fixLeafletIcon = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
};

interface MapViewProps {
  directors: FuneralDirector[];
}

export default function MapView({ directors }: MapViewProps) {
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  const center: [number, number] =
    directors.length > 0
      ? [
          directors.reduce((sum, fd) => sum + fd.latitude, 0) / directors.length,
          directors.reduce((sum, fd) => sum + fd.longitude, 0) / directors.length,
        ]
      : [52.3555, -1.1743]; // UK centre

  return (
    <MapContainer
      center={center}
      zoom={directors.length === 1 ? 14 : 6}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {directors.map((fd) => (
        <Marker key={fd.id} position={[fd.latitude, fd.longitude]}>
          <Popup>
            <div className="min-w-[180px]">
              <p className="font-semibold text-[#1a3a52] text-sm mb-0.5">{fd.name}</p>
              <p className="text-xs text-[#6b7280] mb-2">{fd.city}</p>
              <p className="text-sm font-bold text-[#1a3a52] mb-2">
                From £{getLowestPrice(fd).toLocaleString()}
              </p>
              <Link
                href={`/funeral-directors/${fd.id}`}
                className="block text-center bg-[#1a3a52] text-white text-xs font-semibold px-3 py-1.5 rounded hover:bg-[#0f2438] transition-colors"
              >
                View profile
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
