import {Posts} from './posts';
import FieldSpecifier = Mongo.FieldSpecifier;

Meteor.publish('posts.recent', function () {
    const sort = {
        created_at: -1
    };

    const fields: FieldSpecifier = {
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