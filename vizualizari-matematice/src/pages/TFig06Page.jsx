import React from 'react';
import InscribedSquaresVisualizer from '../components/InscribedSquaresVisualizer';

function TFig06Page() {
  return (
    <div>
      <h2>Card T Fig 06: Pătrate înscrise egale</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>Problemă:</strong> Toate pătratele care pot fi înscrise într-un triunghi (cu o latură pe o latură a triunghiului) sunt egale. Găsiți unghiurile triunghiului.
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>Vizualizare:</strong> Trageți de vârfurile A, B, C pentru a modifica forma triunghiului. Veți vedea cele trei pătrate înscrise posibile, fiecare cu baza pe o altă latură. Observați cum se modifică dimensiunile lor și unghiurile triunghiului. Încercați să faceți pătratele egale.
      </p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <InscribedSquaresVisualizer />
      </div>
    </div>
  );
}

export default TFig06Page; 