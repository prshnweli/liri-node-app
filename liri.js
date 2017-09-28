var keys = require('./keys.js');

//-----------------------------------------------------------------------------------------------
// twitter section working
function tweet() {

	var Twitter = require('twitter');

	var twitterKeys = new Twitter(keys.twitterKeys);
	 
	var params = {screen_name: 'paswizzles'};
	twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    for (var i = 0; i < tweets.length && i < 21; i++) {
		console.log("tweeted:", "'"+tweets[i].text+"'", "at", tweets[i].created_at);
		}
	  } else(console.log(error));
	});

};

//-----------------------------------------------------------------------------------------------
// spotify is now working
function spot() {
	var Spotify = require('node-spotify-api');

	var spotify = new Spotify(keys.spotifyKeys);

	if (process.argv[3] === undefined) {
		process.argv[3] = 'The Sign Ace of Base'
	};

	spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

	var artistName = data.tracks.items[0].artists[0].name;
	var songName = data.tracks.items[0].name;
	var link = data.tracks.items[0].href;
	var album = data.tracks.items[0].album.name;
	 
	console.log("Artist Name:", artistName); 
	console.log("Song Name:", songName);
	console.log("Song Link:", link);
	console.log("Album Name:", album);
});

};

//-----------------------------------------------------------------------------------------------
// movie-this working
function movie() {
	var request = require("request");
	var nodeArgs = process.argv;
	var movieName = "";

	for (var i = 3; i < nodeArgs.length; i++) {
	  if (i > 3 && i < nodeArgs.length) {
	    movieName = movieName + "+" + nodeArgs[i];
	  } else {
			movieName += nodeArgs[i];
	  }
	};

	if(process.argv[3] === undefined){
		movieName = "Mr. Nobody"
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body) {

	  if (!error && response.statusCode === 200) {
	    console.log("Title:", JSON.parse(body).Title);
	    console.log("Release Year:", JSON.parse(body).Year);
	    console.log("IMDB Rating:", JSON.parse(body).imdbRating);
	    console.log("Rotten Tomatoes Rating:", JSON.parse(body).Ratings[1].Value);
	    console.log("Country:", JSON.parse(body).Country);
	    console.log("Language:", JSON.parse(body).Language);
	    console.log("Plot:", JSON.parse(body).Plot);
	    console.log("Actors:", JSON.parse(body).Actors)
	  }
	});
}

//-----------------------------------------------------------------------------------------------
//Last thing
function readingTxt (){
  var fs = require ("fs");

  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error){
      //return console.log(error);
    }

    var dataArr = data.split(",");

    if (dataArr[0] === 'my-tweets'){
    	tweet();
    }

    if (dataArr[0] === 'spotify-this-song'){
    	process.argv[3] = dataArr[1];
    	spot();
    }

    if (dataArr[0] === 'movie-this'){
    	process.argv[3] = dataArr[1];
    	movie();
    }
  }) 
}; 
//-----------------------------------------------------------------------------------------------
// statements to run program in node

if (process.argv[2] === undefined){
	console.log("Welcome to Liri. For tweets type in 'my-tweets'");
	console.log("To search up info on a song type in 'spotify-this-song' and then enter the song title.");
	console.log("To search up info on a movie type in 'movie-this' and then enter the movie.");
	console.log("To run the command in the text file type in 'do-what-it-says'");
}

if (process.argv[2] === 'my-tweets'){
	tweet();
};

if (process.argv[2] === 'spotify-this-song'){
	spot();
};

if (process.argv[2] === 'movie-this'){
	movie();
};

if (process.argv[2] === 'do-what-it-says'){
	readingTxt();
};