angular.module('posts', [
  'posts.directive',
  'services'
  ])
	.controller('PostsController', function($scope, GetPosts) {
    console.log('clicked');
		$scope.data = {};

		$scope.getPosts = function() {
			GetPosts.get().success(function(posts) {
        console.log("success");
				$scope.data.posts = posts;
			});
		};

		// $scope.getPosts();
	})
  .controller('clicker', function($scope, GetPosts) {
    $scope.clicked = function() {
      console.log('clicked');
    };

    $scope.getPosts = function() {
      GetPosts.gotten().success(function(posts) {
        angular.forEach(posts.data.children, function(value, key) {
          console.log("value",value);
        })
        console.log("success", posts);
        // $scope.data.posts = posts;
      });
    };
  })
