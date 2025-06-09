import React from 'react';
import AreaRatioVisualizer from '../components/AreaRatioVisualizer';

function TFig08Page() {
  return (
    <div>
      <h2>Card T Fig 08: Raportul segmentelor</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>Problemă:</strong> Fie P un punct pe mediana AD a triunghiului ABC. Dreapta BP intersectează AC în E. Demonstrați că <code>AP : PD = 2 · AE : EC</code>.
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>Vizualizare:</strong> Trageți de punctul P (roșu) de-a lungul medianei sau de vârful A pentru a schimba forma triunghiului. Observați cum, deși toate segmentele se modifică, relația dintre rapoarte rămâne constantă. (Notă: demonstrația din document folosește arii, dar rezultatul este despre segmente).
      </p>
      <div style={{ marginTop: '2rem' }}>
        <AreaRatioVisualizer />
      </div>
    </div>
  );
}

export default TFig08Page; 