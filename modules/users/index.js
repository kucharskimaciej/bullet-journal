var userRouter = require('./router');

exports.register = function (server, options, next ) {
    var userServer = server.select(options.labels);
    userServer.route(userRouter);

    userServer.ext('onRequest', function (request, reply) {
        request.path = request.path.replace(/\/$/, '');
        return reply.continue();
    });

    next();
};

exports.register.attributes = {
    name: 'users'
};