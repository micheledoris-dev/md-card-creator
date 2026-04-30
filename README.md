# md|studios Card Creator — V0.4.2

Hotfix: **Syntax fix V0.4**.

## Correzione

- Risolto errore sintattico in `src/main.jsx` vicino alla variabile `cloudStatus`.
- Aggiunto terminatore esplicito della riga per evitare errore parser Vite/Rolldown.

## Mantiene

- Sezione `Account`.
- Collegamento Supabase tramite variabili Netlify.
- Login email/password.
- Creazione account.
- Salvataggio card attiva su Supabase.
- Salvataggio `cards` e `card_visibility`.
- Fallback locale se non sei loggato.

## Variabili ambiente Netlify richieste

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

## Build Netlify

- Build command: `npm run build`
- Publish directory: `dist`
