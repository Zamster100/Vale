"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, Eye, EyeOff, Loader2 } from "lucide-react";
import { getVaultUser, signUpVault, signInVault } from "@/lib/vault";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function VaultLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (getVaultUser()) router.replace("/vault/view");
  }, [router]);

  const fieldErrors = {
    email: touched.email
      ? !email.trim()
        ? "Please enter your email address."
        : !EMAIL_RE.test(email)
        ? "Enter a valid email address."
        : ""
      : "",
    password: touched.password
      ? !password
        ? "Please enter a password."
        : password.length < 8
        ? "Password must be at least 8 characters."
        : ""
      : "",
  };

  const handleBlur = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

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
        if (!user) {
          setSubmitError("No account found with that email. Try creating one.");
          return;
        }
        router.push("/vault/view");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3 border rounded text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-1 focus:border-[#d4a574] min-h-[44px] transition-colors duration-200";

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      <header className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded" aria-label="VALE homepage">
            <div className="w-8 h-8 bg-[#1a3a52] rounded flex items-center justify-center" aria-hidden="true">
              <MapPin className="w-4 h-4 text-[#d4a574]" />
            </div>
            <span className="text-xl font-bold text-[#1a3a52] tracking-tight">VALE</span>
            <span className="text-sm text-[#6b7280] ml-2 hidden sm:inline">Vault</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 bg-[#faf6f1] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
              aria-hidden="true"
            >
              🔐
            </div>
            <h1 className="mb-2">
              {mode === "signup" ? "Create your Vault" : "Welcome back"}
            </h1>
            <p className="text-[#6b7280] text-sm leading-relaxed max-w-xs mx-auto">
              {mode === "signup"
                ? "A secure place to record your wishes — a gift for the people you love."
                : "Your wishes are waiting for you."}
            </p>
          </div>

          <div className="bg-white border border-[#e5e7eb] rounded-lg shadow-sm p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {submitError && (
                <div role="alert" className="bg-[#fff5f5] border border-[#fca5a5] rounded px-4 py-3 text-sm text-[#dc2626]">
                  {submitError}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#111827] mb-1.5">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setSubmitError(""); }}
                  onBlur={() => handleBlur("email")}
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "email-err" : undefined}
                  placeholder="you@example.com"
                  className={`${inputBase} ${fieldErrors.email ? "border-[#dc2626] focus:border-[#dc2626]" : "border-[#d1d5db]"}`}
                />
                {fieldErrors.email && (
                  <p id="email-err" role="alert" className="text-xs text-[#dc2626] mt-1.5 font-medium">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-[#111827] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete={mode === "signup" ? "new-password" : "current-password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setSubmitError(""); }}
                    onBlur={() => handleBlur("password")}
                    aria-invalid={!!fieldErrors.password}
                    aria-describedby={fieldErrors.password ? "password-err" : undefined}
                    placeholder="Minimum 8 characters"
                    className={`${inputBase} pr-10 ${fieldErrors.password ? "border-[#dc2626] focus:border-[#dc2626]" : "border-[#d1d5db]"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#374151] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded p-0.5"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p id="password-err" role="alert" className="text-xs text-[#dc2626] mt-1.5 font-medium">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a3a52] text-white py-3 rounded font-semibold text-sm hover:bg-[#0f2438] active:bg-[#081929] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                {loading ? "Please wait…" : mode === "signup" ? "Create my Vault" : "Sign in"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#e5e7eb] text-center">
              {mode === "signup" ? (
                <p className="text-sm text-[#6b7280]">
                  Already have a Vault?{" "}
                  <button
                    type="button"
                    onClick={() => { setMode("signin"); setTouched({}); setSubmitError(""); }}
                    className="text-[#1a3a52] font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded"
                  >
                    Sign in
                  </button>
                </p>
              ) : (
                <p className="text-sm text-[#6b7280]">
                  Don&apos;t have a Vault?{" "}
                  <button
                    type="button"
                    onClick={() => { setMode("signup"); setTouched({}); setSubmitError(""); }}
                    className="text-[#1a3a52] font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded"
                  >
                    Create one — it&apos;s free
                  </button>
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[#6b7280]">
            <span className="flex items-center gap-1.5">
              <span className="text-[#059669]">✓</span> Free forever
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#059669]">✓</span> Private &amp; secure
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#059669]">✓</span> Share with family
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
