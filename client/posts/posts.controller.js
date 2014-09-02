angular.module('posts', [
  'posts.directive',
  'services'
  ])
	.controller('PostsController', function($scope, GetPosts) {
    // $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=http://kiafathi.azurewebsites.net/rss/')
    //   .success(function(res) {
    //     console.log(res);
    //   });
    $scope.data={};
    var getPosts = function() {
      GetPosts.gotten().success(function(posts) {
        angular.forEach(posts.data.children, function(value, key) {
          console.log("value",value.data);
            // render the directive
          $scope.data.posts = value;
        });
      });
    };

  getPosts();
})
  .controller('clicker', function($scope, GetPosts) {
    $scope.clicked = function() {
      console.log('clicked');
    };

    var getUnixTime = function(ts) {
      var date = new Date(ts*1000);
      return (date);
    };

    var getPosts = function() {
      GetPosts.gotten().success(function(posts) {
        angular.forEach(posts.data.children, function(value, key) {
          console.log("value",value.data);
          // render the directive
          $scope.post = value.data;
          $scope.post.date = getUnixTime(value.data.created);
        });
      });
    };

    // getPosts();
  });

  // angular.bootstrap(document, ['posts'])

