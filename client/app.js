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


.factory('GetPosts', function ($http, $q) {
  var gotten = function() {
    console.log("called gotten")
    var deferred = $q.defer();
    $http.get('http://127.0.0.1:8080/api/content').success(function(res) {
      deferred.resolve(res);
    });
    return deferred.promise;
  }
  return {
    gotten: gotten
  };
})

.run(['$state', function($state) {
  $state.transitionTo('home');
}]);