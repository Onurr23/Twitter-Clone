const route = require('express').Router();
const tweetController = require('../Controllers/TweetController');

route.get('/',tweetController.getTweets);

route.post('/create',tweetController.createTweet);

route.post('/like/:id',tweetController.updateLike);

route.post('/delete/:id',tweetController.deleteTweet);

module.exports = route;