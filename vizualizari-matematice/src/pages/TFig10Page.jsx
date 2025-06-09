import React from 'react';
import SimsonLineVisualizer from '../components/SimsonLineVisualizer';

function TFig10Page() {
  return (
    <div>
      <h2>Card T Fig 10: Linia lui Simson</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>Problemă (context):</strong> Fie M un punct pe cercul circumscris unui triunghi ABC. Proiecțiile ortogonale ale lui M pe laturile triunghiului sunt coliniare. Dreapta care le unește se numește dreapta lui Simson. (Notă: Problema din document este o generalizare mai complexă).
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>Vizualizare:</strong> Trageți punctul M (albastru) de-a lungul cercului. Punctele roșii sunt proiecțiile lui M pe laturile triunghiului. Observați cum aceste trei puncte rămân mereu pe aceeași dreaptă (verde), indiferent de poziția lui M pe cerc.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <SimsonLineVisualizer />
      </div>
    </div>
  );
}

export default TFig10Page; 