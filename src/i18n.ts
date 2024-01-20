import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
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
                    weather: {
                        cloud: 'cloudly'
                    },
                    btnAdd: 'Add',
                    citySearch: 'Search for a city...',
                    citySearchError: 'Connection error...',
                    Thunderstorm: 'Thunderstorm',
                    Drizzle: 'Drizzle',
                    Rain: 'Rain',
                    Snow: 'Snow',
                    Clear: 'Clear',
                    Clouds: 'Clouds',
                    Mist: 'Mist',
                    Smoke: 'Smoke',
                    Haze: 'Haze',
                    Dust: 'Dust',
                    Fog: 'Fog',
                    Sand: 'Sand',
                    Ash: 'Ash',
                    Squall: 'Squall',
                    Tornado: 'Tornado',
                    wind: 'Wind',
                    humidity: 'Humidity',
                    pressure: 'Pressure',
                    shortWind:'m/s',
                    shortPressure:'Pa',
                    feelsLike: 'Feels like'
                }
            },
            ru: {
                translation: {
                    weather: {
                        cloud: 'пасмурно'
                    },
                    btnAdd: 'Добавить',
                    citySearch: 'Искать город...',
                    citySearchError: 'Ошибка соединения...',
                    Thunderstorm: 'Гроза',
                    Drizzle: 'Дождь',
                    Rain: 'Дождь',
                    Snow: 'Снег',
                    Clear: 'Чисто',
                    Clouds: 'Облака',
                    Mist: 'Туман',
                    Smoke: 'Дым',
                    Haze: 'Туман',
                    Dust: 'Пыль',
                    Fog: 'Туман',
                    Sand: 'Песок',
                    Ash: 'Пепел',
                    Squall: 'Шквал',
                    Tornado: 'Торнадо',
                    wind: 'Ветер',
                    humidity: 'Влажность',
                    pressure: 'Давление',
                    shortWind:'м/c',
                    shortPressure:'Па',
                    feelsLike: 'Ощущается'
                }
            },
            uk: {
                translation: {
                    weather: {
                        cloud: 'хмарно'
                    },
                    btnAdd: 'Додати',
                    citySearch: 'Шукати місто...',
                    citySearchError: 'Помилка з`єднання...',
                    Thunderstorm: 'Гроза',
                    Drizzle: 'Дощ',
                    Rain: 'Дощ',
                    Snow: 'Сніг',
                    Clear: 'Чисто',
                    Clouds: 'Хмари',
                    Mist: 'Туман',
                    Smoke: 'Дим',
                    Haze: 'Серпанок',
                    Dust: 'Пил',
                    Fog: 'Туман',
                    Sand: 'Пісок',
                    Ash: 'Зола',
                    Squall: 'Шквал',
                    Tornado: 'Торнадо',
                    wind: 'Вітер',
                    humidity: 'Вологість',
                    pressure: 'Тиск',
                    shortWind:'м/c',
                    shortPressure:'Па',
                    feelsLike: 'Відчувається'
                }
            }
        }
    });

export default i18n;