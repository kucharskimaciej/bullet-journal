import {GamificationRecords} from '../../collections/gamification/collection';
import * as moment from 'moment';
import {ISubject} from "./subjects";

export type momentOrDate = Date|moment.Moment;

export const DAY_IN_MS = 24 * 60 * 60 * 1000;

export interface ISubjectHandler<PayloadType> {
    (subject: ISubject<PayloadType>): void;
}

export const getRecord = (key, user_id) => GamificationRecords.findOne({
    key, user_id
});

export const getRecordOfType = key => user_id => getRecord(key, user_id);

export const parseString = (date: string):Date => 
    moment.utc(date).toDate();

export const getDayStart = (date:momentOrDate = moment()):Date => {
    return moment(date).utc().startOf('day').toDate();
};

export const getNextDayStart = (date:momentOrDate = moment()):Date => {
    return moment(getDayStart(date).valueOf() + DAY_IN_MS).toDate();
};

export const isPreviousDay = (dayAStart: momentOrDate, dayBStart: momentOrDate):boolean => {
    return Math.abs(dayAStart.valueOf() - dayBStart.valueOf()) === DAY_IN_MS;
};