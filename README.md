# md|studios Card Creator — V0.4.7

Public Card Reale.

## Correzione importante

La V0.4.6 non puliva davvero la Public Card perché la pagina pubblica usava ancora il componente PhoneCard interno.

Questa versione sostituisce direttamente `PublicCard`, quindi il biglietto pubblico non mostra più:

- Dati attivi
- Smart Share come blocco tecnico
- Template come blocco tecnico
- QR reale
- chip tecnici
- anteprima/prototipo interna

## Mantiene

- logo / sigla
- nome card
- claim
- headline
- descrizione
- motto
- pulsanti sito / WhatsApp
- contatti visibili
- copia scheda completa
- Supabase, login e salvataggio cloud

## Build Netlify

- Build command: `npm run build`
- Publish directory: `dist`
