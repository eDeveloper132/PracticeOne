import { JSDOM } from "jsdom";

declare global {
  namespace NodeJS {
    interface Global {
      window: Window;
      document: Document;
    }
  }
}
const ApiKey = "e504dd454b9a28ba54e8f141639ca956";
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Type-safe element references
const searchBox = document.querySelector(".search input") as HTMLInputElement;
const searchBtn = document.querySelector(".search button") as HTMLButtonElement;
const weatherIcon = document.querySelector(".weather-icon") as HTMLImageElement;

const checkWeather = async (city: string) => {
  try {
    const response = await fetch(ApiUrl + city + "&appid=" + ApiKey);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
const datanameElement = document.querySelector(".city");
if (datanameElement){
    datanameElement.textContent = data.name;
}
const datatemp = document.querySelector(".temp");
if (datatemp){
    datatemp.textContent = Math.round(data.main.temp) + "°C";
}
const humidityElement = document.querySelector(".humidity");
if (humidityElement) {
  humidityElement.textContent = data.main.humidity + "%";
}
const WindElement = document.querySelector(".wind");
if (WindElement) {
  WindElement.textContent = data.wind.speed + "km/h";
}
// const weatherElement = document.querySelector(".weather") as HTMLElement;
// weatherElement.style.display = "block";
// const errorElement = document.querySelector(".error") as HTMLElement;
// errorElement.style.display = "none";

    weatherIcon.src = `images/${data.weather[0].main.toLowerCase()}.png`;
  } catch (error) {
    console.error("Error fetching data:", error);
    // const weatherElement = document.querySelector(".weather") as HTMLElement;
    // weatherElement.style.display = "none";
    // const errorElement = document.querySelector(".error") as HTMLElement;
    // errorElement.style.display = "block";
  }
};

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
