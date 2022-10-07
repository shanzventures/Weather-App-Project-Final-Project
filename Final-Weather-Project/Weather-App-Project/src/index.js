// Date / Time
let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let year = now.getFullYear();

////////////////////

let h1 = document.querySelector("h1");
h1.innerHTML = `Last updated: ${day} ${date} ${month}, ${hours}:${minutes}, ${year}`;

///////// City Search

function displayWeatherCondition(response) {
  document.querySelector(".city-input").innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#temperature");
  let conditionsElement = document.querySelector("#conditions");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  conditionsElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "8e9b90927c2534dbc9ab90cce8c00178";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${city}`;
}

let button = document.querySelector("#search-form");
button.addEventListener("submit", search);
search("Edinburgh");

/////////////////// Location button

function searchLocation(position) {
  let apiKey = "8e9b90927c2534dbc9ab90cce8c00178";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
