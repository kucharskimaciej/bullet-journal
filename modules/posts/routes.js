var PostsController = require('./controller');

module.exports = [
    { method: 'GET', path: '/posts', config: PostsController.index },
    { method: 'POST', path: '/posts', config: PostsController.create }
];