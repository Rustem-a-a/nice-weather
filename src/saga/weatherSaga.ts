import {put, takeEvery, call} from 'redux-saga/effects'
import WeatherService from "../services/WeatherService";
import {
    GET_CURRENT_WEATHER_ASYNC,
    GET_WEEKLY_WEATHER_ASYNC,
    getCurrentWeather, getWeatherLS,
    getWeeklyWeather, getWeeklyWeathersAsync
} from "../store/actions/weatherActions";
import {IResponseCurrentWeather, IResponseWeeklyWeather, IWeeklyForecast} from "../types/IForecast";

function* getCurrentTemperatureWorker(action: any) {
    try {
        const {data} = yield call(WeatherService.getCurrentWeather, action.payload)
        const response: { data: { list: [] } } = yield call(WeatherService.getWeeklyWeather, data.name)
        const newData: IWeeklyForecast[] = response?.data?.list.map((v: any) => ({
            date: v.dt as string,
            temperature: v.main.temp as number
        }))
        const weather: {
            currentWeather: IResponseCurrentWeather,
            weeklyWeather: IWeeklyForecast[],
            isCelsius: boolean
        } = {currentWeather: data, weeklyWeather: newData, isCelsius: true}
        yield put(getCurrentWeather(weather))
    } catch (e: any) {
        console.log(e.response.data)
    }
}

function* getWeeklyTemperatureWorker(action: any) {
    try {
        const {data} = yield call(WeatherService.getWeeklyWeather, action.payload)
        const newData = data.list.map((v: any) => ({date: v.dt as string, temperature: v.main.temp as number}))
        // console.log(newData)
        yield put(getWeeklyWeather(newData))
    } catch (e: any) {
        console.log(e.response.data)
    }
}

export function* weatherWatcher() {
    yield takeEvery(GET_CURRENT_WEATHER_ASYNC, getCurrentTemperatureWorker);
    yield takeEvery(GET_WEEKLY_WEATHER_ASYNC, getWeeklyTemperatureWorker)

}






