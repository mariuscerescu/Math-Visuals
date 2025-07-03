import React, { useState, useCallback } from 'react';
import P5Canvas from './P5Canvas';
import { useLanguage } from '../contexts/LanguageContext';

const ResultsDisplay = ({ values }) => {
    const { t } = useLanguage();
    const { a, b, c, x, y, z } = values;

    const relations = [
        { name: 'a²', val1: a*a, name2: 'yz', val2: y*z },
        { name: 'b²', val1: b*b, name2: 'xz', val2: x*z },
        { name: 'c²', val1: c*c, name2: 'xy', val2: x*y },
    ];

    return (
        <div style={{ fontFamily: 'sans-serif', fontSize: '14px' }}>
            <p>{t('tfig10_sides')} a={a.toFixed(2)}, b={b.toFixed(2)}, c={c.toFixed(2)}</p>
            <p>{t('tfig10_tangents')} x={x.toFixed(2)}, y={y.toFixed(2)}, z={z.toFixed(2)}</p>
            <hr />
            <h4>{t('tfig10_relations')}</h4>
            {relations.map(r => (
                <div key={r.name} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '2px 5px',
                    margin: '2px 0',
                    borderRadius: '4px',
                    background: Math.abs(r.val1 - r.val2) < 0.1 ? '#e8f5e9' : '#ffebee'
                }}>
                    <span>{r.name} = {r.val1.toFixed(2)}</span>
                    <span>{r.name2} = {r.val2.toFixed(2)}</span>
                </div>
            ))}
        </div>
    );
};


function DistancesToSidesAndTangents() {
    const [values, setValues] = useState({ a: 0, b: 0, c: 0, x: 0, y: 0, z: 0 });

    const sketch = useCallback((p) => {
        let A, B, C, M, center;
        let angleA, angleB, angleC, angleM;
        let radius;
        let dragging = null;

        const pointLineDist = (point, p1, p2) => {
            const num = Math.abs((p2.y - p1.y) * point.x - (p2.x - p1.x) * point.y + p2.x * p1.y - p2.y * p1.x);
            const den = p.dist(p1.x, p1.y, p2.x, p2.y);
            return num / den;
        };

        const getTangent = (vertex) => {
            const radiusVec = p.constructor.Vector.sub(vertex, center);
            const tangentVec = p.createVector(-radiusVec.y, radiusVec.x);
            const p2 = p.constructor.Vector.add(vertex, tangentVec);
            return [vertex, p2];
        };

        const getProjection = (point, lineP1, lineP2) => {
            const ap = p.constructor.Vector.sub(point, lineP1);
            const ab = p.constructor.Vector.sub(lineP2, lineP1);
            ab.normalize();
            const d = ap.dot(ab);
            return p.constructor.Vector.add(lineP1, ab.mult(d));
        };

        p.setup = () => {
            p.createCanvas(500, 500);
            p.angleMode(p.RADIANS);
            center = p.createVector(p.width / 2, p.height / 2);
            radius = 150;
            
            angleA = p.PI * 1.5;
            angleB = p.PI * -0.1;
            angleC = p.PI * 0.7;
            angleM = p.PI * 0.25;
        };

        p.mousePressed = () => {
            const points = { A, B, C, M };
            for (const key in points) {
                if (p.dist(p.mouseX, p.mouseY, points[key].x, points[key].y) < 15) {
                    dragging = key;
                    return;
                }
            }
        };

        p.mouseReleased = () => { dragging = null; };
        
        p.mouseDragged = () => {
            if (dragging) {
                const mouseAngle = p.atan2(p.mouseY - center.y, p.mouseX - center.x);
                if (dragging === 'A') angleA = mouseAngle;
                if (dragging === 'B') angleB = mouseAngle;
                if (dragging === 'C') angleC = mouseAngle;
                if (dragging === 'M') angleM = mouseAngle;
            }
        };

        p.draw = () => {
            p.background(255);
            
            if (!dragging) angleM += 0.005;
            A = p.createVector(center.x + radius * p.cos(angleA), center.y + radius * p.sin(angleA));
            B = p.createVector(center.x + radius * p.cos(angleB), center.y + radius * p.sin(angleB));
            C = p.createVector(center.x + radius * p.cos(angleC), center.y + radius * p.sin(angleC));
            M = p.createVector(center.x + radius * p.cos(angleM), center.y + radius * p.sin(angleM));

            p.stroke(200); p.noFill();
            p.circle(center.x, center.y, radius * 2);

            p.stroke(0); p.strokeWeight(2);
            p.triangle(A.x, A.y, B.x, B.y, C.x, C.y);
            
            const tanA = getTangent(A);
            const tanB = getTangent(B);
            const tanC = getTangent(C);
            
            p.stroke(255, 100, 100, 150); p.strokeWeight(1);
            p.line(A.x - 1000 * (tanA[1].x - tanA[0].x), A.y - 1000 * (tanA[1].y - tanA[0].y), A.x + 1000 * (tanA[1].x - tanA[0].x), A.y + 1000 * (tanA[1].y - tanA[0].y));
            p.line(B.x - 1000 * (tanB[1].x - tanB[0].x), B.y - 1000 * (tanB[1].y - tanB[0].y), B.x + 1000 * (tanB[1].x - tanB[0].x), B.y + 1000 * (tanB[1].y - tanB[0].y));
            p.line(C.x - 1000 * (tanC[1].x - tanC[0].x), C.y - 1000 * (tanC[1].y - tanC[0].y), C.x + 1000 * (tanC[1].x - tanC[0].x), C.y + 1000 * (tanC[1].y - tanC[0].y));

            p.strokeWeight(0.5);
            p.stroke(0, 100, 255, 150);
            p.line(M.x, M.y, getProjection(M, B, C).x, getProjection(M, B, C).y);
            p.line(M.x, M.y, getProjection(M, A, C).x, getProjection(M, A, C).y);
            p.line(M.x, M.y, getProjection(M, A, B).x, getProjection(M, A, B).y);
            p.stroke(255, 100, 0, 150);
            p.line(M.x, M.y, getProjection(M, tanA[0], tanA[1]).x, getProjection(M, tanA[0], tanA[1]).y);
            p.line(M.x, M.y, getProjection(M, tanB[0], tanB[1]).x, getProjection(M, tanB[0], tanB[1]).y);
            p.line(M.x, M.y, getProjection(M, tanC[0], tanC[1]).x, getProjection(M, tanC[0], tanC[1]).y);

            const a = pointLineDist(M, B, C);
            const b = pointLineDist(M, A, C);
            const c = pointLineDist(M, A, B);
            const x = pointLineDist(M, tanA[0], tanA[1]);
            const y = pointLineDist(M, tanB[0], tanB[1]);
            const z = pointLineDist(M, tanC[0], tanC[1]);
            
            if (p.frameCount % 2 === 0) setValues({ a, b, c, x, y, z });

            p.noStroke();
            p.fill(0); p.text('A', A.x - 5, A.y - 10); p.text('B', B.x + 10, B.y + 5); p.text('C', C.x - 10, C.y + 15);
            
            p.fill('green');
            p.circle(M.x, M.y, 10);
            p.text('M', M.x + 10, M.y);
        };
    }, []);

    return (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <P5Canvas sketch={sketch} />
            <div style={{ width: '250px' }}>
                <ResultsDisplay values={values} />
            </div>
        </div>
    );
}

export default DistancesToSidesAndTangents; 