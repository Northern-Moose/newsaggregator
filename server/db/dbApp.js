// the service handles the get requests and routes the response
// to the correct factory for data processing--makes models
var apiToUrl = {
  reddit: '',
  npr: '',
  rss: ''
}

angular.module('dbApp', [
])

.service('getApi', function($http, $q) {

  this.fetchFromApi = function (api) {
    var request = $http({
      method: 'get',
      url: apiToUrl[api]
      // params: {}
      // data: {},
    });
  };

  this.sendMessage = function() {
    return $q(request).then(function(err, data) {
      if (err) {
        throw new Error(err);
        console.log(err);
      } else {
        return data;
      }
    }))
  };

  this.sendToFactory = function(api) {
  }
})

.factory('makeModels', function(api) {
  var data = getApi.sendMessage();
    if (api ==='reddit') {
      data.forEach(post, i) {
        new RedditPost({
          title: post.title,
          url: post.data.permalink,
          content: 'post.data.url \n upvotes: ' + post.data.ups + ' | downvotes: ' post.data.downs,
          createdAt: RedditPost.getUnixTime(post.data.created)
        });
      }
    };
    else if (api ==='npr') {
      data.forEach(post, i) {
        new nprPost ({
          title: post.title.$text,
          url: post.link[0].$text,
          thumbnailUrl: post.thumbnail.large.$text,
          author: post.byline[0].name.$text,
          content: post.teaser.$text + post.text.paragraph[0].$text,
          createdAt: post.pubDate.$text
        })
      }
    };
    else (api ==='rss') {
      new rssPost ({
        title: post.title,
        url: post.link,
        content: post.contentSnippet,
        createdAt: post.publishedDate
      })
    };
});
