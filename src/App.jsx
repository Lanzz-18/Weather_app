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
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={${API_KEY}}&units=metric`)
    const data = await response.json()
    console.log(data);
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
        {weather ? <p>{weather}</p> : <p>Data unavailable</p>}
        <h2>London, GB</h2>
        <h1>22°C</h1>
        <p>Feels like 20°C</p>
        <p>Humidity: 60%</p>
        <p>Wind: 5.2 m/s</p>
        <p>Clear sky</p>
      </div>
    </>
  )
}

export default App;