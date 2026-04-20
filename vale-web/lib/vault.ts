export interface VaultUser {
  id: string;
  email: string;
}

export type ServiceType = "cremation" | "burial" | "direct_cremation";
export type ServiceSize = "intimate" | "small" | "medium" | "large";
export type FlowersPref = "yes" | "no" | "donations";

export interface DocumentEntry {
  id: string;
  label: string;
  fileName: string;
  fileType: string;
  dataUrl: string;
  uploadedAt: string;
}

export interface VaultData {
  id: string;
  userId: string;
  shareToken: string;
  createdAt: string;
  updatedAt: string;
  // Step 1
  fullName: string;
  dateOfBirth: string;
  postcode: string;
  // Step 2
  serviceType: ServiceType | "";
  serviceSize: ServiceSize | "";
  religiousPreference: string;
  // Step 3
  musicSelections: string;
  readings: string;
  flowersPreference: FlowersPref | "";
  guestConsiderations: string;
  // Step 4
  insuranceProvider: string;
  policyNumber: string;
  bankAccountRef: string;
  willLocation: string;
  solicitorName: string;
  solicitorPhone: string;
  // Step 5
  documents: DocumentEntry[];
}

export const RELIGIOUS_OPTIONS = [
  "No preference",
  "Christian (Church of England)",
  "Christian (Catholic)",
  "Christian (Other)",
  "Muslim",
  "Jewish",
  "Hindu",
  "Sikh",
  "Buddhist",
  "Humanist / Non-religious",
  "Other",
];

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  cremation: "Cremation",
  burial: "Burial",
  direct_cremation: "Direct cremation (no ceremony)",
};

export const SERVICE_SIZE_LABELS: Record<ServiceSize, string> = {
  intimate: "Intimate — fewer than 10 people",
  small: "Small — 10 to 30 people",
  medium: "Medium — 30 to 75 people",
  large: "Large — more than 75 people",
};

export const FLOWERS_LABELS: Record<FlowersPref, string> = {
  yes: "Yes, please arrange flowers",
  no: "No flowers",
  donations: "Donations to charity instead of flowers",
};

const VAULT_USER_KEY = "vale_vault_user";
const vaultDataKey = (userId: string) => `vale_vault_data_${userId}`;
const tokenKey = (token: string) => `vale_vault_token_${token}`;

function generateId(): string {
  return Array.from({ length: 3 }, () => Math.random().toString(36).slice(2, 9)).join("");
}

export function getVaultUser(): VaultUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(VAULT_USER_KEY);
    return raw ? (JSON.parse(raw) as VaultUser) : null;
  } catch {
    return null;
  }
}

export function signUpVault(email: string): VaultUser {
  const user: VaultUser = { id: `vault_${generateId()}`, email };
  localStorage.setItem(VAULT_USER_KEY, JSON.stringify(user));
  return user;
}

export function signInVault(email: string): VaultUser | null {
  const existing = getVaultUser();
  if (existing?.email.toLowerCase() === email.toLowerCase()) return existing;
  return null;
}

export function signOutVault(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(VAULT_USER_KEY);
}

export function createEmptyVault(userId: string): VaultData {
  return {
    id: generateId(),
    userId,
    shareToken: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fullName: "",
    dateOfBirth: "",
    postcode: "",
    serviceType: "",
    serviceSize: "",
    religiousPreference: "",
    musicSelections: "",
    readings: "",
    flowersPreference: "",
    guestConsiderations: "",
    insuranceProvider: "",
    policyNumber: "",
    bankAccountRef: "",
    willLocation: "",
    solicitorName: "",
    solicitorPhone: "",
    documents: [],
  };
}

export function getVaultData(userId: string): VaultData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(vaultDataKey(userId));
    return raw ? (JSON.parse(raw) as VaultData) : null;
  } catch {
    return null;
  }
}

export function saveVaultData(data: VaultData): void {
  if (typeof window === "undefined") return;
  const updated = { ...data, updatedAt: new Date().toISOString() };
  localStorage.setItem(vaultDataKey(data.userId), JSON.stringify(updated));
  localStorage.setItem(tokenKey(data.shareToken), data.userId);
}

export function getVaultByToken(token: string): VaultData | null {
  if (typeof window === "undefined") return null;
  try {
    const userId = localStorage.getItem(tokenKey(token));
    if (!userId) return null;
    return getVaultData(userId);
  } catch {
    return null;
  }
}
