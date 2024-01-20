import React, {FC} from 'react';
import Card from "../Card/Card";
import {IResponseCurrentWeather, IWeeklyForecast} from "../../types/IForecast";

interface IProps{
    weather:{
        currentWeather: IResponseCurrentWeather;
        weeklyWeather:IWeeklyForecast[]
        isCelsius:boolean
    }[]
}
const CardWrapper : FC<IProps> = ({weather}) => {
    return (
        <div>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 20,
                justifyContent: 'start',
                margin: 40,
                marginTop: 150
            }}>
                {weather.length > 0 && weather.map((v) =>
                    <Card
                        key={v.currentWeather.coord.lat}
                        currentWeather={v.currentWeather}
                        weeklyWeather={v.weeklyWeather}
                        isCelsius={v.isCelsius}
                    />)}
            </div>
        </div>
    );
};

export default CardWrapper;
