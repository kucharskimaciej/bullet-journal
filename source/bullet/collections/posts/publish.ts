import {Posts} from './posts';

Meteor.publish('posts.last', function () {
    const sort = {
        created_at: -1
    };

    return Posts.find({
        author: this.userId
    }, { sort });
});