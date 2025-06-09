import React, { useState, useCallback } from 'react';
import P5Canvas from './P5Canvas';

const ResultsDisplay = ({ values }) => {
    const { ratio1, ratio2 } = values;
    const checkValue = 2 * ratio2;
    const isEqual = ratio1 && ratio2 && Math.abs(ratio1 - checkValue) < 0.05;

    return (
        <>
            <p>AP / PD = <strong>{ratio1 ? ratio1.toFixed(3) : '...'}</strong></p>
            <p>AE / EC = <strong>{ratio2 ? ratio2.toFixed(3) : '...'}</strong></p>
            <hr/>
            <p>2 * (AE / EC) = <strong>{checkValue ? checkValue.toFixed(3) : '...'}</strong></p>
            <div style={{ 
                marginTop: '1rem', 
                padding: '0.5rem', 
                background: isEqual ? '#e8f5e9' : '#ffebee', 
                borderRadius: '4px',
                textAlign: 'center'
            }}>
                <strong>{isEqual ? '✓ Egalitate confirmată!' : 'Calculare...'}</strong>
            </div>
        </>
    );
};

function CevaTheoremVisualizer() {
    const [values, setValues] = useState({ ratio1: null, ratio2: null });

    const sketch = useCallback((p) => {
        let vertices = {};
        let t = 0.5; // Parameter for P on median AD
        let dragging = null;

        const lineLineIntersection = (p1, p2, p3, p4) => {
            const den = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
            if (den === 0) return null;
            const t_num = ((p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x));
            const u_num = -((p1.x - p2.x) * (p1.y - p3.y) - (p1.y - p2.y) * (p1.x - p3.x));
            const t_intersect = t_num / den;
            const u_intersect = u_num / den;
            if (t_intersect >= 0 && t_intersect <= 1 && u_intersect >= 0) {
                return p.createVector(p1.x + t_intersect * (p2.x - p1.x), p1.y + t_intersect * (p2.y - p1.y));
            }
            return null;
        };

        p.setup = () => {
            p.createCanvas(500, 500);
            vertices = {
                'A': p.createVector(100, 400),
                'B': p.createVector(450, 350),
                'C': p.createVector(350, 100)
            };
        };

        p.mousePressed = () => {
            const { A, B, C } = vertices;
            const D = p.constructor.Vector.lerp(B, C, 0.5);
            const P = p.constructor.Vector.lerp(A, D, t);
            if (p.dist(p.mouseX, p.mouseY, P.x, P.y) < 12) dragging = 'P';
            else if (p.dist(p.mouseX, p.mouseY, A.x, A.y) < 10) dragging = 'A';
            else if (p.dist(p.mouseX, p.mouseY, B.x, B.y) < 10) dragging = 'B';
            else if (p.dist(p.mouseX, p.mouseY, C.x, C.y) < 10) dragging = 'C';
        };

        p.mouseReleased = () => { dragging = null; };
        
        p.draw = () => {
            p.background(248);

            if (p.mouseIsPressed && dragging) {
                if (dragging === 'P') {
                    const D = p.constructor.Vector.lerp(vertices.B, vertices.C, 0.5);
                    const AD = p.constructor.Vector.sub(D, vertices.A);
                    const mouseVec = p.createVector(p.mouseX, p.mouseY);
                    const AP_mouse = p.constructor.Vector.sub(mouseVec, vertices.A);
                    let proj = AP_mouse.dot(AD.copy().normalize());
                    t = p.constrain(proj / AD.mag(), 0.05, 0.95);
                } else {
                    vertices[dragging].x = p.mouseX;
                    vertices[dragging].y = p.mouseY;
                }
            }

            const { A, B, C } = vertices;
            const D = p.constructor.Vector.lerp(B, C, 0.5);
            const P = p.constructor.Vector.lerp(A, D, t);
            const P_extended = p.constructor.Vector.add(B, p.constructor.Vector.sub(P, B).mult(100));
            const E = lineLineIntersection(A, C, B, P_extended);
            
            p.stroke(200); p.strokeWeight(1);
            p.line(A.x, A.y, D.x, D.y);
            if (E) p.line(B.x, B.y, E.x, E.y);

            p.stroke(0); p.strokeWeight(2); p.noFill();
            p.triangle(A.x, A.y, B.x, B.y, C.x, C.y);

            p.fill('black'); p.noStroke(); p.textSize(14);
            p.text('A', A.x - 15, A.y); p.text('B', B.x + 5, B.y); p.text('C', C.x, C.y - 10);
            p.text('D', D.x, D.y + 20); if (E) p.text('E', E.x + 10, E.y);

            p.fill('royalblue'); p.circle(A.x, A.y, 10); p.circle(B.x, B.y, 10); p.circle(C.x, C.y, 10);
            p.fill('gray'); p.circle(D.x, D.y, 8);
            if (E) { p.fill('tomato'); p.circle(E.x, E.y, 8); }
            p.fill('green'); p.circle(P.x, P.y, 12);

            if (p.frameCount % 2 === 0) {
                const ratio1 = p.dist(A.x, A.y, P.x, P.y) / p.dist(P.x, P.y, D.x, D.y);
                const ratio2 = E ? p.dist(A.x, A.y, E.x, E.y) / p.dist(E.x, E.y, C.x, C.y) : null;
                setValues({ ratio1, ratio2 });
            }
        };
    }, []);

    return (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontFamily: 'sans-serif' }}>
            <P5Canvas sketch={sketch} />
            <div style={{ width: '250px', borderLeft: '1px solid #ccc', paddingLeft: '1rem' }}>
                <ResultsDisplay values={values} />
            </div>
        </div>
    );
}

export default CevaTheoremVisualizer; 