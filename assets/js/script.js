var cityNameEL = document.querySelector('#cityName');
var previousResults = document.querySelector('#prevResults');
var tempEL = document.querySelector('#temp');
var cityEL = document.querySelector('#city');
var windEL = document.querySelector('#wind');
var humidityEL = document.querySelector('#humidity');
var uvEL = document.querySelector('#UV');
var parentContainer = document.getElementById('parentContainer');
var btnEL = document.querySelector('#cityBtn')
var apiKey = '62b0a23cd35c692eb316b1b855d80a34';
var days = '5'


init()

function init() {
  showCity()
}


function createDate(time) {
  var milliseconds = time * 1000
  var dataObject = new Date(milliseconds)
  actualDate = dataObject.toLocaleString()
  return actualDate
}

function makeContainer(day, temp, humidity, wind, uv) {
  return `<div class="col m-2 fiveDay">
            <h4>Day ${day}</h4>
            <h5>${temp}&deg;</h5>
            <h5>${humidity}%</h5>
            <h5>${wind} MPH</h5>
            <h5>UV:${uv}</h5>
          </div>`
}

function saveCity(data) {
  event.preventDefault;
  var storedResults = JSON.parse(localStorage.getItem('prevCity'));
  if (storedResults === null) {
    var selectedCity = [data]
    localStorage.setItem('prevCity', JSON.stringify(selectedCity))
    addResult(data);
    return
  };
  storedResults.push(data)
  localStorage.setItem('prevCity', JSON.stringify(storedResults));
  addResult(data);
}

function showCity() {
  var storedResults = JSON.parse(localStorage.getItem('prevCity'));

  if (storedResults != undefined || storedResults != null) {
    for (var i = 0; i < storedResults.length; i++) {
      previousResults.innerHTML += `<button class="btn btn-primary m-1 prevResult" id='prevBtn' type="submit" value="${storedResults[i]}">${storedResults[i]}</button>`;

    }
  }
  recentEventListener()
}

function getCoords(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`).then(response => {
    return response.json();
  })
    .then(data => {
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=imperial`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          var unixTime = data.current.dt;
          createDate(unixTime)
          cityEL.textContent = `${city} ${actualDate}`
          tempEL.textContent = `${Math.floor(data.daily[0].temp.day)} degrees`;
          humidityEL.textContent = `Humidity: ${data.daily[0].humidity}`
          windEL.textContent = `Wind: ${data.daily[0].wind_speed}`
          uvEL.textContent = `UV: ${data.daily[0].uvi}`

          if (data.daily[0].uvi <= 2) {
            uvEL.style.background = 'green'
          }
          if (data.daily[0].uvi > 2 && data.daily[0].uvi <= 7) {
            uvEL.style.background = 'yellow'
          }
          if (data.daily[0].uvi > 7) {
            uvEL.style.background = 'red'
          }

          var html = ''

          for (var i = 1; i <= days; i++) {
            html += makeContainer(i + 1, Math.floor(data.daily[i].temp.day), data.daily[i].humidity, data.daily[i].wind_speed, data.daily[i].uvi);
          }
          parentContainer.innerHTML = html;
        })
    })
}

btnEL.addEventListener('click', function () {
  var city = cityNameEL.value
  saveCity(city);
  getCoords(city);
})
function recentEventListener() {
  previousResults.addEventListener('click', function(event) {
  getCoords(event.target.value);
})
}

function addResult(city) {
  previousResults.innerHTML += `<button class="btn btn-primary m-1 prevResult" id='prevBtn' type="submit" value="${city}">${city}</button>`;
}
