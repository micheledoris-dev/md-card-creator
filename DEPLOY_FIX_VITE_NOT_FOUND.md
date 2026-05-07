# Fix Netlify: vite not found

Errore visto nel log:

```txt
> vite build
sh: 1: vite: not found
```

Questo pacchetto forza Netlify a installare le dipendenze prima della build:

```toml
[build]
  command = "npm install --include=dev && npx vite build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--include=dev"
```

Impostazioni Netlify:
- Base directory: vuoto
- Build command: può restare vuoto se Netlify legge netlify.toml, oppure usare: npm install --include=dev && npx vite build
- Publish directory: dist
- Branch: main
