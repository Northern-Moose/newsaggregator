var db = require('../dbSchema.js');

var NprPost = db.Model.extend({
  tableName: 'nprContent',
  hasTimestamps: false
});

module.exports = NprPost;
