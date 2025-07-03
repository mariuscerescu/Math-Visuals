// src/components/FunctionGrapher.jsx

import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// Configurarea spațiului de vizualizare
const width = 500;
const height = 400;
const xMin = -10, xMax = 10;
const yMin = -5, yMax = 15;

// Funcție de transformare: convertește coordonatele matematice în coordonate SVG
const toSvgCoords = (mathX, mathY) => {
  const svgX = (mathX - xMin) / (xMax - xMin) * width;
  const svgY = (yMax - mathY) / (yMax - yMin) * height;
  return { x: svgX, y: svgY };
};

const toMathX = (svgX) => {
  return (svgX / width) * (xMax - xMin) + xMin;
}

// Componenta principală
function FunctionGrapher({ f1, f2, labelF1, labelF2 }) {
  const { t } = useLanguage();
  const [hoverX, setHoverX] = useState(null);

  const handleMouseMove = (event) => {
    const svgRect = event.currentTarget.getBoundingClientRect();
    const svgX = event.clientX - svgRect.left;
    setHoverX(toMathX(svgX));
  };

  const handleMouseLeave = () => {
    setHoverX(null);
  };

  const pointsF1 = [];
  const pointsF2 = [];
  let intersections = [];

  for (let x = xMin; x <= xMax; x += 0.1) {
    const y1 = f1(x);
    const y2 = f2(x);
    pointsF1.push(toSvgCoords(x, y1));
    pointsF2.push(toSvgCoords(x, y2));
    
    if (Math.abs(y1 - y2) < 0.1) {
      const isNewIntersection = intersections.every(p => Math.abs(p.x - x) > 0.5);
      if (isNewIntersection) {
        intersections.push({ x, y: y1 });
      }
    }
  }

  const polylinePointsF1 = pointsF1.map(p => `${p.x},${p.y}`).join(' ');
  const polylinePointsF2 = pointsF2.map(p => `${p.x},${p.y}`).join(' ');

  const originCoords = toSvgCoords(0, 0);

  const hoverY1 = hoverX ? f1(hoverX) : null;
  const hoverY2 = hoverX ? f2(hoverX) : null;
  const hoverSvgP1 = hoverX ? toSvgCoords(hoverX, hoverY1) : null;
  const hoverSvgP2 = hoverX ? toSvgCoords(hoverX, hoverY2) : null;

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <svg 
        width={width} height={height} 
        style={{ border: '1px solid #ccc', borderRadius: '8px', cursor: 'crosshair' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Axe */}
        <line x1="0" y1={originCoords.y} x2={width} y2={originCoords.y} stroke="#e0e0e0" />
        <line x1={originCoords.x} y1="0" x2={originCoords.x} y2={height} stroke="#e0e0e0" />

        {/* Graficul funcției 1: |x + 2| */}
        <polyline points={polylinePointsF1} fill="none" stroke="royalblue" strokeWidth="3" />

        {/* Graficul funcției 2: 2(3 - x) */}
        <polyline points={polylinePointsF2} fill="none" stroke="tomato" strokeWidth="3" />

        {intersections.map((sol, index) => {
          const svgCoords = toSvgCoords(sol.x, sol.y);
          return (
            <g key={index}>
              <circle cx={svgCoords.x} cy={svgCoords.y} r="6" fill="green" />
              <line
                x1={svgCoords.x} y1={svgCoords.y}
                x2={svgCoords.x} y2={originCoords.y}
                stroke="green" strokeDasharray="4 2"
              />
              <line
                x1={svgCoords.x} y1={svgCoords.y}
                x2={originCoords.x} y2={svgCoords.y}
                stroke="green" strokeDasharray="4 2"
              />
            </g>
          )
        })}

        {hoverX !== null && (
          <g>
            <line x1={hoverSvgP1.x} y1="0" x2={hoverSvgP1.x} y2={height} stroke="#aaa" strokeDasharray="3 3" />
            
            <circle cx={hoverSvgP1.x} cy={hoverSvgP1.y} r="5" fill="royalblue" stroke="white" strokeWidth="1" />
            <circle cx={hoverSvgP2.x} cy={hoverSvgP2.y} r="5" fill="tomato" stroke="white" strokeWidth="1" />
            
            <text x={hoverSvgP1.x + 8} y={hoverSvgP1.y - 8} fill="black" fontSize="14" style={{pointerEvents: 'none'}}>{t('t53_fx_value', { value: hoverY1.toFixed(2) })}</text>
            <text x={hoverSvgP2.x + 8} y={hoverSvgP2.y + 16} fill="black" fontSize="14" style={{pointerEvents: 'none'}}>{t('t53_gx_value', { value: hoverY2.toFixed(2) })}</text>
            <text x={hoverSvgP1.x + 8} y={height - 10} fill="#555" fontSize="14" style={{pointerEvents: 'none'}}>{t('t53_x_value', { value: hoverX.toFixed(2) })}</text>
          </g>
        )}
      </svg>
      <div style={{ marginTop: '1rem' }}>
        <p><span style={{ color: 'royalblue' }}><strong>{labelF1}</strong></span></p>
        <p><span style={{ color: 'tomato' }}><strong>{labelF2}</strong></span></p>
        {intersections.length > 0 ? (
          <p>
            <strong>{t('t53_solution', { count: intersections.length })}:</strong>
            {intersections.map((sol, index) => (
              <span key={index} style={{ color: 'green', marginLeft: '0.5rem' }}>
                <strong>x ≈ {sol.x.toFixed(2)}</strong>
                {index < intersections.length - 1 ? ',' : ''}
              </span>
            ))}
          </p>
        ) : (
          <p><strong>{t('t53_no_solution')}</strong></p>
        )}
      </div>
    </div>
  );
}

export default FunctionGrapher;