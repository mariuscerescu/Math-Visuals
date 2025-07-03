import React from 'react';
import PtolemyTheoremVisualizer from '../components/PtolemyTheoremVisualizer';
import { useLanguage } from '../contexts/LanguageContext';

function TFig01Page() {
  const { t } = useLanguage();

  return (
    <div>
      <h2 className="page-title">{t('tfig01_title')}</h2>
      <div className="page-section">
        <p className="problem-statement">
          <strong className="section-label">{t('problem_label')}</strong> {t('tfig01_problem')}
        </p>
        <p className="visualization-description">
          <em>{t('tfig01_note')}</em>
        </p>
        <p className="visualization-description">
          <strong className="section-label">{t('viz_label')}</strong> {t('tfig01_viz')}
        </p>
      </div>

      <div className="visualization-container" style={{display: 'flex', justifyContent: 'center'}}>
        <PtolemyTheoremVisualizer />
      </div>
    </div>
  );
}

export default TFig01Page; 