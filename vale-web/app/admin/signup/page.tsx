"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, Eye, EyeOff, Loader2 } from "lucide-react";
import { signUp, getUser } from "@/lib/auth";

interface FieldErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function AdminSignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");

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
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
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

  const inputClass = (field: keyof FieldErrors) =>
    `w-full px-4 py-3 border rounded text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-1 focus:border-[#d4a574] min-h-[44px] ${
      fieldErrors[field] ? "border-[#dc2626]" : "border-[#d1d5db]"
    }`;

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      <header className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2" aria-label="VALE homepage">
            <div className="w-8 h-8 bg-[#1a3a52] rounded flex items-center justify-center" aria-hidden="true">
              <MapPin className="w-4 h-4 text-[#d4a574]" />
            </div>
            <span className="text-xl font-bold text-[#1a3a52] tracking-tight">VALE</span>
            <span className="text-sm text-[#6b7280] ml-2 hidden sm:inline">for Funeral Directors</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="mb-2">Create your account</h1>
            <p className="text-[#6b7280] text-sm">
              Join VALE and connect with families looking for funeral services.
            </p>
          </div>

          <div className="bg-white border border-[#e5e7eb] rounded-lg shadow-sm p-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {submitError && (
                <div
                  role="alert"
                  className="bg-[#fff5f5] border border-[#fca5a5] rounded px-4 py-3 text-sm text-[#dc2626]"
                >
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
                  onChange={(e) => { setEmail(e.target.value); setFieldErrors((f) => ({ ...f, email: undefined })); }}
                  placeholder="you@yourfuneralhome.co.uk"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                  className={inputClass("email")}
                />
                {fieldErrors.email && (
                  <p id="email-error" role="alert" className="mt-1.5 text-xs text-[#dc2626]">{fieldErrors.email}</p>
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
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setFieldErrors((f) => ({ ...f, password: undefined })); }}
                    placeholder="Minimum 8 characters"
                    aria-invalid={!!fieldErrors.password}
                    aria-describedby={fieldErrors.password ? "password-error" : undefined}
                    className={`${inputClass("password")} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#374151] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded p-0.5"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p id="password-error" role="alert" className="mt-1.5 text-xs text-[#dc2626]">{fieldErrors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#111827] mb-1.5">
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
                  aria-invalid={!!fieldErrors.confirmPassword}
                  aria-describedby={fieldErrors.confirmPassword ? "confirm-error" : undefined}
                  className={inputClass("confirmPassword")}
                />
                {fieldErrors.confirmPassword && (
                  <p id="confirm-error" role="alert" className="mt-1.5 text-xs text-[#dc2626]">{fieldErrors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a3a52] text-white py-3 rounded font-semibold text-sm hover:bg-[#0f2438] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                {loading ? "Creating account…" : "Create account"}
              </button>

              <p className="text-xs text-center text-[#6b7280]">
                By creating an account you agree to our{" "}
                <a href="#" className="text-[#1a3a52] hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-[#1a3a52] hover:underline">Privacy Policy</a>.
              </p>
            </form>

            <div className="mt-6 pt-6 border-t border-[#e5e7eb] text-center">
              <p className="text-sm text-[#6b7280]">
                Already have an account?{" "}
                <Link href="/admin/dashboard" className="text-[#1a3a52] font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] rounded">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[#6b7280]">
            <span>✓ Free to join</span>
            <span>✓ No hidden fees</span>
            <span>✓ Go live in minutes</span>
          </div>
        </div>
      </main>
    </div>
  );
}
