// src/components/Navbar.jsx

import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">Acasă</Link>
      <ul className="nav-links">
        <li><Link to="/td04">TD04</Link></li>
        <li><Link to="/td20">TD20</Link></li>
        <li><Link to="/t46">T46</Link></li>
        <li><Link to="/t47">T47</Link></li>
        <li><Link to="/t48">T48</Link></li>
        <li><Link to="/t53">T53</Link></li>
        <li><Link to="/t55">T55</Link></li>
        <li><Link to="/t59">T59</Link></li>
        <li><Link to="/tfig01">T.Fig.01</Link></li>
        <li><Link to="/tfig06">Problema T.Fig.06</Link></li>
        <li><Link to="/tfig08">Problema T.Fig.08</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;