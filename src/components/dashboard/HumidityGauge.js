import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import { getHumidity } from "../../services/weatherApi.js";


function HumidityGuage() {
    const [humidity, setHumidity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    let status = "Optimal";
    let statusClass = "humidity-optimal";

    if (humidity !== null) {
        if (humidity < 40) {
            status = "Low";
            statusClass = "humidity-low";
        } else if (humidity > 70) {
            status = "High";
            statusClass = "humidity-high";
        }
    }


    useEffect(() => {

        const fetchHumidity = async () => {
            try {
                setLoading(true);
                setError("");

                const humidityValue = await getHumidity();
                setHumidity(humidityValue);
            } catch (err) {
                console.error("Humidity API Error:", err);
                setError("Humidity data could not be loaded.");
            } finally {
                setLoading(false);
            }
        };


        fetchHumidity();

        const interval = setInterval(fetchHumidity, 15 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="card weather-card border-0 h-100">
            <div className="card-body p-4">

                <h3 className="weather-heading mb-4 text-success ">
                    <FontAwesomeIcon icon={faDroplet} className="me-2 text-success" size="lg" />
                    Humidity
                </h3>

                {loading ? (
                    <p className="text-secondary">Loading humidity...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : (
                    <>
                        <div className="humidity-gauge-wrapper">
                            <div className="humidity-gauge"
                                style={{ background: `conic-gradient( ${humidity < 40 ? "#dc3545" : humidity > 70 ? "#e08b18" : "#278447"} ${humidity * 3.6}deg, #e4eee5 ${humidity * 3.6}deg )` }}>
                                <div className="humidity-gauge-inner">
                                    <h2>{humidity}%</h2>
                                    <p>Humidity</p>
                                </div>
                            </div>

                            <h6 className={`humidity-status ${statusClass} mt-3`}>
                                {status}
                            </h6>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default HumidityGuage;