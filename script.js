function getIconUrl(condition) {
    const iconMap = {
        clear: 'https://img.icons8.com/ios-filled/100/000000/sun--v1.png',
        sunny: 'https://img.icons8.com/ios-filled/100/000000/sun--v1.png',
        'partly cloudy': 'https://img.icons8.com/ios-filled/100/000000/partly-cloudy-day--v1.png',
        cloudy: 'https://img.icons8.com/ios-filled/100/000000/cloud.png',
        rain: 'https://img.icons8.com/ios-filled/100/000000/rain.png',
        thunderstorm: 'https://img.icons8.com/ios-filled/100/000000/storm.png',
        snow: 'https://img.icons8.com/ios-filled/100/000000/snow.png',
        fog: 'https://img.icons8.com/ios-filled/100/000000/fog-day.png',
        haze: 'https://img.icons8.com/?size=100&id=9270&format=png&color=000000',
    };

    condition = condition.toLowerCase();

    if (condition.includes('clear') || condition.includes('sunny')) return iconMap.sunny;
    if (condition.includes('partly cloudy')) return iconMap['partly cloudy'];
    if (condition.includes('cloudy')) return iconMap.cloudy;
    if (condition.includes('rain')) return iconMap.rain;
    if (condition.includes('thunderstorm')) return iconMap.thunderstorm;
    if (condition.includes('snow')) return iconMap.snow;
    if (condition.includes('fog') || condition.includes('mist') || condition.includes('haze')) return iconMap.haze;

    return 'https://img.icons8.com/ios-filled/100/000000/sun--v1.png';
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