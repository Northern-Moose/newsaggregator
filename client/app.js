angular.module('app', [
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
