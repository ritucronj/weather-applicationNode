const request=require('request');

const forecast=(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=90bf838bd39176e640014539a23a5686&query=${latitude},${longitude}&units=f`;

request({ url,json:true},(error,{body})=>{
    if(error){
          callback('Unable to connect to weather Service!',undefined);
    }else if(body.error){
          callback("Unable to find Location",undefined);
    }else{
        const data=body.current.weather_descriptions[0]+" It is "+body.current.temperature+ " degrees Farhenheit out.There is "+body.current.precip+"% chance of rain"
           callback(undefined,data);
    }

})
       
}

module.exports=forecast;
