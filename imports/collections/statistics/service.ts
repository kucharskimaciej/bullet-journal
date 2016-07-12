import {Statistics} from './statistics';

export const createStatEntry = (userId: string) => {
    Statistics.insert({
        user_id: userId,
        statistics: []
    });
};