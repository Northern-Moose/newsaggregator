var db = require('../dbSchema.js');

var RssPost = db.Model.extend({
  tableName: 'rssContent',
  hasTimestamps: false
});

module.exports = RssPost;
