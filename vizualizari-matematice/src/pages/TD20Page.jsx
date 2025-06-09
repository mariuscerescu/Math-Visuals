import React from 'react';
import ChickenSaleSolver from '../components/ChickenSaleSolver';

function TD20Page() {
  return (
    <div>
      <h2>Card TD20: Problema cuțitului</h2>
      <p style={{ maxWidth: '700px' }}>
        <strong>Problemă:</strong> Doi frați vând 'n' pui cu 'n' lei bucata. Își împart banii luând pe rând câte 10 lei. La final, fratele mai mic, căruia îi venea rândul, nu mai are 10 lei de luat și ia restul. Pentru a echilibra împărțirea, el ia un cuțit de la fratele mai mare. Cât costă cuțitul?
      </p>
      <p style={{ maxWidth: '700px' }}>
        <strong>Rezolvare interactivă:</strong> Cheia problemei este că venitul total (`n²`) trebuie să aibă un număr impar de zeci. Introduceți mai jos o valoare pentru 'n' (ex: 6) și urmăriți pas cu pas logica împărțirii banilor și calculul final al prețului cuțitului.
      </p>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <ChickenSaleSolver />
      </div>
    </div>
  );
}

export default TD20Page; 