"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, Plus, Trash2, Loader2, ChevronRight } from "lucide-react";
import { getUser, saveProfile, type PriceEntry } from "@/lib/auth";

const SERVICE_OPTIONS = [
  { type: "cremation", label: "Attended Cremation", placeholder: "e.g. Simple Attended Funeral" },
  { type: "direct_cremation", label: "Direct Cremation", placeholder: "e.g. Direct Cremation" },
  { type: "burial", label: "Burial", placeholder: "e.g. Traditional Burial" },
  { type: "repatriation", label: "Repatriation", placeholder: "e.g. International Repatriation" },
];

const STEPS = ["Business details", "Your prices"];

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

interface Step1Errors {
  businessName?: string;
  address?: string;
  postcode?: string;
  phone?: string;
  email?: string;
}

const INITIAL_PRICES: PriceEntry[] = [
  { serviceType: "cremation", serviceName: "Simple Attended Funeral", price: 0 },
  { serviceType: "direct_cremation", serviceName: "Direct Cremation", price: 0 },
  { serviceType: "burial", serviceName: "Traditional Burial", price: 0 },
];

export default function OnboardPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [step1Errors, setStep1Errors] = useState<Step1Errors>({});
  const [step2Error, setStep2Error] = useState("");

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
    setStep1Errors((e) => ({ ...e, [field]: undefined }));
  };

  const updatePrice = (i: number, field: keyof PriceEntry, value: string | number) =>
    setForm((f) => {
      const prices = [...f.prices];
      prices[i] = { ...prices[i], [field]: field === "price" ? Number(value) : value };
      return { ...f, prices };
    });

  const addPrice = () =>
    setForm((f) => ({
      ...f,
      prices: [...f.prices, { serviceType: "cremation", serviceName: "", price: 0 }],
    }));

  const removePrice = (i: number) =>
    setForm((f) => ({ ...f, prices: f.prices.filter((_, idx) => idx !== i) }));

  const validateStep1 = (): Step1Errors => {
    const errors: Step1Errors = {};
    if (!form.businessName.trim()) errors.businessName = "Business name is required.";
    if (!form.address.trim()) errors.address = "Address is required.";
    if (!form.postcode.trim()) errors.postcode = "Postcode is required.";
    if (!form.phone.trim()) errors.phone = "Phone number is required.";
    if (!form.email.trim()) errors.email = "Business email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
    return errors;
  };

  const handleNext = () => {
    const errors = validateStep1();
    if (Object.keys(errors).length > 0) {
      setStep1Errors(errors);
      return;
    }
    setStep1Errors({});
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = form.prices.filter((p) => p.serviceName.trim() && p.price > 0);
    if (valid.length === 0) {
      setStep2Error("Add at least one service with a name and price.");
      return;
    }
    setStep2Error("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    saveProfile({ ...form, prices: valid });
    router.push("/admin/dashboard");
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 border rounded text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-1 focus:border-[#d4a574] min-h-[44px] ${
      hasError ? "border-[#dc2626]" : "border-[#d1d5db]"
    }`;

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      <header className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="VALE homepage">
            <div className="w-8 h-8 bg-[#1a3a52] rounded flex items-center justify-center" aria-hidden="true">
              <MapPin className="w-4 h-4 text-[#d4a574]" />
            </div>
            <span className="text-xl font-bold text-[#1a3a52] tracking-tight">VALE</span>
          </Link>
          <span className="text-sm text-[#6b7280]">Step {step + 1} of {STEPS.length}</span>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          {/* Progress indicator */}
          <nav aria-label="Onboarding progress" className="mb-8">
            <ol className="flex items-center gap-0">
              {STEPS.map((label, i) => (
                <li key={i} className="flex items-center flex-1 last:flex-none">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                        i < step
                          ? "bg-[#059669] text-white"
                          : i === step
                          ? "bg-[#1a3a52] text-white"
                          : "bg-[#e5e7eb] text-[#6b7280]"
                      }`}
                      aria-current={i === step ? "step" : undefined}
                    >
                      {i < step ? "✓" : i + 1}
                    </div>
                    <span className={`text-sm font-medium ${i === step ? "text-[#1a3a52]" : "text-[#6b7280]"}`}>
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 mx-4 h-px bg-[#e5e7eb]" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <div className="bg-white border border-[#e5e7eb] rounded-lg shadow-sm p-8">
            {/* ── STEP 1: Business Details ── */}
            {step === 0 && (
              <div>
                <h1 className="text-2xl mb-1">Tell us about your business</h1>
                <p className="text-sm text-[#6b7280] mb-6">This is what families will see on your profile.</p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-semibold text-[#111827] mb-1.5">
                      Business name <span className="text-[#dc2626]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="businessName"
                      type="text"
                      required
                      value={form.businessName}
                      onChange={(e) => setField("businessName", e.target.value)}
                      placeholder="e.g. Smith & Sons Funerals"
                      aria-invalid={!!step1Errors.businessName}
                      aria-describedby={step1Errors.businessName ? "businessName-error" : undefined}
                      className={inputClass(!!step1Errors.businessName)}
                    />
                    {step1Errors.businessName && (
                      <p id="businessName-error" role="alert" className="mt-1.5 text-xs text-[#dc2626]">{step1Errors.businessName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-semibold text-[#111827] mb-1.5">
                      Address <span className="text-[#dc2626]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="address"
                      type="text"
                      required
                      value={form.address}
                      onChange={(e) => setField("address", e.target.value)}
                      placeholder="e.g. 123 High Street, Westminster"
                      aria-invalid={!!step1Errors.address}
                      aria-describedby={step1Errors.address ? "address-error" : undefined}
                      className={inputClass(!!step1Errors.address)}
                    />
                    {step1Errors.address && (
                      <p id="address-error" role="alert" className="mt-1.5 text-xs text-[#dc2626]">{step1Errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="postcode" className="block text-sm font-semibold text-[#111827] mb-1.5">
                        Postcode <span className="text-[#dc2626]" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="postcode"
                        type="text"
                        required
                        value={form.postcode}
                        onChange={(e) => setField("postcode", e.target.value.toUpperCase())}
                        placeholder="e.g. SW1A 1AA"
                        aria-invalid={!!step1Errors.postcode}
                        aria-describedby={step1Errors.postcode ? "postcode-error" : undefined}
                        className={inputClass(!!step1Errors.postcode)}
                      />
                      {step1Errors.postcode && (
                        <p id="postcode-error" role="alert" className="mt-1.5 text-xs text-[#dc2626]">{step1Errors.postcode}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-semibold text-[#111827] mb-1.5">
                        City
                      </label>
                      <input
                        id="city"
                        type="text"
                        value={form.city}
                        onChange={(e) => setField("city", e.target.value)}
                        placeholder="e.g. London"
                        className="w-full px-4 py-3 border border-[#d1d5db] rounded text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-1 focus:border-[#d4a574] min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-[#111827] mb-1.5">
                      Phone number <span className="text-[#dc2626]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      placeholder="e.g. 020 7946 0958"
                      aria-invalid={!!step1Errors.phone}
                      aria-describedby={step1Errors.phone ? "phone-error" : undefined}
                      className={inputClass(!!step1Errors.phone)}
                    />
                    {step1Errors.phone && (
                      <p id="phone-error" role="alert" className="mt-1.5 text-xs text-[#dc2626]">{step1Errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="fdEmail" className="block text-sm font-semibold text-[#111827] mb-1.5">
                      Business email <span className="text-[#dc2626]" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="fdEmail"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="info@yourfuneralhome.co.uk"
                      aria-invalid={!!step1Errors.email}
                      aria-describedby={step1Errors.email ? "fdEmail-error" : undefined}
                      className={inputClass(!!step1Errors.email)}
                    />
                    {step1Errors.email && (
                      <p id="fdEmail-error" role="alert" className="mt-1.5 text-xs text-[#dc2626]">{step1Errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-semibold text-[#111827] mb-1.5">
                      Website{" "}
                      <span className="text-[#6b7280] font-normal">(optional)</span>
                    </label>
                    <input
                      id="website"
                      type="url"
                      value={form.website}
                      onChange={(e) => setField("website", e.target.value)}
                      placeholder="www.yourfuneralhome.co.uk"
                      className="w-full px-4 py-3 border border-[#d1d5db] rounded text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-1 focus:border-[#d4a574] min-h-[44px]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="mt-8 w-full bg-[#1a3a52] text-white py-3 rounded font-semibold text-sm hover:bg-[#0f2438] transition-colors flex items-center justify-center gap-2 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
                >
                  Continue to prices
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}

            {/* ── STEP 2: Prices ── */}
            {step === 1 && (
              <form onSubmit={handleSubmit}>
                <h1 className="text-2xl mb-1">Add your prices</h1>
                <p className="text-sm text-[#6b7280] mb-6">Families see these prices upfront. Transparency builds trust.</p>

                {step2Error && (
                  <div role="alert" className="bg-[#fff5f5] border border-[#fca5a5] rounded px-4 py-3 text-sm text-[#dc2626] mb-5">
                    {step2Error}
                  </div>
                )}

                <div className="space-y-4">
                  {form.prices.map((entry, i) => (
                    <div key={i} className="border border-[#e5e7eb] rounded-lg p-4 bg-[#f9fafb]">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <label htmlFor={`serviceType-${i}`} className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wider mb-1">
                            Service type
                          </label>
                          <select
                            id={`serviceType-${i}`}
                            value={entry.serviceType}
                            onChange={(e) => updatePrice(i, "serviceType", e.target.value)}
                            className="w-full px-3 py-2.5 border border-[#d1d5db] rounded text-sm bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus:border-[#d4a574] text-[#111827]"
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
                            className="mt-5 w-8 h-8 flex items-center justify-center text-[#6b7280] hover:text-[#dc2626] transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626]"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label htmlFor={`serviceName-${i}`} className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wider mb-1">
                            Service name
                          </label>
                          <input
                            id={`serviceName-${i}`}
                            type="text"
                            value={entry.serviceName}
                            onChange={(e) => updatePrice(i, "serviceName", e.target.value)}
                            placeholder={SERVICE_OPTIONS.find((s) => s.type === entry.serviceType)?.placeholder ?? ""}
                            className="w-full px-3 py-2.5 border border-[#d1d5db] rounded text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus:border-[#d4a574]"
                          />
                        </div>
                        <div>
                          <label htmlFor={`price-${i}`} className="block text-xs font-semibold text-[#6b7280] uppercase tracking-wider mb-1">
                            Price (£)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280] text-sm" aria-hidden="true">£</span>
                            <input
                              id={`price-${i}`}
                              type="number"
                              min="0"
                              step="1"
                              value={entry.price || ""}
                              onChange={(e) => updatePrice(i, "price", e.target.value)}
                              placeholder="0"
                              className="w-full pl-7 pr-3 py-2.5 border border-[#d1d5db] rounded text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus:border-[#d4a574]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addPrice}
                    className="w-full py-3 border-2 border-dashed border-[#d1d5db] rounded-lg text-sm font-medium text-[#6b7280] hover:border-[#d4a574] hover:text-[#1a3a52] transition-colors flex items-center justify-center gap-2 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574]"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                    Add another service
                  </button>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setStep(0); setStep2Error(""); }}
                    className="flex-1 bg-white border border-[#d1d5db] text-[#6b7280] py-3 rounded font-semibold text-sm hover:bg-[#f3f4f6] transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#1a3a52] text-white py-3 rounded font-semibold text-sm hover:bg-[#0f2438] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
                    {loading ? "Saving…" : "Go live on VALE"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
