
import './App.css';
import React, { useEffect, useState } from 'react';
import TopButtons from './Components/TopButtons';
import Inputs from './Components/Inputs';
import TimeAndLocation from './Components/TimeAndLocation';
import TemperatureAndDetails from './Components/TemperatureAndDetails';
import Forecast from './Components/Forecast';
import getFormattedWeatherData from './Services/WeatherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

const [query,setQuery]=useState({q:'irving'})
const [units, SetUnits]=useState('metric')
const[weather, SetWeather]=useState(null)


useEffect(()=>{ 
  const fetchWeather= async()=>{
    const message=query.q?query.q:'current location'
    toast.info('Fetching weather for'+message)
    await getFormattedWeatherData({...query,units}).then((data)=> {toast.success(`successfully fetched weather for ${data.name},${data.country}`)
    SetWeather(data)});//url passing based on city
 };
 fetchWeather()
},[query,units])
console.log(weather)
  //---------------------------------------------------------------------------------------
  
  const formatBackground=()=>{
    if(!weather) return "from-cyan-700 to-blue-700";
    const threshold=units==='metric'? 25:75
    if(weather.temp<=threshold)  return "from-cyan-700 to-blue-700"
     return "from-yellow-700 to-orange-700"
  }
 
  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={SetUnits}/>

      {weather && (
        <div>
        <TimeAndLocation weather={weather}/>
      <TemperatureAndDetails weather={weather}/>
      <Forecast title="hourly forecast" items={weather.hourly}/>
      <Forecast title="daily forecast" items={weather.daily}/>
      </div>)}
      <ToastContainer  autoClose={5000} theme="colored" newestOnTop={true}/> 
    </div>
   
  );
}

export default App;
