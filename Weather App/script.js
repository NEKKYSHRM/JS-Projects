document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWheatherBtn = document.getElementById("get-weather-btn");
  const wheatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const tempDisplay = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "1467f2b189e0fb866dc8bebfcabb1de5";

  getWheatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    // console.log(city);

    try {
      const wheatherData = await fetchWeatherData(city);
      displayWeatherData(wheatherData);
    } catch (error) {
      showsError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    // console.log(typeof response);
    // console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log(data);
    const {name, main, weather} = data
    cityName.textContent = name
    tempDisplay.textContent = `Temperature: ${main.temp}`
    description.textContent = `Weather: ${weather[0].description}`
    wheatherInfo.classList.remove("hidden")
    errorMessage.classList.add("hidden")
  }

  function showsError() {
    wheatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
