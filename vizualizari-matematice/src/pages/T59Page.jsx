import React from 'react';
import InequalityGrapher from '../components/InequalityGrapher';
import { useLanguage } from '../contexts/LanguageContext';

function T59Page() {
  const { t } = useLanguage();
  return (
    <div>
      <h2>{t('t59_title')}</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>{t('problem_label')}</strong> 
        <code> {t('t59_problem')}</code>
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>{t('viz_label')}</strong> {t('t59_viz')}
      </p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <InequalityGrapher />
      </div>
    </div>
  );
}

export default T59Page; 