# md|studios Card Creator — V0.6.5.1

Public Card Blank Fix.

## Correzione

La V0.6.5 poteva mostrare una pagina vuota cliccando su Public Card perché la funzione PublicCard usava `standalone` senza dichiararlo.

## Sistemato

- Public Card torna a caricarsi nel Creator.
- Il branding pulito resta attivo solo quando la card viene aperta da link pubblico.
- Mantiene:
  - Materiali / Brochure
  - Foto/logo
  - WhatsApp
  - Google Maps
  - QR
  - vCard
  - Footer discreto Powered by md|studios

## Deve comparire nel sito

```text
MVP 0.6.5.1 · Public Card Blank Fix
```

## Build Netlify

- Build command: `npm run build`
- Publish directory: `dist`
