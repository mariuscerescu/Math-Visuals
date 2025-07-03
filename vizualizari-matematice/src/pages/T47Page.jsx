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
      <h2 className="page-title">{t('t47_title')}</h2>
      <div className="page-section">
        <p className="problem-statement">
          <strong className="section-label">{t('problem_label')}</strong> {t('t47_problem')}
        </p>
        <p className="visualization-description">
          <strong className="section-label">{t('viz_label')}</strong> {t('t47_viz')}
        </p>
      </div>

      <div className="button-group">
        <strong className="section-label">{t('t47_select_example')}</strong>
        {examples.map((ex, index) => (
          <button 
            key={index} 
            onClick={() => setActiveExample(ex)}
            className={`example-button ${activeExample.label === ex.label ? 'active' : ''}`}
          >
            {ex.label}
          </button>
        ))}
      </div>
      
      <div className="visualization-container">
        <TrigFromTangentVisualizer tangent={activeExample.value} />
      </div>
    </div>
  );
}

export default T47Page;