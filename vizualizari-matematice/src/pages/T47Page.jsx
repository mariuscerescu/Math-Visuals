// src/pages/T47Page.jsx

import React, { useState } from 'react';
import TrigFromTangentVisualizer from '../components/TrigFromTangentVisualizer';

const examples = [
  { label: 'tan(α) = -5/12', value: -5 / 12 },
  { label: 'tan(α) = -1/2', value: -1 / 2 },
  { label: 'tan(α) = -7/4', value: -7 / 4 },
  { label: 'tan(α) = -2/3', value: -2 / 3 },
];

function T47Page() {
  const [activeExample, setActiveExample] = useState(examples[0]);

  return (
    <div>
      <h2>Card T47: Găsirea sin(α) și cos(α) din tan(α)</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>Problemă:</strong> Cunoscând valoarea tangentei unui unghi, găsiți valorile posibile pentru sinus și cosinus.
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>Vizualizare:</strong> Pe cercul trigonometric, o valoare a tangentei corespunde unei drepte care trece prin origine. Această dreaptă intersectează cercul în două puncte. Coordonatele acestor puncte `(cos, sin)` reprezintă cele două soluții posibile. Plasați mouse-ul peste puncte sau peste text pentru a vedea detaliile.
      </p>

      <div style={{ margin: '1rem 0' }}>
        <strong>Selectați un exemplu:</strong>
        {examples.map((ex, index) => (
          <button 
            key={index} 
            onClick={() => setActiveExample(ex)}
            style={{
              marginLeft: '1rem',
              padding: '0.5rem 1rem',
              border: '1px solid #ccc',
              background: activeExample.label === ex.label ? '#242424' : 'white',
              color: activeExample.label === ex.label ? 'white' : 'black',
              cursor: 'pointer'
            }}
          >
            {ex.label}
          </button>
        ))}
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <TrigFromTangentVisualizer tangent={activeExample.value} />
      </div>
    </div>
  );
}

export default T47Page;