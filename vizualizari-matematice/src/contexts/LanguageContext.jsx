import React, { createContext, useState, useContext } from 'react';
import ro from '../locales/ro.json';
import ru from '../locales/ru.json';

const translations = { ro, ru };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('ro');

    const toggleLanguage = () => {
        setLanguage(prevLang => prevLang === 'ro' ? 'ru' : 'ro');
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}; 