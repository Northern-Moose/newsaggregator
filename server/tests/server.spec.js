var expect = require('chai').expect;
var request = require('request');

var db = require('./schema.js');
var Users = require();
var User = require();

describe('', function() {
  beforeEach(function() {
    // log out currently signed in user
    request('http://127.0.0.1:4568/logout', function(error, res, body) {});

    // delete user Svnh from db so it can be created later for the test
    db.knex('users')
      .where('username', '=', 'Svnh')
      .del()
      .catch(function(error) {
        // uncomment when writing authentication tests
        throw {
          type: 'DatabaseError',
          message: 'Failed to create test setup data'
        };
      });

    // delete user Phillip from db so it can be created later for the test
    db.knex('users')
      .where('username', '=', 'Phillip')
      .del()
      .catch(function(error) {
        // uncomment when writing authentication tests
        throw {
          type: 'DatabaseError',
          message: 'Failed to create test setup data'
        };
      });

    
  })
})
