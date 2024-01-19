const locationInput = document.querySelector("#locationInput");
const findLocationButton = document.querySelector("#findLocation");

const theDay = document.querySelector("#theDay");
const theDayInMonth = document.querySelector("#theDayInMonth");
const locationName = document.querySelector("#locationName");
const tempCelsius = document.querySelector("#tempCelsius");
const tempConditionImage = document.querySelector("#tempConditionImage");
const tempConditionText = document.querySelector("#tempConditionText");
const windKph = document.querySelector("#windKph");
const windDir = document.querySelector("#windDir");
const rainPercentage = document.querySelector("#rainPercentage");

const dayOne = document.querySelector("#dayOne");
const oneConditionImage = document.querySelector("#oneConditionImage");
const oneMaxTemp = document.querySelector("#oneMaxTemp");
const oneMinTemp = document.querySelector("#oneMinTemp");
const oneConditionText = document.querySelector("#oneConditionText");

const dayTwo = document.querySelector("#dayTwo");
const twoConditionImage = document.querySelector("#twoConditionImage");
const twoMaxTemp = document.querySelector("#twoMaxTemp");
const twoMinTemp = document.querySelector("#twoMinTemp");
const twoConditionText = document.querySelector("#twoConditionText");

const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const windDirections = {
    N: "North",
    NNE: "North Northeast",
    NE: "Northeast",
    E: "East",
    ENE: "East Northeast",
    ESE: "East Southeast",
    SE: "Southeast",
    SSE: "South Southeast",
    S: "South",
    SSW: "South Southwest",
    SW: "Southwest",
    WSW: "West Southwest",
    W: "West",
    WNW: "West Northwest",
    NW: "Northwest",
    NNW: "North Northwest",
};

async function getData(location = "cairo") {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=725e9365e12f46c39d623419233112&q=${location}&days=3`
        );
        const weatherData = await response.json();
        displayWeatherData(weatherData);
        console.log(weatherData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

locationInput.addEventListener("keyup", function () {
    getData(locationInput.value);
});

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            getData(`${latitude},${longitude}`);
        });
    }
}

getUserLocation();

function displayWeatherData(data) {
    displayCurrentDay(data);
    displayNextDay(data);
    displayThirdDay(data);
}

function displayCurrentDay(data) {
    const currentDate = new Date(data.forecast.forecastday[0].date);
    const currentDayName = dayNames[currentDate.getDay()];
    theDay.textContent = currentDayName;
    theDayInMonth.innerHTML = `${currentDate.getDate()} ${
        monthNames[currentDate.getMonth()]
    }`;

    locationName.innerText = data.location.name;
    tempCelsius.innerHTML = `${data.current.temp_c}<sub>o</sub>C`;
    tempConditionImage.innerHTML = `<img src="${data.current.condition.icon}" alt="tempImage">`;
    tempConditionText.innerText = data.current.condition.text;
    rainPercentage.innerHTML = `<img src="imgs/icon-umberella@2x.png" alt="rain"> ${
        data.forecast.forecastday[0].day.daily_chance_of_rain === 0
            ? " No Rain"
            : " Will Rain"
    }`;
    windKph.innerHTML = `<img src="imgs/icon-wind@2x.png" alt="windKph"> ${data.current.wind_kph}km/h`;

    const windDirValue = data.current.wind_dir;
    const windDirName = windDirections[windDirValue] || windDirValue;

    windDir.classList.toggle("d-block", windDirName.length > 9);
    windDir.innerHTML = `${
        windDirName.length > 9
            ? `<br><img src="imgs/icon-compass@2x.png" alt="windDir"> ${windDirName}`
            : `<img src="imgs/icon-compass@2x.png" alt="windDir"> ${windDirName}`
    }`;
}

function displayNextDay(data) {
    const nextDayDate = new Date(data.forecast.forecastday[1].date);
    const nextDayName = dayNames[nextDayDate.getDay()];
    dayOne.innerHTML = nextDayName;

    oneConditionImage.innerHTML = `<img src="${data.forecast.forecastday[1].day.condition.icon}" alt="forecastOneImage">`;
    oneMaxTemp.innerHTML = `<p class="fs-5 text-white fw-bold mb-0">${data.forecast.forecastday[1].day.maxtemp_c}<sub>o</sub>C</p>`;
    oneMinTemp.innerHTML = `<small class="today-color">${data.forecast.forecastday[1].day.mintemp_c}<sub>o</sub>C</small>`;
    oneConditionText.innerHTML =
        data.forecast.forecastday[1].day.condition.text;
}

function displayThirdDay(data) {
    const thirdDayDate = new Date(data.forecast.forecastday[2].date);
    const thirdDayName = dayNames[thirdDayDate.getDay()];
    dayTwo.innerHTML = thirdDayName;

    twoConditionImage.innerHTML = `<img src="${data.forecast.forecastday[2].day.condition.icon}" alt="forecastTwoImage">`;
    twoMaxTemp.innerHTML = `<p class="fs-5 text-white fw-bold mb-0">${data.forecast.forecastday[2].day.maxtemp_c}<sub>o</sub>C</p>`;
    twoMinTemp.innerHTML = `<small class="today-color">${data.forecast.forecastday[2].day.mintemp_c}<sub>o</sub>C</small>`;
    twoConditionText.innerHTML =
        data.forecast.forecastday[2].day.condition.text;
}
