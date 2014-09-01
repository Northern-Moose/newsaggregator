angular.module('user.twitter.directive', [])
  .directive('postToTwitter', function() {
    function(scope, element, attrs) {

    }
    return {
      restrict: 'E',
      templateUrl: './app/userMedia/twitter.tpl.html'
    }
  })
