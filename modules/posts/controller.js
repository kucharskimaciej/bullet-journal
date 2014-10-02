var Joi = require('joi');
var Boom = require('boom');
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
    handler: function (request, reply) {
        Post.create(request.payload, function (err, post) {
            if(err) {
                reply(Boom.badData());
            }

            reply(post);
        });
    },

    validate: {
        query: {
            title: Joi.string().required(),
            type: Joi.string().allow('regular', 'daily').default('regular'),
            config: Joi.string().required()
        }
    }
};