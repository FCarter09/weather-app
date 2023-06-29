
var searchInputEl = document.querySelector(".input")
var searchButtonEl = document.querySelector(".button")
var cityNameEl = document.querySelector("#cityName")
var currentTempEl = document.querySelector('#currentTemp')
var currentHumidityEl = document.querySelector("#currentHumidity")
var currentWindEl = document.querySelector("#currentWind")


//loads saved cities to page
function onPageLoad() {
    var savedCities = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    console.log(savedCities);

    let cityList = document.querySelector('.city-list')

    for (var i = 0; i < savedCities.length; i++) {
    console.log("saved cities:", savedCities);

       let cityListItem = document.createElement('li')
        var button = document.createElement('button')
        button.textContent = savedCities[i]
        button.classList.add('buttons')
        button.id = Math.floor(Math.random() * 100)
        button.setAttribute('id', button.id)
        cityListItem.appendChild(button)
        cityListItem.classList.add('city-list-item')
        cityList.appendChild(cityListItem)
    }

   // eventListeners for recent search buttons
   var savedCityButtons = document.querySelectorAll('.buttons')
   console.log(savedCityButtons);

   for (let i = 0; i < savedCityButtons.length; i++) {
       // add eventListener for each button
       savedCityButtons[i].addEventListener('click', () => {
           var savedCityName = savedCityButtons[i].textContent

           getCurrentWeather(savedCityName);
           getFiveDayForecast(savedCityName);

           //set cityName into local storage
           setLocalStorage(savedCityName)
           searchInputEl.value = "";

           })

       }

}





 // call onPageLoad function
 onPageLoad()





//current weather function
var getCurrentWeather = function (cityName) {

    
    //current weather api
    var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=607a87148837798f253f19dd664831b9&units=imperial`

    //make request to URL
    fetch(currentWeather).then(function(response){
        response.json().then(function(data){
        //console.log(data);

        //call displayCity() in this function
        displayCity(data, cityName)
        })

    
        .catch(err => console.error(err));
    })

}





 // display city with current weather
 var displayCity = function (currentWeatherData, cityName) {
    // console.log(currentWeatherData);
    // currentWeatherData is in JSON format. This means that it is an object
    // extract the things we want from the currentWeatherData and save them in variables to use later
   
    var temp = currentWeatherData.main.temp
    // console.log('current temp', temp)

    var humidity = currentWeatherData.main.humidity
    // console.log('current humidity', humidity);
    
    var wind = currentWeatherData.wind.speed
    // console.log('wind speed', wind);
   
   //display weather data for city
   cityNameEl.textContent = cityName
   currentTempEl.textContent = temp
   currentHumidityEl.textContent = humidity
   currentWindEl.textContent = wind

}





// fiveDayForecast Function
var getFiveDayForecast = function (cityName) {

    
    //5 day weather api
    var fiveDayWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=607a87148837798f253f19dd664831b9&units=imperial`
                           
    //make request to URL
    fetch(fiveDayWeather).then(function(response){
        response.json().then(function(data){
        // console.log(data.list);
        allTemps = []
        allHumidity = []
        allWind = []
        allDates = []
        //data.list has 40 weather forecast readings
        data.list.forEach(function(weatherReading) {
            //get weather reading for 12 noon each day
            if(weatherReading.dt_txt.slice(11,) === "12:00:00") {
                console.log(weatherReading);
                
                
                var fiveDayTemp = weatherReading.main.temp
                allTemps.push(fiveDayTemp)
                var fiveDayHumidity = weatherReading.main.humidity
                allHumidity.push(fiveDayHumidity)
                var fiveDayWind = weatherReading.wind.speed
                allWind.push(fiveDayWind)
                var fiveDayDate = weatherReading.dt_txt.slice(0,10) 
                allDates.push(fiveDayDate)

            }
            
        }) 
        // after getting weather data from the API call, now put the weather data on the page with the 5 day forecast
        // remember, the weather data is stored in arrays (ex: allWind). We need to get the data out of the arrays and put it in the right spot on the page
        // Day One Weather Information
        var dayOneDate = document.querySelector("#dayOneDate")
        var dayOneTemp = document.querySelector("#dayOneTemp")
        var dayOneHumidity = document.querySelector("#dayOneHumidity")
        var dayOneWind = document.querySelector("#dayOneWind")

        dayOneDate.textContent =  `${allDates[0]}` 
        dayOneTemp.textContent = `Temp: ${allTemps[0]}`
        dayOneHumidity.textContent = `Humidity: ${allHumidity[0]}`
        dayOneWind.textContent = `Wind: ${allWind[0]}`

        // Day Two Weather Information
        var dayTwoDate = document.querySelector("#dayTwoDate")
        var dayTwoTemp = document.querySelector("#dayTwoTemp")
        var dayTwoHumidity = document.querySelector("#dayTwoHumidity")
        var dayTwoWind = document.querySelector("#dayTwoWind")

        dayTwoDate.textContent =   `${allDates[1]}`
        dayTwoTemp.textContent = `Temp: ${allTemps[1]}`
        dayTwoHumidity.textContent = `Humidity: ${allHumidity[1]}`
        dayTwoWind.textContent = `Wind: ${allWind[1]}`

        // Day Three Weather Information

        var dayThreeDate = document.querySelector("#dayThreeDate")
        var dayThreeTemp = document.querySelector("#dayThreeTemp")
        var dayThreeHumidity = document.querySelector("#dayThreeHumidity")
        var dayThreeWind = document.querySelector("#dayThreeWind")

        dayThreeDate.textContent =   `${allDates[2]}`
        dayThreeTemp.textContent = `Temp: ${allTemps[2]}`
        dayThreeHumidity.textContent = `Humidity: ${allHumidity[2]}`
        dayThreeWind.textContent = `Wind: ${allWind[2]}`

        // Day Four Weather Information

        var dayFourDate = document.querySelector("#dayFourDate")
        var dayFourTemp = document.querySelector("#dayFourTemp")
        var dayFourHumidity = document.querySelector("#dayFourHumidity")
        var dayFourWind = document.querySelector("#dayFourWind")

        dayFourDate.textContent =  ` ${allDates[3]}` 
        dayFourTemp.textContent = `Temp: ${allTemps[3]}`
        dayFourHumidity.textContent = `Humidity: ${allHumidity[3]}`
        dayFourWind.textContent = `Wind: ${allWind[3]}`

        // Day Five Weather Information

        var dayFiveDate = document.querySelector("#dayFiveDate")
        var dayFiveTemp = document.querySelector("#dayFiveTemp")
        var dayFiveHumidity = document.querySelector("#dayFiveHumidity")
        var dayFiveWind = document.querySelector("#dayFiveWind")

        dayFiveDate.textContent =  `${allDates[4]}` 
        dayFiveTemp.textContent = `Temp: ${allTemps[4]}`
        dayFiveHumidity.textContent = `Humidity: ${allHumidity[4]}`
        dayFiveWind.textContent = `Wind: ${allWind[4]}`
    })

    
        .catch(err => console.error(err));
    })

}





//create searchHandler function
var searchHandler = function(event) {

    event.preventDefault();
    
    
    
    //get value from input element
    var cityName = searchInputEl.value.trim();
    

    if (cityName) {
        getCurrentWeather(cityName);
        getFiveDayForecast(cityName);

        //set cityName into local storage
        setLocalStorage(cityName)
        searchInputEl.value = "";
        
        
    }
    else {
        alert("Please enter a city name");
    }   

}





//search button to display city 
searchButtonEl.addEventListener("click", searchHandler);




// Display searched cities as list of buttons
var setLocalStorage = function(city) {

    //checks local storage
    let recentSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    
    //we will limit recent searches to latest five searches
    recentSearches = recentSearches.slice(0,4)
    
    //unshift puts last searched city into front of array
    recentSearches.unshift(city)

    // check to see if there are duplicate city names in the local, if so delete duplicates
    recentSearches = [ ...new Set(recentSearches) ];

    //make dom element for list of cities
    var cityList = document.querySelector('.city-list')

    //want to delete anything inside of city-list
    cityList.replaceChildren()


    //make list item element for each city
    // loop over the cities in recent searches
    for (let i = 0; i < recentSearches.length; i++) {
        var cityListItem = document.createElement('li')
        var button = document.createElement('button')
        button.textContent = recentSearches[i]
        button.classList.add('buttons')
        button.id = Math.floor(Math.random() * 100)
        button.setAttribute('id', button.id)
        cityListItem.appendChild(button)
        cityListItem.classList.add('city-list-item')
        cityList.appendChild(cityListItem)

    }

    // eventListeners for recent search buttons
    var savedCityButtons = document.querySelectorAll('.buttons')
    console.log(savedCityButtons);

    for (let i = 0; i < savedCityButtons.length; i++) {
        // add eventListener for each button
        savedCityButtons[i].addEventListener('click', () => {
            var savedCityName = savedCityButtons[i].textContent

            getCurrentWeather(savedCityName);
            getFiveDayForecast(savedCityName);

            //set cityName into local storage
            setLocalStorage(savedCityName)
            searchInputEl.value = "";

            })

        }
   
    //sets item to local storage
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
}



 







