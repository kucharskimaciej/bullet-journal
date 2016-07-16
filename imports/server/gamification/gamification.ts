import * as RecordProviders from './record_providers';
import {ISubject} from "./subjects";

import {values} from 'underscore';

const recordProviders = values(RecordProviders).map(Provider => new Provider);

export const notify = (subject: ISubject) => {
    for (let recordProvider of recordProviders) {
        recordProvider.notify(subject);
    }
};