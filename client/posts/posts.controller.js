angular.module('posts', [
  'posts.directive'
  // 'getHTML'
  ])

  .controller('PostsController', function($scope, GetPosts) {
    $scope.post = [];
    var getPosts = function() {
      GetPosts.gotten().then(function(res) {
        angular.forEach(res, function(value, key) {
          $scope.post.push(value);
          console.log(value);
        })
      })
    };
    getPosts();
});