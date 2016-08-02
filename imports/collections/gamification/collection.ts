import {Mongo} from 'meteor/mongo';

export interface IGamificationRecord {
    _id?: string;
    key: string;
    user_id: string;
    value: any;
}

export interface IGamificationGrid {
    _id?: string;
    key: string;
    user_id: string;
    date: number;
    count: number;
}

export const GamificationRecords = new Mongo.Collection<IGamificationRecord>('gamification_records');
export const GamificationGrid = new Mongo.Collection<IGamificationGrid>('gamification_grid');