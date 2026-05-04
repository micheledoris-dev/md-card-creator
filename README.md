# md|studios Card Creator — V0.6.3

Public Link + vCard.

## Obiettivo

Separare meglio:

- Card Creator = pannello di creazione/modifica
- Public Card = biglietto pubblico da inviare/scansionare

## Novità

- Public Card più autonoma quando aperta da link `?card=slug`.
- Caricamento della card pubblica da Supabase tramite slug.
- Pulsante `Aggiungi ai contatti`.
- Generazione file `.vcf`.
- QR orientato alla condivisione/salvataggio contatto.
- Pulsanti:
  - Copia link
  - Aggiungi ai contatti
  - Copia scheda completa

## Come si usa

1. Crea/modifica la card nel Creator.
2. Salva su Supabase.
3. Copia il link pubblico o mostra il QR.
4. Chi riceve apre la Public Card.
5. Può cliccare `Aggiungi ai contatti`.

## Mantiene

- V0.6.2 Sharing & Business Identity
- Codice Univoco / SDI
- QR in Public Card
- Branding md|studios
- Foto profilo
- Logo aziendale
- Supabase Storage
- Smart Share

## Migrazione Supabase

Nessuna nuova migrazione obbligatoria rispetto alla V0.6.2.
Assicurarsi che esista già:

```sql
alter table public.cards
add column if not exists sdi_code text;
```

## Build Netlify

- Build command: `npm run build`
- Publish directory: `dist`
