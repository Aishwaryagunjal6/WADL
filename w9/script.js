//  // Local weather data repository
//  const citiesWeather = {
//   "london": {
//       name: "London",
//       temperature: 18,
//       humidity: 65,
//       conditions: "Cloudy"
//   },
//   "paris": {
//       name: "Paris",
//       temperature: 22,
//       humidity: 55,
//       conditions: "Sunny"
//   },
//   "new york": {
//       name: "New York",
//       temperature: 15,
//       humidity: 70,
//       conditions: "Rainy"
//   },
//   "tokyo": {
//       name: "Tokyo",
//       temperature: 25,
//       humidity: 60,
//       conditions: "Clear"
//   }
// };

// function getWeather() {
//   const cityInput = document.getElementById('cityInput');
//   const city = cityInput.value.toLowerCase().trim();
//   const weatherCard = document.getElementById('weatherCard');
//   const errorMessage = document.getElementById('errorMessage');

//   // Hide previous results
//   weatherCard.style.display = 'none';
//   errorMessage.style.display = 'none';

//   // Simulate AJAX call with local data
//   setTimeout(() => {
//       if (citiesWeather[city]) {
//           const weatherData = citiesWeather[city];
//           document.getElementById('cityName').textContent = weatherData.name;
//           document.getElementById('temperature').textContent = weatherData.temperature;
//           document.getElementById('humidity').textContent = weatherData.humidity;
//           document.getElementById('conditions').textContent = weatherData.conditions;
//           weatherCard.style.display = 'block';
//       } else {
//           errorMessage.style.display = 'block';
//       }
//   }, 300); // Simulate network delay
// }

// // Handle Enter key press
// document.getElementById('cityInput').addEventListener('keypress', function(e) {
//   if (e.key === 'Enter') {
//       getWeather();
//   }
// });


function getWeather() {
    const city = document.getElementById("city").value.trim();
    const errorMessage = document.getElementById("error-message");
    const weatherInfo = document.getElementById("weather-info");
    errorMessage.innerHTML = '';
    weatherInfo.innerHTML = '';
    
    if (city === '') {
      errorMessage.innerHTML = "Please enter a city name.";
      return;
    }

    // Fetch the local JSON file (weather data)
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "weather_data.json", true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        const cityKey = Object.keys(data).find(key => key.toLowerCase() === city.toLowerCase());
        if (cityKey) {
          const cityWeather = data[cityKey];
          weatherInfo.innerHTML = `
            <h3>Weather in ${cityKey}</h3>
            <p>Temperature: ${cityWeather.temperature}</p>
            <p>Humidity: ${cityWeather.humidity}</p>
            <p>Conditions: ${cityWeather.conditions}</p>
          `;
        } else {
          errorMessage.innerHTML = `Weather data for "${city}" is not available.`;
        }
      } else {
        errorMessage.innerHTML = "Error fetching weather data.";
      }
      error.innerHTML = "";
    };
    xhr.onerror = function() {
      errorMessage.innerHTML = "Error fetching weather data.";
    };
    xhr.send();
  }