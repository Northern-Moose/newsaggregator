angular.module('posts', [
  'posts.directive',
  'services'
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
