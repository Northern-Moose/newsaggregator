var db = require('../dbSchema.js');
var RssPost = require('../models/rssModel.js');

var RssPosts = new db.Collection();

RssPosts.model = RssPost;

module.exports = RssPosts;
