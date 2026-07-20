import { createClient as createBrowserClient } from "@/lib/supabase/client";

// Client-only: signs in via Supabase Auth, then confirms staff membership.
// Signs back out and throws if the account isn't allowlisted, so a non-staff
// account never ends up half-authenticated on /staff/login.
export async function signInStaff(email: string, password: string): Promise<void> {
  const supabase = createBrowserClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
  if (signInError) throw signInError;

  const { data: userData } = await supabase.auth.getUser();
  const userEmail = userData.user?.email;

  const { data: staffRow } = userEmail
    ? await supabase.from("staff_users").select("email").eq("email", userEmail).maybeSingle()
    : { data: null };

  if (!staffRow) {
    await supabase.auth.signOut();
    throw new Error("This account isn't authorized for staff access.");
  }
}

export async function signOutStaff(): Promise<void> {
  const supabase = createBrowserClient();
  await supabase.auth.signOut();
}

export async function getStaffSession(): Promise<{ email: string } | null> {
  const supabase = createBrowserClient();
  const { data: userData } = await supabase.auth.getUser();
  const userEmail = userData.user?.email;
  if (!userEmail) return null;

  const { data: staffRow } = await supabase
    .from("staff_users")
    .select("email")
    .eq("email", userEmail)
    .maybeSingle();

  return staffRow ? { email: userEmail } : null;
}
