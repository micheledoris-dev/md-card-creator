# md|studios Card Creator — V0.4.3

Versione diagnostica Supabase.

## Perché esiste

La V0.4.2 carica correttamente ma il login mostra `Failed to fetch`.  
Questa versione aggiunge controlli visibili nella pagina `Account`.

## Diagnostica aggiunta

- Verifica se Netlify legge `VITE_SUPABASE_URL`.
- Verifica se Netlify legge `VITE_SUPABASE_ANON_KEY`.
- Mostra anteprima sicura di URL/key.
- Esegue un test connessione verso la tabella `cards`.
- Mostra errore più leggibile in caso di CORS/rete/database.

## Variabili richieste

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

## Build Netlify

- Build command: `npm run build`
- Publish directory: `dist`
