import React from 'react';
import DistancesToSidesAndTangents from '../components/DistancesToSidesAndTangents';
import { useLanguage } from '../contexts/LanguageContext';

function TFig10Page() {
    const { t } = useLanguage();
  return (
    <div>
      <h2 className="page-title">{t('tfig10_title')}</h2>
      <div className="page-section">
        <p className="problem-statement">
          <strong className="section-label">{t('problem_label')}</strong> {t('tfig10_problem')}
        </p>
        <p className="visualization-description">
          <strong className="section-label">{t('viz_label')}</strong> {t('tfig10_viz')}
        </p>
      </div>

      <div className="visualization-container">
        <DistancesToSidesAndTangents />
      </div>
    </div>
  );
}

export default TFig10Page; 