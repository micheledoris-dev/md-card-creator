import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function SharePanel({ card }) {
  const [qr, setQr] = useState('');
  const shareUrl = card.website;

  useEffect(() => {
    QRCode.toDataURL(shareUrl, { margin: 2, width: 260 }).then(setQr);
  }, [shareUrl]);

  async function copyLink() {
    await navigator.clipboard.writeText(shareUrl);
    alert('Link copiato');
  }

  return (
    <div className="page-content">
      <div className="page-title">
        <p className="eyebrow">QR / Share</p>
        <h2>Condividi la card</h2>
        <p>Link pubblico, QR code e pulsanti rapidi per inviare la card.</p>
      </div>
      <div className="share-layout">
        <div className="qr-box">{qr && <img src={qr} alt="QR code" />}</div>
        <div className="section-card compact">
          <span className="label">Link pubblico</span>
          <strong>{shareUrl}</strong>
          <div className="button-row">
            <button className="primary-button" onClick={copyLink}>Copia link</button>
            <a className="secondary-button as-link" href={`mailto:?subject=${encodeURIComponent(card.productName)}&body=${encodeURIComponent(shareUrl)}`}>Invia email</a>
          </div>
        </div>
      </div>
    </div>
  );
}
