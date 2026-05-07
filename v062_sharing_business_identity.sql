-- md|studios Card Creator — V0.5.2
-- Aggiunge il campo Ruolo / qualifica alla tabella cards

alter table public.cards
add column if not exists role_title text;
