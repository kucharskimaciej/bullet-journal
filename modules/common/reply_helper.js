var Boom = require('boom');
var _ = require('lodash-node');

var constructor = function (spec) {
    var request = spec.request, reply = spec.reply;

    function replyIndex (err, data) {
        if (null !== err) {
            return reply(Boom.badImplementation());
        }

        reply(data);
    }

    function replyShow (err, data) {
        if (null !== err) {
            return reply(Boom.badImplementation());
        }

        if (null === data) {
            return reply(Boom.notFound());
        }

        reply(data);
    }

    function replyDelete (err, data) {
        if (null !== err) {
            return reply(Boom.badImplementation());
        }

        if (null === data) {
            return reply(Boom.notFound());
        }

        reply().hold().code(204).send();

    }

    function replyUpdate (err, data) {
        if (null !== err) {
            return reply(Boom.badImplementation());
        }

        if (null === data) {
            return reply(Boom.notFound());
        }

        data = _.extend(data, request.payload);

        data.save(function (err, saveData) {
            if (null !== err) {
                return reply(Boom.badImplementation());
            }

            reply(saveData);
        });

    }

    function replyCreate (err, data) {
        if (null !== err) {
            return reply(Boom.badData());
        }

        reply(data);
    }


    return {
        replyIndex: replyIndex,
        replyShow: replyShow,
        replyDelete: replyDelete,
        replyUpdate: replyUpdate,
        replyCreate: replyCreate
    }

};

module.exports = constructor;