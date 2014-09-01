angular.module('posts.directive', [])
	.directive('viewPost', function() {
		return {
			restrict: 'E',
			scope: {
				post: '='
			},
			templateUrl: 'posts.tpl.html'
		}
	});