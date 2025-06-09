import React from 'react';
import GeometricProgressionSolver from '../components/GeometricProgressionSolver';
import { useLanguage } from '../contexts/LanguageContext';

function TD04Page() {
  const { t } = useLanguage();
  return (
    <div>
      <h2>{t('td04_title')}</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>{t('problem_label')}</strong> {t('td04_problem')}
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>{t('viz_label_interactive')}</strong> {t('td04_viz')}
      </p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <GeometricProgressionSolver />
      </div>
    </div>
  );
}

export default TD04Page; 