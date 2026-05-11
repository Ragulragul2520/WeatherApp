import { useEffect, useState } from "react"
import WeatherDetails from "./WeatherDetails"

import search1 from "./assets/search1.png"
import clear from "./assets/clear.png"
import cloud from "./assets/cloud.png"
import drizzle from "./assets/drizzle.png"
import humidity from "./assets/humidity.png"
import rain from "./assets/rain.png"
import snow from "./assets/snow.png"
import wind from "./assets/wind.png"



function Weather(){
    let apiKey = "4e63b3a91f257f3a30fd8caf74ea1227";
    const [text, setText] = useState("Chennai");

    const [icon, setIcon] = useState();
    const [temp, setTemp] = useState(0);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState(0);
    const [log, setLog] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);

    const [cityNotFound, setCityNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const weatherIconMap = {
        "01d" : clear,
        "01n" : clear,
        "02d" : cloud,
        "02n" : cloud,
        "03d" : drizzle,
        "03n" : drizzle,
        "04d" : drizzle,
        "04n" : drizzle,
        "09d" : rain,
        "09n" : rain,
        "10d" : rain,
        "10n" : rain,
        "13d" : snow,
        "13n" : snow,
    };

    const search = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;
    setLoading(true);

    try{
        let res = await fetch(url);
        let data = await res.json();
        console.log(data);
        if (data.cod === "404"){
            console.error("City not found");       // for developer understanding in console
            setCityNotFound(true);
            setLoading(false);
            return;
        }

        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setTemp(Math.floor(data.main.temp));
        setCity(data.name);
        setCountry(data.sys.country);
        setLat(data.coord.lat);
        setLog(data.coord.lon);
        setIcon(weatherIconMap[data.weather[0].icon] || clear);
        setCityNotFound(false);

    }catch (error) {
        console.error("An error occured: ",error.message);
        setError("An error occured while fetching the data.");
        
    }finally {
        setLoading(false);
    }
};

    const handleCity = (e) => {
        setText(e.target.value);
    }

    const handleKeyDown = (e) =>{
        if (e.key === "Enter"){
            search();
        }
    }

    useEffect(function () {
        search();
    }, []);
    
    return <>
        <div className="container">
            <div className="input-container">
                <input type="text" 
                    onChange={handleCity} 
                    className="city-input" 
                    placeholder="Search City"
                    value={text}
                    onKeyDown={handleKeyDown}/>
                <div className="search-icon" onClick={() => search()}>
                    <img src={search1} alt="Search" title="search" />
                </div>
            </div>
            {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} 
                lat={lat} log={log} humidity={humidity} wind={wind} />}

            {loading && <div className="loading-message">Loading...</div>}
            {error && <div className="error-message">{error}</div>}
            {cityNotFound && <div className="city-not-found">City not found</div>}
        </div>
    </> 

}

export default Weather