import {Meteor} from 'meteor/meteor';
import {GamificationRecords} from './collection';


Meteor.publish('gamification.stats', function () {
    return GamificationRecords.find({
        user_id: this.userId
    });
});
