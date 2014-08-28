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

db.knex.schema.hasTable('aggregatedContent').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('aggregatedContent', function(content) {
      content.increments('id').primary();
      content.string('title', 255);
      content.string('title_url', 255);
      content.string('content', 1000);
      // If error, use string data type instead
      content.date('created_at', 255);
    }).then(function (table) {
      console.log('Created aggregatedContent', table);
    });
  }
});

db.knex.schema.hasTable('clicks').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('clicks', function (click) {
      click.increments('id').primary();
      click.integer('link_id');
      click.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

/************************************************************/
// Add additional schema definitions below
/************************************************************/

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
