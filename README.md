# md|studios Card Creator — V0.5.1

Nome e Cognome in Editor.

## Correzione

La V0.5.0 aveva la logica parziale, ma il campo non compariva realmente nell'Editor.  
Questa versione aggiunge il campo:

```text
Nome e cognome
```

separato da:

```text
Nome card / brand
```

## Importante: migrazione Supabase

Prima o dopo il deploy, eseguire nel nuovo progetto Supabase:

```sql
alter table public.cards
add column if not exists person_name text;
```

Il file è incluso anche qui:

```text
supabase/v051_add_person_name.sql
```

## Comportamento

Nella Public Card:

- `Nome e cognome` diventa titolo principale;
- `Nome card / brand` diventa sottotitolo se diverso;
- se `Nome e cognome` è vuoto, usa ancora il nome card.

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
