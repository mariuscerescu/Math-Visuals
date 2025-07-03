import { useLanguage } from '../contexts/LanguageContext';

function HomePage() {
  const { t } = useLanguage();
    return (
      <div>
        <h1 className="page-title">{t('home_title')}</h1>
        <p className="page-section">{t('home_intro')}</p>
      </div>
    );
  }
  
  export default HomePage;