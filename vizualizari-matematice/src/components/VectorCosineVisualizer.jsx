import React, { useState } from 'react';

// Dimensiunile spațiului nostru de vizualizare
const width = 500;
const height = 500;
const origin = { x: width / 2, y: height / 2 }; // Centrul SVG-ului
const scale = 50; // Factorul de scalare pentru a face vectorii vizibili

function VectorCosineVisualizer() {
  // Starea pentru coordonate și pentru interactivitate
  const [vectorA, setVectorA] = useState({ x: 1 * scale, y: -2 * scale });
  const [vectorB, setVectorB] = useState({ x: -2 * scale, y: -1 * scale });
  const [draggingVector, setDraggingVector] = useState(null); // 'A', 'B', sau null

  // --- Calcule ---
  const dotProduct = vectorA.x * vectorB.x + vectorA.y * vectorB.y;
  const magnitudeA = Math.sqrt(vectorA.x ** 2 + vectorA.y ** 2);
  const magnitudeB = Math.sqrt(vectorB.x ** 2 + vectorB.y ** 2);

  const cosTheta = (magnitudeA > 0 && magnitudeB > 0)
    ? dotProduct / (magnitudeA * magnitudeB)
    : 0;

  // --- Funcții pentru interactivitate ---
  const handleMouseDown = (vectorName) => {
    setDraggingVector(vectorName);
  };

  const handleMouseUp = () => {
    setDraggingVector(null);
  };

  const handleMouseMove = (event) => {
    if (!draggingVector) return;

    const svgRect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - svgRect.left;
    const mouseY = event.clientY - svgRect.top;

    const newX = mouseX - origin.x;
    const newY = mouseY - origin.y;

    if (draggingVector === 'A') {
      setVectorA({ x: newX, y: newY });
    } else if (draggingVector === 'B') {
      setVectorB({ x: newX, y: newY });
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontFamily: 'sans-serif' }}>
      {/* Zona de vizualizare SVG */}
      <svg
        width={width}
        height={height}
        style={{ border: '1px solid #ccc', borderRadius: '8px', cursor: draggingVector ? 'grabbing' : 'default' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <g transform={`translate(${origin.x}, ${origin.y})`}>
          {/* Axe */}
          <line x1={-width / 2} y1="0" x2={width / 2} y2="0" stroke="#e0e0e0" />
          <line x1="0" y1={-height / 2} x2="0" y2={height / 2} stroke="#e0e0e0" />

          {/* Vector a */}
          <line x1="0" y1="0" x2={vectorA.x} y2={vectorA.y} stroke="royalblue" strokeWidth="3" />
          <circle
            cx={vectorA.x}
            cy={vectorA.y}
            r="8"
            fill="royalblue"
            style={{ cursor: 'grab' }}
            onMouseDown={() => handleMouseDown('A')}
          />

          {/* Vector b */}
          <line x1="0" y1="0" x2={vectorB.x} y2={vectorB.y} stroke="tomato" strokeWidth="3" />
          <circle
            cx={vectorB.x}
            cy={vectorB.y}
            r="8"
            fill="tomato"
            style={{ cursor: 'grab' }}
            onMouseDown={() => handleMouseDown('B')}
          />
        </g>
      </svg>
      
      {/* Zona de afișare a datelor */}
      <div style={{ width: '250px' }}>
        <h3>Calcule în Timp Real</h3>
        <p>Vector <strong>a</strong>: ({(vectorA.x / scale).toFixed(1)}, {(-vectorA.y / scale).toFixed(1)})</p>
        <p>Vector <strong>b</strong>: ({(vectorB.x / scale).toFixed(1)}, {(-vectorB.y / scale).toFixed(1)})</p>
        <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
        <p>Produs scalar (a · b): {(dotProduct / (scale*scale)).toFixed(0)}</p>
        <p>|a|: {(magnitudeA / scale).toFixed(2)}</p>
        <p>|b|: {(magnitudeB / scale).toFixed(2)}</p>
        <h4 style={{ marginTop: '1rem' }}>cos(θ) = {cosTheta.toFixed(4)}</h4>
      </div>
    </div>
  );
}

export default VectorCosineVisualizer;