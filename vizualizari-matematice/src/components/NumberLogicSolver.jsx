// src/components/NumberLogicSolver.jsx

import React, { useState } from 'react';

function NumberLogicSolver() {
  const [selectedN, setSelectedN] = useState(null);

  const calculateX = (n) => {
    return (1996 - n) / 9;
  };

  const renderResult = () => {
    if (selectedN === null) {
      return <p>Selectați o valoare pentru 'n' pentru a testa.</p>;
    }
    const x = calculateX(selectedN);
    const isInteger = x % 1 === 0;

    return (
      <div style={{ 
        padding: '1rem', 
        marginTop: '1rem', 
        border: `2px solid ${isInteger ? 'green' : 'tomato'}`,
        borderRadius: '8px'
      }}>
        <p>Pentru <strong>n = {selectedN}</strong>:</p>
        <p><code>x = (1996 - {selectedN}) / 9 = {1996 - selectedN} / 9 = {x.toFixed(4)}</code></p>
        {isInteger ? (
          <p style={{ color: 'green', fontWeight: 'bold' }}>
            ✓ 'x' este un număr întreg! Aceasta este o soluție validă.
          </p>
        ) : (
          <p style={{ color: 'tomato' }}>
            ✗ 'x' nu este un număr întreg. Încercați altă valoare pentru 'n'.
          </p>
        )}
      </div>
    );
  };

  const getFinalSolution = () => {
    const n = 7;
    const x = calculateX(n);
    if (x % 1 === 0) {
      return (
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#e8f5e9', borderRadius: '8px' }}>
          <h4>Soluția Finală</h4>
          <p>Singura valoare pentru 'n' care produce un 'x' întreg este <strong>n = 7</strong>, ceea ce ne dă <strong>x = 221</strong>.</p>
          <p>Reconstruim numărul original:</p>
          <p>Număr = 10 * x + n = 10 * 221 + 7 = <strong>2217</strong>.</p>
          <p>Verificare: 2217 - 221 = 1996. Corect!</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h3>Pasul 1: Transformarea problemei în ecuație</h3>
      <p>Notăm numărul original ca <code>10x + n</code> (unde 'n' este ultima cifră).</p>
      <p>Ecuația devine: <code>(10x + n) - x = 1996</code></p>
      <p>⇒ <code>9x + n = 1996</code></p>
      <p>⇒ <code style={{background: '#eee', padding: '0.2rem 0.5rem'}}>x = (1996 - n) / 9</code></p>
      <hr style={{ margin: '2rem 0' }} />
      <h3>Pasul 2: Testarea valorilor posibile pentru 'n'</h3>
      <p>'n' trebuie să fie o cifră de la 0 la 9. De asemenea, pentru ca 'x' să fie întreg, `(1996 - n)` trebuie să fie divizibil cu 9. Testează opțiunile de mai jos:</p>
      <div>
        {Array.from({ length: 10 }, (_, i) => i).map(n => (
          <button
            key={n}
            onClick={() => setSelectedN(n)}
            style={{
              padding: '0.5rem 1rem',
              margin: '0.2rem',
              fontSize: '1rem',
              cursor: 'pointer',
              border: selectedN === n ? '2px solid #242424' : '1px solid #ccc',
              background: calculateX(n) % 1 === 0 ? 'lightgreen' : 'white'
            }}
          >
            n = {n}
          </button>
        ))}
      </div>
      
      {renderResult()}
      {getFinalSolution()}
    </div>
  );
}

export default NumberLogicSolver; 