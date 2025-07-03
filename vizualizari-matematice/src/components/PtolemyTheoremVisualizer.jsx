import React, { useState, useCallback } from 'react';
import P5Canvas from './P5Canvas';
import { useLanguage } from '../contexts/LanguageContext';

const ValueDisplay = ({ diagProd, sideProd }) => {
    const { t } = useLanguage();
    const areEqual = Math.abs(diagProd - sideProd) < 1; // Tolerance for floating point errors
    return (
        <div style={{
            background: areEqual ? '#e8f5e9' : '#ffebee',
            padding: '1rem',
            borderRadius: '8px',
            transition: 'background-color 0.3s',
            border: `1px solid ${areEqual ? '#c3e6cb' : '#f5c6cb'}`
        }}>
            <p><strong>{t('tfig01_diagonals_product')}:</strong> <br/> AC · BD = {diagProd.toFixed(2)}</p>
            <p><strong>{t('tfig01_sides_product')}:</strong> <br/> AB · CD + BC · DA = {sideProd.toFixed(2)}</p>
            <h4 style={{textAlign: 'center', color: areEqual ? 'green' : 'red'}}>
                {areEqual ? t('tfig01_confirmed') : t('tfig01_calculating')}
            </h4>
        </div>
    );
};

function PtolemyTheoremVisualizer() {
    const [values, setValues] = useState({ diagProd: 0, sideProd: 0 });

    const sketch = useCallback((p) => {
        let points = [];
        const radius = 180;
        let center;
        let draggingPoint = null;

        p.setup = () => {
            p.createCanvas(500, 450);
            center = p.createVector(p.width / 2, p.height / 2);
            // Initialize points on the circle
            for (let i = 0; i < 4; i++) {
                const angle = p.TWO_PI / 4 * i - p.PI / 4;
                points.push(p.createVector(center.x + radius * p.cos(angle), center.y + radius * p.sin(angle)));
            }
        };

        p.draw = () => {
            if (p.mouseIsPressed) {
                if (draggingPoint === null) {
                    for (let i = 0; i < points.length; i++) {
                        if (p.dist(p.mouseX, p.mouseY, points[i].x, points[i].y) < 15) {
                            draggingPoint = i;
                            break;
                        }
                    }
                }
            } else {
                draggingPoint = null;
            }

            if (draggingPoint !== null) {
                const mouseVector = p.createVector(p.mouseX - center.x, p.mouseY - center.y);
                mouseVector.setMag(radius);
                points[draggingPoint] = p.constructor.Vector.add(center, mouseVector);
            }

            // Calculations
            const [A, B, C, D] = points;
            const AB = p.dist(A.x, A.y, B.x, B.y);
            const BC = p.dist(B.x, B.y, C.x, C.y);
            const CD = p.dist(C.x, C.y, D.x, D.y);
            const DA = p.dist(D.x, D.y, A.x, A.y);
            const AC = p.dist(A.x, A.y, C.x, C.y);
            const BD = p.dist(B.x, B.y, D.x, D.y);

            const diagProd = AC * BD;
            const sideProd = AB * CD + BC * DA;
            
            if (p.frameCount % 2 === 0) {
                 setValues({ diagProd: diagProd/100, sideProd: sideProd/100 });
            }

            // Drawing
            p.background(255);
            p.stroke(180);
            p.noFill();
            p.strokeWeight(2);
            p.circle(center.x, center.y, radius * 2);

            p.stroke('royalblue');
            p.strokeWeight(1);
            p.line(A.x, A.y, B.x, B.y);
            p.line(B.x, B.y, C.x, C.y);
            p.line(C.x, C.y, D.x, D.y);
            p.line(D.x, D.y, A.x, A.y);
            
            p.stroke('tomato');
            p.strokeWeight(1.5);
            p.line(A.x, A.y, C.x, C.y);
            p.line(B.x, B.y, D.x, D.y);

            p.noStroke();
            p.fill('black');
            p.textSize(16);
            ['A', 'B', 'C', 'D'].forEach((label, i) => p.text(label, points[i].x-5, points[i].y-15));

            points.forEach(pt => {
                p.fill('royalblue');
                p.circle(pt.x, pt.y, 10);
            });
        };
    }, []);

    return (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <P5Canvas sketch={sketch} />
            <div style={{ width: '300px' }}>
                <ValueDisplay diagProd={values.diagProd} sideProd={values.sideProd} />
            </div>
        </div>
    );
}

export default PtolemyTheoremVisualizer; 