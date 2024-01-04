const dateRender = new Date();
let date = document.getElementById("date");
let time = document.getElementById("time");
date.innerHTML = `${dateRender.getDate()} - ${
  dateRender.getMonth() + 1
} - ${dateRender.getFullYear()}`;
time.innerHTML = `&nbsp;${dateRender.getHours()}:${dateRender.getMinutes()} Hrs`;

function check() {
  // Get nearest city data (GPS coordinates)
  // let lat = 28.38;
  // let lon = 77.12;
  var lat = document.getElementById("ipLat").value; // 28.38;
  var lon = document.getElementById("ipLon").value; //77.12;
  let AQIgps = fetch(
    `https://ai-weather-by-meteosource.p.rapidapi.com/current?lat=${lat}&lon=${lon}&timezone=Asia%2Fkolkata&language=en&units=metric`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "76fbc6ae6emsh46851ddef1a7808p1731cdjsn83eaf099c9dd",
        "X-RapidAPI-Host": "ai-weather-by-meteosource.p.rapidapi.com",
      },
    }
  );
  let placeGps = fetch(
    `https://ai-weather-by-meteosource.p.rapidapi.com/nearest_place?lat=${lat}&lon=${lon}&language=en`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "76fbc6ae6emsh46851ddef1a7808p1731cdjsn83eaf099c9dd",
        "X-RapidAPI-Host": "ai-weather-by-meteosource.p.rapidapi.com",
      },
    }
  );
  placeGps
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById("cityName").innerHTML =
        data.adm_area1 + " , " + data.adm_area2;
      console.log(data.adm_area1 + " , " + data.adm_area2 + "\n");
    })
    .catch((err) => {
      document.getElementById("cityName").innerHTML =
        "Unable to find City Name";
      console.log(err);
    });

  AQIgps.then((response) => {
    return response.json();
  })
    .then((city) => {
      let tempC = document.getElementById("inDegC");
      tempC.innerText = city.current.temperature;
      let tempF = document.getElementById("inFar");
      tempF.innerText =
        (9 / 5) * Number.parseInt(city.current.temperature) + 32;
      let humid = document.getElementById("humidity");
      humid.innerText = city.current.humidity;
      let windSpeed = document.getElementById("windSpeed");
      windSpeed.innerText = city.current.wind.speed;
      let aqiVal = document.getElementById("summary");
      aqiVal.innerText = city.current.summary;
      let ozone = document.getElementById("ozone");
      let uvIndex = document.getElementById("uvIndex");
      let pressure = document.getElementById("pressure");
      let visibility = document.getElementById("visibility");
      ozone.innerText = city.current.ozone;
      uvIndex.innerText = city.current.uv_index;
      pressure.innerText = city.current.pressure;
      visibility.innerText = city.current.visibility;
      let cardWeather = document.getElementById("weather");
      cardWeather.style.backgroundColor = "greenyellow";
      setTimeout(() => {
        cardWeather.style.backgroundColor = "#db77775b";
      }, 1000);
    })
    .catch((err) => {
      let cardWeather = document.getElementById("weather");
      cardWeather.style.backgroundColor = "red";
      document.getElementById("dateTime").innerHTML = "Some Error occured";
      console.log(err);
      setTimeout(() => {
        cardWeather.style.backgroundColor = "#db77775b";
      }, 1000);
    });
}
// check();
