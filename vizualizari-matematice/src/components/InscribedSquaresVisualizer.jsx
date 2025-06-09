import React from 'react';
import P5Canvas from './P5Canvas';

function InscribedSquaresVisualizer() {
  const sketch = (p) => {
    let A, B, C;
    let angleA_slider, angleB_slider;

    const getInscribedSquare = (p1, p2, p3) => {
        const side = p5.Vector.sub(p2, p1);
        const h_vec = p5.Vector.sub(p3, p1);
        const h = p.abs(side.cross(h_vec).z / side.mag());
        const s = (side.mag() * h) / (side.mag() + h);
        
        const y_offset = p5.Vector.sub(p2, p1).normalize().rotate(-p.HALF_PI);
        const P1 = p5.Vector.add(p1, y_offset.copy().mult(s));
        const P2 = p5.Vector.add(p2, y_offset.copy().mult(s));
        return { P1, P2, s };
    };

    p.setup = () => {
      p.createCanvas(500, 400);
      A = p.createVector(50, 350);
      B = p.createVector(450, 350);
      
      angleA_slider = p.createSlider(30, 90, 60, 1);
      angleB_slider = p.createSlider(30, 90, 60, 1);
      angleA_slider.position(10, p.height + 10);
      angleB_slider.position(p.width - 160, p.height + 10);
      angleA_slider.parent(p.canvas.parentElement);
      angleB_slider.parent(p.canvas.parentElement);
    };

    p.draw = () => {
      p.background(248);
      const angleA = p.radians(angleA_slider.value());
      const angleB = p.radians(angleB_slider.value());
      const angleC = p.PI - angleA - angleB;
      
      const c_len = B.x - A.x;
      const b_len = c_len * p.sin(angleB) / p.sin(angleC);
      C = p.createVector(A.x + b_len * p.cos(angleA), A.y - b_len * p.sin(angleA));

      p.stroke(0); p.strokeWeight(1); p.noFill();
      p.triangle(A.x, A.y, B.x, B.y, C.x, C.y);

      const s1_data = getInscribedSquare(A, B, C); // Pătrat pe AB
      const s2_data = getInscribedSquare(B, C, A); // Pătrat pe BC
      const s3_data = getInscribedSquare(C, A, B); // Pătrat pe CA
      
      p.fill(255, 0, 0, 100);
      p.quad(s1_data.P1.x, s1_data.P1.y, s1_data.P2.x, s1_data.P2.y, B.x, B.y, A.x, A.y);
      p.fill(0, 255, 0, 100);
      p.quad(s2_data.P1.x, s2_data.P1.y, s2_data.P2.x, s2_data.P2.y, C.x, C.y, B.x, B.y);
      p.fill(0, 0, 255, 100);
      p.quad(s3_data.P1.x, s3_data.P1.y, s3_data.P2.x, s3_data.P2.y, A.x, A.y, C.x, C.y);
      
      p.noStroke(); p.fill(0);
      p.text(`Latura 1: ${s1_data.s.toFixed(1)}`, 10, 20);
      p.text(`Latura 2: ${s2_data.s.toFixed(1)}`, 10, 40);
      p.text(`Latura 3: ${s3_data.s.toFixed(1)}`, 10, 60);

      const error = p.abs(s1_data.s - s2_data.s) + p.abs(s2_data.s - s3_data.s);
      if (error < 1) {
          p.fill('green'); p.text('Pătratele sunt egale!\nTriunghiul este echilateral.', 150, 40);
      }
    };
  };
  return <div style={{paddingBottom: '40px'}}><P5Canvas sketch={sketch} /></div>;
}

export default InscribedSquaresVisualizer; 