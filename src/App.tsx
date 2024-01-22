import React, {useEffect, useState} from 'react';
import Language from "./components/Language/Language";
import PlaceSearch from "./components/PlaceSearch/PlaceSearch";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentWeathersAsync, getWeatherLS,
} from "./store/actions/weatherActions";
import {Dispatch, RootState} from "./store/store";
import Card from "./components/Card/Card";
import {put} from "redux-saga/effects";
import {IResponseCurrentWeather, IWeeklyForecast} from "./types/IForecast";
import CardWrapper from "./components/CardWrapper/CardWrapper";
import dayjs from "dayjs";

function App() {
    const [language, setLanguage] = useState<string>('');
    const weather = useSelector((state: RootState) => state.weather)
    const dispatch: Dispatch = useDispatch()
    const {t, i18n} = useTranslation()

    useEffect(() => {
        const currentLanguage = localStorage.getItem('language')
        if (!currentLanguage) setLanguage(navigator.language || 'en');
        else setLanguage(currentLanguage)
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
        },)

    }, []);

    useEffect(() => {
        i18n.changeLanguage(language)
        localStorage.setItem('language', language)
        dayjs.locale(language)
    }, [language]);

    useEffect(() => {
        localStorage.setItem('LSForecast', JSON.stringify(weather));
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
