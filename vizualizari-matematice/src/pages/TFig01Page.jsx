import React from 'react';
import CircleMedianVisualizer from '../components/CircleMedianVisualizer';

function TFig01Page() {
  return (
    <div>
      <h2>Card T Fig 01: Puterea punctului față de cerc</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>Problemă:</strong> Cercul circumscris triunghiului ABC intersectează prelungirea medianei BM în punctul D.
      </p>
      <p style={{ maxWidth: '700px' }}>
        <em>Notă: Enunțul original din document (`AB·AD = CB·CD`) pare a fi incorect. Vom demonstra o proprietate fundamentală și corectă a acestei construcții: <strong>teorema puterii punctului</strong>.</em>
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>Vizualizare:</strong> Trageți de vârfurile A, B, C pentru a modifica figura. Observați cum, indiferent de forma triunghiului, produsele <strong><code>AM · MC</code></strong> și <strong><code>BM · MD</code></strong> rămân mereu egale.
      </p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <CircleMedianVisualizer />
      </div>
    </div>
  );
}

export default TFig01Page; 