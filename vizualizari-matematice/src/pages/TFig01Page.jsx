import React from 'react';
import CircleMedianVisualizer from '../components/CircleMedianVisualizer';
import { useLanguage } from '../contexts/LanguageContext';

function TFig01Page() {
  const { t } = useLanguage();

  return (
    <div>
      <h2>{t('tfig01_title')}</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>{t('problem_label')}</strong> {t('tfig01_problem')}
      </p>
      <p style={{ maxWidth: '700px' }}>
        <em>{t('tfig01_note')}</em>
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>{t('viz_label')}</strong> {t('tfig01_viz')}
      </p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <CircleMedianVisualizer />
      </div>
    </div>
  );
}

export default TFig01Page; 