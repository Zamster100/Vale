-- VALE Phase 1 schema: FD directory + admin portal + quote requests.
-- Run this in the Supabase Dashboard: SQL Editor -> New query -> paste -> Run.

create table funeral_directors (
  id                text primary key,
  owner_user_id     uuid references auth.users (id) on delete set null,
  name              text not null,
  address           text not null,
  postcode          text not null,
  city              text not null,
  phone             text not null,
  website           text not null default '',
  latitude          double precision not null,
  longitude         double precision not null,
  rating            numeric not null default 0,
  review_count      integer not null default 0,
  verified          boolean not null default false,
  assured           boolean not null default false,
  description       text not null default '',
  nafd_verified     boolean not null default false,
  saif_verified     boolean not null default false,
  bifd_verified     boolean not null default false,
  iccm_verified     boolean not null default false,
  verified_at       timestamptz,
  hours             jsonb,
  hero_image        text,
  created_at        timestamptz not null default now()
);

create table prices (
  id          uuid primary key default gen_random_uuid(),
  fd_id       text not null references funeral_directors (id) on delete cascade,
  service     text not null,
  type        text not null,
  price       numeric not null,
  includes    text[] not null default '{}'
);

create table quote_requests (
  id            text primary key default ('qr_' || gen_random_uuid()::text),
  fd_id         text not null references funeral_directors (id) on delete cascade,
  fd_name       text not null,
  family_name   text not null,
  email         text not null,
  phone         text not null,
  service_type  text not null,
  message       text not null default '',
  status        text not null default 'pending',
  created_at    timestamptz not null default now()
);

create table reviews (
  id                     uuid primary key default gen_random_uuid(),
  fd_id                  text not null references funeral_directors (id) on delete cascade,
  family_name            text not null,
  rating                 integer not null,
  text                   text not null,
  created_at             timestamptz not null default now(),
  verified               boolean not null default false,
  quote_request_id       text,
  status                 text,
  communication_rating   integer,
  dignity_rating         integer,
  value_rating           integer,
  facilities_rating      integer
);

create table gallery_photos (
  id          uuid primary key default gen_random_uuid(),
  fd_id       text not null references funeral_directors (id) on delete cascade,
  url         text not null,
  category    text not null,
  caption     text,
  sort_order  integer not null default 0
);

create table team_members (
  id          uuid primary key default gen_random_uuid(),
  fd_id       text not null references funeral_directors (id) on delete cascade,
  name        text not null,
  title       text not null,
  bio         text not null default '',
  photo_url   text not null,
  years_exp   integer,
  sort_order  integer not null default 0
);

-- Row Level Security
alter table funeral_directors enable row level security;
alter table prices enable row level security;
alter table reviews enable row level security;
alter table gallery_photos enable row level security;
alter table team_members enable row level security;
alter table quote_requests enable row level security;

-- Public (anon + authenticated) can read the directory.
create policy "public read funeral_directors" on funeral_directors for select using (true);
create policy "public read prices" on prices for select using (true);
create policy "public read reviews" on reviews for select using (true);
create policy "public read gallery_photos" on gallery_photos for select using (true);
create policy "public read team_members" on team_members for select using (true);

-- Only the owning FD account can modify their own row / child rows.
create policy "owner update funeral_directors" on funeral_directors
  for update using (auth.uid() = owner_user_id);

create policy "owner all prices" on prices
  for all using (
    exists (select 1 from funeral_directors fd where fd.id = prices.fd_id and fd.owner_user_id = auth.uid())
  );

create policy "owner all gallery_photos" on gallery_photos
  for all using (
    exists (select 1 from funeral_directors fd where fd.id = gallery_photos.fd_id and fd.owner_user_id = auth.uid())
  );

create policy "owner all team_members" on team_members
  for all using (
    exists (select 1 from funeral_directors fd where fd.id = team_members.fd_id and fd.owner_user_id = auth.uid())
  );

-- Reviews: anyone can submit (insert) a review; public read already covers
-- the profile-page display. Only the FD owner can moderate/update.
create policy "public insert reviews" on reviews for insert with check (true);

create policy "owner update reviews" on reviews
  for update using (
    exists (select 1 from funeral_directors fd where fd.id = reviews.fd_id and fd.owner_user_id = auth.uid())
  );

-- Quote requests: public can submit; only the owning FD can read/update their own.
create policy "public insert quote_requests" on quote_requests for insert with check (true);

create policy "owner read quote_requests" on quote_requests
  for select using (
    exists (select 1 from funeral_directors fd where fd.id = quote_requests.fd_id and fd.owner_user_id = auth.uid())
  );

create policy "owner update quote_requests" on quote_requests
  for update using (
    exists (select 1 from funeral_directors fd where fd.id = quote_requests.fd_id and fd.owner_user_id = auth.uid())
  );
