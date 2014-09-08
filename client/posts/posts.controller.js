angular.module('posts', [
  'posts.directive'
  ])

  .controller('PostsController', function($scope, GetPosts) {
    $scope.res=[];
    var getPosts = function() {
      GetPosts.gotten().then(function(res) {
        console.log("res", res);
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