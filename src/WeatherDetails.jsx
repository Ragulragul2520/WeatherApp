import { useState } from "react"
import humidityIcon from "./assets/humidity.png"
import windIcon from "./assets/wind.png"

const WeatherDetails= ({icon, temp, city, country, lat, log, humidity, wind}) => {
    return <>
        <div className="img-icon">
            <img src={icon} alt="Weather image" />
        </div>
        <div className="temp">{temp}°C</div>
        <div className="location">{city}</div>
        <div className="country">{country}</div>
        <div className="co-ordinates">
            <div>
                <span className="latitude">latitude</span> 
                <span>{lat}</span>
            </div>
            <div>
                <span className="longitude">longitude</span>
                <span>{log}</span>
            </div>
        </div>
        <div className="data-container">
        <div className="humidity-container">
            <div className="humidity-element">
                <img src={humidityIcon} alt="humidity" className="humidity-Icon" />
                <div className="humidity-data">{humidity}%</div>
                <div className="humidity">Humidity</div>
            </div>
        </div>
        <div className="wind-container">
            <div className="wind-element">
                <img src={windIcon} alt="wind" className="wind-icon" />
                <div className="wind-data">{wind} Kmph</div>
                <div className="wind">Wind speed </div>
            </div>
        </div>
        </div>
    </>
}


export default WeatherDetails