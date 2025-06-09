// src/components/P5Canvas.jsx

import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

/**
 * O componentă React care servește drept container pentru un sketch p5.js.
 * @param {{ sketch: (p: p5) => void }} props - Primește o funcție 'sketch' ca prop.
 */
function P5Canvas({ sketch }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // La montarea componentei, creăm o nouă instanță p5.js
    // și îi spunem să deseneze în elementul nostru de referință.
    const p5Instance = new p5(sketch, canvasRef.current);

    // La demontarea componentei, trebuie să curățăm instanța p5.js
    // pentru a preveni scurgerile de memorie.
    return () => {
      p5Instance.remove();
    };
  }, [sketch]); // Re-rulează efectul dacă funcția sketch se schimbă

  return <div ref={canvasRef} />;
}

export default P5Canvas;