import {Mongo} from 'meteor/mongo';

export interface IGamificationRecord {
    _id?: string;
    key: string;
    user_id: string;
    value: any;
}

export const GamificationRecords = new Mongo.Collection<IGamificationRecord>('gamification_records');