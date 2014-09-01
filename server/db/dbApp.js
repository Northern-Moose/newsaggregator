// This service handles the get requests and routes the response
// to the appropriate factory for data processing. The factory
// creates the Bookshelf model used for pushing data to our
// content tables.
var apiToUrl = {
  reddit: '',
  npr: '',
  rss: ''
};

angular.module('dbApp', [])

.service('getApi', function($http, $q) {
  // Native Angular GET request
  this.fetchFromApi = function(api) {
    var request = $http({
      method: 'GET',
      url: apiToUrl[api]
      // params: {},
      // data: {}
    });
  };

  // Return data from API - will be used to create API-specific model
  this.sendMessage = function() {
    return $q(request).then(function(err, data) {
      if (err) {
        throw new Error(err);
      } else {
        return data;
      }
    });
  };
})

.factory('makeModels', function(api) {
  return function() {
    var data = getApi.sendMessage();
    if (api === 'reddit') {
      data.forEach(post, i) {
        new RedditPost({
          title: post.title,
          url: post.data.permalink,
          content: 'post.data.url\nupvotes: ' + post.data.ups + ' | downvotes: ' post.data.downs,
          createdAt: RedditPost.getUnixTime(post.data.created)
        });
      }
    };
    else if (api === 'npr') {
      data.forEach(post, i) {
        new nprPost({
          title: post.title.$text,
          url: post.link[0].$text,
          thumbnailUrl: post.thumbnail.large.$text,
          author: post.byline[0].name.$text,
          content: post.teaser.$text + post.text.paragraph[0].$text,
          createdAt: post.pubDate.$text
        });
      }
    };
    else if (api === 'rss') {
      new rssPost({
        title: post.title,
        url: post.link,
        content: post.contentSnippet,
        createdAt: post.publishedDate
      })
    };
  };
});
