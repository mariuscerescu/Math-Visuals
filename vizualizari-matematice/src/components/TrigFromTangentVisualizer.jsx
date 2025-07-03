// src/components/TrigFromTangentVisualizer.jsx

import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const width = 500;
const height = 500;
const origin = { x: width / 2, y: height / 2 };
const radius = 200; // Raza cercului în pixeli SVG

function TrigFromTangentVisualizer({ tangent }) {
  const { t } = useLanguage();
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // useMemo va recalcula punctele doar dacă tangenta se schimbă
  const points = useMemo(() => {
    const m = tangent;
    // x² + (mx)² = 1  => x²(1+m²) = 1 => x = ±1/sqrt(1+m²)
    // Aici, raza nu e 1, ci `radius`, deci x² + y² = radius²
    const cos_val = 1 / Math.sqrt(1 + m * m);
    const sin_val = m / Math.sqrt(1 + m * m);

    // Punctul 1 (cadranul unde cos > 0)
    const p1 = {
      cos: cos_val,
      sin: sin_val,
      svgX: origin.x + cos_val * radius,
      svgY: origin.y - sin_val * radius, // Y în SVG crește în jos
    };

    // Punctul 2 (cadranul unde cos < 0)
    const p2 = {
      cos: -cos_val,
      sin: -sin_val,
      svgX: origin.x - cos_val * radius,
      svgY: origin.y + sin_val * radius,
    };
    return [p1, p2];
  }, [tangent]);

  const activePoint = hoveredPoint ? (hoveredPoint === 1 ? points[0] : points[1]) : null;

  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontFamily: 'sans-serif' }}>
      <svg width={width} height={height} style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
        {/* Axe */}
        <line x1="0" y1={origin.y} x2={width} y2={origin.y} stroke="#e0e0e0" />
        <line x1={origin.x} y1="0" x2={origin.x} y2={height} stroke="#e0e0e0" />
        <text x={width - 20} y={origin.y - 5} fill="#aaa">cos</text>
        <text x={origin.x + 5} y={15} fill="#aaa">sin</text>
        
        {/* Cercul trigonometric */}
        <circle cx={origin.x} cy={origin.y} r={radius} fill="none" stroke="#aaa" />

        {/* Dreapta tangentei */}
        <line
          x1={points[0].svgX} y1={points[0].svgY}
          x2={points[1].svgX} y2={points[1].svgY}
          stroke="tomato" strokeWidth="2" strokeDasharray="5 3"
        />

        {/* Punctele de intersecție */}
        {points.map((p, index) => (
          <circle
            key={index}
            cx={p.svgX} cy={p.svgY} r="8" fill="royalblue"
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredPoint(index + 1)}
            onMouseLeave={() => setHoveredPoint(null)}
          />
        ))}

        {/* Afișaj interactiv la hover */}
        {activePoint && (
          <g>
            {/* Linii de proiecție pentru cos și sin */}
            <line 
              x1={activePoint.svgX} y1={activePoint.svgY} 
              x2={activePoint.svgX} y2={origin.y} 
              stroke="royalblue" strokeWidth="1" strokeDasharray="4 2" 
            />
            <line 
              x1={activePoint.svgX} y1={activePoint.svgY} 
              x2={origin.x} y2={activePoint.svgY}
              stroke="crimson" strokeWidth="1" strokeDasharray="4 2" 
            />
            
            <polygon
              points={`${origin.x},${origin.y} ${activePoint.svgX},${origin.y} ${activePoint.svgX},${activePoint.svgY}`}
              fill="rgba(100, 149, 237, 0.2)"
              stroke="royalblue"
              strokeWidth="1"
            />
            <line x1={origin.x} y1={origin.y} x2={activePoint.svgX} y2={activePoint.svgY} stroke="royalblue" strokeWidth="2" />
            <circle cx={activePoint.svgX} cy={activePoint.svgY} r="10" fill="none" stroke="gold" strokeWidth="3" />
            
            {/* Etichete pentru valorile cos și sin */}
            <text 
              x={activePoint.svgX} 
              y={activePoint.sin > 0 ? origin.y + 20 : origin.y - 15} 
              fill="royalblue" 
              textAnchor="middle"
              style={{ fontSize: '16px', fontWeight: 'bold' }}
            >
              cos(α) = {activePoint.cos.toFixed(4)}
            </text>
            <text 
              x={origin.x + 10} 
              y={activePoint.svgY + (activePoint.sin > 0 ? -5 : 22)}
              fill="crimson"
              style={{ fontSize: '16px', fontWeight: 'bold' }}
            >
              sin(α) = {activePoint.sin.toFixed(4)}
            </text>
          </g>
        )}
      </svg>
      
      <div style={{ width: '250px' }}>
        <h3>{t('t47_solutions_title')}</h3>
        <p>{t('t47_solutions_intro')} <strong>tan(α) = {tangent.toFixed(3)}</strong>, {t('t47_solutions_exist')}</p>
        <div 
          onMouseEnter={() => setHoveredPoint(2)} onMouseLeave={() => setHoveredPoint(null)}
          style={{padding: '0.5rem', borderRadius: '4px', background: hoveredPoint === 2 ? '#eaf6ff' : 'transparent', transition: 'background 0.3s'}}
        >
          <strong>{t('t47_solution1')}</strong>
          <p>sin(α) = {points[1].sin.toFixed(4)}</p>
          <p>cos(α) = {points[1].cos.toFixed(4)}</p>
        </div>
        <div
          onMouseEnter={() => setHoveredPoint(1)} onMouseLeave={() => setHoveredPoint(null)}
          style={{padding: '0.5rem', borderRadius: '4px', background: hoveredPoint === 1 ? '#eaf6ff' : 'transparent', transition: 'background 0.3s'}}
        >
          <strong>{t('t47_solution2')}</strong>
          <p>sin(α) = {points[0].sin.toFixed(4)}</p>
          <p>cos(α) = {points[0].cos.toFixed(4)}</p>
        </div>
      </div>
    </div>
  );
}

export default TrigFromTangentVisualizer;