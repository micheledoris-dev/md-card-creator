# md|studios Card Creator — V0.4.1

Hotfix: **Build fix V0.4**.

## Correzione

- Risolto errore di build della V0.4.0.
- Mantiene la sezione `Account`.
- Mantiene collegamento Supabase.
- Mantiene login email/password.
- Mantiene salvataggio card attiva su Supabase.
- Mantiene salvataggio `cards` e `card_visibility`.

## Variabili ambiente Netlify richieste

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

## Build Netlify

- Build command: `npm run build`
- Publish directory: `dist`
