'use strict';

describe('directives', function() {
  beforeEach(function() {
    // Do something before each test
  });
});

describe('services', function() {
  var factory, http;

  beforeEach(module('posts'));
  beforeEach(module('services'));
  beforeEach(module('function'($factory, $rootScope) {
    http = $http;
    factory = $factory('GetPosts', {
      $http: http
    });
  }));

  it('should successfully get posts', inject(function(gotten) {
    // not sure how to write this test
  }));

});

describe('posts.controller', function() {
  var controller, scope; 

  beforeEach(module('posts'));
  beforeEach(module('services'));
  beforeEach(module('posts.directive'));
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('PostsController', {
      $scope: scope
    });
  }));

  it('checks the existence of the getPosts function', inject(function(getPosts) {
    expect(getPosts).toBeDefined();
  }));

  it('should call GetPosts on user click', function() {
    expect($scope.clicked).to.be.a('function');
    // need something else here
  });
});
