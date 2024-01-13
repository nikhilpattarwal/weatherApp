import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";


const WeatherPage = () => {
    const [location, setLocation] = useState({lat:"", lon:""});
    const [allData, setAllData] = useState({});
    const [query, setQuery] = useState();
    console.log(allData);
    console.log(query);
    useEffect(()=>{
        Geolocation.getCurrentPosition(info =>  setLocation((prev)=>({
            ...prev,
            lat:info.coords.latitude,
            lon:info.coords.longitude
        })));
    },[])

   
  

    const apiKey = import.meta.env.VITE_API_KEY;
    console.log(apiKey);

    const convertTemperature = (kelvin) => {
      return Math.round(kelvin - 273.15);
    }

    function getWindDirection(degrees) {
      const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      const degreeRanges = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5, 360];
    
      degrees = (degrees % 360 + 360) % 360;
    
      for (let i = 0; i < directions.length; i++) {
        if (degrees < degreeRanges[i]) {
          return directions[i];
        }
      }
      return 'N';
    }
    
    const getWeather = async()=>{
      if(!query){
        try {
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`);

            const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`);

             const data2 = forecast.data;
            
            console.log(data2);
            const list = [];
             for(var i=0; i<5; i++){
              list.push(data2.list[i]);
             }
            console.log(list);
            console.log(data);
            setAllData((prev=>({
              ...prev,
              name:data.name,
              humidity:convertTemperature(data.main.humidity),
              maxTemp:convertTemperature(data.main.temp_max),
              minTemp:convertTemperature(data.main.temp_min),
              temp:convertTemperature(data.main.temp),
              desc:data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
              icon:data.weather[0].icon,
              windSpeed: data.wind.speed,
              windDirection:getWindDirection(data.wind.deg),
              forecast:list
            })))
        } catch (error) {
            console.log(error)
        }
      }else{
        try {
          const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`);

          const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}`);

           const data2 = forecast.data;
          
          console.log(data2);
          const list = [];
           for(var i=0; i<5; i++){
            list.push(data2.list[i]);
           }
          console.log(list);
          console.log(data);
          setAllData((prev=>({
            ...prev,
            name:data.name,
            humidity:convertTemperature(data.main.humidity),
            maxTemp:convertTemperature(data.main.temp_max),
            minTemp:convertTemperature(data.main.temp_min),
            temp:convertTemperature(data.main.temp),
            desc:data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
            icon:data.weather[0].icon,
            windSpeed: data.wind.speed,
            windDirection:getWindDirection(data.wind.deg),
            forecast:list
          })))
      } catch (error) {
          console.log(error)
      }
        
      }
    }
    console.log(allData);

    useEffect(()=>{
      if(location.lat !== "" && location.lon !== ""){
        getWeather();
      }
    },[location.lat,location.lon,apiKey])
    console.log(location)

    const addQuery=()=>{
      getWeather();
      setQuery("")
    }

  return (
    <div className="forecast">
      <div className="forecast2">
      <div className="forecast-icon">
      <img className="temp" src={`https://openweathermap.org/img/wn/${allData.icon}.png`}/>
      </div>
      <div className="today-weather">
        <h3>{allData.desc}</h3><span style={{color:"white",fontSize:"2rem"}}>{allData.temp+"°c"}</span>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e)=>setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box" onClick={addQuery}>
            {" "}
           <IoSearchOutline/> 
          </div>
        </div>
        <ul>
            <div>
              {" "}
              <li className="cityHead">
                <p>
                  {allData.name}
                </p>
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {allData.temp}°c 
                </span>
              </li>
              <li>
                MAX Temp{" "}
                <span className="temp">
                  {allData.maxTemp}°c 
                </span>
              </li>
              <li>
                MIN Temp{" "}
                <span className="temp">
                  {allData.minTemp}°c 
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {allData.humidity}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {allData.windDirection}
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {allData.windSpeed} m/s
                </span>
              </li>
            </div>
        </ul>
      </div>
      </div>
      <div className="fiveForCastCont">
        <div className="data">
          {allData?.forecast?.map((item,i)=>(
            <>
              <div  className='dataCont' key={i}>
              <div>
              <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="" />
              <h3>{item?.weather[0].description}</h3>
              </div>
              <p>{convertTemperature(item.main.temp)+"°c"}</p>
              <p>{item.dt_txt.slice(0,-8)}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeatherPage