import {IResponseCurrentWeather, IResponseWeeklyWeather} from "../../types/IForecast";
import {GET_CURRENT_WEATHER, GET_WEEKLY_WEATHER} from "../actions/weatherActions";


const initialState: {
    currentWeather: IResponseCurrentWeather;
    weeklyWeather:IResponseWeeklyWeather
} = {
    currentWeather: {} as IResponseCurrentWeather,
    weeklyWeather:{} as IResponseWeeklyWeather
}

const weatherReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_CURRENT_WEATHER:
            return {...state, currentWeather: action.payload}
        case GET_WEEKLY_WEATHER:
            return {...state, weeklyWeather: action.payload}
        default:
            return state
    }
}

export default weatherReducer