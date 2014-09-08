var express = require('express');

var db = require('./db/dbSchema.js');
var NprPosts = require('./db/collections/nprCollection.js');
var NprPost = require('./db/models/nprModel.js');
var RedditPosts = require('./db/collections/redditCollection.js');
var RedditPost = require('./db/models/redditModel.js');
var RssPosts = require('./db/collections/rssCollection.js');
var RssPost = require('./db/models/rssModel.js');

var app = express();

// This handles requests to our users table
agg.get('/api/users', function(req, res) {

});

// This handles database calls to our aggregate content table
app.get('/api/content', function(req, res) {

});

// This will redirect to our Angular client
app.get('*', function(req, res) {
  res.sendfile('./client/index.html');
});

var port = process.env.PORT || 8080;

app.listen(port);
