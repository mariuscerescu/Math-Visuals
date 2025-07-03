import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// Dimensiunile spațiului nostru de vizualizare
const width = 500;
const height = 500;
const origin = { x: width / 2, y: height / 2 }; // Centrul SVG-ului
const scale = 50; // Factorul de scalare pentru a face vectorii vizibili

function VectorCosineVisualizer({ vectorA, vectorB }) {
  const { t } = useLanguage();

  const [internalA, setInternalA] = useState(vectorA);
  const [internalB, setInternalB] = useState(vectorB);
  const [draggingVector, setDraggingVector] = useState(null);

  useEffect(() => {
    setInternalA(vectorA);
    setInternalB(vectorB);
  }, [vectorA, vectorB]);

  const scaledA = { x: internalA.x * scale, y: -internalA.y * scale };
  const scaledB = { x: internalB.x * scale, y: -internalB.y * scale };
  
  const dotProduct = internalA.x * internalB.x + internalA.y * internalB.y;
  const magnitudeA = Math.sqrt(internalA.x ** 2 + internalA.y ** 2);
  const magnitudeB = Math.sqrt(internalB.x ** 2 + internalB.y ** 2);

  const cosTheta = (magnitudeA > 0 && magnitudeB > 0)
    ? dotProduct / (magnitudeA * magnitudeB)
    : 0;

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
    
    const mathX = (mouseX - origin.x) / scale;
    const mathY = -(mouseY - origin.y) / scale;

    if (draggingVector === 'A') {
      setInternalA({ x: mathX, y: mathY });
    } else if (draggingVector === 'B') {
      setInternalB({ x: mathX, y: mathY });
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontFamily: 'sans-serif' }}>
      {/* Zona de vizualizare SVG */}
      <svg
        width={width}
        height={height}
        style={{ border: '1px solid #ccc', borderRadius: '8px', cursor: draggingVector ? 'grabbing' : 'grab' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <g transform={`translate(${origin.x}, ${origin.y})`}>
          {/* Axe */}
          <line x1={-width / 2} y1="0" x2={width / 2} y2="0" stroke="#e0e0e0" />
          <line x1="0" y1={-height / 2} x2="0" y2={height / 2} stroke="#e0e0e0" />

          {/* Vector a */}
          <line x1="0" y1="0" x2={scaledA.x} y2={scaledA.y} stroke="royalblue" strokeWidth="3" />
          <circle cx={scaledA.x} cy={scaledA.y} r="8" fill="royalblue" onMouseDown={() => handleMouseDown('A')} />
          <text x={scaledA.x + 10} y={scaledA.y + 5} fill="black" fontSize="16">a</text>

          {/* Vector b */}
          <line x1="0" y1="0" x2={scaledB.x} y2={scaledB.y} stroke="tomato" strokeWidth="3" />
          <circle cx={scaledB.x} cy={scaledB.y} r="8" fill="tomato" onMouseDown={() => handleMouseDown('B')} />
          <text x={scaledB.x + 10} y={scaledB.y + 5} fill="black" fontSize="16">b</text>
        </g>
      </svg>
      
      {/* Zona de afișare a datelor */}
      <div style={{ width: '250px' }}>
        <h3>{t('t48_realtime_calc')}</h3>
        <p>Vector <strong>a</strong>: ({internalA.x.toFixed(2)}, {internalA.y.toFixed(2)})</p>
        <p>Vector <strong>b</strong>: ({internalB.x.toFixed(2)}, {internalB.y.toFixed(2)})</p>
        <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
        <p>{t('t48_dot_product')}: {dotProduct.toFixed(2)}</p>
        <p>|a|: {magnitudeA.toFixed(2)}</p>
        <p>|b|: {magnitudeB.toFixed(2)}</p>
        <h4 style={{ marginTop: '1rem' }}>cos(θ) = {cosTheta.toFixed(4)}</h4>
      </div>
    </div>
  );
}

export default VectorCosineVisualizer;