 const request= require('request');
 const yargs =require('yargs');
 const weather = require('./weather.js');
 const argv =yargs.options({
   a: {
       demand: true,
       alisa: 'address',
       describe: 'Address to fetch weather',
       string: true

   }
 })

.argv;
var encodedaddress = encodeURIComponent(argv.a);


 request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedaddress}`,
    json:true
  },(error,response,body) => {
    try {
      console.log(`Address: ${body.results[0].formatted_address}`);
      console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
      console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
      weather.getweather(body.results[0].geometry.location.lat,body.results[0].geometry.location.lng, (errorMessage,weatherresults) => {
        if(errorMessage){
          console.log(errorMessage);
        } else {
          console.log(JSON.stringify(weatherresults,undefined,2));
        }
      });

     } catch (e) {
        console.log('Unable to find address');
        }
});
