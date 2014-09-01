angular.module('app', [
  'services',
  'posts',
  'ngRoute',
  'ui.router'
])

.config(['$stateProvider', function($stateProvider) {
  console.log("hi");
  // $statePr
}]);

// .config(['$stateProvider', function($stateProvider) {
//   $urlRouterProvider.otherwise("");
//   $stateProvider
//     .state('home', {
//       url:'',
//       views: {
//         templateUrl: 'posts/posts.html',
//         controller: 'posts'
//       }
//     });
//   $stateProvider.state(home);
// }]);


// .config(function($stateProvider) {
//   $urlRouterProvider.otherwise('/');

//   $stateProvider
//     .state('home', {
//       url: '/',
//       templateUrl: 'posts/posts.html',
//       controller: 'PostsController'
//     })
//   console.log($stateProvider);
// })
