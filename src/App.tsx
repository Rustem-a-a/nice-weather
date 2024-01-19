import React, {Suspense, useEffect, useState} from 'react';
import './App.css';
import Language from "./components/Language/Language";
import PlaceSearch from "./components/PlaceSearch/PlaceSearch";
import {ICurrentLocation, ISelectedPlace} from "./types/Ilocation";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentWeathersAsync, getWeeklyWeathersAsync} from "./store/actions/weatherActions";
import {RootState} from "./store/store";
import Card from "./components/Card/Card";
import Chart from "./components/Chart/Chart";


function App() {
    const [language, setLanguage] = useState<string>('');
    const [selectedPlace, setSelectedPlace] = useState<ISelectedPlace>({latitude: 0, longitude: 0,city:''});
    const [currentLocation, setCurrentLocation] = useState<ICurrentLocation>({latitude: 0, longitude: 0});
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const weather = useSelector((state: RootState) => state.weather)
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
        if (!currentLocation.latitude || !currentLocation.longitude){
        navigator.geolocation.getCurrentPosition(function (position) {
            setCurrentLocation({longitude: position.coords.latitude, latitude: position.coords.longitude})
                dispatch(getCurrentWeathersAsync(currentLocation))
                dispatch(getWeeklyWeathersAsync('львов'))

        })}
        else if(selectedPlace.latitude || selectedPlace.longitude){
            dispatch(getCurrentWeathersAsync({latitude:selectedPlace.latitude, longitude:selectedPlace.longitude}))
        }

    },     [selectedPlace.latitude,selectedPlace.longitude]);
    return (
        <div className="App">
            <Language language={language} onChange={setLanguage}/>
            <PlaceSearch onSelect={setSelectedPlace}/>
                <Card currentWeather={weather.currentWeather} weeklyWeather={weather.weeklyWeather} />
        </div>
    );
}

export default App;
