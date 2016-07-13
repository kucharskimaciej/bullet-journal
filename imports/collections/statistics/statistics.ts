import {Mongo} from 'meteor/mongo';


export interface IStatistic {
    key: String;
    value: String;
}

export interface IStatistics {
    _id?: String;
    user_id: String;
    statistics: IStatistic[];
}

export const Statistics = new Mongo.Collection<IStatistics>('statistics');