# 🌦️ Weather & News Dashboard (API Integration Project)

A full-stack style web dashboard that integrates **Weather API** and **News API** to provide real-time weather updates and the latest news headlines in one place.

This project demonstrates **API integration, asynchronous data fetching, state management, and responsive UI design** using React.

---

🚀 Features

👤 User Features

Browse real-time weather information
Search weather by city name
View temperature, humidity, wind speed, and conditions
Toggle temperature unit (°C / °F)
View latest news headlines
Category-based news (Tech, Sports, Business, etc.)
Responsive dashboard layout
Profile page for preferences
Fast loading with API calls

---

🛠 Core Functionalities

🌦 Weather Module

Current temperature
Weather conditions
Humidity
Wind speed
City-based search
Unit conversion (°C / °F)

📰 News Module

Top headlines
Category filtering
Dynamic API fetching
Live updates

⚙ Additional

Loading states
Error handling
Clean UI cards
Component-based structure

---

🧰 Tech Stack

Frontend

React.js
React Router DOM
JavaScript (ES6+)
HTML5
CSS3

API Integration

OpenWeatherMap API
NewsAPI

Tools

Fetch / Axios
Vite / Create React App

---

🔌 API Endpoints Used

Weather API

GET /weather?q={city}
→ Fetch weather details for city

News API

GET /top-headlines?country=in
→ Fetch latest headlines

GET /top-headlines?category={type}
→ Fetch category news

---

🧪 Demo Flow

User opens homepage
Searches city for weather
Views temperature & conditions
Reads latest news headlines
Navigates to profile page
Changes temperature unit preference
Dashboard updates instantly

---

▶️ How to Run Locally

1️⃣ Clone Repository

git clone https://github.com/your-username/weather-news-dashboard.git

2️⃣ Install Dependencies

cd frontend
npm install

3️⃣ Add API Keys

Create `.env` file:

REACT_APP_WEATHER_API_KEY=your_key_here  
REACT_APP_NEWS_API_KEY=your_key_here  

4️⃣ Start App

npm run dev

Frontend runs at:
http://localhost:5173

---

📂 Project Structure

src/
 ├── components/
 │   ├── WeatherCard.jsx
 │   ├── NewsCard.jsx
 │   ├── Header.jsx
 ├── pages/
 │   ├── Home.jsx
 │   ├── Profile.jsx
 ├── services/
 │   ├── weatherApi.js
 │   ├── newsApi.js
 ├── App.jsx
 ├── main.jsx

---

📸 Screens Included

Home dashboard (Weather + News)
City search results
News headlines section
Profile page with unit toggle

(Add screenshots here)

---

🧠 Learning Outcomes

API integration with React
Handling asynchronous requests
State management
Component-based architecture
Routing with React Router
Environment variables for API keys
Responsive UI design
Error handling & loading states

---

🚧 Future Improvements

Auto location detection (GPS)
Dark/Light mode
Save favorite cities
Bookmark news articles
User authentication
Push notifications
PWA support
Backend integration with database


💡 Conclusion

This Weather & News Dashboard demonstrates real-world API integration and modern frontend development practices.  
It highlights strong fundamentals in React, REST API consumption, and building responsive user interfaces, making it a practical example of a production-style dashboard application.

This project reflects my hands-on experience in developing dynamic applications that fetch, process, and display live data effectively.


