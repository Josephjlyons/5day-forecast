
let searchBtn = $("#searchBtn");

// moultonborough lon and lat coordinates
// "lon": -71.3967,
// "lat": 43.7548


searchBtn.click(function () {

    let city = $("#search-bar").val();

    // API KEY
    const apiKey = "9983ad0489f9a6d7abad43f5825d0e06";
    // Open Weather Map Url
    const queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    //  Five day forecast weather Url
    const fivedayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";
    // UV index URL 
    const UltraUrl = "https://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid=" + apiKey + "&units=imperial";

})
// Current Weather api
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {})

    // 1.Formulas that make the project work
    // 2.Append divs and children to fill with info(weather conditions,temperature,humidity,wind speed,UV index)
    // 3.Introduce date function for current day and updated 5 day
    // 4.UV append card
    

    // fiveday Outlook api
    $.ajax({
        url: fivedayUrl,
        method: "GET"
    }).then(function (response){})


    // UV api
    $.ajax({
        url: UltraUrl,
        method: "GET"
    }).then(function(response) {})