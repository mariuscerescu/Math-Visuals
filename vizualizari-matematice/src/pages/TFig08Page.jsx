import React from 'react';
import CevaTheoremVisualizer from '../components/CevaTheoremVisualizer';

function TFig08Page() {
  return (
    <div>
      <h2>Card T Fig 08: Relație pe mediană</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>Problemă:</strong> Printr-un punct P de pe mediana AD a triunghiului ABC, se duce dreapta BP care intersectează AC în E. Demonstrați că <code>AP / PD = 2 * (AE / EC)</code>.
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>Vizualizare:</strong> Trageți de vârfurile A, B, C pentru a modifica triunghiul. Trageți de punctul verde P pentru a-l muta de-a lungul medianei. Observați cum, indiferent de configurație, egalitatea din enunț rămâne mereu adevărată.
      </p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <CevaTheoremVisualizer />
      </div>
    </div>
  );
}

export default TFig08Page; 