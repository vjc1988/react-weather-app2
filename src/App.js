import React, { useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  let [city, setCity] = useState(null);
  let [weatherData, setWeatherData] = useState(null);

  function showWeather(response) {
    setWeatherData(response.data);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a95c2c6739994ba4903e007ee817e7d1`;
    axios.get(apiURL).then(showWeather);
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter a City..."
          onChange={updateCity}
        />
        <input type="submit" />
      </form>
      {weatherData && (
        <ul>
          <li>
            Temperature:
            {Math.round(weatherData.main.temp)}°C
          </li>
          <li>Description: {weatherData.weather[0].description}</li>
          <li>Humidity: {weatherData.main.humidity}%</li>
          <li>Wind: {weatherData.wind.speed}km/h</li>
          <li>
            <img
              alt="weather-img"
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            />
          </li>
        </ul>
      )}
    </div>
  );
}
