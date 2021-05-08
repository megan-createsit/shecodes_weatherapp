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
}
let search = document.querySelector("#city-search");
search.addEventListener("submit", searchSubmit);

let temp = document.querySelector("h3");

function changeTemp(event) {
  event.preventDefault();
  temp.innerHTML = `62.6°`;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeTemp);

function changeTempBack(event) {
  event.preventDefault();
  temp.innerHTML = `17°`;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeTempBack);
