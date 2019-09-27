// Adding event listeners to the buttons
document.getElementById('currentBtn').addEventListener('click', getCurrentWeather);
document.getElementById('getBtn').addEventListener('click', getWeatherInfo);
document.getElementById('cityBtn').addEventListener('click', getCityWeather);

// API key to access weather from AccuWeather API
const apiKey = 'AvblbFuftHqqapuLEj2PhzjEsvaWuHe7';

// Calls when the user click's on 'get current location's weather button
function getCurrentWeather(event) {
    event.preventDefault();

    navigator.geolocation.getCurrentPosition(position => {
        document.getElementById('lat').value = position.coords.latitude;
        document.getElementById('lon').value = position.coords.longitude;

        getWeatherInfo(event);
    });
}

// Calls when the user click's on get weather of the city entered
function getCityWeather(event) {
    event.preventDefault();


}

// Calls when the user click's on 'get weather of the co-ordinates'
function getWeatherInfo(event) {
    event.preventDefault();

    const lat = document.getElementById('lat').value;
    const lon = document.getElementById('lon').value;

    const geoUrl = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${lon}`;
    fetch(geoUrl).then(response => response.json()).then(data => {
        document.getElementById('area').textContent = data.LocalizedName;
        document.getElementById('state').textContent = data.AdministrativeArea.LocalizedName;
        collectWeatherInfo(data.Key);
    }).catch(error => console.log(error));

    function collectWeatherInfo(cityKey) {
        const weatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`;
        fetch(weatherUrl).then(response => response.json()).then(data => {
            displayWeather(data[0]);
        }).catch(error => console.log(error));
    }

    // Display's the weather in html
    function displayWeather(temperature) {
        // console.log(temperature);
        document.getElementById('weatherText').textContent = temperature.WeatherText;
        document.getElementById('weatherImage').setAttribute('src', `images/${temperature.WeatherIcon}.png`);
        document.getElementById('weather').innerHTML = `${Math.round(temperature.Temperature.Metric.Value)}<sup>&#176;</sup>C`;
    }
}
