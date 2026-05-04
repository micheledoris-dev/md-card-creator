# md|studios Card Creator — V0.6.4

Materiali / Brochure.

## Novità

Aggiunta sezione Premium / Business per allegare materiali alla Public Card:

- brochure PDF;
- regolamento;
- menu;
- catalogo;
- portfolio;
- documento evento;
- listino;
- presentazione;
- altri materiali.

## Editor

Nuova sezione:

```text
Materiali / Brochure
```

Sono disponibili 3 materiali base.

Ogni materiale ha:

- titolo;
- tipo;
- file / link;
- pulsante Apri;
- rimozione.

## Public Card

Compare una sezione:

```text
Materiali
Documenti condivisi
```

con pulsanti scaricabili/apribili.

## Supabase

Migrazione richiesta:

```text
supabase/v064_materials_brochure.sql
```

Aggiunge la colonna:

```sql
alter table public.cards
add column if not exists materials jsonb default '[]'::jsonb;
```

e crea il bucket:

```text
card-materials
```

## Build Netlify

- Build command: `npm run build`
- Publish directory: `dist`
