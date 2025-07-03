import React, { useState } from 'react';
import VectorCosineVisualizer from '../components/VectorCosineVisualizer';
import { useLanguage } from '../contexts/LanguageContext';

const examples = [
  { id: 'ex1', a: { x: 1, y: 2 }, b: { x: -2, y: 1 }, label: 'a=(1,2), b=(-2,1)' },
  { id: 'ex2', a: { x: -3, y: 2 }, b: { x: 2, y: 3 }, label: 'a=(-3,2), b=(2,3)' },
  { id: 'ex3', a: { x: 4, y: 4 }, b: { x: -4, y: -4 }, label: 'a=(4,4), b=(-4,-4)' },
  { id: 'ex4', a: { x: -5, y: -5 }, b: { x: 5, y: 5 }, label: 'a=(-5,-5), b=(5,5)' }
];

function T48Page() {
  const { t } = useLanguage();
  const [activeExample, setActiveExample] = useState(examples[0]);

  return (
    <div>
      <h2 className="page-title">{t('t48_title')}</h2>
      <div className="page-section">
        <p className="problem-statement">
          <strong className="section-label">{t('problem_label')}</strong> {t('t48_problem')}
        </p>
        <p className="visualization-description">
          <strong className="section-label">{t('formula_label')}</strong> <code>cos(θ) = (a · b) / (|a| * |b|)</code>. {t('t48_viz')}
        </p>
      </div>

      <div className="button-group">
        <strong className="section-label">{t('t48_select_example')}:</strong>
        {examples.map((ex) => (
          <button 
            key={ex.id} 
            onClick={() => setActiveExample(ex)}
            className={`example-button ${activeExample.id === ex.id ? 'active' : ''}`}
          >
            {ex.label}
          </button>
        ))}
      </div>
      
      <div className="visualization-container">
        <VectorCosineVisualizer vectorA={activeExample.a} vectorB={activeExample.b} />
      </div>
    </div>
  );
}

export default T48Page;