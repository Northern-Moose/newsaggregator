var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'default',
    password: 'password',
    database: 'main',
    charset: 'utf8',
    filename: path.join(__dirname, './data/main.sqlite')
  }
});

/************************************************************/
// Content aggregation tables
/************************************************************/

// Main content aggregation table
db.knex.schema.hasTable('aggregatedContent').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('aggregatedContent', function(content) {
      content.increments('aggregatedContentKey').primary();
      content.integer('sourceKey').unsigned().references('sourceKey').inTable('sources');
      content.string('title', 255);
      content.string('url', 255);
      content.string('content', 1000);
      // Standardize as date
      content.string('createdAt', 255);
    }).then(function(table) {
      console.log('Created aggregatedContent', table);
    });
  }
});

// Source-specific tables below (add new table if adding API)
// Reddit
db.knex.schema.hasTable('redditContent').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('redditContent', function(content) {
      content.increments('redditContentKey').primary();
      content.string('title', 255);
      content.string('url', 255); // Reddit permalink
      content.string('content', 255);
      // Standardize as date
      content.string('createdAt', 255);
    }).then(function(table) {
      console.log('Created redditContent', table);
    });
  }
});

// NPR
db.knex.schema.hasTable('nprContent').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('nprContent', function(content) {
      content.increments('nprContentKey').primary();
      content.string('title', 255);
      content.string('url', 255);
      content.string('thumbnailUrl', 255);
      content.string('author', 255);
      content.string('content', 1000);
      // Standardize as date
      content.string('createdAt', 255);
    }).then(function(table) {
      console.log('Created nprContent', table);
    });
  }
});

/************************************************************/
// Utility and joining tables
/************************************************************/

// Users table, join to find username
db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('userKey').primary();
      user.string('userName', 100).unique();
      user.timestamps();
    }).then(function(table) {
      console.log('Created users', table);
    });
  }
});

// Sources table (lists APIs), used to organize all source links
// Ties in with user preferences table
db.knex.schema.hasTable('sources').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('sources', function(source) {
      source.increments('sourceKey').primary();
      source.string('source', 100).unique();
    }).then(function(table) {
      console.log('Created sources', table);
    });
  }
});

// Contains info on which sources are enabled for each user
db.knex.schema.hasTable('userSourceList').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('userSourceList', function(sourceList) {
      sourceList.increments('userSourceListKey').primary();
      sourceList.integer('userKey').unsigned().references('userKey').inTable('users');
      sourceList.integer('sourceKey').unsigned().references('sourceKey').inTable('sources');
    }).then(function(table) {
      console.log('Created userSourceList', table);
    });
  }
});

module.exports = db;
