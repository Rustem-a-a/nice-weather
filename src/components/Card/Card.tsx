import React, {useEffect, useState} from 'react';
import style from './Card.module.scss'
import {IResponseCurrentWeather, IWeeklyForecast} from "../../types/IForecast";
import Chart from "../Chart/Chart";
import {t} from "i18next";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {
    changeCurrentPlaceWeather,
    getCurrentWeather,
    getCurrentWeathersAsync,
    getWeatherLS
} from "../../store/actions/weatherActions";

interface WeatherChartProps {
    currentWeather: IResponseCurrentWeather;
    weeklyWeather: IWeeklyForecast[];
    isCelsius:boolean;
}

const Card: React.FC<WeatherChartProps> = ({currentWeather, weeklyWeather,isCelsius}) => {
    const [celsius, setCelsius] = useState<boolean>(isCelsius);
    const [color, setColor] = useState<string>(currentWeather?.main?.temp > 0 ? '#FFE2C8' : '#C5D4FF');
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const weather = useSelector((state: RootState) => state.weather)
    const [currentCardWeather, setCurrentCardWeather] = useState<IResponseCurrentWeather>(currentWeather);
    const dispatch = useDispatch()
    useEffect(() => {
        setFirstLoad(false)
        if(!firstLoad)
        console.log('change')
        dispatch(changeCurrentPlaceWeather({currentWeather,weeklyWeather,isCelsius:celsius}))
    }, [celsius]);

    const timestamp = currentWeather.dt;
    const date = new Date(timestamp);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const formattedDate = `${t(daysOfWeek[date.getUTCDay()])}, ${date.getUTCDate()} ${t(months[date.getUTCMonth()])}, ${date.getUTCHours()}:${date.getUTCMinutes()}`;

    return (
        <div className={`${style.wrapper} ${currentWeather?.main?.temp > 0 ? style.warm : style.cold}`}>
            <div className={style.topWrapper}>
                <div className={style.leftTopWrapper}>
                    <div className={style.place}>
                        {currentWeather?.name},{currentWeather?.sys?.country}
                    </div>
                    <div className={style.date}>
                        {formattedDate}
                    </div>
                </div>
                <div className={style.rightTopWrapper}>
                    {currentWeather?.weather?.[0]?.main !== 'clear'
                        ? <div className={style.sun}>
                            <img
                                width={30}
                                height={30}
                                src={`https://openweathermap.org/img/wn/${currentWeather.weather?.[0].icon}@2x.png`}/>
                            <span>{t(currentWeather?.weather?.[0].main)}</span>
                        </div>
                        : <div className={style.sun}><img
                            width={30}
                            height={30}
                            src={`https://openweathermap.org/img/wn/${currentWeather.weather?.[0].icon}`}/>
                            <span>{t('cloudy')}</span>
                        </div>}
                    <div
                        className={style.closeCard}
                        onClick={() => {
                            const filteredWeather = weather.filter(value =>
                                value.currentWeather.coord.lat !== currentWeather.coord.lat && value.currentWeather.coord.lon !== currentWeather.coord.lon)
                            dispatch(getWeatherLS(filteredWeather))
                        }}

                    >
                        <img src="/close.png" alt=""/>
                    </div>
                </div>
            </div>
            <div className={style.chart}>
                <Chart data={weeklyWeather} id={currentWeather.coord.lat.toString()} chartColor={color} />
            </div>
            <div className={style.bottomWrapper}>



                <div className={style.leftBottomWrapper}>

                    <div className={style.temperature}>

                        {celsius && <span> {currentWeather?.main?.temp > 0 ? '+' : ''}{celsius ? currentWeather?.main?.temp.toString().slice(0, 4) : ((currentWeather?.main?.temp * 9 / 5) + 32).toString().slice(0, 4)} </span>}
                        {!celsius && <span> {((currentWeather?.main?.temp * 9 / 5) + 32) > 0 ? '+' : ''}{celsius ? currentWeather?.main?.temp.toString().slice(0, 4) : ((currentWeather?.main?.temp * 9 / 5) + 32).toString().slice(0, 4)} </span>}

                        <p>
                            <span
                                className={style.C}
                                style={{fontWeight: celsius ? 'bold' : ''}}
                                onClick={() => {
                                    setCelsius(true)
                                }}
                            >&#8451;</span>
                            <span className={style.C}> | </span>
                            <span
                                className={style.F}
                                style={{fontWeight: !celsius ? 'bold' : ''}}
                                onClick={() => {
                                    setCelsius(false)
                                }}
                            >&#8457;</span>
                        </p>
                    </div>
                    <div className={style.feel}>
                        {t('feelsLike')}:
                        {celsius && <span> {currentWeather?.main?.feels_like > 0 ? '+' : ''}{celsius ? currentWeather?.main?.feels_like.toString().slice(0, 4) : ((currentWeather?.main?.feels_like * 9 / 5) + 32).toString().slice(0, 4)} </span>}
                        {!celsius && <span> {((currentWeather?.main?.feels_like * 9 / 5) + 32) > 0 ? '+' : ''}{celsius ? currentWeather?.main?.feels_like.toString().slice(0, 4) : ((currentWeather?.main?.feels_like * 9 / 5) + 32).toString().slice(0, 4)} </span>}
                        {celsius ? <span>&#8451;</span> : <span>&#8457;</span>}
                    </div>
                </div>
                <div className={style.rightBottomWrapper}>
                    <div className={style.wind}>
                        <span className={style.WHP}>{t('wind')}</span>: <span
                        className={`${style.valueWHP} ${currentWeather?.main?.temp > 0 ? style.orange : style.blue }`}
                    >{currentWeather?.wind?.speed} {t('shortWind')}</span>
                    </div>
                    <div className={style.humidity}>
                        <span className={style.WHP}>{t('humidity')}</span>: <span
                        className={`${style.valueWHP} ${currentWeather?.main?.temp > 0 ? style.orange : style.blue}`}
                    >{currentWeather?.main?.humidity} %</span>
                    </div>
                    <div className={`${style.pressure} `} >
                        <span className={style.WHP}>{t('pressure')}</span>: <span
                        className={`${style.valueWHP} ${currentWeather?.main?.temp > 0 ? style.orange : style.blue}`}
                    >{currentWeather?.main?.pressure}{t('shortPressure')}</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Card;
