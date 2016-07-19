import {Posts} from './posts';
import * as moment from 'moment';

Posts.computedFields.add('posted_day', function() {
    if (this.isInsert) {
        this.set(
            moment().startOf('day').valueOf()
        );
    }
});