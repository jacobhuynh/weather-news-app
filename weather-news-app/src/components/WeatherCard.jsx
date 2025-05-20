import React from 'react'
import './WeatherCard.css'

const convertDay = (dtStr) => {
    const date = new Date(dtStr * 1000);
    return date.toLocaleDateString("en-US", { weekday: "long" });
};
  

const WeatherCard = ({ temp, high, low, weather, day }) => {
    return (
        <div className="weather-card">
            <p>{convertDay(day)}</p>
            <p>Temp: {temp}</p>
            <p>High: {high}</p>
            <p>Low: {low}</p>
            <img className="hourly-icon" src={`https://openweathermap.org/img/wn/${weather}@2x.png`}/>
        </div>
    )
}

export default WeatherCard