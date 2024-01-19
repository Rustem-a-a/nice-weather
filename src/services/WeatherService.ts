import axios, {AxiosResponse} from "axios";
import {IResponseCurrentWeather, IResponseWeeklyWeather} from "../types/IForecast";
import {ICurrentLocation} from "../types/Ilocation";

class WeatherService {

    static async getCurrentWeather(currentLocation: ICurrentLocation): Promise<AxiosResponse<IResponseCurrentWeather>> {
        return axios.get<IResponseCurrentWeather>(`https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=31db5af111fd6a666d8caf843b208439&units=metric`)
    }


    static async getWeeklyWeather(placeName: string): Promise<AxiosResponse<IResponseWeeklyWeather>> {
        return axios.get<IResponseWeeklyWeather>(`https://api.openweathermap.org/data/2.5/forecast?q=${placeName}&appid=31db5af111fd6a666d8caf843b208439&units=metric`)
    }
}

export default WeatherService