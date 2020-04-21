// DOMs
const $weatherMain = document.querySelector('.weather-main');
const $boxTop = document.querySelector('.box-top');
const $weeklyTemp = document.querySelector('.weekly-temp');
const $weeklyIcon = document.querySelector('.weekly-i');

// toggle weather box
const openWeatherBox = weatherbox => {
  weatherbox.style.display = 'block';
};

const closeWeatherBox = weatherbox => {
  weatherbox.style.display = 'none';
};

// Weather API
const API_KEY = 'bbcad54aeb4d627c3798f0773d883830';

const weatherRender = res => {
  const [continent, city] = res.timezone.split('/');
  const temperature = Math.floor(res.current.temp);
  const [{ id: currentId, description }] = res.current.weather;
  const weeklyId = res.daily.map(day => day.weather.reduce((acc, dayW) => (acc + dayW.id), 0));
  const weeklyTemp = res.daily.map(day => [Math.floor(day.temp.min), Math.floor(day.temp.max)]);
  const dayName = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  let currentIcon = '';
  if (currentId >= 200 && currentId < 300) currentIcon = 'icon-clouds';
  if (currentId >= 300 && currentId < 400) currentIcon = 'icon-cloud-sun';
  if (currentId >= 500 && currentId < 700) currentIcon = 'icon-rain';
  if (currentId >= 700 && currentId < 800) currentIcon = 'icon-clouds';
  if (currentId === 800) currentIcon = 'icon-sun';
  if (currentId > 800) currentIcon = 'icon-cloud-sun';

  $weatherMain.innerHTML = `
    <i class="${currentIcon} main-i main-i-id"></i>
    <span class="main-temp">${temperature}</span>
    <i class="icon- main-celccelciusius"></i>
    <div class="main-location">${city}, ${continent}</div>
  `;

  $boxTop.innerHTML = `
    <div class="box-location">${city}, ${continent}</div>
    <div class="box-state box-state-id">${description}</div>
    <i class="${currentIcon} box-i box-i-id"></i>
    <span class="box-temp">${temperature}</span>
    <i class="icon-celcius box-celcius"></i>
  `;

  const $weeklyDay = document.querySelector('.weekly-day');
  dayName.forEach((_, i, arr) => {
    const today = new Date();
    $weeklyDay.innerHTML += `<span class="day-id">${arr[(today.getDay() + i) % 7]}</span>`;
  });

  let weeklyIcon = '';
  weeklyId.forEach(dailyId => {
    if (dailyId >= 200 && dailyId < 300) weeklyIcon = 'icon-clouds';
    if (dailyId >= 300 && dailyId < 400) weeklyIcon = 'icon-cloud-sun';
    if (dailyId >= 500 && dailyId < 700) weeklyIcon = 'icon-rain';
    if (dailyId >= 700 && dailyId < 800) weeklyIcon = 'icon-clouds';
    if (dailyId === 800) weeklyIcon = 'icon-sun';
    if (dailyId > 800) weeklyIcon = 'icon-clouds';
    $weeklyIcon.innerHTML += `<i class="${weeklyIcon} i-id"></i>`;
  });

  weeklyTemp.forEach(([min, max]) => {
    $weeklyTemp.innerHTML += `
      <div class="weelky-temp-id">
        <span class="weekly-max-id">${max}</span>
        <span class="weekly-min-id">${min}</span>
      </div>
    `;
  });

  $weeklyIcon.removeChild($weeklyIcon.lastElementChild);
  $weeklyTemp.removeChild($weeklyTemp.lastElementChild);
};

// Get weather Object
const getWeather = (lat, lng) => {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(res => weatherRender(res));
};

// Get Coordinate
const succesLocation = position => {
  const { latitude } = position.coords;
  const { longitude } = position.coords;
  getWeather(latitude, longitude);
};

const errorLocation = () => {
  alert('Sorry, no position available.');
};

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(succesLocation, errorLocation);
};

const weatherInit = () => {
  getLocation();
};

export { openWeatherBox, closeWeatherBox, weatherInit };
