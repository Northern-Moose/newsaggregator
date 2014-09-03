angular.module('app', [
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
}])

.run(['$state', function($state) {
  $state.transitionTo('home');
}]);
