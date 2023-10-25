if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('sw.js').then(registration => {
      // Registration was successful
      console.log('SW Registered!');
      console.log(registration);
    }).catch(error => {
      console.log('SW Registration Failed');
      console.log(error);

    });
  }

const api = {
  key: "71b6910db6b07a54bbc94c308c5d0c35",
  base: "https://api.openweathermap.org/data/2.5/"

}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
  getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

  localStorage.setItem("displayResults", JSON.stringify(displayResults));
  //retrieving the JSON stringify
  var jsonString = localStorage.getItem("displayResults");
  //parse the JSON string back to JS personObject
  var retrieveObject = JSON.parse(jsonString);
  console.log(retrieveObject.ci +"<br>");//prints openweathermap


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
