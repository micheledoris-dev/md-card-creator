# Deploy stabile Netlify

Struttura corretta in root GitHub:
- public/
- src/
- supabase/
- .nvmrc
- index.html
- netlify.toml
- package.json
- package-lock.json
- vite.config.js
- README.md

Netlify:
- Base directory: vuoto
- Build command: npm run build oppure lasciare netlify.toml
- Publish directory: dist
- Branch: main

Non caricare la cartella madre dello zip. Caricare il contenuto nella root del repository.
