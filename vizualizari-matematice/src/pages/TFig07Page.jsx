import React from 'react';
import KissingCirclesVisualizer from '../components/KissingCirclesVisualizer';

function TFig07Page() {
  return (
    <div>
      <h2>Card T Fig 07: Problema celor 12 cercuri</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>Problemă:</strong> Se pot desena pe plan 12 cercuri astfel încât fiecare să fie tangentă la exact alte 5 cercuri?
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>Vizualizare:</strong> Răspunsul este da. Configurația de mai jos este un exemplu. Aceasta este o proiecție stereografică a unui icosaedru, unde vârfurile devin centrele cercurilor. Plasați mouse-ul peste oricare dintre cele 12 cercuri pentru a verifica că atinge exact 5 alte cercuri (cercul exterior mare este considerat al 12-lea cerc).
      </p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px', display: 'flex', justifyContent: 'center' }}>
        <KissingCirclesVisualizer />
      </div>
    </div>
  );
}

export default TFig07Page; 