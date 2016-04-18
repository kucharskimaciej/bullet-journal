import * as React from 'react';
import {Component, PropTypes} from 'react';

export interface IValidationMessage {
    error: string;
}

export class ValidationMessage extends Component<IValidationMessage, {}> {
    static propTypes = {
        error: PropTypes.string.isRequired
    };

    render() {
        return <span>{this.props.children}</span>;
    }

}