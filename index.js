"use strict";

const express = require("express");
const bodyParser = require("body-parser");
//const uuidv1 = require('uuid/v1');
var request=require('request');

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);


app.post('/webhook',(req,res) =>{
	
	var city=req.body.result.parameters.geoCity;
	var w=getWeather(city);
	return res.json({
    speech: w,
    displayText: w,
    source: "webhook-echo-sample"
  });
	
	
});
var apiKey="34a9377e8da80bcf07ce23338784491c";
var result;
function getWeatherCity()
{
	result=undefined;
	var url="http://api.openweathermap.org/data/2.5/weather?q=$(city)&units=imperial&appid=$(apiKey)";
	console.log(url);
	var req=request(url,cb);
	while(result == undefined){
		require('deasync').runLoopOnce();
	}
		
	return result;
}
function cb(err,response,body){
	if(err)
		console.log(error);
	var weather=JSON.parse(body);
	if(weather.message === 'city not found')
	{
			result="unable to get weather "+weather.message;
	}
	else
	{
		result="Right now its "+weather.main.temp+" degree with "+weather.weather[0].description;
	}
}
app.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
