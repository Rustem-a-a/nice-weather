import React, {useEffect, useState} from 'react';
import style from './Card.module.scss'
import {IResponseCurrentWeather, IWeeklyForecast} from "../../types/IForecast";
import Chart from "../Chart/Chart";
import {t} from "i18next";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {changeCurrentPlaceWeather, getWeatherLS} from "../../store/actions/weatherActions";
import dayjs from "dayjs";
import 'dayjs/locale/ru'
import 'dayjs/locale/uk'

interface WeatherChartProps {
    currentWeather: IResponseCurrentWeather;
    weeklyWeather: IWeeklyForecast[];
    isCelsius: boolean;
}

const Card: React.FC<WeatherChartProps> = ({currentWeather, weeklyWeather, isCelsius}) => {
    const [celsius, setCelsius] = useState<boolean>(isCelsius);
    const [color, setColor] = useState<string>(currentWeather?.main?.temp > 0 ? '#fda871' : '#6779c5');
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const weather = useSelector((state: RootState) => state.weather);
    const dispatch = useDispatch();

    useEffect(() => {
        setFirstLoad(false);
        if (!firstLoad) dispatch(changeCurrentPlaceWeather({currentWeather, weeklyWeather, isCelsius: celsius}))
    }, [celsius]);

    const formattedDate = dayjs.unix(currentWeather.dt).format('ddd, D MMMM, HH:mm');
    const closeCard = () => {
        const filteredWeather = weather.filter(value =>
            value.currentWeather.coord.lat !== currentWeather.coord.lat &&
            value.currentWeather.coord.lon !== currentWeather.coord.lon);
        dispatch(getWeatherLS(filteredWeather));
    }

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
                    <div className={style.sun}>
                        <img
                            width={30}
                            height={30}
                            src={`https://openweathermap.org/img/wn/${currentWeather.weather?.[0].icon}@2x.png`}/>
                        <span>{t(currentWeather?.weather?.[0].main)}</span>
                    </div>
                    <div
                        className={style.closeCard}
                        onClick={closeCard}
                    >
                        <img src="/close.png" alt=""/>
                    </div>
                </div>
            </div>
            <div className={style.chart}>
                <Chart
                    data={weeklyWeather}
                    id={currentWeather.coord.lat.toString()}
                    chartColor={color}
                    celsius={celsius}/>
            </div>
            <div className={style.bottomWrapper}>
                <div className={style.leftBottomWrapper}>
                    <div className={style.temperature}>
                        {celsius &&
                            <span> {currentWeather?.main?.temp > 0 ? '+' : ''}{celsius ? currentWeather?.main?.temp.toString().slice(0, 4) : ((currentWeather?.main?.temp * 9 / 5) + 32).toString().slice(0, 4)} </span>}
                        {!celsius &&
                            <span> {((currentWeather?.main?.temp * 9 / 5) + 32) > 0 ? '+' : ''}{celsius ? currentWeather?.main?.temp.toString().slice(0, 4) : ((currentWeather?.main?.temp * 9 / 5) + 32).toString().slice(0, 4)} </span>}
                        <p>
                            <span
                                className={style.C}
                                style={{fontWeight: celsius ? 'bold' : ''}}
                                onClick={() => {setCelsius(true)}}
                            >&#8451;</span>
                            <span className={style.C}> | </span>
                            <span
                                className={style.F}
                                style={{fontWeight: !celsius ? 'bold' : ''}}
                                onClick={() => {setCelsius(false)
                                }}
                            >&#8457;</span>
                        </p>
                    </div>
                    <div className={style.feel}>
                        {t('feelsLike')}:
                        {celsius &&
                            <span> {currentWeather?.main?.feels_like > 0 ? '+' : ''}{celsius ? currentWeather?.main?.feels_like.toString().slice(0, 4) : ((currentWeather?.main?.feels_like * 9 / 5) + 32).toString().slice(0, 4)} &#8451;</span>}
                        {!celsius &&
                            <span> {((currentWeather?.main?.feels_like * 9 / 5) + 32) > 0 ? '+' : ''}{celsius ? currentWeather?.main?.feels_like.toString().slice(0, 4) : ((currentWeather?.main?.feels_like * 9 / 5) + 32).toString().slice(0, 4)} &#8457;</span>}
                    </div>
                </div>

                <div className={style.rightBottomWrapper}>
                    <div className={style.wind}>
                        <span className={style.WHP}>{t('wind')}</span>:
                        <span className={`${style.valueWHP} ${currentWeather?.main?.temp > 0 ? style.orange : style.blue}`}> {currentWeather?.wind?.speed} {t('shortWind')}
                        </span>
                    </div>
                    <div className={style.humidity}>
                        <span className={style.WHP}>{t('humidity')}</span>:
                        <span className={`${style.valueWHP} ${currentWeather?.main?.temp > 0 ? style.orange : style.blue}`}
                    > {currentWeather?.main?.humidity} %</span>
                    </div>
                    <div className={`${style.pressure} `}>
                        <span className={style.WHP}>{t('pressure')}</span>:
                        <span className={`${style.valueWHP} ${currentWeather?.main?.temp > 0 ? style.orange : style.blue}`}
                    > {currentWeather?.main?.pressure}{t('shortPressure')}</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Card;
