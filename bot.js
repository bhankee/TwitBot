var twit = require("twit");
var config = require("./config.js");

var Twitter = new twit(config);




// RETWEET BOT
var retweet = function() {
    var params = {
        q: "#Maythefourth, #Maythe4th",
        result_type: "recent",
        lang: "en"
    }

    Twitter.get("search/tweets", params, function(err, data) {

        if (!err){
                // grab id of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            screenName = "JeromeHardaway";
        tweetNow("@" + screenName + "from Hanks!");
            // Tell to retweet
            Twitter.post("statuses/retweet/:id", {
                id:retweetId,
            }, function(err, response){
                if (response) {
                    console.log("Retweet Success!");
                }
                //if there was an error
                if (err) {
                    console.log("Something went wrong while RETWEETING.");
                }
            });
            }
        // if unable to search a tweet
        else {
          console.log("Something went wrong while Searching.");
        }
      });
}

retweet();

setInterval(retweet, 3000000);

// FAVORITE BOT

var favoriteTweet = function(){
  var params = {
     q: "#Maythefourth, #Maythe4th",
     result_type: "recent",
     lang: "en"
  }


  // find tweet
  Twitter.get("search/tweets", params, function(err, data) {

    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);

    if(typeof randomTweet != "undefined" ){
      // favorite
      Twitter.post("favorites/create", {id: randomTweet.id_str},function(err, response){

        if(err){
          console.log("Error");
      }
        else{
          console.log("Success!");
        }
      });
    }
    });
}
favoriteTweet();
setInterval(favoriteTweet, 3600000);

function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};

// Interact with followers

var stream = Twitter.stream("user");

stream.on("follow", followed);

function followed(event) {
    console.console.log("Follow event on");
    // Get User name
    var name = event.source.name,
        screenName = event.source.screen_name;
    tweetNow("@" + screenName + "Thanks from Hanks!");
}

function tweetNow(tweetTxt) {
    var tweet = {
        status: tweetTxt

    }
    Twitter.post('statuses/update', tweet, function(err, data, response) {
   if(err){
     console.log("Error");
   }
   else{
     console.log("Awesomeness shown successfully");
   }
 });


}
