angular.module('app', [
  'posts',
  'ngRoute',
  'ui.router'
])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'posts/posts.html',
      controller: 'PostsController'
    });
}])


.factory('GetPosts', function ($http) {
  var gotten = function() {
    return $http({
      method: 'GET',
      // url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=http://kiafathi.azurewebsites.net/rss/'
      url: '/api/content'
    });
  };
  return {
    gotten: gotten
  };
});

// .config(function($httpProvider) {
//   // Enables cross domain calls
//   $httpProvider.defaults.useXDomain = true;
//   // Removes the header used to identify ajax calls that would prevent CORS from working
//   delete $httpProvider.defaults.headers.common['X-Requested-With'];
// });
// // .config(['$httpProvider', function($httpProvider) {
//   $httpProvider.defaults.useXDomain = true;
//   $httpProvider.defaults.withCredentials = true;
//   delete $httpProvider.defaults.headers.common["X-Requested-With"];
//   $httpProvider.defaults.headers.common["Accept"] = "application/json";
//   $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
// }]);

  .run(['$state', function($state) {
    $state.transitionTo('home');
  }]);