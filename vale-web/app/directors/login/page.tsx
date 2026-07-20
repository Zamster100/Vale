"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn, getUser } from "@/lib/auth";

interface FieldErrors {
  email?: string;
  password?: string;
}

const inputBase =
  "w-full px-5 py-4 rounded-xl text-base focus:outline-none transition-colors min-h-[56px]";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    getUser().then((user) => {
      if (user?.onboarded) router.replace("/directors/dashboard");
      else if (user) router.replace("/directors/onboard");
    });
  }, [router]);

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!email) errors.email = "Email address is required.";
    if (!password) errors.password = "Password is required.";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    const errors = validate();
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return; }
    setFieldErrors({});
    setLoading(true);
    try {
      const user = await signIn(email, password);
      router.push(user.onboarded ? "/directors/dashboard" : "/directors/onboard");
    } catch {
      setSubmitError("Incorrect email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = (field: keyof FieldErrors) => ({
    background: "white",
    border: fieldErrors[field]
      ? "1.5px solid #E26B5E"
      : focused === field
      ? "1.5px solid rgba(79,52,196,0.5)"
      : "1px solid #D5D0E4",
    color: "#4A415E",
    boxShadow: focused === field && !fieldErrors[field]
      ? "0 0 0 3px rgba(79,52,196,0.12)"
      : "none",
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFCFE" }}>
      <header className="flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F34C4] rounded"
          aria-label="Vale homepage"
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 600,
              fontSize: "26px",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: "#000000",
            }}
          >Vale<span style={{ color: "#4F34C4" }}>.</span></span>
        </Link>
        <span className="text-xs" style={{ color: "#4A415E" }}>For Funeral Directors</span>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-question-enter">
          <div className="mb-10 text-center">
            <h1
              className="mb-3 font-normal"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(28px, 5vw, 40px)",
                lineHeight: 1.1,
                color: "#100B20",
              }}
            >
              Sign in
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "#4A415E" }}>
              Welcome back — sign in to manage your Vale profile.
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
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "#100B20" }}>
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
                <p role="alert" className="mt-1.5 text-xs" style={{ color: "#C95548" }}>{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: "#100B20" }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors((f) => ({ ...f, password: undefined })); }}
                  placeholder="Your password"
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F34C4] rounded"
                  style={{ color: "#4A415E" }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p role="alert" className="mt-1.5 text-xs" style={{ color: "#C95548" }}>{fieldErrors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md py-4 text-base font-medium text-white hover:opacity-90 active:scale-[0.98] transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F34C4] focus-visible:ring-offset-2"
              style={{ background: "#100B20" }}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="mt-8 pt-6 text-center" style={{ borderTop: "1px solid #D5D0E4" }}>
            <p className="text-sm" style={{ color: "#4A415E" }}>
              Don&apos;t have an account?{" "}
              <Link href="/directors/signup" className="font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F34C4] rounded" style={{ color: "#100B20" }}>
                Create one
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
