// src/components/Navbar.jsx

import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">Acasă</Link>
      <ul className="nav-links">
        <li><Link to="/t46">Problema T46</Link></li>
        <li><Link to="/t48">Problema T48</Link></li>
        <li><Link to="/t53">Problema T53</Link></li> {/* Link nou */}
        {/* Aici vom adăuga link-uri pentru celelalte probleme */}
      </ul>
    </nav>
  );
}

export default Navbar;