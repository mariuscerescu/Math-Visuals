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
     * Unghiul vizat este <P, P_foot, V_anchor> = `angle`.
     * Această versiune folosește o metodă algebrică robustă.
     */
    const findCevianFoot = (P, V1, V2, V_anchor, angle) => {
      // Setăm un sistem de coordonate local unde V_anchor este originea
      // și V1 este pe axa X a acestui sistem local.
      // Notă: pentru <AA1C>, ancora e C, deci V_anchor=C, iar B=V1, A=P.
      // Deci, vom lucra pe dreapta V_anchor -> V1.
      
      let local_x_axis = p5.Vector.sub(V1, V_anchor);
      let local_len = local_x_axis.mag();
      if (local_len < 0.1) return V1; // Evită împărțirea la zero
      local_x_axis.normalize();

      let local_y_axis = local_x_axis.copy().rotate(-p.HALF_PI);

      // Coordonatele lui P în sistemul local
      let P_vec = p5.Vector.sub(P, V_anchor);
      let P_local = p.createVector(P_vec.dot(local_x_axis), P_vec.dot(local_y_axis));

      // Punctul căutat P_foot se află pe axa X locală, la o distanță 'd' de origine.
      // P_foot_local = (d, 0)
      // Vectorul P_foot -> P in coordonate locale este (P_local.x - d, P_local.y)
      // Vectorul P_foot -> V_anchor in coordonate locale este (-d, 0)
      
      // Produsul scalar: v1.dot(v2) = |v1|*|v2|*cos(theta)
      // (-d) * (P_local.x - d) = sqrt(d^2) * sqrt((P_local.x-d)^2 + P_local.y^2) * cos(angle)
      
      // Ecuația devine una de gradul 2 în 'd'
      const A = p.sq(p.tan(angle));
      const B = -2 * P_local.x;
      const C = p.sq(P_local.x) + p.sq(P_local.y);
      
      if (p.abs(p.cos(angle)) < 1e-9) { // Cazul unghiului de 90 de grade
        let d = P_local.x;
        let P_foot = p5.Vector.add(V_anchor, local_x_axis.copy().mult(d));
        return P_foot;
      }

      // Rezolvăm ecuația d^2 - 2*P_local.x*d + (P_local.x^2 + P_local.y^2) * cos^2(angle) = 0
      const cos2 = p.sq(p.cos(angle));
      const a_eq = 1;
      const b_eq = -2 * P_local.x;
      const c_eq = (p.sq(P_local.x) + p.sq(P_local.y)) * cos2;

      const delta = p.sq(b_eq) - 4 * a_eq * c_eq;

      if (delta < 0) return V1; // Nu există soluție reală

      const d1 = (-b_eq + p.sqrt(delta)) / (2 * a_eq);
      const d2 = (-b_eq - p.sqrt(delta)) / (2 * a_eq);

      // Alegem soluția 'd' care se află pe segmentul [0, local_len]
      let d = (d1 >= 0 && d1 <= local_len) ? d1 : d2;
      
      // Transformăm 'd' înapoi în coordonate globale
      let P_foot = p5.Vector.add(V_anchor, local_x_axis.copy().mult(d));
      return P_foot;
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
      // Pentru AA1, unghiul AA1C este format cu ancora C. Latura este BC.
      const A1 = findCevianFoot(A, B, C, C, targetAngleRad);
      // Pentru BB1, unghiul BB1A este format cu ancora A. Latura este CA.
      const B1 = findCevianFoot(B, C, A, A, targetAngleRad);
      // Pentru CC1, unghiul CC1B este format cu ancora B. Latura este AB.
      const C1 = findCevianFoot(C, A, B, B, targetAngleRad);
      
      const isAltitude = Math.abs(angleSlider.value() - 90) < 0.5;

      // Desenează triunghiul
      p.stroke(0); p.strokeWeight(1); p.noFill();
      p.triangle(A.x, A.y, B.x, B.y, C.x, C.y);
      p.fill(0); p.noStroke();
      p.text('A', A.x - 15, A.y + 15);
      p.text('B', B.x + 5, B.y + 15);
      p.text('C', C.x, C.y - 10);

      // Desenează cevienele
      p.strokeWeight(isAltitude ? 2.5 : 1.5);
      p.stroke(isAltitude ? 'green' : 'tomato');
      p.line(A.x, A.y, A1.x, A1.y);
      p.line(B.x, B.y, B1.x, B1.y);
      p.line(C.x, C.y, C1.x, C1.y);
      
      // Desenează picioarele cevienelor
      p.fill(isAltitude ? 'green' : 'tomato'); p.noStroke();
      p.ellipse(A1.x, A1.y, 7);
      p.ellipse(B1.x, B1.y, 7);
      p.ellipse(C1.x, C1.y, 7);
      
      p.fill(0);
      p.text('A1', A1.x + 5, A1.y + 15);
      p.text('B1', B1.x - 20, B1.y - 5);
      p.text('C1', C1.x + 5, C1.y - 5);
      
      // Desenează vârfurile
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