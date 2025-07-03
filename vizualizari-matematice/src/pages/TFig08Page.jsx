import React from 'react';
import CevaTheoremVisualizer from '../components/CevaTheoremVisualizer';
import { useLanguage } from '../contexts/LanguageContext';

function TFig08Page() {
    const { t } = useLanguage();
  return (
    <div>
      <h2 className="page-title">{t('tfig08_title')}</h2>
      <div className="page-section">
        <p className="problem-statement">
          <strong className="section-label">{t('problem_label')}</strong> {t('tfig08_problem')}
        </p>
        <p className="visualization-description">
          <strong className="section-label">{t('viz_label')}</strong> {t('tfig08_viz')}
        </p>
      </div>

      <div className="visualization-container">
        <CevaTheoremVisualizer />
      </div>
    </div>
  );
}

export default TFig08Page; 