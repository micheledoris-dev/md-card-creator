# md|studios Card Creator — V0.4.9

Logo/Sigla fix.

## Correzione

Nella Public Card il testo del logo/sigla non può essere una parola lunga, perché dentro il quadratino diventa illeggibile.

Ora il logo mostra automaticamente:

- massimo 3 caratteri;
- iniziali se il testo contiene più parole;
- fallback `md` se il campo è vuoto.

Esempi:

- `md|studios` → `MDS`
- `Hotel Aurora` → `HA`
- `hhhhbmmm` → `HHH`

## Mantiene

- Public Card pulita V0.4.7
- Smart Share UX V0.4.8
- Supabase
- login/logout
- salvataggio cloud

## Build Netlify

- Build command: `npm run build`
- Publish directory: `dist`
