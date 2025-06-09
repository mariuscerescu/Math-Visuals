// src/components/GeometricProgressionSolver.jsx

import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const students = ['Petia', 'Kolia', 'Vasia', 'Ivan', 'Mișa'];
const ratio = 3 / 2;
const MAX_RESULT = 81; // Limita tablei înmulțirii

const ResultRow = ({ student, value }) => {
  const { t } = useLanguage();
  const isInteger = value % 1 === 0;
  const isInRange = value > 0 && value <= MAX_RESULT;
  const isValid = isInteger && isInRange;

  let statusText = '';
  if (!isInteger) statusText = t('td04_not_integer');
  else if (!isInRange) statusText = t('td04_out_of_range');
  else statusText = t('td04_valid');

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
  const { t } = useLanguage();
  const [startX, setStartX] = useState('16');

  const x = parseInt(startX, 10) || 0;
  const results = students.map((_, index) => x * (ratio ** index));
  const allValid = results.every(val => val % 1 === 0 && val > 0 && val <= MAX_RESULT);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h3>{t('td04_test_start_value')}</h3>
      <p>{t('td04_test_intro')}</p>
      
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="start-x" style={{ marginRight: '1rem' }}><strong>{t('td04_start_value_label')}</strong></label>
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
          <h3>{t('td04_solution_found')}</h3>
          <p>{t('td04_solution_p1')} <strong>{x}</strong>, {t('td04_solution_p2')}</p>
          <p>{t('td04_solution_p3')} <strong>{results[3]}</strong>.</p>
          <p>{t('td04_solution_p4')} <strong>6 × 9 = 54</strong>.</p>
        </div>
      )}
    </div>
  );
}

export default GeometricProgressionSolver; 