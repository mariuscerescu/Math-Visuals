import React from 'react';
import NumberLogicSolver from '../components/NumberLogicSolver';

function T55Page() {
  return (
    <div>
      <h2>Card T55: Problemă de logică cu numere</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>Problemă:</strong> Găsiți toate numerele naturale care se micșorează la 1996 atunci când din ele se scade numărul obținut prin eliminarea ultimei cifre.
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>Rezolvare interactivă:</strong> Urmați pașii de mai jos pentru a descoperi soluția. Vizualizarea vă ghidează prin procesul de transformare a problemei într-o ecuație și testarea sistematică a soluțiilor posibile.
      </p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <NumberLogicSolver />
      </div>
    </div>
  );
}

export default T55Page; 