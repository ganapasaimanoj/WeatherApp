const apiKey = 'Pk69Wv4dCv2y1evoN5sdgCjaJ0uqlCQc';
const city = 'hyderabad';
const url = 'http://dataservice.accuweather.com/locations/v1/cities/search';
const query = `?apikey=${apiKey}&q=${city}`;
const sortedResult = [];

async function getWeather() {
    const result = await fetch(url + query)
        .then(response => response.json()).then(data => data)
        .catch(error => console.log(error));

    const output = result.filter(item => item.Country.LocalizedName === 'India');
    sortedResult.push(output[0]);
}
getWeather();

































// const key = 'Pk69Wv4dCv2y1evoN5sdgCjaJ0uqlCQc';
// const getCity = async (city) => {
//     const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
//     const query = `?apikey=${key}&q=${city}`;
//     const response = await fetch(base + query);
//     const data = await response.json();

//     return data[0];
// };

// getCity('hyderabad')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));