import React from 'react';
import KissingCirclesVisualizer from '../components/KissingCirclesVisualizer';
import { useLanguage } from '../contexts/LanguageContext';

function TFig07Page() {
    const { t } = useLanguage();
  return (
    <div>
      <h2>{t('tfig07_title')}</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>{t('problem_label')}</strong> {t('tfig07_problem')}
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>{t('viz_label')}</strong> {t('tfig07_viz')}
      </p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px', display: 'flex', justifyContent: 'center' }}>
        <KissingCirclesVisualizer />
      </div>
    </div>
  );
}

export default TFig07Page; 