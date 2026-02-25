import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
 
  /* Data to display
  🌤 London, GB

  22°C
  Feels like 20°C
  
  Humidity: 60%
  Wind: 5.2 m/s
  Description: Clear sky
  */

  // Connecting to API
  const fetchWeather = async () => {
    const API_KEY = "6b9a72b145d1b6e8edf8236ef30ccf6e"
    const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`)
    const geoData = await geoResponse.json()
    const { lat, lon } = geoData[0]

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    const weatherData = await weatherResponse.json()
    
    setWeather(weatherData)
    console.log(weatherData);
  }

  return(
    <>
      <div className="search-group">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>
      <div className="weather-display">
        {weather ? (
          <>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <h1>{(weather.main.temp).toFixed(1)}°C</h1>
            <p>Feels like {(weather.main.feels_like).toFixed(1)}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            <p>{(weather.weather[0].description).charAt(0).toUpperCase()}{(weather.weather[0].description).slice(1)}</p>
          </>
        ) : (
          <p>Data unavailable</p>
        )}  
      </div>
    </>
  )
}

export default App;