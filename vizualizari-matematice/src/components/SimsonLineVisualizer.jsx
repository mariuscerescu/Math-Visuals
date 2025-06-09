import React from 'react';
import P5Canvas from './P5Canvas';

function SimsonLineVisualizer() {
  const sketch = (p) => {
    let A, B, C, M;
    let radius, center;
    let dragging = null;

    const getProjection = (p, a, b) => {
      let ap = p5.Vector.sub(p, a);
      let ab = p5.Vector.sub(b, a);
      ab.normalize();
      let d = ap.dot(ab);
      return p5.Vector.add(a, ab.mult(d));
    };

    p.setup = () => {
      p.createCanvas(500, 500);
      center = p.createVector(p.width/2, p.height/2);
      radius = 180;
      A = p.createVector(center.x + radius, center.y);
      B = p.createVector(center.x + radius*p.cos(2*p.PI/3), center.y + radius*p.sin(2*p.PI/3));
      C = p.createVector(center.x + radius*p.cos(4*p.PI/3), center.y + radius*p.sin(4*p.PI/3));
      M = p.createVector(center.x + radius*p.cos(-p.PI/4), center.y + radius*p.sin(-p.PI/4));
    };
    
    p.draw = () => {
      p.background(248);
      
      if (p.mouseIsPressed) {
          if(!dragging) {
              if(p.dist(p.mouseX, p.mouseY, M.x, M.y) < 15) dragging = M;
          }
      } else { dragging = null; }

      if(dragging === M) {
          let mouseVec = p5.Vector.sub(p.createVector(p.mouseX, p.mouseY), center);
          mouseVec.setMag(radius);
          M = p5.Vector.add(center, mouseVec);
      }

      // Desene
      p.noFill(); p.strokeWeight(1); p.stroke(0);
      p.ellipse(center.x, center.y, radius*2);
      p.triangle(A.x, A.y, B.x, B.y, C.x, C.y);
      p.fill('royalblue'); p.noStroke();
      p.ellipse(M.x, M.y, 10);
      
      const P1 = getProjection(M, A, B);
      const P2 = getProjection(M, B, C);
      const P3 = getProjection(M, C, A);
      
      p.stroke('tomato'); p.strokeWeight(1.5);
      p.line(M.x, M.y, P1.x, P1.y);
      p.line(M.x, M.y, P2.x, P2.y);
      p.line(M.x, M.y, P3.x, P3.y);
      
      p.fill('tomato'); p.noStroke();
      p.ellipse(P1.x, P1.y, 6); p.ellipse(P2.x, P2.y, 6); p.ellipse(P3.x, P3.y, 6);
      
      // Linia lui Simson
      p.stroke('green'); p.strokeWeight(2.5);
      // extindem linia pentru vizibilitate
      const simson_vec = p5.Vector.sub(P2, P1).normalize().mult(1000);
      const start = p5.Vector.sub(P1, simson_vec);
      const end = p5.Vector.add(P1, simson_vec);
      p.line(start.x, start.y, end.x, end.y);
      
      p.fill(0); p.noStroke(); p.textSize(16);
      p.text('A', A.x+10, A.y); p.text('B', B.x-10, B.y-10); p.text('C', C.x-10, C.y+15);
      p.text('M', M.x+10, M.y+10);
    };
  };
  return <P5Canvas sketch={sketch} />;
}

export default SimsonLineVisualizer; 