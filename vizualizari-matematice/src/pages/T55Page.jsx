import React from 'react';
import NumberLogicSolver from '../components/NumberLogicSolver';
import { useLanguage } from '../contexts/LanguageContext';

function T55Page() {
  const { t } = useLanguage();
  return (
    <div>
      <h2 className="page-title">{t('t55_title')}</h2>
      <div className="page-section">
        <p className="problem-statement">
          <strong className="section-label">{t('problem_label')}</strong> {t('t55_problem')}
        </p>
        <p className="visualization-description">
          <strong className="section-label">{t('viz_label_interactive')}</strong> {t('t55_viz')}
        </p>
      </div>

      <div className="visualization-container">
        <NumberLogicSolver />
      </div>
    </div>
  );
}

export default T55Page; 