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
//start weather data info//
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
//end weather data info//
//start imperial and metric change//

let imperialTemperature = null;

//end imperial and metric change//
