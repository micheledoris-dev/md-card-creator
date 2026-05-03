# md|studios Card Creator — V0.6.0

Media Identity Basic.

## Novità

- Foto profilo.
- Logo aziendale.
- Importa foto da file.
- Da telefono, il campo foto profilo può aprire la fotocamera/selfie.
- Upload su Supabase Storage.
- Visualizzazione nella Public Card.
- Rimozione immagine.

## Migrazione Supabase richiesta

Eseguire nel nuovo progetto Supabase il file:

```text
supabase/v060_media_identity.sql
```

Oppure incollare in SQL Editor il contenuto del file.

## Bucket Supabase

La versione crea/usa il bucket:

```text
card-media
```

## Mantiene

- V0.5.4.3 Stable Share & Social
- Nome e cognome
- Ruolo / qualifica
- WhatsApp visibile
- Social
- Public Card pulita
- Smart Share
- Login e salvataggio cloud

## Nota prodotto

Foto profilo e logo aziendale sono funzioni Premium/Business.  
Per ora sono attive per testare il valore prodotto; la logica piani verrà definita dopo.

## Build Netlify

- Build command: `npm run build`
- Publish directory: `dist`
