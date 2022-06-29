'use strict'

// Блок з погодою
const weatherBlock = document.querySelector('#weather')

async function loadWeather (e) {
  weatherBlock.innerHTML = `
    	<div class="weather__loading">
    		<img src="img/loading.gif" alt="Loading...">
    	</div>`
  const server = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${e}&appid=2b8fb67297bc1a15770e44d7b37c8be5`
  const response = await fetch(server, {
    method: 'GET'
  })
  const responseResult = await response.json()

  if (response.ok) {
    getWeather(responseResult)
  } else {
    weatherBlock.innerHTML = responseResult.message
  }
}

function getWeather (data) {
  // Обробляємо та виводимо данні
  const location = data.name
  const temp = Math.round(data.main.temp)
  const feelsLike = Math.round(data.main.feels_like)
  const weatherStatus = data.weather[0].main
  const weatherIcon = data.weather[0].icon
  // HTML шаблон
  const template = `
    <div class="weather__body">
        <div class="weather__header">
            <div class="weather__main">
                <div class="weather__city">${location}</div>
                <div class="weather__status">${weatherStatus}</div>
            </div>
            <div class="weather__icon">
                <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
            </div>
        </div>
        <div class="weather__temp">${temp}</div>
        <div class="weather__feels-like">Feels like: ${feelsLike}</div>
    </div>`
  weatherBlock.insertAdjacentHTML('beforeend', template)
  const weatherLoading = weatherBlock.querySelector('.weather__loading')
  if (weatherLoading) {
    weatherLoading.remove()
  }
}

const citys = ['Zaporizhzhia', 'Kiev', 'Mykulychyn']

if (weatherBlock) {
  citys.forEach(element => {
    loadWeather(element)
  })
}
