export function initializeApp() {
    const searchButton = document.querySelector("#search-btn");
    const clearButton = document.querySelector("#reset-btn");

    searchButton.addEventListener("click", fetchCurrentWeather);
    clearButton.addEventListener("click", clearSearch);
    document.addEventListener("DOMContentLoaded", hideBrokenImg);
}


