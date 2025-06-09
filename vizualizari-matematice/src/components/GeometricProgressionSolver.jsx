// src/components/GeometricProgressionSolver.jsx

import React, { useState } from 'react';

const students = ['Petia', 'Kolia', 'Vasia', 'Ivan', 'Mișa'];
const ratio = 3 / 2;
const MAX_RESULT = 81; // Limita tablei înmulțirii

const ResultRow = ({ student, value }) => {
  const isInteger = value % 1 === 0;
  const isInRange = value > 0 && value <= MAX_RESULT;
  const isValid = isInteger && isInRange;

  let statusText = '';
  if (!isInteger) statusText = 'Nu este întreg';
  else if (!isInRange) statusText = `> ${MAX_RESULT}`;
  else statusText = '✓ Valid';

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0.5rem',
      border: '1px solid #eee',
      borderRadius: '4px',
      marginBottom: '0.5rem',
      background: isValid ? '#e8f5e9' : '#ffebee'
    }}>
      <strong>{student}:</strong>
      <span>{value.toFixed(2)}</span>
      <span style={{ color: isValid ? 'green' : 'red', fontStyle: 'italic' }}>{statusText}</span>
    </div>
  );
};

function GeometricProgressionSolver() {
  const [startX, setStartX] = useState('16');

  const x = parseInt(startX, 10) || 0;
  const results = students.map((_, index) => x * (ratio ** index));
  const allValid = results.every(val => val % 1 === 0 && val > 0 && val <= MAX_RESULT);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h3>Testarea valorii de start (rezultatul lui Petia)</h3>
      <p>Introduceți o valoare și vedeți dacă toți cei 5 elevi obțin rezultate valide (numere întregi, ≤ {MAX_RESULT}).</p>
      
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="start-x" style={{ marginRight: '1rem' }}><strong>Valoarea de start 'x':</strong></label>
        <input
          id="start-x"
          type="number"
          value={startX}
          onChange={(e) => setStartX(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1.2rem', width: '100px' }}
        />
      </div>

      <div style={{ maxWidth: '400px' }}>
        {students.map((student, index) => (
          <ResultRow key={student} student={student} value={results[index]} />
        ))}
      </div>
      
      {allValid && (
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#e8f5e9', border: '2px solid green', borderRadius: '8px' }}>
          <h3>🎉 Soluție Găsită!</h3>
          <p>Când valoarea de start este <strong>{x}</strong>, toți termenii sunt valizi.</p>
          <p>Rezultatul lui Ivan (al 4-lea termen) este <strong>{results[3]}</strong>.</p>
          <p>Acest rezultat poate fi obținut din tabla înmulțirii ca <strong>6 × 9 = 54</strong>.</p>
        </div>
      )}
    </div>
  );
}

export default GeometricProgressionSolver; 