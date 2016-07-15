import { compose } from 'underscore';

export const addCreatedAtTimestamp = (userId, document) => {
    document.created_at = new Date();
};

export const addUpdatedAtTimestamp = (userId, document) => {
    document.updated_at = new Date();
};