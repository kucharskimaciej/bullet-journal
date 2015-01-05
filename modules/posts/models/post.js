var mongoose = require('mongoose');
var createdAt = require('../../../lib/created_at');
var markdown = require('../../../lib/markdown');



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
    original_content: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    tags: { type: Array, default: [] }
});

schema.plugin(createdAt);
schema.plugin( markdown('original_content', 'content') );

var Post = mongoose.model('Post', schema);

module.exports = Post;