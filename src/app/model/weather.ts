export interface Weather {
    location: Location
    details: Details
}

export interface Location {
    name: string,
    country: string,
    lat: number,
    lon: number,
    timezone: number
}
export interface Details {
    weather_main: String,
    weather_description: String,
    feelslike: number,
    temp:number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    cloud: number,
    wind_deg: number
    wind_gust: number,
    wind_speed: number,
    wind_dir: number,
    visibility: number,
    sunrise: number,
    sunset: number
}

export interface Forecast {
    dt_txt: string;
    list: Array<Weather>;
}

