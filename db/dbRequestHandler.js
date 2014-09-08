/*
Quick tip: How to add an API
1. Add API's URL to apiToUrl object
2. Add model creation to makeModels factory
3. Create model
4. Create collection
5. Modify saveData factory
6. Modify fetchData factory
*/
var apiToUrl = {
  // Update with each API's URL
  reddit: '',
  npr: '',
  rss: ''
};

angular.module('dbApp', [])
  // Generic GET request to API-specific URL
  .factory('getApi', function($q, $http, $log) {
    var output = {};

    output.fetchFromApi = function(api) {
      // Asynchronous promise that wraps GET request
      var deferred = $q.defer();

      // $http.get is a promise, but deferral is needed
      // to promisify request within makeModels factory
      $http.get(apiToUrl[api])
          .success(function(data) {
              deferred.resolve(data);
          }).error(function(msg, code) {
              deferred.reject(msg);
              // console.log error
              $log.error(msg, code);
          });

      return deferred.promise;
    };

    return output;
  })

  // Creates API-specific models for SQLite/Bookshelf use
  .factory('makeModels', function(getApi) {
    var output = {};

    output.createAll = function(api) {
      if (apiToUrl[api]) {
        // Create promise to return data from API
        var apiPromise = getApi.fetchFromApi(api);

        // Make Reddit models
        if (api === 'reddit') {
          apiPromise.then(function(apiData) {
            apiData.forEach(function(post, index) {
              new RedditPost({
                title: post.title,
                url: post.data.permalink,
                content: 'post.data.url\nupvotes: ' + post.data.ups + ' | downvotes: ' + post.data.downs,
                createdAt: RedditPost.getUnixTime(post.data.created)
              });
            });
          });

        // Make NPR models
        } else if (api === 'npr') {
          apiPromise.then(function(apiData) {
            apiData.forEach(function(post, index) {
              new NprPost({
                title: post.title.$text,
                url: post.link[0].$text,
                thumbnailUrl: post.thumbnail.large.$text,
                author: post.byline[0].name.$text,
                content: post.teaser.$text + post.text.paragraph[0].$text,
                createdAt: post.pubDate.$text
              });
            });
          });

        // Make RSS models
        } else if (api === 'rss') {
          apiPromise.then(function(apiData) {
            apiData.forEach(function(post, index) {
              new RssPost({
                title: post.title,
                url: post.link,
                content: post.contentSnippet,
                createdAt: post.publishedDate
              });
            });
          });
        }
      }
    };

    return output;
  })

  // Saves data to individual API content tables,
  // then saves all data to aggregate table using UNION
  .factory('saveData', function() {
  })

  // Will fetch data from aggregate content table
  .factory('fetchData', function() {
  });
