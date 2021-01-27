$(document).ready(function () {
    let searchBtn = $("#searchBtn");

    // moultonborough lon and lat coordinates
    // "lon": -71.3967,
    // "lat": 43.7548


    searchBtn.click(function () {

        let city = $("#search-bar").val();

        // API KEY
        const apiKey = "9983ad0489f9a6d7abad43f5825d0e06";
        // Open Weather Map Url
        const dayUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
        //  Five day forecast weather Url
        const fivedayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";



        let search = $("#search-bar").val();

        // Current Weather api
        $.ajax({
            url: dayUrl,
            method: "GET"
        }).then(function (response) {

            let currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            let currentCity = currentCard.append("<p>");
            currentCard.append(currentCity);

            // Date Introduction 
            let dateTime = new Date(response.dt * 1000);
            currentCity.append(response.name + " " + dateTime.toLocaleDateString("en-US"));
            currentCity.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            // Weather Conditions GET
            let currentTemp = currentCity.append("<p>");
            currentCity.append(currentTemp);
            currentTemp.append(`<p>Tempurature: ${response.main.temp}° F</p>`);
            currentTemp.append(`<p>Feels Like: ${response.main.feels_like}° F</p>`);
            currentTemp.append(`<p>Humidity: ${response.main.humidity}%</p>`);
            currentTemp.append(`<p>Wind Speed: ${response.wind.speed}</p>`);



        })

        // 1.Formulas that make the project work
        // 2.Append divs and children to fill with info(weather conditions,temperature,humidity,wind speed,UV index)
        // 3.Introduce date function for current day and updated 5 day
        // 4.UV append card


        // fiveday Outlook api
        $.ajax({
            url: fivedayUrl,
            method: "GET"
        }).then(function (response) {
           


            })
        })

    })

    // const apiKey = "9983ad0489f9a6d7abad43f5825d0e06";
    // // UV index URL 
    // const UltraUrl = "https://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid=" + apiKey + "&units=imperial";
    // // UV api
    // $.ajax({
    //     url: UltraUrl,
    //     method: "GET"
    // }).then(function (response) { })

