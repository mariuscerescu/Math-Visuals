import React, { useCallback } from 'react';
import P5Canvas from './P5Canvas';

function TwelveCircles() {
  const sketch = useCallback((p) => {
    let circles = [];
    const scale = 45; // Global scale factor for the whole drawing

    // Calculate radii based on geometric tangency constraints
    // Let r0 = 1 (unit radius for the central circle)
    const r0 = 1;
    const sin_pi_5 = p.sin(p.PI / 5);
    const cos_pi_5 = p.cos(p.PI / 5);

    // r1 is the radius of the 5 circles in the inner ring
    const r1 = (r0 * sin_pi_5) / (1 - sin_pi_5);
    // R1 is the distance of inner ring centers from the origin
    const R1 = r0 + r1;

    // Based on the geometry, we can solve for r2 (outer ring radius)
    // The equation is A*r2^2 + B*r2 + C = 0
    const A = (cos_pi_5 / sin_pi_5) ** 2;
    const B = -2 * (r1 + R1 * (cos_pi_5 / sin_pi_5));
    const C = R1 * R1 - r1 * r1;
    const D = B * B - 4 * A * C;
    const sqrtD = p.sqrt(D);
    // Choose the larger positive root for r2
    const r2 = (-B + sqrtD) / (2 * A);
    const R2 = r2 / sin_pi_5;

    // The 12th "circle" radius (exterior)
    const r_ext = R2 + r2;

    // Determine dynamic scale so the figure fits in the canvas
    let scaleFactor;
    p.setup = () => {
      const CANVAS_SIZE = 500;
      p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
      const padding = 20;
      scaleFactor = (CANVAS_SIZE / 2 - padding) / r_ext;
      const center = p.createVector(p.width / 2, p.height / 2);

      // 1. Central circle
      circles.push({ id: 0, pos: center, r: r0 * scaleFactor, neighbors: [1, 2, 3, 4, 5] });

      // 2. Inner ring of 5 circles
      for (let i = 0; i < 5; i++) {
        const angle = p.TWO_PI * i / 5 - p.HALF_PI;
        const pos = p.createVector(center.x + (R1 * scaleFactor) * p.cos(angle), center.y + (R1 * scaleFactor) * p.sin(angle));
        const neighbors = [0, ((i + 4) % 5) + 1, ((i + 1) % 5) + 1, i + 6, ((i + 4) % 5) + 6];
        circles.push({ id: i + 1, pos, r: r1 * scaleFactor, neighbors });
      }

      // 3. Outer ring of 5 circles
      for (let i = 0; i < 5; i++) {
        const angle = p.TWO_PI * i / 5 - p.HALF_PI + p.PI / 5;
        const pos = p.createVector(center.x + (R2 * scaleFactor) * p.cos(angle), center.y + (R2 * scaleFactor) * p.sin(angle));
        const neighbors = [i + 1, ((i + 1) % 5) + 1, ((i + 4) % 5) + 6, ((i + 1) % 5) + 6, 11];
        circles.push({ id: i + 6, pos, r: r2 * scaleFactor, neighbors });
      }

      // 4. Exterior circle (acts as a boundary)
      circles.push({ id: 11, pos: center, r: r_ext * scaleFactor, isExterior: true, neighbors: [6, 7, 8, 9, 10] });
    };

    p.draw = () => {
      p.background(255);

      let hoveredCircle = null;

      // Corrected hover detection: iterate backwards to check top-most circles first
      for (let i = circles.length - 2; i >= 0; i--) {
          const c = circles[i];
          if (p.dist(p.mouseX, p.mouseY, c.pos.x, c.pos.y) < c.r) {
              hoveredCircle = c;
              break;
          }
      }
      // Check for exterior hover only if no inner circle is hovered
      if (!hoveredCircle) {
          const isOutsideBigCircle = p.dist(p.mouseX, p.mouseY, circles[11].pos.x, circles[11].pos.y) > circles[11].r;
          const isInsideCanvas = p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height;
          if (isOutsideBigCircle && isInsideCanvas) {
              hoveredCircle = circles[11];
          }
      }

      // Draw all circles with corrected logic
      circles.forEach(c => {
          const isHovered = hoveredCircle && hoveredCircle.id === c.id;
          const isNeighbor = hoveredCircle && hoveredCircle.neighbors.includes(c.id);

          let fill_color = 255;
          let stroke_color = 0;
          let stroke_weight = 1.5;

          if (hoveredCircle) {
              if (isHovered) {
                  fill_color = '#FFD700'; // Gold
                  stroke_weight = 2;
              } else if (isNeighbor) {
                  fill_color = '#ADD8E6'; // Light Blue
              } else {
                  fill_color = 245; // Grey
                  stroke_color = 200;
                  stroke_weight = 1;
              }
          }

          p.stroke(stroke_color);
          p.strokeWeight(stroke_weight);

          // CRITICAL FIX: The exterior circle must never be filled.
          if (c.isExterior) {
              p.noFill();
          } else {
              p.fill(fill_color);
          }

          p.circle(c.pos.x, c.pos.y, c.r * 2);
      });
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <P5Canvas sketch={sketch} />
    </div>
  );
}

export default TwelveCircles; 