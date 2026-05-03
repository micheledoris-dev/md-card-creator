# md|studios Card Creator — V0.6.2

Sharing & Business Identity.

## Novità

- Campo `Codice Univoco / SDI`.
- Visibilità on/off per Codice Univoco.
- Codice Univoco visibile nella Public Card se compilato.
- Codice Univoco incluso nello Smart Share se visibile.
- QR visibile nella Public Card.
- Pulsanti:
  - Copia link
  - Copia scheda completa
- Footer branding:
  - Creato con md|studios Card Creator

## Migrazione Supabase richiesta

```sql
alter table public.cards
add column if not exists sdi_code text;
```

File incluso:

```text
supabase/v062_sharing_business_identity.sql
```

## Nota prodotto

Il branding md|studios è previsto nel piano Free/Base.  
In futuro potrà essere rimosso nei piani Premium / Business / White Label.

## Build Netlify

- Build command: `npm run build`
- Publish directory: `dist`
