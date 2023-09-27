//API Key
const API_KEY = "0ead8614685e8729d780e97bb64a0247";
// Initialization
const weatherDetails = document.querySelector('#weather-details')
const cityInput = document.querySelector('#input-city')
const form = document.querySelector('form')

// Add Eventlistener to form
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const cityValue  = cityInput.value
    getWeatherData(cityValue)
})

// Get Weather Data
async function getWeatherData(cityValue) {
    // handle data
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${API_KEY}&units=metric`)
        // Check if response OK
        if(!response.ok){
            throw new Error('Network response was not okay')
        }

        // Parse response
        const data = await response.json()
        const temp = Math.round(data.main.temp)
        const desc = data.weather[0].description
        const icon = data.weather[0].icon
        const details = [
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ]

        // Manipulate HTML
        weatherDetails.querySelector(".weather-details__icon").innerHTML = `
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">
        `;
        weatherDetails.querySelector(
          ".weather-details__temperature"
        ).innerText = `${temp}°C`;

        weatherDetails.querySelector(
          ".weather-details__description"
        ).innerText = desc

        // Loop through details
        weatherDetails.querySelector(".weather-details__info").innerHTML = details.map(detail => `<div>${detail}</div>`).join("")
    }catch(error){
        weatherDetails.innerHTML =
          "<p>&#x1F615; Oops...Seems an error occured, please try again!</p>";
    }
}