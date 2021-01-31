$(document).ready(function () {
    let searchBtn = $("#searchBtn");



    searchBtn.click(function () {

        let city = $("#search-bar").val();
        let searchCityInput = $("#search-bar").val();

        // API KEY
        const apiKey = "9983ad0489f9a6d7abad43f5825d0e06";
        // Open Weather Map Url
        const dayUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
        //  Five day forecast weather Url
        const fivedayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;


        if (searchCityInput == "") {
            console.log(searchCityInput);
        } else {
            // Current Weather api
            $.ajax({
                url: dayUrl,
                method: "GET"
            }).then(function (response) {

                // local storage attempt
                // let searchInput = $("#search-bar").val();
                localStorage.setItem("key", (response.name));


                let prevSearch = localStorage.getItem(response.name);
                
                // Appends searches to list 
                let cityName = $(".list-previous-city").addClass("previousCity");
                cityName.append("<li>" + response.name + "</li>");
        


                // Starts Append to Card
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

                // UV API
                $.ajax({
                    url: ultraUrl,
                    method: "GET"
                }).then(function (response) {
                    let currentUv = ("<p>") + "UV Index: " + response.value + ("</p>");
                    let UvIndex = response.value;
                    // currentTemp.append(currentUv);

                    // Changes color of font depending on UV index

                    if (UvIndex <= 2) {
                        currentTemp.append(currentUv).addClass("favorable")
                    } if (UvIndex > 2.01 && UvIndex <= 6.9) {
                        currentTemp.append(currentUv).addClass("moderate")
                    } if (UvIndex >= 7) {
                        currentTemp.append(currentUv).addClass("severe")


                    }
                });


            });


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
            });

        }
    });

});
