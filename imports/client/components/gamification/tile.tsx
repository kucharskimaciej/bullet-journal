import {Component, PropTypes} from 'react';
import * as React from 'react';
import {IGamificationRecord} from "../../../collections/gamification/collection";
import {KEYS} from "../../../server/gamification/constants";

import * as moment from 'moment';

export interface ITileProps {
    recordKey: string;
    value: any;
}

export const tileContentTemplate = {
    [KEYS.BUSIEST_DAY](value) {
        return (
            <section>
                <span>{value.count}</span>
                <span>{value.date}</span>
            </section>
        );
    },
    [KEYS.HOT_STREAK](value) {
        let content;
        const end = moment(value.end).utc();
        if (moment().diff(end, 'days') > 1) {
            content = 0;
        } else {
            content = moment(value.end).diff(moment(value.start), 'days');
        }

        return (
            <section>
                <span>{content}</span>
            </section>
        );
    },
    [KEYS.TOTAL_POSTS](value) {
        return (
            <section>
                <span>{value}</span>
            </section>
        );
    }
};

export const tileName = {
    [KEYS.BUSIEST_DAY]: 'Busiest day',
    [KEYS.HOT_STREAK]: 'Hot streak',
    [KEYS.TOTAL_POSTS]: 'Total posts'
};

export class Tile extends Component<ITileProps, {}> {
    render() {
        const {recordKey: key, value} = this.props;

        return (
            <section>
                <header>
                    <h4>{ tileName[key] }</h4>
                </header>
                { tileContentTemplate[key](value) }
            </section>
        );
    }
}