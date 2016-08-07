import {Meteor} from 'meteor/meteor';
import {GamificationGrid, GamificationRecords} from './collection';


Meteor.publish('gamification.records', function () {
    console.log('publishing records')
    return GamificationRecords.find({
        user_id: this.userId
    });
});

Meteor.publish('gamification.grid', function() {
    console.log('publishing grid')
    return GamificationGrid.find({
        user_id: this.userId
    });
});