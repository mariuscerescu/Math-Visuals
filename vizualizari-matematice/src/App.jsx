import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './GlobalStyles.css';

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        {/* Outlet este un placeholder unde React Router va afișa pagina corespunzătoare URL-ului */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;