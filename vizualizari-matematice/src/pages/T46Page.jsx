// src/pages/T46Page.jsx
import React from 'react';
import TriangleAltitudes from '../components/TriangleAltitudes';
import { useLanguage } from '../contexts/LanguageContext';

function T46Page() {
  const { t } = useLanguage();
  return (
    <div>
      <h2 className="page-title">{t('t46_title')}</h2>
      <div className="page-section">
        <p className="problem-statement">
          <strong className="section-label">{t('problem_label')}</strong> {t('t46_problem')}
        </p>
        <p className="visualization-description">
          <strong className="section-label">{t('viz_label')}</strong> {t('t46_viz')}
        </p>
      </div>
      
      <div className="visualization-container">
        <TriangleAltitudes />
      </div>
    </div>
  );
}

export default T46Page;