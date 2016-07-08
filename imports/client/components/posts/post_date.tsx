import * as React from 'react';
import {Component, PropTypes} from 'react';
import {
    time,
    weekday,
    dayInMonth,
    month,
    year
} from './filters';

import {Tooltip} from '../ui/tooltip/tooltip';

const styles = require('./post_date.styl');

export class PostDate extends Component<{ createdAt: number }, {}> {
    render() {
        const date = new Date(this.props.createdAt);

        return (
            <Tooltip text={`Posted at ${time(date)}`} className={styles.root}>
                <span className={styles.day}>{dayInMonth(date)}</span>
                <span className={styles.details}>
                    <span className={styles.weekday}>{weekday(date)}</span>
                    <span className={styles.rest}>{month(date)} /{year(date)}</span>
                </span>
            </Tooltip>
        );
    }
}