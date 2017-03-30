import i18n from 'i18next';
import en from './locales/en/common';
import fr from './locales/fr/common';
// import Cache from 'i18next-localstorage-cache';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).init({
  fallbackLng: 'en',
  resources: {
    en,
    fr
  },
  ns: ['common'],
  defaultNS: 'common',

  debug: true
  // interpolation: {
  //   escapeValue: false, // not needed for react!!
  //   formatSeparator: ',',
  //   format: function(value, format, lng) {
  //     if (format === 'uppercase') return value.toUpperCase();
  //     return value;
  //   }
  // }
});


export default i18n;
