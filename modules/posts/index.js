var postRoutes = require('./routes');
exports.register = function (plugin, options, next ) {
    plugin.route(postRoutes);
    plugin.ext('onRequest', function (request, next) {
        request.path = request.path.replace(/\/$/, '');
        next();
    });
    next();
};

exports.register.attributes = {
    name: 'posts'
};