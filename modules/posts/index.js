var postRoutes = require('./routes');
exports.register = function (server, options, next ) {
    var postServer = server.select(options.labels);
    postServer.route(postRoutes);
    postServer.ext('onRequest', function (request, reply) {
        request.path = request.path.replace(/\/$/, '');
        return reply.continue();
    });
    next();
};

exports.register.attributes = {
    name: 'posts'
};