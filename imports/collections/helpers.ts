import { compose } from 'underscore';
import * as moment from 'moment';

export const addCreatedAtTimestamp = (userId, document) => {
    document.created_at = moment().utc().toDate();
};

export const addUpdatedAtTimestamp = (userId, document) => {
    document.updated_at = moment().utc().toDate();
};