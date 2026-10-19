import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faCloudSun, faCloud, faSmog, faCloudRain, faCloudShowersHeavy, faCloudBolt } from "@fortawesome/free-solid-svg-icons";
import { getWeatherForecast } from "../../services/weatherApi.js";



function getForecastDetails(code) {
    if (code === 0) return { condition: "Clear", icon: faSun };
    if (code === 1 || code === 2) return { condition: "Partly cloudy", icon: faCloudSun };
    if (code === 3) return { condition: "Overcast", icon: faCloud };
    if (code === 45 || code === 48) return { condition: "Fog", icon: faSmog };
    if (code >= 51 && code <= 57) return { condition: "Drizzle", icon: faCloudRain };
    if (code >= 61 && code <= 67) return { condition: "Rain", icon: faCloudShowersHeavy };
    if (code >= 71 && code <= 77) return { condition: "Snow", icon: faCloud };
    if (code >= 80 && code <= 82) return { condition: "Rain showers", icon: faCloudShowersHeavy };
    if (code >= 95) return { condition: "Thunderstorm", icon: faCloudBolt };

    return { condition: "Unknown", icon: faCloud };
}



function ForecastStrip() {
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadForecast() {
            try {
                setLoading(true);
                setError("");

                const data = await getWeatherForecast();

                if (isMounted) {
                    setForecast(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError("Weather forecast could not be loaded.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }
        loadForecast();

        return () => {
            isMounted = false;
        };
    }, []);


    
    return (
        <div className="card border-0 shadow rounded-4 mt-4">
            <div className="card-body p-3 p-md-4">
                <h5 className="mb-1 text-success" style={{fontSize: "20px", fontWeight: "750" }}>5-Day Weather Forecast</h5>
                <p className="mb-4 text-secondary" style={{fontSize: "15px"}}>
                    Forecast for Lahore, Pakistan
                </p>

                {loading ? (
                    <p className="text-secondary mb-0">Loading forecast...</p>
                ) : error ? (
                    <p className="text-danger mb-0">{error}</p>
                ) : (
                    <div className="row g-3">
                        {forecast.map((day) => {
                            const details = getForecastDetails(day.weatherCode);

                            return (
                                <div className="col-6 col-md" key={day.date}>
                                    <div className="border rounded-3 p-3 text-center h-100">
                                        <p className="fw-semibold mb-2">
                                            {new Date(`${day.date}T00:00:00`).toLocaleDateString(
                                                "en-US",
                                                { weekday: "short" }
                                            )}
                                        </p>

                                        <p className="text-secondary small mb-2">
                                            {new Date(`${day.date}T00:00:00`).toLocaleDateString(
                                                "en-GB",
                                                { day: "2-digit", month: "short" }
                                            )}
                                        </p>

                                        <FontAwesomeIcon
                                            icon={details.icon}
                                            size="2x"
                                            className="text-success my-2"
                                        />

                                        <p className="small mb-2">{details.condition}</p>

                                        <p className="fw-bold mb-0">
                                            {Math.round(day.maxTemp)}° / {Math.round(day.minTemp)}°
                                        </p>
                                        <p className="text-secondary small mb-0">Max / Min</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ForecastStrip;
