// var Twitter = require('twitter');
 
// var twitterKeys = new Twitter({
//   consumer_key: "bZfMAMt4zbko7p7mSYuQg3H0v",
//   consumer_secret: '8S1pF8LphS2vTh09gipihO6V9rRLZJXGg9ougSfyv0hGKl7fji',
//   access_token_key: '3168239629-BBNdZi3YqCRvkoeiF2u1dxpBcRBaKsurutMiXbz',
//   access_token_secret: 'fgJiNRVprdeaxL7qHPU0P0Puf2AGjoxpJn0nhh6wiHgL7'
// });
 
// var params = {screen_name: 'paswizzles'};
// twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     for (var i = 0; i < tweets.length && i < 21; i++) {
// 	console.log("tweeted:", "'"+tweets[i].text+"'", "at", tweets[i].created_at);
// 	}
//   }
// });

//

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: 'af96cfa3b7c54de0b057cc32e21638a9',
  secret: 'ed0244b58f2f412581ac235c39758d6b'
});
 
spotify.search({ type: 'track', query: 'Buttercup' }, function(err, data) {
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
