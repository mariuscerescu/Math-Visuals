// src/pages/T46Page.jsx

import TriangleAltitudes from '../components/TriangleAltitudes';

function T46Page() {
  return (
    <div>
      <h2>Card T46: Înălțimile în triunghiul ascuțitunghic</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>Problemă:</strong> Punctele A₁, B₁, C₁ sunt alese pe laturile unui triunghi ascuțitunghic ABC astfel încât unghiurile ∠AA₁C, ∠BB₁A, ∠CC₁B sunt egale. Demonstrați că segmentele AA₁, BB₁, CC₁ sunt înălțimile triunghiului.
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>Vizualizare:</strong> Trageți de vârfurile A, B, C pentru a modifica triunghiul. Folosiți slider-ul din dreapta pentru a schimba valoarea unghiului comun. Observați ce se întâmplă când unghiul este exact 90°.
      </p>
      
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <TriangleAltitudes />
      </div>
    </div>
  );
}

export default T46Page;