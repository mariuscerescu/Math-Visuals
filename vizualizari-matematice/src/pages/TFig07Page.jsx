import React from 'react';
import TwelveCircles from '../components/TwelveCircles';
import { useLanguage } from '../contexts/LanguageContext';

function TFig07Page() {
    const { t } = useLanguage();
  return (
    <div>
      <h2 className="page-title">{t('tfig07_title')}</h2>
      <div className="page-section">
        <p className="problem-statement">
          <strong className="section-label">{t('problem_label')}</strong> {t('tfig07_problem')}
        </p>
        <p className="visualization-description">
          <strong className="section-label">{t('viz_label')}</strong> {t('tfig07_viz')}
        </p>
      </div>

      <div className="visualization-container" style={{ display: 'flex', justifyContent: 'center' }}>
        <TwelveCircles />
      </div>
    </div>
  );
}

export default TFig07Page; 