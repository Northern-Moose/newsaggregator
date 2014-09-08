var db = require('../dbSchema.js');
var NprPost = require('../models/nprModel.js');

var NprPosts = new db.Collection();

NprPosts.model = NprPost;

module.exports = NprPosts;
