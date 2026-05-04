# md|studios Card Creator — V0.6.3.4

Accent Button + Maps Link Fix.

## Correzioni

### 1. Pulsante `Visita il sito`

Il pulsante non resta più azzurro fisso.  
Ora segue il colore accent scelto dal template.

Esempio:

```text
accent oro → pulsante oro
accent azzurro → pulsante azzurro
accent verde → pulsante verde
```

Il testo resta sempre leggibile.

### 2. Google Maps

Il link `Apri posizione Google Maps` ora viene normalizzato.

Funziona con:

```text
https://maps.google.com/...
```

oppure con un indirizzo normale:

```text
Via Ascanio Sforza, 9, Milano
```

In quel caso genera:

```text
https://www.google.com/maps/search/?api=1&query=...
```

## Deve comparire nel sito

```text
MVP 0.6.3.4 · Accent Button + Maps Fix
```

## Build Netlify

- Build command: `npm run build`
- Publish directory: `dist`
