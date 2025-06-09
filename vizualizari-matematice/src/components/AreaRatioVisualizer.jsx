import React from 'react';
import P5Canvas from './P5Canvas';

function AreaRatioVisualizer() {
  const sketch = (p) => {
    let A, B, C, D, P, E;
    let dragging = null;

    const area = (p1, p2, p3) => p.abs((p1.x*(p2.y-p3.y) + p2.x*(p3.y-p1.y) + p3.x*(p1.y-p2.y))/2);

    p.setup = () => {
      p.createCanvas(500, 400);
      A = p.createVector(250, 50);
      B = p.createVector(50, 350);
      C = p.createVector(450, 350);
      D = p5.Vector.lerp(B, C, 0.5);
      P = p5.Vector.lerp(A, D, 0.3);
    };
    
    p.draw = () => {
      p.background(248);
      if (p.mouseIsPressed) {
          if(!dragging) {
              if(p.dist(p.mouseX, p.mouseY, P.x, P.y) < 15) dragging = P;
              else if(p.dist(p.mouseX, p.mouseY, A.x, A.y) < 15) dragging = A;
              // ... add other vertices if needed
          }
      } else {
          dragging = null;
      }
      if(dragging) {
          dragging.x = p.mouseX;
          dragging.y = p.mouseY;
      }
      D = p5.Vector.lerp(B, C, 0.5); // D este mereu mijloc
      
      // Găsirea lui E (intersecția BP cu AC)
      let den = (B.x - P.x) * (A.y - C.y) - (B.y - P.y) * (A.x - C.x);
      let t = ((B.x - A.x) * (A.y - C.y) - (B.y - A.y) * (A.x - C.x)) / den;
      E = p.createVector(B.x + t * (P.x - B.x), B.y + t * (P.y - B.y));

      // Desenează
      p.stroke(0); p.strokeWeight(1); p.noFill();
      p.triangle(A.x, A.y, B.x, B.y, C.x, C.y);
      p.line(A.x, A.y, D.x, D.y); // Mediana
      p.line(B.x, B.y, E.x, E.y); // Ceviana

      p.fill('rgba(255,0,0,0.1)'); p.triangle(A.x, A.y, B.x, B.y, E.x, E.y); // ABE
      p.fill('rgba(0,0,255,0.1)'); p.triangle(E.x, E.y, B.x, B.y, C.x, C.y); // EBC

      p.fill(0); p.noStroke(); p.textSize(16);
      p.text('A', A.x, A.y - 10); p.text('B', B.x-15, B.y+15); p.text('C', C.x+5, C.y+15);
      p.text('D', D.x-5, D.y+20); p.text('P', P.x+5, P.y-5); p.text('E', E.x+5, E.y-5);
      
      p.fill('black'); p.ellipse(A.x, A.y, 8); p.ellipse(B.x, B.y, 8); p.ellipse(C.x, C.y, 8);
      p.fill('tomato'); p.ellipse(P.x, P.y, 10);
      
      // Calcule
      const AP = p.dist(A.x, A.y, P.x, P.y);
      const PD = p.dist(P.x, P.y, D.x, D.y);
      const AE = p.dist(A.x, A.y, E.x, E.y);
      const EC = p.dist(E.x, E.y, C.x, C.y);

      const ratio_AP_PD = AP / PD;
      const ratio_AE_EC = AE / EC;
      
      p.textAlign(p.LEFT, p.TOP);
      p.text(`AP / PD = ${ratio_AP_PD.toFixed(2)}`, 10, 10);
      p.text(`AE / EC = ${ratio_AE_EC.toFixed(2)}`, 10, 35);
      p.text(`2 * (AE / EC) = ${(2 * ratio_AE_EC).toFixed(2)}`, 10, 60);

      const error = p.abs(ratio_AP_PD - 2 * ratio_AE_EC);
      if (error < 0.05) {
          p.fill('green'); p.text('Relația AP/PD = 2 * AE/EC este validă!', 120, 120);
      }
    };
  };
  return <P5Canvas sketch={sketch} />;
}

export default AreaRatioVisualizer; 