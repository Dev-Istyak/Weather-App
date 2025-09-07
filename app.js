//WEATHER APP

const weatherform=document.querySelector(".weatherform");
const cityinput=document.querySelector(".inputcity");
const card=document.querySelector(".card");
const APIkey="e722a57eef248f5d5ec5d30f8583a927";

weatherform.addEventListener("submit", async event=>{
 event.preventDefault();
 const city=cityinput.value;

 if(city){
     try{
        const weatherData=await getweatherData(city);
        DisplayWeatherInfo(weatherData);

     }
    catch(error){
        console.error(error);
        DisplayError(error);
    }
 }
 else{
    DisplayError("Please enter a valid city");
 }
});

async function getweatherData(city){
   
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`

    const response= await fetch(apiurl);
    console.log(response);
    if(!response.ok){
        throw  new Error("Could not fetch weather data");
    }
    return await response.json();
};

function DisplayWeatherInfo(data){
 const { name: city, 
         main:{temp, humidity},
          weather:[{description,id}]}=data;

 card.textContent="";
 card.style.display="flex"

 const citydisplay= document.createElement("h1");
 const tempDisplay=document.createElement("p");
 const humidityDisplay=document.createElement("p");
 const resultDisplay=document.createElement("p");
 const EmojiDisplay=document.createElement("p");

citydisplay.textContent=city;
tempDisplay.textContent=`${(temp-273.15).toFixed(1)}° C`;
humidityDisplay.textContent=`humidity : ${ humidity}%`;
resultDisplay.textContent=description;
EmojiDisplay.textContent=GetweatherEmoji(id);

citydisplay.classList.add("cityname");
tempDisplay.classList.add("temp");
humidityDisplay.classList.add("humidity");
resultDisplay.classList.add("resultdis");
EmojiDisplay.classList.add("resultemoji");


card.appendChild(citydisplay);
card.appendChild(tempDisplay);
card.appendChild(humidityDisplay);
card.appendChild(resultDisplay);
card.appendChild(EmojiDisplay);

};

function GetweatherEmoji(WeatherId){
 switch(true){
    case(WeatherId >=200 && WeatherId<300):
       return "⛈️";
    case (WeatherId>=300 && WeatherId< 400):
       return "🌧️";
    case (WeatherId>=500 && WeatherId< 600):
       return "🌧️";
    case (WeatherId>=600 && WeatherId< 700):
       return "❄️";
    case (WeatherId>=700 && WeatherId< 800):
       return "🌫️";
    case (WeatherId===800):
       return "☀️";
    case (WeatherId>=801 && WeatherId< 810):
       return "☁️";
    default:
       return "❓";

 }
};

function DisplayError(message){
  const errordisplay= document.createElement("p");
  errordisplay.textContent=message;
  errordisplay.classList.add("errormsg");

  card.textContent="";
  card.style.display="flex";
  card.appendChild(errordisplay);


};
