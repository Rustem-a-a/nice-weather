import exp from "constants";

interface IWeeklyForecast {
    date: string;
    temperature: number;
}

export interface Card {
    place: string;
    date: string;
    country: string
    sky: string;
    chart: IWeeklyForecast[];
    temperature: string;
    unit: string;
    temperatureLike: string;
    wind: string;
    humidity: string;
    pressure: string;
}

export interface IResponseCurrentWeather {
    "coord": {
        "lon": number,
        "lat": number
    },
    "weather": [
        {
            "id": number,
            "main": string,
            "description": string,
            "icon": string
        }
    ],
    "base": string,
    "main": {
        "temp": number,
        "feels_like": number,
        "temp_min": number,
        "temp_max": number,
        "pressure": number,
        "humidity": number,
        "sea_level": number,
        "grnd_level": number
    },
    "visibility": number,
    "wind": {
        "speed": number,
        "deg": number,
        "gust": number
    },
    "rain": {
        "1h": number
    },
    "clouds": {
        "all": number
    },
    "dt": number,
    "sys": {
        "type": number,
        "id": number,
        "country": string,
        "sunrise": number,
        "sunset": number
    },
    "timezone": number,
    "id": number,
    "name": string,
    "cod": number
}
export interface IResponseWeeklyWeather{

    "cod": string,
    "message": number,
    "cnt": number,
    "list":
    {
        "dt": number,
        "main": {
            "temp": number,
            "feels_like": number,
            "temp_min": number,
            "temp_max": number,
            "pressure": number,
            "sea_level": number,
            "grnd_level": number,
            "humidity": number,
            "temp_kf": number
        },
        "weather":
            {
                "id": number,
                "main": string,
                "description": string,
                "icon": string
            }[]
        ,
        "clouds": {
            "all": number
        },
        "wind": {
            "speed": number,
            "deg": number,
            "gust": number
        },
        "visibility": number,
        "pop": number,
        "snow": {
            "3h": number
        },
        "sys": {
            "pod": string
        },
        "dt_txt": string
    }[],
    "city": {
    "id": number,
        "name": string,
        "coord": {
        "lat": number,
            "lon": number
    },
    "country": string,
        "population": number,
        "timezone": number,
        "sunrise": number,
        "sunset": number
}
}