-- md|studios Card Creator — V0.5.3
-- Campi persona: Nome e cognome + Ruolo / qualifica

alter table public.cards
add column if not exists person_name text;

alter table public.cards
add column if not exists role_title text;
