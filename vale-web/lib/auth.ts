// Demo auth layer — works without Supabase credentials.
// When NEXT_PUBLIC_SUPABASE_URL is set, swap these calls for real Supabase auth.

export interface FDUser {
  id: string;
  email: string;
  businessName: string;
  onboarded: boolean;
}

export interface FDProfile {
  businessName: string;
  address: string;
  postcode: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  prices: PriceEntry[];
}

export interface PriceEntry {
  serviceType: string;
  serviceName: string;
  price: number;
}

const USER_KEY = "vale_fd_user";
const PROFILE_KEY = "vale_fd_profile";

export function getUser(): FDUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function signUp(email: string, _password: string): FDUser {
  const user: FDUser = {
    id: `fd_demo_${Date.now()}`,
    email,
    businessName: "",
    onboarded: false,
  };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export function saveProfile(profile: FDProfile): void {
  const user = getUser();
  if (!user) return;
  const updated: FDUser = { ...user, businessName: profile.businessName, onboarded: true };
  localStorage.setItem(USER_KEY, JSON.stringify(updated));
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getProfile(): FDProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function signOut(): void {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(PROFILE_KEY);
}
