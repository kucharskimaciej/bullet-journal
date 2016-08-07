import {Meteor} from 'meteor/meteor';
import {Component} from 'react';
import {composeWithTracker} from 'react-komposer';
import {IGamificationRecord, GamificationRecords} from "../../../../collections/gamification/collection";

export interface IGamificationContainerProps {
    records: IGamificationRecord[];
}

class GamificationContainerComponent extends Component<IGamificationContainerProps, {}> {
    render() {
        console.log('hello', this.props);
        return null;
    }
}
const composeFn = (_, onData) => {
    const subs = [
        Meteor.subscribe('gamification.records'),
        Meteor.subscribe('gamification.grid')
    ];

    if (subs.some((sub) => !sub.ready())) {
        return;
    }

    const records = GamificationRecords.find({ user_id: Meteor.userId() }).fetch();

    onData(null, { records });
};

export const GamificationContainer = composeWithTracker(composeFn)(GamificationContainerComponent);