// src/components/FunctionGrapher.jsx

import React from 'react';

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

// Componenta principală
function FunctionGrapher() {
  // Definirea funcțiilor din ecuație: |x + 2| = 2(3 - x)
  const f1 = (x) => Math.abs(x + 2); // Partea stângă
  const f2 = (x) => 2 * (3 - x);      // Partea dreaptă

  // Generarea punctelor pentru grafice
  const pointsF1 = [];
  const pointsF2 = [];
  for (let x = xMin; x <= xMax; x += 0.1) {
    pointsF1.push(toSvgCoords(x, f1(x)));
    pointsF2.push(toSvgCoords(x, f2(x)));
  }

  // Convertim array-urile de puncte în string-uri pentru atributul 'points' al polyline
  const polylinePointsF1 = pointsF1.map(p => `${p.x},${p.y}`).join(' ');
  const polylinePointsF2 = pointsF2.map(p => `${p.x},${p.y}`).join(' ');

  // Calculul soluției (rezolvare algebrică)
  // Cazul 1: x + 2 = 6 - 2x  => 3x = 4  => x = 4/3
  // Verificare: 4/3 + 2 > 0 (Adevărat)
  const solutionX = 4 / 3;
  const solutionY = f1(solutionX); // Sau f2(solutionX), rezultatul e același
  const solutionSvgCoords = toSvgCoords(solutionX, solutionY);

  // Coordonatele originii pentru axe
  const originCoords = toSvgCoords(0, 0);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <svg width={width} height={height} style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
        {/* Axe */}
        <line x1="0" y1={originCoords.y} x2={width} y2={originCoords.y} stroke="#e0e0e0" />
        <line x1={originCoords.x} y1="0" x2={originCoords.x} y2={height} stroke="#e0e0e0" />

        {/* Graficul funcției 1: |x + 2| */}
        <polyline points={polylinePointsF1} fill="none" stroke="royalblue" strokeWidth="3" />

        {/* Graficul funcției 2: 2(3 - x) */}
        <polyline points={polylinePointsF2} fill="none" stroke="tomato" strokeWidth="3" />

        {/* Punctul de intersecție */}
        <circle cx={solutionSvgCoords.x} cy={solutionSvgCoords.y} r="6" fill="green" />
        
        {/* Linii punctate către axe */}
        <line
          x1={solutionSvgCoords.x}
          y1={solutionSvgCoords.y}
          x2={solutionSvgCoords.x}
          y2={originCoords.y}
          stroke="green"
          strokeDasharray="4 2"
        />
        <line
          x1={solutionSvgCoords.x}
          y1={solutionSvgCoords.y}
          x2={originCoords.x}
          y2={solutionSvgCoords.y}
          stroke="green"
          strokeDasharray="4 2"
        />
      </svg>
      <div style={{ marginTop: '1rem' }}>
        <p><span style={{ color: 'royalblue' }}><strong>f(x) = |x + 2|</strong></span></p>
        <p><span style={{ color: 'tomato' }}><strong>g(x) = 2(3 - x)</strong></span></p>
        <p>
          <strong>Soluție:</strong> Punctul de intersecție are coordonata 
          <strong style={{ color: 'green' }}> x ≈ {solutionX.toFixed(2)}</strong>.
        </p>
      </div>
    </div>
  );
}

export default FunctionGrapher;