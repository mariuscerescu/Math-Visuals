import React, { useState, useCallback } from 'react';
import P5Canvas from './P5Canvas';

// Helper function to format the calculation result
const ValueDisplay = ({ prod1, prod2 }) => {
    const areEqual = Math.abs(prod1 - prod2) < 5; // Tolerance for floating point errors
    return (
        <p style={{
            background: areEqual ? '#e8f5e9' : '#ffebee',
            padding: '0.5rem',
            borderRadius: '4px',
            transition: 'background-color 0.3s'
        }}>
            <strong>AM · MC = </strong> {(prod1 / 100).toFixed(2)} <br />
            <strong>BM · MD = </strong> {(prod2 / 100).toFixed(2)}
        </p>
    );
};

function CircleMedianVisualizer() {
    const [values, setValues] = useState({ prod1: 0, prod2: 0, am: 0, mc: 0, bm: 0, md: 0 });

    const sketch = useCallback((p) => {
        let vertices = [];
        let draggingVertex = -1;
        
        const getCircumcenter = (p1, p2, p3) => {
            const D = 2 * (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y));
            if (Math.abs(D) < 1e-6) return null;
            const Ux = ((p1.x ** 2 + p1.y ** 2) * (p2.y - p3.y) + (p2.x ** 2 + p2.y ** 2) * (p3.y - p1.y) + (p3.x ** 2 + p3.y ** 2) * (p1.y - p2.y)) / D;
            const Uy = ((p1.x ** 2 + p1.y ** 2) * (p3.x - p2.x) + (p2.x ** 2 + p2.y ** 2) * (p1.x - p3.x) + (p3.x ** 2 + p3.y ** 2) * (p2.x - p1.x)) / D;
            return p.createVector(Ux, Uy);
        };

        const getLineCircleIntersections = (p1, p2, center, radius) => {
            const v = p.constructor.Vector.sub(p2, p1);
            const d = p.constructor.Vector.sub(p1, center);
            const a = v.dot(v);
            const b = 2 * d.dot(v);
            const c = d.dot(d) - radius * radius;
            const delta = b * b - 4 * a * c;
            if (delta < 0) return [];
            const t1 = (-b + Math.sqrt(delta)) / (2 * a);
            const t2 = (-b - Math.sqrt(delta)) / (2 * a);
            return [p.constructor.Vector.add(p1, v.copy().mult(t1)), p.constructor.Vector.add(p1, v.copy().mult(t2))];
        };

        p.setup = () => {
            p.createCanvas(500, 500);
            vertices = [
                p.createVector(100, 400), // A
                p.createVector(250, 100), // B
                p.createVector(400, 400), // C
            ];
        };

        p.draw = () => {
            // Mouse drag logic
            if (p.mouseIsPressed && p.mouseX > 0 && p.mouseY > 0 && p.mouseX < p.width && p.mouseY < p.height) {
                if (draggingVertex === -1) {
                    for (let i = 0; i < vertices.length; i++) {
                        if (p.dist(p.mouseX, p.mouseY, vertices[i].x, vertices[i].y) < 15) {
                            draggingVertex = i;
                            break;
                        }
                    }
                }
                if (draggingVertex !== -1) {
                    vertices[draggingVertex].x = p.mouseX;
                    vertices[draggingVertex].y = p.mouseY;
                }
            } else {
                draggingVertex = -1;
            }

            // Calculations
            const [A, B, C] = vertices;
            const M = p.constructor.Vector.lerp(A, C, 0.5);
            const circumcenter = getCircumcenter(A, B, C);
            
            let D = M.copy();
            let circumradius = 0;
            if (circumcenter) {
                circumradius = p.dist(A.x, A.y, circumcenter.x, circumcenter.y);
                const intersections = getLineCircleIntersections(B, M, circumcenter, circumradius);
                D = intersections.find(pt => p.dist(pt.x, pt.y, B.x, B.y) > 1) || M.copy();
            }

            // Update state for React component
            if (p.frameCount % 2 === 0) { // Update state less frequently
                setValues({
                    prod1: p.dist(A.x, A.y, M.x, M.y) * p.dist(M.x, M.y, C.x, C.y),
                    prod2: p.dist(B.x, B.y, M.x, M.y) * p.dist(M.x, M.y, D.x, D.y),
                    am: p.dist(A.x, A.y, M.x, M.y),
                    mc: p.dist(M.x, M.y, C.x, C.y),
                    bm: p.dist(B.x, B.y, M.x, M.y),
                    md: p.dist(M.x, M.y, D.x, D.y),
                });
            }

            // Drawing
            p.background(255); // White background
            
            // Draw Circle (only if valid)
            if (circumcenter) {
                p.stroke(180); // Darker gray stroke
                p.strokeWeight(1);
                p.noFill();
                p.circle(circumcenter.x, circumcenter.y, circumradius * 2);
            }

            // Draw Triangle
            p.stroke(0, 0, 200, 150); // Translucent blue
            p.strokeWeight(1.5);
            p.noFill();
            p.triangle(A.x, A.y, B.x, B.y, C.x, C.y);

            // Draw Median Line
            p.stroke('tomato'); p.strokeWeight(2);
            p.line(B.x, B.y, D.x, D.y);

            p.fill('black'); p.noStroke(); p.strokeWeight(0); p.textSize(16);
            ['A', 'B', 'C'].forEach((label, i) => p.text(label, vertices[i].x - 5, vertices[i].y - 15));
            p.text('M', M.x - 5, M.y + 20);
            p.text('D', D.x + 5, D.y + 5);

            p.fill('royalblue');
            vertices.forEach(v => p.circle(v.x, v.y, 10));
            p.fill('tomato');
            p.circle(M.x, M.y, 8);
            p.circle(D.x, D.y, 8);
        };
    }, []);

    return (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontFamily: 'sans-serif' }}>
            <P5Canvas sketch={sketch} />
            <div style={{ width: '250px', borderLeft: '1px solid #ccc', paddingLeft: '1rem' }}>
                <p>AM = {(values.am / 10).toFixed(2)}</p>
                <p>MC = {(values.mc / 10).toFixed(2)}</p>
                <p>BM = {(values.bm / 10).toFixed(2)}</p>
                <p>MD = {(values.md / 10).toFixed(2)}</p>
                <hr />
                <ValueDisplay prod1={values.prod1} prod2={values.prod2} />
            </div>
        </div>
    );
}

export default CircleMedianVisualizer; 