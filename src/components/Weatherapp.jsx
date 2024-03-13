import React, { useState } from 'react';
import './Weatherapp.css';
// import cloud from '../assets/cloud.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCloud, faTint, faWind, faSun, faUmbrella, faCloudShowersHeavy, faSnowflake } from '@fortawesome/free-solid-svg-icons';

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

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=66e6fa52b3cd88fec44e712806a30b38`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      setWeatherData({
        humidity: `${data.main.humidity}%`,
        windSpeed: `${Math.floor(data.wind.speed)} km/h`,
        temperature: `${Math.floor(data.main.temp)}°C`,
        location: data.name,
        weatherIcon: data.weather[0].icon,
      });

      setWicon(getWeatherIcon(data));
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
        return faCloud;
      case '03d':
      case '03n':
        return faUmbrella;
      case '04d':
      case '04n':
        return faUmbrella;
      case '09d':
      case '09n':
        return faCloudShowersHeavy;
      case '10d':
      case '10n':
        return faCloudShowersHeavy;
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
        {/* <img src={cloud} alt="cloud" className='weather-icon'/> */}
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
