import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun, faCloud, faWind, faCloudRain, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { getCurrentWeather } from "../../services/weatherApi.js";


function getWeatherCondition(code) {
    const conditions = {
        0: "Clear Sky",
        1: "Mainly Clear",
        2: "Partly Cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Fog",
        51: "Light Drizzle",
        53: "Drizzle",
        55: "Heavy Drizzle",
        61: "Light Rain",
        63: "Moderate Rain",
        65: "Heavy Rain",
        80: "Rain Showers",
        81: "Rain Showers",
        82: "Heavy Rain Showers",
        95: "Thunderstorm",
        96: "Thunderstorm",
        99: "Thunderstorm",
    };

    return conditions[code] || "Unknown Condition";
}



function WeatherCard() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Function to fetch weather data
    const fetchWeather = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getCurrentWeather();

            setWeather({
                temperature: data.temperature,
                condition: data.condition,
                wind: data.wind,
                rainChance: data.rainChance,
                updatedAt: data.updatedAt,
            });
        } catch (err) {
            setError("Weather data could not be loaded.");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchWeather();
    }, []);

    if (loading) {
        return (
            <div className="card weather-card border-0 shadow-sm p-4">
                <p className="mb-0">Loading weather...</p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="card weather-card border-0 shadow-sm p-4">
                <p className="text-danger mb-0">{error}</p>
                <button
                    className="btn btn-outline-success mt-3"
                    onClick={fetchWeather}
                >
                    Try Again
                </button>
            </div>
        );
    }



    return (
        <div className="card weather-card border-0 h-100">
            <div className="card-body p-4">

                {/* Card Heading */}
                <h3 className="weather-heading mb-4 text-success">
                    <FontAwesomeIcon icon={faCloudSun} className="me-2 text-success" size="lg" />
                    Live Weather
                </h3>

                {/* Temperature and Location */}
                <div className="d-flex justify-content-between align-items-center gap-3 mx-2">

                    <div>
                        <h1 className="weather-temp mb-0 ">
                            {weather.temperature}°C
                        </h1>
                    </div>

                    <div className="text-end weather-location mt-3">
                        <p className="fw-semibold mb-1">
                            <FontAwesomeIcon icon={faLocationDot} className="me-2" />
                            Lahore, Pakistan
                        </p>

                        <p className="text-secondary mb-0">
                            {new Date(weather.updatedAt).toLocaleDateString(
                                "en-PK",
                                {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                    timeZone: "Asia/Karachi"
                                }
                            )}
                        </p>
                    </div>
                </div>

                <hr className="weather-divider my-3" />

                {/* Weather Details */}
                <div className="row g-5 mx-1">

                    <div className="col-4">
                        <div className="weather-detail d-flex align-items-center gap-2">
                            <FontAwesomeIcon icon={faCloud} className="weather-detail-icon mb-0" />
                            <div>
                                <h6 className="mb-0">{getWeatherCondition(weather.condition)}</h6>
                                <p className="weather-detail-label mb-0">Condition</p>
                            </div>

                        </div>
                    </div>

                    <div className="col-4">
                        <div className="weather-detail d-flex align-items-center gap-2">
                            <FontAwesomeIcon icon={faWind} className="weather-detail-icon mb-0" />
                            <div>
                                <h6 className="mb-0">{weather.wind} km/h</h6>
                                <p className="weather-detail-label  mb-0">Wind</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="weather-detail d-flex align-items-center gap-2">
                            <FontAwesomeIcon icon={faCloudRain} className="weather-detail-icon mb-0" />
                            <div>
                                <h6 className="mb-0">
                                    {weather.rainChance !== null
                                        ? `${weather.rainChance}%`
                                        : "N/A"}
                                </h6>
                                <p className="weather-detail-label mb-0">Rain</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

}

export default WeatherCard;