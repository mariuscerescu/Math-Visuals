// src/pages/T53Page.jsx

import React, { useState } from 'react';
import FunctionGrapher from '../components/FunctionGrapher';
import { useLanguage } from '../contexts/LanguageContext';

const examples = [
  { id: 'ex1', f1: (x) => Math.abs(x + 2), f2: (x) => 2 * (3 - x), labelF1: 'f(x) = |x + 2|', labelF2: 'g(x) = 2(3 - x)' },
  { id: 'ex2', f1: (x) => Math.abs(3*x - 2), f2: (x) => 10 - x, labelF1: 'f(x) = |3x - 2|', labelF2: 'g(x) = 10 - x' },
  { id: 'ex3', f1: (x) => Math.abs(5*x - 4), f2: (x) => 4 - 5*x, labelF1: 'f(x) = |5x - 4|', labelF2: 'g(x) = 4 - 5x' },
  { id: 'ex4', f1: (x) => Math.abs(2*x - 3), f2: (x) => 3 - 2*x, labelF1: 'f(x) = |2x - 3|', labelF2: 'g(x) = 3 - 2x' },
];

function T53Page() {
  const { t } = useLanguage();
  const [activeExample, setActiveExample] = useState(examples[0]);

  return (
    <div>
      <h2 className="page-title">{t('t53_title')}</h2>
      <div className="page-section">
        <p className="problem-statement">
          <strong className="section-label">{t('problem_label')}</strong> {t('t53_problem')}
        </p>
         <p className="visualization-description">
          <strong className="section-label">{t('viz_label')}</strong> {t('t53_viz')}
        </p>
      </div>

       <div className="button-group">
        <strong className="section-label">{t('t53_select_example')}:</strong>
        {examples.map((ex, index) => (
          <button 
            key={ex.id} 
            onClick={() => setActiveExample(ex)}
            className={`example-button ${activeExample.id === ex.id ? 'active' : ''}`}
          >
            {`${t('t53_example_n', {n: index+1})}: ${ex.labelF1.replace('f(x) = ','')}`}
          </button>
        ))}
      </div>

      <div className="visualization-container" style={{ marginTop: '1rem' }}>
        <FunctionGrapher 
          f1={activeExample.f1} 
          f2={activeExample.f2}
          labelF1={activeExample.labelF1}
          labelF2={activeExample.labelF2}
        />
      </div>
    </div>
  );
}

export default T53Page;