import React, { useState, useEffect } from 'react';

function ChickenSaleSolver() {
  const [n, setN] = useState(6);
  const [log, setLog] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const runSimulation = () => {
    const totalIncome = n * n;
    const tens = Math.floor(totalIncome / 10);
    const remainder = totalIncome % 10;
    
    let newLog = [`Venit total: ${n} pui × ${n} lei = ${totalIncome} lei.`];
    
    if (tens % 2 === 0) {
      newLog.push("❌ EROARE: Numărul de zeci este par. Conform problemei, fratele mai mic nu ar fi cel care primește restul. Încercați un 'n' care se termină în 4 sau 6 (ex: 4, 6, 14, 16...).");
      setLog(newLog);
      setIsFinished(false);
      return;
    }

    let elderBrother = 0;
    let youngerBrother = 0;
    let turn = 'elder';

    newLog.push("--- Începe împărțirea ---");

    for (let i = 0; i < tens; i++) {
      if (turn === 'elder') {
        elderBrother += 10;
        newLog.push(`Fratele Mare ia 10 lei. (Mare: ${elderBrother}, Mic: ${youngerBrother})`);
        turn = 'younger';
      } else {
        youngerBrother += 10;
        newLog.push(`Fratele Mic ia 10 lei. (Mare: ${elderBrother}, Mic: ${youngerBrother})`);
        turn = 'elder';
      }
    }

    newLog.push(`Au rămas ${remainder} lei.`);
    youngerBrother += remainder;
    newLog.push(`Fratele Mic ia restul de ${remainder} lei.`);
    newLog.push("--- Împărțire finalizată ---");
    newLog.push(`Rezultat final: Fratele Mare are ${elderBrother} lei, Fratele Mic are ${youngerBrother} lei.`);

    const difference = elderBrother - youngerBrother;
    const knifePrice = difference / 2;

    newLog.push("--- Calculul prețului cuțitului ---");
    newLog.push(`Diferența dintre ei este de ${difference} lei.`);
    newLog.push("Pentru a fi egal, Marele trebuie să-i dea Micului jumătate din diferență.");
    newLog.push(`Prețul cuțitului = ${difference} / 2 = ${knifePrice} lei.`);
    
    setLog(newLog);
    setIsFinished(true);
  };

  // Rulează simularea la încărcare sau când se schimbă n
  useEffect(() => {
    runSimulation();
  }, [n]);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h3>Logica problemei și simulatorul</h3>
      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="n-input" style={{ marginRight: '1rem' }}><strong>Numărul de pui 'n':</strong></label>
        <input
          id="n-input"
          type="number"
          value={n}
          onChange={(e) => setN(parseInt(e.target.value, 10) || 0)}
          style={{ padding: '0.5rem', fontSize: '1.2rem', width: '100px' }}
        />
         <span style={{ marginLeft: '1rem' }}>Venit total (n²): <strong>{n*n}</strong></span>
      </div>
      
      <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', minHeight: '300px' }}>
        <h4>Jurnal de împărțire:</h4>
        {log.map((entry, index) => (
          <p key={index} style={{ margin: '0.3rem 0', borderBottom: '1px solid #eee' }}>{entry}</p>
        ))}
      </div>
    </div>
  );
}

export default ChickenSaleSolver; 