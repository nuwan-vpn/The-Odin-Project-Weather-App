export function initializeApp() {
    const searchButton = document.querySelector("#search-btn");
    const clearButton = document.querySelector("#reset-btn");

    searchButton.addEventListener("click", fetchCurrentWeather);
    clearButton.addEventListener("click", clearSearch);
}

async function fetchCurrentWeather(searchCity, searchState, searchCountry) {
    try {
        const searchCity = document.getElementById("#city-input").value;
        const searchCountry = document.getElementById("#country-input").value;
        
        // Run check to ensure City and Country fields have values
        if (searchCity == "" || searchCountry == "") {
            alert("City and Country are required.  Please try again!");
            return;
        }

        console.log(searchCity);
        console.log(searchCountry);

          // Run fetch and wait for response JSON
          const response = await fetch("https://api.weatherapi.com/v1/current.json?q=" + searchCity + "," + searchCountry + "&units=imperial&APPID=d1f87e6c9c7218274f8b83bf9e900783", { mode: "cors"});
          const currentData = await response.json();
          console.log("Fetching current weather data from API....", currentData);
          
          // Construct object for my weather app from the API JSON data
          const currentWeather = {
              mainWeather: currentData.weather[0].main,
              place: currentData.name + ", " + searchState.toUpperCase() + " " + currentData.sys.country,
              temp: Math.round(currentData.main.temp),
              humidity: currentData.main.humidity + "%",
              wind: Math.round(currentData.wind.speed) + " MPH"
          };
  
          console.log(currentWeather);
  
          displayWeather(currentWeather);
  
          getGiphy(currentWeather.mainWeather);

        } catch (err) {
            console.log("Something has went wrong with fetching the current weather data....", err);
            alert("Something has went wrong with fetching the current weather data....");
    }
}

function clearSearch() {
    document.getElementById("#city-input").value = "";
    document.getElementById("#country-input").value = "";
}

