-- md|studios Card Creator — V0.6.2
-- Sharing & Business Identity

alter table public.cards
add column if not exists sdi_code text;
