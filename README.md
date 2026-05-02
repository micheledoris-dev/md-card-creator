# md|studios Card Creator — V0.5.2

Ruolo / Qualifica + ordine dati biglietto.

## Correzione

Aggiunto il campo:

```text
Ruolo / qualifica
```

separato da:

```text
Nome e cognome
Nome card / brand
```

## Struttura corretta della Public Card

```text
Nome e cognome
Ruolo / qualifica
Nome card / brand
Claim / descrizione
Contatti
```

## Migrazione Supabase richiesta

Eseguire nel nuovo progetto Supabase:

```sql
alter table public.cards
add column if not exists role_title text;
```

Il file è incluso anche qui:

```text
supabase/v052_add_role_title.sql
```

## Mantiene

- V0.5.1 Nome e Cognome in Editor
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
