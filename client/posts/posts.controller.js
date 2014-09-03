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
  // .controller('clicker', function($scope, GetPosts) {
  //   $scope.clicked = function() {
  //     console.log('clicked');
  //   };
  //   var getPosts = function() {
  //     GetPosts.gotten().success(function(posts) {
  //       angular.forEach(posts.data.children, function(value, key) {
  //         console.log("value",value.data);
  //         // render the directive
  //         $scope.post = value.data;
  //         $scope.post.date = getUnixTime(value.data.created);
  //       });
  //     });
  //   };

  //   // getPosts();
  // });

  // angular.bootstrap(document, ['posts'])

