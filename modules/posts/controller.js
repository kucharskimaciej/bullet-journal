var Joi = require('joi');
Joi.objectId = require('joi-objectid');
var requestHelper = require('../common/reply_helper');
var Boom = require('boom');
var Post = require('./models/post');


exports.index = {
    handler: function (request, reply) {
        var helper = requestHelper({ request: request, reply: reply });
        Post.find(request.query, { '__v': 0 }).sort({ 'created_at': -1 }).exec(helper.replyIndex);
    },
    validate: {
        query: {
            type: Joi.string().optional(),
            tags: Joi.alternatives().try(Joi.string(), Joi.array()).optional()
        }
    }
};

exports.create = {
    handler: function (request, reply) {
        var helper = requestHelper({ request: request, reply: reply });
        Post.create(request.payload, helper.replyCreate);
    },

    validate: {
        payload: {
            title: Joi.string(),
            original_content: Joi.string(),
            content: Joi.string().optional(),
            tags: Joi.array().optional(),
            type: Joi.string().allow('regular', 'daily').default('regular')
        }
    }
};

exports.show = {
    handler: function (request, reply) {
        var safeId = encodeURIComponent(request.params.post_id);
        var helper = requestHelper({ request: request, reply: reply });

        Post.findById(safeId, helper.replyShow);
    },
    validate: {
        params: {
            post_id: Joi.objectId()
        }
    }
};

exports.update = {
    handler: function (request, reply) {
        var safeId = encodeURIComponent(request.params.post_id);
        var helper = requestHelper({ request: request, reply: reply });

        Post.findById(safeId, helper.replyUpdate);
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
        var helper = requestHelper({ request: request, reply: reply });
        Post.findByIdAndRemove(safeId, helper.replyDelete);
    },
    validate: {
        params: {
            post_id: Joi.objectId()
        }
    }
};