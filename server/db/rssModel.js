var db = require('./schema.js');

var rssPost = db.Model.extend({
  tableName: 'rssContent',
  hasTimestamps: false
});
