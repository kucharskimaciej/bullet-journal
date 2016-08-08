import {Meteor} from 'meteor/meteor';
import {Component} from 'react';
import * as React from 'react';
import {composeWithTracker} from 'react-komposer';
import {IGamificationRecord, GamificationRecords} from "../../../collections/gamification/collection";

import {Tile} from './tile';

export interface IGamificationContainerProps {
    records: IGamificationRecord[];
}

class GamificationContainerComponent extends Component<IGamificationContainerProps, {}> {
    render() {
        return (<div>
            { this.props.records.map(record =>
                <Tile key={record._id} recordKey={record.key} value={record.value} />
            )}
        </div>);
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