angular.module('posts', [
  'posts.directive',
  'getHTML'
  ])

  .controller('PostsController', function($scope, GetPosts) {
    $scope.post=[];
    var getPosts = function() {
      GetPosts.gotten().then(function(res) {
        angular.forEach(res, function(value, key) {
          $scope.post.push(value);
        })
      })

      // success(function(posts) {
      //   console.log("posts: ", posts);
      //   // angular.forEach(posts.data.children, function(value, key) {
      //   //   $scope.res.push(value.data);
      //   // });
      // });
    };
  getPosts();
});