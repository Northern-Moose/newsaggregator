angular.module('posts', [
  'posts.directive',
  'services'
<<<<<<< HEAD
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
=======
])

  .controller('PostsController', function($scope, GetPosts) {
    $scope.res=[];
    var getPosts = function() {
      GetPosts.gotten().success(function(posts) {
        angular.forEach(posts.data.children, function(value, key) {
          $scope.res.push(value.data);
        });
      });
    };

  getPosts();
});
>>>>>>> 6132c329029662a9462ade8c27ba3aa98408282b
