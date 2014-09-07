angular.module('posts', [
  'posts.directive',
  'services'
  ])
	.controller('PostsController', function($scope, GetPosts) {
    // $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=http://kiafathi.azurewebsites.net/rss/')
    //   .success(function(res) {
    //     console.log(res);
    //   });
    $scope.res=[];
    var getPosts = function() {
      GetPosts.gotten().success(function(posts) {
        angular.forEach(posts.data.children, function(value, key) {
          $scope.res.push(value.data);
        });
      });
    };

  getPosts();
})