# md|studios Card Creator — V0.5.0 Stable Cloud

Milestone stabile dopo il collegamento Supabase.

## Stato raggiunto

Questa è la prima versione stabile di riferimento del progetto.

## Funzioni confermate

- Supabase collegato.
- Login email/password funzionante.
- Creazione account funzionante.
- Salvataggio card attiva su Supabase.
- Lettura card salvate da Supabase.
- Tabelle operative:
  - `profiles`
  - `cards`
  - `card_visibility`
- Public Card pulita.
- Smart Share con QR, link e canali rapidi.
- Logo/Sigla fix.
- Campo Nome e Cognome separato.
- Display Control con campi visibili/nascosti/non compilati.
- Multi-card demo.
- Anteprima smartphone.
- QR pubblico.

## Variabili Netlify richieste

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

## Build Netlify

- Build command: `npm run build`
- Publish directory: `dist`

## Nota strategica

Questa versione è la base prima di passare a funzioni più commerciali:

- gestione workspace/azienda;
- template premium;
- contatti/leads;
- export;
- piani Free/Premium;
- Wallet reale Apple/Google.
