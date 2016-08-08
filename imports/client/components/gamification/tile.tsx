import {Component, PropTypes} from 'react';
import * as React from 'react';
import {IGamificationRecord} from "../../../collections/gamification/collection";
import {KEYS} from "../../../server/gamification/constants";

import * as moment from 'moment';

export interface ITileProps {
    recordKey: string;
    value: any;
}

export class Tile extends Component<ITileProps, {}> {
    render() {
        const {recordKey: key, value} = this.props;
        let content;
        switch (key) {
            case KEYS.BUSIEST_DAY:
                content = value.count;
                break;

            case KEYS.HOT_STREAK:
                const end = moment(value.end).utc();
                if (moment().diff(end, 'days') > 0) {
                    content = 0;
                } else {
                    content = moment(value.end).diff(moment(value.start), 'days');
                }

                break;

            default:
                content = value;
                break;
        }

        return (<section>
            <h4>{ key }</h4>
            { content }
        </section>);
    }
}