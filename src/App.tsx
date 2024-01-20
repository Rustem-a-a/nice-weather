import React, {useEffect, useState} from 'react';
import './App.css';
import Language from "./components/Language/Language";
import PlaceSearch from "./components/PlaceSearch/PlaceSearch";
import {ICurrentLocation} from "./types/Ilocation";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentWeathersAsync, getWeatherLS,
} from "./store/actions/weatherActions";
import {RootState} from "./store/store";
import Card from "./components/Card/Card";
import {put} from "redux-saga/effects";
import {IResponseCurrentWeather, IWeeklyForecast} from "./types/IForecast";
import CardWrapper from "./components/CardWrapper/CardWrapper";

function App() {
    const [language, setLanguage] = useState<string>('');
    const weather = useSelector((state: RootState) => state.weather)
    const dispatch = useDispatch()
    const {t, i18n} = useTranslation()

    useEffect(() => {
        const LS: {
            currentWeather: IResponseCurrentWeather;
            weeklyWeather: IWeeklyForecast[];
            isCelsius: boolean;
        }[] = JSON.parse(localStorage.getItem('LSForecast') as string)
        if (LS?.length) {
            dispatch(getWeatherLS(LS))
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            dispatch(getCurrentWeathersAsync(position.coords))
        })

    }, []);

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
        const handleBeforeUnload = () => {
            localStorage.setItem('LSForecast', JSON.stringify(weather));
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [weather])
    return (
        <div className="App">
            <Language language={language} onChange={setLanguage}/>
            <PlaceSearch/>
            <CardWrapper weather={weather}/>
        </div>
    );
}

export default App;
