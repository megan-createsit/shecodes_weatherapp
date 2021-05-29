//start date info//
let now = new Date();
let dateTime = document.querySelector("#date-time");
let hours = now.getHours();
let minutes = now.getMinutes();
let currentTime = `${hours}:${minutes}`;
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
dateTime.innerHTML = `${day}, ${currentTime}`;
//end date info//
//start search city function//
function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#text");
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = `${city.value}`
  let apiKey = `128f6df614a32ed62271bc180835bf6d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(currentTemp);
}
let search = document.querySelector("#city-search");
search.addEventListener("submit", searchSubmit);
//end search city info//
//start forecast info//
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
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
          width="60"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}°C </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}°C </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = `128f6df614a32ed62271bc180835bf6d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
//end forecast info//
//start today weather data info//
function currentTemp(response) {
  console.log(response.data);
  let imperialTemperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let precip = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let icon = response.data.weather[0].icon;
  let tempReplace = document.querySelector("b");
  let describeReplace = document.querySelector(".description");
  let precipReplace = document.querySelector("#precip");
  let windReplace = document.querySelector("#wind");
  let iconReplace = document.querySelector("#icon");
  describeReplace.innerHTML = `${description}`;
  tempReplace.innerHTML = `${imperialTemperature}°F`;
  precipReplace.innerHTML = `Humidity: ${precip}%`;
  windReplace.innerHTML = `Wind: ${wind} m/h`;
  iconReplace.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
  iconReplace.setAttribute("alt", response.data.weather[0].description);
  function imperialChange(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("b");
    let imperialRead = Math.round(imperialTemperature);
    temperatureElement.innerHTML = `${imperialRead}°F`;

    getForecast(response.data.coord);
  }
  
  function metricChange(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let metricTemperature = (imperialTemperature - 32) * 5/9;
    let temperatureElement = document.querySelector("b");
    let metricRead = Math.round(metricTemperature)
    temperatureElement.innerHTML = `${metricRead}°C`;
  }
  
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", imperialChange);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", metricChange);
}
let imperialTemperature = null;
//end today weather data info//
