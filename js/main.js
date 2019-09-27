(() => {
    navigator.geolocation.getCurrentPosition(position => {
        document.getElementById('lat').value = position.coords.latitude;
        document.getElementById('lon').value = position.coords.longitude;
    });
})();

document.getElementById('getBtn').addEventListener('click', getWeatherInfo);

function getWeatherInfo(event) {
    event.preventDefault();

    const apiKey = 'txIjfrI8CnvAvGIx1cmyhUOriwqknmgW';
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

    function displayWeather(temperature) {
        // console.log(temperature);
        document.getElementById('weatherText').textContent = temperature.WeatherText;
        document.getElementById('weatherImage').setAttribute('src', `images/${temperature.WeatherIcon}.png`);
        document.getElementById('weather').innerHTML = `${Math.round(temperature.Temperature.Metric.Value)}<sup>&#176;</sup>C`;
    }
}