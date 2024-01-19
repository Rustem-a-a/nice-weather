import React, {useEffect, useState} from 'react';
import './App.css';
import Language from "./components/Language/Language";
import PlaceSearch from "./components/PlaceSearch/PlaceSearch";
import {ICurrentLocation} from "./types/Ilocation";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentWeathersAsync, getWeeklyWeathersAsync} from "./store/actions/weatherActions";
import {RootState} from "./store/store";


function App() {
    const [language, setLanguage] = useState<string>('');
    const [selectedPlace, setSelectedPlace] = useState<string>('');
    const [currentLocation, setCurrentLocation] = useState<ICurrentLocation>({latitude: 0, longitude: 0});
    const [currentWeather, setCurrentWeather] = useState<any>('');
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const weather = useSelector((state: RootState) => state.weather)
    console.log(weather)
    useEffect(() => {
        const lng = navigator.language;
        if (lng && !language) {
            setLanguage(lng);
        } else if (!language) {
            setLanguage('en')
        }
        i18n.changeLanguage(language)
    }, [language]);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setCurrentLocation({longitude: position.coords.latitude, latitude: position.coords.longitude})

            async function getCurrentWeather(currentLocation: ICurrentLocation) {
                const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=31db5af111fd6a666d8caf843b208439`)
                setCurrentWeather(data)
                const forecastDataLocalStorage = localStorage.getItem('forecast') as any
                if (!forecastDataLocalStorage) {
                    localStorage.setItem('forecast', JSON.stringify({weatherArray: [data]}))
                } else if (!forecastDataLocalStorage) {
                    localStorage.setItem('forecast', JSON.stringify({weatherArray: [data, ...forecastDataLocalStorage?.weatherArray]}))
                }
            }

            if (currentLocation.latitude || currentLocation.longitude) {
                getCurrentWeather(currentLocation)
                dispatch(getCurrentWeathersAsync(currentLocation))
                dispatch(getWeeklyWeathersAsync('львов'))
            }
        });
    }, [currentLocation.latitude, currentLocation.longitude])
    return (
        <div className="App">
            <Language language={language} onChange={setLanguage}/>
            <PlaceSearch onSelect={setSelectedPlace}/>
            <p>{t('weather.cloud')}</p>
        </div>
    );
}

export default App;
