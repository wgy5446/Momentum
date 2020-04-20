const openWeatherBox = weatherbox => {
  weatherbox.style.display = 'block';
};

const closeWeatherBox = weatherbox => {
  weatherbox.style.display = 'none';
};

const API_KEY = 'bbcad54aeb4d627c3798f0773d883830';

const currentRender = res => {
  const temperature = res.main.temp;
  console.log('current', temperature);
};

// const weeklyRender = res => {
//   const temperature = res.current.temp;
//   console.log('weekly', temperature);
// };

// const randomBg = () => { console.log('random bg'); };

const getCurrentWeather = (lat, lng) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}$units=metric`)
    .then(res => res.json())
    .then(res => {
      console.log('[current]', res);
      currentRender(res);
    });
};

// const getWeeklyWeather = (lat, lng) => {
//   fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
//     .then(res => res.json())
//     .then(res => {
//       console.log('[weekly]', res);
//       weeklyRender(res);
//     });
// };

// Coords
const succesLocation = position => {
  const { latitude } = position.coords;
  const { longitude } = position.coords;
  console.log('[coords]', latitude, longitude);
  getCurrentWeather(latitude, longitude);
  // getWeeklyWeather(latitude, longitude);
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

weatherInit();

export { openWeatherBox, closeWeatherBox };
