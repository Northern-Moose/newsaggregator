angular.module('services', [
	'posts'
])

	.factory('GetPosts', function ($http) {
		var gotten = function() {
			return $http({
				method: 'GET',
				// url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=http://kiafathi.azurewebsites.net/rss/'
				url: 'http://www.reddit.com/.json'
			});
		};
		return {
			gotten: gotten
		};
	});
