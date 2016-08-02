import {GamificationRecords} from '../../collections/gamification/collection';
import * as moment from 'moment';
import {ISubject} from "./subjects";

export const DAY_IN_MS = 24 * 60 * 60 * 1000;

export interface ISubjectHandler<PayloadType> {
    (subject: ISubject<PayloadType>): void;
}

export const getRecord = (key, user_id) => GamificationRecords.findOne({
    key, user_id
});

export const getRecordOfType = key => user_id => getRecord(key, user_id);

export const getDayStart = (date = Date.now()):number => {
    return moment(date).utc().startOf('day').valueOf();
};

export const getLast30DaysStart = () => getDayStart(
    moment().subtract(30, 'days').valueOf()
);

export const getNextDayStart = (date = Date.now()):number => {
    return getDayStart(date) + DAY_IN_MS;
};

export const isPreviousDay = (dayAStart:number, dayBStart:number):boolean => {
    return Math.abs(dayAStart - dayBStart) === DAY_IN_MS;
};