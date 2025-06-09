import React, { useState, useCallback } from 'react';
import P5Canvas from './P5Canvas';

// Helper component to display the results
const ResultsDisplay = ({ sides, angles }) => {
    const allEqual = sides.a && Math.abs(sides.a - sides.b) < 1 && Math.abs(sides.b - sides.c) < 1;
    return (
        <div>
            <p style={{ color: 'rgba(255, 99, 71, 1)' }}>Pătrat pe latura c (AB): {sides.c ? sides.c.toFixed(1) : '...'}</p>
            <p style={{ color: 'rgba(100, 149, 237, 1)' }}>Pătrat pe latura a (BC): {sides.a ? sides.a.toFixed(1) : '...'}</p>
            <p style={{ color: 'rgba(60, 179, 113, 1)' }}>Pătrat pe latura b (CA): {sides.b ? sides.b.toFixed(1) : '...'}</p>
            <hr />
            <p>∠A = {angles.A ? angles.A.toFixed(1) : '...'}°</p>
            <p>∠B = {angles.B ? angles.B.toFixed(1) : '...'}°</p>
            <p>∠C = {angles.C ? angles.C.toFixed(1) : '...'}°</p>
            {allEqual && (
                <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#e8f5e9', border: '1px solid green', borderRadius: '4px', textAlign: 'center' }}>
                    <strong>Pătratele sunt egale!</strong><br />
                    Triunghiul este echilateral.
                </div>
            )}
        </div>
    );
};

function InscribedSquaresVisualizer() {
    const [values, setValues] = useState({ sides: {}, angles: {} });

    const sketch = useCallback((p) => {
        let vertices = [];
        let draggingVertex = -1;

        const drawInscribedSquare = (p1, p2, p3, color) => { // Base p1-p2, opposite vertex p3
            const baseVec = p.constructor.Vector.sub(p2, p1);
            const baseLen = baseVec.mag();
            if (baseLen < 1) return 0;

            const area = Math.abs((p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y)) / 2;
            const h = (2 * area) / baseLen;
            if (h < 1) return 0;

            const s = (baseLen * h) / (baseLen + h);

            const v_top1 = p.constructor.Vector.lerp(p3, p1, s / h);
            const v_top2 = p.constructor.Vector.lerp(p3, p2, s / h);

            const baseNormal = baseVec.copy().normalize();
            const vec_p1_vtop1 = p.constructor.Vector.sub(v_top1, p1);
            const proj1 = baseNormal.copy().mult(vec_p1_vtop1.dot(baseNormal));
            const v_bot1 = p.constructor.Vector.add(p1, proj1);

            const vec_p1_vtop2 = p.constructor.Vector.sub(v_top2, p1);
            const proj2 = baseNormal.copy().mult(vec_p1_vtop2.dot(baseNormal));
            const v_bot2 = p.constructor.Vector.add(p1, proj2);

            p.fill(color);
            p.noStroke();
            p.quad(v_top1.x, v_top1.y, v_top2.x, v_top2.y, v_bot2.x, v_bot2.y, v_bot1.x, v_bot1.y);
            
            return s;
        };

        p.setup = () => {
            p.createCanvas(500, 500);
            p.noStroke();
            vertices = [
                p.createVector(p.width / 2, 100), // A
                p.createVector(p.width - 100, p.height - 100), // B
                p.createVector(100, p.height - 100), // C
            ];
        };

        p.draw = () => {
            p.background(255);
            if (p.mouseIsPressed && p.mouseX > 0 && p.mouseY > 0 && p.mouseX < p.width && p.mouseY < p.height) {
                if (draggingVertex === -1) {
                    for (let i = 0; i < vertices.length; i++) {
                        if (p.dist(p.mouseX, p.mouseY, vertices[i].x, vertices[i].y) < 15) draggingVertex = i;
                    }
                }
                if (draggingVertex !== -1) {
                    vertices[draggingVertex].x = p.mouseX;
                    vertices[draggingVertex].y = p.mouseY;
                }
            } else {
                draggingVertex = -1;
            }
            
            const [A, B, C] = vertices;
            
            const side_a = drawInscribedSquare(B, C, A, 'rgba(100, 149, 237, 0.7)');
            const side_b = drawInscribedSquare(C, A, B, 'rgba(60, 179, 113, 0.7)');
            const side_c = drawInscribedSquare(A, B, C, 'rgba(255, 99, 71, 0.7)');
            
            p.stroke(0, 50); p.strokeWeight(2); p.noFill();
            p.triangle(A.x, A.y, B.x, B.y, C.x, C.y);
            
            p.fill(0); p.noStroke();
            p.text('A', A.x - 5, A.y - 10);
            p.text('B', B.x + 5, B.y + 15);
            p.text('C', C.x - 15, C.y + 15);

            p.fill('black');
            vertices.forEach(v => p.circle(v.x, v.y, 10));

            if (p.frameCount % 5 === 0) {
                const angA = p.degrees(p.constructor.Vector.sub(B, A).angleBetween(p.constructor.Vector.sub(C, A)));
                const angB = p.degrees(p.constructor.Vector.sub(A, B).angleBetween(p.constructor.Vector.sub(C, B)));
                const angC = 180 - angA - angB;
                setValues({
                    sides: { a: side_a, b: side_b, c: side_c },
                    angles: { A: angA, B: angB, C: angC }
                });
            }
        };
    }, []);

    return (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontFamily: 'sans-serif' }}>
            <P5Canvas sketch={sketch} />
            <div style={{ width: '250px', borderLeft: '1px solid #ccc', paddingLeft: '1rem' }}>
                <ResultsDisplay sides={values.sides} angles={values.angles} />
            </div>
        </div>
    );
}

export default InscribedSquaresVisualizer; 