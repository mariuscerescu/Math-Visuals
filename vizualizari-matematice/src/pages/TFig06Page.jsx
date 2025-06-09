import React from 'react';
import InscribedSquaresVisualizer from '../components/InscribedSquaresVisualizer';

function TFig06Page() {
  return (
    <div>
      <h2>Card T Fig 06: Pătrate înscrise egale</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>Problemă:</strong> Toate pătratele înscrise în triunghi (cu o latură pe o latură a triunghiului) s-au dovedit a fi egale. Găsiți unghiurile triunghiului.
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>Vizualizare:</strong> Folosiți sliderele pentru a schimba unghiurile de la bază ale triunghiului. Observați cum se modifică dimensiunile celor trei pătrate înscrise. Pătratele devin egale doar atunci când toate unghiurile sunt de 60°, adică triunghiul este echilateral.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <InscribedSquaresVisualizer />
      </div>
    </div>
  );
}

export default TFig06Page; 