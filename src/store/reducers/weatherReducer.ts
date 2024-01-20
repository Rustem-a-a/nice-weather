import {IResponseCurrentWeather, IWeeklyForecast} from "../../types/IForecast";
import {
    CHANGE_CURRENT_PLACE_WEATHER,
    GET_CURRENT_WEATHER,
    GET_WEATHER_LS,
    GET_WEEKLY_WEATHER
} from "../actions/weatherActions";


const initialState: {
    currentWeather: IResponseCurrentWeather;
    weeklyWeather: IWeeklyForecast[]
    isCelsius: boolean
}[] = []

const weatherReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_WEATHER_LS:
            return [...action.payload]

        case GET_CURRENT_WEATHER:
            const placeIndex = state.findIndex(v =>
                v.currentWeather.coord.lat === action.payload.currentWeather.coord.lat &&
                v.currentWeather.coord.lon === action.payload.currentWeather.coord.lon)
            if (placeIndex === -1) {
                return [action.payload,...state]
            } else {
                const data = state.map((v: {
                    currentWeather: IResponseCurrentWeather;
                    weeklyWeather: IWeeklyForecast[];
                    isCelsius: boolean;
                }) => {
                    if (v.currentWeather.coord.lat === action.payload.currentWeather.coord.lat) {
                        return action.payload
                    } else {
                        return v
                    }
                })
                return [...data]
            }

        case CHANGE_CURRENT_PLACE_WEATHER:
            const data = state.map((v: {
                currentWeather: IResponseCurrentWeather;
                weeklyWeather: IWeeklyForecast[];
                isCelsius: boolean;
            }) => {
                if (v.currentWeather.coord.lat === action.payload.currentWeather.coord.lat) {
                    return action.payload
                } else {
                    return v
                }
            })
            return [...data]
        default:
            return state
    }
}

export default weatherReducer


//
//
// import {IResponseCurrentWeather, IResponseWeeklyWeather, IWeeklyForecast} from "../../types/IForecast";
// import {GET_CURRENT_WEATHER, GET_WEEKLY_WEATHER} from "../actions/weatherActions";
//
//
// const initialState: {
//     currentWeather: IResponseCurrentWeather;
//     weeklyWeather:IWeeklyForecast[]
// } = {
//     currentWeather: {} as IResponseCurrentWeather,
//     weeklyWeather:{} as IWeeklyForecast[]
// }
//
// const weatherReducer = (state = initialState, action: any) => {
//     switch (action.type) {
//         case GET_CURRENT_WEATHER:
//             return {...state, currentWeather: action.payload}
//         case GET_WEEKLY_WEATHER:
//             return {...state, weeklyWeather: action.payload}
//         default:
//             return state
//     }
// }
//
// export default weatherReducer





