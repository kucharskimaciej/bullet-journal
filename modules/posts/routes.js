var PostsController = require('./controller');

module.exports = [
    { method: 'GET', path: '/posts', handler: PostsController.index }
];