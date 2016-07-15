import { Posts } from './posts';
import { addCreatedAtTimestamp, addUpdatedAtTimestamp } from '../helpers';

Posts.before.insert(addCreatedAtTimestamp);
Posts.before.update(addUpdatedAtTimestamp);
