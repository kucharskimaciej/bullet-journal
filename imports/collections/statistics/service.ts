import {Statistics, IStatistic} from './statistics';
import { KEYS } from '../gamification/constants';

export const createStatEntry = (userId: string) => {
    Statistics.insert({
        user_id: userId,
        statistics: <IStatistic[]>[]
    });
};

export const incrementTotalPostCount = (userId: string) => {
    const userStats = Statistics.findOne({
        user_id: userId
    });

    if (userStats.statistics.find((s) => s.key === KEYS.TOTAL_POSTS)) {
        Statistics.update({
            user_id: userId,
            'statistics.key': KEYS.TOTAL_POSTS
        }, {
            $inc: {
                'statistics.$.value': 1
            }
        });
    } else {
        const totalPostStat = {
            key: KEYS.TOTAL_POSTS, value: 1
        };

        Statistics.update(userStats._id, {
            $push: {
                statistics: totalPostStat
            }
        });
    }
};