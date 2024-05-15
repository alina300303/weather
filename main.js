const apiKey  = 'c1675a4a11dc9769f20c9bc5920766c0'

const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`

const searchInput = document.querySelector('.search-box input'),
    searchBtn = document.querySelector('.search-box button'),
    weatherIcon = document.querySelector('.weather-image i'),
    weather = document.querySelector('.weather'),
    error = document.querySelector('.error')

const checkWeather  = async (city) => {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`)
    if (response.status === 404) {
        error.style.display = 'block'
        weather.style.display = 'none'
    }
    const data = await response.json()

    document.querySelector('.city').innerHTML = data.name
    document.querySelector('.temp').innerHTML = 
        Math.round(data.main.temp) + "&#8451"
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
    document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h'

    if (data.weather[0].main === 'Clear') {
        weatherIcon.className = 'fa-solid fa-sun'
    } else if (data.weather[0].main === 'Rain') {
        weatherIcon.className = 'fa-solid fa-cloud-rain'
    }  else if (data.weather[0].main === 'Mist') {
        weatherIcon.className = 'fa-solid fa-cloud-mist'
    }  else if (data.weather[0].main === 'Drizzle') {
        weatherIcon.className = 'fa-solid fa-cloud-drizzle'
    }

    weather.style.display = 'block'
    error.style.display = 'none'
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchInput.value)
    searchInput.value = ''
})

searchInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        checkWeather(searchInput.value)
        searchInput.value = ''
    }
    
})