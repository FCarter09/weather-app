

var searchInputEl = document.querySelector(".input")
var searchButtonEl = document.querySelector(".button")

var cityNameEl = document.querySelector("#cityName")
var currentTempEl = document.querySelector('#currentTemp')
var currentHumidityEl = document.querySelector("#currentHumidity")
var currentWindEl = document.querySelector("#currentWind")

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

//getCurrentWeather()

//create searchHandler function
var searchHandler = function(event) {

    event.preventDefault();
    
    
    
    //get value form input element
    var cityName = searchInputEl.value.trim();
    

    if (cityName) {
        getCurrentWeather(cityName);
        searchInputEl.value = "";
        
        
    }
    else {
        alert("Please enter a city name");
    }


}



//search button to display city 
searchButtonEl.addEventListener("click", searchHandler);

  // displays cities
var displayCity = function (currentWeatherData, cityName) {
    console.log(currentWeatherData);
    // currentWeathrData is in JSON format. This means that it is an object
    // extract the things we want from the currentWeatherData and save them in variables to use later
   
    var temp = currentWeatherData.main.temp
    console.log('current temp', temp)

    var humidity = currentWeatherData.main.humidity
    console.log('current humidity', humidity);
    
    var wind = currentWeatherData.wind.speed
    console.log('windspeed', wind);
   
   //display weather data for city

   
   cityNameEl.textContent = cityName
   currentTempEl.textContent = temp
   currentHumidityEl.textContent = humidity
   currentWindEl.textContent = wind
   



}

