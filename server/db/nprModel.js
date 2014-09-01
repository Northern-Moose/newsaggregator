var db = require('./schema.js');

var nprModel = db.Model.extend({
  tableName: 'nprContent',
  hasTimestamps: false
});
