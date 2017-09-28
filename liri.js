// twitter section working
var keys = require('./keys.js');

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


// spotify

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

if (process.argv[2] === undefined){
	console.log("Welcome to Liri. For tweets type in 'my-tweets', to spotify a song type in 'spotify-this-song' and then enter the song title.")
}

if (process.argv[2] === 'my-tweets'){
	tweet();
};

if (process.argv[2] === 'spotify-this-song'){
	spot();
};
