"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  ChevronRight,
  ChevronLeft,
  Upload,
  X,
  Check,
  Save,
} from "lucide-react";
import {
  getVaultUser,
  getVaultData,
  saveVaultData,
  createEmptyVault,
  RELIGIOUS_OPTIONS,
  SERVICE_TYPE_LABELS,
  SERVICE_SIZE_LABELS,
  type VaultData,
  type DocumentEntry,
} from "@/lib/vault";

const STEPS = [
  { label: "Your Basics" },
  { label: "Your Wishes" },
  { label: "Service Details" },
  { label: "Financial & Legal" },
  { label: "Documents" },
];

const STEP_COPY = [
  {
    headline: "A few details about you",
    subtitle:
      "This helps identify your wishes clearly and ensures your family knows this document is yours.",
  },
  {
    headline: "How would you like to be remembered?",
    subtitle:
      "There's no right or wrong answer — only what feels right for you.",
  },
  {
    headline: "The touches that make it personal",
    subtitle:
      "These details help create a service that truly reflects your life and what mattered most.",
  },
  {
    headline: "Important information for your family",
    subtitle:
      "This helps them navigate practical matters when the time comes — so they don't have to search.",
  },
  {
    headline: "Keep your documents safe here",
    subtitle:
      "Upload key documents so your family can find them easily, all in one place.",
  },
];

const DOC_SLOTS = [
  { id: "will", label: "Your Will", hint: "Your signed, witnessed will" },
  {
    id: "advance_care",
    label: "Advance Care Plan",
    hint: "Your medical wishes and preferences",
  },
  {
    id: "power_of_attorney",
    label: "Power of Attorney",
    hint: "Legal authority documents",
  },
];

function ProgressStepper({ step }: { step: number }) {
  const pct = Math.round(((step + 1) / STEPS.length) * 100);
  return (
    <nav aria-label="Form progress" className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-[#1a3a52]">
          {STEPS[step].label}
        </span>
        <span className="text-sm text-[#6b7280]">
          Step {step + 1} of {STEPS.length}
        </span>
      </div>
      <div
        className="w-full bg-[#e5e7eb] rounded-full h-2"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-label={`Step ${step + 1} of ${STEPS.length}`}
      >
        <div
          className="bg-[#d4a574] h-2 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <ol className="flex mt-3" aria-label="Steps">
        {STEPS.map((s, i) => (
          <li key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i < step
                  ? "bg-[#059669] text-white"
                  : i === step
                  ? "bg-[#d4a574] text-[#1a3a52]"
                  : "bg-[#e5e7eb] text-[#374151]"
              }`}
              aria-current={i === step ? "step" : undefined}
            >
              {i < step ? <Check className="w-3 h-3" aria-hidden="true" /> : i + 1}
            </div>
            <span
              className={`text-[11px] font-medium text-center leading-tight hidden sm:block ${
                i === step ? "text-[#1a3a52]" : "text-[#6b7280]"
              }`}
            >
              {s.label}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-[#dc2626]">
      {message}
    </p>
  );
}

function VaultStartContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = Math.min(
    Math.max(parseInt(searchParams.get("step") ?? "0"), 0),
    4
  );

  const [step, setStep] = useState(initialStep);
  const [vault, setVault] = useState<VaultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const user = getVaultUser();
    if (!user) {
      router.replace("/vault/login");
      return;
    }
    const existing = getVaultData(user.id);
    setVault(existing ?? createEmptyVault(user.id));
    setLoading(false);
  }, [router]);

  const update = <K extends keyof VaultData>(field: K, value: VaultData[K]) => {
    setVault((v) => (v ? { ...v, [field]: value } : v));
    setErrors((e) => {
      const next = { ...e };
      delete next[field as string];
      return next;
    });
  };

  const doSave = (v: VaultData) => {
    saveVaultData(v);
    setSavedAt(
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const handleSaveExit = () => {
    if (vault) doSave(vault);
    router.push("/vault/view");
  };

  const validateStep = (s: number): Record<string, string> => {
    if (!vault) return {};
    const errs: Record<string, string> = {};
    if (s === 0) {
      if (!vault.fullName.trim()) errs.fullName = "Full name is required.";
      if (!vault.dateOfBirth) errs.dateOfBirth = "Date of birth is required.";
      if (!vault.postcode.trim()) errs.postcode = "Postcode is required.";
    }
    if (s === 1) {
      if (!vault.serviceType) errs.serviceType = "Please choose a service type.";
      if (!vault.serviceSize) errs.serviceSize = "Please choose a service size.";
    }
    return errs;
  };

  const handleContinue = () => {
    if (!vault) return;
    const errs = validateStep(step);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    doSave(vault);
    if (step < 4) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/vault/view");
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFileUpload = (slotId: string, slotLabel: string, file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setErrors((e) => ({ ...e, [`doc_${slotId}`]: "File must be under 5 MB." }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const entry: DocumentEntry = {
        id: slotId,
        label: slotLabel,
        fileName: file.name,
        fileType: file.type,
        dataUrl: reader.result as string,
        uploadedAt: new Date().toISOString(),
      };
      setVault((v) => {
        if (!v) return v;
        return {
          ...v,
          documents: [...v.documents.filter((d) => d.id !== slotId), entry],
        };
      });
      setErrors((e) => {
        const next = { ...e };
        delete next[`doc_${slotId}`];
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const removeDocument = (slotId: string) => {
    setVault((v) =>
      v ? { ...v, documents: v.documents.filter((d) => d.id !== slotId) } : v
    );
  };

  if (loading || !vault) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
        <div
          className="w-8 h-8 border-2 border-[#1a3a52] border-t-transparent rounded-full animate-spin"
          aria-label="Loading"
        />
      </div>
    );
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border rounded text-sm bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-1 focus:border-[#d4a574] min-h-[44px] ${
      errors[field] ? "border-[#dc2626]" : "border-[#d1d5db]"
    }`;

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      <header className="bg-white border-b border-[#e5e7eb] sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="VALE homepage">
            <div
              className="w-8 h-8 bg-[#1a3a52] rounded flex items-center justify-center"
              aria-hidden="true"
            >
              <MapPin className="w-4 h-4 text-[#d4a574]" />
            </div>
            <span className="text-xl font-bold text-[#1a3a52] tracking-tight">VALE</span>
            <span className="text-sm text-[#6b7280] ml-1 hidden sm:inline">Vault</span>
          </Link>
          <button
            type="button"
            onClick={handleSaveExit}
            className="flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-[#1a3a52] transition-colors px-3 py-2 rounded min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574]"
          >
            <Save className="w-4 h-4" aria-hidden="true" />
            Save &amp; exit
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10">
        <ProgressStepper step={step} />

        <div className="mb-6">
          <h1 className="mb-1">{STEP_COPY[step].headline}</h1>
          <p className="text-[#6b7280] text-sm leading-relaxed">
            {STEP_COPY[step].subtitle}
          </p>
        </div>

        {savedAt && (
          <div className="mb-4 flex items-center gap-2 text-xs text-[#059669] font-medium">
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
            Progress saved at {savedAt}
          </div>
        )}

        <div className="bg-white border border-[#e5e7eb] rounded-lg shadow-sm p-6 sm:p-8">
          {/* ── STEP 1: Basics ── */}
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-[#111827] mb-1.5"
                >
                  Full name{" "}
                  <span className="text-[#dc2626]" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  value={vault.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="e.g. Margaret Elizabeth Smith"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  className={inputClass("fullName")}
                />
                <FieldError id="fullName-error" message={errors.fullName} />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-semibold text-[#111827] mb-1.5"
                  >
                    Date of birth{" "}
                    <span className="text-[#dc2626]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    required
                    value={vault.dateOfBirth}
                    onChange={(e) => update("dateOfBirth", e.target.value)}
                    aria-invalid={!!errors.dateOfBirth}
                    aria-describedby={
                      errors.dateOfBirth ? "dob-error" : undefined
                    }
                    className={inputClass("dateOfBirth")}
                  />
                  <FieldError id="dob-error" message={errors.dateOfBirth} />
                </div>
                <div>
                  <label
                    htmlFor="postcode"
                    className="block text-sm font-semibold text-[#111827] mb-1.5"
                  >
                    Postcode{" "}
                    <span className="text-[#dc2626]" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    id="postcode"
                    type="text"
                    required
                    value={vault.postcode}
                    onChange={(e) =>
                      update("postcode", e.target.value.toUpperCase())
                    }
                    placeholder="e.g. SW1A 1AA"
                    aria-invalid={!!errors.postcode}
                    aria-describedby={
                      errors.postcode ? "postcode-error" : undefined
                    }
                    className={inputClass("postcode")}
                  />
                  <FieldError id="postcode-error" message={errors.postcode} />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Wishes ── */}
          {step === 1 && (
            <div className="space-y-7">
              <fieldset>
                <legend className="block text-sm font-semibold text-[#111827] mb-3">
                  Service type{" "}
                  <span className="text-[#dc2626]" aria-hidden="true">
                    *
                  </span>
                </legend>
                <div className="space-y-3">
                  {(["cremation", "burial", "direct_cremation"] as const).map(
                    (type) => (
                      <label
                        key={type}
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                          vault.serviceType === type
                            ? "border-[#d4a574] bg-[#faf6f1]"
                            : "border-[#e5e7eb] hover:border-[#d1d5db] bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="serviceType"
                          value={type}
                          checked={vault.serviceType === type}
                          onChange={() => update("serviceType", type)}
                          className="accent-[#d4a574] w-4 h-4 shrink-0"
                        />
                        <span className="text-sm text-[#111827] font-medium">
                          {SERVICE_TYPE_LABELS[type]}
                        </span>
                      </label>
                    )
                  )}
                </div>
                <FieldError
                  id="serviceType-error"
                  message={errors.serviceType}
                />
              </fieldset>

              <fieldset>
                <legend className="block text-sm font-semibold text-[#111827] mb-3">
                  How many guests do you expect?{" "}
                  <span className="text-[#dc2626]" aria-hidden="true">
                    *
                  </span>
                </legend>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(["intimate", "small", "medium", "large"] as const).map(
                    (size) => (
                      <label
                        key={size}
                        className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                          vault.serviceSize === size
                            ? "border-[#d4a574] bg-[#faf6f1]"
                            : "border-[#e5e7eb] hover:border-[#d1d5db] bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="serviceSize"
                          value={size}
                          checked={vault.serviceSize === size}
                          onChange={() => update("serviceSize", size)}
                          className="accent-[#d4a574] w-4 h-4 shrink-0"
                        />
                        <span className="text-sm text-[#111827] font-medium">
                          {SERVICE_SIZE_LABELS[size]}
                        </span>
                      </label>
                    )
                  )}
                </div>
                <FieldError
                  id="serviceSize-error"
                  message={errors.serviceSize}
                />
              </fieldset>

              <div>
                <label
                  htmlFor="religiousPreference"
                  className="block text-sm font-semibold text-[#111827] mb-1.5"
                >
                  Religious or spiritual preference{" "}
                  <span className="text-[#6b7280] font-normal text-xs">
                    (optional)
                  </span>
                </label>
                <select
                  id="religiousPreference"
                  value={vault.religiousPreference}
                  onChange={(e) => update("religiousPreference", e.target.value)}
                  className="w-full px-4 py-3 border border-[#d1d5db] rounded text-sm bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus:border-[#d4a574] text-[#111827] min-h-[44px]"
                >
                  <option value="">Select preference…</option>
                  {RELIGIOUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* ── STEP 3: Service Details ── */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="musicSelections"
                  className="block text-sm font-semibold text-[#111827] mb-1"
                >
                  Music you&apos;d like played{" "}
                  <span className="text-[#6b7280] font-normal text-xs">
                    (optional)
                  </span>
                </label>
                <p className="text-xs text-[#6b7280] mb-2">
                  Songs, pieces, or artists that are meaningful to you
                </p>
                <textarea
                  id="musicSelections"
                  rows={4}
                  value={vault.musicSelections}
                  onChange={(e) => update("musicSelections", e.target.value)}
                  placeholder="e.g. 'My Way' by Frank Sinatra, Pachelbel's Canon, anything by The Beatles…"
                  className="w-full px-4 py-3 border border-[#d1d5db] rounded text-sm bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus:border-[#d4a574] resize-none"
                />
              </div>

              <div>
                <label
                  htmlFor="readings"
                  className="block text-sm font-semibold text-[#111827] mb-1"
                >
                  Readings or poems{" "}
                  <span className="text-[#6b7280] font-normal text-xs">
                    (optional)
                  </span>
                </label>
                <p className="text-xs text-[#6b7280] mb-2">
                  Passages, poems, or scripture that matter to you
                </p>
                <textarea
                  id="readings"
                  rows={4}
                  value={vault.readings}
                  onChange={(e) => update("readings", e.target.value)}
                  placeholder="e.g. 'Do Not Stand at My Grave and Weep', Psalm 23…"
                  className="w-full px-4 py-3 border border-[#d1d5db] rounded text-sm bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus:border-[#d4a574] resize-none"
                />
              </div>

              <fieldset>
                <legend className="block text-sm font-semibold text-[#111827] mb-3">
                  Flowers{" "}
                  <span className="text-[#6b7280] font-normal text-xs">
                    (optional)
                  </span>
                </legend>
                <div className="space-y-2.5">
                  {(["yes", "no", "donations"] as const).map((pref) => (
                    <label
                      key={pref}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="flowersPreference"
                        value={pref}
                        checked={vault.flowersPreference === pref}
                        onChange={() => update("flowersPreference", pref)}
                        className="accent-[#d4a574] w-4 h-4 shrink-0"
                      />
                      <span className="text-sm text-[#111827]">
                        {pref === "yes" && "Yes, please arrange flowers"}
                        {pref === "no" && "No flowers"}
                        {pref === "donations" &&
                          "Donations to charity instead of flowers"}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label
                  htmlFor="guestConsiderations"
                  className="block text-sm font-semibold text-[#111827] mb-1"
                >
                  Guest considerations{" "}
                  <span className="text-[#6b7280] font-normal text-xs">
                    (optional)
                  </span>
                </label>
                <p className="text-xs text-[#6b7280] mb-2">
                  Dietary needs, mobility requirements, travel, young children
                </p>
                <textarea
                  id="guestConsiderations"
                  rows={3}
                  value={vault.guestConsiderations}
                  onChange={(e) => update("guestConsiderations", e.target.value)}
                  placeholder="e.g. Several guests will need wheelchair access. My sister is vegetarian…"
                  className="w-full px-4 py-3 border border-[#d1d5db] rounded text-sm bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus:border-[#d4a574] resize-none"
                />
              </div>
            </div>
          )}

          {/* ── STEP 4: Financial & Legal ── */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="bg-[#faf6f1] border border-[#f0e0cc] rounded-lg px-4 py-3 text-xs text-[#92400e] leading-relaxed">
                This information is stored privately and shared only with people
                you choose. Do not include your full bank account number or sort
                code.
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="insuranceProvider"
                    className="block text-sm font-semibold text-[#111827] mb-1.5"
                  >
                    Insurance provider{" "}
                    <span className="text-[#6b7280] font-normal text-xs">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="insuranceProvider"
                    type="text"
                    value={vault.insuranceProvider}
                    onChange={(e) =>
                      update("insuranceProvider", e.target.value)
                    }
                    placeholder="e.g. Royal London"
                    className={inputClass("insuranceProvider")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="policyNumber"
                    className="block text-sm font-semibold text-[#111827] mb-1.5"
                  >
                    Policy number{" "}
                    <span className="text-[#6b7280] font-normal text-xs">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="policyNumber"
                    type="text"
                    value={vault.policyNumber}
                    onChange={(e) => update("policyNumber", e.target.value)}
                    placeholder="e.g. RL-123456-A"
                    className={inputClass("policyNumber")}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="bankAccountRef"
                  className="block text-sm font-semibold text-[#111827] mb-1"
                >
                  Bank / building society reference{" "}
                  <span className="text-[#6b7280] font-normal text-xs">
                    (optional)
                  </span>
                </label>
                <p className="text-xs text-[#6b7280] mb-1.5">
                  A reference to help your family identify the account — not your
                  full account number
                </p>
                <input
                  id="bankAccountRef"
                  type="text"
                  value={vault.bankAccountRef}
                  onChange={(e) => update("bankAccountRef", e.target.value)}
                  placeholder="e.g. Barclays current account — High Street branch"
                  className={inputClass("bankAccountRef")}
                />
              </div>

              <div>
                <label
                  htmlFor="willLocation"
                  className="block text-sm font-semibold text-[#111827] mb-1.5"
                >
                  Where is your will?{" "}
                  <span className="text-[#6b7280] font-normal text-xs">
                    (optional)
                  </span>
                </label>
                <input
                  id="willLocation"
                  type="text"
                  value={vault.willLocation}
                  onChange={(e) => update("willLocation", e.target.value)}
                  placeholder="e.g. In the top drawer of the filing cabinet at home"
                  className={inputClass("willLocation")}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="solicitorName"
                    className="block text-sm font-semibold text-[#111827] mb-1.5"
                  >
                    Solicitor&apos;s name{" "}
                    <span className="text-[#6b7280] font-normal text-xs">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="solicitorName"
                    type="text"
                    value={vault.solicitorName}
                    onChange={(e) => update("solicitorName", e.target.value)}
                    placeholder="e.g. James & Partners"
                    className={inputClass("solicitorName")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="solicitorPhone"
                    className="block text-sm font-semibold text-[#111827] mb-1.5"
                  >
                    Solicitor&apos;s phone{" "}
                    <span className="text-[#6b7280] font-normal text-xs">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="solicitorPhone"
                    type="tel"
                    value={vault.solicitorPhone}
                    onChange={(e) => update("solicitorPhone", e.target.value)}
                    placeholder="e.g. 020 7946 0123"
                    className={inputClass("solicitorPhone")}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 5: Documents ── */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="bg-[#faf6f1] border border-[#f0e0cc] rounded-lg px-4 py-3 text-xs text-[#92400e] leading-relaxed">
                Files are stored securely in your Vault. Maximum 5 MB per file.
                Accepted formats: PDF, Word, JPEG, PNG.
              </div>

              {DOC_SLOTS.map((slot) => {
                const doc = vault.documents.find((d) => d.id === slot.id);
                return (
                  <div
                    key={slot.id}
                    className="border border-[#e5e7eb] rounded-lg p-4"
                  >
                    <p className="text-sm font-semibold text-[#111827] mb-0.5">
                      {slot.label}
                    </p>
                    <p className="text-xs text-[#6b7280] mb-3">{slot.hint}</p>

                    {doc ? (
                      <div className="flex items-center justify-between gap-3 bg-[#f0fdf4] border border-[#a7f3d0] rounded px-3 py-2.5">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[#059669] truncate">
                            {doc.fileName}
                          </p>
                          <p className="text-xs text-[#6b7280]">
                            Uploaded{" "}
                            {new Date(doc.uploadedAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDocument(slot.id)}
                          aria-label={`Remove ${slot.label}`}
                          className="text-[#6b7280] hover:text-[#dc2626] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dc2626] rounded min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor={`file-${slot.id}`}
                        className="flex items-center gap-3 border-2 border-dashed border-[#d1d5db] rounded-lg px-4 py-4 cursor-pointer hover:border-[#d4a574] hover:bg-[#faf6f1] transition-colors"
                      >
                        <Upload
                          className="w-5 h-5 text-[#6b7280] shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-[#6b7280]">
                          Choose a file to upload
                        </span>
                        <input
                          id={`file-${slot.id}`}
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file)
                              handleFileUpload(slot.id, slot.label, file);
                          }}
                        />
                      </label>
                    )}
                    {errors[`doc_${slot.id}`] && (
                      <p role="alert" className="mt-1.5 text-xs text-[#dc2626]">
                        {errors[`doc_${slot.id}`]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div
          className={`mt-6 flex gap-3 ${step > 0 ? "justify-between" : "justify-end"}`}
        >
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 px-5 py-3 border border-[#d1d5db] bg-white text-[#6b7280] rounded font-semibold text-sm hover:bg-[#f3f4f6] transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              Back
            </button>
          )}
          <button
            type="button"
            onClick={handleContinue}
            className="flex items-center gap-1.5 px-6 py-3 bg-[#1a3a52] text-white rounded font-semibold text-sm hover:bg-[#0f2438] transition-colors min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a574] focus-visible:ring-offset-2 ml-auto"
          >
            {step < 4 ? (
              <>
                Continue
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </>
            ) : (
              <>
                <Check className="w-4 h-4" aria-hidden="true" />
                Complete my Vault
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}

export default function VaultStartPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
          <div
            className="w-8 h-8 border-2 border-[#1a3a52] border-t-transparent rounded-full animate-spin"
            aria-label="Loading"
          />
        </div>
      }
    >
      <VaultStartContent />
    </Suspense>
  );
}
