import { ShieldCheck } from "lucide-react";

export default function ValeAssuredBadge({ size = "md" }: { size?: "sm" | "md" }) {
  const sm = size === "sm";
  return (
    <span
      className={`inline-flex items-center gap-1 font-bold rounded-full transition-all duration-200 hover:-translate-y-px hover:shadow-sm select-none ${
        sm ? "text-[11px] px-2.5 py-1" : "text-xs px-2.5 py-1"
      }`}
      style={{ background: "#d4a574", color: "#1a3a52" }}
    >
      <ShieldCheck className={sm ? "w-3 h-3" : "w-3.5 h-3.5"} aria-hidden="true" />
      VALE Assured
    </span>
  );
}
