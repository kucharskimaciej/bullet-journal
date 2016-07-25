import {GamificationRecords} from '../../collections/gamification/collection';
import * as moment from 'moment';

export const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const getRecord = (key, user_id) => GamificationRecords.findOne({
    key, user_id
});

export const getRecordOfType = key => user_id => getRecord(key, user_id);

export const getDayStart = (date = Date.now()):number => {
    return moment(date).utc().startOf('day').valueOf();
};

export const isPreviousDay = (dayAStart:number, dayBStart:number):boolean => {
    return Math.abs(dayAStart - dayBStart) === DAY_IN_MS;
};