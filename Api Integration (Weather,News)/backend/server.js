const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* ===============================
   CURRENT WEATHER (UNCHANGED)
================================ */
app.get("/weather/:city", async (req, res) => {
  try {
    const city = req.params.city;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    console.log("City:", city);
    console.log("API KEY Loaded:", !!process.env.API_KEY);

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: process.env.API_KEY,
          units: "metric",
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.log("WEATHER ERROR:", err.response?.data || err.message);

    res.status(err.response?.status || 500).json({
      error: "City not found or API key issue",
    });
  }
});

/* ===============================
   ✅ 5 DAY FORECAST ROUTE
================================ */
app.get("/forecast/:city", async (req, res) => {
  try {
    const city = req.params.city;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: city,
          appid: process.env.API_KEY,
          units: "metric",
        },
      }
    );

    if (!response.data || !response.data.list) {
      throw new Error("Invalid forecast data");
    }

    const forecastList = response.data.list;

    // 🔹 Pick one forecast per day (12:00 PM)
    const dailyForecast = forecastList.filter(item =>
      item.dt_txt.includes("12:00:00")
    );

    // 🔹 Clean data for frontend
    const result = dailyForecast.slice(0, 5).map(item => ({
      date: item.dt_txt,
      temp: item.main.temp,
      feels_like: item.main.feels_like,
      humidity: item.main.humidity,
      weather: item.weather[0].description,
      icon: item.weather[0].icon,
    }));

    res.json({
      city: response.data.city.name,
      forecast: result,
    });
  } catch (err) {
    console.log("FORECAST ERROR:", err.response?.data || err.message);

    res.status(err.response?.status || 500).json({
      error: "Unable to fetch forecast data",
    });
  }
});

/* ===============================
   ✅ NEWS API ROUTE (FIXED)
================================ */
app.get("/news", async (req, res) => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines",
      {
        params: {
          country: "us",
          pageSize: 10,
          apiKey: process.env.NEWS_API_KEY,
        },
      }
    );

    console.log("NEWS COUNT:", response.data.totalResults);

    res.json(response.data);
  } catch (err) {
    console.log("NEWS ERROR:", err.response?.data || err.message);

    res.status(500).json({
      error: "Unable to fetch news",
    });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});