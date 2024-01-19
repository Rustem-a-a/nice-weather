import React, {useState} from 'react';
import style from './Card.module.scss'
import {IResponseCurrentWeather, IWeeklyForecast} from "../../types/IForecast";
import Chart from "../Chart/Chart";
import {t} from "i18next";

interface WeatherChartProps {
    currentWeather: IResponseCurrentWeather;
    weeklyWeather: IWeeklyForecast[];
}

const Card: React.FC<WeatherChartProps> = ({currentWeather, weeklyWeather}) => {
    const [celsius, setCelsius] = useState<boolean>(true);
    const [fahrenheit, setFahrenheit] = useState<boolean>(false);
    return (
        <div className={style.wrapper}>
            <div className={style.topWrapper}>
                <div className={style.leftTopWrapper}>
                    <div className={style.place}>
                        {currentWeather?.name},{currentWeather?.sys?.country}
                    </div>
                    <div className={style.date}>
                        {new Date(currentWeather?.dt).toDateString()}
                    </div>
                </div>
                <div className={style.rightTopWrapper}>
                    {currentWeather?.weather?.[0]?.main !== 'clear'
                        ? <div className={style.sun}>
                            <img width={30} height={30}
                                 src={`https://openweathermap.org/img/wn/${currentWeather.weather?.[0].icon}@2x.png`}/>
                            <span>{t(currentWeather?.weather?.[0].main)}</span>
                        </div>
                        : <div className={style.sun}><
                            img width={30} height={30}
                                src={`https://openweathermap.org/img/wn/${currentWeather.weather?.[0].icon}`}/>
                            <span>{t('cloudy')}</span>
                        </div>}
                    <div className={style.closeCard}>
                        <img src="/close.png" alt=""/>
                    </div>
                </div>
            </div>
            <div className={style.chart}>
                <Chart data={weeklyWeather}/>
            </div>
            <div className={style.bottomWrapper}>
                <div className={style.leftBottomWrapper}>
                    <div className={style.temperature}>
                        <h1> {currentWeather?.main?.temp > 0 ? '+' : '-'}{celsius ? currentWeather?.main?.temp.toString().slice(0, 4) : ((currentWeather?.main?.temp * 9 / 5) + 32).toString().slice(0, 4)} </h1>
                        <p>
                            <span
                                className={style.C}
                                style={{fontWeight: celsius ? 'bold' : ''}}
                                onClick={() => {
                                    setCelsius(true)
                                    setFahrenheit(false)
                                }}
                            >&#8451;</span>
                            <span> | </span>
                            <span
                                className={style.F}
                                style={{fontWeight: fahrenheit ? 'bold' : ''}}
                                onClick={() => {
                                    setCelsius(false)
                                    setFahrenheit(true)
                                }}
                            >&#8457;</span>
                        </p>
                    </div>
                    <div className={style.feel}>
                    </div>
                </div>
                <div className={style.rightBottomWrapper}>
                    <div className={style.wind}>
                        <span className={style.WHP}>{t('wind')}</span>: <span
                        className={style.valueWHP}
                        style={{color: currentWeather?.main?.temp ? 'orange' : 'blue'}}
                    >{currentWeather?.wind?.speed} {t('shortWind')}</span>
                    </div>
                    <div className={style.humidity}>
                        <span className={style.WHP}>{t('humidity')}</span>: <span
                        className={style.valueWHP}
                        style={{color: currentWeather?.main?.temp ? 'orange' : 'blue'}}
                    >{currentWeather?.main?.humidity} %</span>
                    </div>
                    <div className={style.pressure}>
                        <span className={style.WHP}>{t('pressure')}</span>: <span
                        className={style.valueWHP}
                        style={{color: currentWeather?.main?.temp ? 'orange' : 'blue'}}
                    >{currentWeather?.main?.pressure}{t('shortPressure')}</span>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Card;
