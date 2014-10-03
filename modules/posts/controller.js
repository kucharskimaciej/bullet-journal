var Joi = require('joi');
Joi.objectId = require('joi-objectid');
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
        var safeId = encodeURIComponent(request.params.post_id);

        Post.findById()
    },
    validate: {
        params: {
            post_id: Joi.objectId()
        }
    }
};

exports.update = {
    handler: function (request, reply) {

    },
    validate: {
        params: {
            post_id: Joi.objectId()
        }
    }
};

exports.delete = {
    handler: function (request, reply) {
        var safeId = encodeURIComponent(request.params.post_id);
        Post.findByIdAndRemove(safeId, function (err, model) {
            if(err) {
               return reply(Boom.badImplementation());
            }

            if(!model) {
                return reply(Boom.notFound());
            }

            reply().hold().code(204).send();

        });
    },
    validate: {
        params: {
            post_id: Joi.objectId()
        }
    }
};