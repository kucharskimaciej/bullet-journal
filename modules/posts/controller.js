var Joi = require('joi');
var Post = require('./models/post');


exports.index = {
    handler: function (request, reply) {
        Post.find(function (err, posts) {
            if(err) {
                console.log(err);
            }

            reply(posts);
        });
    }
};

exports.create = {
    handler: function (requrest, reply) {
        reply('create called');
    }
};