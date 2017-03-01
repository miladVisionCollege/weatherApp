var http = require('http');
var api = require('./api.json');

function printError(error){
	console.error(error.message);
}
function printWeather(weather){
	var message = "current weather in "+weather.name+" is "+weather.weather[0].description;
	console.log(message); 
}

function get(query){
	var request = http.get("http://api.openweathermap.org/data/2.5/weather?q="+query+api.key, function(response){
		var body="";
		response.on("data",function(chunk){
			body+=chunk;
		});
		response.on("end",function(){
			console.log(response.statusCode);
			if(response.statusCode === 200){
				try{	
					var weather = JSON.parse(body);
					printWeather(weather);
				} catch(error){
					console.error(error.message);
				}
			} else{
				printError({message : "there was a problem with getting weather info for "+query});
			}		
		});

	});
	request.on("error",printError);
}

module.exports.get = get