// src/components/InequalityGrapher.jsx

import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

// Configurarea spațiului de vizualizare
const width = 450;
const height = 300;
const aMin = -2.5, aMax = 2.5;
const yMin = -5, yMax = 50;

// Funcție de transformare: convertește coordonatele (a, y) în coordonate SVG
const toSvgCoords = (a, y) => {
  const svgX = (a - aMin) / (aMax - aMin) * width;
  const svgY = (yMax - y) / (yMax - yMin) * height;
  return { x: svgX, y: svgY };
};

// Definirea funcțiilor
const f_lhs = (a) => (1 + a + a**2 + a**3)**2; // Left-hand side
const g_rhs = (a) => 4 * (1 + a**2 + a**4 + a**6); // Right-hand side

function InequalityGrapher() {
  const { t } = useLanguage();
  const [currentA, setCurrentA] = useState(1.5);

  // Generarea punctelor pentru grafice
  const pointsLHS = [];
  const pointsRHS = [];
  for (let a = aMin; a <= aMax; a += 0.05) {
    pointsLHS.push(toSvgCoords(a, f_lhs(a)));
    pointsRHS.push(toSvgCoords(a, g_rhs(a)));
  }
  const polylineLHS = pointsLHS.map(p => `${p.x},${p.y}`).join(' ');
  const polylineRHS = pointsRHS.map(p => `${p.x},${p.y}`).join(' ');

  // Calcule pentru punctul curent de pe slider
  const val_lhs = f_lhs(currentA);
  const val_rhs = g_rhs(currentA);
  const point_lhs_svg = toSvgCoords(currentA, val_lhs);
  const point_rhs_svg = toSvgCoords(currentA, val_rhs);
  const slider_x_svg = toSvgCoords(currentA, 0).x;

  const originCoords = toSvgCoords(0, 0);

  return (
    <div style={{ fontFamily: 'sans-serif', width: `${width}px` }}>
      <svg width={width} height={height} style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
        {/* Axe */}
        <line x1="0" y1={originCoords.y} x2={width} y2={originCoords.y} stroke="#e0e0e0" />
        <line x1={originCoords.x} y1="0" x2={originCoords.x} y2={height} stroke="#e0e0e0" />
        <text x={width - 20} y={originCoords.y - 5} fill="#aaa">a</text>
        
        {/* Graficul funcției din stânga (LHS) */}
        <polyline points={polylineLHS} fill="none" stroke="royalblue" strokeWidth="3" />

        {/* Graficul funcției din dreapta (RHS) */}
        <polyline points={polylineRHS} fill="none" stroke="tomato" strokeWidth="3" />
        
        {/* Linia verticală de la slider */}
        <line
          x1={slider_x_svg} y1="0" x2={slider_x_svg} y2={height}
          stroke="#aaa" strokeDasharray="4 2"
        />

        {/* Punctele de pe grafice */}
        <circle cx={point_lhs_svg.x} cy={point_lhs_svg.y} r="6" fill="royalblue" />
        <circle cx={point_rhs_svg.x} cy={point_rhs_svg.y} r="6" fill="tomato" />
      </svg>
      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="a-slider">{t('t59_slider_label')} {currentA.toFixed(2)}</label>
        <input
          type="range" id="a-slider"
          min={aMin} max={aMax} step="0.01"
          value={currentA}
          onChange={(e) => setCurrentA(parseFloat(e.target.value))}
          style={{ width: '100%', marginTop: '0.5rem' }}
        />
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-around', fontWeight: 'bold' }}>
        <div style={{ color: 'royalblue' }}>
          <p>f(a) = (1+a+a²+a³)²</p>
          <p style={{ fontSize: '1.5rem' }}>{val_lhs.toFixed(2)}</p>
        </div>
        <div style={{ fontSize: '2rem', alignSelf: 'center', color: val_lhs <= val_rhs + 1e-6 ? 'green' : 'red' }}>
          ≤
        </div>
        <div style={{ color: 'tomato' }}>
          <p>g(a) = 4(1+a²+a⁴+a⁶)</p>
          <p style={{ fontSize: '1.5rem' }}>{val_rhs.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default InequalityGrapher; 