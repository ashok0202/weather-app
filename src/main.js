const api = {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.getElementById('search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(event) {
    // Enter button keyCode
    if (event.keyCode == 13) {
      getResults(searchbox.value);
      searchbox.value="";
    }
  }
  
async function getResults(query) {
  let url=`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`;
  try {
    const response=await fetch(url);
    const weather=await response.json();
    displayResults(weather);
  } catch (error) {
    console.log(error);
  }
  
}
  
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  }
  
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }
  
  document.addEventListener("DOMContentLoaded",function(){
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

  })