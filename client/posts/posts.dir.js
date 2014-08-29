angular.module('posts.directive', [])
	.directive('postContent', function() {
		return {
			restrict: 'E',
			scope: {
				post: '='
			},
			templateUrl: 'posts.tpl.html'
		}
	});