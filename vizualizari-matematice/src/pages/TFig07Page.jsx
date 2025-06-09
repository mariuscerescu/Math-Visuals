import React from 'react';
import TwelveCircles from '../components/TwelveCircles';

function TFig07Page() {
  return (
    <div>
      <h2>Card T Fig 07: 12 Cercuri pe un plan</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>Problemă:</strong> Este posibil să se deseneze 12 cercuri pe un plan astfel încât fiecare să fie tangentă la exact alte 5 cercuri?
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>Răspuns (Vizualizare):</strong> Da, este posibil. Imaginea de mai jos, preluată din document, prezintă o astfel de configurație. Aceasta este o problemă celebră legată de "numărul sărutului" (kissing number) în 2D. Configurația este adesea legată de proiecția vârfurilor unui icosaedru pe un plan.
      </p>
      <div style={{ marginTop: '2rem', maxWidth: '500px' }}>
         <TwelveCircles />
      </div>
    </div>
  );
}

export default TFig07Page; 