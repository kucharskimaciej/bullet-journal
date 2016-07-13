import { Posts } from '../posts/posts';
import { Users } from '../users/users';

import {
    createStatEntry,
    incrementTotalPostCount
} from './service';

Users.after.insert(function() {
    createStatEntry(this._id);
});


console.log('registering hooks');
Posts.after.insert(function(uid, post) {
    incrementTotalPostCount(post.author);
});