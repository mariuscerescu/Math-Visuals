import React from 'react';
import GeometricProgressionSolver from '../components/GeometricProgressionSolver';

function TD04Page() {
  return (
    <div>
      <h2>Card TD04: Problema cu progresia geometrică</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>Problemă:</strong> Cinci elevi rezolvă pe rând câte un exemplu din tabla înmulțirii. Rezultatul fiecăruia este de 1.5 ori mai mare decât al precedentului. Ce numere a înmulțit al patrulea elev, Ivan?
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>Rezolvare interactivă:</strong> Problema se reduce la găsirea unui număr de start 'x' pentru o progresie geometrică cu 5 termeni și rația 1.5, astfel încât toți termenii să fie numere întregi în limitele tablei înmulțirii (1-81). Folosiți unealta de mai jos pentru a testa diferite valori de start 'x'.
      </p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <GeometricProgressionSolver />
      </div>
    </div>
  );
}

export default TD04Page; 