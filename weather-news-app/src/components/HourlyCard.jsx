import React from 'react'
import './HourlyCard.css'

const convertTime = (timeStr) => {
    const utc = new Date(timeStr + " UTC");

    return utc.toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        hour12: true,
    })
}

const HourlyCard = ({ temp, time, weather }) => {
    return (
        <div className="hourly-card">
            <p>Time: {convertTime(time)}</p>
            <p>Temp: {temp}</p>
            <img className="hourly-icon" src={`https://openweathermap.org/img/wn/${weather}@2x.png`}/>
        </div>
    )
}

export default HourlyCard