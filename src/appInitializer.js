export function initializeApp() {
    const searchButton = document.querySelector(".search-button");
    const clearButton = document.querySelector(".reset-button");

    searchButton.addEventListener("click", fetchCurrentWeather);
    clearButton.addEventListener("click", clearSearch);
    document.addEventListener("DOMContentLoaded", hideBrokenImg);
}


