var PostsController = require('./controller');

module.exports = [
    { method: 'GET', path: '/posts', config: PostsController.index },
    { method: 'GET', path: '/posts/{post_id}', config: PostsController.show },
    { method: 'POST', path: '/posts', config: PostsController.create },
    { method: 'PUT', path: '/posts/{post_id}', config: PostsController.update },
    { method: 'DELETE', path: '/posts/{post_id}', config: PostsController.delete }

];