import VectorCosineVisualizer from '../components/VectorCosineVisualizer';

function T48Page() {
  return (
    <div>
      <h2 className="page-title">Card T48: Cosinusul unghiului dintre vectori</h2>
      <div className="page-section">
        <p className="problem-statement">
          <strong className="section-label">Problemă:</strong> Găsiți cosinusul unghiului dintre vectorii <strong>a</strong> și <strong>b</strong>. Formula utilizată este 
          <code> cos(θ) = (a · b) / (|a| * |b|)</code>.
          Mai jos este o vizualizare interactivă pentru unul dintre exemple.
        </p>
      </div>
      
      <div className="visualization-container">
        <p><strong className="section-label">Exemplul 1:</strong> a = (1, 2), b = (-2, 1)</p>
        <VectorCosineVisualizer />
      </div>

      {/* 
        Pe viitor, am putea adăuga un alt vizualizator pentru exemplul 2 
        sau butoane pentru a schimba datele de intrare în vizualizatorul existent.
      */}
    </div>
  );
}

export default T48Page;