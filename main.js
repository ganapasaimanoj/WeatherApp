(() => {
    navigator.geolocation.getCurrentPosition(position => {
        document.getElementById('lat').value = position.coords.latitude;
        document.getElementById('lon').value = position.coords.longitude;
    });
})();

document.getElementById('getBtn').addEventListener('click', getWeatherInfo);

function getWeatherInfo(event) {
    event.preventDefault();

    const apiKey = 'Pk69Wv4dCv2y1evoN5sdgCjaJ0uqlCQc';
    const lat = document.getElementById('lat').value;
    const lon = document.getElementById('lon').value;

    const geoUrl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${lon}`;
    fetch(geoUrl).then(response => response.json()).then(data => {
        collectWeatherInfo(data.Key);
    }).catch(error => console.log(error));

    function collectWeatherInfo(cityKey) {
        const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`;
        fetch(weatherUrl).then(response => response.json()).then(data => {
            // displayWeather(Math.round(data[0].Temperature.Metric.Value));
            displayWeather(data[0]);
        }).catch(error => console.log(error));
    }

    function displayWeather(temperature) {
        console.log(temperature);
        document.getElementById('weather').innerHTML = `${temperature}<sup>&#176;</sup>C`;
    }
}