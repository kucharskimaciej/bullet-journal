import {GamificationRecords} from '../../collections/gamification/collection';

export const getRecord = (key, user_id) => GamificationRecords.findOne({
    key, user_id
});