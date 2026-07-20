-- Vale staff admin panel. Staff authenticate via the same Supabase Auth as
-- funeral directors; membership is checked against this allowlist. No
-- self-serve signup -- rows are added by hand via this SQL Editor.
-- Run this in the Supabase SQL Editor.

create table staff_users (
  email       text primary key,
  created_at  timestamptz not null default now()
);

alter table staff_users enable row level security;

-- A signed-in user may check only their own email -- same pattern as
-- owner_user_id = auth.uid() elsewhere in this schema. Prevents enumerating
-- who else is staff.
create policy "self read staff_users" on staff_users
  for select using (auth.jwt() ->> 'email' = email);

-- Review moderation: staff can hide a review from public display without
-- deleting it.
alter table reviews add column hidden boolean not null default false;

-- Enforce the hide at the RLS layer so every existing public read path
-- (search, profile page, reviews page) stops returning hidden reviews with
-- no app-code changes. Staff routes use the service-role client, which
-- bypasses RLS, so hidden reviews stay visible there for moderation.
drop policy "public read reviews" on reviews;
create policy "public read reviews" on reviews for select using (hidden = false);

-- After running this, add your own staff account:
-- insert into staff_users (email) values ('you@example.com');
