
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

const LATITUDE = 31.5204;
const LONGITUDE = 74.3587;

async function fetchWeatherData(params) {
    const queryParams = new URLSearchParams({
        latitude: LATITUDE.toString(),
        longitude: LONGITUDE.toString(),
        timezone: "Asia/Karachi",
        ...params,
    });

    const response = await fetch(
        `${WEATHER_API_URL}?${queryParams.toString()}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
    }

    return response.json();
}


// Function to get Current Weather Details 
export async function getCurrentWeather() {
    const data = await fetchWeatherData({
        current:
            "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m",
        hourly: "precipitation_probability",
    });

    const currentHour = data.current.time.slice(0, 13);

    const hourIndex = data.hourly.time.findIndex((time) =>
        time.startsWith(currentHour)
    );

    return {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        condition: data.current.weather_code,
        wind: data.current.wind_speed_10m,
        rainChance:
            hourIndex !== -1
                ? data.hourly.precipitation_probability[hourIndex]
                : null,
        updatedAt: data.current.time,
    };
}


// Function to get humidity Values 
export async function getHumidity() {
    const data = await fetchWeatherData({
        current: "relative_humidity_2m",
    });

    return data.current.relative_humidity_2m;
}


// Function o get next 5 days Forecast 
export async function getWeatherForecast() {
    const data = await fetchWeatherData({
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
        forecast_days: "5",
    });

    if (
        !data.daily?.time ||
        !data.daily?.temperature_2m_max ||
        !data.daily?.temperature_2m_min ||
        !data.daily?.weather_code
    ) {
        throw new Error("Forecast data is incomplete.");
    }

    return data.daily.time.map((date, index) => ({
        date,
        maxTemp: data.daily.temperature_2m_max[index],
        minTemp: data.daily.temperature_2m_min[index],
        weatherCode: data.daily.weather_code[index],
    }));
}
