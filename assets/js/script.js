var cityNameEL = document.querySelector('#cityName');
var previousResults = document.querySelector('#prevResults');
var tempEL = document.querySelector('#temp');
var cityEL = document.querySelector('#city');
var humidityEL = document.querySelector('#humidity');
var uvEL = document.querySelector('#UV');
var parentContainer = document.getElementById('parentContainer');
var btnEL = document.querySelector('#cityBtn')
var apiKey = '62b0a23cd35c692eb316b1b855d80a34';
var days = '5'

function makeContainer(day, temp, humidity, uv) {
  return `<div class="col bg-light m-2">
            <h4>Day ${day}</h4>
            <h5>${temp}&deg;</h5>
            <h5>${humidity}%</h5>
            <h5>${uv}</h5>
          </div>`
}

function getCoords(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`).then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data)
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=imperial`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      cityEL.textContent = cityNameEL.value
      tempEL.textContent = data.daily[0].temp.day;
      humidityEL.textContent = data.daily[0].humidity
      uvEL.textContent = data.daily[0].uvi
      var html = ''

      for (var i = 1; i <= days; i++) {
        html += makeContainer(i+1, data.daily[i].temp.day, data.daily[i].humidity, data.daily[i].uvi);
      }
      parentContainer.innerHTML = html;
    })
  })
}

btnEL.addEventListener('click', function() {
  var city = cityNameEL.value
  console.log(city)
  getCoords(city);
})






/* "lon": -80.8431,
"lat": 35.2271 */