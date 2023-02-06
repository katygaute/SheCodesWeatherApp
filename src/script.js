//API key
let apiKey = "003c1349c7c772f2oc3fe4dtdec8a8bb";

//INSERT USER'S CURRENT TIME AND DAY
let currentDate = new Date();
let dayNum = currentDate.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[dayNum];
let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  let zero = "0";
  minutes = zero + minutes;
}
let time = `${hour}:${minutes}`;
let dayTime = document.querySelector(".day-time");
dayTime.innerHTML = `${day} ${time}`;

//SEARCH FOR CITY FEATURE (W/ CITY'S TEMPERATURE)
//retrieve the temperature of input city
function cityWeather(response) {
  console.log(response);
  let cityTempValue = Math.round(response.data.temperature.current);
  //display the temperature in the html
  let cityTempDisplay = document.querySelector("#tempValue");
  cityTempDisplay.innerHTML = cityTempValue;
}

//city weather icon
function cityIcon(result) {
  let currentIconURL = result.data.condition.icon_url;
  console.log(currentIconURL);
  let currentIcon = document.querySelector("#current-weather-icon");
  currentIcon.innerHTML = `<img
  src="${currentIconURL}"
  />`;
}

// city header & API
function submitCity(event) {
  event.preventDefault();
  //retrieve the user search input
  let cityString = document.querySelector(".city");
  let cityInput = document.querySelector("#city-input");
  let cityInputClean =
    cityInput.value[0].toUpperCase() + cityInput.value.substring(1);
  //edit the displayed city string
  cityString.innerHTML = cityInputClean;

  //API for input city
  let unit = "metric";
  // let APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputClean}&appid=${apiKey}&units=${unit}`;
  let APIurl = `https://api.shecodes.io/weather/v1/current?query=${cityInputClean}&key=${apiKey}&units=${unit}`;
  axios.get(APIurl).then(cityWeather);
  axios.get(APIurl).then(cityIcon);
}

//add event to city form
let newCity = document.querySelector("#cityForm");
newCity.addEventListener("submit", submitCity);

//USER'S CURRENT LOCATION
//display the user's location temperature in the html
function displayLocalTemp(result) {
  let localTemp = Math.round(result.data.temperature.current);
  let temperature = document.querySelector("#tempValue");
  temperature.innerHTML = localTemp;
}

//display the user's current locations
function displayLocation(result) {
  let locationName = result.data.city;
  let cityString = document.querySelector(".city");
  cityString.innerHTML = locationName;
}

//retrieve corresponding weather icon
function displayIcon(result) {
  let currentIconURL = result.data.condition.icon_url;
  let currentIcon = document.querySelector("#current-weather-icon");
  currentIcon.innerHTML = `<img
  src="${currentIconURL}"
  />`;
}

//retrieve coordinates & APIs
function coords(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let unit = "metric";
  //API for local weather, location name, and icon
  let APIurl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${unit}`;
  axios.get(APIurl).then(displayLocalTemp);
  axios.get(APIurl).then(displayLocation);
  axios.get(APIurl).then(displayIcon);
}

//get user's geolocation
function Userlocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(coords);
}

//add event to current button
let currentPosition = document.querySelector("#current-location-button");
currentPosition.addEventListener("click", Userlocation);

// TEMPERATURE CONVERSION
//function changeToCelsius(event) {
//event.preventDefault();
//let temperature = document.querySelector("#tempValue");
//temperature.innerHTML = "1";
//}

//function changeToFahrenheit(event) {
// event.preventDefault();
// let temperature = document.querySelector("#tempValue");
// temperature.innerHTML = "34";
//}

//let celsius = document.querySelector("#celsius-link");
//let fahrenheit = document.querySelector("#fahrenheit-link");

//celsius.addEventListener("click", changeToCelsius);
//fahrenheit.addEventListener("click", changeToFahrenheit);
