import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    weather:{
                        cloud:'cloudly'
                    }
                }
            },
            ru:{
                translation: {
                    weather:{
                        cloud:'пасмурно'
                    }
                }
            },
            uk:{
                translation: {
                    weather:{
                        cloud:'хмарно'
                    }
                }
            }
        }
    });

export default i18n;