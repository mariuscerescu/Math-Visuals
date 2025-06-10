// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">{t('home')}</Link>
      <ul className="nav-links">
        <li><Link to="/t47">{t('p_t47')}</Link></li>
        <li><Link to="/t59">{t('p_t59')}</Link></li>
        <li><Link to="/t55">{t('p_t55')}</Link></li>
        <li><Link to="/td04">{t('p_td04')}</Link></li>
        <li><Link to="/tfig01">{t('p_tfig01')}</Link></li>
        <li><Link to="/tfig06">{t('p_tfig06')}</Link></li>
        <li><Link to="/tfig07">{t('p_tfig07')}</Link></li>
        <li><Link to="/tfig08">{t('p_tfig08')}</Link></li>
        <li><Link to="/tfig10">{t('p_tfig10')}</Link></li>
      </ul>
      <LanguageSwitcher />
    </nav>
  );
}

export default Navbar;