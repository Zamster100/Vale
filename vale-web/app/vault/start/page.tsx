"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Upload, X, Check, Save } from "lucide-react";
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

/* ─── Screen definitions ─────────────────────────────────────── */

type ScreenType =
  | "text" | "date" | "textarea" | "select"
  | "radio" | "insurance" | "solicitor" | "documents";

interface ScreenConfig {
  question: string;
  subtitle: string;
  field: keyof VaultData;
  type: ScreenType;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

const SERVICE_RADIO: ScreenConfig["options"] = (
  ["cremation", "burial", "direct_cremation"] as const
).map((v) => ({ value: v, label: SERVICE_TYPE_LABELS[v] }));

const SIZE_RADIO: ScreenConfig["options"] = (
  ["intimate", "small", "medium", "large"] as const
).map((v) => ({ value: v, label: SERVICE_SIZE_LABELS[v] }));

const FLOWERS_RADIO: ScreenConfig["options"] = [
  { value: "yes", label: "Yes — please arrange flowers" },
  { value: "no", label: "No flowers" },
  { value: "donations", label: "Donations to charity instead" },
];

const DOC_SLOTS = [
  { id: "will", label: "Your Will", hint: "Your signed, witnessed will" },
  { id: "advance_care", label: "Advance Care Plan", hint: "Your medical wishes and preferences" },
  { id: "power_of_attorney", label: "Power of Attorney", hint: "Legal authority documents" },
];

const SCREENS: ScreenConfig[] = [
  {
    question: "What's your full name?",
    subtitle: "This helps identify your wishes clearly for your loved ones.",
    field: "fullName",
    type: "text",
    placeholder: "e.g. Margaret Elizabeth Smith",
    autoComplete: "name",
    required: true,
  },
  {
    question: "When were you born?",
    subtitle: "Helps distinguish your record if your family needs to share it.",
    field: "dateOfBirth",
    type: "date",
    required: true,
  },
  {
    question: "What's your postcode?",
    subtitle: "Helps your family find local services near your home.",
    field: "postcode",
    type: "text",
    placeholder: "e.g. SW1A 1AA",
    required: true,
  },
  {
    question: "How would you like your service to be?",
    subtitle: "There's no right or wrong — only what feels right for you.",
    field: "serviceType",
    type: "radio",
    required: true,
    options: SERVICE_RADIO,
  },
  {
    question: "How many people do you expect?",
    subtitle: "An estimate helps with venue and catering planning.",
    field: "serviceSize",
    type: "radio",
    required: true,
    options: SIZE_RADIO,
  },
  {
    question: "Any religious or cultural preference?",
    subtitle: "Optional — helps guide the ceremony style.",
    field: "religiousPreference",
    type: "select",
    required: false,
  },
  {
    question: "What music would you like played?",
    subtitle: "Songs, pieces, or artists that are meaningful to you.",
    field: "musicSelections",
    type: "textarea",
    placeholder: "e.g. 'My Way' by Frank Sinatra, Pachelbel's Canon, anything by The Beatles…",
    required: false,
  },
  {
    question: "Any readings or poems?",
    subtitle: "Passages, poems, or scripture that matter to you.",
    field: "readings",
    type: "textarea",
    placeholder: "e.g. 'Do Not Stand at My Grave and Weep', Psalm 23…",
    required: false,
  },
  {
    question: "What about flowers?",
    subtitle: "Let your family know what you'd prefer.",
    field: "flowersPreference",
    type: "radio",
    required: false,
    options: FLOWERS_RADIO,
  },
  {
    question: "Any special considerations for guests?",
    subtitle: "Mobility needs, dietary requirements, young children, long travel.",
    field: "guestConsiderations",
    type: "textarea",
    placeholder: "e.g. Several guests will need wheelchair access. My sister is vegetarian…",
    required: false,
  },
  {
    question: "Do you have a funeral plan or insurance?",
    subtitle: "Helps your family understand what financial arrangements are in place.",
    field: "insuranceProvider",
    type: "insurance",
    required: false,
  },
  {
    question: "Where is your will kept?",
    subtitle: "Helps your family find it without a search when the time comes.",
    field: "willLocation",
    type: "text",
    placeholder: "e.g. In the top drawer of the filing cabinet in the study",
    required: false,
  },
  {
    question: "Who is your solicitor?",
    subtitle: "Optional — helps your family get legal support quickly.",
    field: "solicitorName",
    type: "solicitor",
    required: false,
  },
  {
    question: "Upload any important documents",
    subtitle: "Your will, advance care plan, power of attorney — all in one safe place.",
    field: "documents",
    type: "documents",
    required: false,
  },
];

const TOTAL = SCREENS.length;

/* ─── Progress dots ──────────────────────────────────────────── */

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

/* ─── Input styles ───────────────────────────────────────────── */

const inputBase =
  "w-full px-5 py-4 rounded-xl text-base focus:outline-none transition-colors min-h-[56px]";

const inputStyle = {
  background: "white",
  border: "0.5px solid rgba(143,160,176,0.5)",
  color: "#3F5E2C",
};

const inputFocusStyle = {
  border: "0.5px solid #8A5FAA",
  boxShadow: "0 0 0 3px rgba(138,95,170,0.15)",
};

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
        ...(focused ? inputFocusStyle : {}),
        ...(hasError ? { borderColor: "#E26B5E" } : {}),
      }}
    />
  );
}

/* ─── Main content ───────────────────────────────────────────── */

function VaultStartContent() {
  const router = useRouter();
  const [screen, setScreen] = useState(0);
  const [vault, setVault] = useState<VaultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const user = getVaultUser();
    if (!user) { router.replace("/vault/login"); return; }
    const existing = getVaultData(user.id);
    setVault(existing ?? createEmptyVault(user.id));
    setLoading(false);
  }, [router]);

  const update = useCallback(<K extends keyof VaultData>(field: K, value: VaultData[K]) => {
    setVault((v) => (v ? { ...v, [field]: value } : v));
    setError("");
  }, []);

  const doSave = (v: VaultData) => {
    saveVaultData(v);
    setSavedAt(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
  };

  const handleSaveExit = () => {
    if (vault) doSave(vault);
    router.push("/vault/view");
  };

  const advance = () => {
    if (!vault) return;

    const cfg = SCREENS[screen];
    if (cfg.required) {
      const val = vault[cfg.field];
      if (!val || (typeof val === "string" && !val.trim())) {
        setError("Please answer this question to continue.");
        return;
      }
    }

    doSave(vault);

    if (screen >= TOTAL - 1) {
      router.push("/vault/view");
      return;
    }

    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      setScreen((s) => s + 1);
    }, 220);
  };

  const goBack = () => {
    setError("");
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      setScreen((s) => s - 1);
    }, 220);
  };

  const handleFileUpload = (slotId: string, slotLabel: string, file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setError("File must be under 5 MB.");
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
      setVault((v) =>
        v ? { ...v, documents: [...v.documents.filter((d) => d.id !== slotId), entry] } : v
      );
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const removeDoc = (slotId: string) =>
    setVault((v) => (v ? { ...v, documents: v.documents.filter((d) => d.id !== slotId) } : v));

  if (loading || !vault) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F5F1E8" }}>
        <div
          className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "#5D3A7A", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  const cfg = SCREENS[screen];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#F5F1E8" }}
    >
      {/* Minimal chrome */}
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
        <button
          type="button"
          onClick={handleSaveExit}
          className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA]"
          style={{ color: "#8FA0B0" }}
        >
          <Save className="w-4 h-4" aria-hidden="true" />
          Save &amp; exit
        </button>
      </header>

      {/* Progress + question */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-xl mx-auto w-full">

        {/* Dots */}
        <div className="mb-12">
          <ProgressDots current={screen} />
        </div>

        {/* Question card — key forces remount + re-animation */}
        <div
          key={`${screen}-${isExiting ? "out" : "in"}`}
          className={isExiting ? "opacity-0 translate-y-[-16px] transition-all duration-200" : "animate-question-enter"}
          style={{ width: "100%" }}
        >
          {/* Question */}
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
            {!cfg.required && <span className="ml-2 opacity-70">(optional)</span>}
          </p>

          {/* ── Input rendering ── */}

          {cfg.type === "text" && (
            <VaultInput
              id={cfg.field}
              type="text"
              value={(vault[cfg.field] as string) || ""}
              onChange={(v) => update(cfg.field, cfg.field === "postcode" ? v.toUpperCase() : v as VaultData[typeof cfg.field])}
              placeholder={cfg.placeholder}
              autoComplete={cfg.autoComplete}
              hasError={!!error}
            />
          )}

          {cfg.type === "date" && (
            <VaultInput
              id={cfg.field}
              type="date"
              value={(vault[cfg.field] as string) || ""}
              onChange={(v) => update(cfg.field, v as VaultData[typeof cfg.field])}
              hasError={!!error}
            />
          )}

          {cfg.type === "textarea" && (
            <textarea
              id={cfg.field}
              rows={4}
              value={(vault[cfg.field] as string) || ""}
              onChange={(e) => update(cfg.field, e.target.value as VaultData[typeof cfg.field])}
              placeholder={cfg.placeholder}
              className="w-full px-5 py-4 rounded-xl text-base focus:outline-none transition-colors resize-none"
              style={{ ...inputStyle, minHeight: "140px" }}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => { e.target.style.boxShadow = ""; e.target.style.border = "0.5px solid rgba(143,160,176,0.5)"; }}
            />
          )}

          {cfg.type === "select" && (
            <select
              id={cfg.field}
              value={(vault[cfg.field] as string) || ""}
              onChange={(e) => update(cfg.field, e.target.value as VaultData[typeof cfg.field])}
              className={`${inputBase} cursor-pointer`}
              style={inputStyle}
            >
              <option value="">Select preference…</option>
              {RELIGIOUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          )}

          {cfg.type === "radio" && cfg.options && (
            <fieldset>
              <legend className="sr-only">{cfg.question}</legend>
              <div className="space-y-3">
                {cfg.options.map(({ value, label }) => {
                  const checked = (vault[cfg.field] as string) === value;
                  return (
                    <label
                      key={value}
                      className="flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer transition-all"
                      style={{
                        background: checked ? "rgba(93,58,122,0.08)" : "white",
                        border: checked ? "1.5px solid #8A5FAA" : "0.5px solid rgba(143,160,176,0.4)",
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          border: checked ? "none" : "1.5px solid rgba(143,160,176,0.6)",
                          background: checked ? "#5D3A7A" : "transparent",
                        }}
                      >
                        {checked && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <input
                        type="radio"
                        name={cfg.field}
                        value={value}
                        checked={checked}
                        onChange={() => update(cfg.field, value as VaultData[typeof cfg.field])}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium" style={{ color: checked ? "#5D3A7A" : "#3F5E2C" }}>
                        {label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {cfg.type === "insurance" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#5D3A7A" }}>
                  Insurance provider
                </label>
                <VaultInput
                  id="insuranceProvider"
                  value={vault.insuranceProvider || ""}
                  onChange={(v) => update("insuranceProvider", v)}
                  placeholder="e.g. Royal London"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#5D3A7A" }}>
                  Policy number
                </label>
                <VaultInput
                  id="policyNumber"
                  value={vault.policyNumber || ""}
                  onChange={(v) => update("policyNumber", v)}
                  placeholder="e.g. RL-123456-A"
                />
              </div>
            </div>
          )}

          {cfg.type === "solicitor" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#5D3A7A" }}>
                  Solicitor&apos;s name
                </label>
                <VaultInput
                  id="solicitorName"
                  value={vault.solicitorName || ""}
                  onChange={(v) => update("solicitorName", v)}
                  placeholder="e.g. James & Partners"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#5D3A7A" }}>
                  Solicitor&apos;s phone
                </label>
                <VaultInput
                  id="solicitorPhone"
                  type="tel"
                  value={vault.solicitorPhone || ""}
                  onChange={(v) => update("solicitorPhone", v)}
                  placeholder="e.g. 020 7946 0123"
                />
              </div>
            </div>
          )}

          {cfg.type === "documents" && (
            <div className="space-y-4">
              <p className="text-xs rounded-xl px-4 py-3 mb-2" style={{ background: "rgba(197,210,220,0.4)", color: "#3F5E2C" }}>
                Files are stored securely in your Vault. Max 5 MB per file. PDF, Word, JPEG, PNG accepted.
              </p>
              {DOC_SLOTS.map((slot) => {
                const doc = vault.documents.find((d) => d.id === slot.id);
                return (
                  <div key={slot.id} className="rounded-xl p-4" style={{ border: "0.5px solid rgba(143,160,176,0.4)", background: "white" }}>
                    <p className="text-sm font-medium mb-0.5" style={{ color: "#5D3A7A" }}>{slot.label}</p>
                    <p className="text-xs mb-3" style={{ color: "#8FA0B0" }}>{slot.hint}</p>
                    {doc ? (
                      <div className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5" style={{ background: "rgba(123,168,74,0.1)", border: "0.5px solid rgba(123,168,74,0.4)" }}>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate" style={{ color: "#638B3B" }}>{doc.fileName}</p>
                          <p className="text-xs" style={{ color: "#8FA0B0" }}>Uploaded {new Date(doc.uploadedAt).toLocaleDateString("en-GB")}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDoc(slot.id)}
                          aria-label={`Remove ${slot.label}`}
                          className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E26B5E]"
                          style={{ color: "#8FA0B0" }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor={`file-${slot.id}`}
                        className="flex items-center gap-3 rounded-xl px-4 py-4 cursor-pointer transition-colors"
                        style={{ border: "1.5px dashed rgba(143,160,176,0.5)" }}
                      >
                        <Upload className="w-5 h-5 shrink-0" style={{ color: "#8FA0B0" }} aria-hidden="true" />
                        <span className="text-sm" style={{ color: "#8FA0B0" }}>Choose a file to upload</span>
                        <input
                          id={`file-${slot.id}`}
                          type="file"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          className="sr-only"
                          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileUpload(slot.id, slot.label, f); }}
                        />
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Error */}
          {error && (
            <p role="alert" className="mt-3 text-sm" style={{ color: "#E26B5E" }}>
              {error}
            </p>
          )}

          {/* Save confirmation */}
          {savedAt && !error && (
            <div className="mt-3 flex items-center gap-1.5 text-xs" style={{ color: "#7BA84A" }}>
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
              Progress saved at {savedAt}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col items-center gap-4 w-full">
          <button
            type="button"
            onClick={advance}
            className="w-full rounded-full py-5 text-base font-medium text-white hover:scale-[1.03] active:scale-[0.98] transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8A5FAA] focus-visible:ring-offset-2"
            style={{ background: "#5AAE55", maxWidth: "320px" }}
          >
            {screen >= TOTAL - 1 ? (
              <span className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4" aria-hidden="true" />
                Complete my Vault
              </span>
            ) : (
              "Continue"
            )}
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

export default function VaultStartPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#F5F1E8" }}>
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "#5D3A7A", borderTopColor: "transparent" }}
          />
        </div>
      }
    >
      <VaultStartContent />
    </Suspense>
  );
}
