import {put, takeEvery, call} from 'redux-saga/effects'
import WeatherService from "../services/WeatherService";
import {
    GET_CURRENT_WEATHER_ASYNC,
    GET_WEEKLY_WEATHER_ASYNC,
    getCurrentWeather,
    getWeeklyWeather, getWeeklyWeathersAsync
} from "../store/actions/weatherActions";

function*  getCurrentTemperatureWorker(action:any) {
    try {
        console.log(1111111111)
        const {data} = yield call(WeatherService.getCurrentWeather, action.payload)
        console.log(data)
        yield put(getCurrentWeather(data))
    } catch (e: any) {
        console.log(e.response.data)
    }
}

function*  getWeeklyTemperatureWorker(action:any) {
    try {
        console.log(22222222222)
        const {data} = yield call(WeatherService.getWeeklyWeather, action.payload)
        console.log(data)
        yield put(getWeeklyWeather(data))
    } catch (e: any) {
        console.log(e.response.data)
    }
}

export function* weatherWatcher() {
    yield takeEvery(GET_CURRENT_WEATHER_ASYNC, getCurrentTemperatureWorker);
    yield takeEvery(GET_WEEKLY_WEATHER_ASYNC, getWeeklyTemperatureWorker)

}
