import { CheckCircle } from "lucide-react";

export default function VerifiedFamilyLabel() {
  return (
    <div
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full mb-1.5"
      style={{
        background: "rgba(212,165,116,0.1)",
        border: "1px solid rgba(196,151,90,0.35)",
      }}
    >
      <CheckCircle className="w-3 h-3 shrink-0" style={{ color: "#C4975A" }} aria-hidden="true" />
      <span className="text-xs font-semibold" style={{ color: "#6b7280" }}>
        Verified Family
      </span>
      <span className="text-xs" style={{ color: "#6b7280" }}>
        · arranged via Vale
      </span>
    </div>
  );
}
