-- Supports real FD signup/onboarding: a fresh funeral_directors row is
-- created at the end of onboarding (not at signup, since business details
-- aren't known yet), so it needs an explicit onboarded flag and can't
-- require lat/lng up front (onboarding doesn't geocode the address).
-- Run this in the Supabase SQL Editor.

alter table funeral_directors
  add column onboarded boolean not null default false,
  add column email text;

alter table funeral_directors
  alter column latitude drop not null,
  alter column longitude drop not null;
