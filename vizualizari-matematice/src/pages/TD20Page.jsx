import React from 'react';
import ChickenSaleSolver from '../components/ChickenSaleSolver';
import { useLanguage } from '../contexts/LanguageContext';

function TD20Page() {
  const { t } = useLanguage();
  return (
    <div>
      <h2 className="page-title">{t('td20_title')}</h2>
      <div className="page-section">
        <p className="problem-statement">
          <strong className="section-label">{t('problem_label')}</strong> {t('td20_problem')}
        </p>
        <p className="visualization-description">
          <strong className="section-label">{t('viz_label_interactive')}</strong> {t('td20_viz')}
        </p>
      </div>

      <div className="visualization-container">
        <ChickenSaleSolver />
      </div>
    </div>
  );
}

export default TD20Page; 