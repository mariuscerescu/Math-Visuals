import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function ChickenSaleSolver() {
  const { t } = useLanguage();
  const [n, setN] = useState(6);
  const [log, setLog] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const runSimulation = () => {
    const totalIncome = n * n;
    const tens = Math.floor(totalIncome / 10);
    const remainder = totalIncome % 10;
    
    let newLog = [`${t('td20_log_total_income')} ${n} ${t('td20_log_chickens')} × ${n} ${t('td20_log_currency')} = ${totalIncome} ${t('td20_log_currency')}.`];
    
    if (tens % 2 === 0) {
      newLog.push(`❌ ${t('td20_log_error_even_tens')}`);
      setLog(newLog);
      setIsFinished(false);
      return;
    }

    let elderBrother = 0;
    let youngerBrother = 0;
    let turn = 'elder';

    newLog.push(`--- ${t('td20_log_division_starts')} ---`);

    for (let i = 0; i < tens; i++) {
      if (turn === 'elder') {
        elderBrother += 10;
        newLog.push(`${t('td20_log_elder_takes')} (E: ${elderBrother}, Y: ${youngerBrother})`);
        turn = 'younger';
      } else {
        youngerBrother += 10;
        newLog.push(`${t('td20_log_younger_takes')} (E: ${elderBrother}, Y: ${youngerBrother})`);
        turn = 'elder';
      }
    }

    newLog.push(`${t('td20_log_remainder_is')} ${remainder} ${t('td20_log_currency')}.`);
    youngerBrother += remainder;
    newLog.push(`${t('td20_log_younger_takes_rest')} ${remainder} ${t('td20_log_currency')}.`);
    newLog.push(`--- ${t('td20_log_division_ends')} ---`);
    newLog.push(`${t('td20_log_final_result')} E: ${elderBrother}, Y: ${youngerBrother}.`);

    const difference = elderBrother - youngerBrother;
    const knifePrice = difference / 2;

    newLog.push(`--- ${t('td20_log_knife_price_calc')} ---`);
    newLog.push(`${t('td20_log_difference_is')} ${difference} ${t('td20_log_currency')}.`);
    newLog.push(`${t('td20_log_to_equalize')}`);
    newLog.push(`${t('td20_log_knife_price_is')} = ${difference} / 2 = ${knifePrice} ${t('td20_log_currency')}.`);
    
    setLog(newLog);
    setIsFinished(true);
  };

  useEffect(() => {
    runSimulation();
  }, [n, t]);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h3>{t('td20_solver_title')}</h3>
      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="n-input" style={{ marginRight: '1rem' }}><strong>{t('td20_n_label')}</strong></label>
        <input
          id="n-input"
          type="number"
          value={n}
          onChange={(e) => setN(parseInt(e.target.value, 10) || 0)}
          style={{ padding: '0.5rem', fontSize: '1.2rem', width: '100px' }}
        />
         <span style={{ marginLeft: '1rem' }}>{t('td20_total_income_label')} <strong>{n*n}</strong></span>
      </div>
      
      <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', minHeight: '300px' }}>
        <h4>{t('td20_log_title')}</h4>
        {log.map((entry, index) => (
          <p key={index} style={{ margin: '0.3rem 0', borderBottom: '1px solid #eee' }}>{entry}</p>
        ))}
      </div>
    </div>
  );
}

export default ChickenSaleSolver; 