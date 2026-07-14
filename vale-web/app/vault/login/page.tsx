"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { getVaultUser, signUpVault, signInVault } from "@/lib/vault";

const EASE = [0.16, 1, 0.3, 1] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputBase: React.CSSProperties = {
  background: "white",
  borderRadius: "12px",
  color: "#4A415E",
  width: "100%",
  padding: "12px 16px",
  fontSize: "14px",
  minHeight: "44px",
  outline: "none",
  transition: "border 0.15s, box-shadow 0.15s",
};

export default function VaultLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    if (getVaultUser()) router.replace("/vault/view");
  }, [router]);

  const fieldErrors = {
    email: touched.email ? (!email.trim() ? "Please enter your email address." : !EMAIL_RE.test(email) ? "Enter a valid email address." : "") : "",
    password: touched.password ? (!password ? "Please enter a password." : password.length < 8 ? "Password must be at least 8 characters." : "") : "",
  };

  const handleBlur = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setSubmitError("");
    if (!email.trim() || !EMAIL_RE.test(email) || !password || password.length < 8) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    try {
      if (mode === "signup") {
        const existing = getVaultUser();
        if (existing?.email.toLowerCase() === email.toLowerCase()) {
          setSubmitError("An account with that email already exists. Try signing in.");
          return;
        }
        signUpVault(email);
        router.push("/vault/start");
      } else {
        const user = signInVault(email);
        if (!user) { setSubmitError("No account found with that email. Try creating one."); return; }
        router.push("/vault/view");
      }
    } finally {
      setLoading(false);
    }
  };

  const getFieldStyle = (field: string, hasError: boolean): React.CSSProperties => ({
    ...inputBase,
    border: hasError ? "1.5px solid #E26B5E" : focused === field ? "1.5px solid rgba(79,52,196,0.5)" : "1px solid #D5D0E4",
    boxShadow: focused === field && !hasError ? "0 0 0 3px rgba(79,52,196,0.12)" : "none",
  });

  const reduce = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFCFE" }}>
      <header style={{ background: "white", borderBottom: "1px solid #D5D0E4" }}>
        <div className="max-w-[1366px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="focus:outline-none rounded" aria-label="Vale homepage">
            <span className="text-2xl tracking-tight" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600, color: "#100B20" }}>Vale<span style={{ color: "#4F34C4" }}>.</span></span>
          </Link>
          <span className="text-sm" style={{ color: "#4A415E" }}>Vault</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } }}
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(79,52,196,0.1)" }} aria-hidden="true">
              <span className="text-2xl">🔐</span>
            </div>
            <h1 className="mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "#100B20", fontSize: "clamp(24px,4vw,32px)" }}>
              {mode === "signup" ? "Create your Vault" : "Welcome back"}
            </h1>
            <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: "#4A415E" }}>
              {mode === "signup"
                ? "A secure place to record your wishes — a gift for the people you love."
                : "Your wishes are waiting for you."}
            </p>
          </div>

          <div className="rounded-xl p-8" style={{ background: "white", border: "1px solid #D5D0E4" }}>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {submitError && (
                <div role="alert" className="px-4 py-3 text-sm rounded-xl" style={{ background: "rgba(226,107,94,0.08)", border: "1px solid rgba(226,107,94,0.3)", color: "#C95548" }}>
                  {submitError}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: "#100B20" }}>Email address</label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setSubmitError(""); }}
                  onBlur={() => handleBlur("email")}
                  onFocus={() => setFocused("email")}
                  aria-invalid={!!fieldErrors.email}
                  placeholder="you@example.com"
                  style={getFieldStyle("email", !!fieldErrors.email)}
                />
                {fieldErrors.email && <p role="alert" className="text-xs mt-1.5 font-medium" style={{ color: "#E26B5E" }}>{fieldErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1.5" style={{ color: "#100B20" }}>Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete={mode === "signup" ? "new-password" : "current-password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setSubmitError(""); }}
                    onBlur={() => handleBlur("password")}
                    onFocus={() => setFocused("password")}
                    aria-invalid={!!fieldErrors.password}
                    placeholder="Minimum 8 characters"
                    style={{ ...getFieldStyle("password", !!fieldErrors.password), paddingRight: "40px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity focus:outline-none rounded p-0.5"
                    style={{ color: "#4A415E" }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {fieldErrors.password && <p role="alert" className="text-xs mt-1.5 font-medium" style={{ color: "#E26B5E" }}>{fieldErrors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white py-3 rounded-lg font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px] focus:outline-none"
                style={{ background: "#4F34C4" }}
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                {loading ? "Please wait…" : mode === "signup" ? "Create my Vault" : "Sign in"}
              </button>
            </form>

            <div className="mt-6 pt-6 text-center" style={{ borderTop: "1px solid #D5D0E4" }}>
              {mode === "signup" ? (
                <p className="text-sm" style={{ color: "#4A415E" }}>
                  Already have a Vault?{" "}
                  <button type="button" onClick={() => { setMode("signin"); setTouched({}); setSubmitError(""); }} className="font-semibold hover:underline focus:outline-none rounded" style={{ color: "#100B20" }}>
                    Sign in
                  </button>
                </p>
              ) : (
                <p className="text-sm" style={{ color: "#4A415E" }}>
                  Don&apos;t have a Vault?{" "}
                  <button type="button" onClick={() => { setMode("signup"); setTouched({}); setSubmitError(""); }} className="font-semibold hover:underline focus:outline-none rounded" style={{ color: "#100B20" }}>
                    Create one — it&apos;s free
                  </button>
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs" style={{ color: "#4A415E" }}>
            <span>✓ Free forever</span>
            <span>✓ Private &amp; secure</span>
            <span>✓ Share with family</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
