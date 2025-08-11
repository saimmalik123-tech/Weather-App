function getIconUrl(condition) {
    const iconMap = {
        clear: 'https://img.icons8.com/ios-filled/100/000000/sun--v1.png',
        sunny: 'https://img.icons8.com/ios-filled/100/000000/sun--v1.png',
        'partly cloudy': 'https://img.icons8.com/?size=100&id=AQuvcCFdfitV&format=png&color=000000',
        cloudy: 'https://img.icons8.com/ios-filled/100/000000/cloud.png',
        overcast: 'https://img.icons8.com/?size=100&id=5wQgLB4cm28f&format=png&color=000000',
        rain: 'https://img.icons8.com/?size=100&id=pMGukwJCfgd0&format=png&color=000000',
        showers: 'https://img.icons8.com/?size=100&id=3MIeafag9t71&format=png&color=000000',
        drizzle: 'https://img.icons8.com/?size=100&id=pMGukwJCfgd0&format=png&color=000000',
        thunderstorm: 'https://img.icons8.com/ios-filled/100/000000/storm.png',
        snow: 'https://img.icons8.com/ios-filled/100/000000/snow.png',
        sleet: 'https://img.icons8.com/?size=100&id=2m7JsN4ZyvzZ&format=png&color=000000',
        'freezing rain': 'https://img.icons8.com/?size=100&id=18563&format=png&color=000000',
        blizzard: 'https://img.icons8.com/?size=100&id=qlJRoffslNg7&format=png&color=000000',
        fog: 'https://img.icons8.com/?size=100&id=y2n3B4DtCBSC&format=png&color=000000',
        haze: 'https://img.icons8.com/?size=100&id=bwSCNnqn06bI&format=png&color=000000',
        mist: 'https://img.icons8.com/?size=100&id=LktBoDfNx5kT&format=png&color=000000',
        wind: 'https://img.icons8.com/ios-filled/100/000000/wind.png',
        smoke: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Smoke_icon_iOS.png?20181224005744',
        dust: 'https://img.icons8.com/?size=100&id=19565&format=png&color=000000',
        sandstorm: 'https://img.icons8.com/?size=100&id=hAXjK121nDyx&format=png&color=000000',
        tornado: 'https://img.icons8.com/?size=100&id=9309&format=png&color=000000',
        'volcanic ash': 'https://img.icons8.com/?size=100&id=uRd97HrQOYxy&format=png&color=000000',
        hot: 'https://img.icons8.com/?size=100&id=cdzPi8NVc9TS&format=png&color=000000',
        cold: 'https://img.icons8.com/?size=100&id=105345&format=png&color=000000',
        humid: 'https://img.icons8.com/?size=100&id=9250&format=png&color=000000'
    };

    condition = condition.toLowerCase();

    if (condition.includes('clear') || condition.includes('sunny')) return iconMap.sunny;
    if (condition.includes('partly cloudy')) return iconMap['partly cloudy'];
    if (condition.includes('overcast')) return iconMap.overcast;
    if (condition.includes('cloudy')) return iconMap.cloudy;
    if (condition.includes('showers')) return iconMap.showers;
    if (condition.includes('drizzle')) return iconMap.drizzle;
    if (condition.includes('rain')) return iconMap.rain;
    if (condition.includes('freezing rain')) return iconMap['freezing rain'];
    if (condition.includes('blizzard')) return iconMap.blizzard;
    if (condition.includes('thunderstorm')) return iconMap.thunderstorm;
    if (condition.includes('snow')) return iconMap.snow;
    if (condition.includes('sleet')) return iconMap.sleet;
    if (condition.includes('fog')) return iconMap.fog;
    if (condition.includes('haze')) return iconMap.haze;
    if (condition.includes('mist')) return iconMap.mist;
    if (condition.includes('wind')) return iconMap.wind;
    if (condition.includes('smoke')) return iconMap.smoke;
    if (condition.includes('dust')) return iconMap.dust;
    if (condition.includes('sandstorm')) return iconMap.sandstorm;
    if (condition.includes('tornado')) return iconMap.tornado;
    if (condition.includes('volcanic ash')) return iconMap['volcanic ash'];
    if (condition.includes('hot')) return iconMap.hot;
    if (condition.includes('cold')) return iconMap.cold;
    if (condition.includes('humid')) return iconMap.humid;

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

getWeather('pakistan,hyderabad');