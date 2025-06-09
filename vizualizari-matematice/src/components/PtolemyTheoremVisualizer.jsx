import React from 'react';
import P5Canvas from './P5Canvas';

function PtolemyTheoremVisualizer() {
  const sketch = (p) => {
    let points = [];
    const radius = 180;
    let center;
    let draggingPoint = -1;

    p.setup = () => {
      p.createCanvas(500, 500);
      center = p.createVector(p.width / 2, p.height / 2);
      // Puncte inițiale pe cerc
      for (let i = 0; i < 4; i++) {
        let angle = p.PI / 2 * i + p.PI / 4;
        points.push(p.createVector(center.x + radius * p.cos(angle), center.y + radius * p.sin(angle)));
      }
    };

    p.draw = () => {
      p.background(248);
      
      // Drag & Drop
      if (p.mouseIsPressed) {
        if (draggingPoint === -1) {
          for (let i = 0; i < points.length; i++) {
            if (p.dist(p.mouseX, p.mouseY, points[i].x, points[i].y) < 15) {
              draggingPoint = i;
              break;
            }
          }
        }
        if (draggingPoint !== -1) {
          let mouseVec = p.createVector(p.mouseX - center.x, p.mouseY - center.y);
          mouseVec.setMag(radius);
          points[draggingPoint] = p5.Vector.add(center, mouseVec);
        }
      } else {
        draggingPoint = -1;
      }

      // Desen
      p.stroke(0);
      p.noFill();
      p.strokeWeight(1);
      p.ellipse(center.x, center.y, radius * 2);

      const [A, B, C, D] = points;
      p.beginShape();
      points.forEach(pt => p.vertex(pt.x, pt.y));
      p.endShape(p.CLOSE);
      
      p.stroke('tomato'); p.strokeWeight(1.5);
      p.line(A.x, A.y, C.x, C.y); // Diagonala AC
      p.stroke('royalblue');
      p.line(B.x, B.y, D.x, D.y); // Diagonala BD

      p.fill(0); p.noStroke(); p.textSize(16);
      p.text('A', A.x, A.y - 10);
      p.text('B', B.x, B.y - 10);
      p.text('C', C.x, C.y - 10);
      p.text('D', D.x, D.y - 10);

      points.forEach(pt => { p.fill('black'); p.ellipse(pt.x, pt.y, 8); });

      // Calcule
      const AB = p.dist(A.x, A.y, B.x, B.y);
      const BC = p.dist(B.x, B.y, C.x, C.y);
      const CD = p.dist(C.x, C.y, D.x, D.y);
      const DA = p.dist(D.x, D.y, A.x, A.y);
      const AC = p.dist(A.x, A.y, C.x, C.y);
      const BD = p.dist(B.x, B.y, D.x, D.y);

      const sumOfProducts = AB * CD + BC * DA;
      const productOfDiagonals = AC * BD;

      p.noStroke(); p.fill(0); p.textAlign(p.LEFT, p.TOP);
      p.text('Teorema lui Ptolemeu:', 10, 10);
      p.fill('black');
      p.text('AB·CD + BC·DA =', 10, 35);
      p.fill('royalblue');
      p.text('AC·BD', 10, 60);
      
      p.fill('black');
      p.text(sumOfProducts.toFixed(1), 160, 35);
      p.fill('royalblue');
      p.text(productOfDiagonals.toFixed(1), 160, 60);

    };
  };
  return <P5Canvas sketch={sketch} />;
}

export default PtolemyTheoremVisualizer; 