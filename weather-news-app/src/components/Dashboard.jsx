import React from 'react'
import { useState, useEffect } from 'react'
import LocationForm from './LocationForm'
import WeatherCard from './WeatherCard'
import HourlyCard from './HourlyCard'
import NewsCard from './NewsCard'
import './Dashboard.css'

function Dashboard() {
    const weatherKey = import.meta.env.VITE_WEATHER_KEY;
    const newsKey = import.meta.env.VITE_NEWS_KEY;

    const [userData, setUserData] = useState(null);
    const [locationData, setLocationData] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [hourlyForecast, setHourlyForecast] = useState(null);
    const [dailyForecast, setDailyForecast] = useState(null);
    const [newsData, setNewsData] = useState(null);

    useEffect(() => {
        if (!userData) {
            return;
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userData.city},${userData.state},${userData.country}&limit=5&appid=${weatherKey}`);
                const data = await response.json();
                setLocationData(data);
            } catch (error) {
                console.error("Error fetching location data: ", error)
            }
        }
        fetchData();
    }, [userData, weatherKey])

    useEffect(() => {
        if (!locationData) {
            return;
        }
        const fetchData = async () => {
            try {
                const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData[0].lat}&lon=${locationData[0].lon}&units=imperial&appid=${weatherKey}`)
                const currentData = await currentResponse.json();
                setCurrentWeather(currentData);

                const hourlyResponse = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${locationData[0].lat}&lon=${locationData[0].lon}&cnt=24&units=imperial&appid=${weatherKey}`)
                const hourlyData = await hourlyResponse.json();
                setHourlyForecast(hourlyData);

                const dailyResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${locationData[0].lat}&lon=${locationData[0].lon}&cnt=7&units=imperial&appid=${weatherKey}`)
                const dailyData = await dailyResponse.json();
                setDailyForecast(dailyData);
            } catch (error) {
                console.error("Error fetching weather data: ", error)
            }
        }
        fetchData();
    }, [locationData, weatherKey])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentResponse = await fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${newsKey}`)
                const currentData = await currentResponse.json();
                setNewsData(currentData);
            } catch (error) {
                console.error("Error fetching news: ", error)
            }
        }
        fetchData();
    }, [newsKey])

    const handleUserData = (data) => {
        setUserData(data);
    }

    return (
        <div>
            <h1>Weather and News</h1>
            {locationData ? (
                <>
                    <h2>{locationData[0].name}, {locationData[0].state}</h2>
                    <div className="rowdiv">
                        <h3 className="lonlatelement">Longitude: {locationData[0].lon}</h3>
                        <h3 className="lonlatelement">Lattitude: {locationData[0].lat}</h3>
                    </div>
                    <div>
                        {currentWeather ? (
                            <>
                                <h3>Current Weather</h3>
                                <div className="rowdiv">
                                    <WeatherCard temp={currentWeather.main.temp} high={currentWeather.main.temp_max} low={currentWeather.main.temp_min} weather={currentWeather.weather[0].icon} day={currentWeather.dt}/>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div>
                        {hourlyForecast ? (
                            <>
                                <h3>Hourly Forecast</h3>
                                <div className="scroll-box">
                                    {hourlyForecast.list
                                        .map((hourlyData, index) => (
                                            <HourlyCard key={index} temp={hourlyData.main.temp} time={hourlyData.dt_txt} weather={hourlyData.weather[0].icon}/>
                                        ))
                                    }
                                    {console.log(hourlyForecast)}
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div>
                        {dailyForecast ? (
                            <>
                                <h3>Daily Forecast</h3>
                                <div className="rowdiv">
                                    {dailyForecast.list
                                        .map((dayData, index) => (
                                            <WeatherCard key={index} temp={dayData.temp.day} high={dayData.temp.max} low={dayData.temp.min} weather={dayData.weather[0].icon} day={dayData.dt}/>
                                        ))
                                    }
                                </div>
                                {console.log(dailyForecast)}
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </>
            ) : (
                <div className="rowdiv">
                    <LocationForm handleUserData={handleUserData}/>
                </div>
            )}
            <>
                {newsData ? (
                    <>
                        <h1>News</h1>
                        <div className="rowdiv">
                            {newsData.results.slice(0, 5)
                                .map((news, index) => {
                                    const hasImage = news.media && news.media.length > 0 && news.media[0]["media-metadata"];
                                    const imageUrl = hasImage ? news.media[0]["media-metadata"][0].url : null;
                                    return (
                                        <NewsCard key={index} title={news.title} author={news.source} description={news.abstract} image={imageUrl} link={news.url}/>
                                    )
                                })
                            }
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </>
        </div>
    )
}

export default Dashboard