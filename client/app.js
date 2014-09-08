angular.module('app', [
<<<<<<< HEAD
  'services',
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
}]);

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
=======
  'posts',
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

  .run(['$state', function($state) {
    $state.transitionTo('home');
  }]);
>>>>>>> 6132c329029662a9462ade8c27ba3aa98408282b
