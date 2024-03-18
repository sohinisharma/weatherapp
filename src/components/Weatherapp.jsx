import React, { useState } from 'react';
import './Weatherapp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCloud, faTint, faWind, faSun, faUmbrella, faCloudShowersHeavy, faSnowflake, faThunderstorm, faCloudArrowUp, faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';

const Weatherapp = () => {
  const [wicon, setWicon] = useState(faCloud);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({
    humidity: '64%',
    windSpeed: '18 km/h',
    temperature: '24°C',
    location: 'London',
    weatherIcon: '01d',
  });

  const search = async () => {
    if (city === '') {
      return;
    }
  
    const currentWeatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=66e6fa52b3cd88fec44e712806a30b38`;
    
    const foreCasturl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=Metric&appid=66e6fa52b3cd88fec44e712806a30b38`;
  
    try {
      const currentWeatherResponse = await fetch(currentWeatherurl);
      const foreCastResponse = await fetch(foreCasturl);
  
      if (!currentWeatherResponse.ok || !foreCastResponse.ok) {
        throw new Error(`Error: ${currentWeatherResponse.status} - ${currentWeatherResponse.statusText}`);
      }
  
      const currentWeatherData = await currentWeatherResponse.json();
      const foreCastData = await foreCastResponse.json();
  
      setWeatherData({
        humidity: `${currentWeatherData.main.humidity}%`,
        windSpeed: `${Math.floor(currentWeatherData.wind.speed)} km/h`,
        temperature: `${Math.floor(currentWeatherData.main.temp)}°C`,
        location: currentWeatherData.name,
        weatherIcon: currentWeatherData.weather[0].icon,
      });
      console.log("Weather Icon Code:", currentWeatherData.weather[0].icon);
  
      setWicon(getWeatherIcon(currentWeatherData.weather[0].icon));
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };  

  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case '01d':
      case '01n':
        return faSun;
      case '02d':
      case '02n':
        return faCloudArrowUp;
      case '03d':
      case '03n':
        return faCloud;
      case '04d':
      case '04n':
        return faCloudArrowDown;
      case '09d':
      case '09n':
        return faCloudShowersHeavy;
      case '10d':
      case '10n':
        return faUmbrella;
      case '11d':
      case '11n':
        return faThunderstorm;
      case '13d':
      case '13n':
        return faSnowflake;
      default:
        return faSun;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input
          type='text'
          placeholder='Search'
          className='city-input'
          value={city}
          onChange={(e) => setCity(e.target.value)} onKeyDown={handleKeyPress}
        />
        <div className='search-icon' onClick={search}>
          <FontAwesomeIcon icon={faSearch} alt='search-icon' className='search-img' />
        </div>
      </div>
      <div className='weather-img'>
        <FontAwesomeIcon icon={wicon} className='weather-icon' />
      </div>
      <div className='weather-temp'>{weatherData.temperature}</div>
      <div className='weather-location'>{weatherData.location}</div>
      <div className='data-container'>
        <div className='element'>
          <FontAwesomeIcon icon={faTint} className='icon' />
          <div className='data'>
            <div className='humidity-percent'>{weatherData.humidity}</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <FontAwesomeIcon icon={faWind} className='icon' />
          <div className='data'>
            <div className='humidity-rate'>{weatherData.windSpeed}</div>
            <div className='text'>Wind speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weatherapp;
