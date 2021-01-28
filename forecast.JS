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
            currentCity.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            let dateTime = new Date(response.dt * 1000);
            currentCity.append(response.name + " " + dateTime.toLocaleDateString("en-US"));
            // Weather Conditions GET
            let currentTemp = currentCity.append("<p>");
            currentCity.append(currentTemp);
            currentTemp.append(`<p>Tempurature: ${response.main.temp}° F</p>`);
            currentTemp.append(`<p>Feels Like: ${response.main.feels_like}° F</p>`);
            currentTemp.append(`<p>Humidity: ${response.main.humidity}%</p>`);
            currentTemp.append(`<p>Wind Speed: ${response.wind.speed}</p>`);

     
            // UV index URL 
            let ultraUrl = `https://api.openweathermap.org/data/2.5/uvi?appid=9983ad0489f9a6d7abad43f5825d0e06&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            // UV api
            $.ajax({
                url: ultraUrl,
                method: "GET"
            }).then(function (response) {
                let currentUv = ("<p>") + "UV Index: " + response.value + ("</p>");
                currentTemp.append(currentUv);
            });



        });

        // 1.Formulas that make the project work
        // 2.Append divs and children to fill with info(weather conditions,temperature,humidity,wind speed,UV index)
        // 3.Introduce date function for current day and updated 5 day
        // 4.UV append card


        // fiveday Outlook api
        $.ajax({
            url: fivedayUrl,
            method: "GET"
        }).then(function (response) {
            let day = [0, 8, 16, 24, 32];
            let fiveDayCard = $(".fiveDayCard").addClass("card-body")
            let fiveDay = $(".currentFiveDay").addClass("card-text");
            fiveDay.empty();
            day.forEach(function (i) {
                let FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");
                fiveDay.append(`<div class=fiveDay><p>${FiveDayTimeUTC1}</p>${`<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">`}<p>Temperature: ${response.list[i].main.temp}° F</p><p>Humidity: ${response.list[i].main.humidity}%</p> <p>Wind Speed: ${response.list[i].wind.speed}</p></div>`);




            })
        })

    })
});
