-- Contact form submissions. Run this in the Supabase SQL Editor.

create table contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  subject     text not null default '',
  message     text not null,
  created_at  timestamptz not null default now()
);

alter table contact_messages enable row level security;

-- No public policies -- all access goes through the service-role admin
-- client in app/api/contact/route.ts, same pattern as quote_requests.
