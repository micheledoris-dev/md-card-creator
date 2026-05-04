-- md|studios Card Creator — V0.5.1
-- Aggiunge il campo Nome e cognome alla tabella cards

alter table public.cards
add column if not exists person_name text;
