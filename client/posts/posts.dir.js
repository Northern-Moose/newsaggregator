angular.module('posts.directive', [])
	.directive('viewPost', function() {
		var getUnixTime = function(ts) {
      var date = new Date(ts*1000);
      return (date);
    };
		return {
			restrict: 'E',
			templateUrl: './posts/posts.tpl.html',
			scope: {
				post: '='
			}
		};
		console.log("domain: ",domain);
	});
