# md|studios Card Creator — V0.4.5

Versione pulita dopo collegamento Supabase.

## Stato

Questa versione rimuove la diagnostica tecnica visibile della V0.4.4 e lascia una pagina Account più normale.

## Mantiene

- Supabase collegato tramite variabili Netlify.
- Login email/password.
- Creazione account.
- Logout.
- Salvataggio card attiva su Supabase.
- Lettura card salvate da Supabase dopo login.
- Tabelle:
  - profiles
  - cards
  - card_visibility

## Novità

- Pagina Account pulita.
- Stato cloud visibile ma non tecnico.
- Card disponibili.
- Pulsante Vai all’editor.
- Messaggi più chiari su login e creazione account.

## Variabili Netlify richieste

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

## Build Netlify

- Build command: `npm run build`
- Publish directory: `dist`
