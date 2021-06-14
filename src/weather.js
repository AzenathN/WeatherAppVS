function formatDate(timestamp){
let now = new Date(timestamp);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];


let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
/*if(hour>12){
  hour=hour-12;
}*/
let day = days[now.getDay()];
return `${day} ${hour}:${minute}`;
}

function formatDay(timestamp){
  let date= new Date(timestamp * 1000 );
  let day= date.getDay();
  let days=["Sun","Mon","Tues","Wed","Thu","Fri","Sat"];

  return days[day];
}
function displayForecast(response) {
  let forecast= response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function (forecastDay, index) {
    if (index <6 ){
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
        </div>
      </div>
  `;
  }
});
  
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//let dateElement = document.querySelector("#date");
//dateElement.innerHTML = `${day}<br>${date},${year}<br>${hour}:${minute}`;

//*feature#2//
function getForecast(coordinates){
console.log(coordinates);
  let apiKey= "d72a05c8cd750bbf5b0d42daadb7570b";
  let apiUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayForecast);
}
function getTemperatureConditions(response) {
  let temperatureToday = document.querySelector("#temperature-today"); 
  let searchedCity= document.querySelector("#searchedCity");
  let descriptionElement= document.querySelector("#description");
  let humidityElement= document.querySelector("#humidity");
  let windElement= document.querySelector("#wind");
  let dateElement=document.querySelector("#date");
  let iconElement= document.querySelector("#icon");

  celsiusTemperature= response.data.main.temp;
  
  temperatureToday.innerHTML= Math.round(celsiusTemperature);
  searchedCity.innerHTML = response.data.name;
  descriptionElement.innerHTML=response.data.weather[0].description;
  humidityElement.innerHTML=response.data.main.humidity;
  windElement.innerHTML=Math.round(response.data.wind.speed);
  dateElement.innerHTML=formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
  
}
function search(cityName) {

  let units = "metric";
  let apiKey = "d72a05c8cd750bbf5b0d42daadb7570b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(getTemperatureConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input").value;
  search(cityName);
}
let searchFormButton = document.querySelector("#search-bar");
searchFormButton.addEventListener("submit", handleSubmit);

function retrieveWeatherCoordination(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "d72a05c8cd750bbf5b0d42daadb7570b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(getTemperatureConditions);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveWeatherCoordination);
  console.log(event);
}
let currentLocationbutton = document.querySelector("#current-location");
currentLocationbutton.addEventListener("click", currentLocation);

function convertCelsiusLink(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  
  let temperatureToday = document.querySelector("#temperature-today");
  temperatureToday.innerHTML=Math.round(celsiusTemperature);
}
let celsiusTemperature= null;



function showFahrenheit(event) {
  event.preventDefault();
  let temperatureToday = document.querySelector("#temperature-today");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("#active");
  let fahrenheitTemperature=(celsiusTemperature*(9/5))+32;
  temperatureToday.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsiusLink);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

search("Riverside");
