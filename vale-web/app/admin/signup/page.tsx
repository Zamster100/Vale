"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signUp, getUser } from "@/lib/auth";

interface FieldErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const inputBase =
  "w-full px-5 py-4 rounded-xl text-base focus:outline-none transition-colors min-h-[56px]";

export default function AdminSignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const user = getUser();
    if (user?.onboarded) router.replace("/admin/dashboard");
    else if (user) router.replace("/admin/onboard");
  }, [router]);

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!email) errors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
    if (!password) errors.password = "Password is required.";
    else if (password.length < 8) errors.password = "Password must be at least 8 characters.";
    if (!confirmPassword) errors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    const errors = validate();
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return; }
    setFieldErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    try {
      signUp(email, password);
      router.push("/admin/onboard");
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = (field: keyof FieldErrors) => ({
    background: "white",
    border: fieldErrors[field]
      ? "1.5px solid #E26B5E"
      : focused === field
      ? "1.5px solid rgba(94,139,115,0.5)"
      : "1px solid #E8E2D8",
    color: "#5A4E44",
    boxShadow: focused === field && !fieldErrors[field]
      ? "0 0 0 3px rgba(94,139,115,0.12)"
      : "none",
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F7F3EE" }}>
      {/* Minimal header */}
      <header className="flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] rounded"
          aria-label="Vale homepage"
        >
          <span
            className="text-2xl tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, color: "#1C1F2A" }}
          >Vale<span style={{ color: "#5E8B73" }}>.</span></span>
        </Link>
        <span className="text-xs" style={{ color: "#7A6E64" }}>For Funeral Directors</span>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-question-enter">

          {/* Heading */}
          <div className="mb-10 text-center">
            <h1
              className="mb-3 font-normal"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(28px, 5vw, 40px)",
                lineHeight: 1.1,
                color: "#1C1F2A",
              }}
            >
              Create your account
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "#7A6E64" }}>
              Join Vale and connect with families looking for funeral services.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {submitError && (
              <div
                role="alert"
                className="rounded-xl px-4 py-3 text-sm"
                style={{ background: "rgba(226,107,94,0.1)", color: "#C95548", border: "1px solid rgba(226,107,94,0.3)" }}
              >
                {submitError}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "#1C1F2A" }}>
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFieldErrors((f) => ({ ...f, email: undefined })); }}
                placeholder="you@yourfuneralhome.co.uk"
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                aria-invalid={!!fieldErrors.email}
                className={inputBase}
                style={fieldStyle("email")}
              />
              {fieldErrors.email && (
                <p role="alert" className="mt-1.5 text-xs" style={{ color: "#E26B5E" }}>{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: "#1C1F2A" }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors((f) => ({ ...f, password: undefined })); }}
                  placeholder="Minimum 8 characters"
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  aria-invalid={!!fieldErrors.password}
                  className={`${inputBase} pr-12`}
                  style={fieldStyle("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] rounded"
                  style={{ color: "#7A6E64" }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p role="alert" className="mt-1.5 text-xs" style={{ color: "#E26B5E" }}>{fieldErrors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: "#1C1F2A" }}>
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setFieldErrors((f) => ({ ...f, confirmPassword: undefined })); }}
                placeholder="Re-enter your password"
                onFocus={() => setFocused("confirmPassword")}
                onBlur={() => setFocused(null)}
                aria-invalid={!!fieldErrors.confirmPassword}
                className={inputBase}
                style={fieldStyle("confirmPassword")}
              />
              {fieldErrors.confirmPassword && (
                <p role="alert" className="mt-1.5 text-xs" style={{ color: "#E26B5E" }}>{fieldErrors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md py-4 text-base font-medium text-white hover:opacity-90 active:scale-[0.98] transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] focus-visible:ring-offset-2"
              style={{ background: "#1C1F2A" }}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
              {loading ? "Creating account…" : "Create account"}
            </button>

            <p className="text-xs text-center" style={{ color: "#7A6E64" }}>
              By creating an account you agree to our{" "}
              <a href="#" className="hover:underline" style={{ color: "#5E8B73" }}>Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="hover:underline" style={{ color: "#5E8B73" }}>Privacy Policy</a>.
            </p>
          </form>

          <div className="mt-8 pt-6 text-center" style={{ borderTop: "1px solid #E8E2D8" }}>
            <p className="text-sm" style={{ color: "#7A6E64" }}>
              Already have an account?{" "}
              <Link href="/admin/dashboard" className="font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E8B73] rounded" style={{ color: "#1C1F2A" }}>
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs" style={{ color: "#7A6E64" }}>
            <span>✓ Free to join</span>
            <span>✓ No hidden fees</span>
            <span>✓ Go live in minutes</span>
          </div>
        </div>
      </main>
    </div>
  );
}
