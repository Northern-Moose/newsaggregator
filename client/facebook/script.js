angular.module('PersNewsAgg', ['facebook'])

.config([
  'FacebookProvider',
  function(FacebookProvider) {
    var myAppId = '1477145722542537';   // PersNewsAgg appId from facebook developer website
    
    // You can set appId with setApp method
    //  FacebookProvider.setAppId('myAppId');

    /**
     * After setting appId you need to initialize the module
     * You can pass the appId on the init method as a shortcut too.
     */

    FacebookProvider.init(myAppId);
  }
])

.controller('MainController', [
  '$scope',
  '$timeout',
  'Facebook',
  function($scope, $timeout, Facebook) {

    // Define empty user data
    $scope.user = {};

    // Defining user logged status
    $scope.logged = false;

    // Add some flags to display messages upon user status change
    $scope.byebye = false;
    $scope.salutation = false;

    /**
     * Watch for Facebook to be ready
     * There is also the event that could be used
     */

    $scope.$watch(
      function() {
        return Facebook.isReady();
      },
      function(newVal) {
        if (newVal) {
          $scope.facebookReady = true;
        }
      }
    );

    /**
     * Intent Login function
     */

    $scope.IntentLogin = function() {
      Facebook.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          $scope.logged = true;
          $scope.me();
        } else {
          $scope.login();
        }
      });
    };

    /**
     * Login function
     */

    $scope.login = function() {
      Facebook.login(function(response) {
        if (response.status == 'connected') {
          $scope.logged = true;
          $scope.me();
        }
      });
    };

    /**
     * The user's profile information
    */

    $scope.me = function() {
      Facebook.api('/me', function(response) {
        $scope.apply(function() {
          $scope.user = response;
        });
      });
    };

    /**
     * Logout function
     */

    $scope.logout = function() {
      Facebook.logout(function() {
        $scope.$apply(function() {
          $scope.user = {};
          $scope.logged = false;
        });
      });
    }

    /**
     * Taking approach of events
     */

    $scope.$on('Facebook:statusChange', function(event, data) {
      console.log('Status: ', data);
      if (data.status == 'connected') {
        $scope.$apply(function() {
          $scope.salutation = true;
          $scope.byebye = false;
        });
      } else {
        $scope.$apply(function() {
          $scope.salutation = false;
          $scope.byebye = true;
          $timeout(function() {
            $scope.byebye = false;
          }, 2000)
        });
      }
    });
  }
])

/**
 * For debugging purposes
 * Shows objects in a pretty way
 */

.directive('debug', function() {
  return {
    restrict: 'E',
    scope: {
      expression: '= val'
    },
    template: '<pre>{{debug(expression)}}</pre>',
    link: function(scope) {
      scope.debug = function(exp) {
        return angular.toJson(exp, true);
      };
    }
  }
});
