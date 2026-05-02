# md|studios Card Creator — V0.5.3

Person Fields Fix.

## Correzioni

- `Nome e cognome` viene salvato e ricaricato dal cloud tramite `person_name`.
- `Ruolo / qualifica` viene salvato e ricaricato dal cloud tramite `role_title`.
- I pulsanti Visibile/Nascosto non sono più bloccati quando il campo è vuoto: puoi preimpostare la visibilità e poi compilare.
- Public Card mostra:
  - Nome e cognome
  - Ruolo / qualifica
  - Nome card / brand

## Migrazione Supabase

Eseguire nel nuovo progetto Supabase:

```sql
alter table public.cards
add column if not exists person_name text;

alter table public.cards
add column if not exists role_title text;
```

Il file è incluso anche qui:

```text
supabase/v053_person_fields_fix.sql
```

## Mantiene

- V0.5.0 Stable Cloud
- Supabase
- login/logout
- salvataggio cloud
- Smart Share UX
- Public Card pulita
- Logo/Sigla fix

## Build Netlify

- Build command: `npm run build`
- Publish directory: `dist`
