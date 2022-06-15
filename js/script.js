"use strict"

// Блок з погодою
const weatherBlock = document.querySelector('#weather');

async function loadWeather(e) {
    weatherBlock.innerHTML = `
    	<div class="weather__loading">
    		<img src="img/loading.gif" alt="Loading...">
    	</div>`;
    const server = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${e}&appid=522f7ec766b55c89fccbc47a4e7a72c0`;
    const response = await fetch(server, {
        method: 'GET',
    });
    const responseResult = await response.json();

    if (response.ok) {
        getWeather(responseResult);
    } else {
        weatherBlock.innerHTML = responseResult.message;
    }
}



function getWeather(data) {
    // Обробляємо та виводимо данні
    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;
    // HTML шаблон
    const template = `
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
    <div class="weather__feels-like">Feels like: ${feelsLike}</div>`;

    // weatherBlock.innerHTML = template;
    weatherBlock.insertAdjacentHTML('beforeend', template)
    weatherBlock.querySelector('.weather__loading').remove()
}

const citys = ['Zaporizhzhia', 'Kiev', 'Dnipro'];

if (weatherBlock) {
    citys.forEach(element => {
        loadWeather(element);
    });
}