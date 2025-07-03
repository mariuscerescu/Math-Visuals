import React from 'react';
import InequalityGrapher from '../components/InequalityGrapher';
import { useLanguage } from '../contexts/LanguageContext';

function T59Page() {
  const { t } = useLanguage();
  return (
    <div>
      <h2 className="page-title">{t('t59_title')}</h2>
      <div className="page-section">
        <p className="problem-statement">
          <strong className="section-label">{t('problem_label')}</strong>
          {' '}
          {t('t59_problem')}
        </p>
        <p className="visualization-description">
          <strong className="section-label">{t('viz_label')}</strong> {t('t59_viz')}
        </p>
      </div>

      <div className="visualization-container">
        <InequalityGrapher />
      </div>
    </div>
  );
}

export default T59Page; 