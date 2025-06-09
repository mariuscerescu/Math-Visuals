import React from 'react';
import SimsonTheoremVisualizer from '../components/SimsonTheoremVisualizer';
import { useLanguage } from '../contexts/LanguageContext';

function TFig10Page() {
    const { t } = useLanguage();
  return (
    <div>
      <h2>{t('tfig10_title')}</h2>
      <p style={{ maxWidth: '800px' }}>
        <strong>{t('problem_label')}</strong> {t('tfig10_problem')}
      </p>
       <p style={{ maxWidth: '800px' }}>
        <em>{t('tfig10_note')}</em>
      </p>
      <p style={{ maxWidth: '800px' }}>
        <strong>{t('viz_label')}</strong> {t('tfig10_viz')}
      </p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <SimsonTheoremVisualizer />
      </div>
    </div>
  );
}

export default TFig10Page; 