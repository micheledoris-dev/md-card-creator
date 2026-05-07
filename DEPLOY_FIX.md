# Deploy Netlify — md|studios Card Creator

## Impostazioni corrette Netlify

- Base directory: vuoto, se in GitHub vedi subito package.json, index.html, src/
- Build command: npm run build
- Publish directory: dist
- Branch: main

Se Netlify mostra Initializing/Building/Deploying = Skipped, non è un errore del codice: Netlify non sta eseguendo la build. Controllare Build settings, Build ignore command e collegamento GitHub.

## Struttura corretta root repository

package.json
index.html
vite.config.js
netlify.toml
src/
public/
supabase/

