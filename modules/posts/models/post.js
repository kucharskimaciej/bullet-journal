var mongoose = require('mongoose');
var createdAt = require('../../../lib/created_at');



var schema = mongoose.Schema({
    type: {
        type: String,
        enum: {
            values: ['regular', 'daily'],
            message: 'Invalid post type'
        },
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: { type: Array, default: [] }
});

schema.plugin(createdAt);

var Post = mongoose.model('Post', schema);

module.exports = Post;