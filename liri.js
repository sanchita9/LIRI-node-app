// Grab data from keys.js. Node module imports needed to run the functions
var keys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var Spotify = require('node-spotify-api');
var client = new twitter(keys.twitterKeys);
var fs = require("fs");

// Stored argument's array
var nodeArgs = process.argv
var caseData = process.argv[2];


// will store movie or song
var functionData = "";

	for (var i = 3; i < nodeArgs.length; i++) {

		if(i > 3 && i < nodeArgs.length) {
			functionData = functionData + "+" + nodeArgs[i];
		}
		else {
			functionData = functionData + nodeArgs[i];
		}
	}

// / switch based on command received. Possible commands for liri app
   
	switch (caseData) {    
	    case "my-tweets":       
	         getMeTweets(functionData);       
	    	 break;     

	 	case "spotify-this-song":      
	 	     getMeSpotify(functionData);      
	         break;     

	 	case "movie-this":       
	 		 getMeMovie(functionData);      
	 		 break;     

	 	case "do-what-it-says":       
	         doWhatItSays();       
	         break;     
	 
	 default:  

	 console.log("LIRI doesn't know that. Please try with valid command!");  
  	break;
  }
 

 // Tweet function, uses the Twitter module to call Twitter api

 function getMeTweets() {

 	var screenName = {screen_name: 'MohiteSanchita9'};

 	client.get('statuses/user_timeline', screenName, function(error, tweets, response) {

 		if(!error) {
 			
 			for (var i = 0; i < tweets.length; i++) {
 			  var date = tweets[i].created_at;
 			
 			console.log("@MohiteSanchita9: " + tweets[i].text + " Created At: " + date.substring(0, 19));
 			console.log("------------------");

 			// adds text to log.txt
 			fs.appendFile('log.txt', "@MohiteSanchita9: " + tweet[i].text + "Created At: " + date.substring(0, 19));
 			fs.appendFile('log.txt', "-----------------------");
 		}
 	 } else {
 	 		console.log("Error occured!");
 	}
 	});
 }

 // Using Function to spotify-song
 function getMeSpotify(song) {

 	var spotify = new Spotify({
        id: "da24436a031e43bca509698c3c3d38d3",
        secret: "1001de50019440c682a5433acaa45969",
	});
 	spotify.search({type: 'track', query: song}, function(error, data) {
 		if(!error) {
 			for (var i = 0; i < data.tracks.items.length; i++) {
 				var songData = data.tracks.items[i];
 				// artist
 				console.log("Artist: " + songData.artists[0].name);
 				// song name
 				console.log("Song: " + songData.name);
 				// spotify preview link
 				console.log("Preview URL: " + songData.preview_url);
 				// name of the album
 				console.log("Album: " + songData.album.name);
 				console.log("--------------------");

 				// adds text to log.txt
 			fs.appendFile('log.txt', songData.artists[0].name);
 			fs.appendFile('log.txt', songData.name);
 			fs.appendFile('log.txt', songData.preview_url);
 			fs.appendFile('log.txt', songData.album.name);
 			fs.appendFile('log.txt', "---------------------");
 			}
 		}	else {
 			console.log("Error occured.There is no music!");
 		}	
 	  });
 	}

 	function getMeMovie(movie) {
 		if(movie === undefined) {
 			movie = "Mr. Nobody";
 				console.log("----------------");
 				console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
				console.log("It's on Netflix!");

				// adds text to log.txt
				fs.appendFile('log.txt', "------------");
				fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
				fs.appendFile('log.txt', "It's on Netflix!");
 			}
 			var omdbURL ="http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=40e9cece";
 		
 		request(omdbURL, function(error, response, body) {
 			if(!error && response.statusCode === 200) {
 				var body = JSON.parse(body);

 				console.log("Title: " + body.Title);
 				console.log("Release Year: " + body.Year);
 				console.log("IMdB Rating: " + body.imdbRating);
 				console.log("Country: " + body.Country);
 				console.log("Language: " + body.Language);
 				console.log("Plot: " + body.Plot);
 				console.log("Actors: " + body.Actors);
 				console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
 				console.log("Rotten Tomatoes URL: " + body.tomatoURL);

 			} else {
 				console.log("Error occurred. Can't find any movies");
 			}
 			
 		});
 	}

 	function doWhatItSays() {
 		fs.readFile("random.txt", "utf8", function(error, data) {
 			var txt = data.split(',');

 			getMeSpotify(txt[1]);
 		});
 	}
