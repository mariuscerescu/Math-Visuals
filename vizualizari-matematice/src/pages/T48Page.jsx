import VectorCosineVisualizer from '../components/VectorCosineVisualizer';

function T48Page() {
  return (
    <div>
      <h2>Card T48: Cosinusul unghiului dintre vectori</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>Problemă:</strong> Găsiți cosinusul unghiului dintre vectorii <strong>a</strong> și <strong>b</strong>. Formula utilizată este 
        <code> cos(θ) = (a · b) / (|a| * |b|)</code>.
        Mai jos este o vizualizare interactivă pentru unul dintre exemple.
      </p>
      
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <p><strong>Exemplul 1:</strong> a = (1, 2), b = (-2, 1)</p>
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