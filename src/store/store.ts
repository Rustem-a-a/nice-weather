import {applyMiddleware, combineReducers} from 'redux';
import {legacy_createStore as createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {rootWatcher} from "../saga";
import {IResponseCurrentWeather, IResponseWeeklyWeather} from "../types/IForecast";
import weatherReducer from "./reducers/weatherReducer";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    weather: weatherReducer
})

const store = createStore(rootReducer as any, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootWatcher)

export interface RootState {
    weather: {
        currentWeather: IResponseCurrentWeather;
        weeklyWeather: IResponseWeeklyWeather;
    },
}

export type Dispatch = typeof store.dispatch

export default store