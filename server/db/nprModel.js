var db = require('./schema.js');

var norModel = db.Model.extend({
  tableName: 'nprContent',
  hasTimestamps: false
})
