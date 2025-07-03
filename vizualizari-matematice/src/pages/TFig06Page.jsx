import React from 'react';
import InscribedSquaresVisualizer from '../components/InscribedSquaresVisualizer';
import { useLanguage } from '../contexts/LanguageContext';

function TFig06Page() {
  const { t } = useLanguage();
  return (
    <div>
      <h2 className="page-title">{t('tfig06_title')}</h2>
      <div className="page-section">
        <p className="problem-statement">
          <strong className="section-label">{t('problem_label')}</strong> {t('tfig06_problem')}
        </p>
        <p className="visualization-description">
          <strong className="section-label">{t('viz_label')}</strong> {t('tfig06_viz')}
        </p>
      </div>

      <div className="visualization-container">
        <InscribedSquaresVisualizer />
      </div>
    </div>
  );
}

export default TFig06Page; 