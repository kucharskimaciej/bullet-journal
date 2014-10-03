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

exports.show = {
    handler: function (request, reply) {

    }
};

exports.update = {
    handler: function (request, reply) {

    }
};

exports.delete = {
    handler: function (request, reply) {
        var safeId = encodeURIComponent(request.params.post_id);

        Post.remove({ _id: safeId }, function (err) {
            if(err) {
                reply(Boom.notFound());
            }

            reply().hold().code(204).send();

        });
    }
};