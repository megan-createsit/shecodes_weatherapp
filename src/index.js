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

function currentTemp(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let tempReplace = document.querySelector(`b`);
  let describeReplace = document.querySelector(`.description`);
  describeReplace.innerHTML = `It is ${description} today.`;
  tempReplace.innerHTML = `${temperature}°F`;
}

