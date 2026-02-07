import { useState } from "react";
import axios from "axios";

function Home() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;

    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        `http://localhost:5000/weather/${city}`
      );
      setData(res.data);
    } catch {
      setError("City not found ❌");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    /* 🔥 HERO BACKGROUND */
    <div className="hero">
      <div className="hero-overlay">
        {/* 🔥 WHITE CARD LIKE OPENWEATHER */}
        <div className="hero-card">

          <h1>Weather Dashboard</h1>
          <p>Real-time weather updates for any city</p>

          {/* 🔍 SEARCH BOX (UNCHANGED) */}
          <div className="weather-container">
            <div className="search-box">
              <input
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && getWeather()}
              />
              <button onClick={getWeather}>Search</button>
            </div>

            {loading && <p>⏳ Loading...</p>}
            {error && <p className="error">{error}</p>}

            {data && (
              <div className="weather-info">
                <h2>{data.name}</h2>

                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt="weather"
                />

                <p>🌡️ {data.main.temp}°C</p>
                <p>🤔 Feels Like {data.main.feels_like}°C</p>
                <p>💧 Humidity {data.main.humidity}%</p>
                <p>💨 Wind {data.wind.speed} m/s</p>
                <p>🌥️ {data.weather[0].description}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;