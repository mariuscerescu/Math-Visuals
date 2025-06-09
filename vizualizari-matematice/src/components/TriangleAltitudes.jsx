// src/components/TriangleAltitudes.jsx

import React, { useRef } from 'react';
import p5 from 'p5';
import P5Canvas from './P5Canvas';

function TriangleAltitudes() {
  const sliderContainer = useRef(null);

  const sketch = (p) => {
    let vertices = [];
    let angleSlider;
    let draggingVertex = -1;

    /**
     * Găsește piciorul cevienei P_foot pe segmentul V1V2.
     * Unghiul vizat este <P, P_foot, V_anchor> = `targetAngle`.
     * Metoda: Căutare iterativă pe segment pentru a minimiza eroarea.
     */
    const findCevianFoot = (P, V1, V2, V_anchor, targetAngle) => {
      let bestPoint = V1.copy();
      let minError = Infinity;
      const numSteps = 100; // Suficientă precizie pentru vizualizare

      for (let i = 0; i <= numSteps; i++) {
        const t = i / numSteps;
        const currentPoint = p5.Vector.lerp(V1, V2, t);

        // Calculăm unghiul în punctul curent
        const v1 = p5.Vector.sub(P, currentPoint);
        const v2 = p5.Vector.sub(V_anchor, currentPoint);
        
        // Verificăm să nu fie vectori nuli
        if (v1.magSq() < 1e-6 || v2.magSq() < 1e-6) continue;

        const dot = v1.dot(v2);
        const magProduct = v1.mag() * v2.mag();
        const angleAtPoint = p.acos(p.constrain(dot / magProduct, -1, 1));

        const error = p.abs(angleAtPoint - targetAngle);

        if (error < minError) {
          minError = error;
          bestPoint = currentPoint;
        }
      }
      return bestPoint;
    };


    p.setup = () => {
      p.createCanvas(500, 450);
      vertices = [
        p.createVector(100, 350), // A
        p.createVector(400, 350), // B
        p.createVector(250, 100)  // C
      ];
      
      angleSlider = p.createSlider(45, 135, 90, 1);
      angleSlider.style('width', '150px');
      angleSlider.parent(sliderContainer.current);
    };

    p.draw = () => {
      p.background(248);
      const targetAngleRad = p.radians(angleSlider.value());

      if (p.mouseIsPressed) {
        if (draggingVertex === -1) {
          for (let i = 0; i < vertices.length; i++) {
            if (p.dist(p.mouseX, p.mouseY, vertices[i].x, vertices[i].y) < 15) {
              draggingVertex = i;
              break;
            }
          }
        }
        if (draggingVertex !== -1) {
          vertices[draggingVertex].x = p.constrain(p.mouseX, 0, p.width);
          vertices[draggingVertex].y = p.constrain(p.mouseY, 0, p.height);
        }
      } else {
        draggingVertex = -1;
      }

      const [A, B, C] = vertices;
      
      // unghiurile sunt ∠AA₁C, ∠BB₁A, ∠CC₁B
      const A1 = findCevianFoot(A, B, C, C, targetAngleRad);
      const B1 = findCevianFoot(B, C, A, A, targetAngleRad);
      const C1 = findCevianFoot(C, A, B, B, targetAngleRad);
      
      const isAltitude = Math.abs(angleSlider.value() - 90) < 1.5; // Toleranță mai mare

      // Desenarea
      p.stroke(0); p.strokeWeight(1); p.noFill();
      p.triangle(A.x, A.y, B.x, B.y, C.x, C.y);
      p.fill(0); p.noStroke();
      p.text('A', A.x - 15, A.y + 15);
      p.text('B', B.x + 5, B.y + 15);
      p.text('C', C.x, C.y - 10);

      p.strokeWeight(isAltitude ? 2.5 : 1.5);
      p.stroke(isAltitude ? 'green' : 'tomato');
      p.line(A.x, A.y, A1.x, A1.y);
      p.line(B.x, B.y, B1.x, B1.y);
      p.line(C.x, C.y, C1.x, C1.y);
      
      p.fill(isAltitude ? 'green' : 'tomato'); p.noStroke();
      p.ellipse(A1.x, A1.y, 7);
      p.ellipse(B1.x, B1.y, 7);
      p.ellipse(C1.x, C1.y, 7);
      
      p.fill(0);
      p.text('A1', A1.x + 5, A1.y + 15);
      p.text('B1', B1.x - 20, B1.y - 5);
      p.text('C1', C1.x + 5, C1.y - 5);
      
      p.fill('royalblue'); p.stroke(0); p.strokeWeight(1);
      for(let v of vertices) {
          p.ellipse(v.x, v.y, 12);
      }
      
      p.fill(0); p.noStroke(); p.textSize(16);
      p.text(`Unghiul comun: ${angleSlider.value()}°`, 10, 30);
      if(isAltitude) {
        p.fill('green');
        p.text('La 90°, cevienele sunt ÎNĂLȚIMI!', 10, 60);
      }
    };
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <P5Canvas sketch={sketch} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div ref={sliderContainer} />
        <p>Glisați pentru a schimba unghiul.</p>
      </div>
    </div>
  );
}

export default TriangleAltitudes;