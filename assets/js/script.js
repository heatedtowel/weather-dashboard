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

function makeContainer(day, temp, humidity, wind, uv) {
  return `<div class="col bg-light m-2">
            <h4>Day ${day}</h4>
            <h5>${temp}&deg;</h5>
            <h5>${humidity}%</h5>
            <h5>${wind} MPH</h5>
            <h5>${uv}</h5>
          </div>`
}

function getCoords(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`).then(response => {
    return response.json();
  })
    .then(data => {
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=imperial`)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data)
          cityEL.textContent = `City: ${cityNameEL.value}`
          tempEL.textContent = `Temp: ${data.daily[0].temp.day}`;
          humidityEL.textContent = `Humidity: ${data.daily[0].humidity}`
          windEL.textContent = `Wind: ${data.daily[0].wind_speed}`
          uvEL.textContent = `UV: ${data.daily[0].uvi}`
          console.log(data.daily[0].uvi)

          if (data.daily[0].uvi <= 2) {
            uvEL.style.background = 'green'
            console.log('green')
          }
          if (data.daily[0].uvi > 2  && data.daily[0].uvi <= 7) {
            uvEL.style.background = 'yellow'
            console.log('yellow')
          }
          if (data.daily[0].uvi > 7) {
            uvEL.style.background = 'red'
            console.log('red')
          }

          var html = ''

          for (var i = 1; i <= days; i++) {
            html += makeContainer(i + 1, data.daily[i].temp.day, data.daily[i].humidity, data.daily[i].wind_speed, data.daily[i].uvi);
          }
          parentContainer.innerHTML = html;
        })
    })
}

btnEL.addEventListener('click', function () {
  var city = cityNameEL.value
  h3EL = document.createElement('h3')
  h3EL.textContent = city
  previousResults.appendChild(h3EL)
  getCoords(city);
})
