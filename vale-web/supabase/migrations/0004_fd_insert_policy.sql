-- 0001_init.sql only added an UPDATE policy for funeral_directors owners,
-- not INSERT. saveProfile() in lib/auth.ts inserts a new row the first time
-- an FD completes onboarding, using the anon-key browser client, so without
-- this policy every first-time onboarding insert is rejected by RLS.
-- Run this in the Supabase SQL Editor.

create policy "owner insert funeral_directors" on funeral_directors
  for insert with check (auth.uid() = owner_user_id);
