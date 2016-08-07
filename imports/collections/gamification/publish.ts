import {Meteor} from 'meteor/meteor';
import {GamificationGrid, GamificationRecords} from './collection';


Meteor.publish('gamification.stats', function () {
    return GamificationRecords.find({
        user_id: this.userId
    });
});

Meteor.publish('gamification.grid', function() {
    return GamificationGrid.find({
        user_id: this.userId
    });
});