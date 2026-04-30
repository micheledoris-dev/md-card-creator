# md|studios Card Creator — V0.4.0

Prima versione **Supabase base**.

## Novità

- Nuova sezione `Account`.
- Login con email/password tramite Supabase Auth.
- Creazione account.
- Stato connessione Supabase.
- Salvataggio card attiva su Supabase.
- Lettura card salvate da Supabase dopo login.
- Salvataggio `cards`.
- Salvataggio `card_visibility`.
- Mantiene fallback locale se non sei loggato.

## Variabili ambiente Netlify richieste

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

## Tabelle richieste

```text
profiles
cards
card_visibility
```

## Build Netlify

- Build command: `npm run build`
- Publish directory: `dist`
