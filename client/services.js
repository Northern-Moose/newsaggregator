angular.module('app.services', [])

// Need to configure a router that handles the different API requests
// of make different factories
	.factory('GetPosts', function ($http) {
		var getPosts = function(api) {
			return $http({
				method: 'GET'
				url: api
			})
		}
	})

	.factory('prepApi', function(url) {
		// gets API url for Redditab
		var getReddit = function(url) {
		  if(!url) {
		    return 'http://www.reddit.com/.json?jsonp=?'
		  } else {
		    return'http://www.reddit.com/r/' + url +'/.json?jsonp=?'
		  }
		};

		// ID table for NPR's different programs
		var nprRouter = {
		  'news' : 1001,
		  'economy' : 1017,
		  'education' : 1013,
		  'environment' : 1025,
		  'all' : 3002,
		  'music' : 3018,
		  'food' : 1053,
		  'science' : 1007,
		  'space' : 1026,
		  'sports' : 1055,
		  'health' : 1128
		};
		// gets API url for NPR
		var getNpr = function(code) {
			var id = nprRouter[cat] || 1001;
 			return 'http://api.npr.org/query?id='+id+'&apiKey=MDE2NDAyNjQ0MDE0MDkwMTA3NjdiNDRlYQ001&output=json'
		};

		// gets API url for RSS Feed through Google's API
		var getRss = function(url) {
			return 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q='+ url;
		};

		return{
			getReddit: getReddit,
			getNpr: getNpr,
			getRss: getRss
		};

	})

	/* in Links.module */
	// .controller('PostsController', function($scope, Posts) {
	// 	$scope.showReddit = function(url) {
	// 		Posts.getPosts().then(function(res) {
	// 			$scope.data = res;
	// 		})
	// 		.catch(function(error) {
	// 			console.log(error);
	// 			// throw err
	// 		})
	// 	};

	// 	$scope.showPosts
	// })