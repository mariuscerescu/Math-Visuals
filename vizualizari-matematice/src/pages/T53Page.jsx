// src/pages/T53Page.jsx

import FunctionGrapher from '../components/FunctionGrapher';

function T53Page() {
  return (
    <div>
      <h2 className="page-title">Card T53: Ecuații cu modul</h2>
      <div className="page-section">
        <p className="problem-statement">
          <strong className="section-label">Problemă:</strong> Rezolvați ecuațiile. Abordarea vizuală constă în a desena graficele funcțiilor de pe ambele părți ale egalului și a găsi punctele lor de intersecție. Coordonata 'x' a intersecției este soluția ecuației.
        </p>
      </div>

      <div className="visualization-container">
        <p><strong className="section-label">Exemplul 1:</strong> |x + 2| = 2(3 - x)</p>
        <div style={{ marginTop: '1rem' }}>
          <FunctionGrapher />
        </div>
      </div>
    </div>
  );
}

export default T53Page;