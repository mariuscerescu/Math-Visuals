import React from 'react';
import InequalityGrapher from '../components/InequalityGrapher';

function T59Page() {
  return (
    <div>
      <h2>Card T59: Demonstrarea unei inegalități</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>Problemă:</strong> Demonstrați inegalitatea 
        <code> (1 + a + a² + a³)² ≤ 4(1 + a² + a⁴ + a⁶)</code>.
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>Vizualizare:</strong> Mai jos sunt reprezentate grafic cele două funcții, cea din stânga (albastră) și cea din dreapta (roșie). Puteți vedea că graficul albastru se află mereu sub sau atinge graficul roșu. Folosiți slider-ul pentru a alege o valoare pentru 'a' și a compara valorile numerice ale funcțiilor în acel punct.
      </p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <InequalityGrapher />
      </div>
    </div>
  );
}

export default T59Page; 