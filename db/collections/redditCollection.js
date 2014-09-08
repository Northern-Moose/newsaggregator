var db = require('../dbSchema.js');
var RedditPost = require('../models/redditModel.js');

var RedditPosts = new db.Collection();

RedditPosts.model = RedditPost;

module.exports = RedditPosts;
