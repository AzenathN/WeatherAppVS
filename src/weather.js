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
////let months = [
  //"January",
  //"February",
  //"March",
  //"April",
  //"May",
  //"June",
  //"July",
  //"August",
  //"September",
  //"October",
  //"November",
  //"December"
//];
let day = days[now.getDay()];
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
if(hour>12){
  hour=hour-12;
}
//let month = months[now.getMonth()];

//let day=days[date.getDay()];
//let year = now.getFullYear();
return `${day} ${hour}:${minute}`;
}

function formatDay(timestamp){
  let now= new Date(timestamp * 1000 );
  let day= now.getDay();
  let days=["Sun","Mon","Tues","Wed","Thu","Fri","Sat"];

  return days[day];
}


//let dateElement = document.querySelector("#date");
//dateElement.innerHTML = `${day}<br>${date},${year}<br>${hour}:${minute}`;

//*feature#2//


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
  let fahrenheitTemperature=(celsiusTemperature*9)/5+32;
  temperatureToday.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsiusLink);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

search("Riverside");
