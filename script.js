function getIconUrl(condition) {
    const iconMap = {
        clear: 'https://img.icons8.com/ios-filled/100/000000/sun--v1.png',
        sunny: 'https://img.icons8.com/ios-filled/100/000000/sun--v1.png',
        'partly cloudy': 'https://img.icons8.com/ios-filled/100/000000/partly-cloudy-day--v1.png',
        cloudy: 'https://img.icons8.com/ios-filled/100/000000/cloud.png',
        rain: 'https://img.icons8.com/ios-filled/100/000000/rain.png',
        drizzle: 'https://img.icons8.com/ios-filled/100/000000/drizzle.png',
        thunderstorm: 'https://img.icons8.com/ios-filled/100/000000/storm.png',
        snow: 'https://img.icons8.com/ios-filled/100/000000/snow.png',
        sleet: 'https://img.icons8.com/ios-filled/100/000000/sleet.png',
        fog: 'https://img.icons8.com/ios-filled/100/000000/fog-day.png',
        haze: 'https://img.icons8.com/ios-filled/100/000000/haze.png',
        wind: 'https://img.icons8.com/ios-filled/100/000000/wind.png',
        smoke: 'https://img.icons8.com/ios-filled/100/000000/smoke.png',
        dust: 'https://img.icons8.com/ios-filled/100/000000/dust.png',
        tornado: 'https://img.icons8.com/ios-filled/100/000000/tornado.png',
    };

    condition = condition.toLowerCase();

    if (condition.includes('clear') || condition.includes('sunny')) return iconMap.sunny;
    if (condition.includes('partly cloudy')) return iconMap['partly cloudy'];
    if (condition.includes('cloudy')) return iconMap.cloudy;
    if (condition.includes('drizzle')) return iconMap.drizzle;
    if (condition.includes('rain')) return iconMap.rain;
    if (condition.includes('thunderstorm')) return iconMap.thunderstorm;
    if (condition.includes('snow')) return iconMap.snow;
    if (condition.includes('sleet')) return iconMap.sleet;
    if (condition.includes('fog')) return iconMap.fog;
    if (condition.includes('haze')) return iconMap.haze;
    if (condition.includes('mist')) return iconMap.fog;
    if (condition.includes('wind')) return iconMap.wind;
    if (condition.includes('smoke')) return iconMap.smoke;
    if (condition.includes('dust')) return iconMap.dust;
    if (condition.includes('tornado')) return iconMap.tornado;

    return iconMap.clear;
}

async function getWeather(city) {
    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Loading...';

        const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
        if (!res.ok) throw new Error('Network response was not ok');
        const response = await res.json();


        if (!response.current_condition || !response.current_condition.length) {
            alert('No weather data found for "' + city + '". Please check the city name.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Get Weather';
            return;
        }

        const feelsLike = response.current_condition[0].FeelsLikeC;
        const temperature = response.current_condition[0].temp_C;
        const humidity = response.current_condition[0].humidity;
        const currentCondition = response.current_condition[0].weatherDesc[0].value;
        console.log(currentCondition);


        document.getElementById('cityName').textContent = city;
        document.getElementById('temp').textContent = `${temperature}°C`;
        document.getElementById('feelsLike').textContent = `${feelsLike}°C`;
        document.getElementById('humidity').textContent = `${humidity}%`;

        const iconUrl = getIconUrl(currentCondition);
        document.getElementById('weatherIcon').style.backgroundImage = `url('${iconUrl}')`;

        document.getElementById('weatherCard').style.display = 'flex';

        closeModal();
    } catch (error) {
        alert('Failed to get weather for "' + city + '". Please try again.');
        console.error(error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get Weather';
    }
}

const openModalBtn = document.getElementById('openModalBtn');
const modalOverlay = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModalBtn');
const submitBtn = document.getElementById('submitBtn');
const cityInput = document.getElementById('cityInput');

function openModal() {
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    cityInput.value = '';
    cityInput.focus();
}

function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

submitBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

cityInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        submitBtn.click();
    }
});