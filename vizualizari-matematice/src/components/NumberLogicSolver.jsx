// src/components/NumberLogicSolver.jsx

import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function NumberLogicSolver() {
  const { t } = useLanguage();
  const [selectedN, setSelectedN] = useState(null);

  const calculateX = (n) => {
    return (1996 - n) / 9;
  };

  const renderResult = () => {
    if (selectedN === null) {
      return <p>{t('t55_select_n')}</p>;
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
        <p><strong>{t('t55_for_n')} n = {selectedN}</strong>:</p>
        <p><span className="formula">x = (1996 - {selectedN}) / 9 = {1996 - {selectedN}} / 9 = {x.toFixed(4)}</span></p>
        {isInteger ? (
          <p>
            <span className="symbol-box success">{t('t55_x_is_int_symbol')}</span>
            <span style={{ color: 'green' }}>{t('t55_x_is_int_text')}</span>
          </p>
        ) : (
          <p>
            <span className="symbol-box error">{t('t55_x_not_int_symbol')}</span>
            <span style={{ color: 'tomato' }}>{t('t55_x_not_int_text')}</span>
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
          <h4>{t('t55_final_solution_title')}</h4>
          <p>{t('t55_final_solution_p1')} <strong>n = 7</strong>, {t('t55_final_solution_p2')} <strong>x = 221</strong>.</p>
          <p>{t('t55_final_solution_p3')}</p>
          <p>{t('t55_final_solution_p4')} <strong>2217</strong>.</p>
          <p>{t('t55_final_solution_p5')}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h3>{t('t55_step1_title')}</h3>
      <p>{t('t55_step1_p1')} <span className="formula">10x + n</span></p>
      <p>{t('t55_step1_p2')} <span className="formula">(10x + n) - x = 1996</span></p>
      <p>⇒ <span className="formula">9x + n = 1996</span></p>
      <p>⇒ <span className="formula">x = (1996 - n) / 9</span></p>
      <hr style={{ margin: '2rem 0' }} />
      <h3>{t('t55_step2_title')}</h3>
      <p>{t('t55_step2_p1')}</p>
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