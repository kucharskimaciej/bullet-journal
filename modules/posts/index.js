var postRoutes = require('./routes');

exports.register = function (plugin, options, next ) {
    plugin.route(postRoutes);
    next();
};

exports.register.attributes = {
    name: 'posts'
};