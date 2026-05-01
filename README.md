# md|studios Card Creator — V0.4.4

Versione diagnostica automatica Supabase.

## Novità

- Il test Supabase parte automaticamente entrando in `Account`.
- Aggiunto test diretto REST verso `/rest/v1/cards`.
- Il pulsante è ora `Riprova test Supabase`.
- Mostra se il problema è:
  - variabile mancante
  - URL non valido
  - key non valida
  - rete/DNS/CORS
  - risposta Supabase non OK

## Variabili richieste

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

## Build Netlify

- Build command: `npm run build`
- Publish directory: `dist`
