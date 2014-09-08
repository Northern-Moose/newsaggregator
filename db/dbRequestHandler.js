var Q = require('q');
var http = require('http');
var db = require('./dbSchema.js');
// var RedditPosts = require('./collections/redditCollection.js');
var RedditPost = require('./models/redditModel.js');
// var NprPosts = require('./collections/nprCollection.js');
var NprPost = require('./models/nprModel.js');

var apiToUrl = {
  // Update with each API's URL
  reddit: 'http://www.reddit.com/.json',
  npr: ''
};

var dbRequests = {};

/************************************************************
API content requests
************************************************************/

dbRequests.fetchFromApi = function(api) {
  // Asynchronous promise that wraps GET request
  var deferred = Q.defer();
  var content = '';

  http.get(apiToUrl[api], function(res) {
    res.on('data', function(chunk) {
      content += chunk;
    });
    res.on('end', function() {
    	// Parsing the data here is not necessary
    	// for some APIs - Reddit, for example,
    	// returns a JSON. Maybe include some sort of
    	// check here so you don't parse every single
    	// GET request
      deferred.resolve(JSON.parse(content));
    });
  }).on('error', function(err) {
    deferred.reject(err.message);
  });

  return deferred.promise;
};

dbRequests.createModelsForApi = function(api) {
  if (apiToUrl[api]) {
    // "this" is used because this method is being called
    // from server.js. Consider using Q.nbind if you want
    // to move stuff around while preserving the correct
    // context for the method call
    this.fetchFromApi(api).then(function(apiData) {
      // First truncate API-specific content table
      db.knex(api + 'Content').truncate()
        .then(function() {});

      // Make Reddit models
      if (api === 'reddit') {
        apiData.data.children.forEach(function(post, index) {
          var redditPost = new RedditPost({
            title: post.data.title,
            url: post.data.permalink,
            content: 'post.data.url\nupvotes: ' + post.data.ups + ' | downvotes: ' + post.data.downs,
            createdAt: RedditPost.getUnixTime(post.data.created)
          });

          redditPost.save().then(function(newPost) {
          	// We don't even need the collections
            newPost.destroy();
            // RedditPosts.add(newPost);
          });
        });

      // Make NPR models
      } else if (api === 'npr') {
        apiData.forEach(function(post, index) {
          var nprPost = new NprPost({
            title: post.title.$text,
            url: post.link[0].$text,
            thumbnailUrl: post.thumbnail.large.$text,
            author: post.byline[0].name.$text,
            content: post.teaser.$text + post.text.paragraph[0].$text,
            createdAt: post.pubDate.$text
          });

          nprPost.save().then(function(newPost) {
          	// We don't even need the collections
            newPost.destroy();
            // NprPosts.add(newPost);
          });
        });
      }
    });
  }
};

dbRequests.allApisAtOnce = function() {
  this.createModelsForApi('reddit');
};

dbRequests.aggregateTables = function() {
  // Populates "sources" table with all available
  // API sources
  Object.keys(apiToUrl).forEach(function(api) {
  	// Check to see if sources already exist
    db.knex('sources').where({source: api})
      .select()
      .then(function(rows) {
        if (!rows.length) {
          db.knex('sources').insert({source: api})
            // For some reason, Knex needs this extra "then"
            // statement to actually perform the insert
            .then(function() {});
        }
      });
  });

  db.knex('aggregatedContent').truncate()
    .then(function() {
      // Insert Reddit content
      db.knex.raw('SELECT b.sourceKey, a.* FROM redditContent a INNER JOIN sources b ON "reddit" = b.source')
        .then(function(rows) {
          rows.forEach(function(row) {
            db.knex('aggregatedContent').insert({
              sourceKey: row.sourceKey,
              title: row.title,
              url: row.url,
              content: row.content,
              createdAt: row.createdAt
            })
              .then(function() {});
          });
        });
    });
};

dbRequests.automaticApiAggregation = function() {
  // Once all models have been created, then we aggregate
  // into our main aggregatedContent table
  // The use of promises here provides a layer of
  // flexibility when dealing with additional GET
  // requests not built into "createModelsForApi"
  var doAllApis = Q.nbind(this.allApisAtOnce, this);
  var aggregate = this.aggregateTables.bind(this);

  doAllApis().done(aggregate());
};

dbRequests.deliverContent = function() {
  db.knex.select().from('aggregatedContent')
    .then(function(rows) {
      return rows;
    });
};

/************************************************************
User requests
************************************************************/

dbRequests.addUser = function(userData, source) {
  if (source === 'facebook') {
    db.knex('users').insert({
      name: userData.name,
      userSpecificId: userData.id,
      link: userData.link
    })
      .then(function() {});
  }
};

dbRequests.fetchUser = function(userSpecificId) {
  db.knex('users').where({userSpecificId: userSpecificId})
    .select()
    .then(function(rows) {
      return rows;
    });
};

module.exports = dbRequests;
