import {IResponseCurrentWeather, IWeeklyForecast} from "../../types/IForecast";
import {
    CHANGE_CURRENT_PLACE_WEATHER,
    GET_CURRENT_WEATHER,
    GET_WEATHER_LS
} from "../actions/weatherActions";

const initialState: {
    currentWeather: IResponseCurrentWeather;
    weeklyWeather: IWeeklyForecast[];
    isCelsius: boolean;
}[] = []

const weatherReducer = (state = initialState, action: any) => {
    const lat = action?.payload?.currentWeather?.coord?.lat,
        lon = action?.payload?.currentWeather?.coord?.lon;

    switch (action.type) {
        case GET_WEATHER_LS:
            return [...action.payload]

        case GET_CURRENT_WEATHER:
            const placeIndex = state.findIndex((v) => {
                const stateLat = v?.currentWeather?.coord?.lat,
                    stateLon = v?.currentWeather?.coord?.lon;

                return stateLat === lat && stateLon === lon;
            })
            if (placeIndex === -1) {
                return [action.payload, ...state]
            } else {
                const data = state.map((v: {
                    currentWeather: IResponseCurrentWeather;
                    weeklyWeather: IWeeklyForecast[];
                    isCelsius: boolean;
                }) => {
                    const stateLat = v?.currentWeather?.coord?.lat,
                        stateLon = v?.currentWeather?.coord?.lon;

                    if (stateLat === lat && stateLon === lon) {
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
                const stateLat = v?.currentWeather?.coord?.lat,
                    stateLon = v?.currentWeather?.coord?.lon;

                if (stateLat === lat && stateLon === lon) {
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