var Joi = require('joi');
var Post = require('./models/post');

exports.index = {
    handler: function (request, reply) {
        reply("faster.");
    }
};

exports.create = {
    handler: function (requrest, reply) {
        reply('create called');
    }
};