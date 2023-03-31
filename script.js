import API_TOKEN from "./config.js"
let cityName = document.querySelector('#cityName')
let currentTempFa = document.querySelector('#currentTempFa')
let currentTempCe = document.querySelector('#currentTempCe')
let sunrise = document.querySelector('#sunrise')
let sunset = document.querySelector('#sunset')

let input = document.querySelector('#nameText')
let form = document.querySelector('form')
localStorage.setItem('history',[])
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let city = input.value;
    fetch(`http://api.weatherapi.com/v1/current.json?key=${API_TOKEN}&q=${city}&aqi=no`)
    .then(response => response.json())
    .then(data =>{
        cityName.innerText = data.location.name 
        currentTempFa.innerText = Math.round(data.current.temp_f )+ ' °f'
        currentTempCe.innerText = Math.round(data.current.temp_c )+ ' °c'
    })
    fetch(`http://api.weatherapi.com/v1/astronomy.json?key=${API_TOKEN}&q=${city}&dt=2023-03-30`)
        .then(response => response.json())
        .then(data => {
            sunrise.innerText = data.astronomy.astro.sunrise + ' sunrise'
            sunset.innerText = data.astronomy.astro.sunset + ' sunset'
        })
    let history = localStorage.getItem('history')
    localStorage.setItem('history', [history,city])
})
