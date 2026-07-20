import { createClient as createServerClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

// Server-only: confirms the current session belongs to an allowlisted staff
// member (staff_users), not just any signed-in user. Call at the top of
// every /api/admin/* staff route handler.
export async function requireStaff(): Promise<User | null> {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return null;

  const { data } = await supabase
    .from("staff_users")
    .select("email")
    .eq("email", user.email)
    .maybeSingle();

  return data ? user : null;
}
