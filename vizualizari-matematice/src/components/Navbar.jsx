// src/components/Navbar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

function Navbar() {
  const { t } = useLanguage();
  const getLinkClass = ({ isActive }) => isActive ? 'active-link' : '';

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">{t('home')}</NavLink>
      <ul className="nav-links">
        <li><NavLink to="/t47" className={getLinkClass}>{t('p_t47')}</NavLink></li>
        <li><NavLink to="/t59" className={getLinkClass}>{t('p_t59')}</NavLink></li>
        <li><NavLink to="/t55" className={getLinkClass}>{t('p_t55')}</NavLink></li>
        <li><NavLink to="/td04" className={getLinkClass}>{t('p_td04')}</NavLink></li>
        <li><NavLink to="/tfig01" className={getLinkClass}>{t('p_tfig01')}</NavLink></li>
        <li><NavLink to="/tfig06" className={getLinkClass}>{t('p_tfig06')}</NavLink></li>
        <li><NavLink to="/tfig07" className={getLinkClass}>{t('p_tfig07')}</NavLink></li>
        <li><NavLink to="/tfig08" className={getLinkClass}>{t('p_tfig08')}</NavLink></li>
        <li><NavLink to="/tfig10" className={getLinkClass}>{t('p_tfig10')}</NavLink></li>
        <li><NavLink to="/td20" className={getLinkClass}>{t('p_td20')}</NavLink></li>
        <li><NavLink to="/t46" className={getLinkClass}>{t('p_t46')}</NavLink></li>
        <li><NavLink to="/t48" className={getLinkClass}>{t('p_t48')}</NavLink></li>
        <li><NavLink to="/t53" className={getLinkClass}>{t('p_t53')}</NavLink></li>
      </ul>
      <LanguageSwitcher />
    </nav>
  );
}

export default Navbar;