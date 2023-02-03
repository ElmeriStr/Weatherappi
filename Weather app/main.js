//Get all necessary elements from the DOM
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const cloudOutput = document.querySelector('.cloud');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
const icon = document.querySelector('.icon');


//Default city 
let cityInput = "London";



//Add submit event to the form
form.addEventListener('submit', (e) => {
 
  if(search.value.length == 0) {
    alert('Please type in a city name');
  } else {
   
    cityInput = search.value;
    
    fetchWeatherData();
  
    search.value = "";
    //Fade out the app (simple animation)
    app.style.opacity = "0";
  }
  
  //Prevents the default behaviour of the form
  e.preventDefault();
});

//Click event
cities.forEach((city) => {
  city.addEventListener('click', (e) => {
    //Change from default city to the clicked one
    cityInput = e.target.innerHTML;
    
    fetchWeatherData();
    //Fade out
    app.style.opacity = "0";
  });
})

//function for days
function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday", 
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday"
  ];
  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};


function fetchWeatherData() {

fetch(`http://api.weatherapi.com/v1/current.json?key=de94502061f24c2a8e0225417233001&q=${cityInput}`)

  //Take the data Which is in JSON format

  .then(response => response.json())
  .then(data => {
    
    console.log(data);
    
  
    temp.innerHTML = data.current.temp_c + "&#176;";
    conditionOutput.innerHTML = data.current.condition.text;
    
    const date = data.location.localtime;
    const y = parseInt(date.substr(0, 4));
    const d = parseInt(date.substr(5, 2));
    const m = parseInt(date.substr(8, 2));
    const time = date.substr(11); 
    
    dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
    timeOutput.innerHTML = time;
    
    nameOutput.innerHTML = data.location.name;
    
    const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
   
    icon.src = "./icons/" + iconId;

       //Set default time of day
       let timeOfDay = "day";
       //Getid for weather condiotions
       const code = data.current.condition.code; 
    
    //Add the weather details to the page
    cloudOutput.innerHTML = data.current.cloud + "%";
    windOutput.innerHTML = data.current.wind_kph + "km/h";
    
 
    
    //Change to night if its night time in the city
    if(!data.current.is_day) {
      timeOfDay = "night";
    } 
    
    if(code == 1000) { 
      /*Set the background image to 
      clear if the weather is clear*/
      app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
      
    }
    /*Same thing for cloudy weather*/
    else if (
      code == 1003 ||
      code == 1006 ||
      code == 1009 ||
      code == 1030 ||
      code == 1069 ||
      code == 1087 ||
      code == 1135 ||
      code == 1273 ||
      code == 1276 ||
      code == 1279 ||
      code == 1282
    ) {
      app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
    
    /*And rain*/
    } else if (
      code == 1063 ||
      code == 1069 ||
      code == 1072 ||
      code == 1150 ||
      code == 1153 ||
      code == 1180 ||
      code == 1183 ||
      code == 1186 ||
      code == 1189 ||
      code == 1192 ||
      code == 1195 ||
      code == 1204 ||
      code == 1207 ||
      code == 1240 ||
      code == 1243 ||
      code == 1246 ||
      code == 1249 ||
      code == 1252 
    ) {
      app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
      
    //snow background
    } else {
      app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`
     
    }
    //Fade in the page once all is done
    app.style.opacity = "1";
  })
  //if user types city that doesnt exist, give alert
  .catch(() => {
    alert('City not found, please try again');
    app.style.opacity = "1";
  });
}

//Call the function on page load
fetchWeatherData();

//Fade in the page
app.style.opacity = "1";
  




