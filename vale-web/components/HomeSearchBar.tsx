"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const SERVICES = [
  { value: "", label: "Any service type" },
  { value: "direct-cremation", label: "Direct cremation" },
  { value: "cremation", label: "Cremation" },
  { value: "burial", label: "Traditional burial" },
  { value: "natural", label: "Natural burial" },
  { value: "celebration", label: "Celebration of life" },
];

const OS = "var(--font-open-sans), -apple-system, sans-serif";

export default function HomeSearchBar() {
  const [postcode, setPostcode] = useState("");
  const [service, setService] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams();
    if (postcode.trim()) p.set("postcode", postcode.trim());
    if (service) p.set("type", service);
    router.push(`/search${p.toString() ? `?${p}` : ""}`);
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: OS,
    fontSize: "15px",
    color: "#1A1A2E",
    background: "#FFFFFF",
    border: "1.5px solid #E0E0F0",
    borderRadius: "12px",
    padding: "14px 16px",
    outline: "none",
    width: "100%",
  };

  return (
    <form onSubmit={handleSubmit} role="search" aria-label="Search funeral directors">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Enter your postcode"
          aria-label="Your postcode"
          style={{ ...inputStyle, flex: 1 }}
        />
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          aria-label="Service type"
          style={{ ...inputStyle, width: "auto", minWidth: "180px", cursor: "pointer" }}
        >
          {SERVICES.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          style={{
            fontFamily: OS,
            fontSize: "15px",
            fontWeight: 700,
            background: "#6B6DE8",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "12px",
            padding: "14px 24px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          <Search size={16} aria-hidden="true" />
          Search
        </button>
      </div>
    </form>
  );
}
