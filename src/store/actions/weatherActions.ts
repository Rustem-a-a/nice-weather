import {IResponseCurrentWeather, IResponseWeeklyWeather} from "../../types/IForecast";
import {ICurrentLocation} from "../../types/Ilocation";

export const GET_CURRENT_WEATHER = 'GET_CURRENT_WEATHER';
export const GET_CURRENT_WEATHER_ASYNC = 'GET_CURRENT_WEATHER_ASYNC';

export const GET_WEEKLY_WEATHER = 'GET_WEEKLY_WEATHER';
export const GET_WEEKLY_WEATHER_ASYNC = 'GET_WEEKLY_WEATHER_ASYNC';
export const getCurrentWeather = (currentWeather: IResponseCurrentWeather) => ({
    type: GET_CURRENT_WEATHER,
    payload: currentWeather
})
export const getCurrentWeathersAsync = (location:ICurrentLocation) => ({
    type: GET_CURRENT_WEATHER_ASYNC,
    payload: location
})

export const getWeeklyWeather = (weeklyWeather: IResponseWeeklyWeather) => ({
    type: GET_WEEKLY_WEATHER,
    payload: weeklyWeather
})
export const getWeeklyWeathersAsync = (placeName:string) => ({
    type: GET_WEEKLY_WEATHER_ASYNC,
    payload: placeName
})
