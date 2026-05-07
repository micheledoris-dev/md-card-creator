# Deploy corretto su Netlify

## Modalità GitHub/Build
- Base directory: vuoto se questi file sono nella root del repository
- Build command: npm run build
- Publish directory: dist
- Node: 20

## Modalità manuale Netlify Drop
Non caricare lo zip sorgente. Usa il pacchetto NETLIFY-DROP-CONTENTS: deve contenere index.html, assets/ e _redirects direttamente nella root.
