import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {Posts} from './posts';

Meteor.publish('posts.recent', function () {
    const sort = {
        created_at: -1
    };

    const fields: Mongo.FieldSpecifier = {
        removed: 0
    };

    return Posts.find({
        author: this.userId,
        $or: [
            { removed: false },
            { removed: { $exists: false } }
        ]
    }, { sort, fields });
});