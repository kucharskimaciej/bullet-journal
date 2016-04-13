import * as React from 'react';
import {Component, PropTypes} from 'react';
import {
    weekday,
    dayInMonth,
    month,
    year
} from './filters';


export class PostDate extends Component<{ createdAt: number }, {}> {
    render() {
        const date = new Date(this.props.createdAt);

        return (
            <span>{weekday(date)}, {dayInMonth(date)} {month(date)} {year(date)}</span>
        );
    }
}