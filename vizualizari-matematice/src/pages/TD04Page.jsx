import React from 'react';
import GeometricProgressionSolver from '../components/GeometricProgressionSolver';
import { useLanguage } from '../contexts/LanguageContext';

function TD04Page() {
  const { t } = useLanguage();
  return (
    <div>
      <h2 className="page-title">{t('td04_title')}</h2>
      <div className="page-section">
        <p className="problem-statement">
          <strong className="section-label">{t('problem_label')}</strong> {t('td04_problem')}
        </p>
        <p className="visualization-description">
          <strong className="section-label">{t('viz_label_interactive')}</strong> {t('td04_viz')}
        </p>
      </div>

      <div className="visualization-container">
        <GeometricProgressionSolver />
      </div>
    </div>
  );
}

export default TD04Page; 