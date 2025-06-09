import React from 'react';
import InscribedSquaresVisualizer from '../components/InscribedSquaresVisualizer';
import { useLanguage } from '../contexts/LanguageContext';

function TFig06Page() {
  const { t } = useLanguage();
  return (
    <div>
      <h2>{t('tfig06_title')}</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>{t('problem_label')}</strong> {t('tfig06_problem')}
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>{t('viz_label')}</strong> {t('tfig06_viz')}
      </p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <InscribedSquaresVisualizer />
      </div>
    </div>
  );
}

export default TFig06Page; 