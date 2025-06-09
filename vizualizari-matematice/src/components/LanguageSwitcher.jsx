import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function LanguageSwitcher() {
    const { language, toggleLanguage } = useLanguage();

    const buttonStyle = {
        padding: '8px 12px',
        fontFamily: 'sans-serif',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f8f8f8',
        textTransform: 'uppercase'
    };

    return (
        <button style={buttonStyle} onClick={toggleLanguage}>
            {language === 'ro' ? 'РУ' : 'RO'}
        </button>
    );
}

export default LanguageSwitcher; 