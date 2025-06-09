import React from 'react';
import SimsonTheoremVisualizer from '../components/SimsonTheoremVisualizer';

function TFig10Page() {
  return (
    <div>
      <h2>Card T Fig 10: Teorema lui Simson generalizată</h2>
      <p style={{ maxWidth: '800px' }}>
        <strong>Problemă:</strong> Fie M un punct pe cercul circumscris unui triunghi ABC. Notăm cu `a, b, c` distanțele de la M la laturile BC, CA, AB și cu `x, y, z` distanțele la tangentele duse prin A, B, C.
      </p>
       <p style={{ maxWidth: '800px' }}>
        <em>Notă: Enunțul original din document este probabil o eroare de tipar. Vom demonstra o teoremă corectă și elegantă legată de această configurație: distanța la o latură este media geometrică a distanțelor la tangentele din vârfurile acelei laturi.</em>
      </p>
      <p style={{ maxWidth: '800px' }}>
        <strong>Vizualizare:</strong> Trageți de vârfurile A, B, C pentru a modifica triunghiul sau de punctul verde M pentru a-l deplasa pe cerc. Observați cum, indiferent de configurație, perechile de produse (`xy` și `c²`, `yz` și `a²`, `zx` și `b²`) rămân mereu egale.
      </p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <SimsonTheoremVisualizer />
      </div>
    </div>
  );
}

export default TFig10Page; 