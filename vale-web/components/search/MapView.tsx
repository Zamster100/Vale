"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { type FuneralDirector, getLowestPrice } from "@/lib/data";
import "leaflet/dist/leaflet.css";

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
  useEffect(() => { fixLeafletIcon(); }, []);

  const center: [number, number] =
    directors.length > 0
      ? [
          directors.reduce((sum, fd) => sum + fd.latitude, 0) / directors.length,
          directors.reduce((sum, fd) => sum + fd.longitude, 0) / directors.length,
        ]
      : [52.3555, -1.1743];

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
              <p className="font-semibold text-sm mb-0.5" style={{ color: "#1C1F2A" }}>{fd.name}</p>
              <p className="text-xs mb-2" style={{ color: "#7A6E64" }}>{fd.city}</p>
              <p className="text-sm font-semibold mb-2" style={{ color: "#1C1F2A" }}>
                From £{getLowestPrice(fd).toLocaleString()}
              </p>
              <Link
                href={`/funeral-directors/${fd.id}`}
                className="block text-center text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:opacity-90 transition-opacity"
                style={{ background: "#1C1F2A" }}
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
