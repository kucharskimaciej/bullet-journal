import {Statistics, IStatistic} from './statistics';

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

    if (userStats.statistics.find((s) => s.key === 'total-posts')) {
        Statistics.update({
            user_id: userId,
            'statistics.key': 'total-posts'
        }, {
            $inc: {
                'statistics.$.value': 1
            }
        });
    } else {
        const totalPostStat = {
            key: 'total-posts', value: 1
        };

        Statistics.update(userStats._id, {
            $push: {
                statistics: totalPostStat
            } 
        });
    }
};