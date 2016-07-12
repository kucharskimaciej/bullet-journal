import { Posts } from '../posts/posts';
import { Users } from '../users/users';

import {
    createStatEntry
} from './service';

Users.after.insert(function() {
    createStatEntry(this._id);
});