import { useState } from "react";
import axios from "axios";

function Forecast() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getForecast = async () => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError("");
      setForecast([]);
      setLocation("");

      const res = await axios.get(
        `http://localhost:5000/forecast/${city}`
      );

      // ✅ Defensive checks (IMPORTANT)
      if (!res.data || !res.data.forecast || !Array.isArray(res.data.forecast)) {
        throw new Error("Invalid forecast data");
      }

      setForecast(res.data.forecast);
      setLocation(res.data.city);
    } catch (err) {
      console.error("Forecast error:", err);
      setError("Unable to fetch forecast ❌");
      setForecast([]);
      setLocation("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>📅 5-Day Forecast</h2>

        {/* 🔹 City Input */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city (e.g. Mumbai)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getForecast()}
          />
          <button onClick={getForecast}>Search</button>
        </div>

        {loading && <p className="loading">⏳ Loading...</p>}
        {error && <p className="error">{error}</p>}

        {/* 🔹 Location Name */}
        {location && <h3>📍 {location}</h3>}

        {/* 🔹 Forecast Cards */}
        <div className="forecast-container">
          {forecast.map((day, index) => (
            <div className="forecast-card" key={index}>
              <p className="day">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>

              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.weather}
              />

              <p className="temp">{Math.round(day.temp)}°C</p>
              <p className="desc">{day.weather}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Forecast;