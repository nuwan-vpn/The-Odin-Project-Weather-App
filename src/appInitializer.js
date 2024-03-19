export function initializeApp() {
    const searchButton = document.querySelector("#search-btn");
    const clearButton = document.querySelector("#reset-btn");

    searchButton.addEventListener("click", fetchCurrentWeather);
    clearButton.addEventListener("click", clearSearch);
}

async function fetchCurrentWeather(searchCity, searchState, searchCountry) {
    try {
        const searchCity = document.getElementById("city-input").value;
        const searchCountry = document.getElementById("country-input").value;
        
        // Run check to ensure City and Country fields have values
        if (searchCity == "" || searchCountry == "") {
            alert("City and Country are required.  Please try again!");
            return;
        }

        console.log(searchCity);
        console.log(searchCountry);

          // Run fetch and wait for response JSON
          const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
                            + searchCity + "," + searchCountry + "&appid=d06a59c02941be71d1bf04c2a8fcbc56", { mode: "cors"});
          const currentData = await response.json();
          console.log("Fetching current weather data from API....", currentData);
          
          // Construct object for my weather app from the API JSON data
          const currentWeather = {
              mainWeather: currentData.weather[0].main,
              place: currentData.name + ", "+ " " + currentData.sys.country,
              temp: Math.round(currentData.main.temp),
              humidity: currentData.main.humidity + "%",
              wind: Math.round(currentData.wind.speed) + " MPH"
          };
  
          console.log(currentWeather);
  
          displayWeather(currentWeather);


        } catch (err) {
            console.log("Something has went wrong with fetching the current weather data....", err);
            alert("Something has went wrong with fetching the current weather data....");
    }
}

function displayWeather(currentWeather) {
    const displayDiv = document.querySelector(".display-div");

    // Create the elements in the DOM
    const city = document.createElement("p");
    city.textContent = currentWeather.place;
    displayDiv.appendChild(city);
    const status = document.createElement("p");
    status.textContent = currentWeather.mainWeather;
    displayDiv.appendChild(status);
    const cityTemp = document.createElement("p");
    cityTemp.textContent = currentWeather.temp + " Degrees";
    displayDiv.appendChild(cityTemp);
    const cityHumidity = document.createElement("p");
    cityHumidity.textContent = currentWeather.humidity + " Humidity";
    displayDiv.appendChild(cityHumidity);
    const cityWind = document.createElement("p");
    cityWind.textContent = currentWeather.wind + " Wind";
    displayDiv.appendChild(cityWind);
}

function clearSearch() {
    document.getElementById("city-input").value = "";
    document.getElementById("country-input").value = "";
}

