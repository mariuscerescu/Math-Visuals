import React, { useState, useCallback } from 'react';
import P5Canvas from './P5Canvas';

const ResultsDisplay = ({ values }) => {
    const { a, b, c, x, y, z } = values;
    const p1 = x * y, s1 = c * c;
    const p2 = y * z, s2 = a * a;
    const p3 = z * x, s3 = b * b;
    const check = (v1, v2) => v1 && v2 && Math.abs(v1 - v2) < v1 * 0.01; // 1% tolerance

    const StyleBox = ({ isOk, children }) => (
        <p style={{ 
            padding: '0.25rem 0.5rem', 
            margin: '0.25rem 0',
            borderRadius: '4px',
            background: isOk ? '#e8f5e9' : '#ffebee',
            fontFamily: 'monospace',
            fontSize: '0.9rem'
        }}>
            {children}
        </p>
    );

    return (
        <div style={{ width: '300px', borderLeft: '1px solid #ccc', paddingLeft: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><strong>Laturi:</strong><br/>a: {a?.toFixed(2)}<br/>b: {b?.toFixed(2)}<br/>c: {c?.toFixed(2)}</div>
                <div><strong>Tangente:</strong><br/>x: {x?.toFixed(2)}<br/>y: {y?.toFixed(2)}<br/>z: {z?.toFixed(2)}</div>
            </div>
            <hr/>
            <h4>Verificare Relații:</h4>
            <StyleBox isOk={check(p1, s1)}>x·y = {p1?.toFixed(1)} | c² = {s1?.toFixed(1)}</StyleBox>
            <StyleBox isOk={check(p2, s2)}>y·z = {p2?.toFixed(1)} | a² = {s2?.toFixed(1)}</StyleBox>
            <StyleBox isOk={check(p3, s3)}>z·x = {p3?.toFixed(1)} | b² = {s3?.toFixed(1)}</StyleBox>
        </div>
    );
};


function SimsonTheoremVisualizer() {
    const [values, setValues] = useState({});

    const sketch = useCallback((p) => {
        let vertices = [];
        let m_angle = 0.3;
        let dragging = null;

        const getCircumcenter = (A, B, C) => {
            const D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
            if (Math.abs(D) < 1e-6) return null;
            const sqA = A.x * A.x + A.y * A.y, sqB = B.x * B.x + B.y * B.y, sqC = C.x * C.x + C.y * C.y;
            const Ux = (sqA * (B.y - C.y) + sqB * (C.y - A.y) + sqC * (A.y - B.y)) / D;
            const Uy = (sqA * (C.x - B.x) + sqB * (A.x - C.x) + sqC * (B.x - A.x)) / D;
            return p.createVector(Ux, Uy);
        };

        const distToLine = (point, v1, v2) => {
            return Math.abs((v2.y - v1.y) * point.x - (v2.x - v1.x) * point.y + v2.x * v1.y - v2.y * v1.x) / p.dist(v1.x, v1.y, v2.x, v2.y);
        };

        p.setup = () => {
            p.createCanvas(550, 500);
            p.angleMode(p.RADIANS);
            vertices = [ p.createVector(150, 400), p.createVector(450, 350), p.createVector(300, 150) ];
        };

        p.mousePressed = () => {
            const center = getCircumcenter(...vertices);
            if (!center) return;
            const radius = p.dist(vertices[0].x, vertices[0].y, center.x, center.y);
            const M = p.createVector(center.x + radius * p.cos(m_angle), center.y + radius * p.sin(m_angle));
            if (M && p.dist(p.mouseX, p.mouseY, M.x, M.y) < 15) { dragging = 'M'; return; }
            for (let i = 0; i < vertices.length; i++) {
                if (p.dist(p.mouseX, p.mouseY, vertices[i].x, vertices[i].y) < 15) { dragging = i; return; }
            }
        };
        
        p.mouseReleased = () => { dragging = null; };

        p.draw = () => {
            p.background(248);
            const [A, B, C] = vertices;
            const center = getCircumcenter(A, B, C);
            
            if (!center) {
                p.fill('red').textSize(16).textAlign(p.CENTER);
                p.text("Vârfuri coliniare!", p.width/2, p.height/2);
                p.triangle(A.x, A.y, B.x, B.y, C.x, C.y);
                p.fill('royalblue'); vertices.forEach(v => p.circle(v.x, v.y, 10));
                return;
            }

            const radius = p.dist(A.x, A.y, center.x, center.y);

            if (p.mouseIsPressed && dragging !== null) {
                if (dragging === 'M') {
                    m_angle = p.atan2(p.mouseY - center.y, p.mouseX - center.x);
                } else {
                    vertices[dragging].x = p.constrain(p.mouseX, 0, p.width);
                    vertices[dragging].y = p.constrain(p.mouseY, 0, p.height);
                }
            }

            const M = p.createVector(center.x + radius * p.cos(m_angle), center.y + radius * p.sin(m_angle));

            const tanVec = (V) => p.constructor.Vector.sub(V, center).rotate(p.HALF_PI);
            const tanA_v = tanVec(A); const tanB_v = tanVec(B); const tanC_v = tanVec(C);
            
            p.stroke(200); p.noFill(); p.strokeWeight(1);
            p.circle(center.x, center.y, radius * 2);
            p.stroke('lightgray');
            const drawTan = (V, tan_v) => p.line(V.x - tan_v.x*10, V.y - tan_v.y*10, V.x + tan_v.x*10, V.y + tan_v.y*10);
            drawTan(A, tanA_v); drawTan(B, tanB_v); drawTan(C, tanC_v);
            
            p.stroke(0); p.strokeWeight(2); p.noFill();
            p.triangle(A.x, A.y, B.x, B.y, C.x, C.y);

            p.fill('black'); p.noStroke(); p.textSize(14);
            p.text('A', A.x - 5, A.y + 20); p.text('B', B.x, B.y + 20); p.text('C', C.x, C.y - 10);
            p.text('M', M.x + 10, M.y);

            p.fill('royalblue'); vertices.forEach(v => p.circle(v.x, v.y, 10));
            p.fill('green'); p.circle(M.x, M.y, 12);
            
            if (p.frameCount % 2 === 0) {
                 setValues({
                    c: distToLine(M, A, B), // dist la AB
                    a: distToLine(M, B, C), // dist la BC
                    b: distToLine(M, C, A), // dist la CA
                    x: distToLine(M, A, p.constructor.Vector.add(A, tanA_v)), // dist la tg A
                    y: distToLine(M, B, p.constructor.Vector.add(B, tanB_v)), // dist la tg B
                    z: distToLine(M, C, p.constructor.Vector.add(C, tanC_v)), // dist la tg C
                });
            }
        };
    }, []);

    return (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontFamily: 'sans-serif' }}>
            <P5Canvas sketch={sketch} />
            <ResultsDisplay values={values} />
        </div>
    );
}

export default SimsonTheoremVisualizer; 