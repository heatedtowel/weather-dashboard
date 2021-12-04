var cityNameEL = document.querySelector('#cityName');
var previousResults = document.querySelector('#prevResults');
var tempEL = document.querySelector('#temp');
var humidityEL = document.querySelector('#humidity');
var uvEL = document.querySelector('#UV');
var parentContainer = document.getElementById('parentContainer');
var apiKey = '62b0a23cd35c692eb316b1b855d80a34';
var city = 'charlotte'
var days = '5'
var currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
var html = ''

function makeContainer(day, temp, humidity, uv) {
  return `<div class="col bg-light m-2">
            <h4>Day ${day}</h4>
            <h5>${temp}&deg;</h5>
            <h5>${humidity}%</h5>
            <h5>${uv}</h5>
          </div>`
}





getCoords();

function getCoords() {
  fetch(currentURL).then(response => {
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
      var currentTemp = data.daily[0].temp.day;
      var humidity = data.daily[0].humidity
      var uv = data.daily[0].uvi
      console.log(currentTemp, humidity, uv)

      for (var i = 1; i <= days; i++) {
        html += makeContainer(i+1, data.daily[i].temp.day, data.daily[i].humidity, data.daily[i].uvi);
      }
      parentContainer.innerHTML = html;
    })
  })
}








/* "lon": -80.8431,
"lat": 35.2271 */