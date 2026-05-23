"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const SERVICE_TYPES = [
  { value: "", label: "Any service type" },
  { value: "direct-cremation", label: "Direct cremation" },
  { value: "cremation", label: "Cremation" },
  { value: "burial", label: "Burial" },
  { value: "natural-burial", label: "Natural burial" },
  { value: "celebration", label: "Celebration of life" },
];

interface Props {
  /** dark=true → inputs styled for dark background (default); false → light */
  dark?: boolean;
}

export default function HeroSearchV2({ dark = true }: Props) {
  const [postcode, setPostcode] = useState("");
  const [serviceType, setServiceType] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (postcode.trim()) params.set("postcode", postcode.trim());
    if (serviceType) params.set("type", serviceType);
    router.push(`/search${params.toString() ? `?${params}` : ""}`);
  }

  const inputBase: React.CSSProperties = dark
    ? {
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.16)",
        color: "#FFFFFF",
      }
    : {
        background: "#FFFFFF",
        border: "1px solid #D4E3DA",
        color: "#1C1F2A",
      };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 w-full"
      role="search"
      aria-label="Search funeral directors"
    >
      <input
        type="text"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        placeholder="Enter your postcode"
        aria-label="Your postcode"
        className={[
          "flex-1 rounded-xl px-4 py-3.5 text-sm outline-none",
          "focus:ring-2 focus:ring-[#5E8B73] focus:ring-offset-0",
          dark ? "placeholder-white/35" : "placeholder-[#B0A79E]",
        ].join(" ")}
        style={inputBase}
      />
      <select
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value)}
        aria-label="Service type"
        className="rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-[#5E8B73] sm:w-52 cursor-pointer"
        style={inputBase}
      >
        {SERVICE_TYPES.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-medium shrink-0 hover:opacity-90 active:scale-[0.98] transition-all"
        style={{ background: "#5E8B73", color: "#FFFFFF" }}
      >
        <Search className="w-4 h-4" aria-hidden="true" />
        Search
      </button>
    </form>
  );
}
