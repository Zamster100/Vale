import { createClient } from "@/lib/supabase/client";

export interface FDUser {
  id: string;
  email: string;
  businessName: string;
  onboarded: boolean;
  fdId?: string;
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

export async function getUser(): Promise<FDUser | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: fd } = await supabase
    .from("funeral_directors")
    .select("id, name, onboarded")
    .eq("owner_user_id", user.id)
    .maybeSingle();

  return {
    id: user.id,
    email: user.email ?? "",
    businessName: fd?.name ?? "",
    onboarded: fd?.onboarded ?? false,
    fdId: fd?.id,
  };
}

export async function signUp(
  email: string,
  password: string
): Promise<{ user: FDUser | null; needsEmailConfirmation: boolean }> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  if (!data.session || !data.user) {
    return { user: null, needsEmailConfirmation: true };
  }

  return {
    user: { id: data.user.id, email: data.user.email ?? email, businessName: "", onboarded: false },
    needsEmailConfirmation: false,
  };
}

export async function signIn(email: string, password: string): Promise<FDUser> {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  const user = await getUser();
  if (!user) throw new Error("Sign in succeeded but no session was found");
  return user;
}

export async function saveProfile(profile: FDProfile): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: existing } = await supabase
    .from("funeral_directors")
    .select("id")
    .eq("owner_user_id", user.id)
    .maybeSingle();

  const fdId = existing?.id ?? `fd_${crypto.randomUUID().slice(0, 8)}`;

  const row = {
    name: profile.businessName,
    address: profile.address,
    postcode: profile.postcode,
    city: profile.city,
    phone: profile.phone,
    email: profile.email,
    website: profile.website,
    onboarded: true,
  };

  const { error } = existing
    ? await supabase.from("funeral_directors").update(row).eq("id", fdId)
    : await supabase.from("funeral_directors").insert({
        id: fdId,
        owner_user_id: user.id,
        description: "",
        ...row,
      });
  if (error) throw error;

  await supabase.from("prices").delete().eq("fd_id", fdId);
  if (profile.prices.length) {
    const { error: priceError } = await supabase.from("prices").insert(
      profile.prices.map((p) => ({
        fd_id: fdId,
        service: p.serviceName,
        type: p.serviceType,
        price: p.price,
        includes: [],
      }))
    );
    if (priceError) throw priceError;
  }
}

export async function getProfile(): Promise<FDProfile | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: fd } = await supabase
    .from("funeral_directors")
    .select("*, prices(*)")
    .eq("owner_user_id", user.id)
    .maybeSingle();
  if (!fd) return null;

  return {
    businessName: fd.name,
    address: fd.address,
    postcode: fd.postcode,
    city: fd.city,
    phone: fd.phone,
    email: fd.email ?? "",
    website: fd.website,
    prices: (fd.prices as { service: string; type: string; price: number }[]).map((p) => ({
      serviceType: p.type,
      serviceName: p.service,
      price: p.price,
    })),
  };
}

export async function signOut(): Promise<void> {
  const supabase = createClient();
  await supabase.auth.signOut();
}
