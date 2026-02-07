import { useState } from "react";
import axios from "axios";
import "./App.css";

/* 🔹 React Router */
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

/* ✅ News Page Import (Step 2) */
import News from "./pages/News";

/* 🔹 Profile Page */
const Profile = ({ city, unit, dark }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Weather App User");

  return (
    <div className={dark ? "page dark-bg" : "page"}>
      <div className="card profile-card">
        <h2>👤 Profile</h2>

        <div className="profile-info">
          <p>
            <strong>Name:</strong>{" "}
            {editing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              name
            )}
          </p>

          <p>
            <strong>Last Searched City:</strong>{" "}
            {city ? city : "Not searched yet"}
          </p>

          <p>
            <strong>Preferred Unit:</strong>{" "}
            {unit === "metric"
              ? "Celsius (°C)"
              : "Fahrenheit (°F)"}
          </p>

          <p>
            <strong>Theme:</strong>{" "}
            {dark ? "Dark Mode 🌙" : "Light Mode 🌞"}
          </p>
        </div>

        <div className="profile-actions">
          {editing ? (
            <button onClick={() => setEditing(false)}>💾 Save</button>
          ) : (
            <button onClick={() => setEditing(true)}>
              ✏️ Edit Profile
            </button>
          )}

          <button onClick={() => alert("Logged out!")}>
            🚪 Logout
          </button>
        </div>

        <p className="profile-note">
        </p>
      </div>
    </div>
  );
};

/* 🔹 Forecast Page */
const Forecast = ({ dark }) => {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getForecast = async () => {
    if (!city) return;

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `http://localhost:5000/forecast/${city}`
      );

      setForecast(res.data.forecast);
    } catch {
      setError("Forecast not found ❌");
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={dark ? "page dark-bg" : "page"}>
      <div className="card">
        <h2>📅 5-Day Forecast</h2>

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getForecast()}
        />

        <button onClick={getForecast}>Get Forecast</button>

        {loading && <p className="loading">⏳ Loading...</p>}
        {error && <p className="error">{error}</p>}

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
                alt="weather"
              />

              <p className="temp">{Math.round(day.temp)}°C</p>
              <p>{day.weather}</p>
              <p>💧 {day.humidity}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);
  const [unit, setUnit] = useState("metric");

  const getWeather = async () => {
    if (!city) return;

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `http://localhost:5000/weather/${city}?unit=${unit}`
      );

      setData(res.data);
    } catch {
      setError("City not found ❌");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const getLocationWeather = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported ❌");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        setLoading(true);
        setError("");

        const { latitude, longitude } = pos.coords;

        const res = await axios.get(
          `http://localhost:5000/weather/location?lat=${latitude}&lon=${longitude}&unit=${unit}`
        );

        setData(res.data);
      } catch {
        setError("Unable to fetch location weather ❌");
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <Router>
      {/* 🔹 NAVBAR */}
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/forecast">Forecast</Link>
        <Link to="/profile">Profile</Link>
        {/* ✅ Step 4: News Link */}
        <Link to="/news">News</Link>
      </nav>

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <div className={dark ? "hero dark-bg" : "hero"}>
              <div className="hero-overlay">
                <div className="hero-card">
                  <div className="header">
                    <h1>Weather Dashboard</h1>

                    <button
                      className="mode-btn"
                      onClick={() => setDark(!dark)}
                    >
                      {dark ? "🌞" : "🌙"}
                    </button>

                    <button
                      className="mode-btn"
                      onClick={() =>
                        setUnit(unit === "metric" ? "imperial" : "metric")
                      }
                    >
                      {unit === "metric" ? "°F" : "°C"}
                    </button>
                  </div>

                  <div className="search-box">
                    <input
                      type="text"
                      placeholder="Enter city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && getWeather()
                      }
                    />

                    <button onClick={getWeather}>Search</button>

                    <button
                      className="location-btn"
                      onClick={getLocationWeather}
                    >
                      📍 My Location
                    </button>
                  </div>

                  {loading && <p className="loading">⏳ Loading...</p>}
                  {error && <p className="error">{error}</p>}

                  {data && (
                    <div className="weather-info">
                      <h2>{data.name}</h2>

                      <img
                        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                        alt="weather"
                      />

                      <p>
                        🌡️ Temp: {data.main.temp}°
                        {unit === "metric" ? "C" : "F"}
                      </p>

                      <p>
                        🥵 Feels Like: {data.main.feels_like}°
                        {unit === "metric" ? "C" : "F"}
                      </p>

                      <p>💧 Humidity: {data.main.humidity}%</p>
                      <p>💨 Wind: {data.wind.speed} m/s</p>
                      <p>☁️ {data.weather[0].description}</p>

                      <p>
                        ⏰ Updated:{" "}
                        {new Date(
                          data.dt * 1000
                        ).toLocaleTimeString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          }
        />

        <Route
          path="/forecast"
          element={<Forecast dark={dark} />}
        />

        <Route
          path="/profile"
          element={
            <Profile city={city} unit={unit} dark={dark} />
          }
        />

        {/* ✅ Step 3: News Route */}
        <Route
          path="/news"
          element={<News dark={dark} />}
        />
      </Routes>
    </Router>
  );
}

export default App;