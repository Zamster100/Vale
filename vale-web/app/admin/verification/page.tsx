import { ShieldCheck } from "lucide-react";
import StaffHeader from "@/components/admin/StaffHeader";
import VerificationQueue from "@/components/admin/VerificationQueue";

export default function StaffVerificationPage() {
  return (
    <div className="min-h-screen" style={{ background: "#FDFCFE" }}>
      <StaffHeader />

      <main className="max-w-[1366px] mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: "rgba(79,52,196,0.12)",
              border: "1.5px solid rgba(79,52,196,0.3)",
            }}
          >
            <ShieldCheck className="w-5 h-5" style={{ color: "#4F34C4" }} aria-hidden="true" />
          </div>
          <div>
            <h1
              className="text-xl font-semibold"
              style={{ color: "#100B20", fontFamily: "var(--font-dm-sans)" }}
            >
              Verification queue
            </h1>
            <p className="text-sm" style={{ color: "#4A415E" }}>
              Accreditation and Assured status management across all providers.
            </p>
          </div>
        </div>

        <div
          className="p-6 rounded-xl"
          style={{ background: "white", border: "1px solid #D5D0E4" }}
        >
          <VerificationQueue />
        </div>
      </main>
    </div>
  );
}
