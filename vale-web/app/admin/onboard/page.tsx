"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Plus, Trash2, Loader2, Check } from "lucide-react";
import { getUser, saveProfile, type PriceEntry } from "@/lib/auth";

const SERVICE_OPTIONS = [
  { type: "cremation", label: "Attended Cremation", placeholder: "e.g. Simple Attended Funeral" },
  { type: "direct_cremation", label: "Direct Cremation", placeholder: "e.g. Direct Cremation" },
  { type: "burial", label: "Burial", placeholder: "e.g. Traditional Burial" },
  { type: "repatriation", label: "Repatriation", placeholder: "e.g. International Repatriation" },
];

interface FormState {
  businessName: string;
  address: string;
  postcode: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  prices: PriceEntry[];
}

const INITIAL_PRICES: PriceEntry[] = [
  { serviceType: "cremation", serviceName: "Simple Attended Funeral", price: 0 },
  { serviceType: "direct_cremation", serviceName: "Direct Cremation", price: 0 },
  { serviceType: "burial", serviceName: "Traditional Burial", price: 0 },
];

type ScreenId = "businessName" | "address" | "contact" | "prices";

interface OnboardScreen {
  id: ScreenId;
  question: string;
  subtitle: string;
}

const SCREENS: OnboardScreen[] = [
  {
    id: "businessName",
    question: "What's your business called?",
    subtitle: "This is what families will see on your profile.",
  },
  {
    id: "address",
    question: "Where are you based?",
    subtitle: "Your address helps families find you by location.",
  },
  {
    id: "contact",
    question: "How can families reach you?",
    subtitle: "Phone and email are shown on your public profile.",
  },
  {
    id: "prices",
    question: "Add your service prices",
    subtitle: "Families see these upfront. Transparency builds trust.",
  },
];

const TOTAL = SCREENS.length;

const inputBase =
  "w-full px-5 py-4 rounded-xl text-base focus:outline-none transition-colors min-h-[56px]";

const inputStyle = {
  background: "white",
  border: "0.5px solid rgba(143,160,176,0.5)",
  color: "#3F5E2C",
};

function ProgressDots({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-1.5" role="progressbar" aria-valuenow={current + 1} aria-valuemax={TOTAL}>
      {SCREENS.map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === current ? "20px" : "8px",
            height: "8px",
            background: i < current ? "#7BA84A" : i === current ? "#5D3A7A" : "rgba(143,160,176,0.4)",
          }}
        />
      ))}
    </div>
  );
}

function VaultInput({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  hasError,
}: {
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  hasError?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={inputBase}
      style={{
        ...inputStyle,
        ...(focused ? { border: "1.5px solid #8A5FAA", boxShadow: "0 0 0 3px rgba(138,95,170,0.15)" } : {}),
        ...(hasError ? { border: "1.5px solid #E26B5E" } : {}),
      }}
    />
  );
}

export default function OnboardPage() {
  const router = useRouter();
  const [screen, setScreen] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isExiting, setIsExiting] = useState(false);

  const [form, setForm] = useState<FormState>({
    businessName: "",
    address: "",
    postcode: "",
    city: "",
    phone: "",
    email: "",
    website: "",
    prices: INITIAL_PRICES,
  });

  useEffect(() => {
    const user = getUser();
    if (!user) router.replace("/admin/signup");
    else if (user.onboarded) router.replace("/admin/dashboard");
  }, [router]);

  const setField = (field: keyof Omit<FormState, "prices">, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  };

  const updatePrice = (i: number, field: keyof PriceEntry, value: string | number) =>
    setForm((f) => {
      const prices = [...f.prices];
      prices[i] = { ...prices[i], [field]: field === "price" ? Number(value) : value };
      return { ...f, prices };
    });

  const addPrice = () =>
    setForm((f) => ({ ...f, prices: [...f.prices, { serviceType: "cremation", serviceName: "", price: 0 }] }));

  const removePrice = (i: number) =>
    setForm((f) => ({ ...f, prices: f.prices.filter((_, idx) => idx !== i) }));

  const validate = (): Record<string, string> => {
    const cfg = SCREENS[screen];
    const e: Record<string, string> = {};
    if (cfg.id === "businessName" && !form.businessName.trim()) e.businessName = "Business name is required.";
    if (cfg.id === "address") {
      if (!form.address.trim()) e.address = "Address is required.";
      if (!form.postcode.trim()) e.postcode = "Postcode is required.";
    }
    if (cfg.id === "contact") {
      if (!form.phone.trim()) e.phone = "Phone number is required.";
      if (!form.email.trim()) e.email = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    }
    return e;
  };

  const advance = async () => {
    if (screen < TOTAL - 1) {
      const errs = validate();
      if (Object.keys(errs).length > 0) { setErrors(errs); return; }
      setErrors({});
      setIsExiting(true);
      setTimeout(() => { setIsExiting(false); setScreen((s) => s + 1); }, 220);
    } else {
      // Submit
      const valid = form.prices.filter((p) => p.serviceName.trim() && p.price > 0);
      if (valid.length === 0) {
        setErrors({ prices: "Add at least one service with a name and price." });
        return;
      }
      setErrors({});
      setLoading(true);
      await new Promise((r) => setTimeout(r, 800));
      saveProfile({ ...form, prices: valid });
      router.push("/admin/dashboard");
    }
  };

  const goBack = () => {
    setErrors({});
    setIsExiting(true);
    setTimeout(() => { setIsExiting(false); setScreen((s) => s - 1); }, 220);
  };

  const cfg = SCREENS[screen];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F5F1E8" }}>
      {/* Minimal header */}
      <header className="flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA] rounded"
          aria-label="VALE homepage"
        >
          <span
            className="text-2xl tracking-tight"
            style={{ fontFamily: "var(--font-instrument-serif)", color: "#5D3A7A" }}
          >
            VALE
          </span>
        </Link>
        <span className="text-xs" style={{ color: "#8FA0B0" }}>For Funeral Directors</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-xl mx-auto w-full">
        {/* Dots */}
        <div className="mb-12">
          <ProgressDots current={screen} />
        </div>

        {/* Question card */}
        <div
          key={`${screen}-${isExiting ? "out" : "in"}`}
          className={isExiting ? "opacity-0 translate-y-[-16px] transition-all duration-200" : "animate-question-enter"}
          style={{ width: "100%" }}
        >
          <h1
            className="mb-3 font-normal"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontSize: "clamp(28px, 5vw, 44px)",
              lineHeight: 1.1,
              color: "#5D3A7A",
            }}
          >
            {cfg.question}
          </h1>
          <p className="mb-8 text-sm leading-relaxed" style={{ color: "#8FA0B0" }}>
            {cfg.subtitle}
          </p>

          {/* ── Screen: Business name ── */}
          {cfg.id === "businessName" && (
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium mb-2" style={{ color: "#5D3A7A" }}>
                Business name
              </label>
              <VaultInput
                id="businessName"
                value={form.businessName}
                onChange={(v) => setField("businessName", v)}
                placeholder="e.g. Smith & Sons Funerals"
                hasError={!!errors.businessName}
              />
              {errors.businessName && <p role="alert" className="mt-1.5 text-xs" style={{ color: "#E26B5E" }}>{errors.businessName}</p>}
            </div>
          )}

          {/* ── Screen: Address ── */}
          {cfg.id === "address" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-2" style={{ color: "#5D3A7A" }}>
                  Street address
                </label>
                <VaultInput
                  id="address"
                  value={form.address}
                  onChange={(v) => setField("address", v)}
                  placeholder="e.g. 47 High Street, Westminster"
                  hasError={!!errors.address}
                />
                {errors.address && <p role="alert" className="mt-1.5 text-xs" style={{ color: "#E26B5E" }}>{errors.address}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="postcode" className="block text-sm font-medium mb-2" style={{ color: "#5D3A7A" }}>
                    Postcode
                  </label>
                  <VaultInput
                    id="postcode"
                    value={form.postcode}
                    onChange={(v) => setField("postcode", v.toUpperCase())}
                    placeholder="e.g. SW1A 1AA"
                    hasError={!!errors.postcode}
                  />
                  {errors.postcode && <p role="alert" className="mt-1.5 text-xs" style={{ color: "#E26B5E" }}>{errors.postcode}</p>}
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-2" style={{ color: "#5D3A7A" }}>
                    City
                  </label>
                  <VaultInput
                    id="city"
                    value={form.city}
                    onChange={(v) => setField("city", v)}
                    placeholder="e.g. London"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── Screen: Contact ── */}
          {cfg.id === "contact" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: "#5D3A7A" }}>
                  Phone number
                </label>
                <VaultInput
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => setField("phone", v)}
                  placeholder="e.g. 020 7946 0958"
                  hasError={!!errors.phone}
                />
                {errors.phone && <p role="alert" className="mt-1.5 text-xs" style={{ color: "#E26B5E" }}>{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="fdEmail" className="block text-sm font-medium mb-2" style={{ color: "#5D3A7A" }}>
                  Business email
                </label>
                <VaultInput
                  id="fdEmail"
                  type="email"
                  value={form.email}
                  onChange={(v) => setField("email", v)}
                  placeholder="info@yourfuneralhome.co.uk"
                  hasError={!!errors.email}
                />
                {errors.email && <p role="alert" className="mt-1.5 text-xs" style={{ color: "#E26B5E" }}>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium mb-2" style={{ color: "#5D3A7A" }}>
                  Website <span className="font-normal" style={{ color: "#8FA0B0" }}>(optional)</span>
                </label>
                <VaultInput
                  id="website"
                  type="url"
                  value={form.website}
                  onChange={(v) => setField("website", v)}
                  placeholder="www.yourfuneralhome.co.uk"
                />
              </div>
            </div>
          )}

          {/* ── Screen: Prices ── */}
          {cfg.id === "prices" && (
            <div className="space-y-4">
              {errors.prices && (
                <div role="alert" className="rounded-xl px-4 py-3 text-sm" style={{ background: "rgba(226,107,94,0.1)", color: "#C95548", border: "0.5px solid rgba(226,107,94,0.3)" }}>
                  {errors.prices}
                </div>
              )}

              {form.prices.map((entry, i) => (
                <div key={i} className="rounded-xl p-4" style={{ background: "white", border: "0.5px solid rgba(143,160,176,0.4)" }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <label htmlFor={`stype-${i}`} className="block text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "#8FA0B0" }}>
                        Service type
                      </label>
                      <select
                        id={`stype-${i}`}
                        value={entry.serviceType}
                        onChange={(e) => updatePrice(i, "serviceType", e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none"
                        style={{ background: "#F5F1E8", border: "0.5px solid rgba(143,160,176,0.4)", color: "#3F5E2C" }}
                      >
                        {SERVICE_OPTIONS.map((s) => (
                          <option key={s.type} value={s.type}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                    {form.prices.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePrice(i)}
                        aria-label={`Remove service ${i + 1}`}
                        className="mt-5 w-9 h-9 flex items-center justify-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E26B5E]"
                        style={{ color: "#8FA0B0" }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`sname-${i}`} className="block text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "#8FA0B0" }}>
                        Service name
                      </label>
                      <input
                        id={`sname-${i}`}
                        type="text"
                        value={entry.serviceName}
                        onChange={(e) => updatePrice(i, "serviceName", e.target.value)}
                        placeholder={SERVICE_OPTIONS.find((s) => s.type === entry.serviceType)?.placeholder ?? ""}
                        className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none"
                        style={{ background: "#F5F1E8", border: "0.5px solid rgba(143,160,176,0.4)", color: "#3F5E2C" }}
                      />
                    </div>
                    <div>
                      <label htmlFor={`price-${i}`} className="block text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "#8FA0B0" }}>
                        Price (£)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#8FA0B0" }} aria-hidden="true">£</span>
                        <input
                          id={`price-${i}`}
                          type="number"
                          min="0"
                          step="1"
                          value={entry.price || ""}
                          onChange={(e) => updatePrice(i, "price", e.target.value)}
                          placeholder="0"
                          className="w-full pl-7 pr-3 py-2.5 rounded-lg text-sm focus:outline-none"
                          style={{ background: "#F5F1E8", border: "0.5px solid rgba(143,160,176,0.4)", color: "#3F5E2C" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addPrice}
                className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA]"
                style={{ border: "1.5px dashed rgba(143,160,176,0.5)", color: "#8FA0B0" }}
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                Add another service
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col items-center gap-4 w-full">
          <button
            type="button"
            onClick={advance}
            disabled={loading}
            className="w-full rounded-full py-5 text-base font-medium text-white hover:scale-[1.03] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA] focus-visible:ring-offset-2"
            style={{ background: "#5AAE55", maxWidth: "320px" }}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
            {loading ? "Saving…" : screen >= TOTAL - 1 ? (
              <span className="flex items-center gap-2"><Check className="w-4 h-4" />Go live on VALE</span>
            ) : "Continue"}
          </button>

          {screen > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA] rounded"
              style={{ color: "#8FA0B0" }}
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              Back
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
