angular.module('posts.directive', [])
	.controller('PostsController', function($scope, Posts) {
		$scope.data = {};

		$scope.getPosts = function() {
			Posts.get().success(function(posts) {
				$scope.data.posts = posts;
			});
		};

		$scope.getPosts();
	});