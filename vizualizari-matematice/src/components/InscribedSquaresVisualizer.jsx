import React, { useState, useCallback } from 'react';
import P5Canvas from './P5Canvas';
import { useLanguage } from '../contexts/LanguageContext';

const InfoPanel = ({ sides, vertices }) => {
    const { t } = useLanguage();
    const { a, b, c } = sides;
    const isEqual = a && b && c && Math.abs(a - b) < 1 && Math.abs(b - c) < 1;
    const isEquilateral = isEqual;
    return (
        <div style={{ fontFamily: 'sans-serif', width: '250px', borderLeft: '1px solid #ccc', paddingLeft: '1rem' }}>
            <h4>{t('tfig06_areas_title')}</h4>
            <p>{t('tfig06_area1')}: {a ? a.toFixed(1) : '...'}</p>
            <p>{t('tfig06_area2')}: {b ? b.toFixed(1) : '...'}</p>
            <p>{t('tfig06_area3')}: {c ? c.toFixed(1) : '...'}</p>
            <hr />
            <div style={{
                marginTop: '1rem',
                padding: '0.5rem',
                background: isEqual ? '#e8f5e9' : '#f0f0f0',
                borderRadius: '4px',
                textAlign: 'center'
            }}>
                <strong>{isEquilateral ? t('tfig06_confirmed') : t('tfig06_unconfirmed')}</strong>
            </div>
        </div>
    );
};

function InscribedSquaresVisualizer() {
    const [values, setValues] = useState({ sides: {}, angles: {} });

    const sketch = useCallback((p) => {
        let vertices = [];
        let draggingVertex = -1;

        // The core drawing function, now corrected
        const drawInscribedSquare = (p1, p2, p3, color) => {
            const baseVec = p.constructor.Vector.sub(p2, p1);
            const baseLen = baseVec.mag();
            if (baseLen < 1) return { s: 0 };

            const area = Math.abs((p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y)) / 2;
            const h = (2 * area) / baseLen;
            if (h < 1) return { s: 0 };
            
            const s = (baseLen * h) / (baseLen + h);
            if (s < 1) return s;

            const baseNormal = baseVec.copy().normalize();
            const basePerp = p.createVector(-baseNormal.y, baseNormal.x);

            const midBase = p.constructor.Vector.lerp(p1, p2, 0.5);
            const midToP3 = p.constructor.Vector.sub(p3, midBase);
            if (basePerp.dot(midToP3) < 0) {
                basePerp.mult(-1);
            }

            const p3_proj_len = p.constructor.Vector.sub(p3, p1).dot(baseNormal);
            const t = s * p3_proj_len / h;

            const offsetVec = baseNormal.copy().mult(t);
            const sideVec = baseNormal.copy().mult(s);
            const heightVec = basePerp.copy().mult(s);
            
            const v_bot1 = p.constructor.Vector.add(p1, offsetVec);
            const v_bot2 = p.constructor.Vector.add(v_bot1, sideVec);
            const v_top1 = p.constructor.Vector.add(v_bot1, heightVec);
            const v_top2 = p.constructor.Vector.add(v_bot2, heightVec);

            p.fill(color);
            p.noStroke();
            p.quad(v_top1.x, v_top1.y, v_top2.x, v_top2.y, v_bot2.x, v_bot2.y, v_bot1.x, v_bot1.y);
            
            const width = p.dist(v_bot1.x, v_bot1.y, v_bot2.x, v_bot2.y);
            const height = p.dist(v_bot1.x, v_bot1.y, v_top1.x, v_top1.y);
            
            // Position the label OUTSIDE the square for better visibility
            const midBottom = p.constructor.Vector.lerp(v_bot1, v_bot2, 0.5);
            // The perpendicular vector points IN, so we move in the opposite direction (out)
            const labelPos = p.constructor.Vector.sub(midBottom, basePerp.copy().normalize().mult(15));

            p.fill(0);
            p.textSize(12);
            p.textAlign(p.CENTER, p.CENTER);
            p.text(`${width.toFixed(0)}x${height.toFixed(0)}`, labelPos.x, labelPos.y);

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
            <InfoPanel sides={values.sides} vertices={values.angles} />
        </div>
    );
}

export default InscribedSquaresVisualizer; 