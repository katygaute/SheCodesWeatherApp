//API key
let apiKey = "003c1349c7c772f2oc3fe4dtdec8a8bb";

//FUNCTIONS

//Retrieve user's current time
function time() {
  let currentDate = new Date();
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    let zero = "0";
    minutes = zero + minutes;
  }
  let time = `${hour}:${minutes}`;
  let userTime = document.querySelector("#user-current-time");
  userTime.innerHTML = time;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
//Retrive submitted city's temperature
function cityWeather(result) {
  console.log(result);
  let cityTempValue = Math.round(result.data.temperature.current);
  //display the temperature in the html
  let cityTempDisplay = document.querySelector("#tempValue");
  cityTempDisplay.innerHTML = cityTempValue;
  celsiusTemperature = result.data.temperature.current;
}

//Retrive submitted city's windspeed
function cityWindSpeed(result) {
  let windSpeed = Math.round(result.data.wind.speed);
  let speedString = document.querySelector("#currentSpeed");
  speedString.innerHTML = windSpeed;
}

//Retrive submitted city's humidity
function cityHumidity(result) {
  let humidity = Math.round(result.data.temperature.humidity);
  let humidString = document.querySelector("#humidityPercent");
  humidString.innerHTML = humidity;
}

function displayForecast(result) {
  let forecast = result.data.daily;
  let forecastElement = document.querySelector(".weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  forecast.forEach(function (forecastday, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
       <div class="forecast-day">${formatForecastDay(forecastday.time)}</div>
        <img class="forecast-icon" src="${forecastday.condition.icon_url}"
                  alt=""
                  width="42"></img>
       <div class="forecast-temp">
          <span class="forecast-temp-low">${Math.round(
            forecastday.temperature.minimum
          )}°</span> |
          <span class="forecast-temp-high">${Math.round(
            forecastday.temperature.maximum
          )}°</span>
       </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function inputCityCoordinates(result) {
  let lon = result.data.coordinates.longitude;
  let lat = result.data.coordinates.latitude;
  let unit = "metric";
  let APIurl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=${unit}`;
  axios.get(APIurl).then(displayForecast);
}

//Retrive submitted city's weather icon
function cityIcon(result) {
  let currentIconURL = result.data.condition.icon_url;
  console.log(currentIconURL);
  let currentIcon = document.querySelector("#current-weather-icon");
  currentIcon.innerHTML = `<img
  src="${currentIconURL}"
  />`;
}

//API request for submitted city
function cityAPI(response) {
  let cityString = document.querySelector(".city");
  cityString.innerHTML = response;
  let unit = "metric";
  let APIurl = `https://api.shecodes.io/weather/v1/current?query=${response}&key=${apiKey}&units=${unit}`;
  axios.get(APIurl).then(cityWeather);
  axios.get(APIurl).then(cityIcon);
  axios.get(APIurl).then(cityWindSpeed);
  axios.get(APIurl).then(cityHumidity);
  axios.get(APIurl).then(inputCityCoordinates);
  time();
}

//Default city when page is first loaded
function defaultCity(result) {
  let city = result;
  cityAPI(city);
}

//clean user input city
function submitCity(event) {
  event.preventDefault();
  //retrieve the user search input
  let cityInput = document.querySelector("#city-input");
  let cityInputClean =
    cityInput.value[0].toUpperCase() + cityInput.value.substring(1);
  cityAPI(cityInputClean);
}

//display the user's location temperature
function displayLocalTemp(result) {
  let localTemp = Math.round(result.data.temperature.current);
  let temperature = document.querySelector("#tempValue");
  temperature.innerHTML = localTemp;
  celsiusTemperature = result.data.temperature.current;
}

//display the user's current location
function displayLocation(result) {
  let locationName = result.data.city;
  let cityString = document.querySelector(".city");
  cityString.innerHTML = locationName;
}

//display the user's location windspeed
function displayWindSpeed(result) {
  let windSpeed = Math.round(result.data.wind.speed);
  let speedString = document.querySelector("#currentSpeed");
  speedString.innerHTML = windSpeed;
}

//display the user's location humidity
function displayHumidity(result) {
  let humidity = Math.round(result.data.temperature.humidity);
  let humidString = document.querySelector("#humidityPercent");
  humidString.innerHTML = humidity;
}

//display the user's location weather icon
function displayIcon(result) {
  let currentIconURL = result.data.condition.icon_url;
  let currentIcon = document.querySelector("#current-weather-icon");
  currentIcon.innerHTML = `<img
  src="${currentIconURL}"
  />`;
}

//User location coordinates + API requests
function coords(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let unit = "metric";
  //API for local weather, location name, and icon
  let APIurl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${unit}`;
  axios.get(APIurl).then(displayLocalTemp);
  axios.get(APIurl).then(displayLocation);
  axios.get(APIurl).then(displayIcon);
  axios.get(APIurl).then(displayWindSpeed);
  axios.get(APIurl).then(displayHumidity);
  axios.get(APIurl).then(inputCityCoordinates);
}

//Retrieve user's geolocation
function Userlocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(coords);
  time();
}

//Convert displayed temperature to fahrenheit
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempValue");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

//Convert displayed temperature to celsius
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#tempValue");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

//empty variable
let celsiusTemperature = null;

//EVENTS

//Current button
let currentPosition = document.querySelector("#current-location-button");
currentPosition.addEventListener("click", Userlocation);

//Search form
let newCity = document.querySelector("#cityForm");
newCity.addEventListener("submit", submitCity);

//Celsius & Fahrenheit buttons
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//default webpage
time();
defaultCity("London");
