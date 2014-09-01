var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'password',
    database: 'hubdb',
    charset: 'utf8',
    filename: path.join(__dirname, './hubdb.sqlite')
  }
});

/************************************************************/
// Content aggregation tables
/************************************************************/

// Main content aggregation table
db.knex.schema.hasTable('aggregatedContent').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('aggregatedContent', function(content) {
      content.increments('id').primary();
      content.integer('source'); // Foreign key to our list of APIs (Reddit, RSS, etc.)
      content.string('title', 255);
      content.string('url', 255);
      content.string('content', 1000);
      // Standardize as date
      content.string('createdAt', 255);
    }).then(function (table) {
      console.log('Created aggregatedContent', table);
    });
  }
});

// Source-specific tables below (add new table if adding API)
// Reddit
db.knex.schema.hasTable('redditContent').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('redditContent', function(content) {
      content.increments('id').primary();
      content.string('title', 255);
      content.string('url', 255); // Reddit permalink
      content.string('content', 255); // Template: 'Ups: 81 | Downs: 10'
      // Standardize as date
      content.string('createdAt', 255);
    }).then(function (table) {
      console.log('Created redditContent', table);
    });
  }
});

// NPR
db.knex.schema.hasTable('nprContent').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('nprContent', function(content) {
      content.increments('id').primary();
      content.string('title', 255);
      content.string('url', 255);
      content.string('thumbnailUrl', 255);
      content.string('author', 255);
      content.string('content', 1000);
      // Standardize as date
      content.string('createdAt', 255);
    }).then(function (table) {
      console.log('Created nprContent', table);
    });
  }
});

// RSS
db.knex.schema.hasTable('rssContent').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('rssContent', function(content) {
      content.increments('id').primary();
      content.string('title', 255);
      content.string('url', 255);
      content.string('content', 1000);
      // Standardize as date
      content.string('createdAt', 255);
    }).then(function (table) {
      console.log('Created rssContent', table);
    });
  }
});

/************************************************************/
// Utility and joining tables
/************************************************************/

// Users table, join to find username
db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('user_id').primary();
      user.string('username', 100).unique();
      user.timestamps();
    }).then(function (table) {
      console.log('Created users', table);
    });
  }
});

// Sources table, used to organize all source links
// Ties in with user preferences table
db.knex.schema.hasTable('sources').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('sources', function (source) {
      source.increments('source_id').primary();
      source.string('source', 100).unique();
      source.timestamps();
    }).then(function (table) {
      console.log('Created sources', table);
    });
  }
});

db.knex.schema.hasTable('userSourceList').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('userSourceList', function (sourceList) {
      sourceList.increments('id').primary();
      sourceList.integer('user_id').unsigned().references('user_id').inTable('users');
      sourceList.integer('source_id').unsigned().references('source_id').inTable('sources');
    }).then(function (table) {
      console.log('Created userSourceList', table);
    });
  }
});

module.exports = db;
