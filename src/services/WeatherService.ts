import axios, {AxiosResponse} from "axios";
import {IResponseCurrentWeather, IResponseWeeklyWeather} from "../types/IForecast";
import {ICurrentLocation} from "../types/Ilocation";
import {OPEN_WEATHER_MAP_API_KEY} from '../API_KEY';

class WeatherService {

    static async getCurrentWeather(currentLocation: ICurrentLocation): Promise<AxiosResponse<IResponseCurrentWeather>> {
        return axios.get<IResponseCurrentWeather>(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric`)
    }


    static async getWeeklyWeather(placeName: string): Promise<AxiosResponse<IResponseWeeklyWeather>> {
        return axios.get<IResponseWeeklyWeather>(`https://api.openweathermap.org/data/2.5/forecast?q=${placeName}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric`)
    }
}

export default WeatherService