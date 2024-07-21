var weatherapi='/weather';
const weatherform=document.querySelector('form');
const search=document.querySelector('input');
const weathericon=document.querySelector('.weathericon i');
const weathercondition=document.querySelector('.weatherCondition');
const tempElement=document.querySelector('.temperature span');
const locationElement=document.querySelector('.place');
const dateElement=document.querySelector('.date');
const currentDate=new Date();
const option={month:"long"};
const monthName=currentDate.toLocaleString("en-us",option);
console.log(monthName);
dateElement.textContent=currentDate.getDate()+","+monthName;
if("geolocation" in navigator){
    
    locationElement.textContent="Loading...";
    navigator.geolocation.getCurrentPosition(
        function(position){
            const lat=position.coords.latitude;
            const long=position.coords.longitude;
            const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`;
            fetch(apiUrl).then( (response)=>
                response.json()).then( (data)=>{
                    if(data && data.address && data.address.city){
                        const city=data.address.city;
                        console.log(city);
                        showData(city);

                    }
                    else{

                    }
                }
                ).catch((error)=>{

                }
            )
            })
        
        }
else{
    console.log("Geolation is not available on browser");
}
    


weatherform.addEventListener("submit",(e)=>
{
    e.preventDefault();
    locationElement.textContent="Loading..."
    console.log(search.value);
    weathericon.className="";
    tempElement.textContent="";
    weathercondition.textContent="";
    showData(search.value);

});

function showData(city){
    getWeatherData(city,(result)=>{
        if(result.cod==200){
            if(result.weather[0].description=="rain"||result.weather[0].description=="fog"){
                 weathericon.className="wi wi-day-"+result.weather[0].description;
            }
            else{
           weathericon.className="wi wi-day-cloudy";}
           locationElement.textContent=result.name;
           tempElement.textContent=(result.main.temp-273.5).toFixed(2)+String.fromCharCode(176);
           console.log(result.weather[0].description.toUpperCase());
           weathercondition.textContent=result.weather[0].description.toUpperCase();
        }
        else{
            locationElement.textContent="City Not Found";
        }
        console.log(result);
    }
    )

}

function getWeatherData(city,callback){
    const locationAPi=weatherapi+"?address="+city;
    console.log(locationAPi);
    fetch(locationAPi).then((response)=>{
        response.json().then((response)=>{
            callback(response);
        });
    });

}



