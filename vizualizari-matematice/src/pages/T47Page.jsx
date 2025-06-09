// src/pages/T47Page.jsx

import React, { useState } from 'react';
import TrigFromTangentVisualizer from '../components/TrigFromTangentVisualizer';
import { useLanguage } from '../contexts/LanguageContext';

const examples = [
  { label: 'tan(α) = -5/12', value: -5 / 12 },
  { label: 'tan(α) = -1/2', value: -1 / 2 },
  { label: 'tan(α) = -7/4', value: -7 / 4 },
  { label: 'tan(α) = -2/3', value: -2 / 3 },
];

function T47Page() {
  const { t } = useLanguage();
  const [activeExample, setActiveExample] = useState(examples[0]);

  return (
    <div>
      <h2>{t('t47_title')}</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>{t('problem_label')}</strong> {t('t47_problem')}
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>{t('viz_label')}</strong> {t('t47_viz')}
      </p>

      <div style={{ margin: '1rem 0' }}>
        <strong>{t('t47_select_example')}</strong>
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