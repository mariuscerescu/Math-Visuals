import React from 'react';
import NumberLogicSolver from '../components/NumberLogicSolver';
import { useLanguage } from '../contexts/LanguageContext';

function T55Page() {
  const { t } = useLanguage();
  return (
    <div>
      <h2>{t('t55_title')}</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>{t('problem_label')}</strong> {t('t55_problem')}
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>{t('viz_label_interactive')}</strong> {t('t55_viz')}
      </p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <NumberLogicSolver />
      </div>
    </div>
  );
}

export default T55Page; 