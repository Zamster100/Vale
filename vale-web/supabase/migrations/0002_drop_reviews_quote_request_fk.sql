-- The dummy data has reviews referencing quote_request ids that don't
-- actually exist in quote-requests.json (informal/loose reference in the
-- original mock data, not a real relation) -- so this shouldn't be a hard FK.
-- Run this in the Supabase SQL Editor if you already applied 0001_init.sql.

alter table reviews drop constraint if exists reviews_quote_request_id_fkey;
