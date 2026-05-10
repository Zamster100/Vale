import { CheckCircle } from "lucide-react";

export default function VerifiedFamilyLabel() {
  return (
    <div
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full mb-1.5"
      style={{
        background: "rgba(212,165,116,0.1)",
        border: "0.5px solid rgba(212,165,116,0.35)",
      }}
    >
      <CheckCircle className="w-3 h-3 shrink-0" style={{ color: "#d4a574" }} aria-hidden="true" />
      <span className="text-xs font-semibold" style={{ color: "#6b7280" }}>
        Verified Family
      </span>
      <span className="text-xs" style={{ color: "#6b7280" }}>
        · arranged via VALE
      </span>
    </div>
  );
}
