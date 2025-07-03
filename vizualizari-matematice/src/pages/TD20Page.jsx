import React from 'react';
import ChickenSaleSolver from '../components/ChickenSaleSolver';

function TD20Page() {
  return (
    <div>
      <h2 className="page-title">Card TD20: Problema cuțitului</h2>
      <div className="page-section">
        <p className="problem-statement">
          <strong className="section-label">Problemă:</strong> Doi frați vând 'n' pui cu 'n' lei bucata. Își împart banii luând pe rând câte 10 lei. La final, fratele mai mic, căruia îi venea rândul, nu mai are 10 lei de luat și ia restul. Pentru a echilibra împărțirea, el ia un cuțit de la fratele mai mare. Cât costă cuțitul?
        </p>
        <p className="visualization-description">
          <strong className="section-label">Rezolvare interactivă:</strong> Cheia problemei este că venitul total (`n²`) trebuie să aibă un număr impar de zeci. Introduceți mai jos o valoare pentru 'n' (ex: 6) și urmăriți pas cu pas logica împărțirii banilor și calculul final al prețului cuțitului.
        </p>
      </div>

      <div className="visualization-container">
        <ChickenSaleSolver />
      </div>
    </div>
  );
}

export default TD20Page; 