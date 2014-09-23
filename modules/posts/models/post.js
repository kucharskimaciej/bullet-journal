var mongoose = require('mongoose');
var createdAt = require('../../../lib/created_at');

var schema = mongoose.Schema({
    type: String,
    title: String,
    content: String,
    tags: { type: Array, default: [] }
});

schema.plugin(createdAt);

var Post = mongoose.model('Post', schema);

module.exports = Post;