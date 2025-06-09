import React, { useState } from 'react';

// Hardcoded data for a valid configuration of 12 circles,
// where each is tangent to exactly 5 others. This is a stereographic
// projection of an icosahedron.
const fixedCircles = [
    // The outer circle (id 0) is treated as the "12th" circle.
    { id: 0, cx: 250, cy: 250, r: 240, neighbors: [1, 2, 3, 4, 5] }, 
    // Outer ring of circles - radius increased to close gaps
    { id: 1, cx: 250, cy: 90, r: 88, neighbors: [0, 2, 5, 6, 7] },
    { id: 2, cx: 394, cy: 185, r: 95, neighbors: [0, 1, 3, 7, 8] },
    { id: 3, cx: 341, cy: 360, r: 98, neighbors: [0, 2, 4, 8, 9] },
    { id: 4, cx: 159, cy: 360, r: 98, neighbors: [0, 3, 5, 9, 10] },
    { id: 5, cx: 106, cy: 185, r: 88, neighbors: [0, 1, 4, 6, 10] },
    // Inner ring of circles - radius increased to close gaps
    { id: 6, cx: 220, cy: 200, r: 38, neighbors: [1, 5, 7, 10, 11] },
    { id: 7, cx: 290, cy: 205, r: 38, neighbors: [1, 2, 6, 8, 11] },
    { id: 8, cx: 315, cy: 275, r: 38, neighbors: [2, 3, 7, 9, 11] },
    { id: 9, cx: 250, cy: 315, r: 38, neighbors: [3, 4, 8, 10, 11] },
    { id: 10, cx: 190, cy: 270, r: 38, neighbors: [4, 5, 6, 9, 11] },
    // Center circle - radius increased to close gaps
    { id: 11, cx: 250, cy: 250, r: 38, neighbors: [6, 7, 8, 9, 10] },
];

function KissingCirclesVisualizer() {
  const [hoveredId, setHoveredId] = useState(null);

  const getCircleStyle = (circle) => {
    if (hoveredId === null) {
      // Default style
      return { fill: 'white', stroke: 'black', strokeWidth: 1.5, transition: 'all 0.2s ease-in-out' };
    }
    if (hoveredId === circle.id) {
      // Style for the hovered circle
      return { fill: '#FFD700', stroke: 'black', strokeWidth: 2.5, transition: 'all 0.2s ease-in-out' }; // gold
    }
    const hoveredCircle = fixedCircles.find(c => c.id === hoveredId);
    if (hoveredCircle && hoveredCircle.neighbors.includes(circle.id)) {
      // Style for neighbors of the hovered circle
      return { fill: '#ADD8E6', stroke: '#00008B', strokeWidth: 2, transition: 'all 0.2s ease-in-out' }; // lightblue, darkblue
    }
    // Style for non-related circles
    return { fill: 'white', stroke: '#ccc', strokeWidth: 1, opacity: 0.5, transition: 'all 0.2s ease-in-out' };
  };

  const circlesToRender = fixedCircles.slice(1);

  return (
    <div style={{ textAlign: 'center' }}>
      <svg width={500} height={500} viewBox="0 0 500 500">
        <circle
            key={fixedCircles[0].id}
            cx={fixedCircles[0].cx}
            cy={fixedCircles[0].cy}
            r={fixedCircles[0].r}
            style={getCircleStyle(fixedCircles[0])}
            onMouseEnter={() => setHoveredId(fixedCircles[0].id)}
            onMouseLeave={() => setHoveredId(null)}
            fillOpacity="0" // Make the fill transparent so we can see other circles
        />
        {circlesToRender.map(circle => (
          <circle
            key={circle.id}
            cx={circle.cx}
            cy={circle.cy}
            r={circle.r}
            style={getCircleStyle(circle)}
            onMouseEnter={() => setHoveredId(circle.id)}
            onMouseLeave={() => setHoveredId(null)}
          />
        ))}
      </svg>
    </div>
  );
}

export default KissingCirclesVisualizer; 