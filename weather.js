const request = require('request');

var getweather = (lat,lan,callback) => {
  request({
    url:`https://api.darksky.net/forecast/bd974cde0ec92a4e92b13d760e83a486/${lat},${lan}`,
    json: true

  },(error,response,body)=>{
    if(error) {
      callback('unable to connect to forecast api');
    } else if (response.statusCode=== 400) {
      callback('unable to fetch weather');
    } else if (response.statusCode === 200) {
      callback(undefined,{
        temperature:body.currently.temperature,
        apparentTemperature:body.currently.apparentTemperature
      });
    } else {
      console.log('unable to fetch weater');
    }
  });
};
module.exports.getweather =getweather;
