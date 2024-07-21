const req=require("request");

const openweatherapp={
    BASE_URL:"https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY:"042cbaf2c44583bbce4ecc062831b3d8"
};

const weatherdata1=(address,callback)=>{
    const url=openweatherapp.BASE_URL+encodeURIComponent(address)+"&APPID="+openweatherapp.SECRET_KEY;
    req({url,json:true},(error,data)=>
    {
if(error){
    callback(true,"Unable to fetch weather");
}
callback(false,data.body);
    });
    

};

module.exports=weatherdata1;